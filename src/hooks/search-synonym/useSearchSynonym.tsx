import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useState } from "react";

export const useSearchSynonym = () => {
  const toastRef = useRef<Toast | null>(null);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [isSearchSynonymLoading, setIsSearchSynonymLoading] =
    useState<boolean>(false);

  const handleLookup = async (values: { word: string }) => {
    setIsSearchSynonymLoading(true);
    try {
      const response: any = await axios.get(
        `https://reeinvent-synonyms-4408f50df2a6.herokuapp.com/api/synonyms/lookup/${values.word}`
      );
      if (response.data.includes(values.word)) {
        setSynonyms(
          response.data.filter((synonym: string) => synonym !== values.word)
        );
      } else {
        setSynonyms(response.data);
      }

      toastRef.current?.show({
        severity: "success",
        detail: `Synonyms for "${values.word}" retrieved successfully!`,
        life: 3000,
      });
      setIsSearchSynonymLoading(false);
    } catch (error: any) {
      setIsSearchSynonymLoading(false);

      if (error.status === 404) {
        toastRef.current?.show({
          severity: "info",
          detail: "No available synonyms for searched word.",
          life: 3000,
        });
      } else {
        toastRef.current?.show({
          severity: "error",
          detail: "Failed to lookup synonyms.",
          life: 3000,
        });
      }
    }
  };

  return {
    synonyms,
    handleLookup,
    toastRef,
    setSynonyms,
    isSearchSynonymLoading,
  };
};

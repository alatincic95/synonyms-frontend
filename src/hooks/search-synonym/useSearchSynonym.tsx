import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useState } from "react";

export const useSearchSynonym = () => {
  const toastRef = useRef<Toast | null>(null);
  const [synonyms, setSynonyms] = useState<string[]>([]);

  const handleLookup = async (values: { word: string }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/synonyms/lookup/${values.word}`
      );
      setSynonyms(response.data);
      toastRef.current?.show({
        severity: "success",
        detail: `Synonyms for "${values.word}" retrieved successfully!`,
        life: 3000,
      });
    } catch (error: any) {
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

  return { synonyms, handleLookup, toastRef };
};

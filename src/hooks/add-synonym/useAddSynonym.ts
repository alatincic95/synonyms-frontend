import axios from "axios";
import { Toast } from "primereact/toast";
import React from "react";
import { useState } from "react";

const useAddSynonym = () => {
  const toastRef = React.useRef<Toast | null>(null);

  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [isAddSynonymLoading, setIsAddSynonymLoading] =
    useState<boolean>(false);

  const addSynonym = (values: any, synonyms: string[], setFieldValue: any) => {
    if (values.synonyms !== "" && values.synonyms !== null) {
      // Check if the synonym is already in the list
      if (!synonyms.includes(values.synonyms.trim())) {
        setSynonyms([...synonyms, values.synonyms.trim()]);
      } else {
        toastRef.current?.show({
          severity: "warn",
          summary: "Warning",
          detail: "Synonym already exists!",
          life: 3000,
        });
      }
      // Clear the input field
      setFieldValue("synonyms", "");
    }
  };

  const handleSubmit = async (
    values: { word: string; synonyms: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsAddSynonymLoading(true);

    try {
      await axios.post(
        "https://reeinvent-synonyms-4408f50df2a6.herokuapp.com/api/synonyms/add",
        {
          word: values.word,
          synonyms: synonyms,
        }
      );
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Synonyms added successfully!",
        life: 3000,
      });
      resetForm();
      setSynonyms([]);
      setIsAddSynonymLoading(false);
    } catch (error) {
      setIsAddSynonymLoading(false);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add synonyms.",
        life: 3000,
      });
    }
  };

  return {
    synonyms,
    setSynonyms,
    handleSubmit,
    toastRef,
    addSynonym,
    isAddSynonymLoading,
  };
};

export default useAddSynonym;

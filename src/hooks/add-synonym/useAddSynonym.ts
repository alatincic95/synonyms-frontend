import axios from "axios";
import { Toast } from "primereact/toast";
import React from "react";
import { useState } from "react";

const useAddSynonym = () => {
  const toastRef = React.useRef<Toast | null>(null);

  const [synonyms, setSynonyms] = useState<string[]>([]);
  const fetchData = async () => {};

  const handleSubmit = async (
    values: { word: string; synonyms: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await axios.post("http://localhost:8080/api/synonyms/add", {
        word: values.word,
        synonyms: values.synonyms.split(",").map((s) => s.trim()),
      });
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Synonyms added successfully!",
        life: 3000,
      });
      resetForm();

      setSynonyms([]);
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add synonyms.",
        life: 3000,
      });
    }
  };

  return { fetchData, synonyms, setSynonyms, handleSubmit, toastRef };
};

export default useAddSynonym;

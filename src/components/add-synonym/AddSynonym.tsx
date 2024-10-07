// src/AddSynonym.tsx
import { Formik } from "formik";
import axios from "axios";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import { AddSynonymFormContent } from "./AddSynonymFormContent";
import React from "react";
import useAddSynonym from "../../hooks/add-synonym/useAddSynonym";

const AddSynonym: React.FC = () => {
  const { synonyms, setSynonyms, handleSubmit, toastRef } = useAddSynonym();

  return (
    <div className=" justify-content-center align-items-center  xl:col-6 lg:col-6 sm:col-12 col-12">
      <Toast ref={toastRef} />
      <div className="surface-card p-4 border-round shadow-2">
        <h2 className="text-center">Add Synonyms</h2>
        <Formik
          initialValues={{ word: "", synonyms: "" }}
          onSubmit={handleSubmit}
        >
          {() => (
            <AddSynonymFormContent
              synonyms={synonyms}
              setSynonyms={setSynonyms}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSynonym;

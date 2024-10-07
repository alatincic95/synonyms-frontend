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
    <div className=" justify-content-center align-items-center  xl:col-4 lg:col-4 md:col-6 sm:col-12 col-12">
      <Toast ref={toastRef} />
      <div
        style={{ backgroundColor: "#37a1f4" }}
        className="p-4 border-round shadow-2"
      >
        <h2 className="text-center text-white">Add Synonyms</h2>
        <Formik
          initialValues={{ word: "", synonyms: "" }}
          onSubmit={handleSubmit}
        >
          {() => (
            <AddSynonymFormContent
              synonyms={synonyms}
              setSynonyms={setSynonyms}
              toastRef={toastRef}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSynonym;

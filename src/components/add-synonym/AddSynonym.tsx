// src/AddSynonym.tsx
import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css"; // Include PrimeFlex for layout

const AddSynonym: React.FC = () => {
  const toastRef = React.useRef<Toast | null>(null);

  const handleSubmit = async (values: { word: string; synonyms: string }) => {
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
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add synonyms.",
        life: 3000,
      });
    }
  };

  return (
    <div className="flex justify-content-center align-items-center  xl:col-4 lg:col-4 sm:col-12 col-12">
      <Toast ref={toastRef} />
      <div className="surface-card p-4 border-round shadow-2 w-25rem">
        <h2 className="text-center">Add Synonyms</h2>
        <Formik
          initialValues={{ word: "", synonyms: "" }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="p-fluid">
              <div className="field">
                <label htmlFor="word" className="block">
                  Word:
                </label>
                <Field name="word">
                  {({ field }: { field: any }) => (
                    <InputText id="word" {...field} required />
                  )}
                </Field>
              </div>
              <div className="field">
                <label htmlFor="synonyms" className="block">
                  Synonyms (comma-separated):
                </label>
                <Field name="synonyms">
                  {({ field }: { field: any }) => (
                    <InputText id="synonyms" {...field} required />
                  )}
                </Field>
              </div>
              <Button
                type="submit"
                label="Add Synonyms"
                className="p-button-success mt-3"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSynonym;

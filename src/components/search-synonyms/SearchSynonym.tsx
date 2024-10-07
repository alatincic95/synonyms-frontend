// src/LookupSynonym.tsx
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

const LookupSynonym: React.FC = () => {
  const toastRef = React.useRef<Toast | null>(null);
  const [synonyms, setSynonyms] = React.useState<string[]>([]);

  const handleLookup = async (values: { word: string }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/synonyms/lookup/${values.word}`
      );
      setSynonyms(response.data);
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: `Synonyms for "${values.word}" retrieved successfully!`,
        life: 3000,
      });
    } catch (error: any) {
      if (error.status === 404) {
        toastRef.current?.show({
          severity: "info",
          summary: "Error",
          detail: "No available synonyms for searched word.",
          life: 3000,
        });
      } else {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to lookup synonyms.",
          life: 3000,
        });
      }
    }
  };

  return (
    <div className=" justify-content-center align-items-center xl:col-6 lg:col-6 sm:col-12 col-12">
      <Toast ref={toastRef} />
      <div className="surface-card p-4 border-round shadow-2 ">
        <h2 className="text-center">Lookup Synonyms</h2>
        <Formik initialValues={{ word: "" }} onSubmit={handleLookup}>
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
              <Button
                type="submit"
                label="Lookup"
                className="p-button-info mt-3"
              />
            </Form>
          )}
        </Formik>
        {synonyms.length > 0 && (
          <div className="mt-4">
            <h3>Synonyms:</h3>
            <ul>
              {synonyms.map((syn, index) => (
                <li key={index}>{syn}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LookupSynonym;

import { Field, Form, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React from "react";

export const AddSynonymFormContent = ({
  synonyms,
  setSynonyms,
  toastRef,
}: {
  synonyms: string[];
  setSynonyms: React.Dispatch<React.SetStateAction<string[]>>;
  toastRef: React.MutableRefObject<Toast | null>;
}) => {
  const { values, setFieldValue }: any = useFormikContext();

  return (
    <Form className="p-fluid">
      <div className="field">
        <label htmlFor="word" className="block font-bold">
          Word:
        </label>
        <Field name="word">
          {({ field }: { field: any }) => (
            <InputText id="word" {...field} required />
          )}
        </Field>
      </div>
      <div className="field">
        <label htmlFor="synonyms" className="block font-bold text-white">
          Enter synonym:
        </label>
        <Field name="synonyms">
          {({ field }: { field: any }) => (
            <InputText id="synonyms" {...field} />
          )}
        </Field>
      </div>
      <div className="col-12 flex flex-column align-items-end mt-3">
        <Button
          type="button"
          label="Add Synonym"
          className="blue-background text-white border-none xl:col-6 lg:col-6 md:col-6 sm:col-12"
          onClick={() => {
            if (values.synonyms !== "" && values.synonyms !== null) {
              // Check if the synonym is already in the list
              if (!synonyms.includes(values.synonyms.trim())) {
                setSynonyms([...synonyms, values.synonyms.trim()]);
              } else {
                // Optionally, you can show a toast message indicating it's a duplicate
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
          }}
        />
      </div>
      <div id="chip-container" className=" flex align-content-start">
        {synonyms.length > 0 &&
          synonyms.map((synonym: string) => {
            return (
              <Chip
                key={synonym}
                label={synonym}
                removable
                className="custom-chip m-1"
                onRemove={() => {
                  setSynonyms(synonyms.filter((s: string) => s !== synonym));
                }}
              />
            );
          })}
      </div>

      <Button label="Submit" className="p-button-success border-none mt-3" />
    </Form>
  );
};

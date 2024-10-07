import { Field, Form, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React from "react";

export const AddSynonymFormContent = ({
  synonyms,
  setSynonyms,
  addSynonym,
  isAddSynonymLoading,
}: {
  synonyms: string[];
  setSynonyms: React.Dispatch<React.SetStateAction<string[]>>;
  toastRef?: React.MutableRefObject<Toast | null>;
  addSynonym: (values: any, synonyms: string[], setFieldValue: any) => void;
  isAddSynonymLoading: boolean;
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
            <InputText
              id="synonyms"
              {...field}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form submission
                  addSynonym(values, synonyms, setFieldValue);
                }
              }}
            />
          )}
        </Field>
      </div>
      <div className="col-12 flex flex-column align-items-end mt-3">
        <Button
          type="button"
          label="Add Synonym"
          className="blue-background text-white border-none xl:col-6 lg:col-6 md:col-6 sm:col-12"
          onClick={() => {
            addSynonym(values, synonyms, setFieldValue);
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

      <Button
        label="Submit"
        loading={isAddSynonymLoading}
        className="p-button-success border-none mt-3"
      />
    </Form>
  );
};

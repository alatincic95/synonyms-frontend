import { Field, Form, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { InputText } from "primereact/inputtext";
import React from "react";

export const AddSynonymFormContent = ({
  synonyms,
  setSynonyms,
}: {
  synonyms: string[];
  setSynonyms: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { values, resetForm }: any = useFormikContext();

  console.log(synonyms, "synonyms");

  return (
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
          Enter synonym:
        </label>
        <Field name="synonyms">
          {({ field }: { field: any }) => (
            <InputText id="synonyms" {...field} required />
          )}
        </Field>
      </div>
      <div className="col-12 flex flex-column align-items-end mt-3">
        <Button
          type="button"
          label="Add Synonym"
          className="p-button-info xl:col-4 lg:col-6 md:col-4 sm:col-12"
          onClick={() => {
            console.log("values", values);
            values.synonyms !== "" &&
              values.synonyms !== null &&
              setSynonyms([...synonyms, values.synonyms]);
          }}
        />
      </div>
      <div id="chip-container">
        {synonyms.length > 0 &&
          synonyms.map((synonym: string) => {
            return (
              <Chip
                label={synonym}
                removable
                onRemove={() => {
                  setSynonyms(synonyms.filter((s: string) => s !== synonym));
                }}
              />
            );
          })}
      </div>

      <Button label="Submit" className="p-button-success mt-3" />
    </Form>
  );
};

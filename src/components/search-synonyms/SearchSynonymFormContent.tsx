import { Field, Form, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction } from "react";

export const SearchSynonymFormContent = ({
  synonyms,
  setSynonyms,
  isSearchSynonymLoading,
}: {
  synonyms: string[];
  setSynonyms: Dispatch<SetStateAction<string[]>>;
  isSearchSynonymLoading: boolean;
}) => {
  const { resetForm }: any = useFormikContext();
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
      <Button
        type="submit"
        label="Search synonyms"
        className="p-button-success border-none mt-3"
        loading={isSearchSynonymLoading}
      />

      {synonyms.length > 0 && (
        <div className="mt-4">
          <h3 className="text-white">Synonyms:</h3>
          <ul>
            {synonyms.map((syn, index) => (
              <Chip key={index} label={syn} className="custom-chip" />
            ))}
          </ul>
        </div>
      )}

      {synonyms.length > 0 && (
        <Button
          type="button"
          label="Reset"
          className="p-button-success border-none mt-3"
          onClick={() => {
            resetForm();
            setSynonyms([]);
          }}
        />
      )}
    </Form>
  );
};

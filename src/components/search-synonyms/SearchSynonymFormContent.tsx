import { Field, Form } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const SearchSynonymFormContent = () => {
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
        label="Lookup"
        className="p-button-success border-none mt-3"
      />
    </Form>
  );
};

import { Card } from "primereact/card";
import AddSynonym from "../add-synonym/AddSynonym";
import LookupSynonym from "../search-synonyms/SearchSynonym";

export const Parent = () => {
  return (
    <Card title="Synonym Search Tool" className="col-12 m-4">
      <div className="grid">
        <AddSynonym />
        <LookupSynonym />
      </div>
    </Card>
  );
};

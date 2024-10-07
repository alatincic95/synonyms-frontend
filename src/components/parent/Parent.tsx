import { Card } from "primereact/card";
import AddSynonym from "../add-synonym/AddSynonym";
import SearchSynonym from "../search-synonyms/SearchSynonym";

export const Parent = () => {
  return (
    <div className="grid m-4">
      <Card
        title="Synonym Search Tool"
        className="col-12 text-center text-white"
        style={{ backgroundColor: "#1976D2" }}
      >
        <div className="grid justify-content-around">
          <AddSynonym />
          <SearchSynonym />
        </div>
      </Card>
    </div>
  );
};

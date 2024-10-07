import React from "react";
import { Formik } from "formik";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import { useSearchSynonym } from "../../hooks/search-synonym/useSearchSynonym";
import { SearchSynonymFormContent } from "./SearchSynonymFormContent";

const SearchSynonym: React.FC = () => {
  const {
    synonyms,
    handleLookup,
    toastRef,
    setSynonyms,
    isSearchSynonymLoading,
  } = useSearchSynonym();
  return (
    <div className=" justify-content-center align-items-center xl:col-4 lg:col-4 md:col-6 sm:col-12 col-12">
      <Toast ref={toastRef} />
      <div
        style={{ backgroundColor: "#37a1f4" }}
        className="p-4 border-round shadow-2"
      >
        <h2 className="text-center text-white">Lookup Synonyms</h2>
        <Formik initialValues={{ word: "" }} onSubmit={handleLookup}>
          {() => (
            <SearchSynonymFormContent
              synonyms={synonyms}
              setSynonyms={setSynonyms}
              isSearchSynonymLoading={isSearchSynonymLoading}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SearchSynonym;

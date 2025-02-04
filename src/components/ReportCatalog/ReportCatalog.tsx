import { useState } from "react";
import {
  CatalogFormData,
  InformationObject,
} from "../../services/reportCatalog";
import CatalogForm from "./CatalogForm";
import CatalogTable from "./CatalogTable";

const ReportCatalog = () => {
  const [catalogQuery, setCatalogQuery] = useState<CatalogFormData>(
    {} as CatalogFormData
  );
  console.log(catalogQuery);

  return (
    <div className="h4 text-secondary mt-3 pt-2 border-top border-secondary">
      Report Catalog Example
      <p className="fst-italic fw-normal h6 pt-2">
        Use the report catalog to see what reports are available.
      </p>
      <CatalogForm
        updateCatalogQuery={(newFormData: CatalogFormData) =>
          setCatalogQuery(newFormData)
        }
      />
      <CatalogTable catalogQuery={catalogQuery} />
    </div>
  );
};

export default ReportCatalog;

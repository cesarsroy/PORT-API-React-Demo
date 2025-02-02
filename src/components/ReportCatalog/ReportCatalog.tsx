import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ReportCatalog.module.css";
import getReportCatalog, {
  CatalogFormData,
  InformationObject,
} from "../../services/reportCatalog";
import { Axios, AxiosError } from "axios";
import TrashIcon from "./TrashIcon";
import AccessTokenContext from "../../contexts/accessTokenContext";
import CatalogForm from "./CatalogForm";
import CatalogTable from "./CatalogTable";

const ReportCatalog = () => {
  const [reportCatalog, setReportCatalog] = useState<InformationObject[]>([]);

  const [catalogError, setCatalogError] = useState("");

  return (
    <div className="h4 text-secondary mt-3 pt-2 border-top border-secondary">
      Report Catalog Example
      <p className="fst-italic fw-normal h6 pt-2">
        Use the report catalog to see what reports are available.
      </p>
      <CatalogForm {...{ setCatalogError, setReportCatalog }} />
      {catalogError !== "" && (
        <div className="alert alert-danger fw-light fs-5">
          <span className={`d-block fs-6 fw-lighter`}>There was an error</span>
          {catalogError}
        </div>
      )}
      <CatalogTable {...{ reportCatalog, setReportCatalog }} />
    </div>
  );
};

export default ReportCatalog;

import {
  CatalogFormData,
  InformationObject,
} from "../../services/reportCatalog";
import TrashIcon from "./TrashIcon";
import styles from "./ReportCatalog.module.css";
import useReportCatalog, { serializeBody } from "../../hooks/useReportCatalog";
import { useContext, useState } from "react";
import AccessTokenContext from "../../contexts/accessTokenContext";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  catalogQuery: CatalogFormData;
}

const CatalogTable = ({ catalogQuery }: Props) => {
  const { token } = useContext(AccessTokenContext);
  const isEnabled = Object.keys(catalogQuery).length > 0;
  console.debug("Is enabled?", [isEnabled, catalogQuery]);

  const {
    data: reportCatalog,
    isLoading,
    error,
  } = useReportCatalog({ catalogBody: catalogQuery, token, isEnabled });

  const queryclient = useQueryClient();

  console.debug("There is an error", error);

  return (
    <>
      {isLoading && (
        <div className="d-flex">
          <div className={`spinner-border m-auto ${styles.spinner}`}></div>
        </div>
      )}{" "}
      {error != undefined && (
        <div className="alert alert-danger fw-light fs-5">
          <span className={`d-block fs-6 fw-lighter`}>There was an error</span>
          {error instanceof AxiosError
            ? JSON.stringify(error.response?.data)
            : error.message}
        </div>
      )}
      {reportCatalog != undefined && reportCatalog.length > 0 && (
        <div className={`position-relative`}>
          <button
            onClick={() => {
              queryclient.setQueryData(
                ["reportCatalog", ...serializeBody(catalogQuery)],
                () => []
              );
              queryclient.invalidateQueries({
                queryKey: ["reportCatalog", ...serializeBody(catalogQuery)],
              });
            }}
            className={`btn position-absolute btn-outline-danger ${styles.tableDeleteBtn}`}
          >
            <TrashIcon />
          </button>
          <div className={`${styles.tableHeight}`}>
            <table className="table">
              <thead className="border-bottom border-dark bg-dark text-white">
                <tr>
                  {["Report Name", "Portfolio", "Benchmark", "Currency"].map(
                    (key, i) => {
                      return (
                        <th key={i} className="fw-light fs-5 p-2 ps-4">
                          {key}
                        </th>
                      );
                    }
                  )}
                </tr>
              </thead>
              <tbody className="mt-2">
                {reportCatalog.map((el: InformationObject, i: number) => {
                  return (
                    <tr key={i} className="fw-lighter fs-6 table-hover">
                      <td className="ps-4">{el.reportName}</td>
                      <td className="ps-4">{el.portfolio}</td>
                      <td className="ps-4">{el.benchmark}</td>
                      <td className="ps-4">{el.currency}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogTable;

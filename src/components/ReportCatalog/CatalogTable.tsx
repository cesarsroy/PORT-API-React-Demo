import React from "react";
import reportCatalog, { InformationObject } from "../../services/reportCatalog";
import TrashIcon from "./TrashIcon";
import styles from "./ReportCatalog.module.css";

interface Props {
  setReportCatalog: (data: InformationObject[]) => void;
  reportCatalog: InformationObject[];
}

const CatalogTable = (props: Props) => {
  return (
    <>
      {props.reportCatalog.length > 0 && (
        <div className={`position-relative`}>
          <button
            onClick={() => {
              props.setReportCatalog([]);
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
                {props.reportCatalog.map((el: InformationObject, i: number) => {
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

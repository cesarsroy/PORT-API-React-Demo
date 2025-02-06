import { useContext } from "react";
import ReportDataForm from "./ReportDataForm";
import AccessTokenContext from "../../contexts/accessTokenContext";
import useReportData from "../../hooks/useReportData";
import { AxiosError } from "axios";
import styles from "./ReportData.module.css";
import ExpandableJSON from "./ExpandableJSON";

interface Props {
  reportQuery: ReportDataForm;
}

const ReportDataOutput = ({ reportQuery }: Props) => {
  const { token } = useContext(AccessTokenContext);
  const isEnabled = Object.keys(reportQuery).length > 0;

  const {
    data: reportData,
    isLoading,
    error,
  } = useReportData({
    reportDataForm: reportQuery,
    token,
    isEnabled,
  });

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
      {reportData != undefined && reportData.length > 0 && (
        <ExpandableJSON data={reportData} />
      )}
    </>
  );
};

export default ReportDataOutput;

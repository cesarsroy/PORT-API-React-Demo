import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ReportCatalogBox.module.css";
import getReportData, { ReportFormData } from "../../services/reportData";
import { Axios, AxiosError } from "axios";
import { InformationObject } from "../../services/reportCatalog";

interface Props {
  accessToken: string;
  reportCatalog?: InformationObject[];
}

const ReportDataBox = ({ accessToken }: Props) => {
  //   const { register, formState, handleSubmit } = useForm();

  const callData = () => {
    const body = {
      reportInformation: {
        portfolio: "POPAPI_ALM_DEMO",
        reportName: "POPAPI_DEMO_TE",
      },
    };
    console.log("Token before data", accessToken);
    getReportData(body, accessToken).then((d) => console.log(d));
  };

  return (
    <div className="h4 text-secondary mt-3 pt-2 border-top border-secondary">
      Report Data Example
      <p className="fst-italic fw-normal h6 pt-2">
        Use this to retrieve the actual report data.
      </p>
      <button className="btn btn-success" onClick={() => callData()}>
        Run
      </button>
    </div>
  );
};

export default ReportDataBox;

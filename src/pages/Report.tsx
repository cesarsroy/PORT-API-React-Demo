import { useState } from "react";
import { InformationObject } from "../services/reportCatalog";
import AccessTokenBox from "../components/AccessTokenBox";
import ReportCatalogBox from "../components/ReportCatalog/ReportCatalog";
import ReportDataBox from "../components/ReportDataBox/ReportDataBox";

const Report = () => {
  const [accessToken, setAccesstoken] = useState("");

  return (
    <>
      <AccessTokenBox />
      <ReportCatalogBox />
      <ReportDataBox />
    </>
  );
};

export default Report;

import { useState } from "react";
import AccessTokenBox from "./components/AccessTokenBox";
import ReportCatalogBox from "./components/ReportCatalog/ReportCatalog";
import { InformationObject } from "./services/reportCatalog";
import ReportDataBox from "./components/ReportDataBox/ReportDataBox";
// https://raybo.org/slides_bootstrap5/#/
function App() {
  const [accessToken, setAccesstoken] = useState("");
  const [reportCatalog, setreportCatalog] = useState<InformationObject[]>([]);

  const onGettingToken = (token: string) => {
    setAccesstoken(token);
  };
  return (
    <>
      <div className="container position-relative mt-5 mb-5">
        <h3 className="h1"> PORT API Javascript Demo</h3>
        <AccessTokenBox onGettingToken={onGettingToken} />
        <ReportCatalogBox
          accessToken={accessToken}
          onCatalogUpdate={(data) => setreportCatalog(data)}
          reportCatalog={reportCatalog}
        ></ReportCatalogBox>
        <ReportDataBox
          accessToken={accessToken}
          reportCatalog={reportCatalog}
        ></ReportDataBox>
      </div>
    </>
  );
}

export default App;

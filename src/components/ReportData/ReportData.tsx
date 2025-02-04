import getReportData from "../../services/reportData";
import { InformationObject } from "../../services/reportCatalog";
import { useContext } from "react";
import AccessTokenContext from "../../contexts/accessTokenContext";

const ReportDataBox = () => {
  //   const { register, formState, handleSubmit } = useForm();
  const { token } = useContext(AccessTokenContext);
  const callData = () => {
    const body = {
      reportInformation: {
        portfolio: "POPAPI_ALM_DEMO",
        reportName: "POPAPI_DEMO_TE",
      },
    };
    console.log("Token before data", token);
    getReportData(body, token).then((d) => console.log(d));
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

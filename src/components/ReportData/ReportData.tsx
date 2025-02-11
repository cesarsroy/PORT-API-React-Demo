import { useState } from "react";
import ReportDataForm from "./ReportDataForm";
import ReportDataOutput from "./ReportDataOutput";

const ReportData = () => {
  const [reportQuery, setReportQuery] = useState<ReportDataForm>({
    portfolio: "MYR-IEQ",
    reportName: "AIM_TE",
    date: "2024-09-30",
  } as ReportDataForm);

  return (
    <div className="h4 text-secondary mt-3 pt-2 border-top border-secondary">
      Report Data Example
      <p className="fst-italic fw-normal h6 pt-2">
        Use this to retrieve the actual report data corresponding to a report
      </p>
      <ReportDataForm
        updateReportDataQuery={(d: ReportDataForm) => setReportQuery(d)}
      />
      <ReportDataOutput reportQuery={reportQuery} />
    </div>
  );
};

export default ReportData;

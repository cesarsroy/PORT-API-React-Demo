import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./ReportData.module.css";
import AccessTokenContext from "../../contexts/accessTokenContext";

interface ReportDataForm {
  [key: string]: any;
  portfolio: string;
  reportName: string;
  date: string;
}

interface Props {
  updateReportDataQuery: (d: ReportDataForm) => void;
}

const ReportDataForm = ({ updateReportDataQuery }: Props) => {
  const { register, getValues } = useForm<ReportDataForm>();
  const { token } = useContext(AccessTokenContext);

  return (
    <form>
      <div className="input-group m-2">
        <span className={`input-group-text ${styles.wideInputText}`}>
          {" "}
          Portfolio
        </span>
        <input
          {...register("portfolio")}
          className="form-control"
          type="text"
          defaultValue="MYR-GFI"
          placeholder="Portfolio"
        ></input>
      </div>
      <div className="input-group m-2">
        <span className={`input-group-text ${styles.wideInputText}`}>
          {" "}
          Report Name
        </span>
        <input
          {...register("reportName")}
          className="form-control"
          type="text"
          defaultValue="AIM_TE"
          placeholder="PREP report name."
        ></input>
      </div>
      <div className="input-group m-2">
        <span className={`input-group-text ${styles.wideInputText}`}>
          {" "}
          Date
        </span>
        <input
          {...register("date")}
          className="form-control"
          type="date"
          placeholder="Benchmark to filter the report catalog by."
        ></input>
      </div>
      <div className="d-flex">
        <button
          className={`btn btn-outline-primary m-2 ${token ? "" : "disabled"}`}
          type="button"
          disabled={!token}
          onClick={(event) => {
            event.preventDefault();
            const currenFormData = getValues();
            if (!currenFormData.date)
              currenFormData["date"] = new Date().toISOString().split("T")[0];
            updateReportDataQuery(currenFormData);
          }}
        >
          Get Report Data
        </button>
      </div>
    </form>
  );
};

export default ReportDataForm;

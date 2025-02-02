import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import getReportCatalog, {
  CatalogFormData,
  InformationObject,
} from "../../services/reportCatalog";
import styles from "./ReportCatalog.module.css";
import AccessTokenContext from "../../contexts/accessTokenContext";

interface Props {
  setCatalogError: (err: string) => void;
  setReportCatalog: (data: InformationObject[]) => void;
}

const CatalogForm = (props: Props) => {
  const { token } = useContext(AccessTokenContext);
  const [isLoading, setIsLoading] = useState(false);
  const { register, formState, handleSubmit } = useForm<CatalogFormData>();

  const onError = (err: AxiosError) => {
    props.setCatalogError(JSON.stringify(err?.response?.data || {}));
  };
  const onCatalogSumbit = (data: CatalogFormData) => {
    props.setCatalogError("");
    props.setReportCatalog([]);

    setIsLoading(true);
    console.log("The FORM has the following data");
    console.log(data);
    console.log("The FORM state is");
    console.log(formState);
    async function executeSubmit() {
      const _catalogResponse = await getReportCatalog(data, token, onError);
      props.setReportCatalog([..._catalogResponse]);
      setIsLoading(false);
    }
    executeSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onCatalogSumbit)}>
      <div className="input-group m-2">
        <span className={`input-group-text ${styles.wideInputText}`}>
          {" "}
          Portfolio
        </span>
        <input
          {...register("portfolio")}
          className="form-control"
          type="text"
          placeholder="Portfolio to filter the report catalog by."
        ></input>
      </div>
      <div className="input-group m-2">
        <span className={`input-group-text ${styles.wideInputText}`}>
          {" "}
          Currency
        </span>
        <input
          {...register("currency")}
          className="form-control"
          type="text"
          placeholder="Currency to filter the report catalog by."
        ></input>
      </div>
      <div className="input-group m-2">
        <span className={`input-group-text ${styles.wideInputText}`}>
          {" "}
          Benchmark
        </span>
        <input
          {...register("benchmark")}
          className="form-control"
          type="text"
          placeholder="Benchmark to filter the report catalog by."
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
          placeholder="Report Name to filter the report catalog by."
        ></input>
      </div>
      <div className="d-flex">
        <button
          className={`btn btn-outline-primary m-2 w-50 ${
            token ? "" : "disabled"
          }`}
          type="submit"
          disabled={!token || isLoading}
        >
          Get Report Catalog
        </button>
        {isLoading && (
          <div className={`spinner-border m-auto ${styles.spinner}`}></div>
        )}
      </div>
    </form>
  );
};

export default CatalogForm;

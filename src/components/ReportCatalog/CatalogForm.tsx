import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CatalogFormData } from "../../services/reportCatalog";
import styles from "./ReportCatalog.module.css";
import AccessTokenContext from "../../contexts/accessTokenContext";

interface Props {
  updateCatalogQuery: (d: CatalogFormData) => void;
}

const CatalogForm = ({ updateCatalogQuery }: Props) => {
  const { register, getValues } = useForm<CatalogFormData>();
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
          className={`btn btn-outline-primary m-2 ${token ? "" : "disabled"}`}
          type="button"
          disabled={!token}
          onClick={(event) => {
            event.preventDefault();
            const currenFormData = getValues();
            updateCatalogQuery(currenFormData);
          }}
        >
          Get Report Catalog
        </button>
      </div>
    </form>
  );
};

export default CatalogForm;

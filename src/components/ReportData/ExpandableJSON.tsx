import { useState } from "react";
import JSONPretty from "react-json-pretty";
import styles from "./ReportData.module.css";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
interface Props {
  data: Object[];
}

const theme = {
  main: "line-height:1;font-size:0.9rem;color:#748096;background:#FFFFFF;overflow:auto;",
  error:
    "line-height:1;font-size:0.9rem;color:#748096;background:#FFFFFF;overflow:auto;",
  key: "color:#b553bf;",
  string: "color:#fba856;",
  value: "color:#93a3bf;",
  boolean: "color:#448aa9;",
};

const ExpandableJSON = ({ data }: Props) => {
  const [showJSON, setShowJSON] = useState(true);

  return (
    <div className="card">
      <div
        className={`card-header d-flex justify-content-between fst-italic fw-light fs-6 text-secondary pb-0 ${styles.clickable}`}
        onClick={() => {
          setShowJSON(!showJSON);
        }}
      >
        <p>{showJSON ? "Hide" : "Display"} Report JSON Records</p>
        {showJSON ? (
          <MdOutlineKeyboardArrowDown />
        ) : (
          <MdOutlineKeyboardArrowUp />
        )}
      </div>
      <div
        id="jsonContainer"
        className={`card-body ${styles.jsonHeight} ${
          showJSON ? "d-block" : "d-none"
        }`}
      >
        <JSONPretty id="json-pretty" data={data} theme={theme} />
      </div>
    </div>
  );
};

export default ExpandableJSON;

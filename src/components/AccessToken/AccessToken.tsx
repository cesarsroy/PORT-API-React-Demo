import { useContext, useEffect, useRef, useState } from "react";
import ServerModeClient from "../../services/oauth";
import styles from "./AccessToken.module.css";
import AccessTokenContext from "../../contexts/accessTokenContext";

const AccessToken = () => {
  const { token, setToken } = useContext(AccessTokenContext);
  enum TokenStatus {
    Undefined,
    Existed,
    Failed,
    Success,
  }

  const [alertVisible, setAlertVisible] = useState(true);
  const [tokenStatus, setTokenStatus] = useState(
    token !== "" ? TokenStatus.Existed : TokenStatus.Undefined
  );
  const clientIdRef = useRef<HTMLInputElement>(null);
  const clientSecretRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clientIdRef?.current?.setAttribute(
      "value",
      localStorage.getItem("clientIdServerMode") || ""
    );
    clientSecretRef?.current?.setAttribute(
      "value",
      localStorage.getItem("clientSecretServerMode") || ""
    );
  }, []);

  const handleClick = async () => {
    console.log("Starting to get server access token");
    const clientId = clientIdRef?.current?.value || "";
    const clientSecret = clientSecretRef?.current?.value || "";

    if (clientId != "") localStorage.setItem("clientIdServerMode", clientId);
    if (clientSecret != "")
      localStorage.setItem("clientSecretServerMode", clientSecret);

    const client = new ServerModeClient(clientId, clientSecret);
    const accessToken = await client.getAccessToken();

    if (accessToken) {
      setToken(accessToken);
      setTokenStatus(TokenStatus.Success);
    } else {
      setTokenStatus(TokenStatus.Failed);
    }
    setAlertVisible(true);
  };

  function switchMessage(tokenStatus: TokenStatus) {
    const timeoutId = setTimeout(() => setAlertVisible(false), 2000);

    if (alertVisible) {
      setTimeout(() => {
        console.debug("Timing out the display none for the alert");
        document
          .querySelector(`.${styles.alertHidden}`)
          ?.classList.add(styles.alertRemoved);
      }, 2700);
    }

    const fadeStylelogic = alertVisible ? "" : styles.alertHidden;
    switch (tokenStatus) {
      case TokenStatus.Existed:
        return (
          <div className={`alert mt-2 alert-primary ${fadeStylelogic}`}>
            Access Token Retrieved from State.
          </div>
        );
      case TokenStatus.Undefined:
        clearTimeout(timeoutId);
        return (
          <div
            className="mt-2 alert position-relative alert-warning alert-dismissable show fade"
            role="alert"
          >
            Request Access Token Before Continuing.
            <button
              type="button"
              className="btn-close position-absolute end-0 me-4"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        );
      case TokenStatus.Success:
        return (
          <div className={`mt-2 alert alert-success ${fadeStylelogic}`}>
            Access Token Retrieved Successfully.
          </div>
        );

      case TokenStatus.Failed:
        clearTimeout(timeoutId);
        return (
          <div className={`mt-2 alert alert-danger ${fadeStylelogic}`}>
            Error retrieving token.
          </div>
        );
    }
  }

  return (
    <>
      <p className="text-secondary fs-6 fst-italic">
        {" "}
        PORT API Requires a token in the Authorization Headers. Click the button
        to get it.
      </p>
      <div className="d-flex w-100 mb-3">
        <div className="w-25">
          <input
            type="text"
            className="form-control me-2"
            ref={clientIdRef}
            placeholder="Client ID"
          ></input>
          <small className="form-text text-mute ps-4">
            Enter your Client Id
          </small>
        </div>
        <div className="w-50">
          <input
            type="text"
            className="form-control ms-2"
            ref={clientSecretRef}
            placeholder="Client Secret"
          ></input>
          <small className="form-text text-mute ps-4">
            Enter your Client Secret
          </small>
        </div>
      </div>
      <button onClick={handleClick} className="btn btn-outline-success">
        Get Server Mode Access Token
      </button>
      {switchMessage(tokenStatus)}
    </>
  );
};

export default AccessToken;

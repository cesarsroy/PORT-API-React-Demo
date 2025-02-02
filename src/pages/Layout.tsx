import Title from "../components/Title";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import AccessTokenContext from "../contexts/accessTokenContext";
import { useState } from "react";

const Layout = () => {
  const [token, setToken] = useState("");
  return (
    <AccessTokenContext.Provider value={{ token, setToken }}>
      <div className="container position-relative mt-5 mb-5">
        <Title />
        <NavBar />
        <Outlet />
      </div>
    </AccessTokenContext.Provider>
  );
};

export default Layout;

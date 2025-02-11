import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              ReportAPI
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/optimizer">
              Optimizer API
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/workflow">
              Workflow API
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assests/img/nbt-logo.jpg";

import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <header>
      <div className={styles["header-left"]}>
        <Link to={"/"}>
          <img
            alt="Next Big Thing Logo"
            src={logo}
            height="40"
            className="mr-2"
          />
        </Link>
      </div>

      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Reports</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Sensor</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Menu;

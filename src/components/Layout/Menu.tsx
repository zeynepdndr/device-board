import { Link } from "react-router-dom";
import logo from "../../assests/img/nbt-logo.jpg";

import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <header>
      <div className={styles["header-left"]}>
        <a href={"https://nextbigthing.ag/"}>
          <img
            alt="Next Big Thing Logo"
            src={logo}
            height="40"
            className="mr-2"
          />
        </a>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Dashboard</Link>
            </li>
            <li>
              {/* Hard-coded link to provide exact design */}
              <Link to={"/"}>Reports</Link>
            </li>
            <li>
              {/* Hard-coded link to provide exact design */}
              <Link to={"/"}>Sensor</Link>
            </li>
            <li>
              {/* Hard-coded link to provide exact design */}
              <Link to={"/"}>Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Menu;

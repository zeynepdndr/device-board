import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <div className={styles.card}>
      {/* <Menubar model={items} start={start} end={end} /> */}
      <nav className="flex">
        <NavLink
          to="/dashboard"
          className="px-5 py-3 no-underline text-900 text-xl border-bottom-2 border-300 hover:border-500"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/"
          className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500"
        >
          Home
        </NavLink>
        <NavLink
          to="/add-sensor"
          className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500"
        >
          Add Sensor
        </NavLink>
      </nav>
    </div>
  );
};

export default MainNavigation;

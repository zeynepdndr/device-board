import { BrowserRouter as Router, NavLink } from "react-router-dom";

import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import logo from "../../assests/img/logo.jpg";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      url: "/",
    },
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-bars",
      url: "/dashboard",
    },
    {
      label: "Reports",
      icon: "pi pi-fw pi-file",
    },
    {
      label: "Sensors",
      icon: "pi pi-fw pi-video",
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
    },
    {
      label: "Settings",
      icon: "pi pi-fw pi-calendar",
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  const start = (
    <img
      alt="Next Big Thing Logo"
      src={logo}
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <>
      <InputText placeholder="Search" type="text" className="mr-4" />
      <Button label="Logout" icon="pi pi-power-off" />
    </>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

export default MainNavigation;

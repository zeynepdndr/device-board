import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import { Container, Header, Content, Footer } from "rsuite";

import GroupIcon from "@rsuite/icons/legacy/Group";
import HomeIcon from "@rsuite/icons/legacy/Home";

import "rsuite/dist/rsuite.css";
import nbtLogo from "../../../assests/img/logo.jpg";

import styles from "./SideNav.module.css";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: "#34c3ff",
  color: " #fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const SideNav = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");

  return (
    <div style={{ width: 240 }}>
      <Sidenav expanded={expanded} defaultOpenKeys={["3", "4"]}>
        <Sidenav.Toggle
          expanded={expanded}
          onToggle={(expanded: any) => setExpanded(expanded)}
        />
        <Sidenav.Header>
          <div style={{ height: 56 }}>
            <span style={{ marginLeft: 12 }}>
              <img
                src={nbtLogo}
                alt="Next Big Thing"
                style={{ width: "5rem" }}
              />
            </span>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<HomeIcon />}>
              <Link to={"/"}>HOME</Link>
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<DashboardIcon />}>
              <Link to={"/dashboard"}>DASHBOARD</Link>
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<GroupIcon />}>
              <Link to={"/sensor"}>SENSOR</Link>
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SideNav;

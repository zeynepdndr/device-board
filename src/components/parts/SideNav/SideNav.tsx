import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

import nbtLogo from "../../assests/img/logo.jpg";

import styles from "./SideNav.module.css";
import Dashboard from "../../../pages/Dashboard/Dashboard";

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
      <div style={{ height: 56 }}>
        <span style={{ marginLeft: 12 }}>
          <img src={nbtLogo} alt="Next Big Thing" style={{ width: "5rem" }} />
        </span>
      </div>
      {/* 
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<HomeIcon />} as={Link} to="/">
              HOME
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              icon={<DashboardIcon />}
              as={Link}
              to="/dashboard"
            >
              DASHBOARD
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<GroupIcon />} as={Link} to="/sensor">
              SENSOR
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>*/}
    </div>
  );
};

export default SideNav;

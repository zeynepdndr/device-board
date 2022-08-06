import React from "react";
import { Link } from "react-router-dom";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";

import "rsuite/dist/rsuite.css";
import styles from "./SideNav.module.css";

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
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              <Link to={"/"}>HOME</Link>
            </Nav.Item>
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              <Link to={"/dashboard"}>DASHBOARD</Link>
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              SENSORS
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SideNav;

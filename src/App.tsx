import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Header, Content, Footer } from "rsuite";
import SideNav from "./components/Layout/SideNav/SideNav";
import "./App.css";
import "rsuite/dist/rsuite.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Sensor from "./components/Sensors/SensorItem";

function App() {
  return (
    <div className="show-container show-fake-browser sidebar-page">
      <Router>
        <Container>
          <Content>
            <SideNav></SideNav>
            <Routes>
              {/* {getRoutes(routes)} */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/sensor" element={<Sensor />} /> */}
              <Route path="/" element={null} />
            </Routes>
          </Content>
        </Container>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Header, Content, Footer } from "rsuite";
import SideNav from "./components/SideNav/SideNav";
import "./App.css";
import "rsuite/dist/rsuite.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import SensorForm from "./components/SensorForm/SensorForm";
import Sensor from "./pages/Sensor/Sensor";

function App() {
  return (
    <div className="show-container show-fake-browser sidebar-page">
      <Router>
        <Container>
          <SideNav></SideNav>
          <Container>
            <Content>
              <Routes>
                {/* {getRoutes(routes)} */}
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/sensor" element={<Sensor />} /> */}
                <Route path="/" element={null} />
                <Route path="/add-sensor" element={<SensorForm />} />
              </Routes>
            </Content>
          </Container>
        </Container>
      </Router>
    </div>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import SideNav from "./components/parts/SideNav/SideNav";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import SensorForm from "./components/parts/SensorForm/SensorForm";
import Sensor from "./pages/Sensor/Sensor";

// import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
// import "primereact/resources/primereact.min.css"; //core css
// import "primeicons/primeicons.css"; //icons

// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* {getRoutes(routes)} */}
          <Route path="/" element={<Dashboard />} />
          <Route path="sensor/:device_id" element={<Sensor />} />
          <Route path="add-sensor" element={<SensorForm />} />
          <Route
            path="edit-sensor/:device_id/:location/:customer"
            element={<SensorForm />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

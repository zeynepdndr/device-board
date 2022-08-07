import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import SideNav from "./components/SideNav/SideNav";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import SensorForm from "./components/SensorForm/SensorForm";
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

function App() {
  return (
    <div>
      <Router>
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
        <div className="p-5">
          <Routes>
            {/* {getRoutes(routes)} */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sensor/:device_id" element={<Sensor />} />
            <Route path="/" element={null} />
            <Route path="add-sensor/:device_id" element={<SensorForm />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

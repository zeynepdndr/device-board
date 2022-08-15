import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import SensorForm from "./pages/SensorForm/SensorForm";

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
import SensorDetail from "./pages/SensorDetail/SensorDetail";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        {/* {getRoutes(routes)} */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sensors/:device_id" element={<SensorDetail />} />
        <Route path="/add-sensor" element={<SensorForm />} />
        <Route
          path="/edit-sensor/:device_id/:location/:customer"
          element={<SensorForm />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;

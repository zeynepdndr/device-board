import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SideNav from "./components/Layout/SideNav/SideNav";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <SideNav></SideNav>
      <Routes>
        {/* {getRoutes(routes)} */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

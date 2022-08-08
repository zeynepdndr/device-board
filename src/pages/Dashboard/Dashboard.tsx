import Sensors from "../../components/Sensors/Sensors";
import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import "./Dashboard.css";
import SensorTemperatures from "../../components/Charts/SensorTemperatures/SensorTemperatures";
import { FaVideo, FaUsers, FaExclamationCircle } from "react-icons/fa";
const Dashboard = () => {
  const [favoritesIsShown, setFavoritesIsShown] = useState(false);
  const [sensors, setSensors] = useState();
  const [error, setError] = useState(false);
  const [sensorsCount, setSensorCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSensors = () => {
    setIsLoading(true);
    fetch("http://localhost:3009/sensor")
      .then((res) => res.json())
      .then((json) => {
        setSensors(json.results);
        setIsLoading(false);
        setSensorCounts(json.paging.count);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getSensors();
  }, []);
  useEffect(() => {}, [sensors]);
  const header = <p className="p-card-title">SENSOR TEMPERATURES</p>;
  return (
    <>
      <div className="card">
        <div className="flex card-container indigo-container">
          <div className="flex-1 bg-indigo-500 text-white font-bold text-center p-4 border-round">
            <FaVideo />
            <h4>TOTAL SENSOR</h4>
            {sensorsCount}
          </div>
          <div className="flex-1  bg-indigo-500 text-white font-bold text-center p-4 border-round mx-4">
            <FaExclamationCircle />
            <h4>OPEN ALERTS</h4>AiOutlineAlert ??
          </div>
          <div className="flex-1  bg-indigo-500 text-white font-bold text-center p-4 border-round">
            <FaUsers />
            <h4>TOTAL CUSTOMERS</h4>
            ??
          </div>
        </div>
      </div>
      <Card header={header}>
        <SensorTemperatures />
      </Card>

      <div>{!isLoading && !error && <Sensors items={sensors} />} </div>
    </>
  );
};

export default Dashboard;

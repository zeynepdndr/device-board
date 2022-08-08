import Sensors from "../../components/parts/Sensors/Sensors";
import { useState, useEffect } from "react";
import SensorTemperatures from "../../components/parts/Charts/SensorTemperatures/SensorTemperatures";
import { Card } from "primereact/card";
import { FaVideo, FaUsers, FaExclamationCircle } from "react-icons/fa";

import "./Dashboard.css";

const Dashboard = () => {
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
      <div className="card p-2 mb-4">
        <div className="flex card-container indigo-container ">
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
      <Card header={header} className="p-4 mb-4">
        <SensorTemperatures />
      </Card>

      <div>{!isLoading && !error && <Sensors items={sensors} />} </div>
    </>
  );
};

export default Dashboard;

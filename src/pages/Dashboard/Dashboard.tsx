import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  FaVideo,
  FaUsers,
  FaExclamationCircle,
  FaWindowRestore,
} from "react-icons/fa";
import SensorList from "../../components/parts/Sensors/SensorList";
import SensorTemperatures from "../../components/parts/Charts/SensorTemperatures/SensorTemperatures";
import { DEVICESURL } from "../../constants/global";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sensors, setSensors] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [sensorsCount, setSensorCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSensors = () => {
    setIsLoading(true);
    fetch(DEVICESURL)
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

  const headerChart = (
    <p className="text-left font-bold text-black m-2">SENSOR TEMPERATURES</p>
  );

  const headerList = (
    <div className="flex justify-content-between flex-wrap card-container">
      <div className="flex align-items-center justify-content-center font-bold text-black m-2align-items-center justify-content-center font-bold text-black m-2">
        SENSOR LIST
      </div>
      <div className="flex align-items-center justify-content-center  font-bold text-black  m-2">
        <Button
          label="Add Sensor"
          icon="pi pi-plus"
          aria-label="Submit"
          onClick={() => navigate("/add-sensor")}
        />
      </div>
    </div>
  );

  let chartContent = <div>No data found!</div>;
  let listContent = <div>No data found!</div>;
  const loadingStatus = (onContent: boolean) => (
    <ProgressSpinner
      style={{
        width: `${onContent ? "50px" : "30px"}`,
        height: `${onContent ? "50px" : "30px"}`,
      }}
      strokeWidth="7"
      fill={onContent ? `var(--surface-ground)` : undefined}
      animationDuration=".8s"
    />
  );

  if (sensors?.length > 0) {
    chartContent = <SensorTemperatures />;
    listContent = <SensorList items={sensors} />;
  }

  if (error) {
    chartContent = <p>Something went wrong!</p>;
    listContent = <p>Something went wrong!</p>;
  }

  if (isLoading) {
    chartContent = loadingStatus(true);
    listContent = loadingStatus(true);
  }

  return (
    <>
      <div className="card p-2 mb-4">
        <div className="flex card-container indigo-container ">
          <div className="flex-1 bg-indigo-500 text-white font-bold text-center p-4 border-round">
            <FaVideo />
            <h4>TOTAL SENSOR</h4>
            {sensorsCount ? sensorsCount : loadingStatus(false)}
          </div>
          <div className="flex-1  bg-indigo-500 text-white font-bold text-center p-4 border-round mx-4">
            <FaExclamationCircle />
            <h4>OPEN ALERTS</h4>
            {/* Hard-coded data for open alerts on dashboard, since it is not provided by the api */}
            2
          </div>
          <div className="flex-1  bg-indigo-500 text-white font-bold text-center p-4 border-round">
            <FaUsers />
            <h4>TOTAL CUSTOMERS</h4>
            {/* Hard-coded data for total customer on dashboard, since it is not provided by the api */}
            14
          </div>
        </div>
      </div>
      <Card header={headerChart} className="p-4 mb-4 text-center">
        {chartContent}
      </Card>
      <Card header={headerList} className="p-4 mb-4 text-center">
        {listContent}
      </Card>
    </>
  );
};

export default Dashboard;

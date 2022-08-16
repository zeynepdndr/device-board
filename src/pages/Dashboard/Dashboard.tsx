import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FaVideo, FaUsers, FaExclamationCircle } from "react-icons/fa";
import SensorList from "../../components/parts/SensorList/SensorList";
import SensorTemperatures from "../../components/parts/Charts/SensorTemperatures/SensorTemperatures";
import Spinner from "../../components/partials/Spinner";
import ErrorStatus from "../../components/partials/ErrorStatus";
import useHttp from "../../hooks/use-http";
import { getAllSensors } from "../../lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    sendRequest,
    status,
    error,
    data: sensors,
  } = useHttp(getAllSensors, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const headerChart = (
    <p
      className="text-left font-bold m-2"
      style={{ color: "#292325", fontSize: "1.25rem" }}
    >
      SENSOR TEMPERATURES
    </p>
  );

  const headerList = (
    <div className="flex justify-content-between flex-wrap card-container">
      <div
        className="flex align-items-center justify-content-center font-bold"
        style={{ color: "#292325", fontSize: "1.25rem" }}
      >
        SENSOR LIST
      </div>
      <div className="flex align-items-center justify-content-center  font-bold   m-2">
        <Button
          label="Add Sensor"
          icon="pi pi-plus"
          aria-label="Submit"
          style={{
            borderColor: "#003c1f",
            color: "#fff",
            backgroundColor: "#003c1f",
          }}
          onClick={() => navigate("/add-sensor")}
        />
      </div>
    </div>
  );

  let listContent = <div>Found no sensors.</div>;

  const loadingStatus = (onContent: boolean) => (
    <Spinner onContent={onContent} />
  );

  if (sensors?.loadedSensors?.length > 0) {
    listContent = <SensorList items={sensors.loadedSensors} />;
  }

  if (error) {
    listContent = <ErrorStatus onContent={true} message={error} />;
  }

  if (status === "pending") {
    listContent = loadingStatus(true);
  }

  return (
    <>
      <div className="card p-2 mb-4">
        <div className="flex card-container">
          <div
            className="flex-1 font-bold text-center p-4 border-round"
            style={{ backgroundColor: "#eeeeee", color: "#635d60" }}
          >
            <FaVideo />
            <h4>TOTAL SENSOR</h4>
            {!error && status !== "pending" && sensors.count}
            {status === "pending" && loadingStatus(false)}
            {error && <ErrorStatus onContent={false} message={error} />}
          </div>
          <div
            className="flex-1 font-bold text-center p-4 border-round mx-4"
            style={{ backgroundColor: "#eeeeee", color: "#635d60" }}
          >
            <FaExclamationCircle />
            <h4>OPEN ALERTS</h4>
            {/* Hard-coded data for open alerts on dashboard, since it is not provided by the api */}
            {/* For that reason, loading and error case are not added*/}2
          </div>
          <div
            className="flex-1 font-bold text-center p-4 border-round mx-4"
            style={{ backgroundColor: "#eeeeee", color: "#635d60" }}
          >
            <FaUsers />
            <h4>TOTAL CUSTOMERS</h4>
            {/* Hard-coded data for total customer on dashboard, since it is not provided by the api */}
            {/* For that reason, loading and error case are not added*/}
            14
          </div>
        </div>
      </div>
      <Card header={headerChart} className="p-4 mb-4 text-center">
        <SensorTemperatures />
      </Card>
      <Card header={headerList} className="p-4 text-center">
        {listContent}
      </Card>
    </>
  );
};

export default Dashboard;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider } from "primereact/divider";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
// import "../../index.css";

import { Splitter, SplitterPanel } from "primereact/splitter";
import WeeklyAverageTemp from "../../components/Charts/WeeklyAverageTemp/WeeklyAverageTemp";

const Sensor = () => {
  const param = useParams();

  const [favoritesIsShown, setFavoritesIsShown] = useState(false);
  const [sensorData, setSensorData] = useState<any>();
  const [error, setError] = useState(false);
  const [sensorDataCount, setSensorCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSensorData = () => {
    setIsLoading(true);
    fetch(`http://localhost:3009/sensor/${param.device_id}`)
      .then((res) => res.json())
      .then((json) => {
        setSensorData(json.result);
        setIsLoading(false);
        setSensorCounts(json.paging.count);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getSensorData();
  }, []);
  useEffect(() => {
    console.log("sensor:", sensorData);
  }, [sensorData]);

  return (
    <div>
      <div className="card">
        <h5>Horizontal</h5>
        <Splitter style={{ height: "300px" }} className="mb-5">
          <SplitterPanel className="p-2">
            <div>
              <div>
                <h4>TOTAL MESSAGES</h4>
                {sensorData?.overview?.total_messages}
              </div>
              <Divider />
              <div>
                <h4>DOWN TIME</h4>
                {sensorData?.overview?.down_time}
              </div>
              <Divider />
              <div>
                <h4>ALERTS</h4>
                {sensorData?.overview?.alerts}
              </div>
            </div>
          </SplitterPanel>
          <SplitterPanel className="flex align-items-center justify-content-center">
            <WeeklyAverageTemp dataPoints={[sensorData]} />
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  );
};

export default Sensor;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider } from "primereact/divider";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ProgressSpinner } from "primereact/progressspinner";
import WeeklyAverageTemp from "../../components/parts/Charts/WeeklyAverageTemp/WeeklyAverageTemp";
import TemperatureDaily from "../../components/parts/Charts/TemperatureDaily/TemperatureDaily";
import SystemLog from "../../components/parts/SystemLog/SystemLog";
import Activity from "../../components/parts/Activity/Activity";
import { DEVICEURL } from "../../constants/global";

const Sensor = () => {
  const param = useParams();

  const [deviceId] = useState(param);
  const [sensorData, setSensorData] = useState<any>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getSensorData = () => {
    setIsLoading(true);
    fetch(DEVICEURL + `${param.device_id} `)
      .then((res) => res.json())
      .then((json) => {
        setSensorData(json.result);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
        console.log("err:", err);
      });
  };

  useEffect(() => {
    getSensorData();
  }, []);

  let messageData = <div>No data found!</div>;
  let downTimeData = <div>No data found!</div>;
  let alertData = <div>No data found!</div>;

  const loadingStatus = (onContent: boolean) => (
    <ProgressSpinner
      style={{
        width: `${onContent ? "50px" : "30px"}`,
        height: `${onContent ? "50px" : "30px"}`,
        margin: 0,
      }}
      strokeWidth="7"
      fill={onContent ? `var(--surface-ground)` : undefined}
      animationDuration=".8s"
    />
  );

  if (sensorData) {
    messageData = <p>{sensorData?.overview?.total_messages}</p>;
    downTimeData = <p>{sensorData?.overview?.down_time}</p>;
    alertData = <p>{sensorData?.overview?.alerts}</p>;
  }

  if (error) {
    messageData = <p>Something went wrong!</p>;
    downTimeData = <p>Something went wrong!</p>;
    alertData = <p>Something went wrong!</p>;
  }

  if (isLoading) {
    messageData = loadingStatus(false);
    downTimeData = loadingStatus(false);
    alertData = loadingStatus(false);
  }

  return (
    <div>
      <div className="card">
        <Splitter>
          <SplitterPanel className="p-2">
            <div className="card">
              <div className="flex justify-content-around flex-wrap align-items-center text-black m-2 ">
                <h4>TOTAL MESSAGES</h4>
                {messageData}
              </div>
              <Divider />
              <div className="flex justify-content-around flex-wrap align-items-center text-black m-2">
                <h4>DOWN TIME</h4>
                {downTimeData}
              </div>
              <Divider />
              <div className="flex justify-content-around flex-wrap align-items-center text-black m-2">
                <h4>ALERTS</h4>
                {alertData}
              </div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <WeeklyAverageTemp deviceId={deviceId.toLocaleString()} />
          </SplitterPanel>
        </Splitter>
      </div>
      <div className="card">
        <TemperatureDaily />
      </div>
      <div className="card">
        <div className="flex card-container indigo-container">
          <div className="flex-1  p-4 border-round text-black">
            <SystemLog deviceId={deviceId} />
          </div>
          <div className="flex-1  p-4 border-round ">
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sensor;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider } from "primereact/divider";
import { Splitter, SplitterPanel } from "primereact/splitter";
import WeeklyAverageTemp from "../../components/parts/Charts/WeeklyAverageTemp/WeeklyAverageTemp";
import TemperatureDaily from "../../components/parts/Charts/TemperatureDaily/TemperatureDaily";
import SystemLog from "../../components/parts/SystemLog/SystemLog";
import Activity from "../../components/parts/Activity/Activity";
import Spinner from "../../components/partials/Spinner";
import ErrorStatus from "../../components/partials/ErrorStatus";

const SensorDetail = () => {
  const param = useParams();

  const [deviceId] = useState(param);
  const [sensorData, setSensorData] = useState<any>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSensorData = () => {
    setIsLoading(true);
    // fetch(DEVICEURL + `${deviceId} `)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setSensorData(json.result);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     setError(err.message);
    //   });
  };

  useEffect(() => {
    getSensorData();
  }, []);

  let messageData = <div>No data found!</div>;
  let downTimeData = <div>No data found!</div>;
  let alertData = <div>No data found!</div>;

  const loadingStatus = (onContent: boolean) => (
    <Spinner onContent={onContent} />
  );

  if (sensorData) {
    messageData = <p>{sensorData?.overview?.total_messages}</p>;
    downTimeData = <p>{sensorData?.overview?.down_time}</p>;
    alertData = <p>{sensorData?.overview?.alerts}</p>;
  }

  if (error) {
    messageData = <ErrorStatus onContent={false} message={error} />;
    downTimeData = <ErrorStatus onContent={false} message={error} />;
    alertData = <ErrorStatus onContent={false} message={error} />;
  }

  if (isLoading) {
    messageData = loadingStatus(false);
    downTimeData = loadingStatus(false);
    alertData = loadingStatus(false);
  }

  return (
    <div>
      <div className="card  mb-4 ">
        <Splitter>
          <SplitterPanel style={{ maxWidth: "30%" }}>
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
      <div className="card  mb-4 ">
        <TemperatureDaily deviceId={deviceId} />
      </div>
      <div>
        <div className="flex">
          <div className="flex-1">
            <div className="p-card">
              <p
                className="text-left font-bold pl-5 pt-5  pb-5"
                style={{ color: "#292325", fontSize: "1.25rem" }}
              >
                SYSTEM LOG
              </p>
              <SystemLog deviceId={deviceId} />
            </div>
          </div>
          <div className="flex-1">
            <div className="p-card">
              <p
                className="text-left font-bold pl-5 pt-5  pb-5"
                style={{ color: "#292325", fontSize: "1.25rem" }}
              >
                ACTIVITY
              </p>
              <Activity deviceId={deviceId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorDetail;

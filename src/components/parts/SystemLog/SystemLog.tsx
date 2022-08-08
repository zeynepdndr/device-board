import { useState, useEffect, useCallback } from "react";
import { Timeline } from "primereact/timeline";
import { sortByTime, timeFromNow } from "../../../utils/DateUtil";

const SystemLog = ({ deviceId }: { deviceId: any }) => {
  const [sensorStats, setSensorStats] = useState([]);
  const [error, setError] = useState(null);
  const [sensorStatsCount, setSensorCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const dataPointValuesHandler = () => {
    const loadedEvents_1: any[] = [];

    const sortedByTime_1 = data?.sort(sortByTime);

    for (const key in sortedByTime_1) {
      loadedEvents_1.push(timeFromNow(sortedByTime_1[key].time));
      //   loadedStatsTempPoints_1.push(sortedByTime_1[key].temp);
    }
    console.log(loadedEvents_1);
    setLoadedEvents(loadedEvents_1);
  };

  const customizedContent = (item: any) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <span>{item.status}</span>
        <span>{timeFromNow(item.date)}</span>
      </div>
    );
  };

  const getSensorsStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3009/sensor/${deviceId}/logs`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setData(data.results);

      const dataPointValues = data.results.map((item: any) => ({
        date: item.time,
        definition: item.definition,
        icon: "pi pi-check",
        color: "#607D8B",
        status: "Device online",
      }));
      setSensorStats(dataPointValues);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    getSensorsStats();
  }, []);

  useEffect(() => {
    dataPointValuesHandler();
  }, [data]);

  return (
    <Timeline
      value={sensorStats}
      className="customized-timeline"
      content={customizedContent}
      style={{ marginLeft: "-35rem" }}
    />
  );
};
export default SystemLog;

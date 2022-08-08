import { Timeline } from "primereact/timeline";
import { useState, useEffect, useCallback } from "react";
import { Chart } from "primereact/chart";
import { sortByTime, timeFromNow } from "../../../utils/DateUtil";

const SystemLog = ({ deviceId }: { deviceId: any }) => {
  const [sensorStats, setSensorStats] = useState([]);
  const [error, setError] = useState(null);
  const [sensorStatsCount, setSensorCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const [events, setEvents] = useState<any[]>([
    {
      status: "Ordered",
      date: "15/10/2020 10:30",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0",
      image: "game-controller.jpg",
    },
    {
      status: "Processing",
      date: "15/10/2020 14:00",
      icon: "pi pi-cog",
      color: "#673AB7",
    },
    {
      status: "Shipped",
      date: "15/10/2020 16:15",
      icon: "pi pi-shopping-cart",
      color: "#FF9800",
    },
    {
      status: "Delivered",
      date: "16/10/2020 10:00",
      icon: "pi pi-check",
      color: "#607D8B",
    },
  ]);

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
        status: "Delivered",
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
    setEvents([
      {
        status: "Ordered",
        date: "15/10/2020 10:30",
        icon: "pi pi-shopping-cart",
        color: "#9C27B0",
      },
      {
        status: "Processing",
        date: "15/10/2020 14:00",
        icon: "pi pi-cog",
        color: "#673AB7",
      },
      {
        status: "Shipped",
        date: "15/10/2020 16:15",
        icon: "pi pi-shopping-cart",
        color: "#FF9800",
      },
      {
        status: "Delivered",
        date: "16/10/2020 10:00",
        icon: "pi pi-check",
        color: "#607D8B",
      },
    ]);
  }, [data]);

  return (
    <Timeline
      value={sensorStats}
      className="customized-timeline"
      content={customizedContent}
      style={{ maxWidth: "1px", paddingLeft: "0px", paddingRight: "0px" }}
    />
  );
};
export default SystemLog;

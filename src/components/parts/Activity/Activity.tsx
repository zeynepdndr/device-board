import { useState, useEffect, useCallback } from "react";
import { Timeline } from "primereact/timeline";
import { ScrollPanel } from "primereact/scrollpanel";
import {
  sortByTime,
  timeFromNow,
  unixTimeToDate,
} from "../../../utils/DateUtil";
import { Card } from "primereact/card";
import Spinner from "../../partials/Spinner";
import ErrorStatus from "../../partials/ErrorStatus";
// import { EVENT_DEVICE } from "../../../constants/shared-constants";

const Activity = ({ deviceId }: { deviceId: any }) => {
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
    }
    setLoadedEvents(loadedEvents_1);
  };

  const customizedContent = (item: any) => {
    console.log(item);
    return (
      <Card
        title={item.status}
        subTitle={unixTimeToDate(item.date)}
        className="m-2"
      >
        <p>{item.definition}</p>
      </Card>
    );
  };

  const customizedMarker = (item: any) => {
    return (
      <span className="custom-marker red" style={{ color: "red" }}>
        <i className="pi pi-check" />
      </span>
    );
  };

  const getSensorsStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3009/sensor/${deviceId}/events`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setData(data.results);

      const dataPointValues = data.results.map((item: any) => ({
        date: item.time,
        definition: item.description,
        icon: "pi pi-check'",
        color: "#9C27B0",
        status: item.event_name,
      }));
      setSensorStats(dataPointValues);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  let timelineContent = <div>No data found!</div>;
  const loadingStatus = (onContent: boolean) => (
    <Spinner onContent={onContent} />
  );

  if (sensorStats.length > 0) {
    timelineContent = (
      <Timeline
        value={sensorStats}
        className="customized-timeline"
        marker={customizedMarker}
        content={customizedContent}
        style={{ marginLeft: "-35rem" }}
      />
    );
  }
  if (error) {
    timelineContent = <ErrorStatus onContent={true} message={error} />;
  }
  if (isLoading) {
    timelineContent = loadingStatus(true);
  }

  useEffect(() => {
    getSensorsStats();
  }, []);

  useEffect(() => {
    dataPointValuesHandler();
  }, [data]);
  return (
    <div className="card text-center">
      <ScrollPanel
        style={{ width: "100%", height: "485px" }}
        className="custom"
      >
        {timelineContent}
      </ScrollPanel>
    </div>
  );
};

export default Activity;

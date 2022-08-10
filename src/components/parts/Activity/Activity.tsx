import { useState, useEffect, useCallback } from "react";
import { Timeline } from "primereact/timeline";
import { OrderList } from "primereact/orderlist";
import { ScrollPanel } from "primereact/scrollpanel";
import {
  sortByTime,
  timeFromNow,
  unixTimeToDate,
} from "../../../utils/DateUtil";
import imgg from "../../../assests/img/logo.jpg";
import { Card } from "primereact/card";
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
      //   loadedStatsTempPoints_1.push(sortedByTime_1[key].temp);
    }
    setLoadedEvents(loadedEvents_1);
  };

  const customizedContent = (item: any) => {
    return (
      // <div style={{ display: "flex", justifyContent: "space-around" }}>
      //   <span>{item.status}</span>
      //   <span>{timeFromNow(item.date)}</span>
      // </div>
      <Card
        title={item.status}
        subTitle={unixTimeToDate(item.date)}
        className="m-2"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
        {/* <Button label="Read more" className="p-button-text"></Button> */}
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
    <div className="card">
      <ScrollPanel
        style={{ width: "100%", height: "485px" }}
        className="custom"
      >
        <Timeline
          value={sensorStats}
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
          style={{ marginLeft: "-35rem" }}
        />
      </ScrollPanel>
    </div>
  );
};

export default Activity;

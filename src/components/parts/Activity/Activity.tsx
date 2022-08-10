import { useState, useEffect, useCallback } from "react";
import { Timeline } from "primereact/timeline";
import { OrderList } from "primereact/orderlist";
import { sortByTime, timeFromNow } from "../../../utils/DateUtil";
import imgg from "../../../assests/img/logo.jpg";
import { Card } from "primereact/card";

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
    console.log(loadedEvents_1);
    setLoadedEvents(loadedEvents_1);
  };

  const customizedContent = (item: any) => {
    return (
      // <div style={{ display: "flex", justifyContent: "space-around" }}>
      //   <span>{item.status}</span>
      //   <span>{timeFromNow(item.date)}</span>
      // </div>
      <Card title={item.status} subTitle={item.date}>
        {item.image && (
          <img src={imgg} alt={item.name} width={200} className="shadow-1" />
        )}
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
      <span
        className="custom-marker shadow-1"
        // style={{ backgroundColor: item.color }}
      >
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
      <Timeline
        value={sensorStats}
        className="customized-timeline"
        marker={customizedMarker}
        content={customizedContent}
        style={{ marginLeft: "-35rem" }}
      />
    </div>
  );
};

export default Activity;

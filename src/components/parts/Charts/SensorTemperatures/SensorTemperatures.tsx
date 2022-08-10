import { useState, useEffect, useCallback } from "react";
import { Chart } from "primereact/chart";
import { ProgressSpinner } from "primereact/progressspinner";
import { unixTimeToDate, sortByTime } from "../../../../utils/DateUtil";

const SensorTemperatures = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStatsTime_1, setLoadedStatsTime_1] = useState<any[]>([]);
  const [loadedStatsTemp_1, setLoadedStatsTemp_1] = useState<any[]>([]);
  const [loadedStatsTime_2, setLoadedStatsTime_2] = useState<any[]>([]);
  const [loadedStatsTemp_2, setLoadedStatsTemp_2] = useState<any[]>([]);
  const [loadedStatsTime_3, setLoadedStatsTime_3] = useState<any[]>([]);
  const [loadedStatsTemp_3, setLoadedStatsTemp_3] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any>();

  // @TODO : Make this function dynamic
  const dataPointValuesHandler = async () => {
    const loadedStatsTimePoints_1 = [];
    const loadedStatsTempPoints_1 = [];

    const sortedByTime_1 = data[0]?.stats.sort(sortByTime);

    for (const key in sortedByTime_1) {
      loadedStatsTimePoints_1.push(unixTimeToDate(sortedByTime_1[key].time));
      loadedStatsTempPoints_1.push(sortedByTime_1[key].temp);
    }
    setLoadedStatsTemp_1(loadedStatsTempPoints_1);
    setLoadedStatsTime_1(loadedStatsTempPoints_1);

    ///////////////////////////////////////////7

    const loadedStatsTimePoints_2 = [];
    const loadedStatsTempPoints_2 = [];

    const sortedByTime_2 = data[1]?.stats.sort(sortByTime);

    for (const key in sortedByTime_2) {
      loadedStatsTimePoints_2.push(unixTimeToDate(sortedByTime_2[key].time));
      loadedStatsTempPoints_2.push(sortedByTime_2[key].temp);
    }
    setLoadedStatsTemp_2(loadedStatsTempPoints_2);
    setLoadedStatsTime_2(loadedStatsTempPoints_2);

    ///////////////////////////////////////////7

    setLineData({
      labels: loadedStatsTime_1,
      datasets: [
        {
          label: data && data[0] != undefined ? data[0].device_id : "default",
          data: loadedStatsTemp_1,
          fill: false,
          borderColor: "#42A5F5",
          tension: 0.4,
        },
        {
          label: data && data[1] != undefined ? data[1].device_id : "default",
          data: loadedStatsTemp_2,
          fill: false,
          borderColor: "#00bb7e",
          tension: 0.4,
        },
      ],
    });
  };

  const getSensorsStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3009/sensor/stats");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setData(data.results);

      console.log("in get method");
    } catch (error: any) {
      setError(error.message);
    }
    dataPointValuesHandler();

    setIsLoading(false);
  };

  useEffect(() => {
    console.log("in useEffect no dependant");
    getSensorsStats();
  }, []);

  useEffect(() => {
    console.log("in useEffect with data");
    dataPointValuesHandler();
    console.log("data:", data);
  }, [data]);

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    return {
      basicOptions,
    };
  };

  const { basicOptions } = getLightTheme();

  let chartContent = <div>No data found!</div>;

  const loadingStatus = () => (
    <ProgressSpinner
      style={{
        width: "50px",
        height: "50px",
      }}
      strokeWidth="7"
      fill={`var(--surface-ground)`}
      animationDuration=".8s"
    />
  );

  if (lineData && lineData.datasets.length > 0) {
    console.log("lineData", lineData);
    chartContent = <Chart type="line" data={lineData} options={basicOptions} />;
  }

  if (error) {
    chartContent = <p>Something went wrong!</p>;
  }

  if (isLoading) {
    chartContent = loadingStatus();
  }

  return <div className="card">{chartContent}</div>;
};

export default SensorTemperatures;

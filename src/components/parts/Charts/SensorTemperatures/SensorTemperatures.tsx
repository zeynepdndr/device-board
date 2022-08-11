import { useState, useEffect, useCallback } from "react";
import { Chart } from "primereact/chart";
import { unixTimeToDate, sortByTime } from "../../../../utils/DateUtil";
import Spinner from "../../../partials/Spinner";
import ErrorStatus from "../../../partials/ErrorStatus";

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

  // Set datapoint values to draw chart.
  // @TODO: Make it dynamic, it should create lines regarding api response not 3 anytime
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

    const loadedStatsTimePoints_3 = [];
    const loadedStatsTempPoints_3 = [];

    const sortedByTime_3 = data[2]?.stats.sort(sortByTime);

    for (const key in sortedByTime_2) {
      loadedStatsTimePoints_3.push(unixTimeToDate(sortedByTime_3[key].time));
      loadedStatsTempPoints_3.push(sortedByTime_3[key].temp);
    }
    setLoadedStatsTemp_3(loadedStatsTempPoints_3);
    setLoadedStatsTime_3(loadedStatsTempPoints_3);

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
        {
          label: data && data[2] != undefined ? data[2].device_id : "default",
          data: loadedStatsTemp_3,
          fill: false,
          borderColor: "#ff5753",
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
      console.log("data:", data);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSensorsStats();
  }, []);

  useEffect(() => {
    dataPointValuesHandler();
  }, [data]);

  useEffect(() => {
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
        {
          label: data && data[2] != undefined ? data[2].device_id : "default",
          data: loadedStatsTemp_3,
          fill: false,
          borderColor: "#ff5753",
          tension: 0.4,
        },
      ],
    });
  }, [
    loadedStatsTime_1,
    loadedStatsTemp_1,
    loadedStatsTemp_2,
    loadedStatsTime_2,
    loadedStatsTime_3,
    loadedStatsTemp_3,
  ]);

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

  const loadingStatus = (onContent: boolean) => (
    <Spinner onContent={onContent} />
  );

  if (lineData && lineData.datasets.length > 0) {
    chartContent = <Chart type="line" data={lineData} options={basicOptions} />;
  }

  if (error) {
    chartContent = <ErrorStatus onContent={true} message={error} />;
  }

  if (isLoading) {
    chartContent = loadingStatus(true);
  }

  return <div className="card">{chartContent}</div>;
};

export default SensorTemperatures;

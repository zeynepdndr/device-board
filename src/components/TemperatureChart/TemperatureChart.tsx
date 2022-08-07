import { useState, useEffect, useCallback } from "react";
import { Chart } from "primereact/chart";
import { unixTimeToDate, sortByTime } from "../../utils/timeConverter";

const TemperatureChart = () => {
  const [favoritesIsShown, setFavoritesIsShown] = useState(false);
  const [sensorStats, setSensorStats] = useState([]);
  const [error, setError] = useState(null);
  const [sensorStatsCount, setSensorCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStatsTime_1, setLoadedStatsTime_1] = useState<any[]>([]);
  const [loadedStatsTemp_1, setLoadedStatsTemp_1] = useState<any[]>([]);
  const [loadedStatsTime_2, setLoadedStatsTime_2] = useState<any[]>([]);
  const [loadedStatsTemp_2, setLoadedStatsTemp_2] = useState<any[]>([]);
  const [loadedStatsTime_3, setLoadedStatsTime_3] = useState<any[]>([]);
  const [loadedStatsTemp_3, setLoadedStatsTemp_3] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  // @TODO : Make this function dynamici
  const dataPointValuesHandler = () => {
    const loadedStatsTimePoints_1 = [];
    const loadedStatsTempPoints_1 = [];

    const sortedByTime_1 = data[0].stats.sort(sortByTime);

    for (const key in sortedByTime_1) {
      loadedStatsTimePoints_1.push(unixTimeToDate(sortedByTime_1[key].time));
      loadedStatsTempPoints_1.push(sortedByTime_1[key].temp);
    }
    setLoadedStatsTemp_1(loadedStatsTempPoints_1);
    setLoadedStatsTime_1(loadedStatsTempPoints_1);

    ///////////////////////////////////////////7

    const loadedStatsTimePoints_2 = [];
    const loadedStatsTempPoints_2 = [];

    const sortedByTime_2 = data[1].stats.sort(sortByTime);

    for (const key in sortedByTime_2) {
      loadedStatsTimePoints_2.push(unixTimeToDate(sortedByTime_2[key].time));
      loadedStatsTempPoints_2.push(sortedByTime_2[key].temp);
    }
    setLoadedStatsTemp_2(loadedStatsTempPoints_2);
    setLoadedStatsTime_2(loadedStatsTempPoints_2);

    ///////////////////////////////////////////7
  };

  const [basicData, setBasicData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#42A5F5",
        tension: 0.4,
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "#FFA726",
        tension: 0.4,
      },
    ],
  });

  const getSensorsStats = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    getSensorsStats();
  }, []);

  useEffect(() => {}, [sensorStats]);
  useEffect(() => {
    dataPointValuesHandler();
    setBasicData({
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
  }, [data]);

  const [multiAxisData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        fill: false,
        borderColor: "#42A5F5",
        yAxisID: "y",
        tension: 0.4,
        data: [65, 59, 80, 81, 56, 55, 10],
      },
      {
        label: "Dataset 2",
        fill: false,
        borderColor: "#00bb7e",
        yAxisID: "y1",
        tension: 0.4,
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  });

  const [lineStylesData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.4,
        borderColor: "#42A5F5",
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderDash: [5, 5],
        tension: 0.4,
        borderColor: "#66BB6A",
      },
      {
        label: "Third Dataset",
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: true,
        borderColor: "#FFA726",
        tension: 0.4,
        backgroundColor: "rgba(255,167,38,0.2)",
      },
    ],
  });

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

    let multiAxisOptions = {
      stacked: false,
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
          type: "linear",
          display: true,
          position: "left",
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          ticks: {
            color: "#495057",
          },
          grid: {
            drawOnChartArea: false,
            color: "#ebedef",
          },
        },
      },
    };

    return {
      basicOptions,
      multiAxisOptions,
    };
  };

  const { basicOptions, multiAxisOptions } = getLightTheme();

  return (
    <div>
      <div className="card">
        <h5>Basic</h5>
        <Chart type="line" data={basicData} options={basicOptions} />
      </div>

      {/* <div className="card">
        <h5>Line Styles</h5>
        <Chart type="line" data={lineStylesData} options={basicOptions} />
      </div> */}
    </div>
  );
};

export default TemperatureChart;

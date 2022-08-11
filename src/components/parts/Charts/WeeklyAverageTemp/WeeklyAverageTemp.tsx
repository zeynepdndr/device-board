import { useState, useEffect, useCallback } from "react";
import { Chart } from "primereact/chart";
import { unixTimeToDate, sortByTime } from "../../../../utils/DateUtil";
import Spinner from "../../../partials/Spinner";
import ErrorStatus from "../../../partials/ErrorStatus";

const WeeklyAverageTemp = (props: any) => {
  const { deviceId } = props;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStatsTime_1, setLoadedStatsTime_1] = useState<any[]>([]);
  const [loadedStatsTemp_1, setLoadedStatsTemp_1] = useState<any[]>([]);
  const [loadedStatsTime_2, setLoadedStatsTime_2] = useState<any[]>([]);
  const [loadedStatsTemp_2, setLoadedStatsTemp_2] = useState<any[]>([]);
  // const [sensorId, setSensorId] = useState<string>(deviceId);
  const [sensorStats, setSensorStats] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any>();

  const dataPointValuesHandler = () => {
    const loadedStatsTimePoints_1 = [];
    const loadedStatsTempPoints_1 = [];

    const sortedByTime_1 = sensorStats[0]?.stats.sort(sortByTime);

    for (const key in sortedByTime_1) {
      loadedStatsTimePoints_1.push(unixTimeToDate(sortedByTime_1[key].time));
      loadedStatsTempPoints_1.push(sortedByTime_1[key].temp);
    }
    setLoadedStatsTemp_1(loadedStatsTempPoints_1);
    setLoadedStatsTime_1(loadedStatsTempPoints_1);

    ///////////////////////////////////////////7

    const loadedStatsTimePoints_2 = [];
    const loadedStatsTempPoints_2 = [];

    const sortedByTime_2 = sensorStats[1]?.stats.sort(sortByTime);

    for (const key in sortedByTime_2) {
      loadedStatsTimePoints_2.push(unixTimeToDate(sortedByTime_2[key].time));
      loadedStatsTempPoints_2.push(sortedByTime_2[key].temp);
    }
    setLoadedStatsTemp_2(loadedStatsTempPoints_2);
    setLoadedStatsTime_2(loadedStatsTempPoints_2);
  };

  const getSensorsStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3009/sensor/${props.deviceId}/stats/weekly_avg`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setSensorStats(data.results);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    getSensorsStats();
  }, []);

  useEffect(() => {
    dataPointValuesHandler();
    setLineData({
      labels: loadedStatsTime_1,
      datasets: [
        {
          label: sensorStats[0]?.sensor_id,
          data: loadedStatsTemp_1,
          fill: true,
          borderColor: "#FFA726",
          tension: 0.4,
          backgroundColor: "rgba(255,167,38,0.2)",
        },
        {
          label: sensorStats[1]?.sensor_id,
          data: loadedStatsTemp_2,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: "#7615f5",
        },
      ],
    });
  }, [sensorStats]);

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

  if (sensorStats.length > 0) {
    chartContent = (
      <Chart
        type="line"
        data={lineData}
        options={basicOptions}
        style={{ height: 222, padding: "1rem" }}
      />
    );
  }
  if (error) {
    chartContent = <ErrorStatus onContent={true} message={error} />;
  }
  if (isLoading) {
    chartContent = loadingStatus(true);
  }

  return (
    <div className="card text-center">
      <p
        className="text-left font-bold"
        style={{ color: "#292325", fontSize: "1.25rem", marginLeft: "1rem" }}
      >
        WEEKLY AVERAGE TEMP
      </p>
      {chartContent}
    </div>
  );
};

export default WeeklyAverageTemp;

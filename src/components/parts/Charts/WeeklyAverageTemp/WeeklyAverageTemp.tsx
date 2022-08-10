import { useState, useEffect, useCallback } from "react";
import { Chart } from "primereact/chart";
import { unixTimeToDate, sortByTime } from "../../../../utils/DateUtil";

const WeeklyAverageTemp = (props: any) => {
  const { deviceId } = props;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStatsTime_1, setLoadedStatsTime_1] = useState<any[]>([]);
  const [loadedStatsTemp_1, setLoadedStatsTemp_1] = useState<any[]>([]);
  // const [sensorId, setSensorId] = useState<string>(deviceId);
  const [sensorStats, setSensorStats] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any>();

  const dataPointValuesHandler = () => {
    const loadedStatsTimePoints_1 = [];
    const loadedStatsTempPoints_1 = [];

    const sortedByTime_1 = sensorStats?.sort(sortByTime);

    for (const key in sortedByTime_1) {
      loadedStatsTimePoints_1.push(unixTimeToDate(sortedByTime_1[key].time));
      loadedStatsTempPoints_1.push(sortedByTime_1[key].temp);
    }
    setLoadedStatsTemp_1(loadedStatsTempPoints_1);
    setLoadedStatsTime_1(loadedStatsTempPoints_1);
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
      // setSensorId(deviceId);
    } catch (error: any) {
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
          label: props.deviceId,
          data: loadedStatsTemp_1,
          fill: true,
          borderColor: "#FFA726",
          tension: 0.4,
          backgroundColor: "rgba(255,167,38,0.2)",
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

  const { basicOptions } = getLightTheme();

  return (
    <div className="card">
      {/* <div className="m-0" style={{ color: "#292325", fontSize: "1.25rem" }}>
        WEEKLY AVERAGE TEMP
      </div> */}
      <p
        className="text-left font-bold"
        style={{ color: "#292325", fontSize: "1.25rem", marginLeft: "1rem" }}
      >
        WEEKLY AVERAGE TEMP
      </p>
      <Chart
        type="line"
        data={lineData}
        options={basicOptions}
        style={{ height: 222, padding: "1rem" }}
      />
    </div>
  );
};

export default WeeklyAverageTemp;

import { useState, useEffect, useCallback } from "react";
import { Chart } from "primereact/chart";

import { unixTimeToDate, sortByTime } from "../../../../utils/DateUtil";
import Spinner from "../../../partials/Spinner";
import ErrorStatus from "../../../partials/ErrorStatus";

const TemperatureDaily = ({ deviceId }: { deviceId: any }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStatsTime_1, setLoadedStatsTime_1] = useState<any[]>([]);
  const [loadedStatsTemp_1, setLoadedStatsTemp_1] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  // @TODO : Make this function dynamic
  const dataPointValuesHandler = () => {
    const loadedStatsTimePoints_1 = [];
    const loadedStatsTempPoints_1 = [];

    const sortedByTime_1 = data?.sort(sortByTime);

    for (const key in sortedByTime_1) {
      loadedStatsTimePoints_1.push(unixTimeToDate(sortedByTime_1[key].time));
      loadedStatsTempPoints_1.push(sortedByTime_1[key].temp);
    }
    setLoadedStatsTemp_1(loadedStatsTempPoints_1);
    setLoadedStatsTime_1(loadedStatsTempPoints_1);
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
    ],
  });

  const getSensorsStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3009/sensor/${deviceId}/stats/weekly`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setData(data.results);
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
      ],
    });
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
  const loadingStatus = (onContent: boolean) => (
    <Spinner onContent={onContent} />
  );

  if (data.length > 0) {
    chartContent = (
      <Chart type="line" data={basicData} options={basicOptions} />
    );
  }
  if (error) {
    chartContent = <ErrorStatus onContent={true} message={error} />;
  }
  if (isLoading) {
    chartContent = loadingStatus(true);
  }

  return (
    <div>
      <div className="p-card p-component p-4 mb-4 text-center">
        <p
          className="text-left font-bold"
          style={{ color: "#292325", fontSize: "1.25rem", marginLeft: "1rem" }}
        >
          TEMPERATURE DAILY
        </p>
        {chartContent}
      </div>
    </div>
  );
};

export default TemperatureDaily;

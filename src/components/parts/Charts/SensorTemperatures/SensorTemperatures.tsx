import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { unixTimeToDate, sortByTime } from "../../../../utils/DateUtil";
import Spinner from "../../../partials/Spinner";
import ErrorStatus from "../../../partials/ErrorStatus";
import { getSensorStats } from "../../../../lib/api";
import useHttp from "../../../../hooks/use-http";

const SensorTemperatures = () => {
  const { sendRequest, status, error, data } = useHttp(getSensorStats, true);
  const [lineData, setLineData] = useState<any>();

  // Set datapoint values to draw chart.
  const dataPointValuesHandler = async () => {
    const linePoints: any = [];

    for (const key in data) {
      const sortedStatsByTime = data[key]?.stats.sort(sortByTime);
      const loadedStatsTimePoints = sortedStatsByTime?.map((i: any) =>
        unixTimeToDate(i.time)
      );
      const loadedStatsTempPoints = sortedStatsByTime?.map((i: any) => i.temp);

      linePoints.push([loadedStatsTempPoints, loadedStatsTimePoints]);

      const datasets = linePoints.map((line: any, index: number) => {
        return {
          label: data[index] != undefined ? data[index].device_id : "default",
          data: line[0],
          fill: false,
          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          tension: 0.4,
        };
      });

      setLineData({
        labels: loadedStatsTimePoints,
        datasets: datasets,
      });
    }
  };

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  console.log("etesg", lineData);
  useEffect(() => {
    dataPointValuesHandler();
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

  if (lineData && lineData.datasets.length > 0) {
    chartContent = <Chart type="line" data={lineData} options={basicOptions} />;
  }

  if (error) {
    chartContent = <ErrorStatus onContent={true} message={error} />;
  }

  if (status === "pending") {
    chartContent = loadingStatus(true);
  }

  return <div className="card">{chartContent}</div>;
};

export default SensorTemperatures;

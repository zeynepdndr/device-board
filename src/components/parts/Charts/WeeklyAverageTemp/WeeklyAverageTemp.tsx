import { useState, useEffect, useCallback } from "react";
import { Chart } from "primereact/chart";
import { unixTimeToDate, sortByTime } from "../../../../utils/DateUtil";
import Spinner from "../../../partials/Spinner";
import ErrorStatus from "../../../partials/ErrorStatus";
import useHttp from "../../../../hooks/use-http";
import { getSensorStatsWeeklyAvg } from "../../../../lib/api";

const WeeklyAverageTemp = (props: any) => {
  const { sendRequest, status, error, data } = useHttp(
    getSensorStatsWeeklyAvg,
    true
  );
  const [lineData, setLineData] = useState<any>();
  const { deviceId } = props;

  const dataPointValuesHandler = () => {
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
          label: data[index] != undefined ? data[index].sensor_id : "default",
          data: line[0],
          fill: true,
          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          tension: 0.4,
          // backgroundColor: ,
        };
      });

      setLineData({
        labels: loadedStatsTimePoints,
        datasets: datasets,
      });
    }
  };

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

  if (data?.length > 0) {
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
  if (status === "pending") {
    chartContent = loadingStatus(true);
  }

  useEffect(() => {
    sendRequest(deviceId);
  }, [sendRequest]);

  useEffect(() => {
    dataPointValuesHandler();
  }, [data]);

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

import { useEffect } from "react";
import { Timeline } from "primereact/timeline";
import { ScrollPanel } from "primereact/scrollpanel";
import { timeFromNow } from "../../../utils/DateUtil";
import Spinner from "../../partials/Spinner";
import ErrorStatus from "../../partials/ErrorStatus";
import useHttp from "../../../hooks/use-http";
import { getSensorLogs } from "../../../lib/api";

const SystemLog = ({ deviceId }: { deviceId: any }) => {
  const { sendRequest, status, error, data } = useHttp(getSensorLogs, true);

  const customizedContent = (item: any) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <span>{item.description}</span>
        <span>{timeFromNow(item.time)}</span>
      </div>
    );
  };

  let timelineContent = <div>No data found!</div>;

  const loadingStatus = (onContent: boolean) => (
    <Spinner onContent={onContent} />
  );

  if (data?.length > 0) {
    timelineContent = (
      <Timeline
        value={data}
        className="customized-timeline"
        content={customizedContent}
        style={{ marginLeft: "-35rem" }}
      />
    );
  }

  if (error) {
    timelineContent = <ErrorStatus onContent={true} message={error} />;
  }

  if (status === "pending") {
    timelineContent = loadingStatus(true);
  }

  useEffect(() => {
    sendRequest(deviceId);
  }, [sendRequest]);
  return (
    <ScrollPanel
      style={{ width: "100%", height: "485px", textAlign: "center" }}
      className="custom"
    >
      {timelineContent}
    </ScrollPanel>
  );
};
export default SystemLog;

import { useEffect } from "react";
import { Timeline } from "primereact/timeline";
import { ScrollPanel } from "primereact/scrollpanel";
import { unixTimeToDate } from "../../../utils/DateUtil";
import { Card } from "primereact/card";
import Spinner from "../../partials/Spinner";
import ErrorStatus from "../../partials/ErrorStatus";
import useHttp from "../../../hooks/use-http";
import { getSensorEvents } from "../../../lib/api";

const Activity = ({ deviceId }: { deviceId: any }) => {
  const { sendRequest, status, error, data } = useHttp(getSensorEvents, true);

  const customizedContent = (item: any) => {
    return (
      <Card
        title={item.event_name}
        subTitle={unixTimeToDate(item.time)}
        className="m-2"
      >
        <p>{item.description}</p>
      </Card>
    );
  };

  const customizedMarker = (item: any) => {
    return (
      <span className="custom-marker red" style={{ color: "red" }}>
        <i className="pi pi-check" />
      </span>
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
        marker={customizedMarker}
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
    <div className="card text-center">
      <ScrollPanel
        style={{ width: "100%", height: "485px" }}
        className="custom"
      >
        {timelineContent}
      </ScrollPanel>
    </div>
  );
};

export default Activity;

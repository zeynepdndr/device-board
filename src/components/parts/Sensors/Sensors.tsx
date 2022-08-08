import SensorList from "./SensorList";
import { Card } from "primereact/card";
import { FaWindowRestore } from "react-icons/fa";

const Sensors = ({ items }: { items: any }) => {
  const header = (
    <div className="card">
      <div className="flex justify-content-between flex-wrap card-container">
        <div className="flex align-items-center justify-content-center font-bold text-black m-2">
          SENSOR LIST
        </div>
        <div className="flex align-items-center justify-content-center  font-bold text-black  m-2">
          <FaWindowRestore />
        </div>
      </div>
    </div>
  );
  return (
    <Card
      title={header}
      // style={{ width: "25em" }}
    >
      <SensorList items={items} />
    </Card>
  );
};

export default Sensors;

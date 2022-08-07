import SensorItem from "./SensorItem";
import { Link } from "react-router-dom";

const SensorList = ({ items }: { items: any }) => {
  const addSensorHandler = (sensor: any) => {};
  let sensorContent: React.ReactElement = (
    <p className="books-filter__empty">No sensor found!</p>
  );

  if (items?.length > 0) {
    sensorContent = items.map((item: any) => (
      <SensorItem
        key={item.device_id}
        item={item}
        // onEdit={editBookHandler}
        // onDelete={deleteBookHandler}
      />
    ));
  }
  return (
    <>
      <div onClick={addSensorHandler}>
        <Link to={"/add-sensor"}>Add New Sensor</Link>
      </div>
      {sensorContent}
    </>
  );
};
export default SensorList;

import SensorItem from "./SensorItem";

const SensorList = ({ items }: { items: any }) => {
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
  return <>{sensorContent}</>;
};
export default SensorList;

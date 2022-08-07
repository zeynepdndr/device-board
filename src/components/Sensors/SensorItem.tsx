const SensorItem = ({ key, item }: { key: any; item: any }) => {
  return (
    <>
      <h1 key={key}>{item.device_id}</h1>
      <button>EDIT</button>
    </>
  );
};

export default SensorItem;

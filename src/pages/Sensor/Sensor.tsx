import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Sensor = () => {
  const param = useParams();
  console.log("param:", param);

  const [favoritesIsShown, setFavoritesIsShown] = useState(false);
  const [sensorData, setSensorData] = useState();
  const [error, setError] = useState(false);
  const [sensorDataCount, setSensorCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSensorData = () => {
    setIsLoading(true);
    fetch(`http://localhost:3009/sensor/${param.device_id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSensorData(json.results);
        setIsLoading(false);
        setSensorCounts(json.paging.count);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getSensorData();
  }, []);
  useEffect(() => {}, [sensorData]);

  return (
    <>
      <h1>HAHAHAHH</h1>
    </>
  );
};

export default Sensor;

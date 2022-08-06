import Sensors from "../Sensors/Sensors";
import { Container, Header, Content, Footer } from "rsuite";
import { FlexboxGrid, Col } from "rsuite";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [favoritesIsShown, setFavoritesIsShown] = useState(false);
  const [sensors, setSensors] = useState();
  const [error, setError] = useState(false);
  const [sensorsCount, setSensorCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSensors = () => {
    setIsLoading(true);
    fetch("http://localhost:3009/sensor")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSensors(json.results);
        setIsLoading(false);
        setSensorCounts(json.paging.count);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getSensors();
    console.log("sensors", sensors);
    console.log("error:", error);
    console.log("load:", isLoading);
  }, []);
  useEffect(() => {}, [sensors]);

  return (
    <>
      <div>
        <FlexboxGrid justify="space-around">
          <FlexboxGrid.Item as={Col} colspan={24} md={6}>
            {sensorsCount}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item as={Col} colspan={24} md={6}>
            colspan={24} md={6}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item as={Col} colspan={24} md={6} smHidden>
            colspan={24} md={6} smHidden
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
      <div>Sensor Graphics</div>
      <div>{!isLoading && !error && <Sensors items={sensors} />} </div>
    </>
  );
};

export default Dashboard;

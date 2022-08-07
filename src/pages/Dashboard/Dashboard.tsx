import Sensors from "../../components/Sensors/Sensors";
import { Container, Header, Content, Footer } from "rsuite";
import { FlexboxGrid, Col } from "rsuite";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import TemperatureGraph from "../../components/TemperatureGraph/TemperatureGraph";

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
      <div className="show-container">
        <Container>
          <FlexboxGrid justify="space-around">
            <Content>
              <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                <>
                  <h4>TOTAL SENSOR</h4>
                  {sensorsCount}
                </>
              </FlexboxGrid.Item>
            </Content>
            <Content>
              <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                <>
                  <h4>OPEN ALERTS</h4>
                  ??
                </>
              </FlexboxGrid.Item>
            </Content>
            <Content>
              <FlexboxGrid.Item as={Col} colspan={24} md={6} smHidden>
                <>
                  <h4>TOTAL CUSTOMERS</h4>
                  ??
                </>
              </FlexboxGrid.Item>
            </Content>
          </FlexboxGrid>
        </Container>
      </div>

      <div>
        <TemperatureGraph />
      </div>
      <div>{!isLoading && !error && <Sensors items={sensors} />} </div>
    </>
  );
};

export default Dashboard;

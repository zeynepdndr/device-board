import SensorList from "./SensorList";
import { Container, Header, Content, Footer } from "rsuite";

const Sensors = ({ items }: { items: any }) => {
  return (
    <Container>
      <Content>
        <div>Settings</div>
        <SensorList items={items} />
        <div>Pagination</div>
      </Content>
    </Container>
  );
};

export default Sensors;

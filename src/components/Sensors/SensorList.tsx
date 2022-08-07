// import SensorItem from "./SensorItem";
// import { Link } from "react-router-dom";

// const SensorList = ({ items }: { items: any }) => {
//   const addSensorHandler = (sensor: any) => {};
//   let sensorContent: React.ReactElement = (
//     <p className="books-filter__empty">No sensor found!</p>
//   );

//   if (items?.length > 0) {
//     sensorContent = items.map((item: any) => (
//       <SensorItem
//         key={item.device_id}
//         item={item}
//         // onEdit={editBookHandler}
//         // onDelete={deleteBookHandler}
//       />
//     ));
//   }
//   return (
//     <>
//       <div onClick={addSensorHandler}>
//         <Link to={"/add-sensor"}>Add New Sensor</Link>
//       </div>
//       {sensorContent}
//     </>
//   );
// };
// export default SensorList;

import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const SensorList = ({ items }: { items: any }) => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sensors, setSensors] = useState([]);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 100,
    page: 1,
    sortField: null,
    sortOrder: null,
  });

  // const customerService = new CustomerService();

  let loadLazyTimeout = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);

    // if (loadLazyTimeout) {
    //   clearTimeout(loadLazyTimeout);
    // }

    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(() => {
      setTotalRecords(items?.length);
      setSensors(items);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  const onPage = (event: any) => {
    setLazyParams(event);
  };

  const onSort = (event: any) => {
    setLazyParams(event);
  };

  const statusTemplate = (rowData: any) => {
    return (
      <>
        <Button
          label="Options"
          className="p-button-outlined p-button-secondary"
        />
        <Button
          label="Details"
          className="p-button-outlined p-button-info mx-5"
        >
          <Link to={`/sensor/${rowData.device_id}`}>Sensor</Link>
        </Button>
        <Button label="EDIT" className="p-button-outlined p-button-success">
          <Link to={"/add-sensor/:device_id"}>Sensor</Link>
        </Button>
      </>
    );
  };

  return (
    <div className="pt-3 pb-4 ">
      <DataTable
        value={items}
        // lazy
        filterDisplay="row"
        responsiveLayout="scroll"
        dataKey="id"
        paginator
        // first={lazyParams.first}
        rows={5}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        // sortField={lazyParams.sortField}
        sortOrder={lazyParams.sortOrder}
        loading={loading}
      >
        <Column headerStyle={{ width: "3em" }}></Column>
        <Column field="device_id" header="Device Id" sortable />
        <Column field="last_online" sortable header="Last Online" />
        <Column field="last_temp" sortable header="Last Temp" />
        <Column field="location" sortable header="Location" />
        <Column
          body={statusTemplate}
          headerStyle={{ width: "50%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
    </div>
  );
};

export default SensorList;

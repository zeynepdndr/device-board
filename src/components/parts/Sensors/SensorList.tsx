import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const SensorList = ({ items }: { items: any }) => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sensors, setSensors] = useState();

  const setTableData = () => {
    setLoading(true);
    setTotalRecords(items?.length);
    setSensors(items);
    setLoading(false);
  };

  const onPage = (event: any) => {};

  const onSort = (event: any) => {};

  const statusTemplate = (rowData: any) => {
    return (
      <>
        <Button
          label="Options"
          className="p-button-outlined p-button-secondary"
        />

        <Link
          to={`/sensor/${rowData.device_id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            label="Details"
            className="p-button-outlined p-button-info mx-5"
          />
        </Link>

        <Link
          to={`/edit-sensor/${rowData.device_id}/${rowData.location}/${rowData.customer}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success"
            aria-label="Search"
          />
        </Link>
      </>
    );
  };

  useEffect(() => {
    setTableData();
  }, [items]);

  return (
    <div className="pt-3 pb-4 ">
      <DataTable
        value={sensors}
        filterDisplay="row"
        responsiveLayout="scroll"
        dataKey="id"
        paginator
        rows={5}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
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

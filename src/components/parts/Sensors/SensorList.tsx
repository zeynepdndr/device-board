import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { unixTimeToDate } from "../../../utils/DateUtil";

const SensorList = ({ items }: { items: any }) => {
  const [sensors, setSensors] = useState();

  const setTableData = () => {
    setSensors(
      items.map((item: any) => {
        return { ...item, last_online: unixTimeToDate(item.last_online) };
      })
    );
  };

  const operationsTemplate = (rowData: any) => {
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
            className="p-button-outlined mx-5"
            style={{ borderColor: "#270404", color: "#270404" }}
          />
        </Link>

        <Link
          to={`/edit-sensor/${rowData.device_id}/${rowData.location}/${rowData.customer}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded"
            aria-label="Search"
            style={{ backgroundColor: "#1bd089", borderColor: "#1bd089" }}
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
        // filterDisplay="row"
        responsiveLayout="scroll"
        // dataKey="id"
        paginator
        rows={5}
        // totalRecords={totalRecords}
        // onPage={onPage}
        // onSort={onSort}
        sortMode="multiple"
        // loading={loading}
      >
        <Column headerStyle={{ width: "3em" }}></Column>
        <Column field="device_id" header="Device Id" sortable />
        <Column field="last_online" sortable header="Last Online" />
        <Column field="last_temp" sortable header="Last Temp" />
        <Column field="location" sortable header="Location" />
        <Column
          body={operationsTemplate}
          headerStyle={{ width: "35%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
    </div>
  );
};

export default SensorList;

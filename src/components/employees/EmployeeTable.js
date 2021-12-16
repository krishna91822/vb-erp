import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "NAME", width: 130 },
  { field: "email", headerName: "EMAIL", width: 230 },
];

export default function EmployeeTable({ onRowClicked, rows }) {
  // const onRowClicked = (rowData) => {
  //   var collectedDataObject = {};
  //   collectedDataObject.name = rowData.row.name;
  //   collectedDataObject.email = rowData.row.email;
  //   collectedDataObject.employee_id = rowData.row.employee_id;
  //   collectedDataArray.push(collectedDataObject);
  //   console.log(rowData);
  // };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowClick={onRowClicked}
      />
    </div>
  );
}

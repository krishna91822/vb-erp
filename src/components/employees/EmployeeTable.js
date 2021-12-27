import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "NAME", width: 130 },
  { field: "email", headerName: "EMAIL", width: 200 },
  { field: "selected", headerName: "✔️", width: 40 },
];

export default function EmployeeTable({ onRowClicked, rows }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        onRowClick={onRowClicked}
        hideFooterSelectedRowCount
        // checkboxSelection
      />
    </div>
  );
}

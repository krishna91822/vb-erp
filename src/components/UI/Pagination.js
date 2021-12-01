import * as React from "react";
import Pagination from "@mui/material/Pagination";

export default function Tpagination({ setPage, rows }) {
  const count = Math.ceil(rows.length / 5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div
      style={{
        display: "float",
        position: "fixed",
        bottom: "0.5em",
        right: "2em",
        zIndex: "2",
      }}
    >
      <Pagination count={count} onChange={handleChangePage} />
    </div>
  );
}

import * as React from "react";
import Pagination from "@mui/material/Pagination";

export default function Tpagination({ setPage, rows }) {
  const count = Math.ceil(rows.length / 10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "85%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Pagination count={count} onChange={handleChangePage} />
      </div>
    </div>
  );
}

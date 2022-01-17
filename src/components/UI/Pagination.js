import * as React from "react";
import Pagination from "@mui/material/Pagination";

export default function Tpagination({ count, changePage, visi }) {
  return (
    <div
      style={{
        position: "sticky",
        bottom: "0",
        visibility: visi,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Pagination count={count} onChange={changePage} />
      </div>
    </div>
  );
}

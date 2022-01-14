import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

export default function Tpagination({ count, changePage, visi }) {
  const CustomPagination = styled(Pagination)(({ theme }) => ({
    ".MuiPagination-ul": {
      padding: "0px 20px",
    },
  }));
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
        <CustomPagination count={count} onChange={changePage} />
      </div>
    </div>
  );
}

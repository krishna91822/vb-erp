import React from "react";
import "../style/paginationStyle.css";
import Pagination from "@mui/material/Pagination";

const PaginationPage = () => {
  return (
    <div className="pagination-container">
      <Pagination count={10} color="primary" />
    </div>
  );
};

export default PaginationPage;

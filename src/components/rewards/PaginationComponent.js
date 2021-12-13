import React from "react";
import "./paginationStyle.css";
import Pagination from "@mui/material/Pagination";
import { getRewardsDataWithPageNumber } from "../../store/rewards-actions";
import { useDispatch } from "react-redux";

const PaginationPage = () => {
  const dispatch = useDispatch();

  const getPageNumber = (event, value) => {
    const pageNumber = value;
    dispatch(getRewardsDataWithPageNumber(pageNumber));
  };

  return (
    <div className="pagination-container">
      <Pagination count={10} color="primary" onChange={getPageNumber} />
    </div>
  );
};

export default PaginationPage;

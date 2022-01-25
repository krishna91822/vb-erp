import React from "react";
import "../../assets/GlobalStyle/TableStyles.css";
import { Stack, Pagination } from "@mui/material";
import {
  filterData,
  filterDataWithPageAndFilter,
  getRewardsDataWithPageAndSearch,
  getRewardsDataWithPageNumber,
} from "../../store/rewards-actions";
import { useDispatch, useSelector } from "react-redux";

const PaginationPage = () => {
  let count;
  const dispatch = useDispatch();
  const totalRewards = useSelector((state) => state.reward.totalRewards);
  const searchValue = useSelector((state) => state.reward.searchValue);
  const sorting = useSelector((state) => state.reward.sorting);
  const defaultPage = useSelector((state) => state.reward.defaultPage);

  const getPageNumber = (event, value) => {
    const pageNumber = value;
    if (searchValue !== "") {
      dispatch(getRewardsDataWithPageAndSearch(searchValue, pageNumber));
    } else if (searchValue === "" && sorting === "Default") {
      dispatch(filterData(sorting));
    } else if (searchValue === "" && sorting !== "") {
      dispatch(filterDataWithPageAndFilter(sorting, pageNumber));
    } else {
      dispatch(getRewardsDataWithPageNumber(pageNumber));
    }
  };

  return (
    <div className="pagination">
      {(() => {
        if (totalRewards === 0) {
          count = 0;
        } else if (totalRewards > 0 && totalRewards <= 10) {
          count = 1;
        } else if (totalRewards > 10 && totalRewards <= 20) {
          count = 2;
        } else if (totalRewards > 20 && totalRewards <= 30) {
          count = 3;
        } else if (totalRewards > 30 && totalRewards <= 40) {
          count = 4;
        } else if (totalRewards > 40 && totalRewards <= 50) {
          count = 5;
        } else if (totalRewards > 50 && totalRewards <= 60) {
          count = 6;
        } else if (totalRewards > 60 && totalRewards <= 70) {
          count = 8;
        } else if (totalRewards > 70 && totalRewards <= 80) {
          count = 9;
        } else if (totalRewards > 80 && totalRewards <= 90) {
          count = 10;
        } else if (totalRewards > 90 && totalRewards <= 100) {
          count = 11;
        } else if (totalRewards > 100 && totalRewards <= 110) {
          count = 12;
        } else if (totalRewards > 110 && totalRewards <= 120) {
          count = 13;
        }
      })()}
      <Stack spacing={2}>
        <Pagination
          count={count}
          defaultPage={defaultPage}
          onChange={getPageNumber}
        />
      </Stack>
    </div>
  );
};

export default PaginationPage;

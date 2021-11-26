import React from "react";
import { useSelector } from "react-redux";
import "./viewRewardStyle.css";
import RewardTableComponent from "./RewardTableComponent";
import SearchComponent from "./SearchComponent";
import PaginationComponent from "./PaginationComponent";

const ViewReward = () => {
  const data = useSelector((state) => state.reward.data);
  const errorMessage = useSelector((state) => state.errorMessage);
  return (
    <div className="wrapper">
      <SearchComponent />
      <RewardTableComponent data={data} errorMessage={errorMessage} />
      <PaginationComponent />
    </div>
  );
};

export default ViewReward;

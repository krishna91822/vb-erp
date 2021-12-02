import React, { useEffect } from "react";
import "./viewRewardStyle.css";
import RewardTableComponent from "./RewardTableComponent";
import SearchComponent from "./SearchComponent";
import PaginationComponent from "./PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { getRewardsData } from "../../store/rewards-actions";

const ViewReward = () => {
  const rewards = useSelector((state) => state.reward.rewards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRewardsData());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <SearchComponent />
      <RewardTableComponent data={rewards} />
      <PaginationComponent />
    </div>
  );
};

export default ViewReward;

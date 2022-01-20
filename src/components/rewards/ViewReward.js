import React, { useEffect } from "react";
import "./viewRewardStyle.css";
import RewardTableComponent from "./RewardTableComponent";
import SearchComponent from "./SearchComponent";
import PaginationComponent from "./PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { getRewardsData } from "../../store/rewards-actions";
import { StyledTypography } from "../../assets/GlobalStyle/style";
import "../../assets/GlobalStyle/TableStyles.css";

const ViewReward = () => {
  const rewards = useSelector((state) => state.reward.rewards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRewardsData());
  }, [dispatch]);

  return (
    <div className="list-wrapper">
      <StyledTypography>R&R's Information</StyledTypography>
      <RewardTableComponent rewardData={rewards} />
      <PaginationComponent />
    </div>
  );
};

export default ViewReward;

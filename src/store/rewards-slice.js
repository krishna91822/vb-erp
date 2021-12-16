import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rewards: [],
  totalRewards: 0,
  updateRewardData: false,
  searchValue: "",
  sorting: "",
  defaultPage: 1,
};

var globalRewardsData;

const rewardSlice = createSlice({
  name: "rewards-lists",
  initialState,
  reducers: {
    getSearchData: (state, action) => {
      const rewardName = action.payload;
      const preRewardsData = globalRewardsData;
      const updatedRewardsArray = preRewardsData.filter((reward) => {
        if (reward.reward_type.search(rewardName) === -1) {
          return false;
        }
        return reward;
      });
      state.rewards = updatedRewardsArray;
    },

    addRewards: (state, action) => {
      state.rewards = action.payload.rewards;
      state.totalRewards = action.payload.totalRewards;
      globalRewardsData = action.payload.rewards;
      state.searchValue = action.payload.searchValue;
      state.sorting = action.payload.sorting;
      state.defaultPage = action.payload.defaultPage;
    },
    updateRewardStatus: (state, action) => {
      state.updateRewardData = !state.updateRewardData;
    },
  },
});

export const rewardsActions = rewardSlice.actions;
export default rewardSlice;

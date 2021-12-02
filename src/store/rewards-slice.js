import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rewards: [],
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
      globalRewardsData = action.payload.rewards;
    },
  },
});

export const rewardsActions = rewardSlice.actions;
export default rewardSlice;

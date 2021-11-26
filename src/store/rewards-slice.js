import { createSlice } from "@reduxjs/toolkit";

var duplicateData = [
  {
    id: 1,
    rewardType: "Birthday",
    assignee: "Raymond Tech. Pvt. Ltd.",
    rewardDate: "12/02/2020",
  },
  {
    id: 2,
    rewardType: "Vimal K",
    assignee: "Vimal & Co",
    rewardDate: "12/02/2020",
  },
  {
    id: 3,
    rewardType: "Harsha Bendi",
    assignee: "Bend Solutions",
    rewardDate: "12/02/2020",
  },
  {
    id: 4,
    rewardType: "Employee",
    assignee: "Assignee Dummy A",
    rewardDate: "12/02/2020",
  },
  {
    id: 5,
    rewardType: "Reward Type Dummy",
    assignee: "Not Decided",
    rewardDate: "12/02/2020",
  },
  {
    id: 6,
    rewardType: "Best HR",
    assignee: "Dummy C",
    rewardDate: "12/02/2020",
  },
];

const initialState = {
  data: duplicateData,
  errorMessage: "",
};

const rewardSlice = createSlice({
  name: "rewards-lists",
  initialState,
  reducers: {
    getSearchData: (state, action) => {
      const value = action.payload;
      const updated = duplicateData.filter((d) => {
        if (d.rewardType.search(value) === -1) {
          return false;
        }
        return d;
      });
      if (updated.length === 0) {
        state.errorMessage = "Nothing Found";
      } else {
        state.errorMessage = "";
      }
      state.data = updated;
    },

    deleteRewardData: (state, action) => {
      const updated = duplicateData.filter((d) => {
        if (d.id === action.payload) {
          return false;
        }
        return d;
      });
      duplicateData = updated;
      state.data = updated;
    },
  },
});

export const { getSearchData, deleteRewardData } = rewardSlice.actions;
export default rewardSlice.reducer;

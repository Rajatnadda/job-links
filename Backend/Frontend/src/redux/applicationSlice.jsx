// redux/applicationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicants: {
    applications: [],
  },
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload || { applications: [] };
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;

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
    // Sets all applicants for a specific job
    setAllApplicants: (state, action) => {
      state.applicants.applications = action.payload.applications;
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;

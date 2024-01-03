import { createSlice } from "@reduxjs/toolkit";

// statusOption & jobTypeOption 從 jobSlice 提取即可
const filter = {
  search: "",
  status: "all",
  statusOption: ["all", "interview", "declined", "pending"],
  jobType: "all",
  sort: "latest",
  jobTypeOption: ["all", "full-time", "part-time", "remote", "internship"],
  sortOption: ["latest", "oldest", "a-z", "z-a"],
};

const defaultState = {
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  stats: {},
  monthlyApplications: [],
  filter,
};

const allJobsSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    setAllJobs: (state, action) => {
      const { jobs, totalJobs, numOfPages } = action.payload.data;

      state.jobs = jobs;
      state.totalJobs = totalJobs;
      state.numOfPages = numOfPages;

      // localStorage.setItem("allJobs", JSON.stringify(action.payload.data));
    },
  },
});

// 輸出 slice.reducer
export default allJobsSlice.reducer;
// 輸出個別的 reducer
export const { setAllJobs } = allJobsSlice.actions;

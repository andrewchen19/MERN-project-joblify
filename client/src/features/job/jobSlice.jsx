import { createSlice } from "@reduxjs/toolkit";

// 這邊不用加入 jobLocation
// jobLocation 是跟隨 userSlice 的 user.location 而有所改變
const defaultState = {
  company: "",
  position: "",
  status: "interview",
  statusOption: ["interview", "declined", "pending"],
  jobType: "full-time",
  jobTypeOption: ["full-time", "part-time", "remote", "internship"],
};

const jobSlice = createSlice({
  name: "job",
  initialState: defaultState,
  reducer: {},
});

// 輸出 slice.reducer
export default jobSlice.reducer;

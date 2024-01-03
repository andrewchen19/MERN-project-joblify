import axios from "axios";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

// Custom instance of Axios
export const customFetch = axios.create({
  baseURL: "/api/v1",
});

// Error message handler
export const errorMessageHandler = (error) => {
  // 通用的錯誤訊息 (來處理 500 server error 的情況)
  const errorMessage =
    error?.response?.data?.msg || "Unexpected Error. Please try again later.";

  return errorMessage;
};

export const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "all jobs", path: "/all-jobs", icon: <MdQueryStats /> },
  { id: 3, text: "add job", path: "/add-job", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "/profile", icon: <ImProfile /> },
];

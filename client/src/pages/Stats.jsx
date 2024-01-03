import { redirect, useLoaderData } from "react-router-dom/dist";
import { StatsContainer, ChartContainer } from "../components";

import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";

// query object
const statsQuery = {
  queryKey: ["stats"],
  // will automatically handle the async func in queryFn (don't need async & await)
  queryFn: () => customFetch.get("/jobs/stats"),
};

export const loader = (store, queryClient) => async () => {
  // restrict access (寫在 loader function 裡面)
  // useSelector (React Hook) 只能在 React component & custom hook 內部使用
  // 解決辦法：使用 App.jsx 傳進來的 store 以及其 method .getState() 代替 useSelector
  const { user } = store.getState().user;

  if (!user) {
    // 這邊不加上 toastify 是因為，當使用者來到我們網頁時，會先來到 "/"
    // 但因為尚未登入，會被直接導回 "/landing"
    // 這時候直接丟出錯誤很奇怪 (直接 redirect 可以了)
    return redirect("/landing");
  }

  try {
    // pre-fetch and ensure that the data for a given query is available in the cache
    // If the data is already in the cache, this method will return immediately without making a new request
    // If it is not in the cache or the cache has become stale, it will trigger a fetch to obtain the data
    const response = await queryClient.ensureQueryData(statsQuery);

    // 記得一定要 return
    return {
      stats: response.data.defaultStats,
      monthlyApplications: response.data.monthlyApplications,
    };
  } catch (error) {
    console.log(error);
    toast.error(errorMessageHandler(error), { icon: "😵" });
    // 記得一定要 return
    return null;
  }
};

const Stats = () => {
  const { monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer />

      <div className="mt-12">
        {/* 代表至少有一個 job 時，才會出現 chart */}
        {monthlyApplications.length > 0 && <ChartContainer />}
      </div>
    </>
  );
};

export default Stats;

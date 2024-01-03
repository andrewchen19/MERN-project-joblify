import { useSelector } from "react-redux";
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom/dist";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import SubmitBtn from "./SubmitBtn";
import { setAllJobs } from "../features/all-jobs/all-jobs-Slice";

import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";

// query function
const allJobsQuery = (params) => {
  const { search, status, jobType, sort, page } = params;

  return {
    // nullish coalescing operator
    // only if left side is "null" or "undefined", return right side
    queryKey: [
      "allJobs",
      search ?? "search",
      status ?? "all",
      jobType ?? "all",
      sort ?? "latest",
      page ?? "1",
    ],
    // 第二個參數 config -> params (an object)
    // 用於指定請求的查詢參數 (query parameters)
    queryFn: () => customFetch.get("/jobs", { params }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    // restrict access (寫在 loader function 裡面)
    const { user } = store.getState().user;

    if (!user) {
      toast.warning("Please log in first", { icon: "😠" });
      return redirect("/landing");
    }

    try {
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams);
      // console.log(params);

      // 處理 params 等於 {} 的情況
      // method chaining -> undefined without throw an error
      if (!params?.sort) {
        params.sort = "latest";
      }

      const response = await queryClient.ensureQueryData(allJobsQuery(params));

      store.dispatch(setAllJobs({ data: response.data }));

      // return data
      return {
        jobs: response.data.jobs,
        numOfPages: response.data.numOfPages,
        totalJobs: response.data.totalJobs,
        params,
      };
    } catch (error) {
      toast.error(errorMessageHandler(error), { icon: "😵" });

      // 記得一定要 return
      return null;
    }
  };

const AllJobsFilter = () => {
  const { statusOption, jobTypeOption, sortOption } = useSelector(
    (store) => store.allJobs.filter
  );

  // get data from loader function
  const { params } = useLoaderData();

  return (
    <Form
      method="GET"
      className="grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3"
    >
      <FormInput
        label="type position"
        type="text"
        name="search"
        defaultValue={params.search}
      />
      <FormSelect
        label="status"
        name="status"
        defaultValue={params.status}
        options={statusOption}
      />
      <FormSelect
        label="jobType"
        name="jobType"
        defaultValue={params.jobType}
        options={jobTypeOption}
      />
      <FormSelect
        label="sort"
        name="sort"
        defaultValue={params.sort}
        options={sortOption}
      />

      {/* buttons */}
      {/* button 外層是 inline-block，因此不會推開上下元素 */}
      <div className="mt-4 grid grid-cols-2 gap-x-4">
        {/* reset btn */}
        <NavLink
          to="/all-jobs"
          className="btn btn-secondary btn-sm lg:btn-md btn-block capitalize tracking-wide"
        >
          reset
        </NavLink>

        {/* submit btn */}
        <SubmitBtn text="search" />
      </div>
    </Form>
  );
};

export default AllJobsFilter;

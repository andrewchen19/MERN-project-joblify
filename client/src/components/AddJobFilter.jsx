import { useSelector } from "react-redux";
import { Form, NavLink, redirect } from "react-router-dom/dist";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import SubmitBtn from "./SubmitBtn";

import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const formObject = Object.fromEntries(formData);
      // console.log(formObject);

      const response = await customFetch.post("/jobs", formObject);

      // remove specific query and fetch new one
      queryClient.removeQueries({ queryKey: ["stats"] });
      queryClient.removeQueries({ queryKey: ["allJobs"] });

      toast.success(response.data.msg, { icon: "😎" });

      // 記得一定要 return
      return redirect("/all-jobs");
    } catch (error) {
      toast.error(errorMessageHandler(error), { icon: "😵" });

      // 記得一定要 return
      return null;
    }
  };

const AddJobFilter = () => {
  const { company, position, status, statusOption, jobType, jobTypeOption } =
    useSelector((store) => store.job);
  // 要注意：jobLocation 的 defaultValue 是來自 userSlice 的 user.location
  const { location } = useSelector((store) => store.user.user);

  return (
    <Form
      method="POST"
      className="grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3"
    >
      <FormInput
        label="company"
        type="text"
        name="company"
        defaultValue={company}
      />
      <FormInput
        label="position"
        type="text"
        name="position"
        defaultValue={position}
      />
      <FormSelect
        label="status"
        name="status"
        defaultValue={status}
        options={statusOption}
      />
      <FormSelect
        label="jobType"
        name="jobType"
        defaultValue={jobType}
        options={jobTypeOption}
      />
      <FormInput
        label="jobLocation"
        type="text"
        name="jobLocation"
        defaultValue={location}
      />
      {/* buttons */}
      {/* button 外層是 inline-block，因此不會推開上下元素 */}
      <div className="mt-4 grid grid-cols-2 gap-x-4">
        {/* reset btn */}
        <NavLink
          to="/add-job"
          className="btn btn-secondary btn-sm lg:btn-md btn-block capitalize tracking-wide"
        >
          reset
        </NavLink>

        {/* submit btn */}
        <SubmitBtn text="submit" />
      </div>
    </Form>
  );
};

export default AddJobFilter;

import { FormTitle, EditJobFilter } from "../components";
import { redirect } from "react-router-dom/dist";

import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";

export const loader =
  (store) =>
  async ({ params }) => {
    // restrict access (寫在 loader function 裡面)
    const { user } = store.getState().user;

    if (!user) {
      toast.warning("Please log in first", { icon: "😠" });
      return redirect("/landing");
    }

    try {
      // get dynamic segment
      const id = params.id;
      // console.log(id);

      const response = await customFetch.get(`jobs/${id}`);
      // console.log(response);

      // 記得一定要 return
      return response.data.job;
    } catch (error) {
      toast.error(errorMessageHandler(error), { icon: "😵" });
      // 記得一定要 return
      return null;
    }
  };

const EditJob = () => {
  return (
    <div className="form-outline">
      <FormTitle text="edit job" />
      <EditJobFilter />
    </div>
  );
};

export default EditJob;

import { FormTitle, AddJobFilter } from "../components";
import { redirect } from "react-router-dom/dist";

import { toast } from "react-toastify";

export const loader = (store) => () => {
  // restrict access (寫在 loader function 裡面)
  const { user } = store.getState().user;

  if (!user) {
    toast.warning("Please log in first", { icon: "😠" });
    return redirect("/landing");
  }

  // 記得一定要 return
  return null;
};

const AddJob = () => {
  return (
    <div className="form-outline">
      <FormTitle text="add job" />
      <AddJobFilter />
    </div>
  );
};

export default AddJob;

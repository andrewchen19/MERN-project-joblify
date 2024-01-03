import { useSelector } from "react-redux";
import { Form } from "react-router-dom/dist";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { updateUser } from "../features/user/userSlice";

import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const formObject = Object.fromEntries(formData);
      // console.log(formObject);

      const response = await customFetch.patch("/users/updateUser", formObject);

      store.dispatch(updateUser({ user: response.data.user }));

      toast.success(response.data.msg, { icon: "😎" });

      // 記得一定要 return
      return null;
    } catch (error) {
      toast.error(errorMessageHandler(error), { icon: "😵" });

      // 記得一定要 return
      return null;
    }
  };

const ProfileFilter = () => {
  const { name, email, lastName, location } = useSelector(
    (store) => store.user.user
  );
  return (
    <Form
      method="PATCH"
      className="grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3"
    >
      <FormInput label="name" type="text" name="name" defaultValue={name} />
      <FormInput
        label="lastName"
        type="text"
        name="lastName"
        defaultValue={lastName}
      />
      <FormInput label="email" type="email" name="email" defaultValue={email} />
      <FormInput
        label="location"
        type="text"
        name="location"
        defaultValue={location}
      />
      {/* button 外層是 inline-block，因此不會推開上下元素 */}
      <div className="mt-4">
        <SubmitBtn text="save change" />
      </div>
    </Form>
  );
};

export default ProfileFilter;

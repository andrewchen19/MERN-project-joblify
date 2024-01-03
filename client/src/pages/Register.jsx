import { FormInput, Logo, SubmitBtn } from "../components";
import { Form, NavLink, redirect } from "react-router-dom/dist";

import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  let formData = await request.formData();
  // turn a list of key-value pairs into object
  const formObject = Object.fromEntries(formData);
  // console.log(formObject);

  try {
    const response = await customFetch.post("/auth/register", formObject);
    //console.log(response)

    toast.success(response.data.msg, { icon: "😎" });

    // 記得一定要 return
    // "redirect" is designed for action & loader
    return redirect("/login");
  } catch (error) {
    // console.log(error)
    toast.error(errorMessageHandler(error), { icon: "😵" });

    // 記得一定要 return
    return null;
  }
};

const Register = () => {
  return (
    <section className="bg-slate-50 min-h-screen grid place-items-center">
      {/* prevents the browser from sending request, instead sends the request to your route action */}
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 "
      >
        {/* logo */}
        <div className="flex justify-center">
          <Logo imgSize="h-10 w-10" textSize="text-3xl" />
        </div>

        {/* text */}
        <h4 className="font-palanquin font-bold capitalize text-3xl text-center tracking-wide">
          register
        </h4>

        {/* inputs */}
        <FormInput label="name" type="text" name="name" />
        <FormInput label="email" type="email" name="email" />
        <FormInput label="password" type="password" name="password" />

        {/* submit button */}
        {/* button 外層是 inline-block，因此不會推開上下元素 */}
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        {/* navigate to register page */}
        <p className="flex justify-center font-montserrat">
          Already a member?
          <NavLink
            to="/login"
            className="pl-4 link link-secondary capitalize font-montserrat"
          >
            login
          </NavLink>
        </p>
      </Form>
    </section>
  );
};

export default Register;

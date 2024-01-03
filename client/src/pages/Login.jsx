import { FormInput, Logo, SubmitBtn } from "../components";
import { Form, NavLink, redirect, useNavigate } from "react-router-dom/dist";
import { setUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData);
    // console.log(formObject)

    try {
      const response = await customFetch.post("/auth/login", formObject);

      const user = response.data.user;
      // useDispatch (React Hook) 只能在 React component & custom hook 內部使用
      // 解決辦法：使用 App.jsx 傳進來的 store 以及其 method .dispatch() 代替 useDispatch
      store.dispatch(setUser({ user }));

      toast.success(response.data.msg, { icon: "✋🏽" });

      // 記得一定要 return
      // "redirect" is designed for action & loader
      return redirect("/");
    } catch (error) {
      toast.error(errorMessageHandler(error), { icon: "😵" });

      // 記得一定要 return
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // utility function
  const demoUserHandler = async () => {
    try {
      const response = await customFetch.post("/auth/login", {
        email: "testUser@test.com",
        password: "secret",
      });

      const user = response.data.user;
      dispatch(setUser({ user }));

      toast.success(response.data.msg, { icon: "✋🏽" });

      // navigate to a specific route
      navigate("/");
    } catch (error) {
      toast.error(errorMessageHandler(error), { icon: "😵" });
    }
  };

  return (
    <section className="bg-base-100 min-h-screen grid place-items-center">
      {/* prevents the browser from sending request, instead sends the request to your route action */}
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-4 "
      >
        {/* logo */}
        <div className="flex justify-center">
          <Logo imgSize="h-10 w-10" textSize="text-3xl" />
        </div>

        {/* text */}
        <h4 className="font-palanquin font-bold capitalize text-3xl text-center tracking-wide">
          login
        </h4>

        {/* inputs */}
        <FormInput label="email" type="email" name="email" />
        <FormInput label="password" type="password" name="password" />

        {/* submit button */}
        {/* button 外層是 inline-block，因此不會推開上下元素 */}
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>

        {/* demo user button */}
        <button
          type="button"
          className="btn btn-neutral btn-sm lg:btn-md btn-block capitalize tracking-wide"
          onClick={demoUserHandler}
        >
          demo user
        </button>

        {/* navigate to register page */}
        <p className="flex justify-center font-montserrat">
          Not a member yet?
          <NavLink
            to="/register"
            className="pl-4 link link-secondary capitalize font-montserrat"
          >
            register
          </NavLink>
        </p>
      </Form>
    </section>
  );
};

export default Login;

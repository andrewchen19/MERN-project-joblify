import Logo from "./Logo";
import { NavLink } from "react-router-dom/dist";
import { useSelector, useDispatch } from "react-redux";
import {
  removeUser,
  toggleTheme,
  toggleSidebar,
} from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";

// react icons
import { FaBars, FaUserCircle } from "react-icons/fa";
import { PiUserCircleMinusFill } from "react-icons/pi";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, theme } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // utility functions
  const sidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  const themeHandler = () => {
    dispatch(toggleTheme());
  };

  const logoutHandler = async () => {
    try {
      const response = await customFetch.delete("/auth/logout");

      dispatch(removeUser());
      // remove all the queries
      queryClient.removeQueries();

      toast.success(response.data.msg, { icon: "✋🏽" });
    } catch (error) {
      toast.error(errorMessageHandler(error), { icon: "😵" });
    }
  };

  // check the last theme user used (let icon change sync)
  const isLightTheme = theme === "myLight";

  return (
    <nav className="bg-base-300">
      <section className="align-element px-0 py-2 flex justify-between items-center">
        {/* toggle sidebar */}
        <div className="flex-initial">
          <button
            className="btn btn-ghost hover:bg-base-300 hover:scale-110 duration-300"
            onClick={sidebarHandler}
          >
            <FaBars className="h-5 w-5 lg:h-7 lg:w-7 text-primary" />
          </button>
        </div>

        {/* logo or dashboard */}
        <div className="flex-initial">
          {/* logo */}
          <Logo
            imgSize="h-6 w-6"
            textSize="text-2xl"
            additionalClass="lg:hidden"
          />

          {/* dashboard */}
          <h3 className="hidden lg:block text-3xl font-bold tracking-wide text-primary capitalize">
            dashboard
          </h3>
        </div>

        {/* theme & button or menu */}
        <div className="flex-initial flex gap-x-2 lg:gap-x-4 items-center">
          {/* toggle theme */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={themeHandler}
              defaultChecked={isLightTheme}
            />
            <BsSunFill className="swap-on fill-current w-5 h-5 lg:w-6 lg:h-6" />
            <BsMoonFill className="swap-off fill-current w-5 h-5 lg:w-6 lg:h-6 text-black" />
          </label>

          {/* logout button */}
          <div className="lg:hidden">
            <NavLink
              to="/landing"
              title="Logout"
              className="btn btn-ghost hover:bg-base-300 btn-circle"
              onClick={logoutHandler}
            >
              <PiUserCircleMinusFill className="w-6 h-6 text-neutral" />
            </NavLink>
          </div>

          {/* menu & submenu */}
          <ul className="max-lg:hidden menu menu-horizontal px-1 hover:bg-transparent">
            <li className="bg-neutral rounded-lg">
              <details>
                <summary className="font-semibold font-palanquin tracking-wide capitalize hover:bg-transparent hover:text-base-100">
                  <span>
                    <FaUserCircle />
                  </span>
                  {user.name}
                </summary>
                <ul className="p-2">
                  <li className="hover:bg-neutral hover:rounded-lg duration-300">
                    <NavLink
                      to="/landing"
                      className="font-semibold font-palanquin tracking-wide capitalize hover:bg-transparent hover:text-base-100 duration-300"
                      onClick={logoutHandler}
                    >
                      logout
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;

import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { toggleSidebar } from "../features/user/userSlice";

import { FaTimes } from "react-icons/fa";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  return (
    // background (占滿整個視窗)
    // inline styling
    <aside
      className={`lg:hidden fixed inset-0 w-full h-full grid place-items-center ${
        isSidebarOpen ? "z-10 opacity-100" : "-z-10 opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      {/* content */}
      <section className="bg-white rounded-lg h-[95vh] w-[90vw] relative">
        {/* close btn */}
        <div>
          <button
            type="button"
            className="absolute left-6 top-6 btn btn-ghost hover:bg-white text-xl text-neutral"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
        </div>

        {/* logo */}
        <div className="mt-20 py-4 flex justify-center">
          <Logo imgSize="h-8 w-8" textSize="text-2xl" />
        </div>

        {/* links */}
        <div>
          <ul className="menu menu-vertical space-y-4">
            <NavLinks />
          </ul>
        </div>
      </section>
    </aside>
  );
};

export default SmallSidebar;

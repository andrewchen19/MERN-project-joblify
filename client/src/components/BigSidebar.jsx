import { useSelector } from "react-redux";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    // background
    <aside
      className={`bg-base-300 max-lg:hidden w-[200px] min-h-screen duration-300 ${
        isSidebarOpen ? "ml-0" : "-ml-[200px]"
      }`}
    >
      {/* logo */}
      <div className="py-4 flex justify-center">
        <Logo imgSize="h-8 w-8" textSize="text-2xl" />
      </div>

      {/* links */}
      <div>
        <ul className="menu menu-vertical space-y-4">
          <NavLinks />
        </ul>
      </div>
    </aside>
  );
};

export default BigSidebar;

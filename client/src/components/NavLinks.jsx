import { links } from "../utilize";
import { NavLink } from "react-router-dom/dist";
import { toggleSidebar } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const NavLinks = () => {
  const dispatch = useDispatch();

  return (
    <>
      {links.map((link) => {
        const { id, text, path, icon } = link;

        return (
          <li key={id} className="mx-auto">
            <NavLink
              to={path}
              className="capitalize flex gap-x-4 font-palanquin font-medium tracking-wide text-xl hover:bg-transparent hover:ml-6 duration-300"
              onClick={() => dispatch(toggleSidebar())}
            >
              {icon}
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;

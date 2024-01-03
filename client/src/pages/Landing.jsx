import main from "../assets/images/main.svg";
import { Logo } from "../components";
import { NavLink } from "react-router-dom/dist";

const Landing = () => {
  return (
    <main className="min-h-screen align-element">
      <nav className="pt-8 flex justify-center lg:justify-start items-center">
        <Logo imgSize="h-10 w-10" textSize="text-3xl" />
      </nav>

      <section className="pt-12 grid lg:grid-cols-2 items-center lg:gap-x-8">
        {/* info */}
        <div className="flex flex-col gap-y-8 items-center lg:items-start">
          <h1 className="font-bold text-3xl lg:text-4xl font-palanquin">
            Job <span className="text-accent">Hunting</span> App
          </h1>
          <p className="font-montserrat text-slate-500 leading-7 max-lg:max-w-[30rem] max-lg:text-center lg:pr-16">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            ipsum mollitia libero similique voluptatum odio beatae dolores.
            Asperiores, perferendis pariatur. Veritatis ad repellat mollitia
            maiores quam totam necessitatibus enim dolor.
          </p>
          <NavLink
            to="/login"
            className="btn btn-sm lg:btn-md btn-accent btn-outline capitalize tracking-wide"
          >
            login
          </NavLink>
        </div>
        {/* image */}
        <div className="hidden lg:block">
          <img src={main} alt="job hunting" />
        </div>
      </section>
    </main>
  );
};

export default Landing;

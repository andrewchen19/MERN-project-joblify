import { useLoaderData } from "react-router-dom/dist";

// react icons
import { BsPersonWorkspace } from "react-icons/bs";
import { MdLuggage } from "react-icons/md";
import { TbMoodSadDizzy } from "react-icons/tb";

const StatsContainer = () => {
  const { stats } = useLoaderData();
  const { interview, pending, declined } = stats;

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4">
      <article className="card px-6 py-8 w-full shadow-xl hover:shadow-2xl duration-300 border-b-4 border-success">
        <div className="flex justify-between items-center">
          <p className="text-2xl lg:text-3xl font-semibold text-success">
            {interview}
          </p>
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-success rounded-lg grid place-items-center text-xl lg:text-2xl">
            <BsPersonWorkspace />
          </div>
        </div>

        <p className="mt-8 font-palanquin text-lg lg:text-xl tracking-wide font-medium">
          Interviews Scheduled
        </p>
      </article>

      <article className="card px-6 py-8 w-full shadow-xl hover:shadow-2xl duration-300 border-b-4 border-warning">
        <div className="flex justify-between items-center">
          <p className="text-2xl lg:text-3xl font-semibold text-warning">
            {pending}
          </p>
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-warning rounded-lg grid place-items-center text-xl lg:text-2xl">
            <MdLuggage />
          </div>
        </div>

        <p className="mt-8 font-palanquin text-lg lg:text-xl tracking-wide font-medium">
          Pending Applications
        </p>
      </article>

      <article className="card px-6 py-8 w-full shadow-xl hover:shadow-2xl duration-300 border-b-4 border-error">
        <div className="flex justify-between items-center">
          <p className="text-2xl lg:text-3xl font-semibold text-error">
            {declined}
          </p>
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-error rounded-lg grid place-items-center text-xl lg:text-2xl">
            <TbMoodSadDizzy />
          </div>
        </div>

        <p className="mt-8 font-palanquin text-lg lg:text-xl tracking-wide font-medium">
          Jobs Declined
        </p>
      </article>
    </section>
  );
};

export default StatsContainer;

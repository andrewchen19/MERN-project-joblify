import { useLoaderData } from "react-router-dom/dist";
import AllJobsGrid from "./AllJobsGrid";

const AllJobsContainer = () => {
  const { totalJobs } = useLoaderData();

  // conditional rendering
  if (totalJobs === 0) {
    return (
      <div className="mt-10">
        <h3 className=" font-palanquin font-semibold text-secondary text-2xl lg:text-3xl tracking-wide">
          No job to display...
        </h3>
      </div>
    );
  }

  return (
    <>
      {/* header */}
      <div className="mt-10">
        <h3 className="capitalize font-palanquin font-semibold text-xl lg:text-2xl tracking-wide">
          <span className="text-secondary">{totalJobs}</span> jobs found
        </h3>
      </div>

      {/* grid */}
      <div className="mt-6">
        <AllJobsGrid />
      </div>
    </>
  );
};

export default AllJobsContainer;

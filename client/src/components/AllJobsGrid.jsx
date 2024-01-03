import SingleJobGrid from "./SingleJobGrid";
import { useLoaderData } from "react-router-dom/dist";

const AllJobsGrid = () => {
  const { jobs } = useLoaderData();

  return (
    <section className="grid lg:grid-cols-2 gap-4">
      {jobs.map((job) => {
        return <SingleJobGrid key={job._id} {...job} />;
      })}
    </section>
  );
};

export default AllJobsGrid;

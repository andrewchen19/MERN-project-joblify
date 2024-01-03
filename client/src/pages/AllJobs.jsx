import {
  FormTitle,
  AllJobsFilter,
  AllJobsContainer,
  Pagination,
} from "../components";

const AllJobs = () => {
  return (
    <>
      {/* form */}
      <div className="form-outline">
        <FormTitle text="job search" />
        <AllJobsFilter />
      </div>

      {/* data */}
      <AllJobsContainer />

      {/* pagination */}
      <Pagination />
    </>
  );
};

export default AllJobs;

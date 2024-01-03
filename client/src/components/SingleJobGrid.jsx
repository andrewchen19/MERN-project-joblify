import dayjs from "dayjs";
import { NavLink, useNavigate } from "react-router-dom/dist";
import { customFetch, errorMessageHandler } from "../utilize";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// react icons
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const SingleJobGrid = ({
  _id,
  company,
  position,
  status,
  jobType,
  jobLocation,
  createdAt,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // utility function
  const deleteHandler = async (id) => {
    try {
      const response = await customFetch.delete(`/jobs/${id}`);

      toast.success(response.data.msg, { icon: "😎" });

      // remove specific query and fetch new one
      queryClient.removeQueries({ queryKey: ["stats"] });
      queryClient.removeQueries({ queryKey: ["allJobs"] });

      navigate("/all-jobs");
    } catch (error) {
      toast.error(errorMessageHandler(error), { icon: "😵" });
    }
  };

  return (
    <article className="card px-6 py-8 w-full shadow-xl hover:shadow-2xl duration-300">
      {/* 上半部 & 底線 */}
      <section className="flex gap-x-4 items-center pb-4 border-b-[1px] border-neutral">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded grid place-items-center capitalize font-palanquin font-semibold lg:text-xl">
          {company[0]}
        </div>

        <div className="space-y-1 lg:space-y-2">
          <h3 className="capitalize font-palanquin font-semibold lg:text-xl">
            {company}
          </h3>
          <h4 className="capitalize font-montserrat lg:text-lg text-gray-500 ">
            {position}
          </h4>
        </div>
      </section>

      {/* 下半部 */}
      <section className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="flex gap-x-3 items-center capitalize">
          <FaLocationDot className="text-gray-500" />
          {jobLocation}
        </div>

        <div className="flex gap-x-3 items-center capitalize">
          <FaCalendarAlt className="text-gray-500" />
          {dayjs(createdAt).format("MMM DD, YYYY")}
        </div>

        <div className="flex gap-x-3 items-center capitalize">
          <MdWork className="text-gray-500" />
          {jobType}
        </div>

        <div
          className={`py-1 px-3 max-w-24 rounded-md capitalize text-center font-semibold ${
            (status === "interview" && "bg-success") ||
            (status === "pending" && "bg-warning") ||
            (status === "declined" && "bg-error")
          }`}
        >
          {status}
        </div>

        {/* buttons */}
        <div className="flex gap-x-4">
          {/* edit button */}
          <NavLink
            to={`/edit-job/${_id}`}
            className="btn btn-sm btn-primary capitalize font-semibold"
          >
            edit
          </NavLink>

          {/* delete button */}
          <button
            type="button"
            className="btn btn-sm btn-secondary capitalize font-semibold"
            onClick={() => deleteHandler(_id)}
          >
            delete
          </button>
        </div>
      </section>
    </article>
  );
};

export default SingleJobGrid;

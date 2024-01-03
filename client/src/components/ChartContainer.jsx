import { useDispatch, useSelector } from "react-redux";
import { toggleChart } from "../features/user/userSlice";

import AreaChart from "./AreaChartComponent";
import BarChart from "./BarChartComponent";

const ChartContainer = () => {
  const { isBarChart } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <section>
      <h2 className="text-2xl lg:text-3xl capitalize font-palanquin tracking-wide font-semibold text-center">
        Monthly Applications
      </h2>

      <div className="mt-6 flex justify-center">
        <button
          className="link link-neutral text-xl lg:text-2xl uppercase font-montserrat tracking-wide font-semibold"
          onClick={() => dispatch(toggleChart())}
        >
          {isBarChart ? "bar chart" : "area chart"}
        </button>
      </div>

      {isBarChart ? <BarChart /> : <AreaChart />}
    </section>
  );
};

export default ChartContainer;

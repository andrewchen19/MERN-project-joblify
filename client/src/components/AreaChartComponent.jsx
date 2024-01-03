import { useLoaderData } from "react-router-dom/dist";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 這邊必須換 name，要不然會跟引用的 library 的 "AreaChart" 重複
const AreaChartComponent = () => {
  const { monthlyApplications } = useLoaderData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={monthlyApplications}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#420aaa" fill="#70acc7" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;

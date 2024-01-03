import { useLoaderData } from "react-router-dom/dist";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 這邊必須換 name，要不然會跟引用的 library 的 "BarChart" 重複
const BarChartComponent = () => {
  const { monthlyApplications } = useLoaderData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={monthlyApplications}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#70acc7" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

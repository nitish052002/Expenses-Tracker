import  { useContext } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./chart.css";
import { GlobalContext } from "../Store/GlobalContext";

interface RenderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#325ba8",
  "#4632a8",
];

const RADIAN = Math.PI / 180;



const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: RenderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};








export default function Chart() {
  const { globalStore } = useContext(GlobalContext) || {
    globalStore: { expenses: [], wallet: 0 },
  };
  const data = globalStore.expenses.map(({ category, price }) => {
    return { name: category, value: price };
  });

  return (
    <PieChart width={500} height={300}>
      <Pie
        data={data}
        cx={"50%"}
        cy={"50%"}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={"80%"}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

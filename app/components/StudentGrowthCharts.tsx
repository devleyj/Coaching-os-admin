"use client";

import{
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", students: 820 },
  { month: "Feb", students: 875 },
  { month: "Mar", students: 920 },
  { month: "Apr", students: 980 },
  { month: "May", students: 1080 },
  { month: "Jun", students: 1140 },
  { month: "Jul", students: 1248 },
];

export default function StudentGrowthChart() {
  return(
    <div className= "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className= "mb-6">
        <h2 className= "text-lg font-semibold text-slate-900">
          Student Growth
        </h2>

        <p className= "mt-1 text-sm text-slate-500">
          Student enrollment over the last 7 months
        </p>
      </div>

      <div className= "h-80 w-full">
        <ResponsiveContainer width= "100%" height= "100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray= "3 3" stroke="#e2e8f0"/>

            <XAxis
             dataKey="month"
             tick={{fontSize: 12}}
             axisLine={false}
             tickLine={false}
            />

            <YAxis
             tick={{fontSize: 12}}
             axisLine={false}
             tickLine={false}
            />

            <Tooltip />
            
            <Line
             type= "monotone"
             dataKey="students"
             stroke="#2563eb"
             dot={{ r:4 }}
             activeDot={{ r:6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
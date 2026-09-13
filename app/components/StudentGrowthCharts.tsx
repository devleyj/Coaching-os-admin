"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getCollection,
  subscribeToStore,
} from "../data/store";

type StudentRecord = {
  id?: string;
  name?: string;
  course?: string;
  batch?: string;
  status?: string;

  createdAt?: string;
  admissionDate?: string;
  enrolledAt?: string;
  registrationDate?: string;
  dateJoined?: string;
};

type GrowthPoint = {
  month: string;
  students: number;
};

function getStudentDate(student: StudentRecord) {
  return (
    student.admissionDate ||
    student.enrolledAt ||
    student.registrationDate ||
    student.dateJoined ||
    student.createdAt ||
    null
  );
}

function getLastSevenMonths() {
  const months: {
    key: string;
    label: string;
  }[] = [];

  const now = new Date();

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1,
    );

    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleDateString("en-IN", {
        month: "short",
      }),
    });
  }

  return months;
}

function buildGrowthData(
  students: StudentRecord[],
): GrowthPoint[] {
  const months = getLastSevenMonths();

  const counts = months.map(() => 0);

  students.forEach((student) => {
    const rawDate = getStudentDate(student);

    if (!rawDate) return;

    const date = new Date(rawDate);

    if (Number.isNaN(date.getTime())) return;

    const studentKey = `${date.getFullYear()}-${date.getMonth()}`;

    const monthIndex = months.findIndex(
      (month) => month.key === studentKey,
    );

    if (monthIndex !== -1) {
      counts[monthIndex] += 1;
    }
  });

  /*
   * Convert monthly new-enrollment counts into
   * cumulative student totals.
   *
   * This gives the chart its actual "growth"
   * shape instead of showing only monthly admissions.
   */
  let cumulative = 0;

  return months.map((month, index) => {
    cumulative += counts[index];

    return {
      month: month.label,
      students: cumulative,
    };
  });
}

function formatNumber(value: number) {
  return value.toLocaleString("en-IN");
}

export default function StudentGrowthChart() {
  const [students, setStudents] = useState<StudentRecord[]>(
    [],
  );

  const [loading, setLoading] = useState(true);

  const loadStudents = () => {
    const storedStudents =
      getCollection<StudentRecord>("students");

    setStudents(
      Array.isArray(storedStudents)
        ? storedStudents
        : [],
    );

    setLoading(false);
  };

  useEffect(() => {
    loadStudents();

    const unsubscribe = subscribeToStore(() => {
      loadStudents();
    });

    return unsubscribe;
  }, []);

  const growthData = useMemo(
    () => buildGrowthData(students),
    [students],
  );

  const hasHistoricalData = growthData.some(
    (item) => item.students > 0,
  );

  const currentStudentCount = students.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Student Growth
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Student enrollment over the last 7 months
          </p>
        </div>

        {!loading && currentStudentCount > 0 && (
          <div className="rounded-xl bg-blue-50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-500">
              Total Students
            </p>

            <p className="mt-0.5 text-sm font-bold text-blue-700">
              {formatNumber(currentStudentCount)}
            </p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex h-80 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="text-sm font-medium text-slate-500">
              Loading student growth...
            </p>
          </div>
        </div>
      ) : !hasHistoricalData ? (
        <div className="flex h-80 items-center justify-center">
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <span className="text-lg font-bold">
                #
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No enrollment history available
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Student growth will appear here once student
              enrollment dates are available.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={growthData}
              margin={{
                top: 5,
                right: 8,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                width={45}
              />

              <Tooltip
                cursor={{
                  stroke: "#cbd5e1",
                  strokeDasharray: "4 4",
                }}
                formatter={(value) => [
                  formatNumber(Number(value)),
                  "Students",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 10px 25px rgba(15, 23, 42, 0.08)",
                }}
              />

              <Line
                type="monotone"
                dataKey="students"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
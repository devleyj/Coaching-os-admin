"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PAYMENTS_STORAGE_KEY = "coaching-os-fee-payments";
const PAYMENT_UPDATED_EVENT = "coaching-payment-updated";

type Payment = {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  batch: string;
  amount: number;
  method: string;
  date: string;
  physicalReceiptNo: string;
  previousPaid: number;
  remainingBalance: number;
};

type RevenuePoint = {
  month: string;
  revenue: number;
};

function isPayment(value: unknown): value is Payment {
  if (!value || typeof value !== "object") return false;

  const payment = value as Partial<Payment>;

  return (
    typeof payment.id === "string" &&
    typeof payment.amount === "number" &&
    typeof payment.date === "string"
  );
}

function loadPayments(): Payment[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(PAYMENTS_STORAGE_KEY);

    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isPayment);
  } catch {
    return [];
  }
}

function getLastSevenMonths(): RevenuePoint[] {
  const months: RevenuePoint[] = [];
  const now = new Date();

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1,
    );

    months.push({
      month: date.toLocaleDateString("en-IN", {
        month: "short",
      }),
      revenue: 0,
    });
  }

  return months;
}

function buildRevenueData(payments: Payment[]): RevenuePoint[] {
  const months = getLastSevenMonths();
  const now = new Date();

  const monthKeys = months.map((_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (6 - index),
      1,
    );

    return `${date.getFullYear()}-${date.getMonth()}`;
  });

  payments.forEach((payment) => {
    const paymentDate = new Date(payment.date);

    if (Number.isNaN(paymentDate.getTime())) return;

    const paymentKey = `${paymentDate.getFullYear()}-${paymentDate.getMonth()}`;

    const index = monthKeys.indexOf(paymentKey);

    if (index !== -1) {
      months[index].revenue += payment.amount;
    }
  });

  return months;
}

function formatRupees(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function formatYAxis(value: number) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }

  return `₹${value}`;
}

export default function RevenueChart() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRevenue = () => {
    setPayments(loadPayments());
    setLoading(false);
  };

  useEffect(() => {
    loadRevenue();

    const handlePaymentUpdate = () => {
      loadRevenue();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === PAYMENTS_STORAGE_KEY) {
        loadRevenue();
      }
    };

    window.addEventListener(
      PAYMENT_UPDATED_EVENT,
      handlePaymentUpdate,
    );

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        PAYMENT_UPDATED_EVENT,
        handlePaymentUpdate,
      );

      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const revenueData = useMemo(
    () => buildRevenueData(payments),
    [payments],
  );

  const hasRevenue = revenueData.some(
    (item) => item.revenue > 0,
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monthly fee collection
        </p>
      </div>

      {loading ? (
        <div className="flex h-80 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="text-sm font-medium text-slate-500">
              Loading revenue...
            </p>
          </div>
        </div>
      ) : !hasRevenue ? (
        <div className="flex h-80 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
              ₹
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No revenue recorded yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Revenue will appear here when fee payments are recorded.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              margin={{
                top: 5,
                right: 5,
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
                tickFormatter={formatYAxis}
                width={58}
              />

              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                formatter={(value) => [
                  formatRupees(Number(value)),
                  "Revenue",
                ]}
                labelFormatter={(label) => `${label}`}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 10px 25px rgba(15, 23, 42, 0.08)",
                }}
              />

              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
                maxBarSize={52}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
"use client";

import { CreditCard, CheckCircle2, Clock3 } from "lucide-react";

const payments = [
  {
    student: "Riya Sharma",
    batch: "JEE Advanced",
    amount: "₹12,000",
    method: "UPI",
    date: "Today, 10:32 AM",
    status: "Paid",
  },
  {
    student: "Aarav Mehta",
    batch: "NEET 2027",
    amount: "₹15,000",
    method: "Card",
    date: "Today, 09:18 AM",
    status: "Paid",
  },
  {
    student: "Kabir Patel",
    batch: "JEE Main",
    amount: "₹8,500",
    method: "Cash",
    date: "Yesterday, 04:45 PM",
    status: "Paid",
  },
  {
    student: "Ananya Singh",
    batch: "NEET 2027",
    amount: "₹10,000",
    method: "UPI",
    date: "Yesterday, 02:20 PM",
    status: "Pending",
  },
];

export default function RecentPayments() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Card Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Payments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest fee transactions
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CreditCard size={19} />
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        {payments.map((payment) => (
          <div
            key={`${payment.student}-${payment.date}`}
            className="rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {payment.student}
                </p>

                <p className="mt-1 text-xs text-blue-600">
                  {payment.batch}
                </p>
              </div>

              <p className="shrink-0 text-sm font-bold text-slate-900">
                {payment.amount}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{payment.method}</span>
                <span>•</span>
                <span>{payment.date}</span>
              </div>

              <div
                className={`flex items-center gap-1 text-xs font-semibold ${
                  payment.status === "Paid"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {payment.status === "Paid" ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <Clock3 size={14} />
                )}

                {payment.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div className="mt-4 border-t border-slate-100 pt-4">
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          View all payments →
        </button>
      </div>
    </div>
  );
}
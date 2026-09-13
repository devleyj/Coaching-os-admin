"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  IndianRupee,
  ReceiptText,
} from "lucide-react";

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

const formatAmount = (value: number) => {
  return `₹${value.toLocaleString("en-IN")}`;
};

const formatDate = (value: string) => {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const loadPayments = (): Payment[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(
      PAYMENTS_STORAGE_KEY,
    );

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is Payment => {
        if (
          typeof item !== "object" ||
          item === null
        ) {
          return false;
        }

        const payment =
          item as Record<string, unknown>;

        return (
          typeof payment.id === "string" &&
          typeof payment.studentName === "string" &&
          typeof payment.amount === "number" &&
          typeof payment.date === "string"
        );
      },
    );
  } catch {
    return [];
  }
};

export default function RecentPayments() {
  const [payments, setPayments] = useState<
    Payment[]
  >([]);

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    const refreshPayments = () => {
      setPayments(loadPayments());
      setHydrated(true);
    };

    refreshPayments();

    const handlePaymentUpdated = () => {
      refreshPayments();
    };

    const handleStorage = (
      event: StorageEvent,
    ) => {
      if (
        event.key === PAYMENTS_STORAGE_KEY
      ) {
        refreshPayments();
      }
    };

    window.addEventListener(
      PAYMENT_UPDATED_EVENT,
      handlePaymentUpdated,
    );

    window.addEventListener(
      "storage",
      handleStorage,
    );

    return () => {
      window.removeEventListener(
        PAYMENT_UPDATED_EVENT,
        handlePaymentUpdated,
      );

      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  const recentPayments = useMemo(() => {
    return [...payments]
      .sort((a, b) => {
        const first = new Date(
          `${a.date}T00:00:00`,
        ).getTime();

        const second = new Date(
          `${b.date}T00:00:00`,
        ).getTime();

        return second - first;
      })
      .slice(0, 4);
  }, [payments]);

  const recentTotal = useMemo(() => {
    return recentPayments.reduce(
      (total, payment) =>
        total + payment.amount,
      0,
    );
  }, [recentPayments]);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div>
              <div className="h-5 w-36 rounded bg-slate-200" />
              <div className="mt-2 h-4 w-48 rounded bg-slate-100" />
            </div>

            <div className="h-10 w-10 rounded-xl bg-slate-100" />
          </div>

          <div className="mt-6 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-20 rounded-xl bg-slate-100"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Payments
            </h2>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
              Live
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Latest fee transactions
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <CreditCard size={19} />
        </div>
      </div>

      {/* Summary */}
      {recentPayments.length > 0 && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
              <IndianRupee size={15} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                Recent total
              </p>

              <p className="text-sm font-extrabold text-slate-900">
                {formatAmount(recentTotal)}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-700">
            {recentPayments.length}{" "}
            transaction
            {recentPayments.length !== 1
              ? "s"
              : ""}
          </span>
        </div>
      )}

      {/* Payment list */}
      <div className="mt-5 space-y-3">
        {recentPayments.length === 0 ? (
          <div className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
              <ReceiptText size={18} />
            </div>

            <p className="mt-3 text-sm font-bold text-slate-700">
              No recent payments
            </p>

            <p className="mt-1 max-w-xs text-xs font-medium text-slate-400">
              Payments recorded from the Fees
              page will appear here.
            </p>
          </div>
        ) : (
          recentPayments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-xl border border-slate-100 p-3.5 transition-all duration-200 hover:border-emerald-100 hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {payment.studentName}
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-blue-600">
                    {payment.batch}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-extrabold text-slate-900">
                  {formatAmount(payment.amount)}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>{payment.method}</span>

                  <span className="text-slate-300">
                    •
                  </span>

                  <span>
                    {formatDate(payment.date)}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <CheckCircle2 size={14} />
                  Paid
                </div>
              </div>

              {payment.physicalReceiptNo && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                  <ReceiptText size={12} />

                  Receipt:{" "}
                  {payment.physicalReceiptNo}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <button
          type="button"
          className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          View all payments →
        </button>
      </div>
    </div>
  );
}
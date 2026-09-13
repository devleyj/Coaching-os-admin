"use client";

import { useEffect, useMemo, useState } from "react";
import {
  UserPlus,
  CreditCard,
  ClipboardCheck,
  MessageSquare,
  Activity,
  Clock3,
} from "lucide-react";

import {
  getCollection,
  subscribeToStore,
} from "../data/store";

type StudentRecord = {
  id?: string;
  name?: string;
  course?: string;
  batch?: string;
  createdAt?: string;
  updatedAt?: string;
  lastPayment?: string;
};

type FeeRecord = {
  id?: string;
  studentId?: string;
  studentName?: string;
  amount?: number | string;
  paidAmount?: number | string;
  paidFees?: number | string;
  date?: string;
  paymentDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

type AttendanceRecord = {
  id?: string;
  studentId?: string;
  studentName?: string;
  batch?: string;
  date?: string;
  checkIn?: string;
  status?: string;
};

type InquiryRecord = {
  id?: string;
  name?: string;
  studentName?: string;
  parentName?: string;
  course?: string;
  batch?: string;
  createdAt?: string;
  updatedAt?: string;
  date?: string;
};

type ActivityItem = {
  id: string;
  icon: typeof UserPlus;
  title: string;
  description: string;
  timestamp: number;
  time: string;
};

const formatCurrency = (value: unknown) => {
  const amount =
    typeof value === "number"
      ? value
      : Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    return "Payment received";
  }

  return `₹${amount.toLocaleString("en-IN")} received`;
};

const getTimestamp = (...values: unknown[]) => {
  for (const value of values) {
    if (!value) continue;

    const timestamp = new Date(
      String(value),
    ).getTime();

    if (!Number.isNaN(timestamp)) {
      return timestamp;
    }
  }

  return 0;
};

const formatRelativeTime = (timestamp: number) => {
  if (!timestamp) {
    return "Recently";
  }

  const difference = Date.now() - timestamp;

  if (difference < 0) {
    return "Just now";
  }

  const seconds = Math.floor(
    difference / 1000,
  );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(
    seconds / 60,
  );

  if (minutes < 60) {
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ago`;
  }

  const hours = Math.floor(
    minutes / 60,
  );

  if (hours < 24) {
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } ago`;
  }

  const days = Math.floor(
    hours / 24,
  );

  if (days < 7) {
    return `${days} day${
      days !== 1 ? "s" : ""
    } ago`;
  }

  return new Date(timestamp).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
    },
  );
};

export default function RecentActivity() {
  const [students, setStudents] = useState<
    StudentRecord[]
  >([]);

  const [fees, setFees] = useState<
    FeeRecord[]
  >([]);

  const [attendance, setAttendance] = useState<
    AttendanceRecord[]
  >([]);

  const [inquiries, setInquiries] = useState<
    InquiryRecord[]
  >([]);

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    const loadData = () => {
      setStudents(
        getCollection<StudentRecord>(
          "students",
        ),
      );

      setFees(
        getCollection<FeeRecord>("fees"),
      );

      setAttendance(
        getCollection<AttendanceRecord>(
          "attendance",
        ),
      );

      setInquiries(
        getCollection<InquiryRecord>(
          "inquiries",
        ),
      );

      setHydrated(true);
    };

    loadData();

    return subscribeToStore(() => {
      loadData();
    });
  }, []);

  const activities = useMemo(() => {
    const items: ActivityItem[] = [];

    /*
     * 1. Student registrations
     */
    students.forEach((student, index) => {
      const name =
        student.name?.trim() ||
        "New student";

      const course =
        student.course?.trim();

      const timestamp = getTimestamp(
        student.createdAt,
        student.updatedAt,
      );

      if (timestamp > 0) {
        items.push({
          id: `student-${student.id ?? index}`,
          icon: UserPlus,
          title: "New student registered",
          description: course
            ? `${name} joined ${course}`
            : `${name} was added to the institute`,
          timestamp,
          time: formatRelativeTime(timestamp),
        });
      }
    });

    /*
     * 2. Fee payments
     *
     * This supports both the fee collection
     * and student-level payment fields.
     */
    fees.forEach((payment, index) => {
      const studentName =
        payment.studentName?.trim() ||
        "Student";

      const amount =
        payment.amount ??
        payment.paidAmount ??
        payment.paidFees;

      const timestamp = getTimestamp(
        payment.paymentDate,
        payment.date,
        payment.createdAt,
        payment.updatedAt,
      );

      if (timestamp > 0) {
        items.push({
          id: `fee-${payment.id ?? index}`,
          icon: CreditCard,
          title: "Fee payment received",
          description: `${formatCurrency(
            amount,
          )} from ${studentName}`,
          timestamp,
          time: formatRelativeTime(timestamp),
        });
      }
    });

    /*
     * 3. Attendance activity
     *
     * Grouping prevents a large attendance
     * register from filling the activity feed.
     */
    const attendanceByDate =
      new Map<string, AttendanceRecord[]>();

    attendance.forEach((record) => {
      const date = record.date;

      if (!date) return;

      const existing =
        attendanceByDate.get(date) ?? [];

      existing.push(record);

      attendanceByDate.set(
        date,
        existing,
      );
    });

    attendanceByDate.forEach(
      (records, date) => {
        const timestamp = getTimestamp(
          date,
        );

        if (timestamp > 0) {
          const present = records.filter(
            (record) =>
              record.status ===
                "Present" ||
              record.status === "Late",
          ).length;

          const batchNames = Array.from(
            new Set(
              records
                .map((record) =>
                  record.batch?.trim(),
                )
                .filter(Boolean),
            ),
          );

          let description = `${records.length} attendance record${
            records.length !== 1
              ? "s"
              : ""
          } marked`;

          if (batchNames.length > 0) {
            description = `${batchNames[0]} attendance marked`;
          }

          if (present > 0) {
            description += ` · ${present} present`;
          }

          items.push({
            id: `attendance-${date}`,
            icon: ClipboardCheck,
            title: "Attendance completed",
            description,
            timestamp,
            time: formatRelativeTime(
              timestamp,
            ),
          });
        }
      },
    );

    /*
     * 4. New inquiries
     */
    inquiries.forEach((inquiry, index) => {
      const name =
        inquiry.name?.trim() ||
        inquiry.studentName?.trim() ||
        inquiry.parentName?.trim() ||
        "New inquiry";

      const course =
        inquiry.course?.trim();

      const timestamp = getTimestamp(
        inquiry.createdAt,
        inquiry.updatedAt,
        inquiry.date,
      );

      if (timestamp > 0) {
        items.push({
          id: `inquiry-${inquiry.id ?? index}`,
          icon: MessageSquare,
          title: "New inquiry received",
          description: course
            ? `${name} · ${course}`
            : `${name} submitted an inquiry`,
          timestamp,
          time: formatRelativeTime(timestamp),
        });
      }
    });

    return items
      .sort(
        (a, b) =>
          b.timestamp - a.timestamp,
      )
      .slice(0, 6);
  }, [
    students,
    fees,
    attendance,
    inquiries,
  ]);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div>
              <div className="h-5 w-36 rounded bg-slate-200" />
              <div className="mt-2 h-4 w-56 rounded bg-slate-100" />
            </div>

            <div className="h-10 w-10 rounded-xl bg-slate-100" />
          </div>

          <div className="mt-7 space-y-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex gap-4"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-100" />

                <div className="flex-1">
                  <div className="h-4 w-40 rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-56 rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Activity
            </h2>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
              Live
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Latest activity across your institute
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Activity size={19} />
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
            <Clock3 size={20} />
          </div>

          <p className="mt-3 text-sm font-bold text-slate-700">
            No recent activity
          </p>

          <p className="mt-1 max-w-xs text-xs font-medium text-slate-400">
            New students, payments, attendance,
            and inquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="group flex gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-100">
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">
                    {activity.title}
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-slate-500">
                    {activity.description}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activities.length > 0 && (
        <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
          <Activity
            size={14}
            className="text-slate-400"
          />

          <p className="text-xs font-semibold text-slate-400">
            Showing the latest {activities.length}{" "}
            activities
          </p>
        </div>
      )}
    </div>
  );
}
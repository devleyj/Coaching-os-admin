"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

import {
  getCollection,
  subscribeToStore,
} from "../data/store";

type AttendanceStatus =
  | "Present"
  | "Absent"
  | "Late"
  | "Leave";

type AttendanceRecord = {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  batch: string;
  date: string;
  checkIn: string;
  status: AttendanceStatus;
  method:
    | "Face Scan"
    | "Card Tap"
    | "Fingerprint"
    | "Manual";
  remarks: string;
  whatsappSent: boolean;
};

type Student = {
  id: string;
  name: string;
  course: string;
  batch: string;
};

const getToday = () => {
  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
};

const formatDate = (value: string) => {
  if (!value) return "—";

  return new Date(`${value}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
};

export default function AttendanceOverview() {
  const [attendance, setAttendance] = useState<
    AttendanceRecord[]
  >([]);

  const [students, setStudents] = useState<Student[]>([]);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const storedAttendance =
        getCollection<AttendanceRecord>("attendance");

      const storedStudents =
        getCollection<Student>("students");

      setAttendance(storedAttendance);
      setStudents(storedStudents);
      setHydrated(true);
    };

    loadData();

    return subscribeToStore(() => {
      loadData();
    });
  }, []);

  const today = getToday();

  /*
   * Prefer today's attendance.
   *
   * If today's attendance hasn't been recorded yet,
   * use the latest recorded attendance date so the
   * component doesn't look broken/empty during setup.
   */
  const overviewDate = useMemo(() => {
    if (attendance.some((item) => item.date === today)) {
      return today;
    }

    const latestDate = attendance
      .map((item) => item.date)
      .filter(Boolean)
      .sort()
      .at(-1);

    return latestDate || today;
  }, [attendance, today]);

  const stats = useMemo(() => {
    const records = attendance.filter(
      (item) => item.date === overviewDate,
    );

    const totalStudents =
      students.length > 0
        ? students.length
        : records.length;

    const present = records.filter(
      (item) => item.status === "Present",
    ).length;

    const absent = records.filter(
      (item) => item.status === "Absent",
    ).length;

    const late = records.filter(
      (item) => item.status === "Late",
    ).length;

    const leave = records.filter(
      (item) => item.status === "Leave",
    ).length;

    /*
     * Late students are considered attended.
     * Leave is not counted as attendance.
     */
    const attended = present + late;

    const attendanceRate =
      totalStudents > 0
        ? Math.round((attended / totalStudents) * 100)
        : 0;

    const marked =
      present + absent + late + leave;

    const unmarked = Math.max(
      totalStudents - marked,
      0,
    );

    return {
      totalStudents,
      present,
      absent,
      late,
      leave,
      attended,
      attendanceRate,
      marked,
      unmarked,
      recordsCount: records.length,
    };
  }, [attendance, students, overviewDate]);

  const statusMessage = useMemo(() => {
    if (stats.attendanceRate >= 90) {
      return "Excellent attendance today.";
    }

    if (stats.attendanceRate >= 75) {
      return "Attendance is within a healthy range.";
    }

    if (stats.attendanceRate > 0) {
      return "Attendance needs attention today.";
    }

    return "No attendance has been recorded yet.";
  }, [stats.attendanceRate]);

  const rateLabel = useMemo(() => {
    if (stats.attendanceRate >= 90) {
      return "Excellent";
    }

    if (stats.attendanceRate >= 75) {
      return "Good";
    }

    if (stats.attendanceRate > 0) {
      return "Needs attention";
    }

    return "No data";
  }, [stats.attendanceRate]);

  if (!hydrated) {
    return (
      <div className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="mt-2 h-4 w-52 rounded bg-slate-100" />
            </div>

            <div className="h-12 w-12 rounded-2xl bg-slate-100" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4">
            <div className="h-20 rounded-xl bg-slate-100" />
            <div className="h-20 rounded-xl bg-slate-100" />
          </div>

          <div className="mt-5 h-3 rounded-full bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Attendance Overview
            </h2>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
              Live
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {overviewDate === today
              ? "Today's student attendance"
              : "Latest recorded attendance"}
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-400">
            {formatDate(overviewDate)}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={24} />
        </div>
      </div>

      {/* Main attendance rate */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Attendance Rate
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                {stats.attendanceRate}%
              </span>

              <span
                className={`text-xs font-bold ${
                  stats.attendanceRate >= 90
                    ? "text-emerald-600"
                    : stats.attendanceRate >= 75
                      ? "text-blue-600"
                      : stats.attendanceRate > 0
                        ? "text-amber-600"
                        : "text-slate-400"
                }`}
              >
                {rateLabel}
              </span>
            </div>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {statusMessage}
            </p>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold text-slate-400">
              Marked
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {stats.marked}/{stats.totalStudents}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                stats.attendanceRate >= 90
                  ? "bg-emerald-500"
                  : stats.attendanceRate >= 75
                    ? "bg-blue-500"
                    : stats.attendanceRate > 0
                      ? "bg-amber-500"
                      : "bg-slate-300"
              }`}
              style={{
                width: `${Math.min(
                  stats.attendanceRate,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {/* Present */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <UserCheck size={16} />
            </div>

            <span className="text-xs font-bold text-slate-500">
              Present
            </span>
          </div>

          <p className="mt-2 text-xl font-extrabold text-emerald-700">
            {stats.present}
          </p>
        </div>

        {/* Absent */}
        <div className="rounded-xl border border-red-100 bg-red-50/60 p-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <UserX size={16} />
            </div>

            <span className="text-xs font-bold text-slate-500">
              Absent
            </span>
          </div>

          <p className="mt-2 text-xl font-extrabold text-red-700">
            {stats.absent}
          </p>
        </div>

        {/* Late */}
        <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Clock3 size={16} />
            </div>

            <span className="text-xs font-bold text-slate-500">
              Late
            </span>
          </div>

          <p className="mt-2 text-xl font-extrabold text-amber-700">
            {stats.late}
          </p>
        </div>

        {/* Leave */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Users size={16} />
            </div>

            <span className="text-xs font-bold text-slate-500">
              Leave
            </span>
          </div>

          <p className="mt-2 text-xl font-extrabold text-blue-700">
            {stats.leave}
          </p>
        </div>
      </div>

      {/* Bottom status */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          {stats.unmarked > 0 ? (
            <>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <AlertTriangle size={15} />
              </div>

              <p className="truncate text-xs font-semibold text-slate-600">
                {stats.unmarked} student
                {stats.unmarked !== 1 ? "s" : ""} still unmarked
              </p>
            </>
          ) : (
            <>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={15} />
              </div>

              <p className="truncate text-xs font-semibold text-slate-600">
                All students have attendance status
              </p>
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-slate-400">
          <BarChart3 size={14} />
          {stats.recordsCount} records
        </div>
      </div>
    </div>
  );
}
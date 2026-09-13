"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  MapPin,
  User,
  CalendarDays,
} from "lucide-react";

import {
  getCollection,
  subscribeToStore,
} from "../data/store";

type ScheduleRecord = {
  id?: string;
  title?: string;
  subject?: string;
  course?: string;
  batch?: string;
  batchId?: string;
  teacher?: string;
  teacherId?: string;
  room?: string;
  location?: string;
  date?: string;
  time?: string;
  startTime?: string;
  status?: string;
};

type BatchRecord = {
  id?: string;
  name?: string;
  batchName?: string;
};

type TeacherRecord = {
  id?: string;
  name?: string;
};

type TodayClass = {
  id: string;
  subject: string;
  batch: string;
  teacher: string;
  room: string;
  time: string;
};

function getTodayKey() {
  const now = new Date();

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1,
  ).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
}

function normalizeDate(value?: string) {
  if (!value) return null;

  const directMatch = value.match(
    /^(\d{4})-(\d{1,2})-(\d{1,2})/,
  );

  if (directMatch) {
    return `${directMatch[1]}-${String(
      Number(directMatch[2]),
    ).padStart(2, "0")}-${String(
      Number(directMatch[3]),
    ).padStart(2, "0")}`;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return `${parsed.getFullYear()}-${String(
    parsed.getMonth() + 1,
  ).padStart(2, "0")}-${String(
    parsed.getDate(),
  ).padStart(2, "0")}`;
}

function formatTime(value?: string) {
  if (!value) return "Time not set";

  const trimmed = value.trim();

  /*
   * Already formatted time such as:
   * 09:00 AM
   * 5:30 PM
   */
  if (/[AP]M$/i.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(
    /^(\d{1,2}):(\d{2})$/,
  );

  if (!match) {
    return trimmed;
  }

  let hours = Number(match[1]);
  const minutes = match[2];

  const suffix = hours >= 12 ? "PM" : "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  return `${String(hours).padStart(
    2,
    "0",
  )}:${minutes} ${suffix}`;
}

function getBatchName(
  schedule: ScheduleRecord,
  batches: BatchRecord[],
) {
  if (schedule.batch) {
    return schedule.batch;
  }

  if (schedule.batchId) {
    const batch = batches.find(
      (item) => item.id === schedule.batchId,
    );

    return (
      batch?.name ||
      batch?.batchName ||
      "Batch not assigned"
    );
  }

  return "Batch not assigned";
}

function getTeacherName(
  schedule: ScheduleRecord,
  teachers: TeacherRecord[],
) {
  if (schedule.teacher) {
    return schedule.teacher;
  }

  if (schedule.teacherId) {
    const teacher = teachers.find(
      (item) => item.id === schedule.teacherId,
    );

    return teacher?.name || "Teacher not assigned";
  }

  return "Teacher not assigned";
}

function buildTodayClasses(
  schedules: ScheduleRecord[],
  batches: BatchRecord[],
  teachers: TeacherRecord[],
): TodayClass[] {
  const today = getTodayKey();

  return schedules
    .filter((schedule) => {
      const scheduleDate = normalizeDate(
        schedule.date,
      );

      return scheduleDate === today;
    })
    .filter((schedule) => {
      const status = String(
        schedule.status ?? "",
      ).toLowerCase();

      return (
        status !== "cancelled" &&
        status !== "canceled"
      );
    })
    .map((schedule, index) => ({
      id:
        schedule.id ||
        `today-class-${index}`,
      subject:
        schedule.subject ||
        schedule.title ||
        schedule.course ||
        "Class",
      batch: getBatchName(schedule, batches),
      teacher: getTeacherName(
        schedule,
        teachers,
      ),
      room:
        schedule.room ||
        schedule.location ||
        "Room not assigned",
      time: formatTime(
        schedule.time ||
          schedule.startTime,
      ),
    }))
    .sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
}

export default function TodaysClasses() {
  const [schedules, setSchedules] = useState<
    ScheduleRecord[]
  >([]);

  const [batches, setBatches] = useState<
    BatchRecord[]
  >([]);

  const [teachers, setTeachers] = useState<
    TeacherRecord[]
  >([]);

  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setSchedules(
      getCollection<ScheduleRecord>("schedule"),
    );

    setBatches(
      getCollection<BatchRecord>("batches"),
    );

    setTeachers(
      getCollection<TeacherRecord>("teachers"),
    );

    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const unsubscribe = subscribeToStore(() => {
      loadData();
    });

    return unsubscribe;
  }, []);

  const todayClasses = useMemo(
    () =>
      buildTodayClasses(
        schedules,
        batches,
        teachers,
      ),
    [schedules, batches, teachers],
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {/* HEADER */}

      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Today&apos;s Classes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Scheduled classes for today
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CalendarDays size={18} />
        </div>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl border border-slate-100 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="h-3 w-20 rounded bg-slate-100" />
                </div>

                <div className="h-4 w-20 rounded bg-slate-100" />
              </div>

              <div className="mt-3 flex gap-3">
                <div className="h-3 w-24 rounded bg-slate-100" />
                <div className="h-3 w-20 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : todayClasses.length === 0 ? (
        /* EMPTY STATE */

        <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-5">
          <div className="max-w-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
              <CalendarDays size={20} />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-700">
              No classes scheduled today
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Classes added to the Schedule module for
              today will automatically appear here.
            </p>
          </div>
        </div>
      ) : (
        /* CLASS LIST */

        <div className="space-y-2.5">
          {todayClasses.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border border-slate-100 p-3.5 transition-all duration-200 hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-sm sm:p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                {/* SUBJECT + BATCH */}

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-[15px]">
                    {item.subject}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {item.batch}
                  </p>
                </div>

                {/* TIME */}

                <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 group-hover:bg-white">
                  <Clock
                    size={14}
                    className="text-blue-500"
                  />

                  {item.time}
                </div>
              </div>

              {/* DETAILS */}

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="flex min-w-0 items-center gap-1.5">
                  <User
                    size={14}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate">
                    {item.teacher}
                  </span>
                </span>

                <span className="flex min-w-0 items-center gap-1.5">
                  <MapPin
                    size={14}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate">
                    {item.room}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
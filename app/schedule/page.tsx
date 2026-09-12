"use client";

import { useEffect, useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import PageHeader from "../components/PageHeader";
import { batches as fallbackBatches } from "../data/batches";
import { getCollection, setCollection, subscribeToStore } from "../data/store";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Eye,
  Filter,
  GraduationCap,
  MapPin,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";

type ScheduleStatus =
  | "Scheduled"
  | "Live"
  | "Completed"
  | "Cancelled";

type ScheduleType = "Regular" | "Extra Class" | "Test" | "Doubt Session";

type ViewMode = "Day" | "Week" | "Month";

type Schedule = {
  id: string;
  batch: string;
  course: string;
  teacher: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  status: ScheduleStatus;
  type: ScheduleType;
  recurring: boolean;
  days: string[];
  capacity: number;
  enrolled: number;
  notes: string;
};

const initialSchedules: Schedule[] = [
  {
    id: "SCH-1001",
    batch: "JEE Advanced Morning",
    course: "JEE Advanced",
    teacher: "Rahul Mehta",
    date: "2026-09-07",
    startTime: "07:00",
    endTime: "10:00",
    room: "Room 101",
    status: "Scheduled",
    type: "Regular",
    recurring: true,
    days: ["Mon", "Wed", "Fri"],
    capacity: 50,
    enrolled: 42,
    notes: "Physics and advanced problem solving.",
  },
  {
    id: "SCH-1002",
    batch: "NEET Evening",
    course: "NEET",
    teacher: "Priya Sharma",
    date: "2026-09-07",
    startTime: "17:00",
    endTime: "20:00",
    room: "Room 202",
    status: "Scheduled",
    type: "Regular",
    recurring: true,
    days: ["Mon", "Tue", "Thu"],
    capacity: 60,
    enrolled: 54,
    notes: "Biology and NCERT revision.",
  },
  {
    id: "SCH-1003",
    batch: "JEE Main Evening",
    course: "JEE Main",
    teacher: "Amit Verma",
    date: "2026-09-08",
    startTime: "16:00",
    endTime: "18:00",
    room: "Room 103",
    status: "Scheduled",
    type: "Regular",
    recurring: true,
    days: ["Tue", "Thu", "Sat"],
    capacity: 45,
    enrolled: 38,
    notes: "Mathematics practice session.",
  },
  {
    id: "SCH-1004",
    batch: "NEET Biology",
    course: "NEET",
    teacher: "Sneha Kapoor",
    date: "2026-09-08",
    startTime: "10:00",
    endTime: "12:00",
    room: "Room 201",
    status: "Completed",
    type: "Regular",
    recurring: false,
    days: [],
    capacity: 55,
    enrolled: 49,
    notes: "Human physiology revision.",
  },
  {
    id: "SCH-1005",
    batch: "Foundation 10th",
    course: "Foundation",
    teacher: "Rohit Sharma",
    date: "2026-09-09",
    startTime: "15:00",
    endTime: "17:00",
    room: "Room 104",
    status: "Scheduled",
    type: "Doubt Session",
    recurring: false,
    days: [],
    capacity: 35,
    enrolled: 28,
    notes: "Doubt clearing and homework support.",
  },
  {
    id: "SCH-1006",
    batch: "JEE Advanced Test",
    course: "JEE Advanced",
    teacher: "Vikas Jain",
    date: "2026-09-10",
    startTime: "09:00",
    endTime: "12:00",
    room: "Test Hall",
    status: "Scheduled",
    type: "Test",
    recurring: false,
    days: [],
    capacity: 100,
    enrolled: 86,
    notes: "Full-length JEE Advanced mock test.",
  },
  {
    id: "SCH-1007",
    batch: "NEET Weekend",
    course: "NEET",
    teacher: "Priya Sharma",
    date: "2026-09-12",
    startTime: "09:00",
    endTime: "12:00",
    room: "Room 202",
    status: "Scheduled",
    type: "Extra Class",
    recurring: false,
    days: [],
    capacity: 60,
    enrolled: 52,
    notes: "Extra revision class before examination.",
  },
  {
    id: "SCH-1008",
    batch: "JEE Main Morning",
    course: "JEE Main",
    teacher: "Rahul Mehta",
    date: "2026-09-11",
    startTime: "07:30",
    endTime: "09:30",
    room: "Room 101",
    status: "Cancelled",
    type: "Regular",
    recurring: false,
    days: [],
    capacity: 50,
    enrolled: 41,
    notes: "Class cancelled due to faculty availability.",
  },
];

const weekDays = [
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
  { short: "Sun", full: "Sunday" },
];

const emptyForm = {
  batch: "",
  course: "",
  teacher: "",
  date: "",
  startTime: "",
  endTime: "",
  room: "",
  status: "Scheduled" as ScheduleStatus,
  type: "Regular" as ScheduleType,
  recurring: false,
  days: [] as string[],
  capacity: "50",
  enrolled: "0",
  notes: "",
};

function formatDate(date: string) {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  const hour = Number(hours);

  if (Number.isNaN(hour)) return time;

  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${String(formattedHour).padStart(2, "0")}:${minutes} ${suffix}`;
}

function getScheduleDuration(start: string, end: string) {
  if (!start || !end) return 0;

  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  return endHour * 60 + endMinute - (startHour * 60 + startMinute);
}

function getStatusClass(status: ScheduleStatus) {
  switch (status) {
    case "Scheduled":
      return "bg-blue-100 text-blue-700";
    case "Live":
      return "bg-emerald-100 text-emerald-700";
    case "Completed":
      return "bg-slate-100 text-slate-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [availableBatches, setAvailableBatches] = useState(fallbackBatches);

  useEffect(() => {
    const storedSchedules = getCollection<Schedule>("schedule");
    const storedBatches = getCollection<typeof fallbackBatches[number]>("batches");

    if (storedSchedules.length > 0) {
      setSchedules(storedSchedules);
    } else {
      setCollection("schedule", initialSchedules);
      setSchedules(initialSchedules);
    }

    if (storedBatches.length > 0) {
      setAvailableBatches(storedBatches);
    } else {
      setCollection("batches", fallbackBatches);
      setAvailableBatches(fallbackBatches);
    }

    const unsubscribe = subscribeToStore(() => {
      const nextSchedules = getCollection<Schedule>("schedule");
      const nextBatches = getCollection<typeof fallbackBatches[number]>("batches");

      setSchedules((current) =>
        JSON.stringify(current) === JSON.stringify(nextSchedules)
          ? current
          : nextSchedules,
      );

      setAvailableBatches((current) =>
        JSON.stringify(current) === JSON.stringify(nextBatches)
          ? current
          : nextBatches,
      );
    });

    return unsubscribe;
  }, []);

  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [selectedSchedule, setSelectedSchedule] =
    useState<Schedule | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [teacherFilter, setTeacherFilter] = useState("All");
  const [roomFilter, setRoomFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [viewMode, setViewMode] = useState<ViewMode>("Day");
  const [selectedDate, setSelectedDate] = useState("2026-09-07");

  const [sortField, setSortField] = useState<
    "date" | "startTime" | "batch" | "teacher"
  >("startTime");

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [showFilters, setShowFilters] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const teachers = useMemo(
    () =>
      Array.from(
        new Set([
          ...availableBatches.map((batch) => batch.teacher),
          ...schedules.map((schedule) => schedule.teacher),
        ]),
      ).filter(Boolean),
    [availableBatches, schedules],
  );

  const rooms = useMemo(
    () => Array.from(new Set(schedules.map((schedule) => schedule.room))),
    [schedules],
  );

  const courses = useMemo(
    () =>
      Array.from(
        new Set([
          ...availableBatches.map((batch) => batch.course),
          ...schedules.map((schedule) => schedule.course),
        ]),
      ).filter(Boolean),
    [availableBatches, schedules],
  );

  const batches = useMemo(
    () =>
      Array.from(
        new Set([
          ...availableBatches.map((batch) => batch.name),
          ...schedules.map((schedule) => schedule.batch),
        ]),
      ).filter(Boolean),
    [availableBatches, schedules],
  );

  const filteredSchedules = useMemo(() => {
    const filtered = schedules.filter((schedule) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        schedule.id.toLowerCase().includes(searchValue) ||
        schedule.batch.toLowerCase().includes(searchValue) ||
        schedule.course.toLowerCase().includes(searchValue) ||
        schedule.teacher.toLowerCase().includes(searchValue) ||
        schedule.room.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || schedule.status === statusFilter;

      const matchesTeacher =
        teacherFilter === "All" || schedule.teacher === teacherFilter;

      const matchesRoom =
        roomFilter === "All" || schedule.room === roomFilter;

      const matchesType =
        typeFilter === "All" || schedule.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTeacher &&
        matchesRoom &&
        matchesType
      );
    });

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortField === "date") {
        comparison = a.date.localeCompare(b.date);
      }

      if (sortField === "startTime") {
        comparison = a.startTime.localeCompare(b.startTime);
      }

      if (sortField === "batch") {
        comparison = a.batch.localeCompare(b.batch);
      }

      if (sortField === "teacher") {
        comparison = a.teacher.localeCompare(b.teacher);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [
    schedules,
    search,
    statusFilter,
    teacherFilter,
    roomFilter,
    typeFilter,
    sortField,
    sortDirection,
  ]);

  const daySchedules = useMemo(() => {
    return filteredSchedules.filter((schedule) => schedule.date === selectedDate);
  }, [filteredSchedules, selectedDate]);

  const stats = useMemo(() => {
    const todaySchedules = schedules.filter(
      (schedule) => schedule.date === selectedDate,
    );

    const active = schedules.filter(
      (schedule) =>
        schedule.status === "Scheduled" || schedule.status === "Live",
    ).length;

    const roomsToday = new Set(
      todaySchedules
        .filter((schedule) => schedule.status !== "Cancelled")
        .map((schedule) => schedule.room),
    ).size;

    const totalStudents = todaySchedules.reduce(
      (sum, schedule) => sum + schedule.enrolled,
      0,
    );

    const conflicts = findConflicts(schedules).length;

    return {
      today: todaySchedules.length,
      active,
      roomsToday,
      students: totalStudents,
      conflicts,
    };
  }, [schedules, selectedDate]);

  const conflicts = useMemo(() => findConflicts(schedules), [schedules]);

  function findConflicts(items: Schedule[]) {
    const results: {
      first: Schedule;
      second: Schedule;
      reason: string;
    }[] = [];

    for (let i = 0; i < items.length; i += 1) {
      for (let j = i + 1; j < items.length; j += 1) {
        const first = items[i];
        const second = items[j];

        if (
          first.date !== second.date ||
          first.status === "Cancelled" ||
          second.status === "Cancelled"
        ) {
          continue;
        }

        const firstStart = first.startTime;
        const firstEnd = first.endTime;
        const secondStart = second.startTime;
        const secondEnd = second.endTime;

        const overlap =
          firstStart < secondEnd && secondStart < firstEnd;

        if (!overlap) continue;

        if (first.teacher === second.teacher) {
          results.push({
            first,
            second,
            reason: `Teacher conflict: ${first.teacher}`,
          });
        } else if (first.room === second.room) {
          results.push({
            first,
            second,
            reason: `Room conflict: ${first.room}`,
          });
        }
      }
    }

    return results;
  }

  const resetForm = () => {
    setForm(emptyForm);
    setFormError("");
  };

  const applyBatchDetails = (batchName: string) => {
    const selectedBatch = availableBatches.find(
      (batch) => batch.name.trim().toLowerCase() === batchName.trim().toLowerCase(),
    );

    setForm((current) => ({
      ...current,
      batch: batchName,
      course: selectedBatch?.course ?? current.course,
      teacher: selectedBatch?.teacher ?? current.teacher,
      capacity:
        selectedBatch && Number.isFinite(selectedBatch.capacity)
          ? String(selectedBatch.capacity)
          : current.capacity,
      enrolled:
        selectedBatch && Number.isFinite(selectedBatch.students)
          ? String(selectedBatch.students)
          : current.enrolled,
    }));
  };

  const openAddModal = () => {
    resetForm();
    setShowAddSchedule(true);
  };

  const validateForm = () => {
    if (!form.batch.trim()) {
      return "Batch is required.";
    }

    if (!form.course.trim()) {
      return "Course is required.";
    }

    if (!form.teacher.trim()) {
      return "Teacher is required.";
    }

    if (!form.date) {
      return "Date is required.";
    }

    if (!form.startTime) {
      return "Start time is required.";
    }

    if (!form.endTime) {
      return "End time is required.";
    }

    if (form.endTime <= form.startTime) {
      return "End time must be later than start time.";
    }

    if (!form.room.trim()) {
      return "Room is required.";
    }

    const capacity = Number(form.capacity);
    const enrolled = Number(form.enrolled);

    if (!Number.isFinite(capacity) || capacity <= 0) {
      return "Capacity must be greater than 0.";
    }

    if (!Number.isFinite(enrolled) || enrolled < 0) {
      return "Enrolled students cannot be negative.";
    }

    if (enrolled > capacity) {
      return "Enrolled students cannot exceed capacity.";
    }

    return "";
  };

  const hasFormConflict = (
    ignoreId?: string,
  ) => {
    return schedules.some((schedule) => {
      if (schedule.id === ignoreId) return false;

      if (schedule.date !== form.date) return false;

      if (
        schedule.status === "Cancelled" ||
        form.status === "Cancelled"
      ) {
        return false;
      }

      const overlap =
        form.startTime < schedule.endTime &&
        schedule.startTime < form.endTime;

      if (!overlap) return false;

      return (
        schedule.teacher.trim().toLowerCase() ===
          form.teacher.trim().toLowerCase() ||
        schedule.room.trim().toLowerCase() ===
          form.room.trim().toLowerCase()
      );
    });
  };

  const generateScheduleId = () => {
    const numbers = schedules
      .map((schedule) => Number(schedule.id.replace("SCH-", "")))
      .filter((number) => Number.isFinite(number));

    const nextNumber = numbers.length ? Math.max(...numbers) + 1 : 1001;

    return `SCH-${nextNumber}`;
  };

  const handleSaveSchedule = () => {
    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (hasFormConflict()) {
      setFormError(
        "Schedule conflict detected. The selected teacher or room is already occupied during this time.",
      );
      return;
    }

    const newSchedule: Schedule = {
      id: generateScheduleId(),
      batch: form.batch.trim(),
      course: form.course.trim(),
      teacher: form.teacher.trim(),
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      room: form.room.trim(),
      status: form.status,
      type: form.type,
      recurring: form.recurring,
      days: form.days,
      capacity: Number(form.capacity),
      enrolled: Number(form.enrolled),
      notes: form.notes.trim(),
    };

    const nextSchedules = [...schedules, newSchedule];
    setSchedules(nextSchedules);
    setCollection("schedule", nextSchedules);
    setSelectedDate(form.date);

    resetForm();
    setShowAddSchedule(false);

    showToast("Schedule created successfully.");
  };

  const openEditModal = (schedule: Schedule) => {
    setSelectedSchedule(schedule);

    setForm({
      batch: schedule.batch,
      course: schedule.course,
      teacher: schedule.teacher,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      room: schedule.room,
      status: schedule.status,
      type: schedule.type,
      recurring: schedule.recurring,
      days: schedule.days,
      capacity: String(schedule.capacity),
      enrolled: String(schedule.enrolled),
      notes: schedule.notes,
    });

    setFormError("");
    setOpenMenuId(null);
    setShowEditSchedule(true);
  };

  const handleEditSchedule = () => {
    if (!selectedSchedule) return;

    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (hasFormConflict(selectedSchedule.id)) {
      setFormError(
        "Schedule conflict detected. The selected teacher or room is already occupied during this time.",
      );
      return;
    }

    const nextSchedules = schedules.map((schedule) =>
      schedule.id === selectedSchedule.id
        ? {
            ...schedule,
            batch: form.batch.trim(),
            course: form.course.trim(),
            teacher: form.teacher.trim(),
            date: form.date,
            startTime: form.startTime,
            endTime: form.endTime,
            room: form.room.trim(),
            status: form.status,
            type: form.type,
            recurring: form.recurring,
            days: form.days,
            capacity: Number(form.capacity),
            enrolled: Number(form.enrolled),
            notes: form.notes.trim(),
          }
        : schedule,
    );

    setSchedules(nextSchedules);
    setCollection("schedule", nextSchedules);

    setSelectedSchedule(null);
    setShowEditSchedule(false);
    resetForm();

    showToast("Schedule updated successfully.");
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?",
    );

    if (!confirmed) return;

    const nextSchedules = schedules.filter(
      (schedule) => schedule.id !== scheduleId,
    );

    setSchedules(nextSchedules);
    setCollection("schedule", nextSchedules);

    if (selectedSchedule?.id === scheduleId) {
      setSelectedSchedule(null);
    }

    setOpenMenuId(null);

    showToast("Schedule deleted.");
  };

  const handleToggleSort = (
    field: "date" | "startTime" | "batch" | "teacher",
  ) => {
    if (sortField === field) {
      setSortDirection((current) =>
        current === "asc" ? "desc" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTeacherFilter("All");
    setRoomFilter("All");
    setTypeFilter("All");
  };

  const changeDate = (direction: number) => {
    const date = new Date(`${selectedDate}T00:00:00`);
    date.setDate(date.getDate() + direction);

    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const toggleDay = (day: string) => {
    setForm((current) => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter((item) => item !== day)
        : [...current.days, day],
    }));
  };

  const selectedDateLabel = formatDate(selectedDate);

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Toast */}
        {toast && (
          <div className="fixed right-6 top-6 z-[100] flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-xl">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            {toast}
          </div>
        )}

        {/* Header */}
        <PageHeader
  title="Schedule"
  description="Manage classes, timings, teachers, rooms and recurring sessions."
  icon={<CalendarDays size={20} />}
  actions={
    <>
      <button
        type="button"
        onClick={() => {
          setSelectedDate("2026-09-07");
          showToast("Schedule view refreshed.");
        }}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        <RefreshCw size={16} />
        Refresh
      </button>

      <button
        type="button"
        onClick={openAddModal}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        <Plus size={17} />
        Add Schedule
      </button>
    </>
  }
/>

        {/* KPI Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Today&apos;s Classes
              </p>
              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {stats.today}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              For {selectedDateLabel}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Active Schedules
              </p>
              <Clock3 className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {stats.active}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Scheduled or live
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Rooms Used
              </p>
              <MapPin className="h-5 w-5 text-violet-600" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {stats.roomsToday}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              On selected date
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Students Scheduled
              </p>
              <Users className="h-5 w-5 text-amber-600" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {stats.students}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Across selected date
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Conflicts
              </p>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {stats.conflicts}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Teacher / room overlaps
            </p>
          </div>
        </div>

        {/* AI Command Center */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-violet-50 p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    AI Schedule Command Center
                  </h2>

                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                    AI Ready
                  </span>
                </div>

                <p className="mt-1 max-w-3xl text-sm text-slate-600">
                  Future AI automation can detect timetable conflicts, optimize
                  room utilization, recommend teacher allocation and predict
                  overloaded class slots.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">
                {conflicts.length > 0
                  ? `${conflicts.length} conflict(s) need attention`
                  : "No scheduling conflicts detected"}
              </span>
            </div>
          </div>
        </div>

        {/* Date + View Controls */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => changeDate(-1)}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
                aria-label="Previous day"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="min-w-[180px] text-center">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Selected Date
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {selectedDateLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={() => changeDate(1)}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
                aria-label="Next day"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedDate("2026-09-07")}
                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100"
              >
                Today
              </button>

              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
              {(["Day", "Week", "Month"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    viewMode === mode
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search batch, teacher, course, room or schedule ID..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                showFilters
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Clear Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Live">Live</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Teacher
                </label>

                <select
                  value={teacherFilter}
                  onChange={(event) => setTeacherFilter(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">All Teachers</option>
                  {teachers.map((teacher) => (
                    <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Room
                </label>

                <select
                  value={roomFilter}
                  onChange={(event) => setRoomFilter(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">All Rooms</option>
                  {rooms.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Class Type
                </label>

                <select
                  value={typeFilter}
                  onChange={(event) => setTypeFilter(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">All Types</option>
                  <option value="Regular">Regular</option>
                  <option value="Extra Class">Extra Class</option>
                  <option value="Test">Test</option>
                  <option value="Doubt Session">Doubt Session</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Schedule Content */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {viewMode} Schedule
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {viewMode === "Day"
                    ? `Classes scheduled for ${selectedDateLabel}.`
                    : "Use the filters and date controls to manage your timetable."}
                </p>
              </div>

              <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                {viewMode === "Day"
                  ? `${daySchedules.length} Classes`
                  : `${filteredSchedules.length} Results`}
              </div>
            </div>
          </div>

          {viewMode === "Day" ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <button
                        type="button"
                        onClick={() => handleToggleSort("startTime")}
                        className="inline-flex items-center gap-1"
                      >
                        Time
                        {sortField === "startTime" &&
                          (sortDirection === "asc" ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          ))}
                      </button>
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Batch
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Course
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Teacher
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Room
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Students
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Type
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {daySchedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="border-b border-slate-100 transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Clock3 className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {formatTime(schedule.startTime)}
                            </p>

                            <p className="text-xs text-slate-500">
                              {formatTime(schedule.endTime)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {schedule.batch}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {schedule.id}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        {schedule.course}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                            {schedule.teacher.charAt(0)}
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {schedule.teacher}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {schedule.room}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {schedule.enrolled}/{schedule.capacity}
                          </p>

                          <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-500"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (schedule.enrolled / schedule.capacity) *
                                    100,
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {schedule.type}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            schedule.status,
                          )}`}
                        >
                          {schedule.status}
                        </span>
                      </td>

                      <td className="relative px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((current) =>
                              current === schedule.id
                                ? null
                                : schedule.id,
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>

                        {openMenuId === schedule.id && (
                          <div className="absolute right-5 top-14 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedSchedule(schedule);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditModal(schedule)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit Schedule
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteSchedule(schedule.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {daySchedules.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <CalendarDays className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    No classes found
                  </h3>

                  <p className="mt-1 max-w-md text-sm text-slate-500">
                    There are no schedules matching the selected date and
                    filters.
                  </p>

                  <button
                    type="button"
                    onClick={openAddModal}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Schedule
                  </button>
                </div>
              )}
            </div>
          ) : viewMode === "Week" ? (
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
              {weekDays.map((day, index) => {
                const date = new Date(`${selectedDate}T00:00:00`);
                const currentDay = date.getDay();
                const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

                date.setDate(date.getDate() + mondayOffset + index);

                const dateString = date.toISOString().split("T")[0];

                const classes = filteredSchedules.filter(
                  (schedule) => schedule.date === dateString,
                );

                return (
                  <div
                    key={day.short}
                    className="min-h-[220px] rounded-2xl border border-slate-200 bg-slate-50/60 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          {day.short}
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {date.getDate()}{" "}
                          {date.toLocaleDateString("en-IN", {
                            month: "short",
                          })}
                        </p>
                      </div>

                      <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500">
                        {classes.length}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {classes.map((schedule) => (
                        <button
                          key={schedule.id}
                          type="button"
                          onClick={() => setSelectedSchedule(schedule)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
                        >
                          <p className="text-xs font-bold text-blue-600">
                            {formatTime(schedule.startTime)}
                          </p>

                          <p className="mt-1 line-clamp-2 text-sm font-bold text-slate-900">
                            {schedule.batch}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {schedule.teacher}
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-slate-500">
                              {schedule.room}
                            </span>

                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusClass(
                                schedule.status,
                              )}`}
                            >
                              {schedule.status}
                            </span>
                          </div>
                        </button>
                      ))}

                      {classes.length === 0 && (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-center text-xs text-slate-400">
                          No classes
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 12 }).map((_, index) => {
                const date = new Date(`${selectedDate}T00:00:00`);
                date.setDate(date.getDate() + index);

                const dateString = date.toISOString().split("T")[0];

                const classes = filteredSchedules.filter(
                  (schedule) => schedule.date === dateString,
                );

                return (
                  <div
                    key={dateString}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {date.toLocaleDateString("en-IN", {
                            weekday: "long",
                          })}
                        </p>

                        <p className="mt-1 text-base font-bold text-slate-900">
                          {formatDate(dateString)}
                        </p>
                      </div>

                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500">
                        {classes.length}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {classes.length > 0 ? (
                        classes.map((schedule) => (
                          <button
                            key={schedule.id}
                            type="button"
                            onClick={() => setSelectedSchedule(schedule)}
                            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-blue-200"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-blue-600">
                                {formatTime(schedule.startTime)}
                              </span>

                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusClass(
                                  schedule.status,
                                )}`}
                              >
                                {schedule.status}
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-slate-900">
                              {schedule.batch}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {schedule.teacher} · {schedule.room}
                            </p>
                          </button>
                        ))
                      ) : (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-center text-xs text-slate-400">
                          No classes
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Conflicts */}
        {conflicts.length > 0 && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-red-900">
                  Schedule Conflicts Detected
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  Review these overlapping schedules before connecting the
                  module to your production backend.
                </p>

                <div className="mt-4 space-y-3">
                  {conflicts.map((conflict, index) => (
                    <div
                      key={`${conflict.first.id}-${conflict.second.id}-${index}`}
                      className="rounded-xl border border-red-100 bg-white p-4"
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {conflict.reason}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        {conflict.first.id} ({formatTime(conflict.first.startTime)}{" "}
                        - {formatTime(conflict.first.endTime)}) overlaps with{" "}
                        {conflict.second.id} (
                        {formatTime(conflict.second.startTime)} -{" "}
                        {formatTime(conflict.second.endTime)}).
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Insights */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Most Used Teacher
                </h3>
                <p className="text-xs text-slate-500">
                  Based on current demo schedules
                </p>
              </div>
            </div>

            <p className="mt-5 text-lg font-bold text-slate-900">
              {teachers[0] ?? "No teacher data"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Teacher utilization analytics will become dynamic after backend
              integration.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Room Utilization
                </h3>
                <p className="text-xs text-slate-500">
                  Current classroom allocation
                </p>
              </div>
            </div>

            <p className="mt-5 text-lg font-bold text-slate-900">
              {stats.roomsToday} rooms
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Future optimization can automatically balance classroom usage.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Zap className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Schedule Recommendation
                </h3>
                <p className="text-xs text-slate-500">
                  AI-ready recommendation layer
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm font-bold text-slate-900">
              {stats.conflicts > 0
                ? "Resolve timetable conflicts first."
                : "Current timetable looks balanced."}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              AI recommendations will use real attendance, teacher and room
              utilization data later.
            </p>
          </div>
        </div>
      </main>

      {/* Add Schedule Modal */}
      {showAddSchedule && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add New Schedule
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a class schedule with teacher, room and timing details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAddSchedule(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ScheduleForm
              form={form}
              setForm={setForm}
              formError={formError}
              toggleDay={toggleDay}
              courses={courses}
              batches={batches}
              teachers={teachers}
              rooms={rooms}
              onBatchChange={applyBatchDetails}
            />

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddSchedule(false);
                  resetForm();
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveSchedule}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Schedule Modal */}
      {showEditSchedule && selectedSchedule && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Edit Schedule
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the class schedule information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowEditSchedule(false);
                  setSelectedSchedule(null);
                  resetForm();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ScheduleForm
              form={form}
              setForm={setForm}
              formError={formError}
              toggleDay={toggleDay}
              courses={courses}
              batches={batches}
              teachers={teachers}
              rooms={rooms}
              onBatchChange={applyBatchDetails}
            />

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-6">
              <button
                type="button"
                onClick={() => {
                  setShowEditSchedule(false);
                  setSelectedSchedule(null);
                  resetForm();
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleEditSchedule}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Details Modal */}
      {selectedSchedule && !showEditSchedule && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Schedule Details
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedSchedule.id}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSchedule(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    selectedSchedule.status,
                  )}`}
                >
                  {selectedSchedule.status}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {selectedSchedule.type}
                </span>

                {selectedSchedule.recurring && (
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                    Recurring
                  </span>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <DetailItem
                  label="Batch"
                  value={selectedSchedule.batch}
                />

                <DetailItem
                  label="Course"
                  value={selectedSchedule.course}
                />

                <DetailItem
                  label="Teacher"
                  value={selectedSchedule.teacher}
                />

                <DetailItem
                  label="Room"
                  value={selectedSchedule.room}
                />

                <DetailItem
                  label="Date"
                  value={formatDate(selectedSchedule.date)}
                />

                <DetailItem
                  label="Timing"
                  value={`${formatTime(
                    selectedSchedule.startTime,
                  )} - ${formatTime(selectedSchedule.endTime)}`}
                />

                <DetailItem
                  label="Duration"
                  value={`${getScheduleDuration(
                    selectedSchedule.startTime,
                    selectedSchedule.endTime,
                  )} minutes`}
                />

                <DetailItem
                  label="Students"
                  value={`${selectedSchedule.enrolled} / ${selectedSchedule.capacity}`}
                />

                {selectedSchedule.recurring && (
                  <div className="sm:col-span-2">
                    <DetailItem
                      label="Recurring Days"
                      value={selectedSchedule.days.join(", ")}
                    />
                  </div>
                )}

                <div className="sm:col-span-2">
                  <DetailItem
                    label="Notes"
                    value={
                      selectedSchedule.notes || "No additional notes."
                    }
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => openEditModal(selectedSchedule)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSchedule(null)}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function ScheduleForm({
  form,
  setForm,
  formError,
  toggleDay,
  courses,
  batches,
  teachers,
  rooms,
  onBatchChange,
}: {
  form: {
    batch: string;
    course: string;
    teacher: string;
    date: string;
    startTime: string;
    endTime: string;
    room: string;
    status: ScheduleStatus;
    type: ScheduleType;
    recurring: boolean;
    days: string[];
    capacity: string;
    enrolled: string;
    notes: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      batch: string;
      course: string;
      teacher: string;
      date: string;
      startTime: string;
      endTime: string;
      room: string;
      status: ScheduleStatus;
      type: ScheduleType;
      recurring: boolean;
      days: string[];
      capacity: string;
      enrolled: string;
      notes: string;
    }>
  >;
  formError: string;
  toggleDay: (day: string) => void;
  courses: string[];
  batches: string[];
  teachers: string[];
  rooms: string[];
  onBatchChange: (batchName: string) => void;
}) {
  return (
    <div className="p-6">
      {formError && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="font-medium">{formError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField label="Batch" required>
          <input
            list="schedule-batches"
            type="text"
            value={form.batch}
            onChange={(event) => onBatchChange(event.target.value)}
            placeholder="Enter batch name"
            className="form-input"
          />

          <datalist id="schedule-batches">
            {batches.map((batch) => (
              <option key={batch} value={batch} />
            ))}
          </datalist>
        </FormField>

        <FormField label="Course" required>
          <input
            list="schedule-courses"
            type="text"
            value={form.course}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                course: event.target.value,
              }))
            }
            placeholder="Enter course name"
            className="form-input"
          />

          <datalist id="schedule-courses">
            {courses.map((course) => (
              <option key={course} value={course} />
            ))}
          </datalist>
        </FormField>

        <FormField label="Teacher" required>
          <input
            list="schedule-teachers"
            type="text"
            value={form.teacher}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                teacher: event.target.value,
              }))
            }
            placeholder="Enter teacher name"
            className="form-input"
          />

          <datalist id="schedule-teachers">
            {teachers.map((teacher) => (
              <option key={teacher} value={teacher} />
            ))}
          </datalist>
        </FormField>

        <FormField label="Room / Classroom" required>
          <input
            list="schedule-rooms"
            type="text"
            value={form.room}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                room: event.target.value,
              }))
            }
            placeholder="Example: Room 101"
            className="form-input"
          />

          <datalist id="schedule-rooms">
            {rooms.map((room) => (
              <option key={room} value={room} />
            ))}
          </datalist>
        </FormField>

        <FormField label="Date" required>
          <input
            type="date"
            value={form.date}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                date: event.target.value,
              }))
            }
            className="form-input"
          />
        </FormField>

        <FormField label="Class Type" required>
          <select
            value={form.type}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                type: event.target.value as ScheduleType,
              }))
            }
            className="form-input"
          >
            <option value="Regular">Regular</option>
            <option value="Extra Class">Extra Class</option>
            <option value="Test">Test</option>
            <option value="Doubt Session">Doubt Session</option>
          </select>
        </FormField>

        <FormField label="Start Time" required>
          <input
            type="time"
            value={form.startTime}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                startTime: event.target.value,
              }))
            }
            className="form-input"
          />
        </FormField>

        <FormField label="End Time" required>
          <input
            type="time"
            value={form.endTime}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                endTime: event.target.value,
              }))
            }
            className="form-input"
          />
        </FormField>

        <FormField label="Capacity">
          <input
            type="number"
            min="1"
            value={form.capacity}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                capacity: event.target.value,
              }))
            }
            className="form-input"
          />
        </FormField>

        <FormField label="Enrolled Students">
          <input
            type="number"
            min="0"
            value={form.enrolled}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                enrolled: event.target.value,
              }))
            }
            className="form-input"
          />
        </FormField>

        <FormField label="Status">
          <select
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                status: event.target.value as ScheduleStatus,
              }))
            }
            className="form-input"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Live">Live</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </FormField>

        <div className="flex items-end">
          <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              checked={form.recurring}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  recurring: event.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />

            <span>
              <span className="block text-sm font-semibold text-slate-800">
                Recurring Class
              </span>

              <span className="block text-xs text-slate-500">
                Repeat this class on selected days.
              </span>
            </span>
          </label>
        </div>

        {form.recurring && (
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Recurring Days
            </label>

            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => {
                const active = form.days.includes(day.short);

                return (
                  <button
                    key={day.short}
                    type="button"
                    onClick={() => toggleDay(day.short)}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {day.full}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="md:col-span-2">
          <FormField label="Notes">
            <textarea
              rows={4}
              value={form.notes}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
              placeholder="Add notes about this class..."
              className="form-input resize-none"
            />
          </FormField>
        </div>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgb(15 23 42);
          outline: none;
        }

        .form-input::placeholder {
          color: rgb(100 116 139);
        }

        .form-input:focus {
          border-color: rgb(59 130 246);
          box-shadow: 0 0 0 1px rgb(59 130 246);
        }
      `}</style>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}
    </div>
  );
}

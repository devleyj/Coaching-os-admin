"use client";

import { useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import {
  Video,
  Plus,
  Search,
  CalendarDays,
  Clock3,
  Users,
  GraduationCap,
  Play,
  Eye,
  MoreVertical,
  X,
  CheckCircle2,
  CircleDot,
  History,
  MonitorPlay,
  ShieldCheck,
} from "lucide-react";

type ClassStatus = "Live" | "Upcoming" | "Completed";

type OnlineClass = {
  id: string;
  title: string;
  teacher: string;
  batch: string;
  course: string;
  date: string;
  time: string;
  duration: string;
  students: number;
  status: ClassStatus;
  platform: string;
};

const initialClasses: OnlineClass[] = [
  {
    id: "CLS-1001",
    title: "JEE Advanced Physics",
    teacher: "Dr. Rahul Sharma",
    batch: "JEE Advanced",
    course: "JEE Preparation",
    date: "2026-09-11",
    time: "04:00 PM",
    duration: "90 min",
    students: 48,
    status: "Live",
    platform: "Coaching Live",
  },
  {
    id: "CLS-1002",
    title: "Organic Chemistry",
    teacher: "Dr. Priya Verma",
    batch: "NEET 2027",
    course: "NEET Preparation",
    date: "2026-09-11",
    time: "05:30 PM",
    duration: "90 min",
    students: 56,
    status: "Upcoming",
    platform: "Coaching Live",
  },
  {
    id: "CLS-1003",
    title: "Mathematics — Calculus",
    teacher: "Amit Patel",
    batch: "JEE Main",
    course: "JEE Preparation",
    date: "2026-09-12",
    time: "10:00 AM",
    duration: "120 min",
    students: 42,
    status: "Upcoming",
    platform: "Coaching Live",
  },
  {
    id: "CLS-1004",
    title: "Human Physiology",
    teacher: "Dr. Neha Singh",
    batch: "NEET 2027",
    course: "NEET Preparation",
    date: "2026-09-10",
    time: "06:00 PM",
    duration: "90 min",
    students: 51,
    status: "Completed",
    platform: "Coaching Live",
  },
  {
    id: "CLS-1005",
    title: "Modern Physics",
    teacher: "Dr. Rahul Sharma",
    batch: "JEE Advanced",
    course: "JEE Preparation",
    date: "2026-09-09",
    time: "04:00 PM",
    duration: "90 min",
    students: 46,
    status: "Completed",
    platform: "Coaching Live",
  },
  {
    id: "CLS-1006",
    title: "Botany — Plant Anatomy",
    teacher: "Dr. Anjali Mehta",
    batch: "NEET 2027",
    course: "NEET Preparation",
    date: "2026-09-13",
    time: "11:00 AM",
    duration: "90 min",
    students: 53,
    status: "Upcoming",
    platform: "Coaching Live",
  },
];

const statusConfig: Record<
  ClassStatus,
  {
    label: string;
    className: string;
    icon: typeof CircleDot;
  }
> = {
  Live: {
    label: "Live",
    className: "bg-red-50 text-red-700 border-red-200",
    icon: CircleDot,
  },
  Upcoming: {
    label: "Upcoming",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Clock3,
  },
  Completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
};

export default function OnlineClassesPage() {
  const [classes, setClasses] = useState<OnlineClass[]>(initialClasses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ClassStatus>(
    "All"
  );
  const [batchFilter, setBatchFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewingClass, setViewingClass] = useState<OnlineClass | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newTeacher, setNewTeacher] = useState("");
  const [newBatch, setNewBatch] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newDuration, setNewDuration] = useState("90 min");
  const [formError, setFormError] = useState("");

  const batches = useMemo(() => {
    return ["All", ...Array.from(new Set(classes.map((item) => item.batch)))];
  }, [classes]);

  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return classes.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.teacher.toLowerCase().includes(query) ||
        item.batch.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesBatch =
        batchFilter === "All" || item.batch === batchFilter;

      return matchesSearch && matchesStatus && matchesBatch;
    });
  }, [classes, search, statusFilter, batchFilter]);

  const totalClasses = classes.length;
  const liveClasses = classes.filter((item) => item.status === "Live").length;
  const upcomingClasses = classes.filter(
    (item) => item.status === "Upcoming"
  ).length;
  const completedClasses = classes.filter(
    (item) => item.status === "Completed"
  ).length;

  const resetForm = () => {
    setNewTitle("");
    setNewTeacher("");
    setNewBatch("");
    setNewCourse("");
    setNewDate("");
    setNewTime("");
    setNewDuration("90 min");
    setFormError("");
  };

  const handleCreateClass = () => {
    if (
      !newTitle.trim() ||
      !newTeacher.trim() ||
      !newBatch.trim() ||
      !newCourse.trim() ||
      !newDate ||
      !newTime
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const newClass: OnlineClass = {
      id: `CLS-${1001 + classes.length}`,
      title: newTitle.trim(),
      teacher: newTeacher.trim(),
      batch: newBatch.trim(),
      course: newCourse.trim(),
      date: newDate,
      time: newTime,
      duration: newDuration,
      students: 0,
      status: "Upcoming",
      platform: "Coaching Live",
    };

    setClasses((current) => [newClass, ...current]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setClasses((current) => current.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  const handleStartClass = (item: OnlineClass) => {
    setClasses((current) =>
      current.map((classItem) =>
        classItem.id === item.id
          ? { ...classItem, status: "Live" }
          : classItem
      )
    );

    setOpenMenu(null);
  };

  const handleCompleteClass = (item: OnlineClass) => {
    setClasses((current) =>
      current.map((classItem) =>
        classItem.id === item.id
          ? { ...classItem, status: "Completed" }
          : classItem
      )
    );

    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Video size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Online Classes
                </h1>
                <p className="text-sm text-slate-500">
                  Manage live classes, upcoming sessions and class history.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Schedule Class
          </button>
        </div>

        {/* Security notice */}
        <div className="mb-6 flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Secure Online Learning
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This module is the foundation for the platform&apos;s future
              secure classroom. Real end-to-end encrypted media will be added
              during the live video infrastructure phase.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Classes
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalClasses}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MonitorPlay size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Live Now
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {liveClasses}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <CircleDot size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Upcoming
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {upcomingClasses}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock3 size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {completedClasses}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <History size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="relative lg:col-span-2">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search class, teacher, batch or course..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "All" | ClassStatus)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Status</option>
              <option value="Live">Live</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={batchFilter}
              onChange={(event) => setBatchFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch === "All" ? "All Batches" : batch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Class table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Class Schedule
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage your online teaching sessions.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              {filteredClasses.length} Classes
            </span>
          </div>

          {filteredClasses.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Video size={24} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">
                No classes found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Class
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Teacher
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Batch
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Schedule
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Students
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredClasses.map((item) => {
                    const config = statusConfig[item.status];
                    const StatusIcon = config.icon;

                    return (
                      <tr
                        key={item.id}
                        className="transition hover:bg-blue-50/40"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <Video size={18} />
                            </div>

                            <div>
                              <p className="font-bold text-slate-900">
                                {item.title}
                              </p>
                              <p className="mt-1 text-xs font-medium text-slate-500">
                                {item.id} • {item.course}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <GraduationCap
                              size={16}
                              className="text-slate-400"
                            />
                            <span className="text-sm font-semibold text-slate-800">
                              {item.teacher}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="text-sm font-semibold text-slate-800">
                            {item.batch}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                              <CalendarDays
                                size={15}
                                className="text-slate-400"
                              />
                              {item.date}
                            </div>

                            <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                              <Clock3 size={14} />
                              {item.time} • {item.duration}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-800">
                              {item.students}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${config.className}`}
                          >
                            <StatusIcon size={13} />
                            {config.label}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            {item.status === "Live" && (
                              <button
                                onClick={() => setViewingClass(item)}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700"
                              >
                                <Play size={13} />
                                Join
                              </button>
                            )}

                            {item.status === "Upcoming" && (
                              <button
                                onClick={() => setViewingClass(item)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                              >
                                <Eye size={13} />
                                View
                              </button>
                            )}

                            {item.status === "Completed" && (
                              <button
                                onClick={() => setViewingClass(item)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                              >
                                <Eye size={13} />
                                Details
                              </button>
                            )}

                            <div className="relative">
                              <button
                                onClick={() =>
                                  setOpenMenu(
                                    openMenu === item.id ? null : item.id
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                              >
                                <MoreVertical size={17} />
                              </button>

                              {openMenu === item.id && (
                                <div className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                                  {item.status === "Upcoming" && (
                                    <button
                                      onClick={() => handleStartClass(item)}
                                      className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-blue-50"
                                    >
                                      Start Class
                                    </button>
                                  )}

                                  {item.status === "Live" && (
                                    <button
                                      onClick={() => handleCompleteClass(item)}
                                      className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-emerald-50"
                                    >
                                      End Class
                                    </button>
                                  )}

                                  <button
                                    onClick={() => setViewingClass(item)}
                                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                  >
                                    View Details
                                  </button>

                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                  >
                                    Delete Class
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Schedule Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Schedule Online Class
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Create a new online teaching session.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Class Title *
                </label>

                <input
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="e.g. JEE Advanced Physics"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Teacher *
                </label>

                <input
                  value={newTeacher}
                  onChange={(event) => setNewTeacher(event.target.value)}
                  placeholder="Teacher name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Batch *
                </label>

                <input
                  value={newBatch}
                  onChange={(event) => setNewBatch(event.target.value)}
                  placeholder="e.g. JEE Advanced"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Course *
                </label>

                <input
                  value={newCourse}
                  onChange={(event) => setNewCourse(event.target.value)}
                  placeholder="e.g. JEE Preparation"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Duration
                </label>

                <select
                  value={newDuration}
                  onChange={(event) => setNewDuration(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option>60 min</option>
                  <option>90 min</option>
                  <option>120 min</option>
                  <option>150 min</option>
                  <option>180 min</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Date *
                </label>

                <input
                  type="date"
                  value={newDate}
                  onChange={(event) => setNewDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Time *
                </label>

                <input
                  type="time"
                  value={newTime}
                  onChange={(event) => setNewTime(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {formError && (
              <div className="mx-6 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateClass}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Schedule Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Class Modal */}
      {viewingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Class Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {viewingClass.id}
                </p>
              </div>

              <button
                onClick={() => setViewingClass(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Class
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {viewingClass.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Teacher
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {viewingClass.teacher}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Batch
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {viewingClass.batch}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {viewingClass.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Time
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {viewingClass.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Duration
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {viewingClass.duration}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Students
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {viewingClass.students}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">
                    Class Status
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                      statusConfig[viewingClass.status].className
                    }`}
                  >
                    {viewingClass.status}
                  </span>
                </div>
              </div>

              {viewingClass.status === "Live" && (
                <button
                  onClick={() => setViewingClass(null)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
                >
                  <Play size={17} />
                  Join Live Classroom
                </button>
              )}
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-5">
              <button
                onClick={() => setViewingClass(null)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
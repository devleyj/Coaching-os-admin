"use client";

import { useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import PageHeader from "../components/PageHeader";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Eye,
  GraduationCap,
  Layers,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

type BatchStatus = "Active" | "Full" | "Completed" | "Inactive";

type Batch = {
  id: string;
  name: string;
  course: string;
  teacher: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  days: string[];
  room: string;
  capacity: number;
  students: number;
  status: BatchStatus;
  attendanceRate: number;
  performanceScore: number;
};

const initialBatches: Batch[] = [
  {
    id: "BAT-1001",
    name: "JEE Advanced Morning",
    course: "JEE Advanced",
    teacher: "Rahul Mehta",
    startDate: "2026-04-01",
    endDate: "2027-03-31",
    startTime: "07:00",
    endTime: "10:00",
    days: ["Mon", "Wed", "Fri"],
    room: "Room 101",
    capacity: 50,
    students: 42,
    status: "Active",
    attendanceRate: 94,
    performanceScore: 91,
  },
  {
    id: "BAT-1002",
    name: "NEET Evening",
    course: "NEET",
    teacher: "Priya Sharma",
    startDate: "2026-04-01",
    endDate: "2027-03-31",
    startTime: "17:00",
    endTime: "20:00",
    days: ["Tue", "Thu", "Sat"],
    room: "Room 202",
    capacity: 40,
    students: 36,
    status: "Active",
    attendanceRate: 91,
    performanceScore: 88,
  },
  {
    id: "BAT-1003",
    name: "Foundation Weekend",
    course: "Foundation",
    teacher: "Amit Verma",
    startDate: "2026-06-01",
    endDate: "2027-02-28",
    startTime: "09:00",
    endTime: "12:00",
    days: ["Sat", "Sun"],
    room: "Room 103",
    capacity: 35,
    students: 28,
    status: "Active",
    attendanceRate: 87,
    performanceScore: 84,
  },
  {
    id: "BAT-1004",
    name: "JEE Main Evening",
    course: "JEE Main",
    teacher: "Vikram Singh",
    startDate: "2026-04-15",
    endDate: "2027-01-31",
    startTime: "17:30",
    endTime: "20:30",
    days: ["Mon", "Wed", "Fri"],
    room: "Room 105",
    capacity: 45,
    students: 45,
    status: "Full",
    attendanceRate: 89,
    performanceScore: 86,
  },
  {
    id: "BAT-1005",
    name: "NEET Intensive",
    course: "NEET",
    teacher: "Sneha Kapoor",
    startDate: "2026-05-01",
    endDate: "2027-03-15",
    startTime: "08:00",
    endTime: "11:00",
    days: ["Mon", "Tue", "Thu", "Fri"],
    room: "Room 201",
    capacity: 40,
    students: 31,
    status: "Active",
    attendanceRate: 93,
    performanceScore: 90,
  },
  {
    id: "BAT-1006",
    name: "Foundation Evening",
    course: "Foundation",
    teacher: "Amit Verma",
    startDate: "2026-04-10",
    endDate: "2026-12-31",
    startTime: "16:00",
    endTime: "18:00",
    days: ["Tue", "Thu"],
    room: "Room 104",
    capacity: 30,
    students: 18,
    status: "Active",
    attendanceRate: 85,
    performanceScore: 81,
  },
  {
    id: "BAT-1007",
    name: "JEE Revision Sprint",
    course: "JEE Advanced",
    teacher: "Rahul Mehta",
    startDate: "2026-09-01",
    endDate: "2026-11-30",
    startTime: "18:00",
    endTime: "21:00",
    days: ["Mon", "Wed", "Fri", "Sat"],
    room: "Room 106",
    capacity: 30,
    students: 30,
    status: "Full",
    attendanceRate: 96,
    performanceScore: 94,
  },
  {
    id: "BAT-1008",
    name: "Summer Foundation",
    course: "Foundation",
    teacher: "Neha Joshi",
    startDate: "2026-05-15",
    endDate: "2026-07-31",
    startTime: "10:00",
    endTime: "12:00",
    days: ["Mon", "Wed", "Fri"],
    room: "Room 102",
    capacity: 25,
    students: 25,
    status: "Completed",
    attendanceRate: 90,
    performanceScore: 87,
  },
  {
    id: "BAT-1009",
    name: "NEET Morning Batch",
    course: "NEET",
    teacher: "Priya Sharma",
    startDate: "2026-07-01",
    endDate: "2027-03-31",
    startTime: "07:30",
    endTime: "10:30",
    days: ["Mon", "Wed", "Fri"],
    room: "Room 203",
    capacity: 40,
    students: 34,
    status: "Active",
    attendanceRate: 92,
    performanceScore: 89,
  },
  {
    id: "BAT-1010",
    name: "JEE Main Weekend",
    course: "JEE Main",
    teacher: "Vikram Singh",
    startDate: "2026-08-01",
    endDate: "2027-02-28",
    startTime: "09:00",
    endTime: "13:00",
    days: ["Sat", "Sun"],
    room: "Room 107",
    capacity: 50,
    students: 39,
    status: "Active",
    attendanceRate: 88,
    performanceScore: 85,
  },
  {
    id: "BAT-1011",
    name: "Physics Advanced",
    course: "JEE Advanced",
    teacher: "Karan Malhotra",
    startDate: "2026-06-15",
    endDate: "2027-02-15",
    startTime: "14:00",
    endTime: "16:00",
    days: ["Tue", "Thu"],
    room: "Room 108",
    capacity: 25,
    students: 19,
    status: "Active",
    attendanceRate: 90,
    performanceScore: 92,
  },
  {
    id: "BAT-1012",
    name: "Biology Masterclass",
    course: "NEET",
    teacher: "Dr. Riya Gupta",
    startDate: "2026-08-10",
    endDate: "2027-02-10",
    startTime: "15:00",
    endTime: "17:00",
    days: ["Mon", "Thu"],
    room: "Room 204",
    capacity: 30,
    students: 22,
    status: "Active",
    attendanceRate: 95,
    performanceScore: 93,
  },
];

const courses = ["JEE Advanced", "JEE Main", "NEET", "Foundation"];

const teachers = [
  "Rahul Mehta",
  "Priya Sharma",
  "Amit Verma",
  "Vikram Singh",
  "Sneha Kapoor",
  "Neha Joshi",
  "Karan Malhotra",
  "Dr. Riya Gupta",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const statusOptions: BatchStatus[] = [
  "Active",
  "Full",
  "Completed",
  "Inactive",
];

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time: string) {
  if (!time) return "—";

  const [hours, minutes] = time.split(":").map(Number);

  const suffix = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;

  return `${String(formattedHour).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )} ${suffix}`;
}

function getStatusClasses(status: BatchStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "Full":
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "Completed":
      return "bg-blue-50 text-blue-700 border-blue-100";
    case "Inactive":
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function getCapacityPercentage(batch: Batch) {
  if (!batch.capacity) return 0;

  return Math.min(100, Math.round((batch.students / batch.capacity) * 100));
}

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [teacherFilter, setTeacherFilter] = useState("All");

  const [sortBy, setSortBy] = useState("Name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const [toast, setToast] = useState("");

  const emptyForm = {
    name: "",
    course: courses[0],
    teacher: teachers[0],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    days: [] as string[],
    room: "",
    capacity: "",
    students: "0",
    status: "Active" as BatchStatus,
  };

  const [form, setForm] = useState(emptyForm);

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const filteredBatches = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = batches.filter((batch) => {
      const matchesSearch =
        !normalizedSearch ||
        batch.name.toLowerCase().includes(normalizedSearch) ||
        batch.id.toLowerCase().includes(normalizedSearch) ||
        batch.course.toLowerCase().includes(normalizedSearch) ||
        batch.teacher.toLowerCase().includes(normalizedSearch) ||
        batch.room.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || batch.status === statusFilter;

      const matchesCourse =
        courseFilter === "All" || batch.course === courseFilter;

      const matchesTeacher =
        teacherFilter === "All" || batch.teacher === teacherFilter;

      return matchesSearch && matchesStatus && matchesCourse && matchesTeacher;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "Name":
          comparison = a.name.localeCompare(b.name);
          break;

        case "Students":
          comparison = a.students - b.students;
          break;

        case "Capacity":
          comparison = a.capacity - b.capacity;
          break;

        case "Course":
          comparison = a.course.localeCompare(b.course);
          break;

        case "Teacher":
          comparison = a.teacher.localeCompare(b.teacher);
          break;

        case "Attendance":
          comparison = a.attendanceRate - b.attendanceRate;
          break;

        case "Performance":
          comparison = a.performanceScore - b.performanceScore;
          break;

        case "Status":
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [
    batches,
    search,
    statusFilter,
    courseFilter,
    teacherFilter,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBatches.length / itemsPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedBatches = filteredBatches.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  const totalStudents = batches.reduce(
    (total, batch) => total + batch.students,
    0,
  );

  const totalCapacity = batches.reduce(
    (total, batch) => total + batch.capacity,
    0,
  );

  const activeBatches = batches.filter(
    (batch) => batch.status === "Active",
  ).length;

  const fullBatches = batches.filter((batch) => batch.status === "Full").length;

  const completedBatches = batches.filter(
    (batch) => batch.status === "Completed",
  ).length;

  const averageAttendance =
    batches.length > 0
      ? Math.round(
          batches.reduce((total, batch) => total + batch.attendanceRate, 0) /
            batches.length,
        )
      : 0;

  const averagePerformance =
    batches.length > 0
      ? Math.round(
          batches.reduce((total, batch) => total + batch.performanceScore, 0) /
            batches.length,
        )
      : 0;

  const availableSeats = Math.max(0, totalCapacity - totalStudents);

  const resetForm = () => {
    setForm({
      ...emptyForm,
      days: [],
    });
  };

  const toggleDay = (day: string) => {
    setForm((current) => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter((item) => item !== day)
        : [...current.days, day],
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      showToast("Batch name is required.");
      return false;
    }

    if (!form.course) {
      showToast("Please select a course.");
      return false;
    }

    if (!form.teacher) {
      showToast("Please select a teacher.");
      return false;
    }

    if (!form.startDate || !form.endDate) {
      showToast("Start and end dates are required.");
      return false;
    }

    if (form.endDate < form.startDate) {
      showToast("End date cannot be before start date.");
      return false;
    }

    if (!form.startTime || !form.endTime) {
      showToast("Start and end times are required.");
      return false;
    }

    if (form.endTime <= form.startTime) {
      showToast("End time must be later than start time.");
      return false;
    }

    if (form.days.length === 0) {
      showToast("Please select at least one class day.");
      return false;
    }

    if (!form.room.trim()) {
      showToast("Room is required.");
      return false;
    }

    const capacity = Number(form.capacity);
    const students = Number(form.students);

    if (!Number.isFinite(capacity) || capacity <= 0) {
      showToast("Capacity must be greater than 0.");
      return false;
    }

    if (!Number.isFinite(students) || students < 0) {
      showToast("Student count cannot be negative.");
      return false;
    }

    if (students > capacity) {
      showToast("Students cannot be greater than capacity.");
      return false;
    }

    return true;
  };

  const generateBatchId = () => {
    const numbers = batches
      .map((batch) => {
        const match = batch.id.match(/BAT-(\d+)/);
        return match ? Number(match[1]) : 1000;
      })
      .filter(Number.isFinite);

    const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1001;

    return `BAT-${nextNumber}`;
  };

  const saveNewBatch = () => {
    if (!validateForm()) return;

    const capacity = Number(form.capacity);
    const students = Number(form.students);

    let status = form.status;

    if (students === capacity && status === "Active") {
      status = "Full";
    }

    const newBatch: Batch = {
      id: generateBatchId(),
      name: form.name.trim(),
      course: form.course,
      teacher: form.teacher,
      startDate: form.startDate,
      endDate: form.endDate,
      startTime: form.startTime,
      endTime: form.endTime,
      days: form.days,
      room: form.room.trim(),
      capacity,
      students,
      status,
      attendanceRate: 0,
      performanceScore: 0,
    };

    setBatches((current) => [...current, newBatch]);
    setCurrentPage(1);
    setShowAddModal(false);
    resetForm();

    showToast("Batch created successfully.");
  };

  const openEditModal = (batch: Batch) => {
    setSelectedBatch(batch);

    setForm({
      name: batch.name,
      course: batch.course,
      teacher: batch.teacher,
      startDate: batch.startDate,
      endDate: batch.endDate,
      startTime: batch.startTime,
      endTime: batch.endTime,
      days: batch.days,
      room: batch.room,
      capacity: String(batch.capacity),
      students: String(batch.students),
      status: batch.status,
    });

    setOpenActionMenu(null);
    setShowEditModal(true);
  };

  const saveEditedBatch = () => {
    if (!selectedBatch) return;

    if (!validateForm()) return;

    const capacity = Number(form.capacity);
    const students = Number(form.students);

    let status = form.status;

    if (students === capacity && status === "Active") {
      status = "Full";
    }

    setBatches((current) =>
      current.map((batch) =>
        batch.id === selectedBatch.id
          ? {
              ...batch,
              name: form.name.trim(),
              course: form.course,
              teacher: form.teacher,
              startDate: form.startDate,
              endDate: form.endDate,
              startTime: form.startTime,
              endTime: form.endTime,
              days: form.days,
              room: form.room.trim(),
              capacity,
              students,
              status,
            }
          : batch,
      ),
    );

    setShowEditModal(false);
    setSelectedBatch(null);
    resetForm();

    showToast("Batch updated successfully.");
  };

  const deleteBatch = (batch: Batch) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${batch.name}"?`,
    );

    if (!confirmed) return;

    setBatches((current) => current.filter((item) => item.id !== batch.id));

    setOpenActionMenu(null);

    showToast("Batch deleted successfully.");
  };

  const openDetails = (batch: Batch) => {
    setSelectedBatch(batch);
    setOpenActionMenu(null);
    setShowDetailsModal(true);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCourseFilter("All");
    setTeacherFilter("All");
    setSortBy("Name");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search ||
    statusFilter !== "All" ||
    courseFilter !== "All" ||
    teacherFilter !== "All";

  const renderForm = () => (
    <div className="grid max-h-[70vh] grid-cols-1 gap-5 overflow-y-auto pr-1 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Batch Name *
        </label>

        <input
          type="text"
          value={form.name}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              name: event.target.value,
            }))
          }
          placeholder="e.g. JEE Advanced Morning"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Course *
        </label>

        <select
          value={form.course}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              course: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          {courses.map((course) => (
            <option key={course}>{course}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Teacher *
        </label>

        <select
          value={form.teacher}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              teacher: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          {teachers.map((teacher) => (
            <option key={teacher}>{teacher}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Start Date *
        </label>

        <input
          type="date"
          value={form.startDate}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              startDate: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          End Date *
        </label>

        <input
          type="date"
          value={form.endDate}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              endDate: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Start Time *
        </label>

        <input
          type="time"
          value={form.startTime}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              startTime: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          End Time *
        </label>

        <input
          type="time"
          value={form.endTime}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              endTime: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Class Days *
        </label>

        <div className="flex flex-wrap gap-2">
          {weekDays.map((day) => {
            const selected = form.days.includes(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Classroom / Room *
        </label>

        <input
          type="text"
          value={form.room}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              room: event.target.value,
            }))
          }
          placeholder="e.g. Room 101"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Capacity *
        </label>

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
          placeholder="e.g. 50"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Enrolled Students
        </label>

        <input
          type="number"
          min="0"
          value={form.students}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              students: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Status
        </label>

        <select
          value={form.status}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              status: event.target.value as BatchStatus,
            }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          {statusOptions.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 md:col-span-2">
        <div className="flex gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

          <div>
            <p className="text-sm font-bold text-blue-900">
              AI-ready batch intelligence
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Later, this batch can automatically receive AI-generated insights
              about attendance, capacity, student performance, teacher load and
              scheduling conflicts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <PageHeader
          title="Batches"
          description="Manage batches, schedules, capacity, teachers and student enrollment."
          icon={<Layers size={20} />}
          actions={
            <>
              <button
                type="button"
                onClick={() => setShowAIModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
              >
                <Sparkles size={16} />
                AI Insights
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={17} />
                Add Batch
              </button>
            </>
          }
        />

        {/* KPI Cards */}
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Layers className="h-5 w-5" />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                Live
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Total Batches
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {batches.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">Active</p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {activeBatches}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Enrolled Students
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {totalStudents}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {availableSeats} seats available
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Avg. Attendance
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {averageAttendance}%
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Avg. Performance
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {averagePerformance}%
            </p>
          </div>
        </div>

        {/* AI Command Center */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 shadow-sm">
          <div className="flex flex-col gap-5 p-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Batch AI Command Center
                  </h2>

                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                    AI READY
                  </span>
                </div>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                  Monitor capacity pressure, attendance patterns, teacher
                  workload and batch performance from one place.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAIModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Zap className="h-4 w-4" />
              Analyze Batches
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Batch Directory
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Search, filter and organize your batches.
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-5">
              <div className="relative xl:col-span-2">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search batch, ID, course, teacher..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="All">All Status</option>

                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <select
                value={courseFilter}
                onChange={(event) => {
                  setCourseFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="All">All Courses</option>

                {courses.map((course) => (
                  <option key={course}>{course}</option>
                ))}
              </select>

              <select
                value={teacherFilter}
                onChange={(event) => {
                  setTeacherFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="All">All Teachers</option>

                {teachers.map((teacher) => (
                  <option key={teacher}>{teacher}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-700">
                  {filteredBatches.length}
                </span>{" "}
                batches
              </p>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(event) => {
                  const [newSort, newOrder] = event.target.value.split("-");

                  setSortBy(newSort);
                  setSortOrder(newOrder as "asc" | "desc");
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="Name-asc">Name: A → Z</option>
                <option value="Name-desc">Name: Z → A</option>
                <option value="Students-asc">Students: Low → High</option>
                <option value="Students-desc">Students: High → Low</option>
                <option value="Capacity-asc">Capacity: Low → High</option>
                <option value="Capacity-desc">Capacity: High → Low</option>
                <option value="Course-asc">Course: A → Z</option>
                <option value="Course-desc">Course: Z → A</option>
                <option value="Teacher-asc">Teacher: A → Z</option>
                <option value="Teacher-desc">Teacher: Z → A</option>
                <option value="Attendance-desc">Attendance: High → Low</option>
                <option value="Performance-desc">
                  Performance: High → Low
                </option>
                <option value="Status-asc">Status: A → Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  All Batches
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage schedules, capacity and student enrollment.
                </p>
              </div>

              <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                {activeBatches} Active · {fullBatches} Full · {completedBatches}{" "}
                Completed
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Batch
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Teacher
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Schedule
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Students
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Attendance
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Performance
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedBatches.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Layers className="h-7 w-7" />
                      </div>

                      <h3 className="mt-4 text-base font-bold text-slate-900">
                        No batches found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your filters or create a new batch.
                      </p>

                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                          Clear filters
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  paginatedBatches.map((batch) => {
                    const capacityPercentage = getCapacityPercentage(batch);

                    return (
                      <tr
                        key={batch.id}
                        className="transition hover:bg-blue-50/40"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <Layers className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {batch.name}
                              </p>

                              <p className="mt-1 text-xs font-medium text-slate-400">
                                {batch.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                            {batch.course}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-xs font-bold text-purple-700">
                              {batch.teacher
                                .split(" ")
                                .map((part) => part[0])
                                .slice(0, 2)
                                .join("")}
                            </div>

                            <span className="text-sm font-medium text-slate-700">
                              {batch.teacher}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2">
                            <Clock3 className="mt-0.5 h-4 w-4 text-slate-400" />

                            <div>
                              <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                                {formatTime(batch.startTime)} –{" "}
                                {formatTime(batch.endTime)}
                              </p>

                              <p className="mt-1 whitespace-nowrap text-xs text-slate-500">
                                {batch.days.join(", ")}
                              </p>

                              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                                <MapPin className="h-3 w-3" />
                                {batch.room}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="min-w-[130px]">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-slate-900">
                                {batch.students}
                              </span>

                              <span className="text-xs font-medium text-slate-400">
                                / {batch.capacity}
                              </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full rounded-full ${
                                  capacityPercentage >= 100
                                    ? "bg-amber-500"
                                    : capacityPercentage >= 85
                                      ? "bg-orange-400"
                                      : "bg-blue-600"
                                }`}
                                style={{
                                  width: `${capacityPercentage}%`,
                                }}
                              />
                            </div>

                            <p className="mt-1 text-[11px] font-medium text-slate-400">
                              {batch.capacity - batch.students > 0
                                ? `${batch.capacity - batch.students} seats left`
                                : "No seats available"}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />

                            <span className="text-sm font-bold text-slate-800">
                              {batch.attendanceRate}%
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />

                            <span className="text-sm font-bold text-slate-800">
                              {batch.performanceScore}%
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                              batch.status,
                            )}`}
                          >
                            {batch.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="relative flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenActionMenu(
                                  openActionMenu === batch.id ? null : batch.id,
                                )
                              }
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </button>

                            {openActionMenu === batch.id && (
                              <div className="absolute right-0 top-11 z-30 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                <button
                                  type="button"
                                  onClick={() => openDetails(batch)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openEditModal(batch)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  <Edit3 className="h-4 w-4" />
                                  Edit Batch
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedBatch(batch);
                                    setOpenActionMenu(null);
                                    setShowAIModal(true);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-blue-600 hover:bg-blue-50"
                                >
                                  <Sparkles className="h-4 w-4" />
                                  AI Analysis
                                </button>

                                <div className="my-1 border-t border-slate-100" />

                                <button
                                  type="button"
                                  onClick={() => deleteBatch(batch)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredBatches.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-slate-500">
                Page{" "}
                <span className="font-bold text-slate-800">
                  {safeCurrentPage}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">{totalPages}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-bold transition ${
                        page === safeCurrentPage
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Insights */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Capacity Alert
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {fullBatches} batch
                  {fullBatches !== 1 ? "es are" : " is"} currently at full
                  capacity. Consider opening another section if demand
                  continues.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Performance Signal
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Current average batch performance is{" "}
                  <span className="font-bold">{averagePerformance}%</span>. AI
                  can later identify why individual batches are outperforming
                  others.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">Scheduling</p>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {batches.length} batches are currently configured with
                  classroom schedules and teacher assignments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add New Batch
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new batch and configure its schedule.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">{renderForm()}</div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveNewBatch}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Create Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedBatch && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Edit Batch</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update {selectedBatch.id} information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedBatch(null);
                }}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">{renderForm()}</div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedBatch(null);
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveEditedBatch}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedBatch && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                    <Layers className="h-7 w-7" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">
                        {selectedBatch.name}
                      </h2>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStatusClasses(
                          selectedBatch.status,
                        )}`}
                      >
                        {selectedBatch.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedBatch.id} · {selectedBatch.course}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedBatch(null);
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Teacher
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-blue-500" />

                    <p className="text-sm font-bold text-slate-900">
                      {selectedBatch.teacher}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Classroom
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />

                    <p className="text-sm font-bold text-slate-900">
                      {selectedBatch.room}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Schedule
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-blue-500" />

                    <p className="text-sm font-bold text-slate-900">
                      {formatTime(selectedBatch.startTime)} –{" "}
                      {formatTime(selectedBatch.endTime)}
                    </p>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedBatch.days.join(", ")}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Duration
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-500" />

                    <p className="text-sm font-bold text-slate-900">
                      {formatDate(selectedBatch.startDate)}
                    </p>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    to {formatDate(selectedBatch.endDate)}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Student Capacity
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Enrollment utilization for this batch
                    </p>
                  </div>

                  <Users className="h-5 w-5 text-blue-500" />
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <p className="text-3xl font-bold text-slate-900">
                    {selectedBatch.students}
                    <span className="text-base font-medium text-slate-400">
                      {" "}
                      / {selectedBatch.capacity}
                    </span>
                  </p>

                  <p className="text-sm font-bold text-blue-600">
                    {getCapacityPercentage(selectedBatch)}%
                  </p>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${getCapacityPercentage(selectedBatch)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Attendance
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-900">
                    {selectedBatch.attendanceRate}%
                  </p>

                  <p className="mt-1 text-xs text-emerald-700">
                    Average batch attendance
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                    Performance
                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-900">
                    {selectedBatch.performanceScore}%
                  </p>

                  <p className="mt-1 text-xs text-blue-700">
                    Current performance score
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedBatch(null);
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDetailsModal(false);
                  openEditModal(selectedBatch);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Edit3 className="h-4 w-4" />
                Edit Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">AI Batch Insights</h2>

                    <p className="mt-1 text-sm text-blue-100">
                      Intelligent operational signals for your batches.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAIModal(false)}
                  className="rounded-lg p-2 text-blue-100 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-6">
              {selectedBatch ? (
                <div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      Selected Batch
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      {selectedBatch.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedBatch.id} · {selectedBatch.course}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Capacity signal
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          This batch is using{" "}
                          <span className="font-bold">
                            {getCapacityPercentage(selectedBatch)}%
                          </span>{" "}
                          of its available seats.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                      <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Performance signal
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          Current performance score is{" "}
                          <span className="font-bold">
                            {selectedBatch.performanceScore}%
                          </span>
                          .
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Attendance signal
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          Average attendance is{" "}
                          <span className="font-bold">
                            {selectedBatch.attendanceRate}%
                          </span>
                          . Future AI analysis can identify students at risk of
                          dropping below the institute's target.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
                    <div className="flex gap-3">
                      <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Capacity opportunity
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {fullBatches} batches are currently full. The system
                          could later recommend new sections based on inquiry
                          demand and waitlists.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                    <div className="flex gap-3">
                      <TrendingUp className="h-5 w-5 shrink-0 text-emerald-600" />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Performance opportunity
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          The current average batch performance is{" "}
                          <span className="font-bold">
                            {averagePerformance}%
                          </span>
                          . Future AI can compare teacher, course, attendance
                          and exam outcomes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <div className="flex gap-3">
                      <Sparkles className="h-5 w-5 shrink-0 text-blue-600" />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Recommended future automation
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          Automatically detect overloaded teachers, classroom
                          conflicts, low attendance batches, under-filled
                          batches and students needing intervention.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold leading-5 text-slate-500">
                  AI status: simulated frontend intelligence. Real AI analysis
                  will be connected after the backend, database and AI service
                  are implemented.
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAIModal(false)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

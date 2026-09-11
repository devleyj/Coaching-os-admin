"use client";

import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  Users,
  UserCheck,
  UserX,
  Clock3,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Eye,
  RotateCcw,
  X,
  Download,
  MessageCircle,
  Smartphone,
  Fingerprint,
  ScanFace,
  CreditCard,
  Plus,
  Save,
} from "lucide-react";
import Slidebar from "../components/Slidebar";

type AttendanceStatus = "Present" | "Absent" | "Late" | "Leave";
type AttendanceMethod = "Face Scan" | "Card Tap" | "Fingerprint" | "Manual";

type AttendanceRecord = {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  batch: string;
  date: string;
  checkIn: string;
  status: AttendanceStatus;
  method: AttendanceMethod;
  remarks: string;
  whatsappSent: boolean;
};

const initialAttendance: AttendanceRecord[] = [
  {
    id: "ATT-1001",
    studentId: "STU-1001",
    studentName: "Aarav Mehta",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    date: "2026-09-11",
    checkIn: "08:52",
    status: "Present",
    method: "Face Scan",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1002",
    studentId: "STU-1002",
    studentName: "Riya Sharma",
    course: "NEET Preparation",
    batch: "NEET 2027",
    date: "2026-09-11",
    checkIn: "09:04",
    status: "Late",
    method: "Fingerprint",
    remarks: "Arrived 4 minutes late.",
    whatsappSent: true,
  },
  {
    id: "ATT-1003",
    studentId: "STU-1003",
    studentName: "Kabir Patel",
    course: "JEE Preparation",
    batch: "JEE Main",
    date: "2026-09-11",
    checkIn: "08:48",
    status: "Present",
    method: "Card Tap",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1004",
    studentId: "STU-1004",
    studentName: "Ananya Singh",
    course: "NEET Preparation",
    batch: "NEET 2027",
    date: "2026-09-11",
    checkIn: "—",
    status: "Absent",
    method: "Manual",
    remarks: "No attendance recorded.",
    whatsappSent: false,
  },
  {
    id: "ATT-1005",
    studentId: "STU-1005",
    studentName: "Vivaan Joshi",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    date: "2026-09-11",
    checkIn: "08:56",
    status: "Present",
    method: "Face Scan",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1006",
    studentId: "STU-1006",
    studentName: "Ishita Rao",
    course: "NEET Preparation",
    batch: "NEET 2027",
    date: "2026-09-11",
    checkIn: "—",
    status: "Leave",
    method: "Manual",
    remarks: "Approved medical leave.",
    whatsappSent: true,
  },
  {
    id: "ATT-1007",
    studentId: "STU-1007",
    studentName: "Aditya Shah",
    course: "JEE Preparation",
    batch: "JEE Main",
    date: "2026-09-11",
    checkIn: "09:13",
    status: "Late",
    method: "Card Tap",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1008",
    studentId: "STU-1008",
    studentName: "Meera Kapoor",
    course: "Foundation",
    batch: "Foundation 2027",
    date: "2026-09-11",
    checkIn: "08:47",
    status: "Present",
    method: "Fingerprint",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1009",
    studentId: "STU-1009",
    studentName: "Arjun Malhotra",
    course: "Foundation",
    batch: "Foundation 2027",
    date: "2026-09-11",
    checkIn: "—",
    status: "Absent",
    method: "Manual",
    remarks: "",
    whatsappSent: false,
  },
  {
    id: "ATT-1010",
    studentId: "STU-1010",
    studentName: "Diya Agarwal",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    date: "2026-09-11",
    checkIn: "08:50",
    status: "Present",
    method: "Face Scan",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1011",
    studentId: "STU-1011",
    studentName: "Reyansh Gupta",
    course: "JEE Preparation",
    batch: "JEE Main",
    date: "2026-09-11",
    checkIn: "09:08",
    status: "Late",
    method: "Fingerprint",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1012",
    studentId: "STU-1012",
    studentName: "Sara Khan",
    course: "NEET Preparation",
    batch: "NEET 2027",
    date: "2026-09-11",
    checkIn: "08:59",
    status: "Present",
    method: "Card Tap",
    remarks: "",
    whatsappSent: true,
  },
];

const initialStudents = [
  { id: "STU-1001", name: "Aarav Mehta", course: "JEE Preparation", batch: "JEE Advanced" },
  { id: "STU-1002", name: "Riya Sharma", course: "NEET Preparation", batch: "NEET 2027" },
  { id: "STU-1003", name: "Kabir Patel", course: "JEE Preparation", batch: "JEE Main" },
  { id: "STU-1004", name: "Ananya Singh", course: "NEET Preparation", batch: "NEET 2027" },
  { id: "STU-1005", name: "Vivaan Joshi", course: "JEE Preparation", batch: "JEE Advanced" },
  { id: "STU-1006", name: "Ishita Rao", course: "NEET Preparation", batch: "NEET 2027" },
  { id: "STU-1007", name: "Aditya Shah", course: "JEE Preparation", batch: "JEE Main" },
  { id: "STU-1008", name: "Meera Kapoor", course: "Foundation", batch: "Foundation 2027" },
  { id: "STU-1009", name: "Arjun Malhotra", course: "Foundation", batch: "Foundation 2027" },
  { id: "STU-1010", name: "Diya Agarwal", course: "JEE Preparation", batch: "JEE Advanced" },
  { id: "STU-1011", name: "Reyansh Gupta", course: "JEE Preparation", batch: "JEE Main" },
  { id: "STU-1012", name: "Sara Khan", course: "NEET Preparation", batch: "NEET 2027" },
];

const statusClasses: Record<AttendanceStatus, string> = {
  Present: "bg-emerald-50 text-emerald-700",
  Absent: "bg-red-50 text-red-700",
  Late: "bg-amber-50 text-amber-700",
  Leave: "bg-blue-50 text-blue-700",
};

const methodClasses: Record<AttendanceMethod, string> = {
  "Face Scan": "bg-violet-50 text-violet-700",
  "Card Tap": "bg-blue-50 text-blue-700",
  Fingerprint: "bg-emerald-50 text-emerald-700",
  Manual: "bg-slate-100 text-slate-700",
};

const methodIcon = (method: AttendanceMethod) => {
  if (method === "Face Scan") return <ScanFace size={13} />;
  if (method === "Card Tap") return <CreditCard size={13} />;
  if (method === "Fingerprint") return <Fingerprint size={13} />;
  return <ClipboardCheck size={13} />;
};

const getInitial = (name: string) => name.trim().charAt(0).toUpperCase();

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (value: string) => {
  if (!value) return "—";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AttendancePage() {
  const [attendance, setAttendance] =
    useState<AttendanceRecord[]>(initialAttendance);

  const [selectedDate, setSelectedDate] = useState("2026-09-11");
  const [searchQuery, setSearchQuery] = useState("");
  const [batchFilter, setBatchFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");

  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const [selectedRecord, setSelectedRecord] =
    useState<AttendanceRecord | null>(null);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const [showMarkModal, setShowMarkModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [markForm, setMarkForm] = useState({
    studentId: initialStudents[0].id,
    status: "Present" as AttendanceStatus,
    method: "Manual" as AttendanceMethod,
    checkIn: "09:00",
    remarks: "",
  });

  const [bulkBatch, setBulkBatch] = useState("JEE Advanced");
  const [bulkStatus, setBulkStatus] =
    useState<AttendanceStatus>("Present");

  const batches = useMemo(
    () => Array.from(new Set(attendance.map((item) => item.batch))).sort(),
    [attendance]
  );

  const courses = useMemo(
    () => Array.from(new Set(attendance.map((item) => item.course))).sort(),
    [attendance]
  );

  const stats = useMemo(() => {
    const dayRecords = attendance.filter((item) => item.date === selectedDate);
    const present = dayRecords.filter((item) => item.status === "Present").length;
    const absent = dayRecords.filter((item) => item.status === "Absent").length;
    const late = dayRecords.filter((item) => item.status === "Late").length;
    const leave = dayRecords.filter((item) => item.status === "Leave").length;
    const marked = dayRecords.filter(
      (item) => item.status === "Present" || item.status === "Late"
    ).length;

    const percentage =
      dayRecords.length > 0
        ? Math.round((marked / dayRecords.length) * 100)
        : 0;

    return {
      total: dayRecords.length,
      present,
      absent,
      late,
      leave,
      percentage,
    };
  }, [attendance, selectedDate]);

  const filteredAttendance = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return attendance
      .filter((item) => {
        const matchesDate = item.date === selectedDate;
        const matchesSearch =
          !query ||
          item.studentName.toLowerCase().includes(query) ||
          item.studentId.toLowerCase().includes(query) ||
          item.batch.toLowerCase().includes(query);

        const matchesBatch =
          batchFilter === "All" || item.batch === batchFilter;

        const matchesCourse =
          courseFilter === "All" || item.course === courseFilter;

        const matchesStatus =
          statusFilter === "All" || item.status === statusFilter;

        const matchesMethod =
          methodFilter === "All" || item.method === methodFilter;

        return (
          matchesDate &&
          matchesSearch &&
          matchesBatch &&
          matchesCourse &&
          matchesStatus &&
          matchesMethod
        );
      })
      .sort((a, b) => a.studentName.localeCompare(b.studentName));
  }, [
    attendance,
    selectedDate,
    searchQuery,
    batchFilter,
    courseFilter,
    statusFilter,
    methodFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAttendance.length / rowsPerPage)
  );
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;

  const paginatedAttendance = filteredAttendance.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setBatchFilter("All");
    setCourseFilter("All");
    setStatusFilter("All");
    setMethodFilter("All");
    setPage(1);
  };

  const openMarkModal = () => {
    setMarkForm({
      studentId: initialStudents[0].id,
      status: "Present",
      method: "Manual",
      checkIn: "09:00",
      remarks: "",
    });
    setShowMarkModal(true);
  };

  const handleMarkAttendance = (event: React.FormEvent) => {
    event.preventDefault();

    const student = initialStudents.find(
      (item) => item.id === markForm.studentId
    );

    if (!student) return;

    const existing = attendance.find(
      (item) =>
        item.studentId === student.id && item.date === selectedDate
    );

    if (existing) {
      setAttendance((current) =>
        current.map((item) =>
          item.id === existing.id
            ? {
                ...item,
                status: markForm.status,
                method: markForm.method,
                checkIn:
                  markForm.status === "Absent" || markForm.status === "Leave"
                    ? "—"
                    : markForm.checkIn,
                remarks: markForm.remarks.trim(),
                whatsappSent:
                  markForm.status === "Absent" ||
                  markForm.status === "Leave"
                    ? true
                    : item.whatsappSent,
              }
            : item
        )
      );
    } else {
      const nextNumber =
        Math.max(
          0,
          ...attendance.map((item) => {
            const number = Number(item.id.replace("ATT-", ""));
            return Number.isFinite(number) ? number : 0;
          })
        ) + 1;

      setAttendance((current) => [
        {
          id: `ATT-${String(nextNumber).padStart(4, "0")}`,
          studentId: student.id,
          studentName: student.name,
          course: student.course,
          batch: student.batch,
          date: selectedDate,
          checkIn:
            markForm.status === "Absent" || markForm.status === "Leave"
              ? "—"
              : markForm.checkIn,
          status: markForm.status,
          method: markForm.method,
          remarks: markForm.remarks.trim(),
          whatsappSent:
            markForm.status === "Absent" || markForm.status === "Leave",
        },
        ...current,
      ]);
    }

    setShowMarkModal(false);
    setPage(1);
  };

  const updateStatus = (id: string, status: AttendanceStatus) => {
    setAttendance((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              checkIn:
                status === "Absent" || status === "Leave"
                  ? "—"
                  : item.checkIn === "—"
                  ? "09:00"
                  : item.checkIn,
            }
          : item
      )
    );
    setOpenActionMenu(null);
  };

  const sendWhatsApp = (record: AttendanceRecord) => {
    setAttendance((current) =>
      current.map((item) =>
        item.id === record.id ? { ...item, whatsappSent: true } : item
      )
    );
    setOpenActionMenu(null);
  };

  const handleBulkAttendance = (event: React.FormEvent) => {
    event.preventDefault();

    const studentsInBatch = initialStudents.filter(
      (student) => student.batch === bulkBatch
    );

    setAttendance((current) => {
      const updated = [...current];

      studentsInBatch.forEach((student) => {
        const existingIndex = updated.findIndex(
          (item) =>
            item.studentId === student.id && item.date === selectedDate
        );

        const record: AttendanceRecord = {
          id:
            existingIndex >= 0
              ? updated[existingIndex].id
              : `ATT-${String(
                  Math.max(
                    0,
                    ...updated.map((item) => {
                      const number = Number(item.id.replace("ATT-", ""));
                      return Number.isFinite(number) ? number : 0;
                    })
                  ) +
                    1
                ).padStart(4, "0")}`,
          studentId: student.id,
          studentName: student.name,
          course: student.course,
          batch: student.batch,
          date: selectedDate,
          checkIn:
            bulkStatus === "Absent" || bulkStatus === "Leave" ? "—" : "09:00",
          status: bulkStatus,
          method: "Manual",
          remarks: "",
          whatsappSent:
            bulkStatus === "Absent" || bulkStatus === "Leave",
        };

        if (existingIndex >= 0) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            ...record,
            id: updated[existingIndex].id,
          };
        } else {
          updated.unshift(record);
        }
      });

      return updated;
    });

    setShowBulkModal(false);
    setPage(1);
  };

  const exportAttendance = () => {
    const header = [
      "Student ID",
      "Student Name",
      "Course",
      "Batch",
      "Date",
      "Check In",
      "Status",
      "Method",
      "WhatsApp",
    ];

    const rows = filteredAttendance.map((item) => [
      item.studentId,
      item.studentName,
      item.course,
      item.batch,
      item.date,
      item.checkIn,
      item.status,
      item.method,
      item.whatsappSent ? "Sent" : "Not Sent",
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance-${selectedDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const selectedStudent = initialStudents.find(
    (student) => student.id === markForm.studentId
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold text-blue-600">
                Daily Operations
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Attendance Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track student attendance across batches and attendance devices.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={exportAttendance}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <Download size={17} />
                Export
              </button>

              <button
                type="button"
                onClick={() => setShowBulkModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <Users size={17} />
                Bulk Mark
              </button>

              <button
                type="button"
                onClick={openMarkModal}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
              >
                <Plus size={18} />
                Mark Attendance
              </button>
            </div>
          </div>

          {/* Date selector */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <CalendarDays size={19} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Attendance Date
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {formatDate(selectedDate)}
                </p>
              </div>
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:ml-auto"
            />

            <button
              type="button"
              onClick={() => {
                setSelectedDate(getToday());
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Today
            </button>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Records
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Users size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Present</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-600">
                    {stats.present}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <UserCheck size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Absent</p>
                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {stats.absent}
                  </p>
                </div>
                <div className="rounded-xl bg-red-50 p-3 text-red-600">
                  <UserX size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Late</p>
                  <p className="mt-2 text-2xl font-bold text-amber-600">
                    {stats.late}
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Clock3 size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Attendance Rate
                  </p>
                  <p className="mt-2 text-2xl font-bold text-blue-600">
                    {stats.percentage}%
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <ClipboardCheck size={21} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick action / device strip */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                  <ScanFace size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Face Scan</p>
                  <p className="text-xs font-medium text-slate-500">
                    Attendance source ready
                  </p>
                </div>
                <span className="ml-auto h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Card / RFID Tap</p>
                  <p className="text-xs font-medium text-slate-500">
                    Attendance source ready
                  </p>
                </div>
                <span className="ml-auto h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <Fingerprint size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Fingerprint</p>
                  <p className="text-xs font-medium text-slate-500">
                    Attendance source ready
                  </p>
                </div>
                <span className="ml-auto h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Attendance Records
                </h2>
                <p className="text-sm text-slate-500">
                  Search and filter attendance for the selected date.
                </p>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw size={15} />
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              <div className="relative xl:col-span-2">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Student name, ID or batch..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={batchFilter}
                onChange={(e) => {
                  setBatchFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Batches</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>

              <select
                value={courseFilter}
                onChange={(e) => {
                  setCourseFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Leave">Leave</option>
              </select>

              <select
                value={methodFilter}
                onChange={(e) => {
                  setMethodFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Methods</option>
                <option value="Face Scan">Face Scan</option>
                <option value="Card Tap">Card Tap</option>
                <option value="Fingerprint">Fingerprint</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Student</th>
                    <th className="px-5 py-4">Course / Batch</th>
                    <th className="px-5 py-4">Check In</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Method</th>
                    <th className="px-5 py-4">WhatsApp</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {paginatedAttendance.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                            {getInitial(record.studentName)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              {record.studentName}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-slate-500">
                              {record.studentId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {record.course}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {record.batch}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-800">
                          {record.checkIn}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses[record.status]}`}
                        >
                          {record.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold ${methodClasses[record.method]}`}
                        >
                          {methodIcon(record.method)}
                          {record.method}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {record.whatsappSent ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                            <CheckCircle2 size={15} />
                            Sent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <XCircle size={15} />
                            Not Sent
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="relative flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedRecord(record)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenActionMenu(
                                openActionMenu === record.id
                                  ? null
                                  : record.id
                              )
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                          >
                            <MoreHorizontal size={17} />
                          </button>

                          {openActionMenu === record.id && (
                            <div className="absolute right-0 top-11 z-30 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => setSelectedRecord(record)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={16} />
                                View Details
                              </button>

                              <button
                                type="button"
                                onClick={() => updateStatus(record.id, "Present")}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                              >
                                <UserCheck size={16} />
                                Mark Present
                              </button>

                              <button
                                type="button"
                                onClick={() => updateStatus(record.id, "Late")}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-amber-700 hover:bg-amber-50"
                              >
                                <Clock3 size={16} />
                                Mark Late
                              </button>

                              <button
                                type="button"
                                onClick={() => updateStatus(record.id, "Absent")}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
                              >
                                <UserX size={16} />
                                Mark Absent
                              </button>

                              {!record.whatsappSent && (
                                <button
                                  type="button"
                                  onClick={() => sendWhatsApp(record)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-green-700 hover:bg-green-50"
                                >
                                  <MessageCircle size={16} />
                                  Send WhatsApp
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {paginatedAttendance.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <ClipboardCheck size={22} />
                        </div>
                        <h3 className="mt-4 font-bold text-slate-900">
                          No attendance records found
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Try changing the date or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-500">
                Showing{" "}
                {filteredAttendance.length === 0 ? 0 : startIndex + 1}–
                {Math.min(
                  startIndex + rowsPerPage,
                  filteredAttendance.length
                )}{" "}
                of {filteredAttendance.length}
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-bold ${
                        safePage === pageNumber
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Mark Attendance
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Record or update attendance for {formatDate(selectedDate)}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMarkModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleMarkAttendance} className="space-y-5 p-6">
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Student *
                </span>
                <select
                  value={markForm.studentId}
                  onChange={(e) =>
                    setMarkForm((current) => ({
                      ...current,
                      studentId: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {initialStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} — {student.id} — {student.batch}
                    </option>
                  ))}
                </select>
              </label>

              {selectedStudent && (
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-900">
                    {selectedStudent.name}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {selectedStudent.course} · {selectedStudent.batch}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Status
                  </span>
                  <select
                    value={markForm.status}
                    onChange={(e) =>
                      setMarkForm((current) => ({
                        ...current,
                        status: e.target.value as AttendanceStatus,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Leave">Leave</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Attendance Method
                  </span>
                  <select
                    value={markForm.method}
                    onChange={(e) =>
                      setMarkForm((current) => ({
                        ...current,
                        method: e.target.value as AttendanceMethod,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Face Scan">Face Scan</option>
                    <option value="Card Tap">Card Tap</option>
                    <option value="Fingerprint">Fingerprint</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Check-in Time
                  </span>
                  <input
                    type="time"
                    value={markForm.checkIn}
                    disabled={
                      markForm.status === "Absent" ||
                      markForm.status === "Leave"
                    }
                    onChange={(e) =>
                      setMarkForm((current) => ({
                        ...current,
                        checkIn: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none disabled:bg-slate-100 focus:border-blue-500"
                  />
                </label>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Date
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {formatDate(selectedDate)}
                  </p>
                </div>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Remarks
                </span>
                <textarea
                  rows={3}
                  value={markForm.remarks}
                  onChange={(e) =>
                    setMarkForm((current) => ({
                      ...current,
                      remarks: e.target.value,
                    }))
                  }
                  placeholder="Add an optional attendance remark..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowMarkModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <Save size={16} />
                  Save Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Bulk Mark Attendance
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Apply one attendance status to an entire batch.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBulkAttendance} className="space-y-5 p-6">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-bold text-blue-900">
                  Selected date: {formatDate(selectedDate)}
                </p>
                <p className="mt-1 text-xs font-medium text-blue-700">
                  This action updates existing records or creates new records
                  for students in the selected batch.
                </p>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Batch
                </span>
                <select
                  value={bulkBatch}
                  onChange={(e) => setBulkBatch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                >
                  {batches.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Attendance Status
                </span>
                <select
                  value={bulkStatus}
                  onChange={(e) =>
                    setBulkStatus(e.target.value as AttendanceStatus)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Leave">Leave</option>
                </select>
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <ClipboardCheck size={16} />
                  Apply to Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Attendance Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                  {getInitial(selectedRecord.studentName)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedRecord.studentName}
                  </h2>
                  <p className="text-sm font-semibold text-slate-500">
                    {selectedRecord.studentId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Date
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {formatDate(selectedRecord.date)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Check In
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {selectedRecord.checkIn}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Course
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {selectedRecord.course}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Batch
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {selectedRecord.batch}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses[selectedRecord.status]}`}
                >
                  {selectedRecord.status}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Attendance Method
                </p>
                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold ${methodClasses[selectedRecord.method]}`}
                >
                  {methodIcon(selectedRecord.method)}
                  {selectedRecord.method}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  WhatsApp Notification
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                  {selectedRecord.whatsappSent ? (
                    <>
                      <CheckCircle2 size={17} className="text-emerald-600" />
                      Notification marked as sent
                    </>
                  ) : (
                    <>
                      <XCircle size={17} className="text-slate-400" />
                      Notification not sent
                    </>
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Remarks
                </p>
                <p className="mt-2 font-semibold text-slate-800">
                  {selectedRecord.remarks || "No remarks added."}
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
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

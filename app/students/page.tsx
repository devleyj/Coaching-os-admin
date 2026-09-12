"use client";

import { useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  Brain,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Edit3,
  Eye,
  FileText,
  IndianRupee,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  User,
  UserCheck,
  Users,
  X,
} from "lucide-react";

type StudentStatus = "Active" | "Inactive" | "Pending";

type Student = {
  name: string;
  course: string;
  id: string;
  batch: string;
  phone: string;
  email: string;
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  status: StudentStatus;
  enrollmentDate: string;
  parentName: string;
  parentPhone: string;
  attendance: number;
  performance: number;
  lastPayment: string;
  notes: string;
};

const initialStudents: Student[] = [
  {
    name: "Aarav Mehta",
    course: "JEE Preparation",
    id: "STU-1001",
    batch: "JEE Advanced",
    phone: "98XXXXXX21",
    email: "aarav@example.com",
    totalFees: 45000,
    paidFees: 30000,
    pendingFees: 15000,
    status: "Active",
    enrollmentDate: "2026-04-12",
    parentName: "Rajesh Mehta",
    parentPhone: "99XXXXXX11",
    attendance: 92,
    performance: 88,
    lastPayment: "2026-08-20",
    notes: "Strong mathematics performance. Needs additional physics practice.",
  },
  {
    name: "Riya Sharma",
    course: "NEET Preparation",
    id: "STU-1002",
    batch: "NEET 2027",
    phone: "97XXXXXX45",
    email: "riya@example.com",
    totalFees: 52000,
    paidFees: 40000,
    pendingFees: 12000,
    status: "Active",
    enrollmentDate: "2026-03-18",
    parentName: "Suresh Sharma",
    parentPhone: "98XXXXXX34",
    attendance: 95,
    performance: 91,
    lastPayment: "2026-08-18",
    notes: "Consistent performer. Good biology scores.",
  },
  {
    name: "Kabir Patel",
    course: "JEE Preparation",
    id: "STU-1003",
    batch: "JEE Main",
    phone: "96XXXXXX78",
    email: "kabir@example.com",
    totalFees: 38000,
    paidFees: 25000,
    pendingFees: 13000,
    status: "Active",
    enrollmentDate: "2026-05-05",
    parentName: "Amit Patel",
    parentPhone: "97XXXXXX55",
    attendance: 84,
    performance: 76,
    lastPayment: "2026-08-10",
    notes: "Attendance has dropped recently. Needs mentor follow-up.",
  },
  {
    name: "Ananya Singh",
    course: "NEET Preparation",
    id: "STU-1004",
    batch: "NEET 2027",
    phone: "95XXXXXX12",
    email: "ananya@example.com",
    totalFees: 10000,
    paidFees: 5000,
    pendingFees: 5000,
    status: "Pending",
    enrollmentDate: "2026-08-21",
    parentName: "Vikram Singh",
    parentPhone: "96XXXXXX67",
    attendance: 72,
    performance: 69,
    lastPayment: "2026-08-21",
    notes: "New admission. Initial academic assessment recommended.",
  },
  {
    name: "Dev Verma",
    course: "Foundation",
    id: "STU-1005",
    batch: "Foundation 2027",
    phone: "94XXXXXX31",
    email: "dev@example.com",
    totalFees: 30000,
    paidFees: 30000,
    pendingFees: 0,
    status: "Active",
    enrollmentDate: "2026-02-10",
    parentName: "Manoj Verma",
    parentPhone: "93XXXXXX44",
    attendance: 97,
    performance: 94,
    lastPayment: "2026-07-28",
    notes: "Excellent attendance and academic progress.",
  },
  {
    name: "Ishita Rao",
    course: "JEE Preparation",
    id: "STU-1006",
    batch: "JEE Advanced",
    phone: "93XXXXXX88",
    email: "ishita@example.com",
    totalFees: 45000,
    paidFees: 21000,
    pendingFees: 24000,
    status: "Active",
    enrollmentDate: "2026-06-02",
    parentName: "Nitin Rao",
    parentPhone: "92XXXXXX10",
    attendance: 81,
    performance: 73,
    lastPayment: "2026-07-12",
    notes: "Fee follow-up required. Academic performance is improving.",
  },
];

const courses = [
  "JEE Preparation",
  "NEET Preparation",
  "Foundation",
];

const batches = [
  "JEE Advanced",
  "JEE Main",
  "NEET 2027",
  "Foundation 2027",
];

const statuses: StudentStatus[] = [
  "Active",
  "Inactive",
  "Pending",
];

const studentsPerPage = 8;

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getFeeProgress(student: Student) {
  if (student.totalFees <= 0) {
    return 0;
  }

  return Math.min(
    Math.max(Math.round((student.paidFees / student.totalFees) * 100), 0),
    100,
  );
}

function getRiskLevel(student: Student) {
  if (student.attendance < 70 || student.performance < 65) {
    return "High";
  }

  if (
    student.attendance < 80 ||
    student.performance < 75 ||
    student.pendingFees > student.totalFees * 0.5
  ) {
    return "Medium";
  }

  return "Low";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function StudentsPage() {
  const [studentList, setStudentList] = useState<Student[]>(initialStudents);

  const [searchTerm, setSearchTerm] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [feeFilter, setFeeFilter] = useState("");

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(
    null,
  );

  const [viewingStudentId, setViewingStudentId] = useState<string | null>(
    null,
  );

  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const [showBulkMenu, setShowBulkMenu] = useState(false);

  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiStudentId, setAiStudentId] = useState<string | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  const [formError, setFormError] = useState("");

  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentCourse, setStudentCourse] = useState("");
  const [studentBatch, setStudentBatch] = useState("");
  const [studentFees, setStudentFees] = useState("");
  const [studentParentName, setStudentParentName] = useState("");
  const [studentParentPhone, setStudentParentPhone] = useState("");
  const [studentEnrollmentDate, setStudentEnrollmentDate] = useState("");
  const [studentNotes, setStudentNotes] = useState("");

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const filteredStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return studentList.filter((student) => {
      const matchesSearch =
        !search ||
        student.name.toLowerCase().includes(search) ||
        student.id.toLowerCase().includes(search) ||
        student.phone.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search) ||
        student.parentName.toLowerCase().includes(search);

      const matchesBatch =
        !batchFilter || student.batch === batchFilter;

      const matchesCourse =
        !courseFilter || student.course === courseFilter;

      const matchesStatus =
        !statusFilter || student.status === statusFilter;

      const matchesFee =
        !feeFilter ||
        (feeFilter === "paid" && student.pendingFees === 0) ||
        (feeFilter === "pending" && student.pendingFees > 0) ||
        (feeFilter === "overdue" &&
          student.pendingFees > student.totalFees * 0.5);

      return (
        matchesSearch &&
        matchesBatch &&
        matchesCourse &&
        matchesStatus &&
        matchesFee
      );
    });
  }, [
    studentList,
    searchTerm,
    batchFilter,
    courseFilter,
    statusFilter,
    feeFilter,
  ]);

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;

        case "totalFees":
          comparison = a.totalFees - b.totalFees;
          break;

        case "pendingFees":
          comparison = a.pendingFees - b.pendingFees;
          break;

        case "attendance":
          comparison = a.attendance - b.attendance;
          break;

        case "performance":
          comparison = a.performance - b.performance;
          break;

        case "feeProgress":
          comparison =
            getFeeProgress(a) - getFeeProgress(b);
          break;

        case "status":
          comparison = a.status.localeCompare(b.status);
          break;

        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredStudents, sortBy, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedStudents.length / studentsPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex =
    (safeCurrentPage - 1) * studentsPerPage;

  const paginatedStudents = sortedStudents.slice(
    startIndex,
    startIndex + studentsPerPage,
  );

  const totalStudents = studentList.length;

  const activeStudents = studentList.filter(
    (student) => student.status === "Active",
  ).length;

  const pendingStudents = studentList.filter(
    (student) => student.status === "Pending",
  ).length;

  const totalPendingFees = studentList.reduce(
    (sum, student) => sum + student.pendingFees,
    0,
  );

  const averageAttendance =
    studentList.length > 0
      ? Math.round(
          studentList.reduce(
            (sum, student) => sum + student.attendance,
            0,
          ) / studentList.length,
        )
      : 0;

  const atRiskStudents = studentList.filter(
    (student) => getRiskLevel(student) !== "Low",
  ).length;

  const clearFilters = () => {
    setSearchTerm("");
    setBatchFilter("");
    setCourseFilter("");
    setStatusFilter("");
    setFeeFilter("");
    setCurrentPage(1);
  };

  const resetForm = () => {
    setStudentName("");
    setStudentPhone("");
    setStudentEmail("");
    setStudentCourse("");
    setStudentBatch("");
    setStudentFees("");
    setStudentParentName("");
    setStudentParentPhone("");
    setStudentEnrollmentDate("");
    setStudentNotes("");
    setFormError("");
    setEditingStudentId(null);
  };

  const openAddStudent = () => {
    resetForm();
    setShowAddStudent(true);
  };

  const editStudent = (studentId: string) => {
    const student = studentList.find(
      (item) => item.id === studentId,
    );

    if (!student) {
      return;
    }

    setEditingStudentId(student.id);
    setStudentName(student.name);
    setStudentPhone(student.phone);
    setStudentEmail(student.email);
    setStudentCourse(student.course);
    setStudentBatch(student.batch);
    setStudentFees(String(student.totalFees));
    setStudentParentName(student.parentName);
    setStudentParentPhone(student.parentPhone);
    setStudentEnrollmentDate(student.enrollmentDate);
    setStudentNotes(student.notes);
    setFormError("");
    setOpenActionMenu(null);
    setShowAddStudent(true);
  };

  const saveStudent = () => {
    if (!studentName.trim()) {
      setFormError("Please enter the student's full name.");
      return;
    }

    if (!studentPhone.trim()) {
      setFormError("Please enter the student's phone number.");
      return;
    }

    if (!studentCourse) {
      setFormError("Please select a course.");
      return;
    }

    if (!studentBatch) {
      setFormError("Please select a batch.");
      return;
    }

    const fees = Number(studentFees);

    if (!studentFees.trim() || Number.isNaN(fees) || fees < 0) {
      setFormError("Please enter a valid total fee amount.");
      return;
    }

    if (editingStudentId) {
      setStudentList((currentStudents) =>
        currentStudents.map((student) => {
          if (student.id !== editingStudentId) {
            return student;
          }

          const pendingFees = Math.max(
            fees - student.paidFees,
            0,
          );

          return {
            ...student,
            name: studentName.trim(),
            phone: studentPhone.trim(),
            email: studentEmail.trim(),
            course: studentCourse,
            batch: studentBatch,
            totalFees: fees,
            pendingFees,
            parentName: studentParentName.trim(),
            parentPhone: studentParentPhone.trim(),
            enrollmentDate:
              studentEnrollmentDate ||
              student.enrollmentDate,
            notes: studentNotes.trim(),
          };
        }),
      );

      showToast("Student updated successfully.");
    } else {
      const highestId = studentList.reduce(
        (highest, student) => {
          const numericId = Number(
            student.id.replace("STU-", ""),
          );

          return Number.isNaN(numericId)
            ? highest
            : Math.max(highest, numericId);
        },
        1000,
      );

      const newStudent: Student = {
        name: studentName.trim(),
        course: studentCourse,
        id: `STU-${highestId + 1}`,
        batch: studentBatch,
        phone: studentPhone.trim(),
        email: studentEmail.trim(),
        totalFees: fees,
        paidFees: 0,
        pendingFees: fees,
        status: "Active",
        enrollmentDate:
          studentEnrollmentDate ||
          new Date().toISOString().slice(0, 10),
        parentName: studentParentName.trim(),
        parentPhone: studentParentPhone.trim(),
        attendance: 0,
        performance: 0,
        lastPayment: "",
        notes: studentNotes.trim(),
      };

      setStudentList((currentStudents) => [
        ...currentStudents,
        newStudent,
      ]);

      showToast("Student added successfully.");
    }

    resetForm();
    setShowAddStudent(false);
  };

  const deleteStudent = (studentId: string) => {
    setStudentList((currentStudents) =>
      currentStudents.filter(
        (student) => student.id !== studentId,
      ),
    );

    setSelectedStudents((current) =>
      current.filter((id) => id !== studentId),
    );

    setOpenActionMenu(null);
    setShowDeleteConfirm(null);
    showToast("Student deleted.");
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((current) =>
      current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId],
    );
  };

  const toggleSelectAll = () => {
    const pageIds = paginatedStudents.map(
      (student) => student.id,
    );

    const allSelected = pageIds.every((id) =>
      selectedStudents.includes(id),
    );

    if (allSelected) {
      setSelectedStudents((current) =>
        current.filter((id) => !pageIds.includes(id)),
      );
    } else {
      setSelectedStudents((current) => [
        ...new Set([...current, ...pageIds]),
      ]);
    }
  };

  const bulkUpdateStatus = (status: StudentStatus) => {
    if (selectedStudents.length === 0) {
      return;
    }

    setStudentList((currentStudents) =>
      currentStudents.map((student) =>
        selectedStudents.includes(student.id)
          ? { ...student, status }
          : student,
      ),
    );

    showToast(
      `${selectedStudents.length} student(s) updated.`,
    );

    setSelectedStudents([]);
    setShowBulkMenu(false);
  };

  const exportStudents = () => {
    const headers = [
      "Student ID",
      "Name",
      "Course",
      "Batch",
      "Phone",
      "Email",
      "Status",
      "Total Fees",
      "Paid Fees",
      "Pending Fees",
      "Attendance",
      "Performance",
    ];

    const rows = sortedStudents.map((student) => [
      student.id,
      student.name,
      student.course,
      student.batch,
      student.phone,
      student.email,
      student.status,
      student.totalFees,
      student.paidFees,
      student.pendingFees,
      `${student.attendance}%`,
      `${student.performance}%`,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "students.csv";
    link.click();

    URL.revokeObjectURL(url);

    showToast("Student data exported.");
  };

  const refreshStudents = () => {
    setStudentList([...studentList]);
    showToast("Student data refreshed.");
  };

  const selectedStudent = aiStudentId
    ? studentList.find(
        (student) => student.id === aiStudentId,
      )
    : null;

  const viewedStudent = viewingStudentId
    ? studentList.find(
        (student) => student.id === viewingStudentId,
      )
    : null;

  const allCurrentPageSelected =
    paginatedStudents.length > 0 &&
    paginatedStudents.every((student) =>
      selectedStudents.includes(student.id),
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-0 min-h-screen p-4 sm:p-6 lg:ml-64 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Users size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Students
                </h1>

                <p className="mt-0.5 text-sm text-slate-500">
                  Manage enrollment, fees, attendance and student
                  performance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={refreshStudents}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              type="button"
              onClick={exportStudents}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Download size={16} />
              Export
            </button>

            <button
              type="button"
              onClick={() => setShowAiPanel(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
            >
              <Sparkles size={16} />
              AI Insights
            </button>

            <button
              type="button"
              onClick={openAddStudent}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Student
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Students
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users size={18} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {totalStudents.toLocaleString("en-IN")}
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600">
              <TrendingUp size={13} />
              12.5% this month
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Active Students
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <UserCheck size={18} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {activeStudents}
            </p>

            <p className="mt-2 text-xs font-semibold text-green-600">
              {totalStudents
                ? Math.round(
                    (activeStudents / totalStudents) * 100,
                  )
                : 0}
              % of current records
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Pending Fees
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <IndianRupee size={18} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {formatCurrency(totalPendingFees)}
            </p>

            <p className="mt-2 text-xs font-semibold text-orange-600">
              {pendingStudents} pending admissions/status
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Avg. Attendance
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <Activity size={18} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {averageAttendance}%
            </p>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-cyan-500"
                style={{
                  width: `${averageAttendance}%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-purple-700">
                AI Risk Signals
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <Brain size={18} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {atRiskStudents}
            </p>

            <p className="mt-2 text-xs font-semibold text-purple-700">
              Students needing attention
            </p>
          </div>
        </div>

        {/* AI Command Center */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 via-white to-blue-50 shadow-sm">
          <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
                <Sparkles size={20} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    AI Student Command Center
                  </h2>

                  <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-purple-700">
                    AI Ready
                  </span>
                </div>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                  Identify attendance risk, academic risk and fee-risk
                  patterns now. Real AI recommendations can be connected
                  to the backend later.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                    {atRiskStudents} risk signals
                  </span>

                  <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                    {averageAttendance}% avg attendance
                  </span>

                  <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                    Fee monitoring active
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAiPanel(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              <Brain size={16} />
              Open AI Insights
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
            <div className="min-w-0 flex-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Search
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search name, student ID, phone, email or parent..."
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:w-[620px]">
              <select
                value={batchFilter}
                onChange={(event) => {
                  setBatchFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Batches</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>

              <select
                value={courseFilter}
                onChange={(event) => {
                  setCourseFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={feeFilter}
                onChange={(event) => {
                  setFeeFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Fee Status</option>
                <option value="paid">Fully Paid</option>
                <option value="pending">Payment Pending</option>
                <option value="overdue">High Pending</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="name">Sort: Name</option>
                <option value="totalFees">Sort: Total Fees</option>
                <option value="pendingFees">
                  Sort: Pending Fees
                </option>
                <option value="feeProgress">
                  Sort: Fee Progress
                </option>
                <option value="attendance">
                  Sort: Attendance
                </option>
                <option value="performance">
                  Sort: Performance
                </option>
                <option value="status">Sort: Status</option>
              </select>

              <button
                type="button"
                onClick={() =>
                  setSortOrder((current) =>
                    current === "asc" ? "desc" : "asc",
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {sortOrder === "asc" ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}
                {sortOrder === "asc"
                  ? "Ascending"
                  : "Descending"}
              </button>

              {(searchTerm ||
                batchFilter ||
                courseFilter ||
                statusFilter ||
                feeFilter) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  <X size={13} />
                  Clear Filters
                </button>
              )}
            </div>

            <p className="text-xs font-medium text-slate-500">
              Showing {sortedStudents.length} matching student
              {sortedStudents.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {/* Bulk Toolbar */}
        {selectedStudents.length > 0 && (
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Check size={17} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  {selectedStudents.length} selected
                </p>

                <p className="text-xs text-slate-500">
                  Choose a bulk action for the selected students.
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowBulkMenu((current) => !current)
                }
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Bulk Actions
                <ChevronDown size={15} />
              </button>

              {showBulkMenu && (
                <div className="absolute right-0 top-12 z-30 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={() =>
                      bulkUpdateStatus("Active")
                    }
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Mark Active
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      bulkUpdateStatus("Inactive")
                    }
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Mark Inactive
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      bulkUpdateStatus("Pending")
                    }
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Mark Pending
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Student Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                All Students
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage registered students, fees and performance.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                {sortedStudents.length} Students
              </span>

              {selectedStudents.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedStudents([])}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          {paginatedStudents.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Search size={24} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">
                No students found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                Try changing your search or filters, or add a new
                student.
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Clear Filters
                </button>

                <button
                  type="button"
                  onClick={openAddStudent}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Add Student
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1180px] text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="w-12 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={allCurrentPageSelected}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          aria-label="Select all students on this page"
                        />
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Student
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Course / Batch
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Fees
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Attendance
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Performance
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        AI Risk
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedStudents.map((student) => {
                      const feeProgress =
                        getFeeProgress(student);

                      const risk = getRiskLevel(student);

                      return (
                        <tr
                          key={student.id}
                          className="border-b border-slate-100 transition-colors last:border-0 hover:bg-blue-50/40"
                        >
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(
                                student.id,
                              )}
                              onChange={() =>
                                toggleStudentSelection(
                                  student.id,
                                )
                              }
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              aria-label={`Select ${student.name}`}
                            />
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700">
                                {getInitials(student.name)}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-slate-900">
                                  {student.name}
                                </p>

                                <div className="mt-1 flex items-center gap-2">
                                  <span className="text-xs font-medium text-slate-500">
                                    {student.id}
                                  </span>

                                  <span className="h-1 w-1 rounded-full bg-slate-300" />

                                  <span className="text-xs text-slate-400">
                                    Joined{" "}
                                    {formatDate(
                                      student.enrollmentDate,
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <p className="text-sm font-semibold text-slate-800">
                              {student.course}
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-500">
                              {student.batch}
                            </p>
                          </td>

                          <td className="px-4 py-4">
                            <div className="w-44">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-bold text-slate-900">
                                  {formatCurrency(
                                    student.totalFees,
                                  )}
                                </span>

                                <span className="text-xs font-bold text-slate-500">
                                  {feeProgress}%
                                </span>
                              </div>

                              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-blue-500 transition-all"
                                  style={{
                                    width: `${feeProgress}%`,
                                  }}
                                />
                              </div>

                              <div className="mt-1.5 flex justify-between text-[11px]">
                                <span className="font-medium text-green-600">
                                  Paid{" "}
                                  {formatCurrency(
                                    student.paidFees,
                                  )}
                                </span>

                                <span className="font-medium text-orange-600">
                                  Due{" "}
                                  {formatCurrency(
                                    student.pendingFees,
                                  )}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="w-28">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-800">
                                  {student.attendance}%
                                </span>

                                {student.attendance >= 85 ? (
                                  <TrendingUp
                                    size={14}
                                    className="text-green-500"
                                  />
                                ) : (
                                  <TrendingDown
                                    size={14}
                                    className="text-orange-500"
                                  />
                                )}
                              </div>

                              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full rounded-full ${
                                    student.attendance >= 85
                                      ? "bg-green-500"
                                      : student.attendance >=
                                          75
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{
                                    width: `${student.attendance}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="w-28">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-800">
                                  {student.performance}%
                                </span>

                                <BarChart3
                                  size={14}
                                  className="text-blue-500"
                                />
                              </div>

                              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full rounded-full ${
                                    student.performance >=
                                    85
                                      ? "bg-blue-500"
                                      : student.performance >=
                                          70
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{
                                    width: `${student.performance}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            {risk === "High" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                                <ShieldAlert size={13} />
                                High
                              </span>
                            ) : risk === "Medium" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
                                <AlertCircle size={13} />
                                Medium
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                                <CheckCircle2 size={13} />
                                Low
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                student.status === "Active"
                                  ? "bg-green-50 text-green-600"
                                  : student.status ===
                                      "Pending"
                                    ? "bg-orange-50 text-orange-600"
                                    : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {student.status}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="relative flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setViewingStudentId(
                                    student.id,
                                  )
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                              >
                                <Eye size={13} />
                                View
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setAiStudentId(
                                    student.id,
                                  )
                                }
                                className="rounded-lg border border-purple-200 bg-purple-50 p-2 text-purple-600 transition hover:bg-purple-100"
                                aria-label={`AI insights for ${student.name}`}
                              >
                                <Sparkles size={14} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setOpenActionMenu(
                                    openActionMenu ===
                                      student.id
                                      ? null
                                      : student.id,
                                  )
                                }
                                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                                aria-label={`More actions for ${student.name}`}
                              >
                                <MoreHorizontal
                                  size={16}
                                />
                              </button>

                              {openActionMenu ===
                                student.id && (
                                <div className="absolute right-0 top-10 z-30 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setViewingStudentId(
                                        student.id,
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                  >
                                    <Eye size={14} />
                                    View Profile
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      editStudent(
                                        student.id,
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                  >
                                    <Edit3 size={14} />
                                    Edit Student
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setAiStudentId(
                                        student.id,
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-purple-700 hover:bg-purple-50"
                                  >
                                    <Sparkles size={14} />
                                    AI Insights
                                  </button>

                                  <div className="my-1 border-t border-slate-100" />

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowDeleteConfirm(
                                        student.id,
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 size={14} />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-bold text-slate-900">
                    {sortedStudents.length === 0
                      ? 0
                      : startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-slate-900">
                    {Math.min(
                      startIndex + studentsPerPage,
                      sortedStudents.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-900">
                    {sortedStudents.length}
                  </span>{" "}
                  students
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={safeCurrentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(page - 1, 1),
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={14} />
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        setCurrentPage(page)
                      }
                      className={`h-9 min-w-9 rounded-lg px-3 text-xs font-bold transition ${
                        safeCurrentPage === page
                          ? "bg-blue-600 text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={
                      safeCurrentPage === totalPages
                    }
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(
                          page + 1,
                          totalPages,
                        ),
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Add / Edit Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingStudentId
                    ? "Edit Student"
                    : "Add New Student"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add the student's profile, academic and parent
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowAddStudent(false);
                }}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">
              {formError && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <User size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Student Information
                      </h3>

                      <p className="text-xs text-slate-500">
                        Basic student profile details.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={studentName}
                    onChange={(event) =>
                      setStudentName(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Phone *
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={studentPhone}
                    onChange={(event) =>
                      setStudentPhone(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={studentEmail}
                    onChange={(event) =>
                      setStudentEmail(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Enrollment Date
                  </label>

                  <input
                    type="date"
                    value={studentEnrollmentDate}
                    onChange={(event) =>
                      setStudentEnrollmentDate(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Course *
                  </label>

                  <select
                    value={studentCourse}
                    onChange={(event) =>
                      setStudentCourse(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select Course</option>

                    {courses.map((course) => (
                      <option
                        key={course}
                        value={course}
                      >
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Batch *
                  </label>

                  <select
                    value={studentBatch}
                    onChange={(event) =>
                      setStudentBatch(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select Batch</option>

                    {batches.map((batch) => (
                      <option
                        key={batch}
                        value={batch}
                      >
                        {batch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Total Fees *
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="Enter total fees"
                    value={studentFees}
                    onChange={(event) =>
                      setStudentFees(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="md:col-span-2 mt-2 border-t border-slate-100 pt-5">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <Users size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Parent / Guardian
                      </h3>

                      <p className="text-xs text-slate-500">
                        Used for communication and future
                        notifications.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Parent / Guardian Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter parent name"
                    value={studentParentName}
                    onChange={(event) =>
                      setStudentParentName(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Parent Phone
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter parent phone"
                    value={studentParentPhone}
                    onChange={(event) =>
                      setStudentParentPhone(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Internal Notes
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Add mentor notes, academic observations or other useful information..."
                    value={studentNotes}
                    onChange={(event) =>
                      setStudentNotes(event.target.value)
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowAddStudent(false);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveStudent}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                {editingStudentId
                  ? "Update Student"
                  : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Profile Modal */}
      {viewedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                  {getInitials(viewedStudent.name)}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {viewedStudent.name}
                  </h2>

                  <p className="text-xs font-medium text-slate-500">
                    {viewedStudent.id} ·{" "}
                    {viewedStudent.course}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setViewingStudentId(null)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs font-semibold text-blue-600">
                    Attendance
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {viewedStudent.attendance}%
                  </p>
                </div>

                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-xs font-semibold text-purple-600">
                    Performance
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {viewedStudent.performance}%
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-semibold text-green-600">
                    Paid Fees
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatCurrency(
                      viewedStudent.paidFees,
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-4">
                  <p className="text-xs font-semibold text-orange-600">
                    Pending Fees
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatCurrency(
                      viewedStudent.pendingFees,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-sm font-bold text-slate-900">
                    Student Information
                  </h3>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone
                        size={16}
                        className="text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-500">
                          Phone
                        </p>

                        <p className="text-sm font-semibold text-slate-900">
                          {viewedStudent.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail
                        size={16}
                        className="text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-500">
                          Email
                        </p>

                        <p className="break-all text-sm font-semibold text-slate-900">
                          {viewedStudent.email ||
                            "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays
                        size={16}
                        className="text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-500">
                          Enrollment
                        </p>

                        <p className="text-sm font-semibold text-slate-900">
                          {formatDate(
                            viewedStudent.enrollmentDate,
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FileText
                        size={16}
                        className="text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-500">
                          Batch
                        </p>

                        <p className="text-sm font-semibold text-slate-900">
                          {viewedStudent.batch}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-sm font-bold text-slate-900">
                    Parent / Guardian
                  </h3>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <User
                        size={16}
                        className="text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-500">
                          Name
                        </p>

                        <p className="text-sm font-semibold text-slate-900">
                          {viewedStudent.parentName ||
                            "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone
                        size={16}
                        className="text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-500">
                          Phone
                        </p>

                        <p className="text-sm font-semibold text-slate-900">
                          {viewedStudent.parentPhone ||
                            "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-purple-50 p-4">
                      <div className="flex items-center gap-2">
                        <Sparkles
                          size={15}
                          className="text-purple-600"
                        />

                        <p className="text-xs font-bold text-purple-700">
                          AI Risk Level
                        </p>
                      </div>

                      <p className="mt-2 text-sm font-bold text-slate-900">
                        {getRiskLevel(viewedStudent)} Risk
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900">
                  Fees
                </h3>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-500">
                      Fee completion
                    </span>

                    <span className="font-bold text-slate-900">
                      {getFeeProgress(viewedStudent)}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${getFeeProgress(
                          viewedStudent,
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        Total
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {formatCurrency(
                          viewedStudent.totalFees,
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-50 p-3">
                      <p className="text-xs text-green-600">
                        Paid
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {formatCurrency(
                          viewedStudent.paidFees,
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl bg-orange-50 p-3">
                      <p className="text-xs text-orange-600">
                        Pending
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {formatCurrency(
                          viewedStudent.pendingFees,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900">
                  Mentor Notes
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {viewedStudent.notes ||
                    "No notes have been added yet."}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setViewingStudentId(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewingStudentId(null);
                  editStudent(viewedStudent.id);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Edit3 size={15} />
                Edit Student
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewingStudentId(null);
                  setAiStudentId(viewedStudent.id);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
              >
                <Sparkles size={15} />
                AI Insights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-white">
                  <Brain size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    AI Student Insights
                  </h2>

                  <p className="text-xs text-slate-500">
                    {selectedStudent.name} ·{" "}
                    {selectedStudent.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAiStudentId(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">
              <div
                className={`rounded-2xl border p-5 ${
                  getRiskLevel(selectedStudent) === "High"
                    ? "border-red-200 bg-red-50"
                    : getRiskLevel(selectedStudent) ===
                        "Medium"
                      ? "border-orange-200 bg-orange-50"
                      : "border-green-200 bg-green-50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Current AI risk signal
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {getRiskLevel(selectedStudent)} Risk
                    </p>
                  </div>

                  <Sparkles
                    size={22}
                    className="text-purple-600"
                  />
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This is a rule-based demonstration of the future
                  AI layer. In production, these insights can be
                  generated from attendance, exams, payments,
                  engagement and learning data.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Attendance
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {selectedStudent.attendance}%
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Performance
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {selectedStudent.performance}%
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Pending Fees
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {formatCurrency(
                      selectedStudent.pendingFees,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Recommended Actions
                </h3>

                {selectedStudent.attendance < 80 && (
                  <div className="flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
                    <Clock3
                      size={17}
                      className="mt-0.5 shrink-0 text-orange-600"
                    />

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Attendance intervention
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Consider mentor follow-up and parent
                        communication regarding recent attendance.
                      </p>
                    </div>
                  </div>
                )}

                {selectedStudent.performance < 75 && (
                  <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <BarChart3
                      size={17}
                      className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Academic support recommended
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Schedule a mentor review and identify weak
                        subjects from exam-level analytics.
                      </p>
                    </div>
                  </div>
                )}

                {selectedStudent.pendingFees >
                  selectedStudent.totalFees * 0.5 && (
                  <div className="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                    <IndianRupee
                      size={17}
                      className="mt-0.5 shrink-0 text-yellow-700"
                    />

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Fee follow-up recommended
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        More than half of the configured fee amount
                        remains pending. A payment reminder may be
                        appropriate.
                      </p>
                    </div>
                  </div>
                )}

                {selectedStudent.attendance >= 85 &&
                  selectedStudent.performance >= 85 && (
                    <div className="flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Strong overall trajectory
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          Attendance and performance are both strong.
                          Consider enrichment or advanced practice.
                        </p>
                      </div>
                    </div>
                  )}
              </div>

              <div className="mt-5 rounded-xl border border-purple-200 bg-purple-50 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={15}
                    className="text-purple-600"
                  />

                  <p className="text-xs font-bold text-purple-700">
                    Future AI capabilities
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    Predict attendance risk
                  </span>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    Predict academic risk
                  </span>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    Recommend interventions
                  </span>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    Generate parent summaries
                  </span>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    Detect fee-payment risk
                  </span>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    Personalized study plans
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setAiStudentId(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Overview Panel */}
      {showAiPanel && (
        <div className="fixed inset-0 z-[55] flex items-center justify-end bg-slate-950/30 backdrop-blur-[2px]">
          <div className="h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
                  <Sparkles size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    AI Insights
                  </h2>

                  <p className="text-xs text-slate-500">
                    Student intelligence center
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAiPanel(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-center gap-2">
                  <ShieldAlert
                    size={17}
                    className="text-red-600"
                  />

                  <h3 className="text-sm font-bold text-slate-900">
                    High-priority attention
                  </h3>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  {studentList.filter(
                    (student) =>
                      getRiskLevel(student) === "High",
                  ).length}{" "}
                  student(s) currently show high-risk signals.
                </p>

                <div className="mt-3 space-y-2">
                  {studentList
                    .filter(
                      (student) =>
                        getRiskLevel(student) === "High",
                    )
                    .map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() =>
                          setAiStudentId(student.id)
                        }
                        className="flex w-full items-center justify-between rounded-xl bg-white p-3 text-left transition hover:shadow-sm"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {student.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Attendance{" "}
                            {student.attendance}% · Performance{" "}
                            {student.performance}%
                          </p>
                        </div>

                        <ChevronRight
                          size={16}
                          className="text-slate-400"
                        />
                      </button>
                    ))}
                </div>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
                <div className="flex items-center gap-2">
                  <IndianRupee
                    size={17}
                    className="text-orange-600"
                  />

                  <h3 className="text-sm font-bold text-slate-900">
                    Fee risk
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Total pending student fees currently represented
                  in this demo dataset are{" "}
                  <span className="font-bold text-slate-900">
                    {formatCurrency(totalPendingFees)}
                  </span>
                  .
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setFeeFilter("pending");
                    setShowAiPanel(false);
                    setCurrentPage(1);
                  }}
                  className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-orange-700 hover:bg-orange-100"
                >
                  View payment-risk students
                </button>
              </div>

              <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-green-600"
                  />

                  <h3 className="text-sm font-bold text-slate-900">
                    Positive signals
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Students with strong attendance and performance
                  can be candidates for advanced practice,
                  recognition or mentoring opportunities.
                </p>
              </div>

              <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
                <div className="flex items-center gap-2">
                  <Brain
                    size={17}
                    className="text-purple-600"
                  />

                  <h3 className="text-sm font-bold text-slate-900">
                    AI roadmap for Students
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    "Student risk prediction",
                    "Personalized study recommendations",
                    "Attendance intervention prediction",
                    "Exam performance forecasting",
                    "Parent communication summaries",
                    "Fee payment risk prediction",
                    "Student engagement scoring",
                    "AI mentor assistant",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5"
                    >
                      <Check
                        size={14}
                        className="text-purple-600"
                      />

                      <span className="text-xs font-semibold text-slate-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={20} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Delete student?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This will remove the student from the current demo
              dataset. In the production backend, deletion should
              use proper permissions, audit logs and soft-delete
              rules.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirm(null)
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteStudent(showDeleteConfirm)
                }
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] flex max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <Check size={16} />
          </div>

          <p className="text-sm font-semibold text-slate-800">
            {toast}
          </p>
        </div>
      )}
    </div>
  );
}

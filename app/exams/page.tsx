"use client";

import { useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  CalendarDays,
  Clock3,
  CheckCircle2,
  CircleDot,
  FileText,
  Users,
  BookOpen,
  X,
  Save,
  Play,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  ClipboardList,
  Award,
  Timer,
  AlertCircle,
} from "lucide-react";

type ExamStatus = "Upcoming" | "Ongoing" | "Completed";
type ExamMode = "Online" | "Offline" | "Hybrid";

type Exam = {
  id: string;
  name: string;
  course: string;
  batch: string;
  examDate: string;
  startTime: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: number;
  mode: ExamMode;
  status: ExamStatus;
  students: number;
  instructions: string;
  createdAt: string;
};

const initialExams: Exam[] = [
  {
    id: "EXM-1001",
    name: "JEE Main Mock Test - 01",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    examDate: "2026-09-15",
    startTime: "10:00",
    duration: 180,
    totalMarks: 300,
    passingMarks: 120,
    questions: 90,
    mode: "Online",
    status: "Upcoming",
    students: 148,
    instructions:
      "Carry your valid student ID. Do not use calculators or mobile phones during the examination.",
    createdAt: "2026-09-01",
  },
  {
    id: "EXM-1002",
    name: "NEET Biology Unit Test",
    course: "NEET Preparation",
    batch: "NEET 2027",
    examDate: "2026-09-12",
    startTime: "09:00",
    duration: 120,
    totalMarks: 200,
    passingMarks: 80,
    questions: 50,
    mode: "Offline",
    status: "Upcoming",
    students: 176,
    instructions:
      "Students must reach the examination hall 30 minutes before the start time.",
    createdAt: "2026-09-02",
  },
  {
    id: "EXM-1003",
    name: "Physics Weekly Assessment",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    examDate: "2026-09-08",
    startTime: "11:00",
    duration: 90,
    totalMarks: 100,
    passingMarks: 40,
    questions: 30,
    mode: "Online",
    status: "Ongoing",
    students: 92,
    instructions:
      "Attempt all questions carefully. Submit before the timer reaches zero.",
    createdAt: "2026-08-28",
  },
  {
    id: "EXM-1004",
    name: "Chemistry Chapter Test",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    examDate: "2026-09-03",
    startTime: "14:00",
    duration: 60,
    totalMarks: 100,
    passingMarks: 40,
    questions: 40,
    mode: "Offline",
    status: "Completed",
    students: 124,
    instructions:
      "Students were required to carry their own stationery and student ID.",
    createdAt: "2026-08-25",
  },
  {
    id: "EXM-1005",
    name: "NEET Full Syllabus Mock",
    course: "NEET Preparation",
    batch: "NEET 2027",
    examDate: "2026-08-30",
    startTime: "09:30",
    duration: 200,
    totalMarks: 720,
    passingMarks: 288,
    questions: 180,
    mode: "Hybrid",
    status: "Completed",
    students: 164,
    instructions:
      "Follow all examination rules. Rough work must be completed only on the provided sheets.",
    createdAt: "2026-08-20",
  },
  {
    id: "EXM-1006",
    name: "Mathematics Practice Test",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    examDate: "2026-09-20",
    startTime: "15:00",
    duration: 90,
    totalMarks: 120,
    passingMarks: 48,
    questions: 30,
    mode: "Online",
    status: "Upcoming",
    students: 86,
    instructions:
      "Ensure a stable internet connection before starting the examination.",
    createdAt: "2026-09-03",
  },
  {
    id: "EXM-1007",
    name: "Biology Genetics Test",
    course: "NEET Preparation",
    batch: "NEET 2027",
    examDate: "2026-09-18",
    startTime: "10:30",
    duration: 75,
    totalMarks: 100,
    passingMarks: 40,
    questions: 50,
    mode: "Online",
    status: "Upcoming",
    students: 132,
    instructions:
      "Read every question carefully before selecting your final answer.",
    createdAt: "2026-09-03",
  },
  {
    id: "EXM-1008",
    name: "Physics Mechanics Test",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    examDate: "2026-08-25",
    startTime: "10:00",
    duration: 90,
    totalMarks: 100,
    passingMarks: 40,
    questions: 35,
    mode: "Offline",
    status: "Completed",
    students: 143,
    instructions:
      "Students must follow the invigilator's instructions throughout the examination.",
    createdAt: "2026-08-15",
  },
  {
    id: "EXM-1009",
    name: "Organic Chemistry Assessment",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    examDate: "2026-09-10",
    startTime: "13:00",
    duration: 120,
    totalMarks: 150,
    passingMarks: 60,
    questions: 50,
    mode: "Hybrid",
    status: "Upcoming",
    students: 98,
    instructions:
      "Bring your own stationery. Mobile phones must remain switched off.",
    createdAt: "2026-09-04",
  },
  {
    id: "EXM-1010",
    name: "NEET Chemistry Test",
    course: "NEET Preparation",
    batch: "NEET 2027",
    examDate: "2026-09-07",
    startTime: "09:00",
    duration: 90,
    totalMarks: 180,
    passingMarks: 72,
    questions: 45,
    mode: "Online",
    status: "Ongoing",
    students: 156,
    instructions:
      "Do not refresh the examination page after starting the test.",
    createdAt: "2026-09-04",
  },
  {
    id: "EXM-1011",
    name: "Mathematics Algebra Test",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    examDate: "2026-08-18",
    startTime: "11:00",
    duration: 75,
    totalMarks: 100,
    passingMarks: 40,
    questions: 30,
    mode: "Offline",
    status: "Completed",
    students: 139,
    instructions:
      "Students were required to submit their answer sheets before leaving.",
    createdAt: "2026-08-10",
  },
  {
    id: "EXM-1012",
    name: "NEET Physics Mock Test",
    course: "NEET Preparation",
    batch: "NEET 2027",
    examDate: "2026-09-22",
    startTime: "09:00",
    duration: 180,
    totalMarks: 180,
    passingMarks: 72,
    questions: 45,
    mode: "Online",
    status: "Upcoming",
    students: 168,
    instructions:
      "Make sure your device is fully charged and internet connectivity is stable.",
    createdAt: "2026-09-05",
  },
];

const emptyForm = {
  name: "",
  course: "",
  batch: "",
  examDate: "",
  startTime: "",
  duration: "",
  totalMarks: "",
  passingMarks: "",
  questions: "",
  mode: "Online" as ExamMode,
  instructions: "",
};

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>(initialExams);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | ExamStatus
  >("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("All");

  const [sortBy, setSortBy] = useState<
    "date" | "name" | "marks" | "students"
  >("date");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const [showForm, setShowForm] = useState(false);
  const [editingExamId, setEditingExamId] = useState<string | null>(null);

  const [viewingExam, setViewingExam] = useState<Exam | null>(null);

  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const [deleteExamId, setDeleteExamId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const courses = useMemo(
    () => Array.from(new Set(exams.map((exam) => exam.course))),
    [exams]
  );

  const batches = useMemo(
    () => Array.from(new Set(exams.map((exam) => exam.batch))),
    [exams]
  );

  const stats = useMemo(() => {
    return {
      total: exams.length,
      upcoming: exams.filter((exam) => exam.status === "Upcoming").length,
      ongoing: exams.filter((exam) => exam.status === "Ongoing").length,
      completed: exams.filter((exam) => exam.status === "Completed").length,
      totalStudents: exams.reduce((sum, exam) => sum + exam.students, 0),
    };
  }, [exams]);

  const filteredExams = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = exams.filter((exam) => {
      const matchesSearch =
        !normalizedSearch ||
        exam.name.toLowerCase().includes(normalizedSearch) ||
        exam.id.toLowerCase().includes(normalizedSearch) ||
        exam.course.toLowerCase().includes(normalizedSearch) ||
        exam.batch.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter;

      const matchesCourse =
        courseFilter === "All" || exam.course === courseFilter;

      const matchesBatch =
        batchFilter === "All" || exam.batch === batchFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCourse &&
        matchesBatch
      );
    });

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison = `${a.examDate} ${a.startTime}`.localeCompare(
          `${b.examDate} ${b.startTime}`
        );
      }

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      }

      if (sortBy === "marks") {
        comparison = a.totalMarks - b.totalMarks;
      }

      if (sortBy === "students") {
        comparison = a.students - b.students;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    exams,
    search,
    statusFilter,
    courseFilter,
    batchFilter,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExams.length / rowsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedExams = filteredExams.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage
  );

  const getStatusStyle = (status: ExamStatus) => {
    if (status === "Upcoming") {
      return {
        className:
          "bg-blue-50 text-blue-700 border-blue-100",
        icon: Clock3,
      };
    }

    if (status === "Ongoing") {
      return {
        className:
          "bg-amber-50 text-amber-700 border-amber-100",
        icon: CircleDot,
      };
    }

    return {
      className:
        "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: CheckCircle2,
    };
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const openAddForm = () => {
    setEditingExamId(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (exam: Exam) => {
    setEditingExamId(exam.id);

    setForm({
      name: exam.name,
      course: exam.course,
      batch: exam.batch,
      examDate: exam.examDate,
      startTime: exam.startTime,
      duration: String(exam.duration),
      totalMarks: String(exam.totalMarks),
      passingMarks: String(exam.passingMarks),
      questions: String(exam.questions),
      mode: exam.mode,
      instructions: exam.instructions,
    });

    setFormError("");
    setShowForm(true);
    setActionMenuId(null);
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Exam name is required.";
    }

    if (!form.course.trim()) {
      return "Course is required.";
    }

    if (!form.batch.trim()) {
      return "Batch is required.";
    }

    if (!form.examDate) {
      return "Exam date is required.";
    }

    if (!form.startTime) {
      return "Start time is required.";
    }

    const duration = Number(form.duration);
    const totalMarks = Number(form.totalMarks);
    const passingMarks = Number(form.passingMarks);
    const questions = Number(form.questions);

    if (!duration || duration <= 0) {
      return "Duration must be greater than 0.";
    }

    if (!totalMarks || totalMarks <= 0) {
      return "Total marks must be greater than 0.";
    }

    if (!questions || questions <= 0) {
      return "Number of questions must be greater than 0.";
    }

    if (passingMarks < 0 || passingMarks > totalMarks) {
      return "Passing marks must be between 0 and total marks.";
    }

    return "";
  };

  const handleSaveExam = () => {
    const error = validateForm();

    if (error) {
      setFormError(error);
      return;
    }

    const duration = Number(form.duration);
    const totalMarks = Number(form.totalMarks);
    const passingMarks = Number(form.passingMarks);
    const questions = Number(form.questions);

    if (editingExamId) {
      setExams((current) =>
        current.map((exam) =>
          exam.id === editingExamId
            ? {
                ...exam,
                name: form.name.trim(),
                course: form.course.trim(),
                batch: form.batch.trim(),
                examDate: form.examDate,
                startTime: form.startTime,
                duration,
                totalMarks,
                passingMarks,
                questions,
                mode: form.mode,
                instructions: form.instructions.trim(),
              }
            : exam
        )
      );
    } else {
      const newNumber =
        Math.max(
          ...exams.map((exam) => {
            const number = Number(
              exam.id.replace("EXM-", "")
            );
            return Number.isFinite(number) ? number : 1000;
          }),
          1000
        ) + 1;

      const newExam: Exam = {
        id: `EXM-${newNumber}`,
        name: form.name.trim(),
        course: form.course.trim(),
        batch: form.batch.trim(),
        examDate: form.examDate,
        startTime: form.startTime,
        duration,
        totalMarks,
        passingMarks,
        questions,
        mode: form.mode,
        status: "Upcoming",
        students: 0,
        instructions: form.instructions.trim(),
        createdAt: new Date().toISOString().split("T")[0],
      };

      setExams((current) => [newExam, ...current]);
    }

    setShowForm(false);
    setEditingExamId(null);
    setForm(emptyForm);
    setFormError("");
    setCurrentPage(1);
  };

  const handleDeleteExam = () => {
    if (!deleteExamId) return;

    setExams((current) =>
      current.filter((exam) => exam.id !== deleteExamId)
    );

    setDeleteExamId(null);
    setActionMenuId(null);

    setCurrentPage(1);
  };

  const handleStartExam = (examId: string) => {
    setExams((current) =>
      current.map((exam) =>
        exam.id === examId
          ? { ...exam, status: "Ongoing" }
          : exam
      )
    );

    setActionMenuId(null);
    setViewingExam(null);
  };

  const handleCompleteExam = (examId: string) => {
    setExams((current) =>
      current.map((exam) =>
        exam.id === examId
          ? { ...exam, status: "Completed" }
          : exam
      )
    );

    setActionMenuId(null);
    setViewingExam(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCourseFilter("All");
    setBatchFilter("All");
    setCurrentPage(1);
  };

  const hasFilters =
    search ||
    statusFilter !== "All" ||
    courseFilter !== "All" ||
    batchFilter !== "All";

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <FileText size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Exams
                </h1>

                <p className="text-sm text-slate-500">
                  Create, manage and monitor examinations.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Exam
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ClipboardList size={20} />
              </div>

              <span className="text-xs font-semibold text-slate-400">
                ALL
              </span>
            </div>

            <p className="text-sm text-slate-500">
              Total Exams
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {stats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Clock3 size={20} />
              </div>

              <span className="text-xs font-semibold text-blue-600">
                UPCOMING
              </span>
            </div>

            <p className="text-sm text-slate-500">
              Upcoming
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {stats.upcoming}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <CircleDot size={20} />
              </div>

              <span className="text-xs font-semibold text-amber-600">
                LIVE
              </span>
            </div>

            <p className="text-sm text-slate-500">
              Ongoing
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {stats.ongoing}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                DONE
              </span>
            </div>

            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {stats.completed}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users size={20} />
              </div>

              <span className="text-xs font-semibold text-purple-600">
                ENROLLMENTS
              </span>
            </div>

            <p className="text-sm text-slate-500">
              Exam Registrations
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {stats.totalStudents.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-500" />

              <h2 className="text-sm font-bold text-slate-900">
                Filters
              </h2>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search exam, ID, course..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(
                  event.target.value as "All" | ExamStatus
                );
                setCurrentPage(1);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={courseFilter}
              onChange={(event) => {
                setCourseFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Courses</option>

              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <select
              value={batchFilter}
              onChange={(event) => {
                setBatchFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Batches</option>

              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Exams
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage examinations, schedules and assessments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(
                    event.target.value as
                      | "date"
                      | "name"
                      | "marks"
                      | "students"
                  );
                  setCurrentPage(1);
                }}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="marks">Sort by Marks</option>
                <option value="students">Sort by Students</option>
              </select>

              <button
                onClick={() =>
                  setSortOrder((current) =>
                    current === "asc" ? "desc" : "asc"
                  )
                }
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </button>
            </div>
          </div>

          {paginatedExams.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <FileText size={26} />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                No exams found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                Try changing your search or filters, or create a
                new examination.
              </p>

              <button
                onClick={openAddForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Create Exam
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1150px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70">
                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Exam
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Course / Batch
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Schedule
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Marks
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Students
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Mode
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedExams.map((exam) => {
                      const statusStyle =
                        getStatusStyle(exam.status);

                      const StatusIcon = statusStyle.icon;

                      return (
                        <tr
                          key={exam.id}
                          className="border-b border-slate-100 transition hover:bg-blue-50/40"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <FileText size={18} />
                              </div>

                              <div>
                                <p className="font-semibold text-slate-900">
                                  {exam.name}
                                </p>

                                <p className="mt-0.5 text-xs font-medium text-slate-400">
                                  {exam.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-800">
                              {exam.course}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {exam.batch}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                              <CalendarDays
                                size={15}
                                className="text-slate-400"
                              />
                              {formatDate(exam.examDate)}
                            </div>

                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                              <Clock3 size={14} />
                              {exam.startTime} ·{" "}
                              {exam.duration} min
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm font-bold text-slate-900">
                              {exam.totalMarks}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Pass: {exam.passingMarks}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <Users
                                size={15}
                                className="text-slate-400"
                              />

                              <span className="text-sm font-semibold text-slate-800">
                                {exam.students}
                              </span>
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                              {exam.questions} questions
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                              {exam.mode}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyle.className}`}
                            >
                              <StatusIcon size={13} />
                              {exam.status}
                            </span>
                          </td>

                          <td className="relative px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  setViewingExam(exam)
                                }
                                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={15} />
                                View
                              </button>

                              <button
                                onClick={() =>
                                  setActionMenuId(
                                    actionMenuId === exam.id
                                      ? null
                                      : exam.id
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                              >
                                <MoreHorizontal size={18} />
                              </button>
                            </div>

                            {actionMenuId === exam.id && (
                              <div className="absolute right-5 top-14 z-30 w-48 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                                <button
                                  onClick={() =>
                                    openEditForm(exam)
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                  <Pencil size={16} />
                                  Edit Exam
                                </button>

                                {exam.status === "Upcoming" && (
                                  <button
                                    onClick={() =>
                                      handleStartExam(exam.id)
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-amber-700 hover:bg-amber-50"
                                  >
                                    <Play size={16} />
                                    Start Exam
                                  </button>
                                )}

                                {exam.status === "Ongoing" && (
                                  <button
                                    onClick={() =>
                                      handleCompleteExam(
                                        exam.id
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                                  >
                                    <Check size={16} />
                                    Complete Exam
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    setDeleteExamId(exam.id);
                                    setActionMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 size={16} />
                                  Delete Exam
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-800">
                    {filteredExams.length === 0
                      ? 0
                      : (safePage - 1) * rowsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-800">
                    {Math.min(
                      safePage * rowsPerPage,
                      filteredExams.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {filteredExams.length}
                  </span>{" "}
                  exams
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={safePage === 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(1, page - 1)
                      )
                    }
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold ${
                        safePage === page
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={safePage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingExamId
                    ? "Edit Exam"
                    : "Create New Exam"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Configure the examination details and schedule.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {formError && (
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="font-medium">
                    {formError}
                  </p>
                </div>
              )}

              {/* Basic Information */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileText size={16} />
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Basic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Exam Name *
                    </label>

                    <input
                      value={form.name}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          name: event.target.value,
                        })
                      }
                      placeholder="e.g. JEE Main Mock Test - 02"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Course *
                    </label>

                    <input
                      value={form.course}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          course: event.target.value,
                        })
                      }
                      placeholder="e.g. JEE Preparation"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Batch *
                    </label>

                    <input
                      value={form.batch}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          batch: event.target.value,
                        })
                      }
                      placeholder="e.g. JEE Main 2027"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Exam Mode
                    </label>

                    <select
                      value={form.mode}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          mode: event.target.value as ExamMode,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <CalendarDays size={16} />
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Schedule
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Exam Date *
                    </label>

                    <input
                      type="date"
                      value={form.examDate}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          examDate: event.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Start Time *
                    </label>

                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          startTime: event.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Duration (minutes) *
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={form.duration}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          duration: event.target.value,
                        })
                      }
                      placeholder="180"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Assessment */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Award size={16} />
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Assessment Configuration
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Total Marks *
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={form.totalMarks}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          totalMarks: event.target.value,
                        })
                      }
                      placeholder="300"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Passing Marks *
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={form.passingMarks}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          passingMarks: event.target.value,
                        })
                      }
                      placeholder="120"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Number of Questions *
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={form.questions}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          questions: event.target.value,
                        })
                      }
                      placeholder="90"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <BookOpen size={16} />
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Instructions
                  </h3>
                </div>

                <textarea
                  value={form.instructions}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      instructions: event.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Enter instructions for students..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveExam}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Save size={17} />

                {editingExamId
                  ? "Save Changes"
                  : "Create Exam"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingExam && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                    {viewingExam.id}
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
                      getStatusStyle(
                        viewingExam.status
                      ).className
                    }`}
                  >
                    {viewingExam.status}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {viewingExam.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {viewingExam.course} ·{" "}
                  {viewingExam.batch}
                </p>
              </div>

              <button
                onClick={() => setViewingExam(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <CalendarDays
                    size={18}
                    className="mb-2 text-blue-600"
                  />

                  <p className="text-xs font-medium text-slate-500">
                    Exam Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {formatDate(viewingExam.examDate)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Clock3
                    size={18}
                    className="mb-2 text-purple-600"
                  />

                  <p className="text-xs font-medium text-slate-500">
                    Start Time
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {viewingExam.startTime}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Timer
                    size={18}
                    className="mb-2 text-amber-600"
                  />

                  <p className="text-xs font-medium text-slate-500">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {viewingExam.duration} min
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Users
                    size={18}
                    className="mb-2 text-emerald-600"
                  />

                  <p className="text-xs font-medium text-slate-500">
                    Students
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {viewingExam.students}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Total Marks
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {viewingExam.totalMarks}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Passing Marks
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {viewingExam.passingMarks}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Questions
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {viewingExam.questions}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-bold text-slate-900">
                  Examination Mode
                </p>

                <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                  {viewingExam.mode}
                </span>
              </div>

              <div>
                <p className="mb-2 text-sm font-bold text-slate-900">
                  Student Instructions
                </p>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {viewingExam.instructions ||
                    "No instructions added for this examination."}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => {
                  openEditForm(viewingExam);
                  setViewingExam(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Pencil size={16} />
                Edit
              </button>

              {viewingExam.status === "Upcoming" && (
                <button
                  onClick={() =>
                    handleStartExam(viewingExam.id)
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
                >
                  <Play size={16} />
                  Start Exam
                </button>
              )}

              {viewingExam.status === "Ongoing" && (
                <button
                  onClick={() =>
                    handleCompleteExam(viewingExam.id)
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <Check size={16} />
                  Complete Exam
                </button>
              )}

              <button
                onClick={() => setViewingExam(null)}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteExamId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Delete Exam?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This action will remove the examination from the
              current admin view. Are you sure you want to continue?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteExamId(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteExam}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


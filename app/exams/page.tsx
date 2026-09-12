"use client";

import { useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import PageHeader from "../components/PageHeader";
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
  Sparkles,
  TrendingUp,
  TrendingDown,
  BrainCircuit,
  BarChart3,
  Target,
  ShieldCheck,
  Settings2,
  Copy,
  Download,
  RefreshCw,
  ChevronDown,
  Trophy,
  UserCheck,
  UserX,
  Percent,
  Layers3,
  Zap,
  CalendarClock,
  Send,
  FileBarChart,
  SlidersHorizontal,
  CircleAlert,
  ArrowUpRight,
  MoreVertical,
} from "lucide-react";

type ExamStatus = "Upcoming" | "Ongoing" | "Completed";
type ExamMode = "Online" | "Offline" | "Hybrid";
type Difficulty = "Easy" | "Medium" | "Hard" | "Mixed";

type Exam = {
  id: string;
  name: string;
  course: string;
  batch: string;
  subject: string;
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

  negativeMarking: boolean;
  negativeMarks: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  publishResultsAutomatically: boolean;
  proctoring: boolean;
  allowReattempt: boolean;
  difficulty: Difficulty;

  averageScore: number;
  attendanceRate: number;
  passRate: number;
  topScore: number;
  createdAt: string;
};

type ExamForm = {
  name: string;
  course: string;
  batch: string;
  subject: string;
  examDate: string;
  startTime: string;
  duration: string;
  totalMarks: string;
  passingMarks: string;
  questions: string;
  mode: ExamMode;
  difficulty: Difficulty;
  instructions: string;

  negativeMarking: boolean;
  negativeMarks: string;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  publishResultsAutomatically: boolean;
  proctoring: boolean;
  allowReattempt: boolean;
};

type Tab = "Overview" | "Exams" | "Calendar" | "Analytics" | "Results";

const initialExams: Exam[] = [
  {
    id: "EXM-1001",
    name: "JEE Main Mock Test - 01",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    subject: "Full Syllabus",
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
    negativeMarking: true,
    negativeMarks: 1,
    randomizeQuestions: true,
    randomizeOptions: true,
    publishResultsAutomatically: false,
    proctoring: true,
    allowReattempt: false,
    difficulty: "Mixed",
    averageScore: 0,
    attendanceRate: 0,
    passRate: 0,
    topScore: 0,
    createdAt: "2026-09-01",
  },
  {
    id: "EXM-1002",
    name: "NEET Biology Unit Test",
    course: "NEET Preparation",
    batch: "NEET 2027",
    subject: "Biology",
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
    negativeMarking: false,
    negativeMarks: 0,
    randomizeQuestions: false,
    randomizeOptions: false,
    publishResultsAutomatically: true,
    proctoring: false,
    allowReattempt: false,
    difficulty: "Medium",
    averageScore: 0,
    attendanceRate: 0,
    passRate: 0,
    topScore: 0,
    createdAt: "2026-09-02",
  },
  {
    id: "EXM-1003",
    name: "Physics Weekly Assessment",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    subject: "Physics",
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
    negativeMarking: true,
    negativeMarks: 0.25,
    randomizeQuestions: true,
    randomizeOptions: true,
    publishResultsAutomatically: false,
    proctoring: true,
    allowReattempt: false,
    difficulty: "Hard",
    averageScore: 71,
    attendanceRate: 94,
    passRate: 78,
    topScore: 96,
    createdAt: "2026-08-28",
  },
  {
    id: "EXM-1004",
    name: "Chemistry Chapter Test",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    subject: "Chemistry",
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
    negativeMarking: true,
    negativeMarks: 0.25,
    randomizeQuestions: false,
    randomizeOptions: false,
    publishResultsAutomatically: true,
    proctoring: false,
    allowReattempt: false,
    difficulty: "Medium",
    averageScore: 68,
    attendanceRate: 91,
    passRate: 74,
    topScore: 94,
    createdAt: "2026-08-25",
  },
  {
    id: "EXM-1005",
    name: "NEET Full Syllabus Mock",
    course: "NEET Preparation",
    batch: "NEET 2027",
    subject: "Full Syllabus",
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
    negativeMarking: true,
    negativeMarks: 1,
    randomizeQuestions: true,
    randomizeOptions: true,
    publishResultsAutomatically: true,
    proctoring: true,
    allowReattempt: false,
    difficulty: "Hard",
    averageScore: 487,
    attendanceRate: 93,
    passRate: 69,
    topScore: 698,
    createdAt: "2026-08-20",
  },
  {
    id: "EXM-1006",
    name: "Mathematics Practice Test",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    subject: "Mathematics",
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
    negativeMarking: true,
    negativeMarks: 0.5,
    randomizeQuestions: true,
    randomizeOptions: true,
    publishResultsAutomatically: false,
    proctoring: true,
    allowReattempt: true,
    difficulty: "Hard",
    averageScore: 0,
    attendanceRate: 0,
    passRate: 0,
    topScore: 0,
    createdAt: "2026-09-03",
  },
  {
    id: "EXM-1007",
    name: "Biology Genetics Test",
    course: "NEET Preparation",
    batch: "NEET 2027",
    subject: "Biology",
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
    negativeMarking: true,
    negativeMarks: 0.25,
    randomizeQuestions: true,
    randomizeOptions: true,
    publishResultsAutomatically: false,
    proctoring: true,
    allowReattempt: false,
    difficulty: "Medium",
    averageScore: 0,
    attendanceRate: 0,
    passRate: 0,
    topScore: 0,
    createdAt: "2026-09-03",
  },
  {
    id: "EXM-1008",
    name: "Physics Mechanics Test",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    subject: "Physics",
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
    negativeMarking: true,
    negativeMarks: 0.25,
    randomizeQuestions: false,
    randomizeOptions: false,
    publishResultsAutomatically: true,
    proctoring: false,
    allowReattempt: false,
    difficulty: "Medium",
    averageScore: 72,
    attendanceRate: 95,
    passRate: 81,
    topScore: 98,
    createdAt: "2026-08-15",
  },
  {
    id: "EXM-1009",
    name: "Organic Chemistry Assessment",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    subject: "Chemistry",
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
    negativeMarking: true,
    negativeMarks: 1,
    randomizeQuestions: true,
    randomizeOptions: true,
    publishResultsAutomatically: false,
    proctoring: true,
    allowReattempt: false,
    difficulty: "Hard",
    averageScore: 0,
    attendanceRate: 0,
    passRate: 0,
    topScore: 0,
    createdAt: "2026-09-04",
  },
  {
    id: "EXM-1010",
    name: "NEET Chemistry Test",
    course: "NEET Preparation",
    batch: "NEET 2027",
    subject: "Chemistry",
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
    negativeMarking: true,
    negativeMarks: 1,
    randomizeQuestions: true,
    randomizeOptions: true,
    publishResultsAutomatically: false,
    proctoring: true,
    allowReattempt: false,
    difficulty: "Hard",
    averageScore: 124,
    attendanceRate: 89,
    passRate: 71,
    topScore: 172,
    createdAt: "2026-09-04",
  },
  {
    id: "EXM-1011",
    name: "Mathematics Algebra Test",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    subject: "Mathematics",
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
    negativeMarking: false,
    negativeMarks: 0,
    randomizeQuestions: false,
    randomizeOptions: false,
    publishResultsAutomatically: true,
    proctoring: false,
    allowReattempt: false,
    difficulty: "Medium",
    averageScore: 74,
    attendanceRate: 96,
    passRate: 84,
    topScore: 99,
    createdAt: "2026-08-10",
  },
  {
    id: "EXM-1012",
    name: "NEET Physics Mock Test",
    course: "NEET Preparation",
    batch: "NEET 2027",
    subject: "Physics",
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
    negativeMarking: true,
    negativeMarks: 1,
    randomizeQuestions: true,
    randomizeOptions: true,
    publishResultsAutomatically: false,
    proctoring: true,
    allowReattempt: false,
    difficulty: "Hard",
    averageScore: 0,
    attendanceRate: 0,
    passRate: 0,
    topScore: 0,
    createdAt: "2026-09-05",
  },
];

const emptyForm: ExamForm = {
  name: "",
  course: "",
  batch: "",
  subject: "",
  examDate: "",
  startTime: "",
  duration: "",
  totalMarks: "",
  passingMarks: "",
  questions: "",
  mode: "Online",
  difficulty: "Mixed",
  instructions: "",

  negativeMarking: true,
  negativeMarks: "1",
  randomizeQuestions: true,
  randomizeOptions: true,
  publishResultsAutomatically: false,
  proctoring: true,
  allowReattempt: false,
};

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>(initialExams);

  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ExamStatus>("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState<"All" | ExamMode>("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const [sortBy, setSortBy] = useState<
    "date" | "name" | "marks" | "students" | "score"
  >("date");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const [showForm, setShowForm] = useState(false);
  const [editingExamId, setEditingExamId] = useState<string | null>(null);
  const [viewingExam, setViewingExam] = useState<Exam | null>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [deleteExamId, setDeleteExamId] = useState<string | null>(null);

  const [showAI, setShowAI] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showResults, setShowResults] = useState<Exam | null>(null);

  const [form, setForm] = useState<ExamForm>(emptyForm);
  const [formError, setFormError] = useState("");

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);

  const [calendarDate, setCalendarDate] = useState(
    new Date("2026-09-01T00:00:00"),
  );

  const courses = useMemo(
    () => Array.from(new Set(exams.map((exam) => exam.course))),
    [exams],
  );

  const batches = useMemo(
    () => Array.from(new Set(exams.map((exam) => exam.batch))),
    [exams],
  );

  const subjects = useMemo(
    () => Array.from(new Set(exams.map((exam) => exam.subject))),
    [exams],
  );

  const stats = useMemo(() => {
    const completed = exams.filter((exam) => exam.status === "Completed");

    const completedWithScore = completed.filter(
      (exam) => exam.averageScore > 0,
    );

    const averagePassRate =
      completedWithScore.length > 0
        ? Math.round(
            completedWithScore.reduce((sum, exam) => sum + exam.passRate, 0) /
              completedWithScore.length,
          )
        : 0;

    const averageAttendance =
      completedWithScore.length > 0
        ? Math.round(
            completedWithScore.reduce(
              (sum, exam) => sum + exam.attendanceRate,
              0,
            ) / completedWithScore.length,
          )
        : 0;

    return {
      total: exams.length,
      upcoming: exams.filter((exam) => exam.status === "Upcoming").length,
      ongoing: exams.filter((exam) => exam.status === "Ongoing").length,
      completed: completed.length,
      totalStudents: exams.reduce((sum, exam) => sum + exam.students, 0),
      averagePassRate,
      averageAttendance,
      completedCount: completed.length,
    };
  }, [exams]);

  const upcomingExams = useMemo(
    () =>
      exams
        .filter((exam) => exam.status === "Upcoming")
        .sort((a, b) =>
          `${a.examDate}${a.startTime}`.localeCompare(
            `${b.examDate}${b.startTime}`,
          ),
        )
        .slice(0, 5),
    [exams],
  );

  const ongoingExams = useMemo(
    () => exams.filter((exam) => exam.status === "Ongoing"),
    [exams],
  );

  const completedExams = useMemo(
    () => exams.filter((exam) => exam.status === "Completed"),
    [exams],
  );

  const filteredExams = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = exams.filter((exam) => {
      const matchesSearch =
        !normalizedSearch ||
        exam.name.toLowerCase().includes(normalizedSearch) ||
        exam.id.toLowerCase().includes(normalizedSearch) ||
        exam.course.toLowerCase().includes(normalizedSearch) ||
        exam.batch.toLowerCase().includes(normalizedSearch) ||
        exam.subject.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter;

      const matchesCourse =
        courseFilter === "All" || exam.course === courseFilter;

      const matchesBatch = batchFilter === "All" || exam.batch === batchFilter;

      const matchesMode = modeFilter === "All" || exam.mode === modeFilter;

      const matchesSubject =
        subjectFilter === "All" || exam.subject === subjectFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCourse &&
        matchesBatch &&
        matchesMode &&
        matchesSubject
      );
    });

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison = `${a.examDate} ${a.startTime}`.localeCompare(
          `${b.examDate} ${b.startTime}`,
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

      if (sortBy === "score") {
        comparison = a.averageScore - b.averageScore;
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
    modeFilter,
    subjectFilter,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredExams.length / rowsPerPage));

  const safePage = Math.min(currentPage, totalPages);

  const paginatedExams = filteredExams.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage,
  );

  const showToast = (
    message: string,
    type: "success" | "info" | "error" = "success",
  ) => {
    setToast({ message, type });

    window.setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatShortDate = (date: string) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const getStatusStyle = (status: ExamStatus) => {
    if (status === "Upcoming") {
      return {
        className: "border-blue-100 bg-blue-50 text-blue-700",
        icon: Clock3,
      };
    }

    if (status === "Ongoing") {
      return {
        className: "border-amber-100 bg-amber-50 text-amber-700",
        icon: CircleDot,
      };
    }

    return {
      className: "border-emerald-100 bg-emerald-50 text-emerald-700",
      icon: CheckCircle2,
    };
  };

  const getModeStyle = (mode: ExamMode) => {
    if (mode === "Online") {
      return "border-blue-100 bg-blue-50 text-blue-700";
    }

    if (mode === "Hybrid") {
      return "border-purple-100 bg-purple-50 text-purple-700";
    }

    return "border-slate-200 bg-slate-50 text-slate-700";
  };

  const getDifficultyStyle = (difficulty: Difficulty) => {
    if (difficulty === "Hard") {
      return "bg-red-50 text-red-700 border-red-100";
    }

    if (difficulty === "Medium") {
      return "bg-amber-50 text-amber-700 border-amber-100";
    }

    if (difficulty === "Easy") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    return "bg-purple-50 text-purple-700 border-purple-100";
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
      subject: exam.subject,
      examDate: exam.examDate,
      startTime: exam.startTime,
      duration: String(exam.duration),
      totalMarks: String(exam.totalMarks),
      passingMarks: String(exam.passingMarks),
      questions: String(exam.questions),
      mode: exam.mode,
      difficulty: exam.difficulty,
      instructions: exam.instructions,

      negativeMarking: exam.negativeMarking,
      negativeMarks: String(exam.negativeMarks),
      randomizeQuestions: exam.randomizeQuestions,
      randomizeOptions: exam.randomizeOptions,
      publishResultsAutomatically: exam.publishResultsAutomatically,
      proctoring: exam.proctoring,
      allowReattempt: exam.allowReattempt,
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

    if (!form.subject.trim()) {
      return "Subject is required.";
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

    if (
      form.negativeMarking &&
      (!Number(form.negativeMarks) || Number(form.negativeMarks) <= 0)
    ) {
      return "Enter a valid negative marking value.";
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
                subject: form.subject.trim(),
                examDate: form.examDate,
                startTime: form.startTime,
                duration,
                totalMarks,
                passingMarks,
                questions,
                mode: form.mode,
                difficulty: form.difficulty,
                instructions: form.instructions.trim(),
                negativeMarking: form.negativeMarking,
                negativeMarks: form.negativeMarking
                  ? Number(form.negativeMarks)
                  : 0,
                randomizeQuestions: form.randomizeQuestions,
                randomizeOptions: form.randomizeOptions,
                publishResultsAutomatically: form.publishResultsAutomatically,
                proctoring: form.proctoring,
                allowReattempt: form.allowReattempt,
              }
            : exam,
        ),
      );

      showToast("Exam updated successfully.");
    } else {
      const newNumber =
        Math.max(
          ...exams.map((exam) => {
            const number = Number(exam.id.replace("EXM-", ""));

            return Number.isFinite(number) ? number : 1000;
          }),
          1000,
        ) + 1;

      const newExam: Exam = {
        id: `EXM-${newNumber}`,
        name: form.name.trim(),
        course: form.course.trim(),
        batch: form.batch.trim(),
        subject: form.subject.trim(),
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

        negativeMarking: form.negativeMarking,
        negativeMarks: form.negativeMarking ? Number(form.negativeMarks) : 0,
        randomizeQuestions: form.randomizeQuestions,
        randomizeOptions: form.randomizeOptions,
        publishResultsAutomatically: form.publishResultsAutomatically,
        proctoring: form.proctoring,
        allowReattempt: form.allowReattempt,
        difficulty: form.difficulty,

        averageScore: 0,
        attendanceRate: 0,
        passRate: 0,
        topScore: 0,

        createdAt: new Date().toISOString().split("T")[0],
      };

      setExams((current) => [newExam, ...current]);

      showToast("Exam created successfully.");
    }

    setShowForm(false);
    setEditingExamId(null);
    setForm(emptyForm);
    setFormError("");
    setCurrentPage(1);
  };

  const handleDeleteExam = () => {
    if (!deleteExamId) return;

    setExams((current) => current.filter((exam) => exam.id !== deleteExamId));

    setDeleteExamId(null);
    setActionMenuId(null);

    showToast("Exam deleted.", "info");
  };

  const handleStartExam = (examId: string) => {
    setExams((current) =>
      current.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              status: "Ongoing",
              attendanceRate: exam.attendanceRate || 88,
            }
          : exam,
      ),
    );

    setActionMenuId(null);
    setViewingExam(null);

    showToast("Exam started successfully.");
  };

  const handleCompleteExam = (examId: string) => {
    setExams((current) =>
      current.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              status: "Completed",
              averageScore:
                exam.averageScore || Math.round(exam.totalMarks * 0.68),
              attendanceRate: exam.attendanceRate || 91,
              passRate: exam.passRate || 74,
              topScore: exam.topScore || Math.round(exam.totalMarks * 0.94),
            }
          : exam,
      ),
    );

    setActionMenuId(null);
    setViewingExam(null);

    showToast("Exam marked as completed.");
  };

  const handleDuplicateExam = (exam: Exam) => {
    const newNumber =
      Math.max(
        ...exams.map((item) => Number(item.id.replace("EXM-", "")) || 1000),
        1000,
      ) + 1;

    const duplicate: Exam = {
      ...exam,
      id: `EXM-${newNumber}`,
      name: `${exam.name} - Copy`,
      status: "Upcoming",
      averageScore: 0,
      attendanceRate: 0,
      passRate: 0,
      topScore: 0,
      students: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setExams((current) => [duplicate, ...current]);
    setActionMenuId(null);

    showToast("Exam duplicated successfully.");
  };

  const handlePublishResults = (exam: Exam) => {
    showToast(`Results published for ${exam.name}.`);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCourseFilter("All");
    setBatchFilter("All");
    setModeFilter("All");
    setSubjectFilter("All");
    setCurrentPage(1);
  };

  const hasFilters =
    search ||
    statusFilter !== "All" ||
    courseFilter !== "All" ||
    batchFilter !== "All" ||
    modeFilter !== "All" ||
    subjectFilter !== "All";

  const exportCSV = () => {
    const headers = [
      "Exam ID",
      "Exam Name",
      "Course",
      "Batch",
      "Subject",
      "Date",
      "Start Time",
      "Duration",
      "Total Marks",
      "Passing Marks",
      "Questions",
      "Mode",
      "Status",
      "Students",
      "Average Score",
      "Attendance",
      "Pass Rate",
    ];

    const rows = filteredExams.map((exam) => [
      exam.id,
      exam.name,
      exam.course,
      exam.batch,
      exam.subject,
      exam.examDate,
      exam.startTime,
      exam.duration,
      exam.totalMarks,
      exam.passingMarks,
      exam.questions,
      exam.mode,
      exam.status,
      exam.students,
      exam.averageScore,
      `${exam.attendanceRate}%`,
      `${exam.passRate}%`,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "exams-report.csv";
    link.click();

    URL.revokeObjectURL(url);

    showToast("Exam report exported.");
  };

  const monthName = calendarDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(
    calendarDate.getFullYear(),
    calendarDate.getMonth() + 1,
    0,
  ).getDate();

  const firstDay = new Date(
    calendarDate.getFullYear(),
    calendarDate.getMonth(),
    1,
  ).getDay();

  const calendarDays = Array.from(
    { length: firstDay + daysInMonth },
    (_, index) => (index < firstDay ? null : index - firstDay + 1),
  );

  const examsForCalendarDay = (day: number) => {
    const year = calendarDate.getFullYear();
    const month = String(calendarDate.getMonth() + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");

    const target = `${year}-${month}-${date}`;

    return exams.filter((exam) => exam.examDate === target);
  };

  const changeCalendarMonth = (offset: number) => {
    setCalendarDate(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  };

  const aiInsights = useMemo(() => {
    const completed = exams.filter((exam) => exam.status === "Completed");

    const hardExams = completed.filter(
      (exam) => exam.difficulty === "Hard" && exam.passRate < 75,
    );

    const lowAttendance = completed.filter((exam) => exam.attendanceRate < 92);

    const strongest = [...completed].sort((a, b) => b.passRate - a.passRate)[0];

    return {
      hardExams,
      lowAttendance,
      strongest,
    };
  }, [exams]);

  const subjectPerformance = useMemo(() => {
    const map = new Map<
      string,
      {
        score: number;
        pass: number;
        count: number;
      }
    >();

    completedExams.forEach((exam) => {
      const existing = map.get(exam.subject);

      if (existing) {
        existing.score +=
          exam.totalMarks > 0 ? (exam.averageScore / exam.totalMarks) * 100 : 0;
        existing.pass += exam.passRate;
        existing.count += 1;
      } else {
        map.set(exam.subject, {
          score:
            exam.totalMarks > 0
              ? (exam.averageScore / exam.totalMarks) * 100
              : 0,
          pass: exam.passRate,
          count: 1,
        });
      }
    });

    return Array.from(map.entries())
      .map(([subject, data]) => ({
        subject,
        score: Math.round(data.score / data.count),
        pass: Math.round(data.pass / data.count),
      }))
      .sort((a, b) => b.score - a.score);
  }, [completedExams]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-0 min-h-screen p-4 lg:ml-64 lg:p-8">
        {/* Header */}
        <div className="mb-7">
          <PageHeader
            title="Exams"
            description="Plan, conduct, analyze and improve examinations."
            icon={<FileText size={20} />}
            actions={
              <>
                <button
                  type="button"
                  onClick={() => {
                    setShowAI(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
                >
                  <Sparkles size={16} />
                  AI Insights
                </button>

                <button
                  type="button"
                  onClick={exportCSV}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Download size={16} />
                  Export
                </button>

                <button
                  type="button"
                  onClick={openAddForm}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Plus size={17} />
                  Create Exam
                </button>
              </>
            }
          />

          {/* Exam Navigation Tabs */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(
              ["Overview", "Exams", "Calendar", "Analytics", "Results"] as Tab[]
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Command Center */}
        <div className="mb-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white lg:p-7">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative grid gap-7 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
                  <BrainCircuit size={14} />
                  Exam Command Center
                </div>

                <h2 className="max-w-2xl text-2xl font-bold tracking-tight lg:text-3xl">
                  Run smarter examinations with data-driven decisions.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  Monitor schedules, student participation, assessment quality
                  and performance signals from one place.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab("Calendar")}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                  >
                    <CalendarDays size={16} />
                    View Calendar
                  </button>

                  <button
                    onClick={() => setShowAI(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    <Sparkles size={16} />
                    Ask AI
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <Clock3 size={18} className="text-blue-300" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Upcoming
                    </span>
                  </div>

                  <p className="text-2xl font-bold">{stats.upcoming}</p>

                  <p className="mt-1 text-xs text-slate-400">Scheduled exams</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <CircleDot size={18} className="text-amber-300" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Live
                    </span>
                  </div>

                  <p className="text-2xl font-bold">{stats.ongoing}</p>

                  <p className="mt-1 text-xs text-slate-400">
                    Exams in progress
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <Percent size={18} className="text-emerald-300" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Pass Rate
                    </span>
                  </div>

                  <p className="text-2xl font-bold">{stats.averagePassRate}%</p>

                  <p className="mt-1 text-xs text-slate-400">Completed exams</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <UserCheck size={18} className="text-purple-300" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Attendance
                    </span>
                  </div>

                  <p className="text-2xl font-bold">
                    {stats.averageAttendance}%
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Average participation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              label: "Total Exams",
              value: stats.total,
              icon: ClipboardList,
              iconClass: "bg-blue-50 text-blue-600",
              trend: "+12%",
              trendUp: true,
            },
            {
              label: "Upcoming",
              value: stats.upcoming,
              icon: CalendarClock,
              iconClass: "bg-purple-50 text-purple-600",
              trend: "Next 30 days",
              trendUp: null,
            },
            {
              label: "Ongoing",
              value: stats.ongoing,
              icon: Zap,
              iconClass: "bg-amber-50 text-amber-600",
              trend: "Live now",
              trendUp: null,
            },
            {
              label: "Registrations",
              value: stats.totalStudents.toLocaleString("en-IN"),
              icon: Users,
              iconClass: "bg-emerald-50 text-emerald-600",
              trend: "+8.4%",
              trendUp: true,
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: CheckCircle2,
              iconClass: "bg-slate-100 text-slate-600",
              trend: `${stats.averagePassRate}% pass`,
              trendUp: true,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconClass}`}
                  >
                    <Icon size={19} />
                  </div>

                  {item.trendUp === true && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp size={13} />
                      {item.trend}
                    </span>
                  )}

                  {item.trendUp === null && (
                    <span className="text-[11px] font-semibold text-slate-400">
                      {item.trend}
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Overview */}
        {activeTab === "Overview" && (
          <div className="space-y-7">
            {/* Live exams + upcoming */}
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <Zap size={17} />
                      </div>

                      <h2 className="font-bold text-slate-900">Live Exams</h2>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      Exams currently in progress.
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                    {ongoingExams.length} Live
                  </span>
                </div>

                {ongoingExams.length === 0 ? (
                  <div className="flex min-h-[220px] flex-col items-center justify-center p-6 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <Clock3 size={22} />
                    </div>

                    <p className="font-bold text-slate-900">
                      No exams are live
                    </p>

                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                      Your active examinations will appear here while students
                      are taking them.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 p-5">
                    {ongoingExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />

                              <p className="font-bold text-slate-900">
                                {exam.name}
                              </p>
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                              {exam.course} · {exam.batch} · {exam.subject}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                                <Users size={13} />
                                {exam.students} students
                              </span>

                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                                <Timer size={13} />
                                {exam.duration} min
                              </span>

                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                                <ShieldCheck size={13} />
                                {exam.proctoring ? "Proctored" : "Standard"}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => setViewingExam(exam)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
                          >
                            <Eye size={16} />
                            Monitor
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                  <div>
                    <h2 className="font-bold text-slate-900">Upcoming Exams</h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Your next scheduled assessments.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("Exams")}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    View all
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {upcomingExams.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => setViewingExam(exam)}
                      className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-blue-50/40"
                    >
                      <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                        <span className="text-[10px] font-bold uppercase">
                          {new Date(
                            `${exam.examDate}T00:00:00`,
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                          })}
                        </span>

                        <span className="text-base font-bold leading-none">
                          {new Date(`${exam.examDate}T00:00:00`).getDate()}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {exam.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {exam.batch} · {exam.startTime} · {exam.duration} min
                        </p>
                      </div>

                      <ChevronRight
                        size={17}
                        className="shrink-0 text-slate-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Command Center */}
            <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-5 shadow-sm lg:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/20">
                    <BrainCircuit size={21} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-slate-900">
                        AI Exam Command Center
                      </h2>

                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                        SIMULATED AI
                      </span>
                    </div>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                      AI can identify performance risks, attendance patterns,
                      difficult assessments and useful next actions.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAI(true)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-600/20 hover:bg-purple-700"
                >
                  <Sparkles size={16} />
                  Open AI Assistant
                </button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-red-100 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <CircleAlert size={18} className="text-red-500" />

                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                      Attention
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900">
                    {aiInsights.lowAttendance.length} exams
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    completed exams have below-target attendance.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <TrendingDown size={18} className="text-amber-500" />

                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                      Risk
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900">
                    {aiInsights.hardExams.length} difficult exams
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    hard assessments currently show lower pass rates.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <Trophy size={18} className="text-emerald-500" />

                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                      Best
                    </span>
                  </div>

                  <p className="truncate text-sm font-bold text-slate-900">
                    {aiInsights.strongest?.name || "No completed exams"}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    highest observed pass-rate assessment.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick analytics */}
            <div className="grid gap-6 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Performance Snapshot
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Completed exam performance.
                    </p>
                  </div>

                  <BarChart3 size={19} className="text-blue-600" />
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">
                        Pass rate
                      </span>

                      <span className="font-bold text-slate-900">
                        {stats.averagePassRate}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${stats.averagePassRate}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">
                        Attendance
                      </span>

                      <span className="font-bold text-slate-900">
                        {stats.averageAttendance}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{
                          width: `${stats.averageAttendance}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">
                        Completion
                      </span>

                      <span className="font-bold text-slate-900">
                        {stats.total
                          ? Math.round((stats.completed / stats.total) * 100)
                          : 0}
                        %
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-purple-500"
                        style={{
                          width: `${
                            stats.total
                              ? Math.round(
                                  (stats.completed / stats.total) * 100,
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Subject Performance
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Average score percentage.
                    </p>
                  </div>

                  <Target size={19} className="text-purple-600" />
                </div>

                <div className="space-y-4">
                  {subjectPerformance.slice(0, 5).map((item) => (
                    <div key={item.subject}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">
                          {item.subject}
                        </span>

                        <span className="text-xs font-bold text-slate-900">
                          {item.score}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {subjectPerformance.length === 0 && (
                    <p className="py-8 text-center text-sm text-slate-400">
                      Complete an exam to see performance data.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">Quick Actions</h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Frequently used exam operations.
                    </p>
                  </div>

                  <Zap size={19} className="text-amber-500" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Create Exam",
                      icon: Plus,
                      action: openAddForm,
                    },
                    {
                      label: "Calendar",
                      icon: CalendarDays,
                      action: () => setActiveTab("Calendar"),
                    },
                    {
                      label: "Analytics",
                      icon: BarChart3,
                      action: () => setActiveTab("Analytics"),
                    },
                    {
                      label: "Export",
                      icon: Download,
                      action: exportCSV,
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="flex min-h-[88px] flex-col items-start justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <Icon size={18} className="text-slate-600" />

                        <span className="text-xs font-bold text-slate-800">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exams */}
        {activeTab === "Exams" && (
          <div>
            {/* Filters */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <SlidersHorizontal size={17} />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Exam Filters
                    </h2>

                    <p className="text-xs text-slate-500">
                      Narrow down your examination records.
                    </p>
                  </div>
                </div>

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm font-bold text-blue-600 hover:text-blue-700"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
                <div className="relative xl:col-span-2">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search exam, ID, course, subject..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value as "All" | ExamStatus);
                    setCurrentPage(1);
                  }}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
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
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
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
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">All Batches</option>

                  {batches.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>

                <select
                  value={modeFilter}
                  onChange={(event) => {
                    setModeFilter(event.target.value as "All" | ExamMode);
                    setCurrentPage(1);
                  }}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">All Modes</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                <select
                  value={subjectFilter}
                  onChange={(event) => {
                    setSubjectFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">All Subjects</option>

                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-200 p-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    All Examinations
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {filteredExams.length} examination
                    {filteredExams.length === 1 ? "" : "s"} found.
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
                          | "score",
                      );
                      setCurrentPage(1);
                    }}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="marks">Sort by Marks</option>
                    <option value="students">Sort by Students</option>
                    <option value="score">Sort by Score</option>
                  </select>

                  <button
                    onClick={() =>
                      setSortOrder((current) =>
                        current === "asc" ? "desc" : "asc",
                      )
                    }
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {sortOrder === "asc" ? (
                      <>
                        <TrendingUp size={15} />
                        Ascending
                      </>
                    ) : (
                      <>
                        <TrendingDown size={15} />
                        Descending
                      </>
                    )}
                  </button>
                </div>
              </div>

              {paginatedExams.length === 0 ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <FileText size={26} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    No exams found
                  </h3>

                  <p className="mt-1 max-w-md text-sm text-slate-500">
                    Try changing your search or filters, or create a new
                    examination.
                  </p>

                  <button
                    onClick={openAddForm}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                  >
                    <Plus size={17} />
                    Create Exam
                  </button>
                </div>
              ) : (
                <>
                  <div className="hidden overflow-x-auto lg:block">
                    <table className="w-full min-w-[1250px]">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80">
                          <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Examination
                          </th>

                          <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Course / Batch
                          </th>

                          <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Schedule
                          </th>

                          <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Assessment
                          </th>

                          <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Students
                          </th>

                          <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Mode
                          </th>

                          <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Status
                          </th>

                          <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {paginatedExams.map((exam) => {
                          const statusStyle = getStatusStyle(exam.status);

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

                                  <div className="min-w-0">
                                    <p className="max-w-[230px] truncate text-sm font-bold text-slate-900">
                                      {exam.name}
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                      <span className="text-[11px] font-semibold text-slate-400">
                                        {exam.id}
                                      </span>

                                      <span
                                        className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${getDifficultyStyle(
                                          exam.difficulty,
                                        )}`}
                                      >
                                        {exam.difficulty}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <p className="text-sm font-bold text-slate-800">
                                  {exam.course}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {exam.batch}
                                </p>

                                <p className="mt-1 text-[11px] font-semibold text-blue-600">
                                  {exam.subject}
                                </p>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                  <CalendarDays
                                    size={14}
                                    className="text-slate-400"
                                  />

                                  {formatDate(exam.examDate)}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                  <Clock3 size={13} />
                                  {exam.startTime} · {exam.duration} min
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <p className="text-sm font-bold text-slate-900">
                                  {exam.totalMarks} marks
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  Pass: {exam.passingMarks} · {exam.questions}{" "}
                                  Qs
                                </p>

                                {exam.status === "Completed" && (
                                  <p className="mt-1 text-xs font-bold text-emerald-600">
                                    Avg: {exam.averageScore}
                                  </p>
                                )}
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                    <Users size={15} />
                                  </div>

                                  <div>
                                    <p className="text-sm font-bold text-slate-800">
                                      {exam.students}
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                      registered
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-bold ${getModeStyle(
                                    exam.mode,
                                  )}`}
                                >
                                  {exam.mode}
                                </span>

                                {exam.proctoring && (
                                  <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                                    <ShieldCheck size={11} />
                                    Proctored
                                  </p>
                                )}
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyle.className}`}
                                >
                                  <StatusIcon size={13} />
                                  {exam.status}
                                </span>

                                {exam.status === "Completed" && (
                                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                                    {exam.passRate}% passed
                                  </p>
                                )}
                              </td>

                              <td className="relative px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setViewingExam(exam)}
                                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
                                  >
                                    <Eye size={15} />
                                    View
                                  </button>

                                  <button
                                    onClick={() =>
                                      setActionMenuId(
                                        actionMenuId === exam.id
                                          ? null
                                          : exam.id,
                                      )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                  >
                                    <MoreHorizontal size={18} />
                                  </button>
                                </div>

                                {actionMenuId === exam.id && (
                                  <div className="absolute right-5 top-14 z-30 w-52 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                                    <button
                                      onClick={() => openEditForm(exam)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                      <Pencil size={16} />
                                      Edit Exam
                                    </button>

                                    <button
                                      onClick={() => handleDuplicateExam(exam)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                      <Copy size={16} />
                                      Duplicate
                                    </button>

                                    {exam.status === "Upcoming" && (
                                      <button
                                        onClick={() => handleStartExam(exam.id)}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-50"
                                      >
                                        <Play size={16} />
                                        Start Exam
                                      </button>
                                    )}

                                    {exam.status === "Ongoing" && (
                                      <button
                                        onClick={() =>
                                          handleCompleteExam(exam.id)
                                        }
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                                      >
                                        <Check size={16} />
                                        Complete Exam
                                      </button>
                                    )}

                                    {exam.status === "Completed" && (
                                      <button
                                        onClick={() => setShowResults(exam)}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                                      >
                                        <FileBarChart size={16} />
                                        View Results
                                      </button>
                                    )}

                                    <button
                                      onClick={() => setDeleteExamId(exam.id)}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
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

                  {/* Mobile Cards */}
                  <div className="divide-y divide-slate-100 lg:hidden">
                    {paginatedExams.map((exam) => {
                      const statusStyle = getStatusStyle(exam.status);

                      const StatusIcon = statusStyle.icon;

                      return (
                        <div key={exam.id} className="p-4">
                          <div className="flex gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <FileText size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="font-bold text-slate-900">
                                    {exam.name}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-400">
                                    {exam.id}
                                  </p>
                                </div>

                                <span
                                  className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold ${statusStyle.className}`}
                                >
                                  <StatusIcon size={11} />
                                  {exam.status}
                                </span>
                              </div>

                              <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="rounded-xl bg-slate-50 p-3">
                                  <p className="text-[10px] font-bold uppercase text-slate-400">
                                    Batch
                                  </p>

                                  <p className="mt-1 truncate text-xs font-bold text-slate-800">
                                    {exam.batch}
                                  </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3">
                                  <p className="text-[10px] font-bold uppercase text-slate-400">
                                    Schedule
                                  </p>

                                  <p className="mt-1 text-xs font-bold text-slate-800">
                                    {formatShortDate(exam.examDate)} ·{" "}
                                    {exam.startTime}
                                  </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3">
                                  <p className="text-[10px] font-bold uppercase text-slate-400">
                                    Assessment
                                  </p>

                                  <p className="mt-1 text-xs font-bold text-slate-800">
                                    {exam.totalMarks} marks
                                  </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3">
                                  <p className="text-[10px] font-bold uppercase text-slate-400">
                                    Students
                                  </p>

                                  <p className="mt-1 text-xs font-bold text-slate-800">
                                    {exam.students}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-3 flex gap-2">
                                <button
                                  onClick={() => setViewingExam(exam)}
                                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                                >
                                  View
                                </button>

                                <button
                                  onClick={() => openEditForm(exam)}
                                  className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      Showing{" "}
                      <span className="font-bold text-slate-800">
                        {filteredExams.length === 0
                          ? 0
                          : (safePage - 1) * rowsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-bold text-slate-800">
                        {Math.min(safePage * rowsPerPage, filteredExams.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-slate-800">
                        {filteredExams.length}
                      </span>{" "}
                      exams
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={safePage === 1}
                        onClick={() =>
                          setCurrentPage((page) => Math.max(1, page - 1))
                        }
                        className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                      >
                        <ChevronLeft size={16} />
                        Previous
                      </button>

                      <span className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white">
                        {safePage} / {totalPages}
                      </span>

                      <button
                        disabled={safePage === totalPages}
                        onClick={() =>
                          setCurrentPage((page) =>
                            Math.min(totalPages, page + 1),
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
          </div>
        )}

        {/* Calendar */}
        {activeTab === "Calendar" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Exam Calendar
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Visualize upcoming and completed assessments.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeCalendarMonth(-1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <div className="min-w-[150px] text-center text-sm font-bold text-slate-900">
                    {monthName}
                  </div>

                  <button
                    onClick={() => changeCalendarMonth(1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto p-4 lg:p-5">
                <div className="min-w-[760px]">
                  <div className="grid grid-cols-7 border-b border-slate-200">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="px-3 py-3 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400"
                        >
                          {day}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-7">
                    {calendarDays.map((day, index) => {
                      if (!day) {
                        return (
                          <div
                            key={`empty-${index}`}
                            className="min-h-[130px] border-b border-r border-slate-100 bg-slate-50/40"
                          />
                        );
                      }

                      const dayExams = examsForCalendarDay(day);

                      return (
                        <div
                          key={day}
                          className="min-h-[130px] border-b border-r border-slate-100 bg-white p-2"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span
                              className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                                day === calendarDate.getDate()
                                  ? "bg-blue-600 text-white"
                                  : "text-slate-600"
                              }`}
                            >
                              {day}
                            </span>

                            {dayExams.length > 0 && (
                              <span className="text-[10px] font-bold text-slate-400">
                                {dayExams.length}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            {dayExams.slice(0, 3).map((exam) => (
                              <button
                                key={exam.id}
                                onClick={() => setViewingExam(exam)}
                                className={`w-full rounded-lg border p-2 text-left transition hover:shadow-sm ${
                                  exam.status === "Completed"
                                    ? "border-emerald-100 bg-emerald-50"
                                    : exam.status === "Ongoing"
                                      ? "border-amber-100 bg-amber-50"
                                      : "border-blue-100 bg-blue-50"
                                }`}
                              >
                                <p className="truncate text-[10px] font-bold text-slate-800">
                                  {exam.name}
                                </p>

                                <p className="mt-0.5 text-[9px] font-semibold text-slate-500">
                                  {exam.startTime} · {exam.duration}m
                                </p>
                              </button>
                            ))}

                            {dayExams.length > 3 && (
                              <p className="px-1 text-[9px] font-bold text-blue-600">
                                +{dayExams.length - 3} more
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar side insights */}
            <div className="grid gap-6 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarClock size={18} className="text-blue-600" />

                  <h3 className="font-bold text-slate-900">
                    Upcoming schedule
                  </h3>
                </div>

                <div className="space-y-3">
                  {upcomingExams.slice(0, 4).map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => setViewingExam(exam)}
                      className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left hover:bg-slate-50"
                    >
                      <div className="text-center">
                        <p className="text-[10px] font-bold uppercase text-blue-600">
                          {new Date(
                            `${exam.examDate}T00:00:00`,
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                          })}
                        </p>

                        <p className="text-lg font-bold text-slate-900">
                          {new Date(`${exam.examDate}T00:00:00`).getDate()}
                        </p>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-slate-800">
                          {exam.name}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          {exam.batch} · {exam.startTime}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <AlertCircle size={18} className="text-amber-500" />

                  <h3 className="font-bold text-slate-900">Schedule watch</h3>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                    <p className="text-xs font-bold text-amber-800">
                      High exam density
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-700">
                      Multiple assessments are scheduled within the next two
                      weeks. Review student workload.
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                    <p className="text-xs font-bold text-blue-800">
                      Online readiness
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      Ensure online students receive joining instructions before
                      each scheduled test.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-600" />

                  <h3 className="font-bold text-slate-900">
                    AI schedule suggestion
                  </h3>
                </div>

                <p className="text-sm leading-6 text-slate-600">
                  Consider spacing high-difficulty mock tests across different
                  days to reduce assessment fatigue.
                </p>

                <button
                  onClick={() => setShowAI(true)}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-purple-600"
                >
                  Review with AI
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === "Analytics" && (
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Average Pass Rate",
                  value: `${stats.averagePassRate}%`,
                  icon: Award,
                  note: "Across completed exams",
                },
                {
                  label: "Average Attendance",
                  value: `${stats.averageAttendance}%`,
                  icon: UserCheck,
                  note: "Student participation",
                },
                {
                  label: "Completed Exams",
                  value: stats.completed,
                  icon: CheckCircle2,
                  note: "Successfully conducted",
                },
                {
                  label: "Registrations",
                  value: stats.totalStudents.toLocaleString("en-IN"),
                  icon: Users,
                  note: "Across all exams",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={19} />
                    </div>

                    <p className="text-xs font-semibold text-slate-500">
                      {item.label}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {item.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">{item.note}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-bold text-slate-900">
                    Subject Performance
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Average score and pass rate by subject.
                  </p>
                </div>

                <div className="space-y-5">
                  {subjectPerformance.map((item) => (
                    <div key={item.subject}>
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {item.subject}
                          </p>

                          <p className="text-xs text-slate-400">
                            Pass rate {item.pass}%
                          </p>
                        </div>

                        <span className="text-sm font-bold text-blue-600">
                          {item.score}%
                        </span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {subjectPerformance.length === 0 && (
                    <div className="py-12 text-center text-sm text-slate-400">
                      No completed exam analytics available.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-bold text-slate-900">Exam Performance</h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Pass-rate comparison across completed exams.
                  </p>
                </div>

                <div className="space-y-4">
                  {completedExams
                    .slice()
                    .sort((a, b) => b.passRate - a.passRate)
                    .slice(0, 6)
                    .map((exam) => (
                      <div key={exam.id}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="truncate text-xs font-bold text-slate-700">
                            {exam.name}
                          </p>

                          <span className="shrink-0 text-xs font-bold text-slate-900">
                            {exam.passRate}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{
                              width: `${exam.passRate}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* AI analytics */}
            <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white">
                    <BrainCircuit size={19} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      AI Analytics Summary
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Current simulated analysis suggests focusing on
                      low-attendance assessments and difficult subjects before
                      the next mock-test cycle.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAI(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
                >
                  <Sparkles size={16} />
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {activeTab === "Results" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Exam Results Center
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review performance summaries for completed examinations.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {completedExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Trophy size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-900">
                          {exam.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {exam.batch} · {formatDate(exam.examDate)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 lg:min-w-[360px]">
                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Average
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {exam.averageScore}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Pass
                        </p>

                        <p className="mt-1 text-sm font-bold text-emerald-600">
                          {exam.passRate}%
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Top
                        </p>

                        <p className="mt-1 text-sm font-bold text-blue-600">
                          {exam.topScore}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowResults(exam)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <FileBarChart size={16} />
                      View Results
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex gap-3">
                <BrainCircuit
                  size={19}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <h3 className="font-bold text-blue-900">
                    AI result recommendation
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-blue-800">
                    Use result trends to identify students who consistently
                    remain below the passing threshold, then connect those
                    students to remedial classes, doubt sessions or targeted
                    practice tests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
          <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingExamId
                      ? "Edit Examination"
                      : "Create New Examination"}
                  </h2>

                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                    CONFIGURATION
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Configure schedule, assessment rules and student experience.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-7 p-5 sm:p-6">
              {formError && (
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />

                  <p className="font-semibold">{formError}</p>
                </div>
              )}

              {/* Basic */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FileText size={17} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Basic Information
                    </h3>

                    <p className="text-xs text-slate-500">
                      Identify the examination and academic context.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
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
                      placeholder="JEE Preparation"
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
                      placeholder="JEE Main 2027"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Subject *
                    </label>

                    <input
                      value={form.subject}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          subject: event.target.value,
                        })
                      }
                      placeholder="Physics / Chemistry / Biology"
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
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Difficulty
                    </label>

                    <select
                      value={form.difficulty}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          difficulty: event.target.value as Difficulty,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <CalendarDays size={17} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">Schedule</h3>

                    <p className="text-xs text-slate-500">
                      Set when the examination will take place.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
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
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Award size={17} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Assessment Configuration
                    </h3>

                    <p className="text-xs text-slate-500">
                      Configure marks, questions and scoring rules.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
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
                      Questions *
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

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Negative Marking
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Deduct marks for incorrect answers.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          negativeMarking: !form.negativeMarking,
                        })
                      }
                      className={`relative h-6 w-11 rounded-full transition ${
                        form.negativeMarking ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                          form.negativeMarking ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {form.negativeMarking && (
                    <div className="mt-4 max-w-xs">
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                        Negative marks per wrong answer
                      </label>

                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        value={form.negativeMarks}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            negativeMarks: event.target.value,
                          })
                        }
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Smart settings */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Settings2 size={17} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Smart Exam Settings
                    </h3>

                    <p className="text-xs text-slate-500">
                      Control student experience and examination security.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      key: "randomizeQuestions",
                      title: "Randomize Questions",
                      description: "Show questions in a different order.",
                    },
                    {
                      key: "randomizeOptions",
                      title: "Randomize Options",
                      description: "Shuffle answer choices where supported.",
                    },
                    {
                      key: "publishResultsAutomatically",
                      title: "Auto Publish Results",
                      description:
                        "Publish results automatically after evaluation.",
                    },
                    {
                      key: "proctoring",
                      title: "Enable Proctoring",
                      description:
                        "Prepare the exam for future proctoring integration.",
                    },
                    {
                      key: "allowReattempt",
                      title: "Allow Reattempt",
                      description: "Allow students to retake the examination.",
                    },
                  ].map((setting) => {
                    const key = setting.key as keyof ExamForm;

                    const enabled = form[key] as boolean;

                    return (
                      <button
                        key={setting.key}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            [key]: !enabled,
                          })
                        }
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                          enabled
                            ? "border-blue-200 bg-blue-50/60"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            enabled
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {enabled ? (
                            <Check size={17} />
                          ) : (
                            <CircleDot size={17} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900">
                            {setting.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {setting.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <BookOpen size={17} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Student Instructions
                    </h3>

                    <p className="text-xs text-slate-500">
                      Instructions displayed before the examination begins.
                    </p>
                  </div>
                </div>

                <textarea
                  value={form.instructions}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      instructions: event.target.value,
                    })
                  }
                  rows={5}
                  placeholder="Enter instructions for students..."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveExam}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                <Save size={17} />

                {editingExamId ? "Save Changes" : "Create Exam"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Exam Modal */}
      {viewingExam && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
          <div className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                      {viewingExam.id}
                    </span>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
                        getStatusStyle(viewingExam.status).className
                      }`}
                    >
                      {viewingExam.status}
                    </span>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-bold ${getDifficultyStyle(
                        viewingExam.difficulty,
                      )}`}
                    >
                      {viewingExam.difficulty}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {viewingExam.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {viewingExam.course} · {viewingExam.batch} ·{" "}
                    {viewingExam.subject}
                  </p>
                </div>

                <button
                  onClick={() => setViewingExam(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  {
                    label: "Date",
                    value: formatDate(viewingExam.examDate),
                    icon: CalendarDays,
                    iconClass: "text-blue-600",
                  },
                  {
                    label: "Start",
                    value: viewingExam.startTime,
                    icon: Clock3,
                    iconClass: "text-purple-600",
                  },
                  {
                    label: "Duration",
                    value: `${viewingExam.duration} min`,
                    icon: Timer,
                    iconClass: "text-amber-600",
                  },
                  {
                    label: "Students",
                    value: String(viewingExam.students),
                    icon: Users,
                    iconClass: "text-emerald-600",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <Icon size={18} className={`mb-2 ${item.iconClass}`} />

                      <p className="text-[11px] font-semibold text-slate-500">
                        {item.label}
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Performance */}
              {viewingExam.status !== "Upcoming" && (
                <div className="rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 p-4">
                    <h3 className="font-bold text-slate-900">
                      Performance Snapshot
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-xs font-semibold text-blue-600">
                        Average Score
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {viewingExam.averageScore}
                      </p>
                    </div>

                    <div className="rounded-xl bg-emerald-50 p-4">
                      <p className="text-xs font-semibold text-emerald-600">
                        Pass Rate
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {viewingExam.passRate}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-purple-50 p-4">
                      <p className="text-xs font-semibold text-purple-600">
                        Attendance
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {viewingExam.attendanceRate}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-amber-50 p-4">
                      <p className="text-xs font-semibold text-amber-600">
                        Top Score
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {viewingExam.topScore}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Assessment */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Award size={18} className="text-amber-600" />

                  <h3 className="font-bold text-slate-900">Assessment</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Total Marks</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {viewingExam.totalMarks}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Passing</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {viewingExam.passingMarks}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Questions</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {viewingExam.questions}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Mode</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {viewingExam.mode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Settings2 size={18} className="text-blue-600" />

                  <h3 className="font-bold text-slate-900">Exam Settings</h3>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  {[
                    [
                      "Negative marking",
                      viewingExam.negativeMarking
                        ? `${viewingExam.negativeMarks} marks`
                        : "Disabled",
                    ],
                    [
                      "Question randomization",
                      viewingExam.randomizeQuestions ? "Enabled" : "Disabled",
                    ],
                    [
                      "Option randomization",
                      viewingExam.randomizeOptions ? "Enabled" : "Disabled",
                    ],
                    [
                      "Proctoring",
                      viewingExam.proctoring ? "Enabled" : "Disabled",
                    ],
                    [
                      "Auto publish results",
                      viewingExam.publishResultsAutomatically
                        ? "Enabled"
                        : "Manual",
                    ],
                    [
                      "Reattempt",
                      viewingExam.allowReattempt ? "Allowed" : "Not allowed",
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
                    >
                      <span className="text-xs font-semibold text-slate-500">
                        {label}
                      </span>

                      <span className="text-xs font-bold text-slate-900">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen size={18} className="text-emerald-600" />

                  <h3 className="font-bold text-slate-900">
                    Student Instructions
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {viewingExam.instructions ||
                    "No instructions added for this examination."}
                </div>
              </div>

              {/* AI */}
              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                <div className="flex gap-3">
                  <Sparkles
                    size={18}
                    className="mt-0.5 shrink-0 text-purple-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-purple-900">
                      AI exam note
                    </p>

                    <p className="mt-1 text-xs leading-5 text-purple-800">
                      This assessment can later be connected to AI-powered
                      question generation, difficulty analysis, result
                      interpretation and student recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
              <button
                onClick={() => {
                  openEditForm(viewingExam);
                  setViewingExam(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <Pencil size={16} />
                Edit
              </button>

              {viewingExam.status === "Upcoming" && (
                <button
                  onClick={() => handleStartExam(viewingExam.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-600"
                >
                  <Play size={16} />
                  Start Exam
                </button>
              )}

              {viewingExam.status === "Ongoing" && (
                <button
                  onClick={() => handleCompleteExam(viewingExam.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  <Check size={16} />
                  Complete Exam
                </button>
              )}

              {viewingExam.status === "Completed" && (
                <button
                  onClick={() => {
                    handlePublishResults(viewingExam);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <Send size={16} />
                  Publish Results
                </button>
              )}

              <button
                onClick={() => setViewingExam(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Modal */}
      {showAI && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-slate-200 bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-5 text-white sm:px-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                    <BrainCircuit size={21} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">AI Exam Assistant</h2>

                      <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] font-bold">
                        DEMO AI
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-purple-100">
                      Simulated intelligence layer for your exam operations.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAI(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-purple-600">
                  AI recommendation
                </p>

                <p className="mt-2 text-sm leading-6 text-purple-900">
                  Your current exam data suggests that attendance and pass-rate
                  monitoring should be prioritized for difficult assessments.
                  Consider automatically flagging students who repeatedly score
                  below the passing threshold.
                </p>
              </div>

              {aiInsights.lowAttendance.length > 0 && (
                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <CircleAlert size={18} className="mt-0.5 text-amber-600" />

                    <div>
                      <p className="text-sm font-bold text-amber-900">
                        Attendance opportunity
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-800">
                        {aiInsights.lowAttendance.length} completed exam
                        {aiInsights.lowAttendance.length === 1 ? "" : "s"} have
                        attendance below the 92% target. Automated reminders
                        could be triggered before future assessments.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {aiInsights.hardExams.length > 0 && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                  <div className="flex gap-3">
                    <TrendingDown size={18} className="mt-0.5 text-red-600" />

                    <div>
                      <p className="text-sm font-bold text-red-900">
                        Difficulty signal
                      </p>

                      <p className="mt-1 text-xs leading-5 text-red-800">
                        Some hard assessments are showing lower pass rates. AI
                        could later analyze question difficulty and identify
                        which concepts are causing the most mistakes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <p className="mb-3 text-sm font-bold text-slate-900">
                  Suggested AI workflows
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      icon: Target,
                      title: "Find at-risk students",
                      text: "Identify students with repeated low scores.",
                    },
                    {
                      icon: BrainCircuit,
                      title: "Analyze difficult questions",
                      text: "Detect concepts with unusual error rates.",
                    },
                    {
                      icon: CalendarClock,
                      title: "Optimize schedule",
                      text: "Suggest better spacing between assessments.",
                    },
                    {
                      icon: FileBarChart,
                      title: "Generate exam report",
                      text: "Create a management-ready performance summary.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.title}
                        onClick={() =>
                          showToast(`${item.title} AI workflow queued.`, "info")
                        }
                        className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-purple-200 hover:bg-purple-50"
                      >
                        <Icon size={18} className="text-purple-600" />

                        <p className="mt-3 text-sm font-bold text-slate-900">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.text}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] leading-5 text-slate-500">
                  <strong className="text-slate-700">AI status:</strong> These
                  recommendations are simulated locally. Later we can connect
                  this interface to your backend AI service and real exam/result
                  data.
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-5 py-4 sm:px-6">
              <button
                onClick={() => setShowAI(false)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  <Trophy size={13} />
                  Results
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {showResults.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {showResults.batch} · {formatDate(showResults.examDate)}
                </p>
              </div>

              <button
                onClick={() => setShowResults(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-semibold text-blue-600">Average</p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {showResults.averageScore}
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-xs font-semibold text-emerald-600">
                    Pass Rate
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {showResults.passRate}%
                  </p>
                </div>

                <div className="rounded-2xl bg-purple-50 p-4">
                  <p className="text-xs font-semibold text-purple-600">
                    Attendance
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {showResults.attendanceRate}%
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="text-xs font-semibold text-amber-600">
                    Top Score
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {showResults.topScore}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900">
                  Result Distribution
                </h3>

                <div className="mt-5 space-y-4">
                  {[
                    {
                      label: "Excellent",
                      value: 18,
                      className: "bg-emerald-500",
                    },
                    {
                      label: "Good",
                      value: 34,
                      className: "bg-blue-500",
                    },
                    {
                      label: "Needs Improvement",
                      value: 31,
                      className: "bg-amber-500",
                    },
                    {
                      label: "At Risk",
                      value: 17,
                      className: "bg-red-500",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">
                          {item.label}
                        </span>

                        <span className="text-xs font-bold text-slate-900">
                          {item.value}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${item.className}`}
                          style={{
                            width: `${item.value}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                <div className="flex gap-3">
                  <BrainCircuit size={18} className="mt-0.5 text-purple-600" />

                  <div>
                    <p className="text-sm font-bold text-purple-900">
                      AI result insight
                    </p>

                    <p className="mt-1 text-xs leading-5 text-purple-800">
                      The result profile indicates a mixed performance
                      distribution. A future AI layer could automatically
                      generate student-level remediation plans and identify
                      topics that require revision.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4 sm:px-6">
              <button
                onClick={() => showToast("Result report exported.")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <Download size={16} />
                Export
              </button>

              <button
                onClick={() => setShowResults(null)}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteExamId && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Delete examination?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This will remove the examination from the current admin view. This
              demo page does not permanently delete backend records.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDeleteExamId(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteExam}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700"
              >
                Delete Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[200] max-w-sm">
          <div
            className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-2xl ${
              toast.type === "success"
                ? "border-emerald-100"
                : toast.type === "error"
                  ? "border-red-100"
                  : "border-blue-100"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                toast.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : toast.type === "error"
                    ? "bg-red-50 text-red-600"
                    : "bg-blue-50 text-blue-600"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={17} />
              ) : toast.type === "error" ? (
                <AlertCircle size={17} />
              ) : (
                <RefreshCw size={17} />
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                {toast.type === "success"
                  ? "Success"
                  : toast.type === "error"
                    ? "Action failed"
                    : "Information"}
              </p>

              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => setToast(null)}
              className="ml-2 text-slate-300 hover:text-slate-600"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

import Slidebar from "../components/Slidebar";
import PageHeader from "../components/PageHeader";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock3,
  Copy,
  Edit3,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  History,
  Info,
  LayoutGrid,
  List,
  Maximize2,
  MessageSquare,
  MonitorPlay,
  MoreVertical,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ClassStatus = "Live" | "Upcoming" | "Completed" | "Cancelled";

type RecordingStatus = "Available" | "Processing" | "Not Recorded";

type ClassView = "list" | "timeline";

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
  capacity: number;
  status: ClassStatus;
  platform: string;
  room: string;
  recording: RecordingStatus;
  attendance: number;
  engagement: number;
  description: string;
  topic: string;
  createdAt: string;
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "live" | "schedule" | "recording" | "system";
};

/* =========================================================
   DEMO DATA
========================================================= */

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
    capacity: 60,
    status: "Live",
    platform: "Coaching Live",
    room: "Virtual Room A",
    recording: "Processing",
    attendance: 92,
    engagement: 87,
    description:
      "Advanced problem solving and concept revision for JEE Advanced Physics.",
    topic: "Electrostatics — Advanced Problems",
    createdAt: "2026-09-08",
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
    capacity: 70,
    status: "Upcoming",
    platform: "Coaching Live",
    room: "Virtual Room B",
    recording: "Not Recorded",
    attendance: 0,
    engagement: 0,
    description:
      "Reaction mechanisms, named reactions and high-yield NEET concepts.",
    topic: "Reaction Mechanisms",
    createdAt: "2026-09-09",
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
    capacity: 60,
    status: "Upcoming",
    platform: "Coaching Live",
    room: "Virtual Room A",
    recording: "Not Recorded",
    attendance: 0,
    engagement: 0,
    description:
      "Limits, continuity and differentiation with JEE Main practice questions.",
    topic: "Differentiation",
    createdAt: "2026-09-09",
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
    capacity: 70,
    status: "Completed",
    platform: "Coaching Live",
    room: "Virtual Room B",
    recording: "Available",
    attendance: 94,
    engagement: 89,
    description:
      "Complete overview of human physiology with exam-focused questions.",
    topic: "Circulatory System",
    createdAt: "2026-09-07",
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
    capacity: 60,
    status: "Completed",
    platform: "Coaching Live",
    room: "Virtual Room A",
    recording: "Available",
    attendance: 96,
    engagement: 91,
    description:
      "Modern Physics concepts with previous-year JEE Advanced questions.",
    topic: "Photoelectric Effect",
    createdAt: "2026-09-06",
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
    capacity: 70,
    status: "Upcoming",
    platform: "Coaching Live",
    room: "Virtual Room C",
    recording: "Not Recorded",
    attendance: 0,
    engagement: 0,
    description: "Plant tissue systems and anatomy with visual explanations.",
    topic: "Plant Tissues",
    createdAt: "2026-09-09",
  },
  {
    id: "CLS-1007",
    title: "Physical Chemistry",
    teacher: "Dr. Vikram Joshi",
    batch: "JEE Main",
    course: "JEE Preparation",
    date: "2026-09-14",
    time: "03:00 PM",
    duration: "120 min",
    students: 38,
    capacity: 60,
    status: "Upcoming",
    platform: "Coaching Live",
    room: "Virtual Room C",
    recording: "Not Recorded",
    attendance: 0,
    engagement: 0,
    description: "Numerical problem solving and important chemistry formulas.",
    topic: "Thermodynamics",
    createdAt: "2026-09-09",
  },
  {
    id: "CLS-1008",
    title: "English Communication",
    teacher: "Ms. Sneha Kapoor",
    batch: "Foundation 2027",
    course: "Foundation Program",
    date: "2026-09-12",
    time: "06:30 PM",
    duration: "60 min",
    students: 29,
    capacity: 40,
    status: "Upcoming",
    platform: "Coaching Live",
    room: "Virtual Room D",
    recording: "Not Recorded",
    attendance: 0,
    engagement: 0,
    description:
      "Communication skills and academic English for foundation students.",
    topic: "Effective Communication",
    createdAt: "2026-09-10",
  },
];

const initialActivities: ActivityItem[] = [
  {
    id: "ACT-1",
    title: "Physics class is live",
    description: "Dr. Rahul Sharma started JEE Advanced Physics.",
    time: "Just now",
    type: "live",
  },
  {
    id: "ACT-2",
    title: "Class scheduled",
    description: "Organic Chemistry scheduled for NEET 2027.",
    time: "18 min ago",
    type: "schedule",
  },
  {
    id: "ACT-3",
    title: "Recording available",
    description: "Modern Physics recording is ready.",
    time: "2 hrs ago",
    type: "recording",
  },
  {
    id: "ACT-4",
    title: "System check completed",
    description: "Virtual classroom infrastructure check passed.",
    time: "3 hrs ago",
    type: "system",
  },
];

const teachers = [
  "Dr. Rahul Sharma",
  "Dr. Priya Verma",
  "Amit Patel",
  "Dr. Neha Singh",
  "Dr. Anjali Mehta",
  "Dr. Vikram Joshi",
  "Ms. Sneha Kapoor",
];

const courses = ["JEE Preparation", "NEET Preparation", "Foundation Program"];

const batches = ["JEE Advanced", "JEE Main", "NEET 2027", "Foundation 2027"];

const rooms = [
  "Virtual Room A",
  "Virtual Room B",
  "Virtual Room C",
  "Virtual Room D",
];

/* =========================================================
   STATUS CONFIG
========================================================= */

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
    className: "border-red-200 bg-red-50 text-red-700",
    icon: CircleDot,
  },
  Upcoming: {
    label: "Upcoming",
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: Clock3,
  },
  Completed: {
    label: "Completed",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  Cancelled: {
    label: "Cancelled",
    className: "border-slate-200 bg-slate-100 text-slate-600",
    icon: X,
  },
};

/* =========================================================
   HELPERS
========================================================= */

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDayName(date: string) {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
  });
}

function getCapacityPercent(item: OnlineClass) {
  if (!item.capacity) return 0;
  return Math.min(100, Math.round((item.students / item.capacity) * 100));
}

function getDateValue(date: string, time: string) {
  const normalizedTime = time || "12:00 PM";

  const parsed = new Date(`${date} ${normalizedTime}`);

  if (Number.isNaN(parsed.getTime())) {
    return new Date(`${date}T00:00:00`).getTime();
  }

  return parsed.getTime();
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function OnlineClassesPage() {
  const [classes, setClasses] = useState<OnlineClass[]>(initialClasses);
  const [activities, setActivities] =
    useState<ActivityItem[]>(initialActivities);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ClassStatus>("All");
  const [batchFilter, setBatchFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [teacherFilter, setTeacherFilter] = useState("All");

  const [sortBy, setSortBy] = useState<
    "date" | "title" | "students" | "engagement"
  >("date");

  const [classView, setClassView] = useState<ClassView>("list");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  const [viewingClass, setViewingClass] = useState<OnlineClass | null>(null);

  const [editingClass, setEditingClass] = useState<OnlineClass | null>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [toast, setToast] = useState("");

  const [aiQuestion, setAiQuestion] = useState("");

  /* =========================================================
     CREATE FORM
  ========================================================= */

  const [newTitle, setNewTitle] = useState("");
  const [newTeacher, setNewTeacher] = useState("");
  const [newBatch, setNewBatch] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newDuration, setNewDuration] = useState("90 min");
  const [newRoom, setNewRoom] = useState("Virtual Room A");
  const [newCapacity, setNewCapacity] = useState("60");
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [formError, setFormError] = useState("");

  /* =========================================================
     TOAST
  ========================================================= */

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2800);
  };

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const totalClasses = classes.length;

  const liveClasses = classes.filter((item) => item.status === "Live");

  const upcomingClasses = classes.filter((item) => item.status === "Upcoming");

  const completedClasses = classes.filter(
    (item) => item.status === "Completed",
  );

  const totalStudents = classes.reduce((sum, item) => sum + item.students, 0);

  const averageAttendance =
    completedClasses.length > 0
      ? Math.round(
          completedClasses.reduce((sum, item) => sum + item.attendance, 0) /
            completedClasses.length,
        )
      : 0;

  const averageEngagement =
    completedClasses.length > 0
      ? Math.round(
          completedClasses.reduce((sum, item) => sum + item.engagement, 0) /
            completedClasses.length,
        )
      : 0;

  const recordingsAvailable = classes.filter(
    (item) => item.recording === "Available",
  ).length;

  const today = "2026-09-11";

  const todaysClasses = useMemo(() => {
    return classes
      .filter((item) => item.date === today)
      .sort(
        (a, b) => getDateValue(a.date, a.time) - getDateValue(b.date, b.time),
      );
  }, [classes]);

  const batches = useMemo(() => {
    return ["All", ...Array.from(new Set(classes.map((item) => item.batch)))];
  }, [classes]);

  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = classes.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.teacher.toLowerCase().includes(query) ||
        item.batch.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.topic.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesBatch = batchFilter === "All" || item.batch === batchFilter;

      const matchesCourse =
        courseFilter === "All" || item.course === courseFilter;

      const matchesTeacher =
        teacherFilter === "All" || item.teacher === teacherFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesBatch &&
        matchesCourse &&
        matchesTeacher
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "students") {
        return b.students - a.students;
      }

      if (sortBy === "engagement") {
        return b.engagement - a.engagement;
      }

      return getDateValue(a.date, a.time) - getDateValue(b.date, b.time);
    });
  }, [
    classes,
    search,
    statusFilter,
    batchFilter,
    courseFilter,
    teacherFilter,
    sortBy,
  ]);

  /* =========================================================
     AI DATA
  ========================================================= */

  const aiInsights = useMemo(() => {
    const insights: {
      title: string;
      description: string;
      type: "warning" | "success" | "info";
    }[] = [];

    const lowAttendance = completedClasses.filter(
      (item) => item.attendance < 90,
    );

    const highEngagement = completedClasses.filter(
      (item) => item.engagement >= 90,
    );

    const highCapacity = upcomingClasses.filter(
      (item) => getCapacityPercent(item) >= 80,
    );

    if (liveClasses.length > 0) {
      insights.push({
        title: `${liveClasses.length} class${
          liveClasses.length > 1 ? "es are" : " is"
        } live`,
        description:
          "AI recommends monitoring attendance and engagement during the live session.",
        type: "success",
      });
    }

    if (lowAttendance.length > 0) {
      insights.push({
        title: "Attendance needs attention",
        description: `${lowAttendance.length} completed class${
          lowAttendance.length > 1 ? "es have" : " has"
        } attendance below 90%. Consider automated student reminders.`,
        type: "warning",
      });
    }

    if (highEngagement.length > 0) {
      insights.push({
        title: "High engagement detected",
        description: `${highEngagement.length} recent class${
          highEngagement.length > 1 ? "es" : ""
        } recorded engagement above 90%.`,
        type: "success",
      });
    }

    if (highCapacity.length > 0) {
      insights.push({
        title: "Upcoming capacity risk",
        description: `${highCapacity.length} upcoming session${
          highCapacity.length > 1 ? "s are" : " is"
        } approaching virtual room capacity.`,
        type: "warning",
      });
    }

    if (insights.length === 0) {
      insights.push({
        title: "Schedule looks healthy",
        description:
          "No major operational issues were detected in the current demo data.",
        type: "info",
      });
    }

    return insights;
  }, [classes, completedClasses, liveClasses, upcomingClasses]);

  /* =========================================================
     FORM HELPERS
  ========================================================= */

  const resetForm = () => {
    setNewTitle("");
    setNewTeacher("");
    setNewBatch("");
    setNewCourse("");
    setNewDate("");
    setNewTime("");
    setNewDuration("90 min");
    setNewRoom("Virtual Room A");
    setNewCapacity("60");
    setNewTopic("");
    setNewDescription("");
    setFormError("");
  };

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    resetForm();
  };

  const openEditModal = (item: OnlineClass) => {
    setEditingClass(item);

    setNewTitle(item.title);
    setNewTeacher(item.teacher);
    setNewBatch(item.batch);
    setNewCourse(item.course);
    setNewDate(item.date);
    setNewTime(item.time);
    setNewDuration(item.duration);
    setNewRoom(item.room);
    setNewCapacity(String(item.capacity));
    setNewTopic(item.topic);
    setNewDescription(item.description);

    setFormError("");
    setShowEditModal(true);
    setOpenMenu(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingClass(null);
    resetForm();
  };

  /* =========================================================
     CREATE
  ========================================================= */

  const handleCreateClass = () => {
    if (
      !newTitle.trim() ||
      !newTeacher ||
      !newBatch ||
      !newCourse ||
      !newDate ||
      !newTime
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    const numericCapacity = Number(newCapacity);

    if (!numericCapacity || numericCapacity < 1) {
      setFormError("Please enter a valid class capacity.");
      return;
    }

    const newClass: OnlineClass = {
      id: `CLS-${1000 + classes.length + 1}`,
      title: newTitle.trim(),
      teacher: newTeacher,
      batch: newBatch,
      course: newCourse,
      date: newDate,
      time: newTime,
      duration: newDuration,
      students: 0,
      capacity: numericCapacity,
      status: "Upcoming",
      platform: "Coaching Live",
      room: newRoom,
      recording: "Not Recorded",
      attendance: 0,
      engagement: 0,
      description:
        newDescription.trim() ||
        "Online teaching session for enrolled students.",
      topic: newTopic.trim() || "General Class",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setClasses((current) => [newClass, ...current]);

    setActivities((current) => [
      {
        id: `ACT-${Date.now()}`,
        title: "New class scheduled",
        description: `${newClass.title} was added to the online schedule.`,
        time: "Just now",
        type: "schedule",
      },
      ...current,
    ]);

    closeCreateModal();
    showToast("Online class scheduled successfully.");
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEditClass = () => {
    if (!editingClass) return;

    if (
      !newTitle.trim() ||
      !newTeacher ||
      !newBatch ||
      !newCourse ||
      !newDate ||
      !newTime
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    const numericCapacity = Number(newCapacity);

    if (!numericCapacity || numericCapacity < 1) {
      setFormError("Please enter a valid class capacity.");
      return;
    }

    setClasses((current) =>
      current.map((item) =>
        item.id === editingClass.id
          ? {
              ...item,
              title: newTitle.trim(),
              teacher: newTeacher,
              batch: newBatch,
              course: newCourse,
              date: newDate,
              time: newTime,
              duration: newDuration,
              room: newRoom,
              capacity: numericCapacity,
              topic: newTopic.trim() || item.topic,
              description: newDescription.trim() || item.description,
            }
          : item,
      ),
    );

    closeEditModal();
    showToast("Class details updated.");
  };

  /* =========================================================
     STATUS ACTIONS
  ========================================================= */

  const handleStartClass = (item: OnlineClass) => {
    setClasses((current) =>
      current.map((classItem) =>
        classItem.id === item.id
          ? {
              ...classItem,
              status: "Live",
            }
          : classItem,
      ),
    );

    setActivities((current) => [
      {
        id: `ACT-${Date.now()}`,
        title: "Class started",
        description: `${item.title} is now live.`,
        time: "Just now",
        type: "live",
      },
      ...current,
    ]);

    setOpenMenu(null);
    setViewingClass(null);

    showToast(`${item.title} is now live.`);
  };

  const handleCompleteClass = (item: OnlineClass) => {
    setClasses((current) =>
      current.map((classItem) =>
        classItem.id === item.id
          ? {
              ...classItem,
              status: "Completed",
              recording:
                classItem.recording === "Not Recorded"
                  ? "Processing"
                  : classItem.recording,
            }
          : classItem,
      ),
    );

    setActivities((current) => [
      {
        id: `ACT-${Date.now()}`,
        title: "Class completed",
        description: `${item.title} has ended.`,
        time: "Just now",
        type: "system",
      },
      ...current,
    ]);

    setOpenMenu(null);
    setViewingClass(null);

    showToast("Class marked as completed.");
  };

  const handleCancelClass = (item: OnlineClass) => {
    setClasses((current) =>
      current.map((classItem) =>
        classItem.id === item.id
          ? {
              ...classItem,
              status: "Cancelled",
            }
          : classItem,
      ),
    );

    setOpenMenu(null);
    showToast("Class cancelled.");
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = (id: string) => {
    const item = classes.find((classItem) => classItem.id === id);

    if (!item) return;

    const confirmed = window.confirm(
      `Delete "${item.title}"?\n\nThis is demo data and cannot be recovered after deletion.`,
    );

    if (!confirmed) return;

    setClasses((current) => current.filter((classItem) => classItem.id !== id));

    setOpenMenu(null);
    setViewingClass(null);

    showToast("Class deleted.");
  };

  /* =========================================================
     DUPLICATE
  ========================================================= */

  const duplicateClass = (item: OnlineClass) => {
    const duplicated: OnlineClass = {
      ...item,
      id: `CLS-${1000 + classes.length + 1}`,
      title: `${item.title} — Copy`,
      status: "Upcoming",
      recording: "Not Recorded",
      attendance: 0,
      engagement: 0,
      students: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setClasses((current) => [duplicated, ...current]);

    setOpenMenu(null);

    showToast("Class duplicated.");
  };

  /* =========================================================
     FILTER RESET
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setBatchFilter("All");
    setCourseFilter("All");
    setTeacherFilter("All");
    setSortBy("date");

    showToast("Filters cleared.");
  };

  /* =========================================================
     AI
  ========================================================= */

  const handleAskAI = () => {
    if (!aiQuestion.trim()) {
      showToast("Ask AI something first.");
      return;
    }

    showToast("AI analysis generated.");
  };

  const aiResponse = useMemo(() => {
    const question = aiQuestion.toLowerCase();

    if (!question) {
      return "Ask me about schedule optimization, attendance, engagement, capacity, teacher workload, recordings or class performance.";
    }

    if (question.includes("attendance") || question.includes("absent")) {
      return `Based on the current demo data, completed classes have an average attendance of ${averageAttendance}%. I would prioritize classes below 90% attendance for automated reminders and follow-up.`;
    }

    if (question.includes("engagement") || question.includes("performance")) {
      return `Average completed-class engagement is ${averageEngagement}%. High-performing sessions can be studied for teaching patterns, duration and topic structure.`;
    }

    if (question.includes("schedule") || question.includes("timing")) {
      return `There are ${upcomingClasses.length} upcoming sessions. AI recommends checking teacher availability, virtual-room conflicts and student overlap before publishing the final schedule.`;
    }

    if (question.includes("capacity") || question.includes("student")) {
      return `The highest-capacity upcoming sessions should be monitored. Classes approaching 80% capacity can trigger proactive capacity alerts and room scaling recommendations.`;
    }

    return "AI recommends prioritizing live-session monitoring, low-attendance follow-up, high-engagement pattern detection and upcoming schedule conflict checks.";
  }, [
    aiQuestion,
    averageAttendance,
    averageEngagement,
    upcomingClasses.length,
  ]);

  /* =========================================================
     CLASS FORM
  ========================================================= */

  const classForm = (
    <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Class title <span className="text-red-500">*</span>
        </label>

        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="e.g. JEE Advanced Physics"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Teacher <span className="text-red-500">*</span>
        </label>

        <select
          value={newTeacher}
          onChange={(event) => setNewTeacher(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        >
          <option value="">Select teacher</option>

          {teachers.map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Batch <span className="text-red-500">*</span>
        </label>

        <select
          value={newBatch}
          onChange={(event) => setNewBatch(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        >
          <option value="">Select batch</option>

          {batches
            .filter((item) => item !== "All")
            .map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Course <span className="text-red-500">*</span>
        </label>

        <select
          value={newCourse}
          onChange={(event) => setNewCourse(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        >
          <option value="">Select course</option>

          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Topic
        </label>

        <input
          value={newTopic}
          onChange={(event) => setNewTopic(event.target.value)}
          placeholder="e.g. Electrostatics"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Duration
        </label>

        <select
          value={newDuration}
          onChange={(event) => setNewDuration(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
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
          Date <span className="text-red-500">*</span>
        </label>

        <input
          type="date"
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Time <span className="text-red-500">*</span>
        </label>

        <input
          type="time"
          value={newTime}
          onChange={(event) => setNewTime(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Virtual room
        </label>

        <select
          value={newRoom}
          onChange={(event) => setNewRoom(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        >
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Student capacity
        </label>

        <input
          type="number"
          min="1"
          value={newCapacity}
          onChange={(event) => setNewCapacity(event.target.value)}
          placeholder="60"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Class description
        </label>

        <textarea
          rows={4}
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
          placeholder="Add notes about the class, topics or teaching plan..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>
    </div>
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <Slidebar />

      <main className="ml-64 min-h-screen">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="border-b border-slate-200 bg-white">
          <PageHeader
            title="Online Classes"
            description="Manage live classrooms, schedules, recordings and learning analytics."
            icon={<Video size={20} />}
            actions={
              <>
                <button
                  type="button"
                  onClick={() => setShowAnalyticsModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <BarChart3 size={16} />
                  Analytics
                </button>

                <button
                  type="button"
                  onClick={() => setShowAiModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 shadow-sm transition hover:border-purple-300 hover:bg-purple-100"
                >
                  <Sparkles size={16} />
                  Ask AI
                </button>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Plus size={17} />
                  Schedule Class
                </button>
              </>
            }
          />
        </div>

        <div className="space-y-6 p-8">
          {/* ===================================================
              LIVE HERO
          =================================================== */}

          {liveClasses.length > 0 && (
            <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-xl">
              <div className="relative overflow-hidden">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative grid gap-8 p-7 xl:grid-cols-[1.4fr_0.6fr]">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-300 ring-1 ring-red-500/20">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                        LIVE NOW
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300">
                        {liveClasses[0].id}
                      </span>
                    </div>

                    <h2 className="max-w-3xl text-3xl font-bold tracking-tight">
                      {liveClasses[0].title}
                    </h2>

                    <p className="mt-2 text-sm font-medium text-slate-400">
                      {liveClasses[0].topic}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-5 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <GraduationCap size={17} className="text-slate-500" />
                        {liveClasses[0].teacher}
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Users size={17} className="text-slate-500" />
                        {liveClasses[0].students} students
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock3 size={17} className="text-slate-500" />
                        {liveClasses[0].duration}
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <button
                        onClick={() => setViewingClass(liveClasses[0])}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                      >
                        <Play size={17} />
                        Open Classroom
                      </button>

                      <button
                        onClick={() => setViewingClass(liveClasses[0])}
                        className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/10 transition hover:bg-white/15"
                      >
                        <Eye size={17} />
                        Monitor Session
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 self-end">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <UserCheck size={15} />
                        Attendance
                      </div>

                      <p className="mt-3 text-3xl font-bold">
                        {liveClasses[0].attendance}%
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Activity size={15} />
                        Engagement
                      </div>

                      <p className="mt-3 text-3xl font-bold">
                        {liveClasses[0].engagement}%
                      </p>
                    </div>

                    <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">
                          Classroom capacity
                        </span>

                        <span className="text-sm font-bold text-white">
                          {liveClasses[0].students}/{liveClasses[0].capacity}
                        </span>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-blue-400 transition-all"
                          style={{
                            width: `${getCapacityPercent(liveClasses[0])}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================
              KPI CARDS
          =================================================== */}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Classes",
                value: totalClasses,
                detail: `${upcomingClasses.length} upcoming`,
                icon: MonitorPlay,
                box: "bg-blue-50 text-blue-600",
              },
              {
                label: "Live Now",
                value: liveClasses.length,
                detail:
                  liveClasses.length > 0
                    ? "Requires monitoring"
                    : "No live classes",
                icon: CircleDot,
                box: "bg-red-50 text-red-600",
              },
              {
                label: "Attendance",
                value: `${averageAttendance}%`,
                detail: "Average completed",
                icon: UserCheck,
                box: "bg-emerald-50 text-emerald-600",
              },
              {
                label: "Engagement",
                value: `${averageEngagement}%`,
                detail: `${recordingsAvailable} recordings ready`,
                icon: Activity,
                box: "bg-violet-50 text-violet-600",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {item.label}
                      </p>

                      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        {item.detail}
                      </p>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.box}`}
                    >
                      <Icon size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* ===================================================
              AI COMMAND CENTER
          =================================================== */}

          <section className="overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 shadow-sm">
            <div className="flex flex-col gap-5 p-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                  <Sparkles size={22} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-950">
                      AI Class Command Center
                    </h2>

                    <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                      Demo AI
                    </span>
                  </div>

                  <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                    Intelligent insights for attendance, engagement, capacity
                    and schedule operations. AI integration can be connected to
                    your backend later.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAiModal(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700"
              >
                <Sparkles size={17} />
                Open AI Assistant
              </button>
            </div>

            <div className="grid gap-3 border-t border-violet-100 p-4 md:grid-cols-3">
              {aiInsights.slice(0, 3).map((insight) => (
                <div
                  key={insight.title}
                  className="rounded-2xl bg-white/80 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        insight.type === "warning"
                          ? "bg-amber-50 text-amber-600"
                          : insight.type === "success"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {insight.type === "warning" ? (
                        <AlertTriangle size={16} />
                      ) : insight.type === "success" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Info size={16} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {insight.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================
              TODAY + AI INSIGHTS
          =================================================== */}

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            {/* TODAY */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    Today&apos;s Classes
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {formatDate(today)} · {todaysClasses.length} sessions
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setBatchFilter("All");
                    setCourseFilter("All");
                    setTeacherFilter("All");
                  }}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  View all
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {todaysClasses.length === 0 ? (
                  <div className="p-10 text-center">
                    <CalendarDays
                      className="mx-auto text-slate-300"
                      size={30}
                    />
                    <p className="mt-3 text-sm font-bold text-slate-700">
                      No classes today
                    </p>
                  </div>
                ) : (
                  todaysClasses.map((item) => {
                    const config = statusConfig[item.status];
                    const StatusIcon = config.icon;

                    return (
                      <div
                        key={item.id}
                        className="group flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                      >
                        <div className="hidden w-20 shrink-0 text-center sm:block">
                          <p className="text-xs font-bold uppercase text-slate-400">
                            {getDayName(item.date)}
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-900">
                            {item.time}
                          </p>
                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Video size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-sm font-bold text-slate-900">
                              {item.title}
                            </h3>

                            <span
                              className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold ${config.className}`}
                            >
                              <StatusIcon size={11} />
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-1 text-xs font-medium text-slate-500">
                            {item.teacher} · {item.batch} · {item.duration}
                          </p>
                        </div>

                        <button
                          onClick={() => setViewingClass(item)}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 opacity-100 transition hover:bg-slate-50 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <Eye size={14} />
                          View
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* AI INSIGHTS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={17} className="text-violet-600" />

                    <h2 className="text-lg font-bold text-slate-950">
                      Smart Insights
                    </h2>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Automated operational recommendations.
                  </p>
                </div>

                <button
                  onClick={() => setShowAiModal(true)}
                  className="text-xs font-bold text-violet-600 hover:text-violet-700"
                >
                  Ask AI
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {aiInsights.map((insight) => (
                  <div
                    key={insight.title}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          insight.type === "warning"
                            ? "bg-amber-100 text-amber-700"
                            : insight.type === "success"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {insight.type === "warning" ? (
                          <AlertTriangle size={15} />
                        ) : insight.type === "success" ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <Info size={15} />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {insight.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===================================================
              SECURITY
          =================================================== */}

          <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <ShieldCheck size={20} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-950">
                    Secure Classroom Infrastructure
                  </h2>

                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-blue-700">
                    ARCHITECTURE READY
                  </span>
                </div>

                <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600">
                  The current page provides the administrative interface.
                  Production live video, authentication, encrypted media, access
                  control, recording protection and true end-to-end encrypted
                  classroom media will be implemented in the dedicated video
                  infrastructure phase.
                </p>
              </div>

              <button
                onClick={() => showToast("Security architecture panel opened.")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs font-bold text-blue-700 shadow-sm hover:bg-blue-50"
              >
                <Settings2 size={15} />
                Security
              </button>
            </div>
          </section>

          {/* ===================================================
              FILTERS + CLASS LIST
          =================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    Class Schedule
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Manage all online teaching sessions from one place.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setClassView("list")}
                    className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${
                      classView === "list"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <List size={15} />
                    List
                  </button>

                  <button
                    onClick={() => setClassView("timeline")}
                    className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${
                      classView === "timeline"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <LayoutGrid size={15} />
                    Timeline
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12">
                <div className="relative lg:col-span-5">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search class, teacher, topic, batch..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as "All" | ClassStatus)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 lg:col-span-2"
                >
                  <option value="All">All status</option>
                  <option value="Live">Live</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select
                  value={batchFilter}
                  onChange={(event) => setBatchFilter(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 lg:col-span-2"
                >
                  {batches.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch === "All" ? "All batches" : batch}
                    </option>
                  ))}
                </select>

                <select
                  value={courseFilter}
                  onChange={(event) => setCourseFilter(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 lg:col-span-2"
                >
                  <option value="All">All courses</option>

                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>

                <button
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 lg:col-span-1"
                >
                  <RefreshCw size={15} />
                  Reset
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Filter size={14} />
                  More filters:
                </div>

                <select
                  value={teacherFilter}
                  onChange={(event) => setTeacherFilter(event.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="All">All teachers</option>

                  {teachers.map((teacher) => (
                    <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value as
                        | "date"
                        | "title"
                        | "students"
                        | "engagement",
                    )
                  }
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="date">Sort by schedule</option>
                  <option value="title">Sort by title</option>
                  <option value="students">Sort by students</option>
                  <option value="engagement">Sort by engagement</option>
                </select>

                <span className="ml-auto rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {filteredClasses.length} classes
                </span>
              </div>
            </div>

            {/* =================================================
                TIMELINE VIEW
            ================================================= */}

            {classView === "timeline" ? (
              <div className="p-6">
                {filteredClasses.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Video size={25} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      No classes found
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </div>
                ) : (
                  <div className="relative space-y-4 before:absolute before:bottom-5 before:left-[22px] before:top-5 before:w-px before:bg-slate-200">
                    {filteredClasses.map((item) => {
                      const config = statusConfig[item.status];
                      const StatusIcon = config.icon;

                      return (
                        <div key={item.id} className="relative flex gap-5">
                          <div className="relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-sm">
                            <Video size={16} />
                          </div>

                          <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-base font-bold text-slate-950">
                                    {item.title}
                                  </h3>

                                  <span
                                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold ${config.className}`}
                                  >
                                    <StatusIcon size={11} />
                                    {item.status}
                                  </span>
                                </div>

                                <p className="mt-1 text-xs font-medium text-slate-500">
                                  {item.id} · {item.topic}
                                </p>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
                                <span className="rounded-lg bg-slate-50 px-3 py-2">
                                  {formatDate(item.date)}
                                </span>

                                <span className="rounded-lg bg-slate-50 px-3 py-2">
                                  {item.time}
                                </span>

                                <span className="rounded-lg bg-slate-50 px-3 py-2">
                                  {item.duration}
                                </span>
                              </div>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                              <div className="rounded-xl bg-slate-50 p-3">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                  Teacher
                                </p>

                                <p className="mt-1 truncate text-xs font-bold text-slate-800">
                                  {item.teacher}
                                </p>
                              </div>

                              <div className="rounded-xl bg-slate-50 p-3">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                  Batch
                                </p>

                                <p className="mt-1 truncate text-xs font-bold text-slate-800">
                                  {item.batch}
                                </p>
                              </div>

                              <div className="rounded-xl bg-slate-50 p-3">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                  Students
                                </p>

                                <p className="mt-1 text-xs font-bold text-slate-800">
                                  {item.students}/{item.capacity}
                                </p>
                              </div>

                              <div className="rounded-xl bg-slate-50 p-3">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                  Room
                                </p>

                                <p className="mt-1 truncate text-xs font-bold text-slate-800">
                                  {item.room}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => setViewingClass(item)}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={14} />
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* =================================================
                 LIST VIEW
              ================================================= */

              <div className="overflow-x-auto">
                {filteredClasses.length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Video size={25} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      No classes found
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Try changing your search or filters.
                    </p>

                    <button
                      onClick={clearFilters}
                      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <table className="w-full min-w-[1200px]">
                    <thead className="bg-slate-50">
                      <tr className="border-b border-slate-200 text-left">
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          Class
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          Teacher
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          Batch
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          Schedule
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          Capacity
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          Performance
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          Status
                        </th>

                        <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredClasses.map((item) => {
                        const config = statusConfig[item.status];
                        const StatusIcon = config.icon;
                        const capacity = getCapacityPercent(item);

                        return (
                          <tr
                            key={item.id}
                            className="group transition hover:bg-blue-50/30"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                    item.status === "Live"
                                      ? "bg-red-50 text-red-600"
                                      : "bg-blue-50 text-blue-600"
                                  }`}
                                >
                                  <Video size={18} />
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-bold text-slate-900">
                                    {item.title}
                                  </p>

                                  <p className="mt-1 truncate text-[11px] font-semibold text-slate-400">
                                    {item.id} · {item.topic}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                  <GraduationCap size={15} />
                                </div>

                                <span className="text-sm font-semibold text-slate-800">
                                  {item.teacher}
                                </span>
                              </div>
                            </td>

                            <td className="px-6 py-5">
                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  {item.batch}
                                </p>

                                <p className="mt-1 text-xs font-medium text-slate-400">
                                  {item.course}
                                </p>
                              </div>
                            </td>

                            <td className="px-6 py-5">
                              <div>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                  <CalendarDays
                                    size={14}
                                    className="text-slate-400"
                                  />
                                  {formatDate(item.date)}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                                  <Clock3 size={13} />
                                  {item.time} · {item.duration}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-5">
                              <div className="w-32">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-700">
                                    {item.students}/{item.capacity}
                                  </span>

                                  <span className="text-[10px] font-bold text-slate-400">
                                    {capacity}%
                                  </span>
                                </div>

                                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                  <div
                                    className={`h-full rounded-full ${
                                      capacity >= 90
                                        ? "bg-red-500"
                                        : capacity >= 75
                                          ? "bg-amber-500"
                                          : "bg-blue-500"
                                    }`}
                                    style={{
                                      width: `${capacity}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-5">
                              {item.status === "Upcoming" ? (
                                <div>
                                  <p className="text-xs font-bold text-slate-400">
                                    Not started
                                  </p>

                                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                                    Performance appears after class
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-700">
                                      {item.attendance}%
                                    </span>

                                    <span className="text-[10px] font-bold text-slate-400">
                                      attendance
                                    </span>
                                  </div>

                                  <div className="mt-1 flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-700">
                                      {item.engagement}%
                                    </span>

                                    <span className="text-[10px] font-bold text-slate-400">
                                      engagement
                                    </span>
                                  </div>
                                </div>
                              )}
                            </td>

                            <td className="px-6 py-5">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold ${config.className}`}
                              >
                                <StatusIcon size={12} />
                                {config.label}
                              </span>
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex items-center justify-end gap-2">
                                {item.status === "Live" && (
                                  <button
                                    onClick={() => setViewingClass(item)}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-red-700"
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
                                        openMenu === item.id ? null : item.id,
                                      )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                                  >
                                    <MoreVertical size={17} />
                                  </button>

                                  {openMenu === item.id && (
                                    <div className="absolute right-0 top-11 z-30 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                      {item.status === "Upcoming" && (
                                        <button
                                          onClick={() => handleStartClass(item)}
                                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-blue-50"
                                        >
                                          <Play size={15} />
                                          Start Class
                                        </button>
                                      )}

                                      {item.status === "Live" && (
                                        <button
                                          onClick={() =>
                                            handleCompleteClass(item)
                                          }
                                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-emerald-50"
                                        >
                                          <CheckCircle2 size={15} />
                                          End Class
                                        </button>
                                      )}

                                      <button
                                        onClick={() => {
                                          setViewingClass(item);
                                          setOpenMenu(null);
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                      >
                                        <Eye size={15} />
                                        View Details
                                      </button>

                                      <button
                                        onClick={() => openEditModal(item)}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-blue-50"
                                      >
                                        <Edit3 size={15} />
                                        Edit Class
                                      </button>

                                      <button
                                        onClick={() => duplicateClass(item)}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                      >
                                        <Copy size={15} />
                                        Duplicate
                                      </button>

                                      {item.status === "Upcoming" && (
                                        <button
                                          onClick={() =>
                                            handleCancelClass(item)
                                          }
                                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-amber-700 hover:bg-amber-50"
                                        >
                                          <Pause size={15} />
                                          Cancel Class
                                        </button>
                                      )}

                                      <div className="my-1 border-t border-slate-100" />

                                      <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                                      >
                                        <Trash2 size={15} />
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
                )}
              </div>
            )}
          </section>

          {/* ===================================================
              BOTTOM DASHBOARD
          =================================================== */}

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* ACTIVITY */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Latest online-class events.
                  </p>
                </div>

                <button
                  onClick={() => showToast("Activity refreshed.")}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  <RefreshCw size={15} />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex gap-4 px-6 py-4">
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        activity.type === "live"
                          ? "bg-red-50 text-red-600"
                          : activity.type === "recording"
                            ? "bg-emerald-50 text-emerald-600"
                            : activity.type === "schedule"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {activity.type === "live" ? (
                        <CircleDot size={16} />
                      ) : activity.type === "recording" ? (
                        <FileText size={16} />
                      ) : activity.type === "schedule" ? (
                        <CalendarDays size={16} />
                      ) : (
                        <Activity size={16} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {activity.description}
                          </p>
                        </div>

                        <span className="shrink-0 text-[10px] font-bold text-slate-400">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Common online-class operations.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  {
                    title: "Schedule Class",
                    description: "Create a new session",
                    icon: Plus,
                    action: openCreateModal,
                  },
                  {
                    title: "Live Monitor",
                    description: "Monitor live sessions",
                    icon: MonitorPlay,
                    action: () => {
                      if (liveClasses[0]) {
                        setViewingClass(liveClasses[0]);
                      } else {
                        showToast("No live classes right now.");
                      }
                    },
                  },
                  {
                    title: "Recordings",
                    description: `${recordingsAvailable} available`,
                    icon: FileText,
                    action: () =>
                      showToast(`${recordingsAvailable} recordings available.`),
                  },
                  {
                    title: "AI Insights",
                    description: "Analyze your classes",
                    icon: Sparkles,
                    action: () => setShowAiModal(true),
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      onClick={item.action}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <Icon size={18} />
                      </div>

                      <p className="mt-4 text-sm font-bold text-slate-900">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FOOTER SUMMARY */}
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
            <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="font-semibold text-slate-500">
                  {totalClasses} total classes
                </span>

                <span className="font-semibold text-red-600">
                  {liveClasses.length} live
                </span>

                <span className="font-semibold text-blue-600">
                  {upcomingClasses.length} upcoming
                </span>

                <span className="font-semibold text-emerald-600">
                  {completedClasses.length} completed
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <ShieldCheck size={14} />
                Online Classes · Admin Console
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* =======================================================
          CREATE MODAL
      ======================================================= */}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Video size={17} />
                  </div>

                  <h2 className="text-xl font-bold text-slate-950">
                    Schedule Online Class
                  </h2>
                </div>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Create a new live teaching session.
                </p>
              </div>

              <button
                onClick={closeCreateModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">{classForm}</div>

            {formError && (
              <div className="mx-6 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                onClick={closeCreateModal}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateClass}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                <Plus size={17} />
                Schedule Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          EDIT MODAL
      ======================================================= */}

      {showEditModal && editingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Edit3 size={17} />
                  </div>

                  <h2 className="text-xl font-bold text-slate-950">
                    Edit Online Class
                  </h2>
                </div>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Update {editingClass.id}.
                </p>
              </div>

              <button
                onClick={closeEditModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">{classForm}</div>

            {formError && (
              <div className="mx-6 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                onClick={closeEditModal}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleEditClass}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                <CheckCircle2 size={17} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          CLASS DETAILS MODAL
      ======================================================= */}

      {viewingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative overflow-hidden bg-slate-950 px-6 py-6 text-white">
              <div className="absolute -right-10 -top-20 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold ${
                        viewingClass.status === "Live"
                          ? "border-red-400/30 bg-red-500/10 text-red-300"
                          : viewingClass.status === "Upcoming"
                            ? "border-blue-400/30 bg-blue-500/10 text-blue-300"
                            : "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                      }`}
                    >
                      {viewingClass.status}
                    </span>

                    <span className="text-xs font-semibold text-slate-500">
                      {viewingClass.id}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold">
                    {viewingClass.title}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-400">
                    {viewingClass.topic}
                  </p>
                </div>

                <button
                  onClick={() => setViewingClass(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Teacher
                  </p>

                  <p className="mt-2 text-xs font-bold text-slate-800">
                    {viewingClass.teacher}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Batch
                  </p>

                  <p className="mt-2 text-xs font-bold text-slate-800">
                    {viewingClass.batch}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Date
                  </p>

                  <p className="mt-2 text-xs font-bold text-slate-800">
                    {formatDate(viewingClass.date)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Time
                  </p>

                  <p className="mt-2 text-xs font-bold text-slate-800">
                    {viewingClass.time}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Users size={16} />
                    <span className="text-xs font-bold">Students</span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-950">
                    {viewingClass.students}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    of {viewingClass.capacity} capacity
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <UserCheck size={16} />
                    <span className="text-xs font-bold">Attendance</span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-950">
                    {viewingClass.attendance}%
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    Session attendance
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Activity size={16} />
                    <span className="text-xs font-bold">Engagement</span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-950">
                    {viewingClass.engagement}%
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    Engagement score
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Classroom capacity
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {viewingClass.students} of {viewingClass.capacity}{" "}
                      students
                    </p>
                  </div>

                  <span className="text-sm font-bold text-slate-900">
                    {getCapacityPercent(viewingClass)}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${getCapacityPercent(viewingClass)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-2">
                  <Info size={17} className="text-blue-600" />

                  <h3 className="text-sm font-bold text-slate-900">
                    Class information
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {viewingClass.description}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Platform
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {viewingClass.platform}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Virtual room
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {viewingClass.room}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Recording
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {viewingClass.recording}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {viewingClass.duration}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 px-6 py-5">
              {viewingClass.status === "Live" && (
                <button
                  onClick={() => {
                    showToast("Opening live classroom...");
                    setViewingClass(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
                >
                  <Play size={17} />
                  Join Live Classroom
                </button>
              )}

              {viewingClass.status === "Upcoming" && (
                <button
                  onClick={() => openEditModal(viewingClass)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Edit3 size={17} />
                  Edit
                </button>
              )}

              {viewingClass.status === "Completed" &&
                viewingClass.recording === "Available" && (
                  <button
                    onClick={() => showToast("Opening recording...")}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                  >
                    <Play size={17} />
                    Watch Recording
                  </button>
                )}

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

      {/* =======================================================
          AI MODAL
      ======================================================= */}

      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-gradient-to-br from-violet-700 to-blue-700 px-6 py-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                    <Sparkles size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">AI Class Assistant</h2>

                    <p className="mt-1 text-sm font-medium text-blue-100">
                      Analyze your online-class operations.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAiModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/15"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
                <div className="flex gap-3">
                  <Sparkles
                    size={18}
                    className="mt-0.5 shrink-0 text-violet-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-violet-950">
                      AI-ready analytics
                    </p>

                    <p className="mt-1 text-xs leading-5 text-violet-800">
                      This demo uses local rules. Later we can connect this
                      assistant to your actual AI backend for personalized
                      recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Analyze attendance",
                  "Optimize schedule",
                  "Find capacity risks",
                  "Analyze engagement",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setAiQuestion(prompt)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Ask your question
                </label>

                <div className="relative">
                  <textarea
                    value={aiQuestion}
                    onChange={(event) => setAiQuestion(event.target.value)}
                    rows={3}
                    placeholder="e.g. Which classes need attention?"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-14 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-50"
                  />

                  <button
                    onClick={handleAskAI}
                    className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white hover:bg-violet-700"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2">
                  <Zap size={17} className="text-violet-600" />

                  <h3 className="text-sm font-bold text-slate-900">
                    AI Recommendation
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {aiResponse}
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-5">
              <button
                onClick={() => setShowAiModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          ANALYTICS MODAL
      ======================================================= */}

      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BarChart3 size={17} />
                  </div>

                  <h2 className="text-xl font-bold text-slate-950">
                    Class Analytics
                  </h2>
                </div>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Overview of current online-learning performance.
                </p>
              </div>

              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Average attendance
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {averageAttendance}%
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Across completed classes
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Average engagement
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {averageEngagement}%
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Based on demo engagement signals
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Student seats
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {totalStudents}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Across listed sessions
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Recordings
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {recordingsAvailable}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Available to students
                </p>
              </div>
            </div>

            <div className="mx-6 mb-6 rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2">
                <Sparkles size={17} className="text-violet-600" />

                <h3 className="text-sm font-bold text-slate-950">AI summary</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                The current schedule contains {totalClasses} classes, including{" "}
                {liveClasses.length} live sessions and {upcomingClasses.length}{" "}
                upcoming sessions. Average completed-class attendance is{" "}
                {averageAttendance}% and average engagement is{" "}
                {averageEngagement}%. A production version can calculate these
                metrics directly from your attendance, classroom and video
                analytics backend.
              </p>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-5">
              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          TOAST
      ======================================================= */}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] max-w-sm rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={17} className="text-emerald-400" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

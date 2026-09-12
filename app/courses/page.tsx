"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Edit3,
  Eye,
  GraduationCap,
  IndianRupee,
  Layers3,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";

import Slidebar from "../components/Slidebar";

type CourseStatus = "Active" | "Inactive";

type Course = {
  id: string;
  name: string;
  category: string;
  duration: string;
  fees: number;
  status: CourseStatus;
  subjects: string[];
  teachers: number;
  batches: number;
  students: number;
  capacity: number;
  startDate: string;
  description: string;
  color: string;
};

const initialCourses: Course[] = [
  {
    id: "CRS-1001",
    name: "JEE Advanced",
    category: "Engineering",
    duration: "2 Years",
    fees: 45000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    teachers: 8,
    batches: 6,
    students: 248,
    capacity: 300,
    startDate: "2026-04-01",
    description:
      "Advanced preparation program focused on JEE Main and JEE Advanced.",
    color: "blue",
  },
  {
    id: "CRS-1002",
    name: "NEET",
    category: "Medical",
    duration: "2 Years",
    fees: 52000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Biology"],
    teachers: 10,
    batches: 7,
    students: 312,
    capacity: 350,
    startDate: "2026-04-01",
    description:
      "Comprehensive NEET preparation program covering the complete medical entrance syllabus.",
    color: "emerald",
  },
  {
    id: "CRS-1003",
    name: "Foundation",
    category: "Foundation",
    duration: "1 Year",
    fees: 10000,
    status: "Active",
    subjects: ["Mathematics", "Science", "English"],
    teachers: 5,
    batches: 4,
    students: 186,
    capacity: 220,
    startDate: "2026-06-01",
    description:
      "Foundation program designed to strengthen school-level concepts and competitive readiness.",
    color: "violet",
  },
  {
    id: "CRS-1004",
    name: "JEE Main",
    category: "Engineering",
    duration: "1 Year",
    fees: 32000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    teachers: 6,
    batches: 5,
    students: 214,
    capacity: 250,
    startDate: "2026-06-01",
    description:
      "Focused JEE Main preparation with regular tests, revision and performance tracking.",
    color: "amber",
  },
  {
    id: "CRS-1005",
    name: "NEET Crash Course",
    category: "Medical",
    duration: "6 Months",
    fees: 18000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Biology"],
    teachers: 7,
    batches: 3,
    students: 128,
    capacity: 150,
    startDate: "2026-09-01",
    description:
      "High-intensity revision and test program for students preparing for NEET.",
    color: "rose",
  },
  {
    id: "CRS-1006",
    name: "Class 10 Foundation",
    category: "School",
    duration: "1 Year",
    fees: 14000,
    status: "Active",
    subjects: ["Mathematics", "Science", "English"],
    teachers: 4,
    batches: 3,
    students: 96,
    capacity: 120,
    startDate: "2026-04-15",
    description:
      "Academic support program for Class 10 students with board-focused preparation.",
    color: "cyan",
  },
  {
    id: "CRS-1007",
    name: "Class 12 Science",
    category: "School",
    duration: "1 Year",
    fees: 22000,
    status: "Inactive",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    teachers: 3,
    batches: 2,
    students: 48,
    capacity: 80,
    startDate: "2025-06-01",
    description:
      "Senior secondary science program with board and entrance preparation.",
    color: "slate",
  },
  {
    id: "CRS-1008",
    name: "Olympiad Preparation",
    category: "Competitive",
    duration: "9 Months",
    fees: 16000,
    status: "Active",
    subjects: ["Mathematics", "Science", "Reasoning"],
    teachers: 4,
    batches: 2,
    students: 72,
    capacity: 90,
    startDate: "2026-07-01",
    description:
      "Specialized preparation for national and international school-level Olympiads.",
    color: "indigo",
  },
  {
    id: "CRS-1009",
    name: "Commerce Foundation",
    category: "Commerce",
    duration: "1 Year",
    fees: 18000,
    status: "Active",
    subjects: ["Accounts", "Economics", "Business Studies"],
    teachers: 4,
    batches: 3,
    students: 84,
    capacity: 100,
    startDate: "2026-04-10",
    description:
      "Foundation program for commerce students covering core academic subjects.",
    color: "orange",
  },
];

const colorClasses: Record<
  string,
  { icon: string; badge: string; avatar: string }
> = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    avatar: "bg-blue-600",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
    avatar: "bg-emerald-600",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    badge: "bg-violet-50 text-violet-700",
    avatar: "bg-violet-600",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    badge: "bg-amber-50 text-amber-700",
    avatar: "bg-amber-500",
  },
  rose: {
    icon: "bg-rose-50 text-rose-600",
    badge: "bg-rose-50 text-rose-700",
    avatar: "bg-rose-600",
  },
  cyan: {
    icon: "bg-cyan-50 text-cyan-600",
    badge: "bg-cyan-50 text-cyan-700",
    avatar: "bg-cyan-600",
  },
  slate: {
    icon: "bg-slate-100 text-slate-600",
    badge: "bg-slate-100 text-slate-600",
    avatar: "bg-slate-600",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    badge: "bg-indigo-50 text-indigo-700",
    avatar: "bg-indigo-600",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600",
    badge: "bg-orange-50 text-orange-700",
    avatar: "bg-orange-600",
  },
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showViewCourse, setShowViewCourse] = useState(false);
  const [showAiInsights, setShowAiInsights] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const [courseSearch, setCourseSearch] = useState("");
  const [courseStatus, setCourseStatus] = useState("All");
  const [courseCategory, setCourseCategory] = useState("All");
  const [courseSort, setCourseSort] = useState("Name");
  const [courseSortOrder, setCourseSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const [toast, setToast] = useState("");

  const [formError, setFormError] = useState("");

  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("");
  const [newCourseDuration, setNewCourseDuration] = useState("");
  const [newCourseFees, setNewCourseFees] = useState("");
  const [newCourseSubjects, setNewCourseSubjects] = useState("");
  const [newCourseCapacity, setNewCourseCapacity] = useState("");
  const [newCourseStartDate, setNewCourseStartDate] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [newCourseStatus, setNewCourseStatus] =
    useState<CourseStatus>("Active");

  const [editCourseName, setEditCourseName] = useState("");
  const [editCourseCategory, setEditCourseCategory] = useState("");
  const [editCourseDuration, setEditCourseDuration] = useState("");
  const [editCourseFees, setEditCourseFees] = useState("");
  const [editCourseSubjects, setEditCourseSubjects] = useState("");
  const [editCourseCapacity, setEditCourseCapacity] = useState("");
  const [editCourseStartDate, setEditCourseStartDate] = useState("");
  const [editCourseDescription, setEditCourseDescription] = useState("");
  const [editCourseStatus, setEditCourseStatus] =
    useState<CourseStatus>("Active");

  const categories = useMemo(
    () => Array.from(new Set(courses.map((course) => course.category))).sort(),
    [courses],
  );

  const filteredCourses = useMemo(() => {
    const search = courseSearch.trim().toLowerCase();

    const result = courses.filter((course) => {
      const matchesSearch =
        !search ||
        course.name.toLowerCase().includes(search) ||
        course.id.toLowerCase().includes(search) ||
        course.category.toLowerCase().includes(search) ||
        course.subjects.some((subject) =>
          subject.toLowerCase().includes(search),
        );

      const matchesStatus =
        courseStatus === "All" || course.status === courseStatus;

      const matchesCategory =
        courseCategory === "All" || course.category === courseCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    result.sort((a, b) => {
      let comparison = 0;

      if (courseSort === "Name") {
        comparison = a.name.localeCompare(b.name);
      } else if (courseSort === "Fees") {
        comparison = a.fees - b.fees;
      } else if (courseSort === "Students") {
        comparison = a.students - b.students;
      } else if (courseSort === "Batches") {
        comparison = a.batches - b.batches;
      } else if (courseSort === "Capacity") {
        comparison = a.capacity - b.capacity;
      } else if (courseSort === "Status") {
        comparison = a.status.localeCompare(b.status);
      }

      return courseSortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    courses,
    courseSearch,
    courseStatus,
    courseCategory,
    courseSort,
    courseSortOrder,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourses.length / coursesPerPage),
  );

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage,
  );

  const totalStudents = courses.reduce(
    (total, course) => total + course.students,
    0,
  );

  const totalBatches = courses.reduce(
    (total, course) => total + course.batches,
    0,
  );

  const activeCourses = courses.filter(
    (course) => course.status === "Active",
  ).length;

  const inactiveCourses = courses.filter(
    (course) => course.status === "Inactive",
  ).length;

  const totalPotentialRevenue = courses.reduce(
    (total, course) => total + course.fees * course.students,
    0,
  );

  const averageFees =
    courses.length > 0
      ? Math.round(
          courses.reduce((total, course) => total + course.fees, 0) /
            courses.length,
        )
      : 0;

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const resetAddForm = () => {
    setNewCourseName("");
    setNewCourseCategory("");
    setNewCourseDuration("");
    setNewCourseFees("");
    setNewCourseSubjects("");
    setNewCourseCapacity("");
    setNewCourseStartDate("");
    setNewCourseDescription("");
    setNewCourseStatus("Active");
    setFormError("");
  };

  const openAddModal = () => {
    resetAddForm();
    setShowAddCourse(true);
  };

  const openEditModal = (course: Course) => {
    setSelectedCourse(course);
    setEditCourseName(course.name);
    setEditCourseCategory(course.category);
    setEditCourseDuration(course.duration);
    setEditCourseFees(String(course.fees));
    setEditCourseSubjects(course.subjects.join(", "));
    setEditCourseCapacity(String(course.capacity));
    setEditCourseStartDate(course.startDate);
    setEditCourseDescription(course.description);
    setEditCourseStatus(course.status);
    setFormError("");
    setOpenActionMenu(null);
    setShowEditCourse(true);
  };

  const openViewModal = (course: Course) => {
    setSelectedCourse(course);
    setOpenActionMenu(null);
    setShowViewCourse(true);
  };

  const generateCourseId = () => {
    const highestNumber = courses.reduce((highest, course) => {
      const number = Number(course.id.replace("CRS-", ""));
      return Number.isNaN(number) ? highest : Math.max(highest, number);
    }, 1000);

    return `CRS-${highestNumber + 1}`;
  };

  const validateCourse = (
    name: string,
    category: string,
    duration: string,
    feesValue: string,
    subjectsValue: string,
    capacityValue: string,
  ) => {
    if (!name.trim()) return "Course name is required.";
    if (!category.trim()) return "Category is required.";
    if (!duration.trim()) return "Duration is required.";

    const fees = Number(feesValue);

    if (!feesValue || Number.isNaN(fees) || fees <= 0) {
      return "Course fees must be greater than ₹0.";
    }

    if (!subjectsValue.trim()) {
      return "Add at least one subject.";
    }

    const capacity = Number(capacityValue);

    if (!capacityValue || Number.isNaN(capacity) || capacity <= 0) {
      return "Student capacity must be greater than 0.";
    }

    return "";
  };

  const handleAddCourse = () => {
    const error = validateCourse(
      newCourseName,
      newCourseCategory,
      newCourseDuration,
      newCourseFees,
      newCourseSubjects,
      newCourseCapacity,
    );

    if (error) {
      setFormError(error);
      return;
    }

    const duplicate = courses.some(
      (course) =>
        course.name.trim().toLowerCase() ===
        newCourseName.trim().toLowerCase(),
    );

    if (duplicate) {
      setFormError("A course with this name already exists.");
      return;
    }

    const subjects = newCourseSubjects
      .split(",")
      .map((subject) => subject.trim())
      .filter(Boolean);

    const newCourse: Course = {
      id: generateCourseId(),
      name: newCourseName.trim(),
      category: newCourseCategory.trim(),
      duration: newCourseDuration.trim(),
      fees: Number(newCourseFees),
      status: newCourseStatus,
      subjects,
      teachers: 0,
      batches: 0,
      students: 0,
      capacity: Number(newCourseCapacity),
      startDate: newCourseStartDate || new Date().toISOString().slice(0, 10),
      description:
        newCourseDescription.trim() ||
        "New course created from the administration panel.",
      color: "blue",
    };

    setCourses((currentCourses) => [...currentCourses, newCourse]);
    setCurrentPage(1);
    setShowAddCourse(false);
    resetAddForm();

    showToast("Course created successfully.");
  };

  const handleEditCourse = () => {
    if (!selectedCourse) return;

    const error = validateCourse(
      editCourseName,
      editCourseCategory,
      editCourseDuration,
      editCourseFees,
      editCourseSubjects,
      editCourseCapacity,
    );

    if (error) {
      setFormError(error);
      return;
    }

    const duplicate = courses.some(
      (course) =>
        course.id !== selectedCourse.id &&
        course.name.trim().toLowerCase() ===
          editCourseName.trim().toLowerCase(),
    );

    if (duplicate) {
      setFormError("Another course already uses this name.");
      return;
    }

    const subjects = editCourseSubjects
      .split(",")
      .map((subject) => subject.trim())
      .filter(Boolean);

    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              name: editCourseName.trim(),
              category: editCourseCategory.trim(),
              duration: editCourseDuration.trim(),
              fees: Number(editCourseFees),
              subjects,
              capacity: Number(editCourseCapacity),
              startDate:
                editCourseStartDate || course.startDate,
              description:
                editCourseDescription.trim() || course.description,
              status: editCourseStatus,
            }
          : course,
      ),
    );

    setShowEditCourse(false);
    setSelectedCourse(null);
    setFormError("");

    showToast("Course updated successfully.");
  };

  const handleDeleteCourse = (course: Course) => {
    setOpenActionMenu(null);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${course.name}"?`,
    );

    if (!confirmed) return;

    setCourses((currentCourses) =>
      currentCourses.filter((item) => item.id !== course.id),
    );

    setSelectedCourse(null);

    if (
      paginatedCourses.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((page) => Math.max(1, page - 1));
    }

    showToast(`${course.name} deleted.`);
  };

  const duplicateCourse = (course: Course) => {
    const duplicate: Course = {
      ...course,
      id: generateCourseId(),
      name: `${course.name} Copy`,
      students: 0,
      batches: 0,
      teachers: 0,
    };

    setCourses((currentCourses) => [...currentCourses, duplicate]);
    setOpenActionMenu(null);
    setCurrentPage(1);

    showToast("Course duplicated successfully.");
  };

  const toggleCourseStatus = (course: Course) => {
    setCourses((currentCourses) =>
      currentCourses.map((item) =>
        item.id === course.id
          ? {
              ...item,
              status:
                item.status === "Active" ? "Inactive" : "Active",
            }
          : item,
      ),
    );

    setOpenActionMenu(null);

    showToast(
      `${course.name} marked ${
        course.status === "Active" ? "Inactive" : "Active"
      }.`,
    );
  };

  const clearFilters = () => {
    setCourseSearch("");
    setCourseStatus("All");
    setCourseCategory("All");
    setCourseSort("Name");
    setCourseSortOrder("asc");
    setCurrentPage(1);
  };

  const occupancyRate = (course: Course) => {
    if (!course.capacity) return 0;
    return Math.min(
      100,
      Math.round((course.students / course.capacity) * 100),
    );
  };

  return (
    <div
      className="min-h-screen bg-slate-50"
      onClick={() => setOpenActionMenu(null)}
    >
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <BookOpen size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Courses
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage programs, curriculum, fees and course performance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowAiInsights(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              <Sparkles size={17} />
              AI Insights
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Course
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BookOpen size={19} />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                +2 this year
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Total Courses
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {courses.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={19} />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                {courses.length
                  ? Math.round((activeCourses / courses.length) * 100)
                  : 0}
                %
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Active Courses
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {activeCourses}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Users size={19} />
              </div>

              <span className="text-xs font-semibold text-slate-500">
                Across all courses
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Enrolled Students
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {totalStudents.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Layers3 size={19} />
              </div>

              <span className="text-xs font-semibold text-slate-500">
                Current batches
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Total Batches
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {totalBatches}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <IndianRupee size={19} />
              </div>

              <span className="text-xs font-semibold text-slate-500">
                Avg. fee
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Potential Course Value
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              ₹{totalPotentialRevenue.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* AI COMMAND CENTER */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-blue-50 shadow-sm">
          <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
                <Sparkles size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  AI Course Command Center
                </p>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                  Your course portfolio is healthy. JEE Advanced and NEET have
                  the strongest student demand, while some capacity remains
                  available in Foundation and Olympiad programs.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAiInsights(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-200 transition hover:bg-violet-50"
            >
              <Zap size={16} />
              View Recommendations
            </button>
          </div>
        </div>

        {/* QUICK METRICS */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <IndianRupee size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Average Course Fee
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  ₹{averageFees.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <GraduationCap size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Available Capacity
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {Math.max(
                    0,
                    courses.reduce(
                      (total, course) => total + course.capacity,
                      0,
                    ) - totalStudents,
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                <AlertTriangle size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Inactive Courses
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {inactiveCourses}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={courseSearch}
                onChange={(event) => {
                  setCourseSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by course name, ID, category or subject..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <select
              value={courseCategory}
              onChange={(event) => {
                setCourseCategory(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={courseStatus}
              onChange={(event) => {
                setCourseStatus(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={`${courseSort}-${courseSortOrder}`}
              onChange={(event) => {
                const [sort, order] = event.target.value.split("-");
                setCourseSort(sort);
                setCourseSortOrder(order);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="Name-asc">Name: A → Z</option>
              <option value="Name-desc">Name: Z → A</option>
              <option value="Fees-asc">Fees: Low → High</option>
              <option value="Fees-desc">Fees: High → Low</option>
              <option value="Students-asc">Students: Low → High</option>
              <option value="Students-desc">Students: High → Low</option>
              <option value="Batches-asc">Batches: Low → High</option>
              <option value="Batches-desc">Batches: High → Low</option>
              <option value="Capacity-asc">Capacity: Low → High</option>
              <option value="Capacity-desc">Capacity: High → Low</option>
              <option value="Status-asc">Status: A → Z</option>
              <option value="Status-desc">Status: Z → A</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredCourses.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {courses.length}
              </span>{" "}
              courses
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Active
              <span className="ml-3 h-2 w-2 rounded-full bg-slate-400" />
              Inactive
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                All Courses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your coaching programs and course operations.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              {courses.length} Courses
            </span>
          </div>

          {paginatedCourses.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Course
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Category
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Students
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Batches
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Fees
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Capacity
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
                    {paginatedCourses.map((course) => {
                      const styles =
                        colorClasses[course.color] || colorClasses.blue;

                      const occupancy = occupancyRate(course);

                      return (
                        <tr
                          key={course.id}
                          className="group transition hover:bg-blue-50/40"
                          onClick={() => setOpenActionMenu(null)}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                              >
                                <BookOpen size={19} />
                              </div>

                              <div>
                                <p className="text-sm font-bold text-slate-900">
                                  {course.name}
                                </p>

                                <p className="mt-1 text-xs font-medium text-slate-500">
                                  {course.id} · {course.duration}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-1">
                                  {course.subjects
                                    .slice(0, 3)
                                    .map((subject) => (
                                      <span
                                        key={subject}
                                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                                      >
                                        {subject}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-bold ${styles.badge}`}
                            >
                              {course.category}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <Users
                                size={16}
                                className="text-slate-400"
                              />

                              <div>
                                <p className="text-sm font-bold text-slate-900">
                                  {course.students}
                                </p>

                                <p className="text-xs text-slate-500">
                                  enrolled
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <Layers3
                                size={16}
                                className="text-slate-400"
                              />

                              <span className="text-sm font-semibold text-slate-700">
                                {course.batches}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-sm font-bold text-slate-900">
                              ₹{course.fees.toLocaleString("en-IN")}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              per student
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <div className="w-32">
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-600">
                                  {occupancy}%
                                </span>

                                <span className="text-[10px] text-slate-400">
                                  {course.capacity}
                                </span>
                              </div>

                              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full rounded-full ${
                                    occupancy >= 90
                                      ? "bg-rose-500"
                                      : occupancy >= 70
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                  }`}
                                  style={{
                                    width: `${occupancy}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                                course.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  course.status === "Active"
                                    ? "bg-emerald-500"
                                    : "bg-slate-400"
                                }`}
                              />

                              {course.status}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div
                              className="relative flex justify-end"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenActionMenu(
                                    openActionMenu === course.id
                                      ? null
                                      : course.id,
                                  )
                                }
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                aria-label={`Actions for ${course.name}`}
                              >
                                <MoreHorizontal size={19} />
                              </button>

                              {openActionMenu === course.id && (
                                <div
                                  className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                                  onClick={(event) =>
                                    event.stopPropagation()
                                  }
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openViewModal(course)
                                    }
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                  >
                                    <Eye size={16} />
                                    View Details
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openEditModal(course)
                                    }
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                  >
                                    <Edit3 size={16} />
                                    Edit Course
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      duplicateCourse(course)
                                    }
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                  >
                                    <Copy size={16} />
                                    Duplicate
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      toggleCourseStatus(course)
                                    }
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                  >
                                    {course.status === "Active" ? (
                                      <ArrowDown size={16} />
                                    ) : (
                                      <ArrowUp size={16} />
                                    )}

                                    Mark{" "}
                                    {course.status === "Active"
                                      ? "Inactive"
                                      : "Active"}
                                  </button>

                                  <div className="my-1 border-t border-slate-100" />

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteCourse(course)
                                    }
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 size={16} />
                                    Delete Course
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

              {/* PAGINATION */}
              <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="font-semibold text-slate-900">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-900">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1),
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Search size={23} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">
                No courses found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Try changing your search or filters, or create a new course.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* AI INSIGHTS PREVIEW */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-2 text-emerald-600 shadow-sm">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-emerald-900">
                  Strong Demand
                </p>

                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  JEE Advanced and NEET are currently the strongest student
                  enrollment programs.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-2 text-amber-600 shadow-sm">
                <AlertTriangle size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-amber-900">
                  Capacity Watch
                </p>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  High-occupancy courses may need additional batches as
                  enrollment grows.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-2 text-violet-600 shadow-sm">
                <Sparkles size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-violet-900">
                  AI Recommendation
                </p>

                <p className="mt-1 text-sm leading-6 text-violet-800">
                  Consider targeted promotions for courses with unused
                  capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ADD COURSE MODAL */}
      {showAddCourse && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setShowAddCourse(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add New Course
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new academic program.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course Name *
                  </label>

                  <input
                    type="text"
                    value={newCourseName}
                    onChange={(event) =>
                      setNewCourseName(event.target.value)
                    }
                    placeholder="e.g. JEE Advanced"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category *
                  </label>

                  <input
                    type="text"
                    value={newCourseCategory}
                    onChange={(event) =>
                      setNewCourseCategory(event.target.value)
                    }
                    placeholder="e.g. Engineering"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Duration *
                  </label>

                  <input
                    type="text"
                    value={newCourseDuration}
                    onChange={(event) =>
                      setNewCourseDuration(event.target.value)
                    }
                    placeholder="e.g. 2 Years"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course Fees *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={newCourseFees}
                    onChange={(event) =>
                      setNewCourseFees(event.target.value)
                    }
                    placeholder="e.g. 45000"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Student Capacity *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={newCourseCapacity}
                    onChange={(event) =>
                      setNewCourseCapacity(event.target.value)
                    }
                    placeholder="e.g. 250"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subjects *
                  </label>

                  <input
                    type="text"
                    value={newCourseSubjects}
                    onChange={(event) =>
                      setNewCourseSubjects(event.target.value)
                    }
                    placeholder="Physics, Chemistry, Mathematics"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />

                  <p className="mt-1.5 text-xs text-slate-500">
                    Separate subjects using commas.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={newCourseStartDate}
                    onChange={(event) =>
                      setNewCourseStartDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    value={newCourseStatus}
                    onChange={(event) =>
                      setNewCourseStatus(
                        event.target.value as CourseStatus,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>

                  <textarea
                    value={newCourseDescription}
                    onChange={(event) =>
                      setNewCourseDescription(event.target.value)
                    }
                    rows={4}
                    placeholder="Describe the course..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddCourse}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {showEditCourse && selectedCourse && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setShowEditCourse(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Edit Course
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update {selectedCourse.name}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowEditCourse(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course Name *
                  </label>

                  <input
                    type="text"
                    value={editCourseName}
                    onChange={(event) =>
                      setEditCourseName(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category *
                  </label>

                  <input
                    type="text"
                    value={editCourseCategory}
                    onChange={(event) =>
                      setEditCourseCategory(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Duration *
                  </label>

                  <input
                    type="text"
                    value={editCourseDuration}
                    onChange={(event) =>
                      setEditCourseDuration(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course Fees *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={editCourseFees}
                    onChange={(event) =>
                      setEditCourseFees(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Student Capacity *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={editCourseCapacity}
                    onChange={(event) =>
                      setEditCourseCapacity(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subjects *
                  </label>

                  <input
                    type="text"
                    value={editCourseSubjects}
                    onChange={(event) =>
                      setEditCourseSubjects(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={editCourseStartDate}
                    onChange={(event) =>
                      setEditCourseStartDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    value={editCourseStatus}
                    onChange={(event) =>
                      setEditCourseStatus(
                        event.target.value as CourseStatus,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>

                  <textarea
                    value={editCourseDescription}
                    onChange={(event) =>
                      setEditCourseDescription(event.target.value)
                    }
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowEditCourse(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleEditCourse}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW COURSE MODAL */}
      {showViewCourse && selectedCourse && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setShowViewCourse(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      colorClasses[selectedCourse.color]?.icon ||
                      colorClasses.blue.icon
                    }`}
                  >
                    <BookOpen size={25} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {selectedCourse.name}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {selectedCourse.id} · {selectedCourse.category}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowViewCourse(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <Users
                    size={17}
                    className="text-blue-600"
                  />
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    Students
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {selectedCourse.students}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <Layers3
                    size={17}
                    className="text-violet-600"
                  />
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    Batches
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {selectedCourse.batches}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <GraduationCap
                    size={17}
                    className="text-emerald-600"
                  />
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    Teachers
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {selectedCourse.teachers}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <IndianRupee
                    size={17}
                    className="text-amber-600"
                  />
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    Course Fee
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    ₹{selectedCourse.fees.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Capacity
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    {selectedCourse.students} /{" "}
                    {selectedCourse.capacity} students
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    {occupancyRate(selectedCourse)}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${occupancyRate(selectedCourse)}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Subjects
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedCourse.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Description
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                  <Clock3
                    size={18}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Duration
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {selectedCourse.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                  <CalendarDays
                    size={18}
                    className="text-violet-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Start Date
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {new Date(
                        `${selectedCourse.startDate}T00:00:00`,
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles
                    size={18}
                    className="mt-0.5 text-violet-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-violet-900">
                      AI Course Insight
                    </p>

                    <p className="mt-1 text-sm leading-6 text-violet-800">
                      This course has{" "}
                      {occupancyRate(selectedCourse)}% capacity
                      utilization. Future AI analytics will combine enrollment,
                      attendance, fees, exam performance and inquiry trends to
                      predict demand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowViewCourse(false)}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI INSIGHTS MODAL */}
      {showAiInsights && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setShowAiInsights(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-200 bg-gradient-to-r from-violet-50 to-blue-50 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white">
                    <Sparkles size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      AI Course Insights
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      AI-ready recommendations for your course portfolio.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAiInsights(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-white"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 text-emerald-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-emerald-900">
                      Strong Enrollment
                    </p>

                    <p className="mt-1 text-sm leading-6 text-emerald-800">
                      JEE Advanced and NEET currently account for a large share
                      of active student enrollment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3">
                  <AlertTriangle
                    size={19}
                    className="mt-0.5 text-amber-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-amber-900">
                      Capacity Optimization
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-800">
                      Courses approaching 90% capacity should be monitored for
                      additional batch creation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <BarChart3
                    size={19}
                    className="mt-0.5 text-blue-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      Revenue Opportunity
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-800">
                      The system can eventually forecast course demand and
                      expected revenue using historical enrollments, inquiries,
                      fee payments and academic outcomes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                <div className="flex gap-3">
                  <Sparkles
                    size={19}
                    className="mt-0.5 text-violet-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-violet-900">
                      Future AI Automation
                    </p>

                    <p className="mt-1 text-sm leading-6 text-violet-800">
                      Future versions can automatically recommend new batches,
                      identify underperforming courses, forecast enrollment,
                      optimize course fees and generate marketing campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAiInsights(false)}
                className="w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Close Insights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl">
          <CheckCircle2
            size={18}
            className="text-emerald-400"
          />
          {toast}
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import PageHeader from "../components/PageHeader";
import {
  getCollection,
  setCollection,
  subscribeToStore,
} from "../data/store";
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
  Edit3,
  Eye,
  GraduationCap,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";

type TeacherStatus = "Active" | "Inactive" | "On Leave";

type Teacher = {
  id: string;
  name: string;
  subject: string;
  phone: string;
  email: string;
  experience: string;
  status: TeacherStatus;
  qualification: string;
  batches: number;
  students: number;
  classesThisWeek: number;
  attendanceRate: number;
  performanceScore: number;
  joiningDate: string;
  salary: number;
  specialization: string;
};

const initialTeachers: Teacher[] = [
  {
    id: "TCH-1001",
    name: "Rahul Mehta",
    subject: "Physics",
    phone: "+91 98765 43210",
    email: "rahul@example.com",
    experience: "8 years",
    status: "Active",
    qualification: "M.Sc. Physics",
    batches: 4,
    students: 186,
    classesThisWeek: 18,
    attendanceRate: 96,
    performanceScore: 94,
    joiningDate: "12 Apr 2021",
    salary: 85000,
    specialization: "JEE Advanced & JEE Main",
  },
  {
    id: "TCH-1002",
    name: "Priya Sharma",
    subject: "Chemistry",
    phone: "+91 98765 12345",
    email: "priya@example.com",
    experience: "7 years",
    status: "Active",
    qualification: "M.Sc. Chemistry",
    batches: 3,
    students: 142,
    classesThisWeek: 15,
    attendanceRate: 98,
    performanceScore: 96,
    joiningDate: "08 Jun 2022",
    salary: 78000,
    specialization: "Organic & Inorganic Chemistry",
  },
  {
    id: "TCH-1003",
    name: "Amit Verma",
    subject: "Mathematics",
    phone: "+91 98123 45678",
    email: "amit@example.com",
    experience: "5 years",
    status: "Inactive",
    qualification: "M.Sc. Mathematics",
    batches: 0,
    students: 0,
    classesThisWeek: 0,
    attendanceRate: 82,
    performanceScore: 76,
    joiningDate: "17 Jan 2023",
    salary: 65000,
    specialization: "JEE Mathematics",
  },
  {
    id: "TCH-1004",
    name: "Neha Kapoor",
    subject: "Biology",
    phone: "+91 98234 56789",
    email: "neha@example.com",
    experience: "6 years",
    status: "Active",
    qualification: "M.Sc. Biology",
    batches: 4,
    students: 201,
    classesThisWeek: 17,
    attendanceRate: 97,
    performanceScore: 92,
    joiningDate: "21 Mar 2022",
    salary: 76000,
    specialization: "NEET Biology",
  },
  {
    id: "TCH-1005",
    name: "Vikram Joshi",
    subject: "Physics",
    phone: "+91 98987 65432",
    email: "vikram@example.com",
    experience: "10 years",
    status: "Active",
    qualification: "M.Tech",
    batches: 5,
    students: 244,
    classesThisWeek: 21,
    attendanceRate: 95,
    performanceScore: 97,
    joiningDate: "05 Jul 2020",
    salary: 92000,
    specialization: "JEE Advanced Physics",
  },
  {
    id: "TCH-1006",
    name: "Anjali Singh",
    subject: "Mathematics",
    phone: "+91 97654 32109",
    email: "anjali@example.com",
    experience: "4 years",
    status: "Active",
    qualification: "M.Sc. Mathematics",
    batches: 2,
    students: 108,
    classesThisWeek: 10,
    attendanceRate: 94,
    performanceScore: 89,
    joiningDate: "14 Aug 2023",
    salary: 62000,
    specialization: "Foundation Mathematics",
  },
  {
    id: "TCH-1007",
    name: "Rohit Malhotra",
    subject: "Chemistry",
    phone: "+91 97531 24680",
    email: "rohit@example.com",
    experience: "9 years",
    status: "On Leave",
    qualification: "M.Sc. Chemistry",
    batches: 2,
    students: 94,
    classesThisWeek: 4,
    attendanceRate: 91,
    performanceScore: 88,
    joiningDate: "19 Sep 2021",
    salary: 81000,
    specialization: "Physical Chemistry",
  },
  {
    id: "TCH-1008",
    name: "Sneha Patel",
    subject: "English",
    phone: "+91 98456 78901",
    email: "sneha@example.com",
    experience: "5 years",
    status: "Active",
    qualification: "M.A. English",
    batches: 3,
    students: 156,
    classesThisWeek: 13,
    attendanceRate: 99,
    performanceScore: 93,
    joiningDate: "11 Feb 2023",
    salary: 58000,
    specialization: "Communication & Foundation",
  },
  {
    id: "TCH-1009",
    name: "Suresh Yadav",
    subject: "Mathematics",
    phone: "+91 98321 45678",
    email: "suresh@example.com",
    experience: "11 years",
    status: "Active",
    qualification: "M.Sc. Mathematics",
    batches: 4,
    students: 217,
    classesThisWeek: 19,
    attendanceRate: 96,
    performanceScore: 95,
    joiningDate: "02 May 2019",
    salary: 90000,
    specialization: "JEE Main Mathematics",
  },
  {
    id: "TCH-1010",
    name: "Pooja Gupta",
    subject: "Biology",
    phone: "+91 98711 22334",
    email: "pooja@example.com",
    experience: "3 years",
    status: "Active",
    qualification: "M.Sc. Zoology",
    batches: 2,
    students: 88,
    classesThisWeek: 9,
    attendanceRate: 93,
    performanceScore: 87,
    joiningDate: "22 Jul 2024",
    salary: 54000,
    specialization: "NEET Biology",
  },
  {
    id: "TCH-1011",
    name: "Karan Shah",
    subject: "Physics",
    phone: "+91 98989 11223",
    email: "karan@example.com",
    experience: "6 years",
    status: "Active",
    qualification: "M.Tech Physics",
    batches: 3,
    students: 133,
    classesThisWeek: 14,
    attendanceRate: 94,
    performanceScore: 91,
    joiningDate: "15 Nov 2022",
    salary: 73000,
    specialization: "Foundation Physics",
  },
  {
    id: "TCH-1012",
    name: "Meera Nair",
    subject: "Chemistry",
    phone: "+91 98876 55443",
    email: "meera@example.com",
    experience: "8 years",
    status: "Active",
    qualification: "M.Sc. Chemistry",
    batches: 3,
    students: 165,
    classesThisWeek: 16,
    attendanceRate: 97,
    performanceScore: 94,
    joiningDate: "04 Jan 2021",
    salary: 82000,
    specialization: "NEET Chemistry",
  },
];

const subjectOptions = [
  "All Subjects",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
  "English",
];

const statusOptions = ["All Status", "Active", "Inactive", "On Leave"];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const saveTeachers = (nextTeachers: Teacher[]) => {
    setTeachers(nextTeachers);
    setCollection("teachers", nextTeachers);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [sortBy, setSortBy] = useState<
    "name" | "students" | "performance" | "attendance" | "salary"
  >("name");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8;

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [showAiPanel, setShowAiPanel] = useState(false);
  const [showSchedule, setShowSchedule] = useState<Teacher | null>(null);

  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const [toast, setToast] = useState("");

  const [formError, setFormError] = useState("");

  const emptyForm = {
    name: "",
    subject: "",
    phone: "",
    email: "",
    experience: "",
    qualification: "",
    specialization: "",
    status: "Active" as TeacherStatus,
    salary: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const storedTeachers = getCollection<Teacher>("teachers");

    if (storedTeachers.length > 0) {
      setTeachers(storedTeachers);
    } else {
      setCollection("teachers", initialTeachers);
      setTeachers(initialTeachers);
    }

    return subscribeToStore(() => {
      const nextTeachers = getCollection<Teacher>("teachers");

      if (nextTeachers.length === 0) return;

      setTeachers((currentTeachers) => {
        const currentJson = JSON.stringify(currentTeachers);
        const nextJson = JSON.stringify(nextTeachers);

        return currentJson === nextJson ? currentTeachers : nextTeachers;
      });
    });
  }, []);

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active",
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "Inactive",
  ).length;

  const onLeaveTeachers = teachers.filter(
    (teacher) => teacher.status === "On Leave",
  ).length;

  const totalStudents = teachers.reduce(
    (total, teacher) => total + teacher.students,
    0,
  );

  const averagePerformance =
    teachers.length > 0
      ? Math.round(
          teachers.reduce(
            (total, teacher) => total + teacher.performanceScore,
            0,
          ) / teachers.length,
        )
      : 0;

  const averageAttendance =
    teachers.length > 0
      ? Math.round(
          teachers.reduce(
            (total, teacher) => total + teacher.attendanceRate,
            0,
          ) / teachers.length,
        )
      : 0;

  const totalWeeklyClasses = teachers.reduce(
    (total, teacher) => total + teacher.classesThisWeek,
    0,
  );

  const filteredTeachers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const result = teachers.filter((teacher) => {
      const matchesSearch =
        !search ||
        teacher.name.toLowerCase().includes(search) ||
        teacher.id.toLowerCase().includes(search) ||
        teacher.subject.toLowerCase().includes(search) ||
        teacher.email.toLowerCase().includes(search) ||
        teacher.specialization.toLowerCase().includes(search);

      const matchesSubject =
        subjectFilter === "All Subjects" || teacher.subject === subjectFilter;

      const matchesStatus =
        statusFilter === "All Status" || teacher.status === statusFilter;

      return matchesSearch && matchesSubject && matchesStatus;
    });

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      }

      if (sortBy === "students") {
        comparison = a.students - b.students;
      }

      if (sortBy === "performance") {
        comparison = a.performanceScore - b.performanceScore;
      }

      if (sortBy === "attendance") {
        comparison = a.attendanceRate - b.attendanceRate;
      }

      if (sortBy === "salary") {
        comparison = a.salary - b.salary;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [teachers, searchTerm, subjectFilter, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTeachers.length / studentsPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedTeachers = filteredTeachers.slice(
    (safeCurrentPage - 1) * studentsPerPage,
    safeCurrentPage * studentsPerPage,
  );

  const openAddModal = () => {
    setForm(emptyForm);
    setFormError("");
    setEditingTeacher(null);
    setShowAddTeacher(true);
  };

  const openEditModal = (teacher: Teacher) => {
    setForm({
      name: teacher.name,
      subject: teacher.subject,
      phone: teacher.phone,
      email: teacher.email,
      experience: teacher.experience,
      qualification: teacher.qualification,
      specialization: teacher.specialization,
      status: teacher.status,
      salary: String(teacher.salary),
    });

    setFormError("");
    setEditingTeacher(teacher);
    setSelectedTeacher(null);
    setActionMenuId(null);
    setShowAddTeacher(true);
  };

  const closeFormModal = () => {
    setShowAddTeacher(false);
    setEditingTeacher(null);
    setFormError("");
    setForm(emptyForm);
  };

  const saveTeacher = () => {
    if (!form.name.trim()) {
      setFormError("Teacher name is required.");
      return;
    }

    if (!form.subject.trim()) {
      setFormError("Subject is required.");
      return;
    }

    if (!form.phone.trim()) {
      setFormError("Phone number is required.");
      return;
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!form.experience.trim()) {
      setFormError("Experience is required.");
      return;
    }

    if (!form.qualification.trim()) {
      setFormError("Qualification is required.");
      return;
    }

    const salaryNumber = Number(form.salary);

    if (!form.salary.trim() || Number.isNaN(salaryNumber) || salaryNumber < 0) {
      setFormError("Please enter a valid salary.");
      return;
    }

    if (editingTeacher) {
      const nextTeachers = teachers.map((teacher) =>
        teacher.id === editingTeacher.id
          ? {
              ...teacher,
              name: form.name.trim(),
              subject: form.subject.trim(),
              phone: form.phone.trim(),
              email: form.email.trim(),
              experience: form.experience.trim(),
              qualification: form.qualification.trim(),
              specialization: form.specialization.trim() || "General Faculty",
              status: form.status,
              salary: salaryNumber,
            }
          : teacher,
      );

      saveTeachers(nextTeachers);
      showToast("Teacher updated successfully.");
    } else {
      const nextNumber =
        Math.max(
          ...teachers.map((teacher) => Number(teacher.id.replace("TCH-", ""))),
          1000,
        ) + 1;

      const newTeacher: Teacher = {
        id: `TCH-${nextNumber}`,
        name: form.name.trim(),
        subject: form.subject.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        experience: form.experience.trim(),
        qualification: form.qualification.trim(),
        specialization: form.specialization.trim() || "General Faculty",
        status: form.status,
        salary: salaryNumber,
        batches: 0,
        students: 0,
        classesThisWeek: 0,
        attendanceRate: 100,
        performanceScore: 0,
        joiningDate: "Today",
      };

      saveTeachers([...teachers, newTeacher]);
      showToast("Teacher added successfully.");
    }

    closeFormModal();
  };

  const deleteTeacher = (teacher: Teacher) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${teacher.name}?`,
    );

    if (!confirmed) {
      return;
    }

    const nextTeachers = teachers.filter((item) => item.id !== teacher.id);
    saveTeachers(nextTeachers);

    setSelectedTeacher(null);
    setActionMenuId(null);

    showToast("Teacher deleted successfully.");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSubjectFilter("All Subjects");
    setStatusFilter("All Status");
    setSortBy("name");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  const toggleSort = (
    value: "name" | "students" | "performance" | "attendance" | "salary",
  ) => {
    if (sortBy === value) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }

    setCurrentPage(1);
  };

  const statusClasses = (status: TeacherStatus) => {
    if (status === "Active") {
      return "bg-green-50 text-green-700 border-green-100";
    }

    if (status === "On Leave") {
      return "bg-amber-50 text-amber-700 border-amber-100";
    }

    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  const performanceClasses = (score: number) => {
    if (score >= 90) {
      return "text-green-600";
    }

    if (score >= 75) {
      return "text-blue-600";
    }

    return "text-orange-600";
  };

  const SortIndicator = ({
    column,
  }: {
    column: "name" | "students" | "performance" | "attendance" | "salary";
  }) => {
    if (sortBy !== column) {
      return null;
    }

    return sortOrder === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <PageHeader
          title="Teachers"
          description="Manage faculty profiles, workload, teaching assignments, performance and AI-powered teaching insights."
          icon={<GraduationCap size={20} />}
          actions={
            <>
              <button
                type="button"
                onClick={() => setShowAiPanel(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
              >
                <Sparkles size={16} />
                AI Insights
              </button>

              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={17} />
                Add Teacher
              </button>
            </>
          }
        />

        {/* KPI Cards */}
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Teachers
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {teachers.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold text-blue-600">
              Faculty strength
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Faculty
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {activeTeachers}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold text-green-600">
              {inactiveTeachers} inactive · {onLeaveTeachers} on leave
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Students Covered
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalStudents.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold text-violet-600">
              Across all teaching assignments
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Avg. Performance
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {averagePerformance}%
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold text-amber-600">
              {averageAttendance}% average attendance
            </p>
          </div>
        </div>

        {/* AI Command Center */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 shadow-sm">
          <div className="flex flex-col gap-5 p-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-slate-900">
                    AI Faculty Command Center
                  </h2>

                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                    AI Ready
                  </span>
                </div>

                <p className="mt-1 max-w-3xl text-sm text-slate-600">
                  Your future AI layer can analyze faculty workload, attendance,
                  student outcomes, class quality and identify teachers or
                  batches that need attention.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAiPanel(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <Zap className="h-4 w-4" />
              Analyze Faculty
            </button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Weekly Classes
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalWeeklyClasses}
                </p>
              </div>

              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${Math.min((totalWeeklyClasses / 180) * 100, 100)}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Teaching load across active faculty
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Faculty Attendance
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {averageAttendance}%
                </p>
              </div>

              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${averageAttendance}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-green-600">
              Healthy overall attendance
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  High Performers
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {
                    teachers.filter((teacher) => teacher.performanceScore >= 90)
                      .length
                  }
                </p>
              </div>

              <Sparkles className="h-5 w-5 text-violet-600" />
            </div>

            <p className="mt-4 text-xs font-semibold text-violet-600">
              Teachers scoring 90%+
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Search Faculty
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by teacher name, ID, subject or email..."
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div className="w-full xl:w-52">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Subject
              </label>

              <select
                value={subjectFilter}
                onChange={(event) => {
                  setSubjectFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className={inputClass}
              >
                {subjectOptions.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className="w-full xl:w-48">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className={inputClass}
              >
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Teacher Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">All Teachers</h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage faculty members and teaching assignments.
              </p>
            </div>

            <span className="w-fit rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
              {filteredTeachers.length} Teachers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => toggleSort("name")}
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      Teacher
                      <SortIndicator column="name" />
                    </button>
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Subject
                  </th>

                  <th className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => toggleSort("students")}
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      Students
                      <SortIndicator column="students" />
                    </button>
                  </th>

                  <th className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => toggleSort("performance")}
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      Performance
                      <SortIndicator column="performance" />
                    </button>
                  </th>

                  <th className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => toggleSort("attendance")}
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      Attendance
                      <SortIndicator column="attendance" />
                    </button>
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Workload
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-blue-50/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                          {teacher.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {teacher.name}
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-500">
                            {teacher.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {teacher.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {teacher.subject}
                      </p>

                      <p className="mt-1 max-w-40 truncate text-xs text-slate-400">
                        {teacher.specialization}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {teacher.students}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {teacher.batches} batches
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p
                        className={`text-sm font-bold ${performanceClasses(
                          teacher.performanceScore,
                        )}`}
                      >
                        {teacher.performanceScore || "—"}%
                      </p>

                      <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${teacher.performanceScore}%`,
                          }}
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {teacher.attendanceRate}%
                      </p>

                      <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{
                            width: `${teacher.attendanceRate}%`,
                          }}
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-slate-400" />

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {teacher.classesThisWeek}
                          </p>

                          <p className="text-xs text-slate-500">classes/week</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusClasses(
                          teacher.status,
                        )}`}
                      >
                        {teacher.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="relative flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTeacher(teacher)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();

                            setActionMenuId((current) =>
                              current === teacher.id ? null : teacher.id,
                            );
                          }}
                          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                          aria-label={`More actions for ${teacher.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                        {actionMenuId === teacher.id && (
                          <div className="absolute right-0 top-11 z-30 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                            <button
                              type="button"
                              onClick={() => openEditModal(teacher)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit Teacher
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setShowSchedule(teacher);
                                setActionMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <CalendarDays className="h-4 w-4" />
                              View Schedule
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteTeacher(teacher)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedTeachers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Search className="h-5 w-5 text-slate-400" />
                      </div>

                      <p className="mt-4 text-sm font-bold text-slate-900">
                        No teachers found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredTeachers.length === 0
                  ? 0
                  : (safeCurrentPage - 1) * studentsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-900">
                {Math.min(
                  safeCurrentPage * studentsPerPage,
                  filteredTeachers.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {filteredTeachers.length}
              </span>{" "}
              teachers
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={safeCurrentPage === 1}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-bold transition ${
                      safeCurrentPage === page
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
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                disabled={safeCurrentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom AI Insights */}
        <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-green-900">
                  Strong Faculty
                </p>

                <p className="text-xs text-green-700">
                  High-performing teachers
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-green-800">
              {
                teachers.filter((teacher) => teacher.performanceScore >= 90)
                  .length
              }{" "}
              teachers currently have performance scores above 90%.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-amber-900">
                  Attention Needed
                </p>

                <p className="text-xs text-amber-700">AI risk indicator</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-amber-800">
              {
                teachers.filter(
                  (teacher) =>
                    teacher.performanceScore > 0 &&
                    teacher.performanceScore < 80,
                ).length
              }{" "}
              teacher(s) may need performance review or additional support.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-violet-900">
                  AI Recommendation
                </p>

                <p className="text-xs text-violet-700">
                  Future intelligent layer
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-violet-800">
              Future AI can automatically balance workloads and recommend
              faculty assignments based on subject, availability and student
              outcomes.
            </p>
          </div>
        </div>
      </main>

      {/* Teacher Profile Modal */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTeacher(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
                    {selectedTeacher.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold text-slate-900">
                        {selectedTeacher.name}
                      </h2>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusClasses(
                          selectedTeacher.status,
                        )}`}
                      >
                        {selectedTeacher.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedTeacher.id} · {selectedTeacher.subject}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="h-4 w-4" />
                  <p className="text-xs font-bold uppercase tracking-wide">
                    Phone
                  </p>
                </div>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  {selectedTeacher.phone}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="h-4 w-4" />
                  <p className="text-xs font-bold uppercase tracking-wide">
                    Email
                  </p>
                </div>

                <p className="mt-2 break-all text-sm font-bold text-slate-900">
                  {selectedTeacher.email || "Not provided"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Qualification
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  {selectedTeacher.qualification}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Experience
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  {selectedTeacher.experience}
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Assigned Students
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {selectedTeacher.students}
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-violet-600">
                  Assigned Batches
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {selectedTeacher.batches}
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-green-600">
                  Performance
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {selectedTeacher.performanceScore || "—"}%
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-600">
                  Attendance
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {selectedTeacher.attendanceRate}%
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Specialization
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  {selectedTeacher.specialization}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowSchedule(selectedTeacher);
                  setSelectedTeacher(null);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <CalendarDays className="h-4 w-4" />
                View Schedule
              </button>

              <button
                type="button"
                onClick={() => openEditModal(selectedTeacher)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <Edit3 className="h-4 w-4" />
                Edit Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Teacher Modal */}
      {showAddTeacher && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeFormModal();
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <p className="text-sm font-bold text-blue-600">
                  {editingTeacher ? "Faculty Management" : "New Faculty"}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {editingTeacher ? "Edit Teacher" : "Add Teacher"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add complete faculty information for future scheduling and
                  analytics.
                </p>
              </div>

              <button
                type="button"
                onClick={closeFormModal}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 md:col-span-2">
                  ⚠ {formError}
                </div>
              )}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Teacher Name
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
                  placeholder="Enter teacher name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Subject
                </label>

                <select
                  value={form.subject}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                  className={inputClass}
                >
                  <option value="">Select Subject</option>
                  {subjectOptions
                    .filter((subject) => subject !== "All Subjects")
                    .map((subject) => (
                      <option key={subject}>{subject}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Phone
                </label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="Enter phone number"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="Enter email address"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Experience
                </label>

                <input
                  type="text"
                  value={form.experience}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      experience: event.target.value,
                    }))
                  }
                  placeholder="e.g. 5 years"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Qualification
                </label>

                <input
                  type="text"
                  value={form.qualification}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      qualification: event.target.value,
                    }))
                  }
                  placeholder="e.g. M.Sc. Physics"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Specialization
                </label>

                <input
                  type="text"
                  value={form.specialization}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      specialization: event.target.value,
                    }))
                  }
                  placeholder="e.g. JEE Advanced Physics"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Monthly Salary
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.salary}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      salary: event.target.value,
                    }))
                  }
                  placeholder="Enter monthly salary"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as TeacherStatus,
                    }))
                  }
                  className={inputClass}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>On Leave</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 p-6">
              <button
                type="button"
                onClick={closeFormModal}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveTeacher}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {editingTeacher ? "Save Changes" : "Add Teacher"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showSchedule && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowSchedule(null);
            }
          }}
        >
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <p className="text-sm font-bold text-blue-600">
                  Faculty Schedule
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {showSchedule.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {showSchedule.subject} · {showSchedule.classesThisWeek}{" "}
                  classes this week
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSchedule(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 p-6">
              {[
                ["Monday", "08:00 AM", "JEE Advanced", "Room 204"],
                ["Tuesday", "10:00 AM", "JEE Main", "Room 301"],
                ["Wednesday", "08:00 AM", "JEE Advanced", "Room 204"],
                ["Thursday", "12:00 PM", "Foundation", "Room 105"],
                ["Friday", "10:00 AM", "JEE Main", "Room 301"],
              ].map(([day, time, batch, room]) => (
                <div
                  key={`${day}-${time}-${batch}`}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <CalendarDays className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">{day}</p>

                      <p className="text-xs text-slate-500">{time}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm font-bold text-slate-800">{batch}</p>

                    <p className="text-xs text-slate-500">{room}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 p-6">
              <button
                type="button"
                onClick={() => setShowSchedule(null)}
                className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Modal */}
      {showAiPanel && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAiPanel(false);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      AI Faculty Insights
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Intelligent faculty analytics prepared for future AI
                      integration.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAiPanel(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />

                  <p className="font-bold text-green-900">
                    Strong Faculty Performance
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-green-800">
                  Several teachers are maintaining strong performance and
                  attendance scores. These teachers could be considered for
                  advanced batches or mentoring responsibilities.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />

                  <p className="font-bold text-amber-900">
                    Workload Monitoring
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Faculty members with very high weekly class counts should be
                  monitored for workload balance and schedule conflicts.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600" />

                  <p className="font-bold text-blue-900">
                    Future AI Recommendation
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-blue-800">
                  Once the backend AI engine is connected, the system can
                  analyze student outcomes, attendance, batch performance,
                  teacher workload and feedback to recommend optimal faculty
                  assignments automatically.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Average Performance
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {averagePerformance}%
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Average Attendance
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {averageAttendance}%
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 p-6">
              <button
                type="button"
                onClick={() => {
                  setShowAiPanel(false);
                  showToast("AI faculty analysis completed.");
                }}
                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Run Faculty Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

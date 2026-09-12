"use client";

import { useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import PageHeader from "../components/PageHeader";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Download,
  Eye,
  FileBarChart,
  FileText,
  Filter,
  GraduationCap,
  IndianRupee,
  Lightbulb,
  Loader2,
  MoreHorizontal,
  PieChart,
  Printer,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type ReportCategory =
  | "All"
  | "Students"
  | "Attendance"
  | "Fees"
  | "Exams"
  | "Teachers"
  | "Courses"
  | "Batches";

type ReportStatus = "Ready" | "Processing" | "Scheduled";

type Report = {
  id: string;
  name: string;
  category: Exclude<ReportCategory, "All">;
  description: string;
  generatedDate: string;
  generatedTime: string;
  status: ReportStatus;
  records: number;
  owner: string;
  frequency: string;
};

type StudentPerformance = {
  rank: number;
  name: string;
  id: string;
  course: string;
  batch: string;
  attendance: number;
  average: number;
  exams: number;
  risk: "Low" | "Medium" | "High";
};

type AttendanceRecord = {
  batch: string;
  present: number;
  absent: number;
  late: number;
  leave: number;
  percentage: number;
};

type FeeRecord = {
  month: string;
  collected: number;
  pending: number;
  target: number;
};

const initialReports: Report[] = [
  {
    id: "RPT-1001",
    name: "Monthly Student Performance",
    category: "Students",
    description: "Student academic performance, attendance and risk analysis.",
    generatedDate: "2026-09-05",
    generatedTime: "10:30 AM",
    status: "Ready",
    records: 1248,
    owner: "Admin",
    frequency: "Monthly",
  },
  {
    id: "RPT-1002",
    name: "Fee Collection Report",
    category: "Fees",
    description: "Collection, pending fees, targets and payment trends.",
    generatedDate: "2026-09-05",
    generatedTime: "09:15 AM",
    status: "Ready",
    records: 892,
    owner: "Admin",
    frequency: "Monthly",
  },
  {
    id: "RPT-1003",
    name: "Attendance Intelligence",
    category: "Attendance",
    description: "Attendance trends, absenteeism and batch-level analysis.",
    generatedDate: "2026-09-04",
    generatedTime: "05:40 PM",
    status: "Ready",
    records: 4280,
    owner: "Admin",
    frequency: "Weekly",
  },
  {
    id: "RPT-1004",
    name: "Exam Performance Analysis",
    category: "Exams",
    description: "Marks, ranks, pass rates and subject-level performance.",
    generatedDate: "2026-09-03",
    generatedTime: "03:20 PM",
    status: "Ready",
    records: 1132,
    owner: "Academic Team",
    frequency: "After Exam",
  },
  {
    id: "RPT-1005",
    name: "Teacher Performance Report",
    category: "Teachers",
    description:
      "Teacher workload, classes, attendance and performance metrics.",
    generatedDate: "2026-09-02",
    generatedTime: "01:45 PM",
    status: "Ready",
    records: 42,
    owner: "Admin",
    frequency: "Monthly",
  },
  {
    id: "RPT-1006",
    name: "Batch Health Report",
    category: "Batches",
    description: "Batch capacity, attendance, performance and risk indicators.",
    generatedDate: "2026-09-01",
    generatedTime: "11:10 AM",
    status: "Ready",
    records: 28,
    owner: "Admin",
    frequency: "Weekly",
  },
  {
    id: "RPT-1007",
    name: "Course Revenue Analysis",
    category: "Courses",
    description: "Revenue contribution and enrollment analysis by course.",
    generatedDate: "2026-08-31",
    generatedTime: "04:05 PM",
    status: "Ready",
    records: 18,
    owner: "Finance",
    frequency: "Monthly",
  },
  {
    id: "RPT-1008",
    name: "Student Risk Prediction",
    category: "Students",
    description:
      "AI-style early warning analysis for students needing attention.",
    generatedDate: "2026-08-30",
    generatedTime: "12:25 PM",
    status: "Ready",
    records: 1248,
    owner: "AI Analytics",
    frequency: "Weekly",
  },
  {
    id: "RPT-1009",
    name: "Weekly Attendance Summary",
    category: "Attendance",
    description: "Weekly attendance summary across all active batches.",
    generatedDate: "2026-08-29",
    generatedTime: "06:30 PM",
    status: "Scheduled",
    records: 4280,
    owner: "Admin",
    frequency: "Weekly",
  },
  {
    id: "RPT-1010",
    name: "Revenue Forecast",
    category: "Fees",
    description: "Projected collection based on current payment trends.",
    generatedDate: "2026-08-28",
    generatedTime: "02:15 PM",
    status: "Ready",
    records: 12,
    owner: "AI Analytics",
    frequency: "Monthly",
  },
];

const studentPerformance: StudentPerformance[] = [
  {
    rank: 1,
    name: "Aarav Mehta",
    id: "STU-1001",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    attendance: 96,
    average: 94,
    exams: 8,
    risk: "Low",
  },
  {
    rank: 2,
    name: "Riya Sharma",
    id: "STU-1002",
    course: "NEET Preparation",
    batch: "NEET 2027",
    attendance: 94,
    average: 91,
    exams: 8,
    risk: "Low",
  },
  {
    rank: 3,
    name: "Kabir Patel",
    id: "STU-1003",
    course: "JEE Preparation",
    batch: "JEE Main",
    attendance: 91,
    average: 88,
    exams: 7,
    risk: "Low",
  },
  {
    rank: 4,
    name: "Ananya Singh",
    id: "STU-1004",
    course: "NEET Preparation",
    batch: "NEET 2027",
    attendance: 87,
    average: 82,
    exams: 8,
    risk: "Medium",
  },
  {
    rank: 5,
    name: "Vivaan Shah",
    id: "STU-1005",
    course: "JEE Preparation",
    batch: "JEE Main",
    attendance: 79,
    average: 76,
    exams: 7,
    risk: "Medium",
  },
  {
    rank: 6,
    name: "Myra Joshi",
    id: "STU-1006",
    course: "NEET Preparation",
    batch: "NEET 2027",
    attendance: 72,
    average: 68,
    exams: 6,
    risk: "High",
  },
  {
    rank: 7,
    name: "Aditya Verma",
    id: "STU-1007",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    attendance: 69,
    average: 64,
    exams: 6,
    risk: "High",
  },
  {
    rank: 8,
    name: "Sara Khan",
    id: "STU-1008",
    course: "Foundation",
    batch: "Foundation A",
    attendance: 84,
    average: 79,
    exams: 5,
    risk: "Medium",
  },
  {
    rank: 9,
    name: "Arjun Rao",
    id: "STU-1009",
    course: "JEE Preparation",
    batch: "JEE Main",
    attendance: 90,
    average: 86,
    exams: 7,
    risk: "Low",
  },
  {
    rank: 10,
    name: "Diya Kapoor",
    id: "STU-1010",
    course: "NEET Preparation",
    batch: "NEET 2027",
    attendance: 76,
    average: 73,
    exams: 6,
    risk: "Medium",
  },
  {
    rank: 11,
    name: "Reyansh Gupta",
    id: "STU-1011",
    course: "Foundation",
    batch: "Foundation A",
    attendance: 93,
    average: 89,
    exams: 5,
    risk: "Low",
  },
  {
    rank: 12,
    name: "Ishita Jain",
    id: "STU-1012",
    course: "NEET Preparation",
    batch: "NEET 2027",
    attendance: 67,
    average: 61,
    exams: 6,
    risk: "High",
  },
];

const attendanceData: AttendanceRecord[] = [
  {
    batch: "JEE Advanced",
    present: 286,
    absent: 14,
    late: 8,
    leave: 5,
    percentage: 91,
  },
  {
    batch: "JEE Main",
    present: 342,
    absent: 21,
    late: 12,
    leave: 7,
    percentage: 90,
  },
  {
    batch: "NEET 2027",
    present: 405,
    absent: 27,
    late: 16,
    leave: 9,
    percentage: 89,
  },
  {
    batch: "Foundation A",
    present: 244,
    absent: 18,
    late: 9,
    leave: 6,
    percentage: 88,
  },
];

const feeData: FeeRecord[] = [
  {
    month: "Apr",
    collected: 620000,
    pending: 98000,
    target: 700000,
  },
  {
    month: "May",
    collected: 680000,
    pending: 85000,
    target: 720000,
  },
  {
    month: "Jun",
    collected: 720000,
    pending: 76000,
    target: 750000,
  },
  {
    month: "Jul",
    collected: 760000,
    pending: 69000,
    target: 780000,
  },
  {
    month: "Aug",
    collected: 810000,
    pending: 61000,
    target: 800000,
  },
  {
    month: "Sep",
    collected: 840000,
    pending: 54000,
    target: 850000,
  },
];

const insightData = [
  {
    title: "Attendance risk detected",
    description:
      "12 students show a combination of falling attendance and declining exam performance.",
    type: "Risk",
    impact: "High",
  },
  {
    title: "Revenue trend is positive",
    description:
      "Fee collection has increased consistently over the last five reporting periods.",
    type: "Revenue",
    impact: "Positive",
  },
  {
    title: "NEET 2027 needs attention",
    description:
      "The NEET 2027 batch has the highest number of medium-risk students.",
    type: "Academic",
    impact: "Medium",
  },
  {
    title: "JEE Advanced is strongest batch",
    description:
      "JEE Advanced currently has the strongest combined attendance and average score.",
    type: "Performance",
    impact: "Positive",
  },
];

const reportTemplates = [
  {
    name: "Student Performance",
    category: "Students" as ReportCategory,
    icon: GraduationCap,
    description: "Academic progress, attendance and risk.",
  },
  {
    name: "Fee & Revenue",
    category: "Fees" as ReportCategory,
    icon: IndianRupee,
    description: "Collections, pending fees and forecasts.",
  },
  {
    name: "Attendance",
    category: "Attendance" as ReportCategory,
    icon: CheckCircle2,
    description: "Attendance trends and absenteeism.",
  },
  {
    name: "Exam Analysis",
    category: "Exams" as ReportCategory,
    icon: FileText,
    description: "Marks, ranks and pass percentage.",
  },
  {
    name: "Teacher Performance",
    category: "Teachers" as ReportCategory,
    icon: Users,
    description: "Teacher workload and outcomes.",
  },
  {
    name: "Batch Health",
    category: "Batches" as ReportCategory,
    icon: BarChart3,
    description: "Batch capacity, attendance and risk.",
  },
];

function formatCurrency(value: number) {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }

  return `₹${value}`;
}

function getRiskClasses(risk: StudentPerformance["risk"]) {
  if (risk === "High") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (risk === "Medium") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

function getStatusClasses(status: ReportStatus) {
  if (status === "Processing") {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  if (status === "Scheduled") {
    return "bg-purple-50 text-purple-700 border-purple-200";
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);

  const [activeCategory, setActiveCategory] = useState<ReportCategory>("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [dateRange, setDateRange] = useState("This Month");

  const [showFilters, setShowFilters] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const [showReportBuilder, setShowReportBuilder] = useState(false);

  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [showAiPanel, setShowAiPanel] = useState(false);

  const [showTemplatePanel, setShowTemplatePanel] = useState(false);

  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState("Date");

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(1);

  const [rowsPerPage] = useState(6);

  const [isGenerating, setIsGenerating] = useState(false);

  const [toast, setToast] = useState("");

  const [builderCategory, setBuilderCategory] =
    useState<ReportCategory>("Students");

  const [builderName, setBuilderName] = useState("");

  const [builderDateFrom, setBuilderDateFrom] = useState("2026-09-01");

  const [builderDateTo, setBuilderDateTo] = useState("2026-09-30");

  const [builderIncludeCharts, setBuilderIncludeCharts] = useState(true);

  const [builderIncludeAI, setBuilderIncludeAI] = useState(true);

  const [scheduleFrequency, setScheduleFrequency] = useState("Weekly");

  const [scheduleEmail, setScheduleEmail] = useState("admin@coaching.local");

  const [scheduleReport, setScheduleReport] = useState("Student Performance");

  const [copied, setCopied] = useState(false);

  const categories: ReportCategory[] = [
    "All",
    "Students",
    "Attendance",
    "Fees",
    "Exams",
    "Teachers",
    "Courses",
    "Batches",
  ];

  const filteredReports = useMemo(() => {
    const result = reports.filter((report) => {
      const matchesCategory =
        activeCategory === "All" || report.category === activeCategory;

      const query = searchQuery.toLowerCase();

      const matchesSearch =
        report.name.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query);

      const matchesStatus =
        selectedStatus === "All Status" || report.status === selectedStatus;

      return matchesCategory && matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      if (sortBy === "Name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      if (sortBy === "Records") {
        return sortDirection === "asc"
          ? a.records - b.records
          : b.records - a.records;
      }

      return sortDirection === "asc"
        ? a.generatedDate.localeCompare(b.generatedDate)
        : b.generatedDate.localeCompare(a.generatedDate);
    });

    return result;
  }, [
    reports,
    activeCategory,
    searchQuery,
    selectedStatus,
    sortBy,
    sortDirection,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / rowsPerPage),
  );

  const paginatedReports = filteredReports.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const totalStudents = 1248;

  const totalReports = reports.length;

  const attendanceAverage = Math.round(
    attendanceData.reduce((sum, item) => sum + item.percentage, 0) /
      attendanceData.length,
  );

  const totalCollected = feeData.reduce((sum, item) => sum + item.collected, 0);

  const totalPending = feeData.reduce((sum, item) => sum + item.pending, 0);

  const totalTarget = feeData.reduce((sum, item) => sum + item.target, 0);

  const collectionRate = Math.round((totalCollected / totalTarget) * 100);

  const highRiskStudents = studentPerformance.filter(
    (student) => student.risk === "High",
  ).length;

  const mediumRiskStudents = studentPerformance.filter(
    (student) => student.risk === "Medium",
  ).length;

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleGenerateReport = () => {
    if (!builderName.trim()) {
      showToast("Please enter a report name.");
      return;
    }

    setIsGenerating(true);

    window.setTimeout(() => {
      const newReport: Report = {
        id: `RPT-${1000 + reports.length + 1}`,
        name: builderName,
        category: builderCategory === "All" ? "Students" : builderCategory,
        description: `Custom ${builderCategory} report generated using the report builder.`,
        generatedDate: new Date().toISOString().split("T")[0],
        generatedTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "Ready",
        records:
          builderCategory === "Students"
            ? 1248
            : builderCategory === "Teachers"
              ? 42
              : builderCategory === "Batches"
                ? 28
                : 500,
        owner: builderIncludeAI ? "AI Analytics" : "Admin",
        frequency: "On Demand",
      };

      setReports((current) => [newReport, ...current]);

      setBuilderName("");

      setShowReportBuilder(false);

      setIsGenerating(false);

      setPage(1);

      showToast("Report generated successfully.");
    }, 1000);
  };

  const handleDeleteReport = (id: string) => {
    setReports((current) => current.filter((report) => report.id !== id));

    setShowActionMenu(null);

    showToast("Report deleted.");
  };

  const handleDuplicateReport = (report: Report) => {
    const duplicate: Report = {
      ...report,
      id: `RPT-${1000 + reports.length + 1}`,
      name: `${report.name} Copy`,
      status: "Ready",
      generatedDate: new Date().toISOString().split("T")[0],
      generatedTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setReports((current) => [duplicate, ...current]);

    setShowActionMenu(null);

    showToast("Report duplicated.");
  };

  const handleExportCSV = () => {
    const headers = [
      "Report ID",
      "Report Name",
      "Category",
      "Description",
      "Generated Date",
      "Generated Time",
      "Status",
      "Records",
      "Owner",
      "Frequency",
    ];

    const rows = filteredReports.map((report) => [
      report.id,
      report.name,
      report.category,
      report.description,
      report.generatedDate,
      report.generatedTime,
      report.status,
      report.records,
      report.owner,
      report.frequency,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "coaching-reports.csv";

    link.click();

    URL.revokeObjectURL(url);

    showToast("CSV exported successfully.");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    const summary = `Coaching OS Reports Summary
Students: ${totalStudents}
Attendance: ${attendanceAverage}%
Fee Collection: ${formatCurrency(totalCollected)}
Pending Fees: ${formatCurrency(totalPending)}
Collection Rate: ${collectionRate}%
High Risk Students: ${highRiskStudents}
Medium Risk Students: ${mediumRiskStudents}`;

    try {
      await navigator.clipboard.writeText(summary);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);

      showToast("Summary copied.");
    } catch {
      showToast("Unable to copy summary.");
    }
  };

  const handleScheduleReport = () => {
    setShowScheduleModal(false);

    showToast(
      `${scheduleReport} scheduled ${scheduleFrequency.toLowerCase()}.`,
    );
  };

  const handleClearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setSelectedStatus("All Status");
    setDateRange("This Month");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* HEADER */}
        <PageHeader
          title="Reports & Intelligence"
          description="Turn your coaching data into actionable insights."
          icon={<FileBarChart size={20} />}
          actions={
            <>
              <button
                type="button"
                onClick={() => setShowTemplatePanel(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <FileText size={16} />
                Templates
              </button>

              <button
                type="button"
                onClick={() => setShowAiPanel(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 shadow-sm transition hover:border-purple-300 hover:bg-purple-100"
              >
                <Sparkles size={16} />
                AI Insights
              </button>

              <button
                type="button"
                onClick={() => setShowReportBuilder(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <BarChart3 size={16} />
                Create Report
              </button>
            </>
          }
        />

        {/* KPI CARDS */}
        <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <Users className="h-5 w-5" />
              </div>

              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUp className="h-3.5 w-3.5" />
                12.5%
              </span>
            </div>

            <p className="text-sm text-slate-500">Students Analyzed</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {totalStudents.toLocaleString()}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Across all active batches
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUp className="h-3.5 w-3.5" />
                2.8%
              </span>
            </div>

            <p className="text-sm text-slate-500">Attendance</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {attendanceAverage}%
            </h2>

            <p className="mt-1 text-xs text-slate-400">Overall average</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                <IndianRupee className="h-5 w-5" />
              </div>

              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUp className="h-3.5 w-3.5" />
                15.2%
              </span>
            </div>

            <p className="text-sm text-slate-500">Revenue Analyzed</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {formatCurrency(totalCollected)}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Current reporting period
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-red-50 p-2.5 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <span className="text-xs font-semibold text-red-600">
                Needs attention
              </span>
            </div>

            <p className="text-sm text-slate-500">High Risk Students</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {highRiskStudents}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              AI early-warning indicators
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                <FileBarChart className="h-5 w-5" />
              </div>

              <span className="text-xs font-semibold text-blue-600">Live</span>
            </div>

            <p className="text-sm text-slate-500">Reports Available</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {totalReports}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Saved & generated reports
            </p>
          </div>
        </div>

        {/* AI INTELLIGENCE BANNER */}
        <div className="mb-7 overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 via-white to-blue-50">
          <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-purple-600 p-3 text-white shadow-sm">
                <Brain className="h-6 w-6" />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h2 className="font-bold text-slate-900">
                    AI Intelligence Layer
                  </h2>

                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-700">
                    Beta
                  </span>
                </div>

                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                  Identify students at risk, detect unusual attendance patterns,
                  understand revenue trends and surface important operational
                  signals automatically.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-700">
                    Risk prediction
                  </span>

                  <span className="rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-700">
                    Anomaly detection
                  </span>

                  <span className="rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-700">
                    Forecasting
                  </span>

                  <span className="rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-700">
                    Natural-language insights
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAiPanel(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              <Sparkles className="h-4 w-4" />
              View AI Insights
            </button>
          </div>
        </div>

        {/* PERFORMANCE OVERVIEW */}
        <div className="mb-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Performance Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Academic and operational health at a glance.
                </p>
              </div>

              <select
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">Average Score</span>

                  <Target className="h-4 w-4 text-blue-500" />
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-slate-900">
                    82.4%
                  </span>

                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ArrowUp className="h-3 w-3" />
                    4.6%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: "82.4%" }}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Collection Rate
                  </span>

                  <WalletCards className="h-4 w-4 text-amber-500" />
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-slate-900">
                    {collectionRate}%
                  </span>

                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ArrowUp className="h-3 w-3" />
                    3.1%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{
                      width: `${Math.min(collectionRate, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">At-Risk Rate</span>

                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-slate-900">
                    7.8%
                  </span>

                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ArrowDown className="h-3 w-3" />
                    1.4%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: "7.8%" }}
                  />
                </div>
              </div>
            </div>

            {/* MINI TREND GRAPH */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Academic performance trend
                </span>

                <span className="text-xs text-slate-400">Last 6 periods</span>
              </div>

              <div className="flex h-36 items-end gap-3 rounded-xl bg-slate-50 p-4">
                {[58, 63, 61, 72, 76, 82].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className="w-full max-w-12 rounded-t-lg bg-blue-500 transition hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                    />

                    <span className="text-[10px] font-medium text-slate-400">
                      {feeData[index]?.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QUICK REPORT ACTIONS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-bold text-slate-900">Quick Reports</h2>

              <p className="mt-1 text-sm text-slate-500">
                Generate common reports instantly.
              </p>
            </div>

            <div className="space-y-3">
              {reportTemplates.slice(0, 5).map((template) => {
                const Icon = template.icon;

                return (
                  <button
                    key={template.name}
                    onClick={() => {
                      setBuilderCategory(template.category);
                      setBuilderName(template.name);
                      setShowReportBuilder(true);
                    }}
                    className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
                  >
                    <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {template.name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {template.description}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowReportBuilder(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-blue-50/50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              <Settings2 className="h-4 w-4" />
              Advanced Report Builder
            </button>
          </div>
        </div>

        {/* FEE + ATTENDANCE ANALYTICS */}
        <div className="mb-7 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* REVENUE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Revenue Intelligence
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Collection versus monthly target.
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                <IndianRupee className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-4">
              {feeData.map((item) => {
                const percentage = Math.round(
                  (item.collected / item.target) * 100,
                );

                return (
                  <div key={item.month}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">
                        {item.month}
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-800">
                          {formatCurrency(item.collected)}
                        </span>

                        <span className="text-[11px] text-slate-400">
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-emerald-700">Collected</p>

                <p className="mt-1 text-xl font-bold text-emerald-800">
                  {formatCurrency(totalCollected)}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-xs text-red-700">Pending</p>

                <p className="mt-1 text-xl font-bold text-red-800">
                  {formatCurrency(totalPending)}
                </p>
              </div>
            </div>
          </div>

          {/* ATTENDANCE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Attendance Intelligence
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Batch-level attendance health.
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-5">
              {attendanceData.map((item) => (
                <div key={item.batch}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.batch}
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="flex h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="bg-emerald-500"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />

                    <div
                      className="bg-red-400"
                      style={{
                        width: `${(item.absent / 320) * 100}%`,
                      }}
                    />

                    <div
                      className="bg-amber-400"
                      style={{
                        width: `${(item.late / 320) * 100}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex gap-4 text-[11px] text-slate-400">
                    <span>Present {item.present}</span>

                    <span>Absent {item.absent}</span>

                    <span>Late {item.late}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-xs text-slate-500">Overall attendance</p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {attendanceAverage}%
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                Improving
              </div>
            </div>
          </div>
        </div>

        {/* AI INSIGHTS */}
        <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                  <Lightbulb className="h-5 w-5" />
                </div>

                <h2 className="font-bold text-slate-900">
                  Intelligent Insights
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Signals detected from your current reporting data.
              </p>
            </div>

            <button
              onClick={() => setShowAiPanel(true)}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100 sm:self-auto"
            >
              <Brain className="h-4 w-4" />
              Analyze More
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {insightData.map((insight) => (
              <div
                key={insight.title}
                className="rounded-xl border border-slate-200 p-4 transition hover:border-purple-200 hover:bg-purple-50/30"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    {insight.type}
                  </span>

                  <span
                    className={`text-[10px] font-bold ${
                      insight.impact === "High"
                        ? "text-red-600"
                        : insight.impact === "Positive"
                          ? "text-emerald-600"
                          : "text-amber-600"
                    }`}
                  >
                    {insight.impact}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800">
                  {insight.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* STUDENT PERFORMANCE */}
        <div className="mb-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Student Performance Intelligence
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Academic performance combined with attendance risk.
                </p>
              </div>

              <button
                onClick={() => {
                  setBuilderCategory("Students");
                  setBuilderName("Student Performance Intelligence");
                  setShowReportBuilder(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <FileBarChart className="h-4 w-4" />
                Full Report
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Rank
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Student
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Course / Batch
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Attendance
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Average
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Exams
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Risk
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {studentPerformance.slice(0, 8).map((student) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-blue-50/30"
                  >
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-700">
                        #{student.rank}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                          {student.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {student.name}
                          </p>

                          <p className="text-xs text-slate-400">{student.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {student.course}
                      </p>

                      <p className="text-xs text-slate-400">{student.batch}</p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{
                              width: `${student.attendance}%`,
                            }}
                          />
                        </div>

                        <span className="text-xs font-bold text-slate-700">
                          {student.attendance}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-800">
                        {student.average}%
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">
                        {student.exams}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getRiskClasses(
                          student.risk,
                        )}`}
                      >
                        {student.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* REPORT HISTORY */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Report Library</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Generated, saved and scheduled reports.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied" : "Copy Summary"}
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </button>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* SEARCH / FILTERS */}
            <div className="mt-5 flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search reports..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(event) => {
                  setSelectedStatus(event.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
              >
                <option>All Status</option>
                <option>Ready</option>
                <option>Processing</option>
                <option>Scheduled</option>
              </select>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
              >
                <option>Date</option>
                <option>Name</option>
                <option>Records</option>
              </select>

              <button
                onClick={() =>
                  setSortDirection((current) =>
                    current === "asc" ? "desc" : "asc",
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {sortDirection === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {sortDirection === "asc" ? "Ascending" : "Descending"}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  showFilters
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* CATEGORY TABS */}
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setPage(1);
                  }}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    activeCategory === category
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* EXTRA FILTERS */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Date Range
                  </label>

                  <select
                    value={dateRange}
                    onChange={(event) => setDateRange(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                  >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Report Type
                  </label>

                  <select
                    value={activeCategory}
                    onChange={(event) => {
                      setActiveCategory(event.target.value as ReportCategory);
                      setPage(1);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleClearFilters}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Report
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Generated
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Records
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedReports.map((report) => (
                  <tr
                    key={report.id}
                    className="transition hover:bg-blue-50/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                          <FileBarChart className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">
                            {report.name}
                          </p>

                          <p className="mt-0.5 max-w-md truncate text-xs text-slate-400">
                            {report.description}
                          </p>

                          <p className="mt-1 text-[10px] font-semibold text-slate-400">
                            {report.id} · {report.owner}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {report.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {report.generatedDate}
                      </p>

                      <p className="text-xs text-slate-400">
                        {report.generatedTime}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-700">
                        {report.records.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          report.status,
                        )}`}
                      >
                        {report.status === "Processing" && (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        )}

                        {report.status === "Ready" && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}

                        {report.status === "Scheduled" && (
                          <Clock3 className="h-3 w-3" />
                        )}

                        {report.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowActionMenu(
                                showActionMenu === report.id ? null : report.id,
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>

                          {showActionMenu === report.id && (
                            <div className="absolute right-0 top-10 z-30 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                              <button
                                onClick={() => {
                                  setSelectedReport(report);
                                  setShowActionMenu(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                View Report
                              </button>

                              <button
                                onClick={() => handleDuplicateReport(report)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Copy className="h-3.5 w-3.5" />
                                Duplicate
                              </button>

                              <button
                                onClick={() => {
                                  setBuilderCategory(report.category);
                                  setBuilderName(report.name);
                                  setShowReportBuilder(true);
                                  setShowActionMenu(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Settings2 className="h-3.5 w-3.5" />
                                Create Similar
                              </button>

                              <button
                                onClick={() => handleDeleteReport(report.id)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
                              >
                                <X className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedReports.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-14 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="rounded-2xl bg-slate-100 p-4 text-slate-400">
                          <Search className="h-6 w-6" />
                        </div>

                        <h3 className="mt-4 font-semibold text-slate-800">
                          No reports found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your search or filters.
                        </p>

                        <button
                          onClick={handleClearFilters}
                          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredReports.length === 0
                  ? 0
                  : (page - 1) * rowsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(page * rowsPerPage, filteredReports.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filteredReports.length}
              </span>{" "}
              reports
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(current - 1, 1))}
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`h-8 min-w-8 rounded-lg px-2 text-xs font-semibold ${
                      page === pageNumber
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}

              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(current + 1, totalPages))
                }
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* REPORT DETAILS MODAL */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReport(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <FileBarChart className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedReport.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedReport.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Report ID</p>

                <p className="mt-1 font-bold text-slate-800">
                  {selectedReport.id}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Category</p>

                <p className="mt-1 font-bold text-slate-800">
                  {selectedReport.category}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Records</p>

                <p className="mt-1 font-bold text-slate-800">
                  {selectedReport.records.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Generated</p>

                <p className="mt-1 font-bold text-slate-800">
                  {selectedReport.generatedDate}
                </p>

                <p className="text-xs text-slate-400">
                  {selectedReport.generatedTime}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Owner</p>

                <p className="mt-1 font-bold text-slate-800">
                  {selectedReport.owner}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Frequency</p>

                <p className="mt-1 font-bold text-slate-800">
                  {selectedReport.frequency}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
                <div className="flex items-start gap-3">
                  <Brain className="mt-0.5 h-5 w-5 text-purple-600" />

                  <div>
                    <h3 className="font-bold text-purple-900">
                      Intelligent Summary
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-purple-800">
                      This report can be enhanced with AI-generated summaries,
                      anomaly detection, recommendations, trend explanations and
                      risk predictions once the reporting backend and AI service
                      are connected.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 p-6">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>

              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT BUILDER MODAL */}
      {showReportBuilder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowReportBuilder(false);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700">
                  <Settings2 className="h-3.5 w-3.5" />
                  Advanced Builder
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Create Custom Report
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Configure your report and generate it instantly.
                </p>
              </div>

              <button
                onClick={() => setShowReportBuilder(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Report Name
                </label>

                <input
                  value={builderName}
                  onChange={(event) => setBuilderName(event.target.value)}
                  placeholder="e.g. September Student Performance"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Report Category
                </label>

                <select
                  value={builderCategory}
                  onChange={(event) =>
                    setBuilderCategory(event.target.value as ReportCategory)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500"
                >
                  <option>Students</option>
                  <option>Attendance</option>
                  <option>Fees</option>
                  <option>Exams</option>
                  <option>Teachers</option>
                  <option>Courses</option>
                  <option>Batches</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    From Date
                  </label>

                  <input
                    type="date"
                    value={builderDateFrom}
                    onChange={(event) => setBuilderDateFrom(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    To Date
                  </label>

                  <input
                    type="date"
                    value={builderDateTo}
                    onChange={(event) => setBuilderDateTo(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-slate-800">
                  Report Intelligence
                </h3>

                <div className="mt-4 space-y-3">
                  <label className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-3">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-4 w-4 text-blue-600" />

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Include charts
                        </p>

                        <p className="text-xs text-slate-400">
                          Add visual analytics to the report.
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={builderIncludeCharts}
                      onChange={(event) =>
                        setBuilderIncludeCharts(event.target.checked)
                      }
                      className="h-4 w-4 accent-blue-600"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-3">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-4 w-4 text-purple-600" />

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Include AI analysis
                        </p>

                        <p className="text-xs text-slate-400">
                          Generate insights, trends and risk signals.
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={builderIncludeAI}
                      onChange={(event) =>
                        setBuilderIncludeAI(event.target.checked)
                      }
                      className="h-4 w-4 accent-purple-600"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <Lightbulb className="mt-0.5 h-5 w-5 text-blue-600" />

                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      Smart report suggestion
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-800">
                      For student reports, combining attendance, exam
                      performance and fee status can provide a stronger picture
                      of student health.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
              <button
                onClick={() => setShowReportBuilder(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                disabled={isGenerating}
                onClick={handleGenerateReport}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI INSIGHTS MODAL */}
      {showAiPanel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAiPanel(false);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-purple-200 bg-white shadow-2xl">
            <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="rounded-xl bg-purple-600 p-3 text-white">
                    <Brain className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">
                        AI Insights Center
                      </h2>

                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-700">
                        Beta
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      Automated interpretation of your coaching data.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAiPanel(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-6">
              {insightData.map((insight, index) => (
                <div
                  key={insight.title}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        index === 0
                          ? "bg-red-50 text-red-600"
                          : index === 1
                            ? "bg-emerald-50 text-emerald-600"
                            : index === 2
                              ? "bg-amber-50 text-amber-600"
                              : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {index === 0 ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : index === 1 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : index === 2 ? (
                        <Target className="h-4 w-4" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-bold text-slate-800">
                          {insight.title}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                          {insight.type}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {insight.description}
                      </p>

                      {index === 0 && (
                        <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs leading-5 text-red-800">
                          Recommended action: review attendance and recent exam
                          results, then trigger an early intervention workflow
                          for affected students.
                        </div>
                      )}

                      {index === 1 && (
                        <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">
                          Recommended action: compare the strongest collection
                          periods against payment reminders and enrollment
                          activity.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-dashed border-purple-300 bg-purple-50 p-5">
                <div className="flex gap-3">
                  <Sparkles className="h-5 w-5 text-purple-600" />

                  <div>
                    <h3 className="font-bold text-purple-900">
                      Future AI capabilities
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-purple-800">
                      Once the backend is connected, this layer can support
                      natural-language questions such as “Which students are
                      likely to drop attendance next month?”, “Which batches are
                      underperforming?” or “Why did fee collection fall this
                      month?”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 p-6">
              <button
                onClick={() => setShowAiPanel(false)}
                className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATE MODAL */}
      {showTemplatePanel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowTemplatePanel(false);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Report Templates
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Start from a preconfigured report.
                </p>
              </div>

              <button
                onClick={() => setShowTemplatePanel(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 p-6 md:grid-cols-2">
              {reportTemplates.map((template) => {
                const Icon = template.icon;

                return (
                  <button
                    key={template.name}
                    onClick={() => {
                      setBuilderCategory(template.category);
                      setBuilderName(template.name);
                      setShowTemplatePanel(false);
                      setShowReportBuilder(true);
                    }}
                    className="group rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
                  >
                    <div className="mb-3 inline-flex rounded-xl bg-slate-100 p-3 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="font-bold text-slate-800">
                      {template.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {template.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE BUTTON / MODAL */}
      <button
        onClick={() => setShowScheduleModal(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800"
      >
        <CalendarDays className="h-4 w-4" />
        Schedule Report
      </button>

      {showScheduleModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowScheduleModal(false);
            }
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <div className="mb-2 inline-flex rounded-lg bg-purple-50 p-2 text-purple-600">
                  <CalendarDays className="h-4 w-4" />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Schedule Report
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Automatically prepare recurring reports.
                </p>
              </div>

              <button
                onClick={() => setShowScheduleModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Report
                </label>

                <select
                  value={scheduleReport}
                  onChange={(event) => setScheduleReport(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>Student Performance</option>
                  <option>Fee & Revenue</option>
                  <option>Attendance</option>
                  <option>Exam Analysis</option>
                  <option>Teacher Performance</option>
                  <option>Batch Health</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Frequency
                </label>

                <select
                  value={scheduleFrequency}
                  onChange={(event) => setScheduleFrequency(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Delivery Email
                </label>

                <input
                  type="email"
                  value={scheduleEmail}
                  onChange={(event) => setScheduleEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 text-blue-600" />

                  <p className="text-xs leading-5 text-blue-800">
                    Scheduling is currently stored locally in this frontend
                    prototype. Later it will connect to the backend scheduler,
                    email service and notification engine.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleScheduleReport}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
              >
                <CalendarDays className="h-4 w-4" />
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

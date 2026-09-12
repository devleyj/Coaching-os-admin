"use client";

import Link from "next/link";
import Sidebar from "./components/Slidebar";

import StudentGrowthChart from "./components/StudentGrowthCharts";
import RevenueChart from "./components/RevenueChart";
import AttendanceOverview from "./components/AttendanceOverview";
import TodaysClasses from "./components/TodaysClasses";
import RecentActivity from "./components/RecentActivity";
import RecentPayments from "./components/RecentPayments";

import {
  Search,
  Bell,
  Users,
  GraduationCap,
  Layers,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Settings,
  LogOut,
  RefreshCw,
  CalendarDays,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  UserPlus,
  CreditCard,
  ClipboardCheck,
  FileText,
  MessageCircle,
  ChevronDown,
  X,
  Brain,
  TrendingUp,
  Target,
  ShieldCheck,
  Zap,
  ArrowRight,
  CircleDollarSign,
  UserRoundSearch,
  BookOpen,
} from "lucide-react";

import { useEffect, useMemo, useRef, useState } from "react";
import { getCollection, setCollection, subscribeToStore } from "./data/store";

type InsightType = "success" | "warning" | "info" | "danger";

type Insight = {
  id: number;
  type: InsightType;
  title: string;
  description: string;
  action?: string;
  href?: string;
};

const stats = [
  {
    title: "Total Students",
    value: "1,248",
    change: "+12.5%",
    description: "from last month",
    icon: Users,
    iconStyle: "bg-blue-50 text-blue-600",
    trend: "up",
    href: "/students",
  },
  {
    title: "Total Teachers",
    value: "42",
    change: "+7.1%",
    description: "from last month",
    icon: GraduationCap,
    iconStyle: "bg-indigo-50 text-indigo-600",
    trend: "up",
    href: "/teachers",
  },
  {
    title: "Total Batches",
    value: "28",
    change: "+8.3%",
    description: "from last month",
    icon: Layers,
    iconStyle: "bg-emerald-50 text-emerald-600",
    trend: "up",
    href: "/batches",
  },
  {
    title: "Total Revenue",
    value: "₹8.4L",
    change: "+15.2%",
    description: "from last month",
    icon: IndianRupee,
    iconStyle: "bg-orange-50 text-orange-600",
    trend: "up",
    href: "/fees",
  },
  {
    title: "Pending Fees",
    value: "₹2.1L",
    change: "-4.8%",
    description: "from last month",
    icon: CircleDollarSign,
    iconStyle: "bg-red-50 text-red-600",
    trend: "down",
    href: "/fees",
  },
  {
    title: "Attendance",
    value: "91.8%",
    change: "+2.4%",
    description: "this month",
    icon: ClipboardCheck,
    iconStyle: "bg-cyan-50 text-cyan-600",
    trend: "up",
    href: "/attendance",
  },
  {
    title: "New Inquiries",
    value: "86",
    change: "+18.6%",
    description: "this month",
    icon: UserRoundSearch,
    iconStyle: "bg-purple-50 text-purple-600",
    trend: "up",
    href: "/inquiries",
  },
  {
    title: "Upcoming Exams",
    value: "6",
    change: "+2",
    description: "next 30 days",
    icon: FileText,
    iconStyle: "bg-yellow-50 text-yellow-700",
    trend: "up",
    href: "/exams",
  },
];

type DashboardNotification = {
  id: string | number;
  title: string;
  description: string;
  time: string;
  type: string;
  read?: boolean;
};


const quickActions = [
  {
    title: "Add Student",
    description: "Register a new student",
    icon: UserPlus,
    href: "/students",
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Record Payment",
    description: "Add a fee payment",
    icon: CreditCard,
    href: "/fees",
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Mark Attendance",
    description: "Update attendance",
    icon: ClipboardCheck,
    href: "/attendance",
    iconStyle: "bg-purple-50 text-purple-600",
  },
  {
    title: "New Inquiry",
    description: "Add a prospective student",
    icon: UserRoundSearch,
    href: "/inquiries",
    iconStyle: "bg-orange-50 text-orange-600",
  },
  {
    title: "Create Exam",
    description: "Schedule an examination",
    icon: FileText,
    href: "/exams",
    iconStyle: "bg-yellow-50 text-yellow-700",
  },
  {
    title: "Schedule Class",
    description: "Create a class schedule",
    icon: CalendarDays,
    href: "/schedule",
    iconStyle: "bg-indigo-50 text-indigo-600",
  },
];

const attentionItems = [
  {
    title: "12 students have low attendance",
    description: "Attendance below 75%",
    count: "12",
    type: "attendance",
    href: "/attendance",
  },
  {
    title: "₹2.1L fee amount is pending",
    description: "Requires collection follow-up",
    count: "₹2.1L",
    type: "fees",
    href: "/fees",
  },
  {
    title: "8 students are at performance risk",
    description: "Based on recent exam trends",
    count: "8",
    type: "risk",
    href: "/reports",
  },
  {
    title: "14 inquiries need follow-up",
    description: "Follow-up due today",
    count: "14",
    type: "inquiry",
    href: "/inquiries",
  },
];

const aiInsights: Insight[] = [
  {
    id: 1,
    type: "warning",
    title: "Attendance risk detected",
    description:
      "12 students have attendance below 75%. Early intervention may reduce academic risk.",
    action: "Review attendance",
    href: "/attendance",
  },
  {
    id: 2,
    type: "success",
    title: "Revenue trend is positive",
    description:
      "Fee collection is 15.2% higher than last month. The current collection trend is healthy.",
    action: "View fees",
    href: "/fees",
  },
  {
    id: 3,
    type: "info",
    title: "Inquiry conversion opportunity",
    description:
      "86 new inquiries were recorded this month. 14 require follow-up today.",
    action: "Open inquiries",
    href: "/inquiries",
  },
  {
    id: 4,
    type: "danger",
    title: "Performance risk requires attention",
    description:
      "8 students show a downward academic trend and should be reviewed by their teachers.",
    action: "View reports",
    href: "/reports",
  },
];

const aiQuestions = [
  "Which students are at highest risk?",
  "Why is attendance falling?",
  "Which batches perform best?",
  "How can we improve fee collection?",
];

export default function Home() {
  const [notificationsOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const [selectedDateRange, setSelectedDateRange] = useState("This Month");
  const [dateMenuOpen, setDateMenuOpen] = useState(false);

  const [dashboardNotifications, setDashboardNotifications] = useState<DashboardNotification[]>([]);
  const unreadNotifications = dashboardNotifications.filter((notification) => !notification.read).length;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [toast, setToast] = useState("");

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }

      if (dateRef.current && !dateRef.current.contains(target)) {
        setDateMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNotificationOpen(false);
        setProfileOpen(false);
        setDateMenuOpen(false);
        setSearchOpen(false);
        setAiOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const loadNotifications = () => {
      const records = getCollection<DashboardNotification>("notifications");
      setDashboardNotifications(records);
    };

    loadNotifications();
    return subscribeToStore(loadNotifications);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const filteredQuickActions = useMemo(() => {
    if (!searchQuery.trim()) return quickActions;

    const query = searchQuery.toLowerCase();

    return quickActions.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
      setToast("Dashboard refreshed successfully");
    }, 900);
  };

  const handleMarkAllRead = () => {
    const records = getCollection<DashboardNotification>("notifications");
    const nextRecords = records.map((notification) => ({
      ...notification,
      read: true,
    }));

    setCollection("notifications", nextRecords);
    setDashboardNotifications(nextRecords);
    setToast("All notifications marked as read");
  };

  const handleAiQuestion = (question: string) => {
    setAiQuery(question);
    setToast("AI analysis request prepared");
  };

  const handleProfileAction = (action: string) => {
    setProfileOpen(false);

    if (action === "profile") {
      setToast("Profile management is ready for the account module");
    }

    if (action === "settings") {
      window.location.href = "/settings";
    }

    if (action === "logout") {
      setToast("Logout will be connected to authentication later");
    }
  };

  const getInsightIcon = (type: InsightType) => {
    if (type === "success") {
      return <CheckCircle2 size={18} />;
    }

    if (type === "warning") {
      return <AlertTriangle size={18} />;
    }

    if (type === "danger") {
      return <ShieldCheck size={18} />;
    }

    return <Brain size={18} />;
  };

  const getInsightStyle = (type: InsightType) => {
    if (type === "success") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (type === "warning") {
      return "bg-amber-50 text-amber-700 border-amber-100";
    }

    if (type === "danger") {
      return "bg-red-50 text-red-700 border-red-100";
    }

    return "bg-blue-50 text-blue-700 border-blue-100";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen lg:ml-64">
        {/* =========================================================
            TOP HEADER
        ========================================================= */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
          <div className="flex min-h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="hidden min-w-0 flex-1 md:block">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-full max-w-2xl items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-left transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
              >
                <Search
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <span className="ml-3 truncate text-sm text-slate-500">
                  Search students, teachers, classes, payments...
                </span>

                <span className="ml-auto hidden shrink-0 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-400 lg:block">
                  Ctrl K
                </span>
              </button>
            </div>

            {/* Right controls */}
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              {/* Mobile search */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 md:hidden"
                aria-label="Open search"
              >
                <Search size={19} />
              </button>

              {/* AI */}
              <button
                type="button"
                onClick={() => setAiOpen(true)}
                className="hidden items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100 lg:flex"
              >
                <Sparkles size={16} />
                AI Insights
              </button>

              {/* Refresh */}
              <button
                type="button"
                onClick={handleRefresh}
                className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Refresh dashboard"
                title="Refresh dashboard"
              >
                <RefreshCw
                  size={18}
                  className={isRefreshing ? "animate-spin" : ""}
                />
              </button>

              {/* Notifications */}
              <div ref={notificationRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen(!notificationsOpen);
                    setProfileOpen(false);
                    setDateMenuOpen(false);
                  }}
                  className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Open notifications"
                >
                  <Bell size={19} />

                  {unreadNotifications > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-14 z-50 w-[calc(100vw-32px)] max-w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Notifications
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {unreadNotifications === 0
                            ? "You're all caught up"
                            : `You have ${unreadNotifications} unread notifications`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-[360px] overflow-y-auto">
                      {dashboardNotifications.length > 0 ? (
                        dashboardNotifications.slice(0, 8).map((notification) => (
                        <div
                          key={notification.id}
                          className="cursor-pointer border-b border-slate-100 px-4 py-3.5 transition hover:bg-slate-50"
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              {notification.type === "student" && (
                                <UserPlus size={15} />
                              )}

                              {notification.type === "payment" && (
                                <CreditCard size={15} />
                              )}

                              {notification.type === "attendance" && (
                                <ClipboardCheck size={15} />
                              )}

                              {notification.type === "inquiry" && (
                                <MessageCircle size={15} />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900">
                                {notification.title}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {notification.description}
                              </p>

                              <p className="mt-1 text-[11px] text-slate-400">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        ))
                      ) : (
                        <div className="px-4 py-10 text-center">
                          <Bell size={24} className="mx-auto text-slate-300" />
                          <p className="mt-2 text-sm font-semibold text-slate-700">No notifications yet</p>
                          <p className="mt-1 text-xs text-slate-500">New attendance and system notifications will appear here.</p>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-100 p-3 text-center">
                      <Link
                        href="/notifications"
                        onClick={() => setNotificationOpen(false)}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700"
                      >
                        View all notifications →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              {/* Admin */}
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setNotificationOpen(false);
                    setDateMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-slate-50 sm:gap-3"
                  aria-label="Open admin profile menu"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 ring-2 ring-white">
                    A
                  </div>

                  <div className="hidden sm:block">
                    <p className="text-sm font-bold text-slate-900">
                      Admin
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Super Admin
                    </p>
                  </div>

                  <ChevronDown
                    size={15}
                    className="hidden text-slate-400 sm:block"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                          A
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Admin
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Super Admin
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <button
                        type="button"
                        onClick={() => handleProfileAction("profile")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <User size={17} />
                        <span>Profile</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleProfileAction("settings")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Settings size={17} />
                        <span>Account Settings</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleProfileAction("logout")}
                        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                      >
                        <LogOut size={17} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* =========================================================
            DASHBOARD CONTENT
        ========================================================= */}
        <section className="p-4 sm:p-6 lg:p-8">
          {/* Page heading */}
          <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Dashboard
                </h1>

                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  AI Ready
                </span>

                <span className="hidden rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 sm:inline-flex">
                  v0.1.21
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                Your institute command center — monitor students, academics,
                revenue and daily operations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Date */}
              <div ref={dateRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setDateMenuOpen(!dateMenuOpen);
                    setNotificationOpen(false);
                    setProfileOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-slate-50"
                >
                  <CalendarDays
                    size={16}
                    className="text-slate-500"
                  />

                  {selectedDateRange}

                  <ChevronDown
                    size={15}
                    className="text-slate-400"
                  />
                </button>

                {dateMenuOpen && (
                  <div className="absolute right-0 top-12 z-40 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    {[
                      "Today",
                      "This Week",
                      "This Month",
                      "This Quarter",
                    ].map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => {
                          setSelectedDateRange(range);
                          setDateMenuOpen(false);
                          setToast(
                            `Dashboard range changed to ${range}`,
                          );
                        }}
                        className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm ${
                          selectedDateRange === range
                            ? "bg-blue-50 font-semibold text-blue-700"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/reports"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                <TrendingUp size={16} />
                View Reports
              </Link>
            </div>
          </div>

          {/* =====================================================
              KPI CARDS
          ===================================================== */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Link
                  href={stat.href}
                  key={stat.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
                    >
                      <Icon size={21} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-xs">
                    {stat.trend === "up" ? (
                      <ArrowUpRight
                        size={14}
                        className="text-emerald-600"
                      />
                    ) : (
                      <ArrowDownRight
                        size={14}
                        className="text-emerald-600"
                      />
                    )}

                    <span className="font-bold text-emerald-600">
                      {stat.change}
                    </span>

                    <span className="text-slate-400">
                      {stat.description}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
                    View details
                    <ArrowRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* =====================================================
              AI COMMAND CENTER
          ===================================================== */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-sm">
            <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <Sparkles size={22} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      AI Command Center
                    </h2>

                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      Ready
                    </span>
                  </div>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                    Your future AI layer will analyze student performance,
                    attendance, fees, inquiries, exams and operations to
                    surface the most important actions automatically.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAiOpen(true)}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Brain size={17} />
                Ask AI
              </button>
            </div>

            <div className="grid grid-cols-1 border-t border-blue-100 sm:grid-cols-3">
              <div className="border-b border-blue-100 p-4 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Target size={14} className="text-blue-600" />
                  Risk Detection
                </div>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  8 students need review
                </p>
              </div>

              <div className="border-b border-blue-100 p-4 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <TrendingUp size={14} className="text-emerald-600" />
                  Growth Signal
                </div>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  Revenue trend is positive
                </p>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Zap size={14} className="text-yellow-600" />
                  Recommended Action
                </div>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  Follow up with 14 inquiries
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              QUICK ACTIONS + ATTENTION
          ===================================================== */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Quick Actions
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Common tasks for your daily operations.
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                  <Zap size={17} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {filteredQuickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      href={action.href}
                      key={action.title}
                      className="group rounded-xl border border-slate-100 bg-slate-50 p-3.5 transition hover:border-blue-100 hover:bg-blue-50"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.iconStyle}`}
                      >
                        <Icon size={17} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-900">
                        {action.title}
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-slate-500">
                        {action.description}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
                        Open
                        <ArrowRight size={11} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Needs Attention */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Needs Attention
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Items that may require action.
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <AlertTriangle size={17} />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {attentionItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-100 hover:bg-slate-50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      {item.type === "attendance" && (
                        <ClipboardCheck size={16} />
                      )}

                      {item.type === "fees" && (
                        <CircleDollarSign size={16} />
                      )}

                      {item.type === "risk" && (
                        <AlertTriangle size={16} />
                      )}

                      {item.type === "inquiry" && (
                        <UserRoundSearch size={16} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-900">
                        {item.title}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-bold text-slate-700">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* =====================================================
              ANALYTICS
          ===================================================== */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <StudentGrowthChart />
            <RevenueChart />
          </div>

          {/* =====================================================
              OPERATIONS
          ===================================================== */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <AttendanceOverview />
            <TodaysClasses />
          </div>

          {/* =====================================================
              AI INSIGHTS
          ===================================================== */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Brain size={18} />
                  </div>

                  <h2 className="text-base font-bold text-slate-900">
                    AI Insights & Recommendations
                  </h2>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  These are currently simulated dashboard insights. The real
                  AI engine will be connected through the backend later.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAiOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Sparkles size={14} />
                Open AI Assistant
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="rounded-xl border border-slate-100 p-4 transition hover:border-slate-200 hover:shadow-sm"
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${getInsightStyle(
                        insight.type,
                      )}`}
                    >
                      {getInsightIcon(insight.type)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {insight.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {insight.description}
                      </p>

                      {insight.href && (
                        <Link
                          href={insight.href}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                          {insight.action}
                          <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================
              RECENT ACTIVITY + PAYMENTS
          ===================================================== */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <RecentActivity />
            <RecentPayments />
          </div>

          {/* =====================================================
              SYSTEM SUMMARY
          ===================================================== */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    System Status
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    All systems operational
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Security
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    Protected
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <BookOpen size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Learning
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    28 active batches
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Today
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    9 classes scheduled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          GLOBAL SEARCH MODAL
      ========================================================= */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/40 p-4 pt-[10vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSearchOpen(false);
            }
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4">
              <Search size={20} className="text-slate-400" />

              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search dashboard actions..."
                className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3">
              <p className="px-2 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Quick actions
              </p>

              {filteredQuickActions.length > 0 ? (
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {filteredQuickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <Link
                        href={action.href}
                        key={action.title}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                      >
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.iconStyle}`}
                        >
                          <Icon size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {action.title}
                          </p>

                          <p className="text-xs text-slate-500">
                            {action.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="px-3 py-8 text-center">
                  <Search
                    size={28}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    No actions found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try another search term.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          AI ASSISTANT MODAL
      ========================================================= */}
      {aiOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setAiOpen(false);
            }
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Sparkles size={19} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Institute AI Assistant
                  </h2>

                  <p className="text-xs text-slate-500">
                    AI-ready dashboard assistant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAiOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex gap-3">
                  <Brain
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      What should I analyze?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      The real AI model will later receive secure backend
                      data and generate evidence-based recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {aiQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleAiQuestion(question)}
                    className="rounded-xl border border-slate-200 px-3.5 py-3 text-left text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <div className="flex flex-1 items-center rounded-xl border border-slate-200 bg-white px-3">
                  <Search
                    size={16}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    value={aiQuery}
                    onChange={(event) => setAiQuery(event.target.value)}
                    placeholder="Ask something about your institute..."
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setToast(
                      aiQuery.trim()
                        ? "AI request saved for the future AI backend"
                        : "Please enter an AI question first",
                    )
                  }
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Ask
                </button>
              </div>

              <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-600"
                  />

                  <p className="text-xs font-semibold text-slate-700">
                    AI privacy architecture
                  </p>
                </div>

                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  Later, sensitive student data should be accessed through
                  authenticated backend services with role-based permissions,
                  audit logs and controlled AI context.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TOAST
      ========================================================= */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[120] flex max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-2xl">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={17} />
          </div>

          <p className="text-sm font-medium text-slate-700">
            {toast}
          </p>

          <button
            type="button"
            onClick={() => setToast("")}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
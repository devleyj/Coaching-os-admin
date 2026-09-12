"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BriefcaseBusiness,
  BookOpen,
  Layers,
  CalendarDays,
  ClipboardCheck,
  IndianRupee,
  UserRoundSearch,
  Video,
  FileText,
  Bell,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Search,
  Sparkles,
  X,
  MessageCircle,
  LifeBuoy,
} from "lucide-react";

const menuGroups = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
      },
    ],
  },
  {
    title: "Academic",
    items: [
      {
        label: "Students",
        icon: Users,
        href: "/students",
      },
      {
        label: "Teachers",
        icon: GraduationCap,
        href: "/teachers",
      },
      {
        label: "Staff",
        icon: BriefcaseBusiness,
        href: "/staff",
      },
      {
        label: "Courses",
        icon: BookOpen,
        href: "/courses",
      },
      {
        label: "Batches",
        icon: Layers,
        href: "/batches",
      },
      {
        label: "Schedule",
        icon: CalendarDays,
        href: "/schedule",
      },
      {
        label: "Attendance",
        icon: ClipboardCheck,
        href: "/attendance",
      },
      {
        label: "Exams",
        icon: FileText,
        href: "/exams",
      },
    ],
  },
  {
    title: "Finance & Growth",
    items: [
      {
        label: "Fees",
        icon: IndianRupee,
        href: "/fees",
      },
      {
        label: "Inquiries",
        icon: UserRoundSearch,
        href: "/inquiries",
        badge: "5",
      },
      {
        label: "Online Classes",
        icon: Video,
        href: "/online-classes",
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        label: "Notifications",
        icon: Bell,
        href: "/notifications",
        badge: "3",
      },
      {
        label: "Reports",
        icon: BarChart3,
        href: "/reports",
      },
    ],
  },
];

export default function Slidebar() {
  const pathname = usePathname();

  const [showSupport, setShowSupport] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200/80 bg-white lg:flex lg:flex-col">
        {/* ========================================================= */}
        {/* BRAND HEADER */}
        {/* ========================================================= */}

        <div className="relative border-b border-slate-100 px-5 py-5">
          <Link href="/" className="group flex items-center">
            {/* Logo */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 transition-transform duration-200 group-hover:scale-105">
              <GraduationCap size={23} strokeWidth={2.2} />

              <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/10" />
            </div>

            {/* Brand */}
            <div className="ml-3 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate text-[17px] font-bold tracking-tight text-slate-900">
                  CoachingOS
                </h1>

                <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-blue-600">
                  Pro
                </span>
              </div>

              <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                Institute Management
              </p>
            </div>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* QUICK AI BUTTON */}
        {/* ========================================================= */}

        <div className="px-4 pt-4">
          <button
            type="button"
            className="group flex w-full items-center rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2.5 text-left transition-all duration-200 hover:border-blue-200 hover:shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <Sparkles size={16} />
            </div>

            <div className="ml-2.5 flex-1">
              <p className="text-xs font-semibold text-slate-800">
                AI Assistant
              </p>
              <p className="text-[9px] text-slate-400">
                Ask anything about your institute
              </p>
            </div>

            <ChevronRight
              size={14}
              className="text-slate-300 transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* ========================================================= */}
        {/* SEARCH */}
        {/* ========================================================= */}

        <div className="px-4 pt-4">
          <button
            type="button"
            className="flex w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left transition-colors hover:border-slate-300 hover:bg-white"
          >
            <Search size={15} className="text-slate-400" />

            <span className="ml-2.5 flex-1 text-xs text-slate-400">
              Search menu...
            </span>

            <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-medium text-slate-400">
              /
            </kbd>
          </button>
        </div>

        {/* ========================================================= */}
        {/* NAVIGATION */}
        {/* ========================================================= */}

        <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-5">
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-5 last:mb-0">
              <div className="mb-2 px-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {group.title}
                </p>
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`group relative flex w-full items-center rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                        active
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {/* Active indicator */}
                      {active && (
                        <span className="absolute -left-3 h-7 w-1 rounded-r-full bg-blue-600" />
                      )}

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          active
                            ? "bg-white/15 text-white"
                            : "text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                        }`}
                      >
                        <Icon size={17} strokeWidth={active ? 2.3 : 2} />
                      </div>

                      <span className="ml-2.5 flex-1 truncate">
                        {item.label}
                      </span>

                      {item.badge && (
                        <span
                          className={`mr-0.5 min-w-[20px] rounded-full px-1.5 py-0.5 text-center text-[9px] font-bold ${
                            active
                              ? "bg-white/20 text-white"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {!item.badge && active && (
                        <ChevronRight size={14} className="text-white/70" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* System */}
          <div className="mb-2 px-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
              System
            </p>
          </div>

          <Link
            href="/settings"
            className={`group flex w-full items-center rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
              isItemActive("/settings")
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                isItemActive("/settings")
                  ? "bg-white/15 text-white"
                  : "text-slate-500 group-hover:text-blue-600"
              }`}
            >
              <Settings
                size={17}
                strokeWidth={isItemActive("/settings") ? 2.3 : 2}
              />
            </div>

            <span className="ml-2.5 flex-1">Settings</span>

            {isItemActive("/settings") && (
              <ChevronRight size={14} className="text-white/70" />
            )}
          </Link>
        </nav>

        {/* ========================================================= */}
        {/* BOTTOM AREA */}
        {/* ========================================================= */}

        <div className="border-t border-slate-100 bg-white p-3">
          {/* Admin profile */}
          <div className="mb-3 flex items-center rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-sm">
              AD
            </div>

            <div className="ml-2.5 min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-800">
                Admin
              </p>
              <p className="truncate text-[9px] text-slate-400">
                Super Administrator
              </p>
            </div>

            <div
              className="h-2 w-2 rounded-full bg-emerald-500"
              title="Online"
            />
          </div>

          {/* Support */}
          <button
            type="button"
            onClick={() => setShowSupport(true)}
            className="group flex w-full items-center rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors group-hover:text-blue-600">
              <HelpCircle size={17} />
            </div>

            <span className="ml-2.5 flex-1 text-left">Support</span>

            <MessageCircle
              size={14}
              className="text-slate-300 transition-colors group-hover:text-blue-500"
            />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="group mt-1 flex w-full items-center rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-500 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors group-hover:text-red-600">
              <LogOut size={17} />
            </div>

            <span className="ml-2.5 flex-1 text-left">Logout</span>
          </button>

          {/* Version */}
          <div className="mt-3 flex items-center justify-between px-2">
            <span className="text-[9px] font-medium text-slate-400">
              CoachingOS Admin
            </span>

            <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8px] font-bold text-slate-400">
              v0.1.20
            </span>
          </div>
        </div>
      </aside>

      {/* =========================================================== */}
      {/* SUPPORT MODAL */}
      {/* =========================================================== */}

      {showSupport && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"
          onClick={() => setShowSupport(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <LifeBuoy size={21} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    CoachingOS Support
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400">
                    We're here to help
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSupport(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-800">
                  Help Center
                </p>
                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Get help with students, fees, attendance, exams,
                  notifications and other CoachingOS modules.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 p-3 text-left transition-colors hover:border-blue-200 hover:bg-blue-50"
                >
                  <MessageCircle
                    size={17}
                    className="text-blue-600"
                  />
                  <p className="mt-2 text-xs font-semibold text-slate-800">
                    Live Chat
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Talk to support
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-slate-200 p-3 text-left transition-colors hover:border-blue-200 hover:bg-blue-50"
                >
                  <HelpCircle size={17} className="text-blue-600" />
                  <p className="mt-2 text-xs font-semibold text-slate-800">
                    Documentation
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Browse guides
                  </p>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSupport(false)}
              className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =========================================================== */}
      {/* LOGOUT MODAL */}
      {/* =========================================================== */}

      {showLogout && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <LogOut size={21} />
            </div>

            <h2 className="mt-4 text-base font-bold text-slate-900">
              Logout
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Authentication is not connected yet. The real logout action
              will be connected when the authentication system is added.
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================== */}
      {/* SCROLLBAR STYLE */}
      {/* =========================================================== */}

      <style jsx global>{`
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 999px;
        }

        .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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

import {
  getCollection,
  subscribeToStore,
} from "../data/store";

type MenuItem = {
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  badge?: number;
};

type InquiryRecord = {
  id?: string;
  status?: string;
};

type NotificationRecord = {
  id?: string;
  read?: boolean;
};

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
      },
      {
        label: "Reports",
        icon: BarChart3,
        href: "/reports",
      },
    ],
  },
];

function getPendingInquiryCount() {
  const inquiries =
    getCollection<InquiryRecord>("inquiries");

  return inquiries.filter((inquiry) => {
    const status = String(inquiry.status ?? "").toLowerCase();

    return (
      status === "new" ||
      status === "pending" ||
      status === "follow-up" ||
      status === "followup"
    );
  }).length;
}

function getUnreadNotificationCount() {
  const notifications =
    getCollection<NotificationRecord>("notifications");

  return notifications.filter(
    (notification) => notification.read !== true,
  ).length;
}

export default function Slidebar() {
  const pathname = usePathname();

  const [showSupport, setShowSupport] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const [inquiryCount, setInquiryCount] = useState(0);
  const [notificationCount, setNotificationCount] =
    useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const refreshSidebarData = () => {
    setInquiryCount(getPendingInquiryCount());
    setNotificationCount(getUnreadNotificationCount());
  };

  useEffect(() => {
    refreshSidebarData();

    const unsubscribe = subscribeToStore(() => {
      refreshSidebarData();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        const target = event.target as HTMLElement | null;

        const isTyping =
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.isContentEditable;

        if (isTyping) return;

        event.preventDefault();
        setShowSearch(true);
      }

      if (event.key === "Escape") {
        setShowSearch(false);
        setShowSupport(false);
        setShowLogout(false);
        setShowAI(false);
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  }, []);

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const allMenuItems = useMemo<MenuItem[]>(() => {
    return menuGroups.flatMap((group) =>
      group.items.map((item) => {
        if (item.label === "Inquiries") {
          return {
            ...item,
            badge:
              inquiryCount > 0 ? inquiryCount : undefined,
          };
        }

        if (item.label === "Notifications") {
          return {
            ...item,
            badge:
              notificationCount > 0
                ? notificationCount
                : undefined,
          };
        }

        return item;
      }),
    );
  }, [inquiryCount, notificationCount]);

  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return allMenuItems;
    }

    return allMenuItems.filter((item) =>
      item.label.toLowerCase().includes(query),
    );
  }, [allMenuItems, searchQuery]);

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[272px] flex-col border-r border-slate-200/80 bg-white lg:flex">
        {/* BRAND */}

        <div className="border-b border-slate-100 px-5 py-5">
          <Link
            href="/"
            className="group flex items-center rounded-2xl transition-colors hover:bg-slate-50"
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 transition-all duration-200 group-hover:scale-105 group-hover:shadow-blue-500/30">
              <GraduationCap
                size={23}
                strokeWidth={2.2}
              />

              <div className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-white/10" />
            </div>

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

        {/* AI ASSISTANT */}

        <div className="px-4 pt-4">
          <button
            type="button"
            onClick={() => setShowAI(true)}
            className="group relative flex w-full items-center overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 px-3 py-3 text-left transition-all duration-200 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/10"
          >
            <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-blue-200/20 blur-xl" />

            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <Sparkles
                size={16}
                strokeWidth={2.2}
              />
            </div>

            <div className="relative ml-2.5 min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-slate-800">
                  AI Assistant
                </p>

                <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-blue-600">
                  AI
                </span>
              </div>

              <p className="mt-0.5 truncate text-[9px] text-slate-400">
                Ask anything about your institute
              </p>
            </div>

            <ChevronRight
              size={14}
              className="relative text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-blue-500"
            />
          </button>
        </div>

        {/* SEARCH */}

        <div className="px-4 pt-3">
          <button
            type="button"
            onClick={() => setShowSearch(true)}
            className="group flex w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm"
          >
            <Search
              size={15}
              className="text-slate-400 transition-colors group-hover:text-blue-500"
            />

            <span className="ml-2.5 flex-1 text-xs font-medium text-slate-400 group-hover:text-slate-500">
              Search menu...
            </span>

            <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 shadow-sm">
              /
            </kbd>
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-5">
          {menuGroups.map((group) => (
            <div
              key={group.title}
              className="mb-5 last:mb-0"
            >
              <div className="mb-2 px-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {group.title}
                </p>
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.href);

                  let badge: number | undefined;

                  if (item.label === "Inquiries") {
                    badge =
                      inquiryCount > 0
                        ? inquiryCount
                        : undefined;
                  }

                  if (
                    item.label === "Notifications"
                  ) {
                    badge =
                      notificationCount > 0
                        ? notificationCount
                        : undefined;
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-current={
                        active ? "page" : undefined
                      }
                      className={`group relative flex w-full items-center rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                        active
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {active && (
                        <span className="absolute -left-3 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-blue-600 shadow-sm shadow-blue-500/30" />
                      )}

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                          active
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                            : "text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm"
                        }`}
                      >
                        <Icon
                          size={17}
                          strokeWidth={
                            active ? 2.3 : 2
                          }
                        />
                      </div>

                      <span className="ml-2.5 flex-1 truncate">
                        {item.label}
                      </span>

                      {badge !== undefined && (
                        <span
                          className={`mr-0.5 min-w-[21px] rounded-full px-1.5 py-0.5 text-center text-[9px] font-bold ${
                            active
                              ? "bg-blue-600 text-white"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {badge > 99 ? "99+" : badge}
                        </span>
                      )}

                      {badge === undefined &&
                        active && (
                          <ChevronRight
                            size={14}
                            className="text-blue-400"
                          />
                        )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* SYSTEM */}

          <div className="mt-1">
            <div className="mb-2 px-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                System
              </p>
            </div>

            <Link
              href="/settings"
              aria-current={
                isItemActive("/settings")
                  ? "page"
                  : undefined
              }
              className={`group relative flex w-full items-center rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                isItemActive("/settings")
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {isItemActive("/settings") && (
                <span className="absolute -left-3 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-blue-600 shadow-sm shadow-blue-500/30" />
              )}

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
                  isItemActive("/settings")
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm"
                }`}
              >
                <Settings
                  size={17}
                  strokeWidth={
                    isItemActive("/settings")
                      ? 2.3
                      : 2
                  }
                />
              </div>

              <span className="ml-2.5 flex-1">
                Settings
              </span>

              {isItemActive("/settings") && (
                <ChevronRight
                  size={14}
                  className="text-blue-400"
                />
              )}
            </Link>
          </div>
        </nav>

        {/* BOTTOM AREA */}

        <div className="border-t border-slate-100 bg-white p-3.5">
          {/* ADMIN PROFILE */}

          <div className="mb-3 flex items-center rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100/70">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-sm">
              AD
            </div>

            <div className="ml-2.5 min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-800">
                Admin
              </p>

              <p className="truncate text-[9px] font-medium text-slate-400">
                Super Administrator
              </p>
            </div>

            <div
              className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40"
              title="Online"
            />
          </div>

          {/* SUPPORT */}

          <button
            type="button"
            onClick={() => setShowSupport(true)}
            className="group flex w-full items-center rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors group-hover:text-blue-600">
              <HelpCircle size={17} />
            </div>

            <span className="ml-2.5 flex-1 text-left">
              Support
            </span>

            <MessageCircle
              size={14}
              className="text-slate-300 transition-colors group-hover:text-blue-500"
            />
          </button>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="group mt-1 flex w-full items-center rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors group-hover:text-red-600">
              <LogOut size={17} />
            </div>

            <span className="ml-2.5 flex-1 text-left">
              Logout
            </span>
          </button>

          {/* VERSION */}

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 px-2 pt-3">
            <span className="text-[9px] font-medium text-slate-400">
              CoachingOS Admin
            </span>

            <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8px] font-bold text-slate-400">
              v0.1.30
            </span>
          </div>
        </div>
      </aside>

      {/* SEARCH MODAL */}

      {showSearch && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/30 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center border-b border-slate-100 px-4">
              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                autoFocus
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search menu..."
                className="h-14 flex-1 bg-transparent px-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto p-2">
              {filteredSearchItems.length > 0 ? (
                filteredSearchItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center rounded-xl px-3 py-3 transition-colors hover:bg-blue-50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                        <Icon size={17} />
                      </div>

                      <span className="ml-3 flex-1 text-sm font-semibold text-slate-700">
                        {item.label}
                      </span>

                      <ChevronRight
                        size={15}
                        className="text-slate-300"
                      />
                    </Link>
                  );
                })
              ) : (
                <div className="px-4 py-10 text-center">
                  <Search
                    size={24}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No menu found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another search term.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI MODAL */}

      {showAI && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"
          onClick={() => setShowAI(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    AI Assistant
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    CoachingOS intelligence
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAI(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                AI Assistant is coming next.
              </p>

              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                This area will eventually connect to
                institute data and help with students,
                fees, attendance, exams, reports and
                institute insights.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAI(false)}
              className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* SUPPORT MODAL */}

      {showSupport && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"
          onClick={() => setShowSupport(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
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
                    We&apos;re here to help
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
                  Get help with students, fees,
                  attendance, exams, notifications and
                  other CoachingOS modules.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowSupport(false);
                    setShowAI(true);
                  }}
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
                  onClick={() => {
                    setShowSupport(false);
                    setShowAI(true);
                  }}
                  className="rounded-xl border border-slate-200 p-3 text-left transition-colors hover:border-blue-200 hover:bg-blue-50"
                >
                  <HelpCircle
                    size={17}
                    className="text-blue-600"
                  />

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

      {/* LOGOUT MODAL */}

      {showLogout && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <LogOut size={21} />
            </div>

            <h2 className="mt-4 text-base font-bold text-slate-900">
              Logout
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Authentication is not connected yet. The
              real logout action will be connected when
              the authentication system is added.
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCROLLBAR */}

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

        .sidebar-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e2e8f0 transparent;
        }
      `}</style>
    </>
  );
}
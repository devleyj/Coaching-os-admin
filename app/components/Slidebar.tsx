"use client";
import { usePathname } from "next/navigation";

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
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Students", icon: Users, href: "/students" },
  { label: "Teachers", icon: GraduationCap, href: "/teachers" },
  { label: "Staff", icon: BriefcaseBusiness, href: "/staff" },
  { label: "Courses", icon: BookOpen, href: "/courses" },
  { label: "Batches", icon: Layers, href: "/batches" },
  { label: "Schedule", icon: CalendarDays, href: "/schedule" },
  { label: "Attendance", icon: ClipboardCheck, href: "/attendance" },
  { label: "Fees", icon: IndianRupee, href: "/fees" },
  { label: "Inquiries", icon: UserRoundSearch, href: "/inquiries" },
  { label: "Online Classes", icon: Video, href: "/online-classes" },
  { label: "Exams", icon: FileText, href: "/exams" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Slidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <GraduationCap size={23} />
        </div>

        <div className="ml-3">
          <h1 className="text-lg font-bold text-slate-900">
            Coaching OS
          </h1>

          <p className="text-xs text-slate-500">
            Institute Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <Icon size={18} />
                <span className="ml-3">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-100 p-3">

        {/* Version */}
        <div className="mb-3 rounded-xl bg-slate-50 px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Coaching OS
            </span>

            <span className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-slate-500 shadow-sm">
              v0.1.0
            </span>
          </div>
        </div>

        <button className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <HelpCircle size={18} />
          <span className="ml-3">Support</span>
        </button>

        <button className="mt-1 flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50">
          <LogOut size={18} />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
}
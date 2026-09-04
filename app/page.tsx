"use client"

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
} from "lucide-react";

import { useState } from "react";

const stats = [
  {
    title: "Total Students",
    value: "1,248",
    change: "+12.5%",
    description: "from last month",
    icon: Users,
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Teachers",
    value: "42",
    change: "+7.1%",
    description: "from last month",
    icon: GraduationCap,
    iconStyle: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Total Batches",
    value: "28",
    change: "+8.3%",
    description: "from last month",
    icon: Layers,
    iconStyle: "bg-green-50 text-green-600",
  },
  {
    title: "Total Revenue",
    value: "₹8.4L",
    change: "+15.2%",
    description: "from last month",
    icon: IndianRupee,
    iconStyle: "bg-orange-50 text-orange-600",
  },
];

export default function Home() {
  const [notificationsOpen, setNotificationOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur lg:px-8">
          <div className="hidden w-full max-w-md md:block">
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
              <Search size={19} className="text-slate-400" />

              <input
                type="text"
                placeholder="Search students, teachers, classes..."
                className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationsOpen)}
                className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
                aria-label="Open notifications"
              >
                <Bell size={20} />

                {unreadNotifications > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {unreadNotifications}
                  </span>
                )}

              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Notifications
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {unreadNotifications === 0
                          ? "You're all caught up"
                          : `You have ${unreadNotifications} unread notifications`}
                      </p>
                    </div>

                    <button
                      onClick={() => setUnreadNotifications(0)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Mark all read
                    </button>
                  </div>

                  {/* Notifications */}
                  <div className="divide-y divide-slate-100">
                    <div className="px-4 py-3 hover:bg-slate-50">
                      <p className="text-sm font-semibold text-slate-900">
                        New student registered
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Aarav Mehta joined JEE Advanced
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        10 minutes ago
                      </p>
                    </div>

                    <div className="px-4 py-3 hover:bg-slate-50">
                      <p className="text-sm font-semibold text-slate-900">
                        Fee payment received
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        ₹12,000 received from Riya Sharma
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        32 minutes ago
                      </p>
                    </div>

                    <div className="px-4 py-3 hover:bg-slate-50">
                      <p className="text-sm font-semibold text-slate-900">
                        Attendance completed
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Physics batch attendance marked
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        1 hour ago
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-100 p-3 text-center">
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                      View all notifications →
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                A
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">Admin</p>

                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        <section className="p-5 sm:p-6 lg:p-8">
          {/* Page heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Heres whats happening at your institute today.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}
                    >
                      <Icon size={21} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-xs">
                    <ArrowUpRight size={14} className="text-green-600" />

                    <span className="font-semibold text-green-600">
                      {stat.change}
                    </span>

                    <span className="text-slate-400">{stat.description}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <StudentGrowthChart />
            <RevenueChart />
          </div>

          {/* Attendance + Classes + Activity */}
          <div className="mt-6 grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
            {/* Operations */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <AttendanceOverview />
              <TodaysClasses />
            </div>

            {/* Activity */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <RecentActivity />
              <RecentPayments />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

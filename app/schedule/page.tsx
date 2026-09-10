"use client";

import { useState } from "react";
import Slidebar from "../components/Slidebar";

export default function SchedulePage() {
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Schedule</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage classes, timings, teachers and rooms.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddSchedule(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Add Schedule
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Today's Classes
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">8</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active Schedules
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">18</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Rooms Used Today
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">6</p>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Today's Schedule
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View today's classes and classroom assignments.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Time
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Batch
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Course
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Teacher
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Room
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    07:00 AM - 10:00 AM
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    JEE Advanced Morning
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    JEE Advanced
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    Rahul Mehta
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">Room 101</td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      Scheduled
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    05:00 PM - 08:00 PM
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    NEET Evening
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">NEET</td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    Priya Sharma
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">Room 202</td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Scheduled
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

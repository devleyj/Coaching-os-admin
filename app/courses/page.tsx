"use client";

import { useState } from "react";
import Slidebar from "../components/Slidebar";

export default function CoursesPage() {
  const [courses, setCourses] = useState([
    {
      id: "CRS-1001",
      name: "JEE Advanced",
      category: "Engineering",
      duration: "2 Years",
      fees: 45000,
      status: "Active",
    },
    {
      id: "CRS-1002",
      name: "NEET",
      category: "Medical",
      duration: "2 Years",
      fees: 52000,
      status: "Active",
    },
    {
      id: "CRS-1003",
      name: "Foundation",
      category: "Foundation",
      duration: "1 Year",
      fees: 10000,
      status: "Active",
    },
  ]);

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("");
  const [newCourseDuration, setNewCourseDuration] = useState("");
  const [newCourseFees, setNewCourseFees] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Courses</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your coaching institute courses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddCourse(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Add Course
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Course
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Fees
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {course.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{course.id}</p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {course.category}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {course.duration}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      ₹{course.fees.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showAddCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Add Course</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new course for your institute.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Course Name
              </label>

              <input
                type="text"
                placeholder="e.g. JEE Advanced"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Category
              </label>

              <input
                type="text"
                placeholder="e.g. Engineering"
                value={newCourseCategory}
                onChange={(e) => setNewCourseCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Duration
              </label>

              <input
                type="text"
                placeholder="e.g. 2 Years"
                value={newCourseDuration}
                onChange={(e) => setNewCourseDuration(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Course Fees
              </label>

              <input
                type="number"
                placeholder="e.g. 45000"
                min="0"
                value={newCourseFees}
                onChange={(e) => setNewCourseFees(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                defaultValue="Active"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

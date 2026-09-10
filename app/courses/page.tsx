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
  const [newCourseStatus, setNewCourseStatus] = useState("Active");
  const [courseSearch, setCourseSearch] = useState("");
  const [courseStatus, setCourseStatus] = useState("All");
  const [courseSort, setCourseSort] = useState("Name");
  const [courseSortOrder, setCourseSortOrder] = useState("asc");

  const [selectedCourse, setSelectedCourse] = useState<
    (typeof courses)[number] | null
  >(null);

  const [showEditCourse, setShowEditCourse] = useState(false);
  const [editCourseName, setEditCourseName] = useState("");
  const [editCourseCategory, setEditCourseCategory] = useState("");
  const [editCourseDuration, setEditCourseDuration] = useState("");
  const [editCourseFees, setEditCourseFees] = useState("");
  const [editCourseStatus, setEditCourseStatus] = useState("Active");

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

        <div className="mt-6 mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Courses</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {courses.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Active Courses</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {courses.filter((course) => course.status === "Active").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Inactive Courses
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {courses.filter((course) => course.status === "Inactive").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Course Fees
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              ₹
              {courses
                .reduce((total, course) => total + course.fees, 0)
                .toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            type="text"
            value={courseSearch}
            onChange={(e) => setCourseSearch(e.target.value)}
            placeholder="Search by course name, ID or category..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
          />

          <select
            value={courseStatus}
            onChange={(e) => setCourseStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={`${courseSort}-${courseSortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split("-");
              setCourseSort(sort);
              setCourseSortOrder(order);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="Name-asc">Name: A → Z</option>
            <option value="Name-desc">Name: Z → A</option>
            <option value="Fees-asc">Fees: Low → High</option>
            <option value="Fees-desc">Fees: High → Low</option>
            <option value="Duration-asc">Duration: A → Z</option>
            <option value="Duration-desc">Duration: Z → A</option>
            <option value="Status-asc">Status: A → Z</option>
            <option value="Status-desc">Status: Z → A</option>
          </select>
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
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {courses
                  .filter((course) => {
                    const search = courseSearch.toLowerCase();

                    const matchesSearch =
                      course.name.toLowerCase().includes(search) ||
                      course.id.toLowerCase().includes(search) ||
                      course.category.toLowerCase().includes(search);

                    const matchesStatus =
                      courseStatus === "All" || course.status === courseStatus;

                    return matchesSearch && matchesStatus;
                  })
                  .sort((a, b) => {
                    let comparison = 0;

                    if (courseSort === "Name") {
                      comparison = a.name.localeCompare(b.name);
                    } else if (courseSort === "Fees") {
                      comparison = a.fees - b.fees;
                    } else if (courseSort === "Duration") {
                      comparison = a.duration.localeCompare(b.duration);
                    } else if (courseSort === "Status") {
                      comparison = a.status.localeCompare(b.status);
                    }

                    return courseSortOrder === "asc" ? comparison : -comparison;
                  })
                  .map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {course.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {course.id}
                        </p>
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

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedCourse(course)}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCourse(course);
                              setEditCourseName(course.name);
                              setEditCourseCategory(course.category);
                              setEditCourseDuration(course.duration);
                              setEditCourseFees(String(course.fees));
                              setEditCourseStatus(course.status);
                              setShowEditCourse(true);
                            }}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const confirmed = window.confirm(
                                `Are you sure you want to delete ${course.name}?`,
                              );

                              if (!confirmed) return;

                              setCourses((currentCourses) =>
                                currentCourses.filter(
                                  (item) => item.id !== course.id,
                                ),
                              );
                            }}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Course Profile
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View course details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Course Name
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedCourse.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Course ID</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedCourse.id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Category</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedCourse.category}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Duration</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedCourse.duration}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Course Fees
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  ₹{selectedCourse.fees.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Status</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedCourse.status}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditCourse && selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Edit Course
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update course information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowEditCourse(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Course Name
                </label>
                <input
                  type="text"
                  value={editCourseName}
                  onChange={(e) => setEditCourseName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Category
                </label>
                <input
                  type="text"
                  value={editCourseCategory}
                  onChange={(e) => setEditCourseCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Duration
                </label>
                <input
                  type="text"
                  value={editCourseDuration}
                  onChange={(e) => setEditCourseDuration(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Course Fees
                </label>
                <input
                  type="number"
                  min="0"
                  value={editCourseFees}
                  onChange={(e) => setEditCourseFees(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  value={editCourseStatus}
                  onChange={(e) => setEditCourseStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditCourse(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!selectedCourse) return;

                  if (!editCourseName.trim()) {
                    alert("Course name is required.");
                    return;
                  }

                  if (!editCourseCategory.trim()) {
                    alert("Category is required.");
                    return;
                  }

                  if (!editCourseDuration.trim()) {
                    alert("Duration is required.");
                    return;
                  }

                  const fees = Number(editCourseFees);

                  if (fees <= 0 || Number.isNaN(fees)) {
                    alert("Course fees must be greater than 0.");
                    return;
                  }

                  setCourses((currentCourses) =>
                    currentCourses.map((course) =>
                      course.id === selectedCourse.id
                        ? {
                            ...course,
                            name: editCourseName.trim(),
                            category: editCourseCategory.trim(),
                            duration: editCourseDuration.trim(),
                            fees,
                            status: editCourseStatus,
                          }
                        : course,
                    ),
                  );

                  setSelectedCourse(null);
                  setShowEditCourse(false);
                }}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

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
                value={newCourseStatus}
                onChange={(e) => setNewCourseStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!newCourseName.trim()) {
                    alert("Course name is required.");
                    return;
                  }

                  if (!newCourseCategory.trim()) {
                    alert("Category is required.");
                    return;
                  }

                  if (!newCourseDuration.trim()) {
                    alert("Duration is required.");
                    return;
                  }

                  const fees = Number(newCourseFees);

                  if (fees <= 0 || Number.isNaN(fees)) {
                    alert("Course fees must be greater than 0.");
                    return;
                  }

                  const newCourse = {
                    id: `CRS-${1000 + courses.length + 1}`,
                    name: newCourseName.trim(),
                    category: newCourseCategory.trim(),
                    duration: newCourseDuration.trim(),
                    fees,
                    status: newCourseStatus,
                  };

                  setCourses((currentCourses) => [
                    ...currentCourses,
                    newCourse,
                  ]);

                  setNewCourseName("");
                  setNewCourseCategory("");
                  setNewCourseDuration("");
                  setNewCourseFees("");
                  setNewCourseStatus("Active");
                  setShowAddCourse(false);
                }}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

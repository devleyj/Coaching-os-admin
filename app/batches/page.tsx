"use client";

import { useState } from "react";
import Slidebar from "../components/Slidebar";

export default function BatchesPage() {
  const [batches, setBatches] = useState([
    {
      id: "BAT-1001",
      name: "JEE Advanced Morning",
      course: "JEE Advanced",
      teacher: "Rahul Mehta",
      startTime: "07:00 AM",
      endTime: "10:00 AM",
      days: "Mon, Wed, Fri",
      room: "Room 101",
      students: 42,
      status: "Active",
    },
    {
      id: "BAT-1002",
      name: "NEET Evening",
      course: "NEET",
      teacher: "Priya Sharma",
      startTime: "05:00 PM",
      endTime: "08:00 PM",
      days: "Tue, Thu, Sat",
      room: "Room 202",
      students: 36,
      status: "Active",
    },
    {
      id: "BAT-1003",
      name: "Foundation Weekend",
      course: "Foundation",
      teacher: "Amit Verma",
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      days: "Sat, Sun",
      room: "Room 103",
      students: 28,
      status: "Inactive",
    },
  ]);

  const [batchSearch, setBatchSearch] = useState("");
  const [batchStatus, setBatchStatus] = useState("All");
  const [batchSort, setBatchSort] = useState("Name");
  const [batchSortOrder, setBatchSortOrder] = useState("asc");
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [newBatchName, setNewBatchName] = useState("");
  const [newBatchCourse, setNewBatchCourse] = useState("");
  const [newBatchTeacher, setNewBatchTeacher] = useState("");
  const [newBatchStartTime, setNewBatchStartTime] = useState("");
  const [newBatchEndTime, setNewBatchEndTime] = useState("");
  const [newBatchDays, setNewBatchDays] = useState("");
  const [newBatchRoom, setNewBatchRoom] = useState("");
  const [newBatchStudents, setNewBatchStudents] = useState("");
  const [newBatchStatus, setNewBatchStatus] = useState("Active");

  const [selectedBatch, setSelectedBatch] = useState<
    (typeof batches)[number] | null
  >(null);

  const [showEditBatch, setShowEditBatch] = useState(false);
const [editBatchName, setEditBatchName] = useState("");
const [editBatchCourse, setEditBatchCourse] = useState("");
const [editBatchTeacher, setEditBatchTeacher] = useState("");
const [editBatchStartTime, setEditBatchStartTime] = useState("");
const [editBatchEndTime, setEditBatchEndTime] = useState("");
const [editBatchDays, setEditBatchDays] = useState("");
const [editBatchRoom, setEditBatchRoom] = useState("");
const [editBatchStudents, setEditBatchStudents] = useState("");
const [editBatchStatus, setEditBatchStatus] = useState("Active");

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Batches</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your coaching institute batches.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddBatch(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Add Batch
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Batches</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {batches.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Active Batches</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {batches.filter((batch) => batch.status === "Active").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Inactive Batches
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {batches.filter((batch) => batch.status === "Inactive").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Students</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {batches.reduce((total, batch) => total + batch.students, 0)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            type="text"
            value={batchSearch}
            onChange={(e) => setBatchSearch(e.target.value)}
            placeholder="Search by batch name, ID, course or teacher..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
          />

          <select
            value={batchStatus}
            onChange={(e) => setBatchStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={`${batchSort}-${batchSortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split("-");
              setBatchSort(sort);
              setBatchSortOrder(order);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="Name-asc">Name: A → Z</option>
            <option value="Name-desc">Name: Z → A</option>
            <option value="Students-asc">Students: Low → High</option>
            <option value="Students-desc">Students: High → Low</option>
            <option value="Course-asc">Course: A → Z</option>
            <option value="Course-desc">Course: Z → A</option>
            <option value="Teacher-asc">Teacher: A → Z</option>
            <option value="Teacher-desc">Teacher: Z → A</option>
            <option value="Status-asc">Status: A → Z</option>
            <option value="Status-desc">Status: Z → A</option>
          </select>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-bold text-slate-900">All Batches</h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage your institute batches and schedules.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Batch
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Teacher
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Days
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Students
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {batches
                  .filter((batch) => {
                    const search = batchSearch.toLowerCase();

                    const matchesSearch =
                      batch.name.toLowerCase().includes(search) ||
                      batch.id.toLowerCase().includes(search) ||
                      batch.course.toLowerCase().includes(search) ||
                      batch.teacher.toLowerCase().includes(search);

                    const matchesStatus =
                      batchStatus === "All" || batch.status === batchStatus;

                    return matchesSearch && matchesStatus;
                  })
                  .sort((a, b) => {
                    let comparison = 0;

                    if (batchSort === "Name") {
                      comparison = a.name.localeCompare(b.name);
                    } else if (batchSort === "Students") {
                      comparison = a.students - b.students;
                    } else if (batchSort === "Course") {
                      comparison = a.course.localeCompare(b.course);
                    } else if (batchSort === "Teacher") {
                      comparison = a.teacher.localeCompare(b.teacher);
                    } else if (batchSort === "Status") {
                      comparison = a.status.localeCompare(b.status);
                    }

                    return batchSortOrder === "asc" ? comparison : -comparison;
                  })
                  .map((batch) => (
                    <tr
                      key={batch.id}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {batch.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {batch.id}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {batch.course}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {batch.teacher}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {batch.startTime} - {batch.endTime}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {batch.days}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {batch.students}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            batch.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-orange-50 text-orange-700"
                          }`}
                        >
                          {batch.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedBatch(batch)}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                          View
                        </button>
                        <button
  type="button"
  onClick={() => {
    setEditBatchName(batch.name);
    setEditBatchCourse(batch.course);
    setEditBatchTeacher(batch.teacher);
    setEditBatchStartTime(batch.startTime);
    setEditBatchEndTime(batch.endTime);
    setEditBatchDays(batch.days);
    setEditBatchRoom(batch.room);
    setEditBatchStudents(String(batch.students));
    setEditBatchStatus(batch.status);
    setSelectedBatch(batch);
    setShowEditBatch(true);
  }}
  className="ml-4 text-sm font-semibold text-slate-600 hover:text-slate-900"
>
  Edit
</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showAddBatch && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Add Batch</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Create a new batch for your institute.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddBatch(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Batch Name
                </label>
                <input
                  type="text"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  placeholder="e.g. JEE Advanced Morning"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Course
                </label>
                <input
                  type="text"
                  value={newBatchCourse}
                  onChange={(e) => setNewBatchCourse(e.target.value)}
                  placeholder="e.g. JEE Advanced"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Teacher
                </label>
                <input
                  type="text"
                  value={newBatchTeacher}
                  onChange={(e) => setNewBatchTeacher(e.target.value)}
                  placeholder="e.g. Rahul Mehta"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Room
                </label>
                <input
                  type="text"
                  value={newBatchRoom}
                  onChange={(e) => setNewBatchRoom(e.target.value)}
                  placeholder="e.g. Room 101"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newBatchStartTime}
                  onChange={(e) => setNewBatchStartTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  End Time
                </label>
                <input
                  type="time"
                  value={newBatchEndTime}
                  onChange={(e) => setNewBatchEndTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Days
                </label>
                <input
                  type="text"
                  value={newBatchDays}
                  onChange={(e) => setNewBatchDays(e.target.value)}
                  placeholder="e.g. Mon, Wed, Fri"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Students
                </label>
                <input
                  type="number"
                  min="0"
                  value={newBatchStudents}
                  onChange={(e) => setNewBatchStudents(e.target.value)}
                  placeholder="e.g. 30"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  value={newBatchStatus}
                  onChange={(e) => setNewBatchStatus(e.target.value)}
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
                onClick={() => setShowAddBatch(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!newBatchName.trim()) {
                    alert("Batch name is required.");
                    return;
                  }

                  if (!newBatchCourse.trim()) {
                    alert("Course is required.");
                    return;
                  }

                  if (!newBatchTeacher.trim()) {
                    alert("Teacher is required.");
                    return;
                  }

                  if (!newBatchStartTime) {
                    alert("Start time is required.");
                    return;
                  }

                  if (!newBatchEndTime) {
                    alert("End time is required.");
                    return;
                  }

                  if (newBatchEndTime <= newBatchStartTime) {
                    alert("End time must be later than start time.");
                    return;
                  }

                  if (!newBatchDays.trim()) {
                    alert("Days are required.");
                    return;
                  }

                  if (!newBatchRoom.trim()) {
                    alert("Room is required.");
                    return;
                  }

                  const students = Number(newBatchStudents);

                  if (students < 0 || Number.isNaN(students)) {
                    alert("Students cannot be negative.");
                    return;
                  }

                  const formatTime = (time: string) => {
                    const [hours, minutes] = time.split(":");
                    const hour = Number(hours);
                    const suffix = hour >= 12 ? "PM" : "AM";
                    const formattedHour = hour % 12 || 12;

                    return `${String(formattedHour).padStart(2, "0")}:${minutes} ${suffix}`;
                  };

                  const newBatch = {
                    id: `BAT-${1000 + batches.length + 1}`,
                    name: newBatchName.trim(),
                    course: newBatchCourse.trim(),
                    teacher: newBatchTeacher.trim(),
                    startTime: formatTime(newBatchStartTime),
                    endTime: formatTime(newBatchEndTime),
                    days: newBatchDays.trim(),
                    room: newBatchRoom.trim(),
                    students,
                    status: newBatchStatus,
                  };

                  setBatches((currentBatches) => [...currentBatches, newBatch]);

                  setNewBatchName("");
                  setNewBatchCourse("");
                  setNewBatchTeacher("");
                  setNewBatchStartTime("");
                  setNewBatchEndTime("");
                  setNewBatchDays("");
                  setNewBatchRoom("");
                  setNewBatchStudents("");
                  setNewBatchStatus("Active");
                  setShowAddBatch(false);
                }}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedBatch && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Batch Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View complete batch information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBatch(null)}
                className="text-2xl leading-none text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Batch Name</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedBatch.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Batch ID</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedBatch.id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Course</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedBatch.course}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Teacher</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedBatch.teacher}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Time</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedBatch.startTime} - {selectedBatch.endTime}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Days</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedBatch.days}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Room</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedBatch.room}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Students</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedBatch.students}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs font-medium text-slate-500">Status</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedBatch.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {selectedBatch.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedBatch(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

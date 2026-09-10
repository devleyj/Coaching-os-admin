"use client";

import { useState } from "react";
import Slidebar from "../components/Slidebar";

export default function SchedulePage() {
  const [showAddSchedule, setShowAddSchedule] = useState(false);

  const [schedules, setSchedules] = useState([
    {
      id: "SCH-1001",
      batch: "JEE Advanced Morning",
      course: "JEE Advanced",
      teacher: "Rahul Mehta",
      date: "2026-09-07",
      startTime: "07:00 AM",
      endTime: "10:00 AM",
      room: "Room 101",
      status: "Scheduled",
    },
    {
      id: "SCH-1002",
      batch: "NEET Evening",
      course: "NEET",
      teacher: "Priya Sharma",
      date: "2026-09-07",
      startTime: "05:00 PM",
      endTime: "08:00 PM",
      room: "Room 202",
      status: "Scheduled",
    },
  ]);

  const [selectedSchedule, setSelectedSchedule] = useState<
    (typeof schedules)[number] | null
  >(null);

  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [editScheduleBatch, setEditScheduleBatch] = useState("");
  const [editScheduleCourse, setEditScheduleCourse] = useState("");
  const [editScheduleTeacher, setEditScheduleTeacher] = useState("");
  const [editScheduleDate, setEditScheduleDate] = useState("");
  const [editScheduleStartTime, setEditScheduleStartTime] = useState("");
  const [editScheduleEndTime, setEditScheduleEndTime] = useState("");
  const [editScheduleRoom, setEditScheduleRoom] = useState("");
  const [editScheduleStatus, setEditScheduleStatus] = useState("Scheduled");

  const [newScheduleBatch, setNewScheduleBatch] = useState("");
  const [newScheduleCourse, setNewScheduleCourse] = useState("");
  const [newScheduleTeacher, setNewScheduleTeacher] = useState("");
  const [newScheduleDate, setNewScheduleDate] = useState("");
  const [newScheduleStartTime, setNewScheduleStartTime] = useState("");
  const [newScheduleEndTime, setNewScheduleEndTime] = useState("");
  const [newScheduleRoom, setNewScheduleRoom] = useState("");
  const [newScheduleStatus, setNewScheduleStatus] = useState("Scheduled");

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = Number(hours);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${String(formattedHour).padStart(2, "0")}:${minutes} ${suffix}`;
  };

  const convertTimeToInput = (time: string) => {
    const [timePart, period] = time.split(" ");
    const [hours, minutes] = timePart.split(":");
    let hour = Number(hours);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${String(hour).padStart(2, "0")}:${minutes}`;
  };

  const handleSaveSchedule = () => {
    if (!newScheduleBatch.trim()) {
      alert("Batch is required.");
      return;
    }
    if (!newScheduleCourse.trim()) {
      alert("Course is required.");
      return;
    }
    if (!newScheduleTeacher.trim()) {
      alert("Teacher is required.");
      return;
    }
    if (!newScheduleDate) {
      alert("Date is required.");
      return;
    }
    if (!newScheduleStartTime) {
      alert("Start time is required.");
      return;
    }
    if (!newScheduleEndTime) {
      alert("End time is required.");
      return;
    }
    if (newScheduleEndTime <= newScheduleStartTime) {
      alert("End time must be later than start time.");
      return;
    }
    if (!newScheduleRoom.trim()) {
      alert("Room is required.");
      return;
    }

    const newSchedule = {
      id: `SCH-${1000 + schedules.length + 1}`,
      batch: newScheduleBatch.trim(),
      course: newScheduleCourse.trim(),
      teacher: newScheduleTeacher.trim(),
      date: newScheduleDate,
      startTime: formatTime(newScheduleStartTime),
      endTime: formatTime(newScheduleEndTime),
      room: newScheduleRoom.trim(),
      status: newScheduleStatus,
    };

    setSchedules((currentSchedules) => [...currentSchedules, newSchedule]);
    setNewScheduleBatch("");
    setNewScheduleCourse("");
    setNewScheduleTeacher("");
    setNewScheduleDate("");
    setNewScheduleStartTime("");
    setNewScheduleEndTime("");
    setNewScheduleRoom("");
    setNewScheduleStatus("Scheduled");
    setShowAddSchedule(false);
  };

  const handleEditSchedule = () => {
    if (!selectedSchedule) return;

    if (!editScheduleBatch.trim()) {
      alert("Batch is required.");
      return;
    }
    if (!editScheduleCourse.trim()) {
      alert("Course is required.");
      return;
    }
    if (!editScheduleTeacher.trim()) {
      alert("Teacher is required.");
      return;
    }
    if (!editScheduleDate) {
      alert("Date is required.");
      return;
    }
    if (!editScheduleStartTime) {
      alert("Start time is required.");
      return;
    }
    if (!editScheduleEndTime) {
      alert("End time is required.");
      return;
    }
    if (editScheduleEndTime <= editScheduleStartTime) {
      alert("End time must be later than start time.");
      return;
    }
    if (!editScheduleRoom.trim()) {
      alert("Room is required.");
      return;
    }

    setSchedules((currentSchedules) =>
      currentSchedules.map((schedule) =>
        schedule.id === selectedSchedule.id
          ? {
              ...schedule,
              batch: editScheduleBatch.trim(),
              course: editScheduleCourse.trim(),
              teacher: editScheduleTeacher.trim(),
              date: editScheduleDate,
              startTime: formatTime(editScheduleStartTime),
              endTime: formatTime(editScheduleEndTime),
              room: editScheduleRoom.trim(),
              status: editScheduleStatus,
            }
          : schedule,
      ),
    );

    setSelectedSchedule(null);
    setShowEditSchedule(false);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?",
    );

    if (!confirmed) return;

    setSchedules((currentSchedules) =>
      currentSchedules.filter((schedule) => schedule.id !== scheduleId),
    );

    if (selectedSchedule?.id === scheduleId) {
      setSelectedSchedule(null);
      setShowEditSchedule(false);
    }
  };

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
                {schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className="border-b border-slate-100 hover:bg-blue-50/40"
                  >
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                      {schedule.startTime} - {schedule.endTime}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {schedule.batch}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {schedule.course}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {schedule.teacher}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {schedule.room}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          schedule.status === "Scheduled"
                            ? "bg-blue-100 text-blue-700"
                            : schedule.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          setEditScheduleBatch(schedule.batch);
                          setEditScheduleCourse(schedule.course);
                          setEditScheduleTeacher(schedule.teacher);
                          setEditScheduleDate(schedule.date);
                          setEditScheduleRoom(schedule.room);
                          setEditScheduleStatus(schedule.status);

                          const convertTimeToInput = (time: string) => {
                            const [timePart, period] = time.split(" ");
                            const [hours, minutes] = timePart.split(":");

                            let hour = Number(hours);

                            if (period === "PM" && hour !== 12) {
                              hour += 12;
                            }

                            if (period === "AM" && hour === 12) {
                              hour = 0;
                            }

                            return `${String(hour).padStart(2, "0")}:${minutes}`;
                          };

                          setEditScheduleStartTime(
                            convertTimeToInput(schedule.startTime),
                          );

                          setEditScheduleEndTime(
                            convertTimeToInput(schedule.endTime),
                          );

                          setSelectedSchedule(schedule);
                          setShowEditSchedule(true);
                        }}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedSchedule(schedule)}
                        className="ml-4 text-sm font-semibold text-slate-600 hover:text-slate-900"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="ml-4 text-sm font-semibold text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Schedule Modal */}
      {showAddSchedule && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add New Schedule
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new class schedule.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddSchedule(false)}
                className="text-2xl leading-none text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Batch */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Batch
                </label>

                <input
                  type="text"
                  value={newScheduleBatch}
                  onChange={(e) => setNewScheduleBatch(e.target.value)}
                  placeholder="Enter batch name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Course */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course
                </label>

                <input
                  type="text"
                  value={newScheduleCourse}
                  onChange={(e) => setNewScheduleCourse(e.target.value)}
                  placeholder="Enter course name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Teacher */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Teacher
                </label>

                <input
                  type="text"
                  value={newScheduleTeacher}
                  onChange={(e) => setNewScheduleTeacher(e.target.value)}
                  placeholder="Enter teacher name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date
                </label>

                <input
                  type="date"
                  value={newScheduleDate}
                  onChange={(e) => setNewScheduleDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Start Time
                </label>

                <input
                  type="time"
                  value={newScheduleStartTime}
                  onChange={(e) => setNewScheduleStartTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  End Time
                </label>

                <input
                  type="time"
                  value={newScheduleEndTime}
                  onChange={(e) => setNewScheduleEndTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {/* Room */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Room
                </label>

                <input
                  type="text"
                  value={newScheduleRoom}
                  onChange={(e) => setNewScheduleRoom(e.target.value)}
                  placeholder="Enter room"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  value={newScheduleStatus}
                  onChange={(e) => setNewScheduleStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddSchedule(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveSchedule}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Details Modal */}
      {selectedSchedule && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Schedule Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View complete schedule information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSchedule(null)}
                className="text-2xl leading-none text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* Details */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Schedule ID
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Status</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.status}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Batch</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.batch}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Course</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.course}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Teacher</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.teacher}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Date</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.date}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Start Time</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.startTime}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">End Time</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.endTime}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs font-medium text-slate-500">Room</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedSchedule.room}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSchedule(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Schedule Modal */}
      {showEditSchedule && selectedSchedule && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Edit Schedule
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update schedule information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowEditSchedule(false);
                  setSelectedSchedule(null);
                }}
                className="text-2xl leading-none text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Batch */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Batch
                </label>

                <input
                  type="text"
                  value={editScheduleBatch}
                  onChange={(e) => setEditScheduleBatch(e.target.value)}
                  placeholder="Enter batch name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Course */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course
                </label>

                <input
                  type="text"
                  value={editScheduleCourse}
                  onChange={(e) => setEditScheduleCourse(e.target.value)}
                  placeholder="Enter course name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Teacher */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Teacher
                </label>

                <input
                  type="text"
                  value={editScheduleTeacher}
                  onChange={(e) => setEditScheduleTeacher(e.target.value)}
                  placeholder="Enter teacher name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date
                </label>

                <input
                  type="date"
                  value={editScheduleDate}
                  onChange={(e) => setEditScheduleDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Start Time
                </label>

                <input
                  type="time"
                  value={editScheduleStartTime}
                  onChange={(e) => setEditScheduleStartTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  End Time
                </label>

                <input
                  type="time"
                  value={editScheduleEndTime}
                  onChange={(e) => setEditScheduleEndTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {/* Room */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Room
                </label>

                <input
                  type="text"
                  value={editScheduleRoom}
                  onChange={(e) => setEditScheduleRoom(e.target.value)}
                  placeholder="Enter room"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  value={editScheduleStatus}
                  onChange={(e) => setEditScheduleStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditSchedule(false);
                  setSelectedSchedule(null);
                }}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleEditSchedule}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

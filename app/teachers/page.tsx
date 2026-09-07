"use client";

import { useState } from "react";
import Slidebar from "../components/Slidebar";

export default function TeachersPage() {
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherStatus, setTeacherStatus] = useState("All");
  const [selectedTeacher, setSelectedTeacher] = useState<
    (typeof teachers)[number] | null
  >(null);
  const [showEditTeacher, setShowEditTeacher] = useState(false);
  const [editTeacherName, setEditTeacherName] = useState("");
  const [editTeacherSubject, setEditTeacherSubject] = useState("");
  const [editTeacherPhone, setEditTeacherPhone] = useState("");
  const [editTeacherEmail, setEditTeacherEmail] = useState("");
  const [editTeacherStatus, setEditTeacherStatus] = useState("Active");
  const [editTeacherExperience, setEditTeacherExperience] = useState("");

  const [teachers, setTeachers] = useState([
    {
      id: "TCH-1001",
      name: "Rahul Mehta",
      subject: "Physics",
      phone: "+91 98765 43210",
      email: "rahul@example.com",
      experience: "5 years",
      status: "Active",
    },
    {
      id: "TCH-1002",
      name: "Priya Sharma",
      subject: "Chemistry",
      phone: "+91 98765 12345",
      email: "priya@example.com",
      experience: "5 years",
      status: "Active",
    },
    {
      id: "TCH-1003",
      name: "Amit Verma",
      subject: "Mathematics",
      phone: "+91 98123 45678",
      email: "amit@example.com",
      experience: "5 years",
      status: "Inactive",
    },
  ]);

  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherSubject, setNewTeacherSubject] = useState("");
  const [newTeacherPhone, setNewTeacherPhone] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherExperience, setNewTeacherExperience] = useState("");
  const [newTeacherStatus, setNewTeacherStatus] = useState("Active");

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        <div>
          <p className="text-sm font-medium text-blue-600">Management</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">Teachers</h1>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total Teachers
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {teachers.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Active Teachers
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {
                  teachers.filter((teacher) => teacher.status === "Active")
                    .length
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Inactive Teachers
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {
                  teachers.filter((teacher) => teacher.status === "Inactive")
                    .length
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Subjects</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {new Set(teachers.map((teacher) => teacher.subject)).size}
              </p>
            </div>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Manage teachers, subjects, courses, and teaching assignments.
          </p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex w-full max-w-2xl gap-3">
              <input
                type="text"
                value={teacherSearch}
                onChange={(e) => setTeacherSearch(e.target.value)}
                placeholder="Search teachers by name, ID, or subject..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
              />

              <select
                value={teacherStatus}
                onChange={(e) => setTeacherStatus(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setShowAddTeacher(true)}
              className="whitespace-nowrap rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              + Add Teacher
            </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-900">
                All Teachers
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage your teaching staff.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Teacher
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {teachers
                    .filter((teacher) => {
                      const search = teacherSearch.toLowerCase();

                      const matchesSearch =
                        teacher.name.toLowerCase().includes(search) ||
                        teacher.id.toLowerCase().includes(search) ||
                        teacher.subject.toLowerCase().includes(search);

                      const matchesStatus =
                        teacherStatus === "All" ||
                        teacher.status === teacherStatus;

                      return matchesSearch && matchesStatus;
                    })
                    .map((teacher) => (
                      <tr
                        key={teacher.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">
                            {teacher.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {teacher.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {teacher.email}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-700">
                          {teacher.subject}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-700">
                          {teacher.phone}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              teacher.status === "Active"
                                ? "bg-green-50 text-green-600"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {teacher.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedTeacher(teacher)}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const confirmed = window.confirm(
                                `Are you sure you want to delete ${teacher.name}?`,
                              );

                              if (!confirmed) return;

                              setTeachers((currentTeachers) =>
                                currentTeachers.filter(
                                  (item) => item.id !== teacher.id,
                                ),
                              );
                            }}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
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
        </div>
      </main>

      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Teacher Profile
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {selectedTeacher.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedTeacher.id}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditTeacherName(selectedTeacher.name);
                    setEditTeacherSubject(selectedTeacher.subject);
                    setEditTeacherPhone(selectedTeacher.phone);
                    setEditTeacherEmail(selectedTeacher.email);
                    setEditTeacherExperience(selectedTeacher.experience || "");
                    setEditTeacherStatus(selectedTeacher.status);
                    setShowEditTeacher(true);
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Edit Teacher
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Subject</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedTeacher.subject}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Phone</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedTeacher.phone}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Email</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedTeacher.email}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Experience
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedTeacher.experience || "Not specified"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Status</p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedTeacher.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {selectedTeacher.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditTeacher && selectedTeacher && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Edit Teacher
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedTeacher.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowEditTeacher(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Teacher Name
                </label>

                <input
                  type="text"
                  value={editTeacherName}
                  onChange={(e) => setEditTeacherName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  value={editTeacherSubject}
                  onChange={(e) => setEditTeacherSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Experience
                </label>
                <input
                  type="text"
                  value={editTeacherExperience}
                  onChange={(e) => setEditTeacherExperience(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                  placeholder="e.g. 5 years"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <input
                  type="text"
                  value={editTeacherPhone}
                  onChange={(e) => setEditTeacherPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value={editTeacherEmail}
                  onChange={(e) => setEditTeacherEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={editTeacherStatus}
                  onChange={(e) => setEditTeacherStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditTeacher(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!selectedTeacher) return;

                  setTeachers((currentTeachers) =>
                    currentTeachers.map((teacher) =>
                      teacher.id === selectedTeacher.id
                        ? {
                            ...teacher,
                            name: editTeacherName,
                            subject: editTeacherSubject,
                            phone: editTeacherPhone,
                            email: editTeacherEmail,
                            experience: editTeacherExperience,
                            status: editTeacherStatus,
                          }
                        : teacher,
                    ),
                  );

                  setSelectedTeacher(null);
                  setShowEditTeacher(false);
                }}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddTeacher && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Add Teacher</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  New Teacher
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowAddTeacher(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Teacher Name
                </label>
                <input
                  type="text"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                  placeholder="Enter teacher name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  value={newTeacherSubject}
                  onChange={(e) => setNewTeacherSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Experience
                </label>
                <input
                  type="text"
                  value={newTeacherExperience}
                  onChange={(e) => setNewTeacherExperience(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                  placeholder="e.g. 5 years"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="text"
                  value={newTeacherPhone}
                  onChange={(e) => setNewTeacherPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newTeacherEmail}
                  onChange={(e) => setNewTeacherEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  value={newTeacherStatus}
                  onChange={(e) => setNewTeacherStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddTeacher(false)}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!newTeacherName.trim()) {
                    alert("Teacher name is required.");
                    return;
                  }

                  if (!newTeacherSubject.trim()) {
                    alert("Subject is required.");
                    return;
                  }

                  if (
                    newTeacherEmail.trim() &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newTeacherEmail.trim())
                  ) {
                    alert("Please enter a valid email address.");
                    return;
                  }

                  const newTeacher = {
                    id: `TCH-${1000 + teachers.length + 1}`,
                    name: newTeacherName.trim(),
                    subject: newTeacherSubject.trim(),
                    phone: newTeacherPhone.trim(),
                    email: newTeacherEmail.trim(),
                    experience: newTeacherExperience.trim(),
                    status: newTeacherStatus,
                  };

                  setTeachers((currentTeachers) => [
                    ...currentTeachers,
                    newTeacher,
                  ]);

                  setNewTeacherName("");
                  setNewTeacherSubject("");
                  setNewTeacherPhone("");
                  setNewTeacherEmail("");
                  setNewTeacherExperience("");
                  setNewTeacherStatus("Active");
                  setShowAddTeacher(false);
                }}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

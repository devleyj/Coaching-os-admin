"use client";
import { useEffect, useState } from "react";
import Slidebar from "../components/Slidebar";

const initialStudents = [
  {
    name: "Aarav Mehta",
    course: "JEE Preparation",
    id: "STU-1001",
    batch: "JEE Advanced",
    phone: "98XXXXXX21",
    fees: "₹45,000",
    status: "Active",
  },
  {
    name: "Riya Sharma",
    course: "NEET Preparation",
    id: "STU-1002",
    batch: "NEET 2027",
    phone: "97XXXXXX45",
    fees: "₹52,000",
    status: "Active",
  },
  {
    name: "Kabir Patel",
    course: "JEE Preparation",
    id: "STU-1003",
    batch: "JEE Main",
    phone: "96XXXXXX78",
    fees: "₹38,000",
    status: "Active",
  },
  {
    name: "Ananya Singh",
    course: "NEET Preparation",
    id: "STU-1004",
    batch: "NEET 2027",
    phone: "95XXXXXX12",
    fees: "₹10,000",
    status: "Pending",
  },
];

export default function StudentsPage() {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentCourse, setStudentCourse] = useState("");
  const [studentBatch, setStudentBatch] = useState("");
  const [studentFees, setStudentFees] = useState("");
  const [studentList, setStudentList] = useState(initialStudents);
  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredStudents = studentList.filter((student) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(search) ||
      student.id.toLowerCase().includes(search) ||
      student.phone.toLowerCase().includes(search);

    const matchesBatch = !batchFilter || student.batch === batchFilter;

    const matchesCourse = !courseFilter || student.course === courseFilter;

    const matchesStatus = !statusFilter || student.status === statusFilter;

    return matchesSearch && matchesBatch && matchesCourse && matchesStatus;
  });

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenActionMenu(null);
    };

    if (openActionMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openActionMenu]);

  const resetForm = () => {
    setStudentName("");
    setStudentPhone("");
    setStudentEmail("");
    setStudentCourse("");
    setStudentBatch("");
    setStudentFees("");
    setFormError("");
  };
  const clearFilters = () => {
    setSearchTerm("");
    setBatchFilter("");
    setCourseFilter("");
    setStatusFilter("");
  };

  const editStudent = (studentId: string) => {
    const student = studentList.find(
      (currentStudent) => currentStudent.id === studentId
    );

    if (!student) {
      return;
    }

    setEditingStudentId(student.id);
    setStudentName(student.name);
    setStudentPhone(student.phone);
    setStudentEmail(student.email ?? "");
    setStudentCourse(student.course);
    setStudentBatch(student.batch);
    setStudentFees(student.fees.replace("₹", ""));
    setFormError("");
    setOpenActionMenu(null);
    setShowAddStudent(true);
  };

  const deleteStudent = (studentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) {
      return;
    }

    setStudentList((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    );

    setOpenActionMenu(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Students</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage students across your coaching institute.
            </p>
          </div>

          <button
            onClick={() => setShowAddStudent(true)}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            + Add Student
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Students</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">1,248</p>

            <p className="mt-1 text-xs font-medium text-green-600">
              +12.5% this month
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active Students
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">1,184</p>

            <p className="mt-1 text-xs font-medium text-green-600">
              94.9% of total students
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">New This Month</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">64</p>

            <p className="mt-1 text-xs font-medium text-blue-600">
              New registrations
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Search & Filters
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Find students quickly using search and filters.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Search students
              </label>

              <input
                type="text"
                placeholder="Name, ID or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Batch
              </label>

              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>All Batches</option>
                <option>JEE Advanced</option>
                <option>JEE Main</option>
                <option>NEET 2027</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Course
              </label>

              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>All Courses</option>
                <option>JEE Preparation</option>
                <option>NEET Preparation</option>
                <option>Foundation</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
            </div>

            <div className="col-span-4 flex justify-end pt-3">
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                All Students
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your registered students.
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              {filteredStudents.length} Students
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student ID
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Course
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Batch
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Phone
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Fees
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 last:border-0 transition-colors hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                          {student.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {student.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {student.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.id}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.course}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.batch}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.phone}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {student.fees}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${student.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-orange-50 text-orange-600"
                          }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="relative flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setViewingStudentId(student.id)}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenActionMenu(
                              openActionMenu === student.id ? null : student.id,
                            );
                          }}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                          aria-label={`More actions for ${student.name}`}
                        >
                          ⋯
                        </button>

                        {openActionMenu === student.id && (
                          <div className="absolute right-0 top-11 z-20 w-32 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                            <button
                              type="button"
                              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() => editStudent(student.id)}
                              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteStudent(student.id)}
                              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {viewingStudentId &&
          (() => {
            const student = studentList.find(
              (currentStudent) => currentStudent.id === viewingStudentId
            );

            if (!student) {
              return null;
            }

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Student Profile
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-slate-900">
                        {student.name}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setViewingStudentId(null)}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Student ID
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {student.id}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Status
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {student.status}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Course
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {student.course}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Batch
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {student.batch}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Phone
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {student.phone}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Fees
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {student.fees}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewingStudentId(null)}
                    className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })()}

      </main>

      {showAddStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingStudentId ? "Edit Student" : "Add New Student"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the Student's basic information.
                </p>
              </div>

              <button
                onClick={() => {
                  resetForm();
                  setShowAddStudent(false);
                }}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-2 gap-4 p-6">
              {formError && (
                <div className="col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  ⚠ {formError}
                </div>
              )}

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                  Course
                </label>
                <select
                  value={studentCourse}
                  onChange={(e) => setStudentCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 text-slate-600 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option>Select Course</option>
                  <option>JEE Preparation</option>
                  <option>NEET Preparation</option>
                  <option>Foundation</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                  Batch
                </label>
                <select
                  value={studentBatch}
                  onChange={(e) => setStudentBatch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Batch</option>
                  <option value="JEE Advanced">JEE Advanced</option>
                  <option value="JEE Main">JEE Main</option>
                  <option value="NEET 2027">NEET 2027</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                  Total Fees
                </label>
                <input
                  type="number"
                  placeholder="₹ Enter total fees"
                  value={studentFees}
                  onChange={(e) => setStudentFees(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => {
                  resetForm();
                  setShowAddStudent(false);
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!studentName.trim()) {
                    setFormError("Please enter the student's full name.");
                    return;
                  }

                  if (!studentPhone.trim()) {
                    setFormError("Please enter the student's phone number.");
                    return;
                  }

                  if (!studentCourse) {
                    setFormError("Please select a course.");
                    return;
                  }

                  if (!studentBatch) {
                    setFormError("Please select a batch.");
                    return;
                  }

                  if (!studentFees.trim()) {
                    setFormError("Please enter the total fees.");
                    return;
                  }

                  if (editingStudentId) {
                    setStudentList((currentStudents) =>
                      currentStudents.map((student) =>
                        student.id === editingStudentId
                          ? {
                            ...student,
                            name: studentName,
                            phone: studentPhone,
                            email: studentEmail,
                            course: studentCourse,
                            batch: studentBatch,
                            fees: `₹${studentFees}`,
                          }
                          : student
                      )
                    );

                    resetForm();
                    setEditingStudentId(null);
                    setShowAddStudent(false);
                    return;
                  }

                  const newStudent = {
                    name: studentName,
                    course: studentCourse,
                    id: `STU-${1000 + studentList.length + 1}`,
                    batch: studentBatch,
                    phone: studentPhone,
                    email: studentEmail,
                    fees: `₹${studentFees}`,
                    status: "Active",
                  };

                  setStudentList((currentStudents) => [
                    ...currentStudents,
                    newStudent,
                  ]);

                  resetForm();
                  setShowAddStudent(false);
                }}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingStudentId ? "Update Student" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}

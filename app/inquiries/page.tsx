"use client";

import Slidebar from "../components/Slidebar";
import { Search, Plus, UserRoundSearch } from "lucide-react";
import { useEffect, useState } from "react";

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  source: string;
  inquiryDate: string;
  followUpDate: string;
  status: "New" | "Contacted" | "Follow-up" | "Converted" | "Lost";
  assignedTo: string;
  notes: string;
};

const initialInquiries: Inquiry[] = [
  {
    id: "INQ-1001",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
    course: "JEE Preparation",
    source: "Website",
    inquiryDate: "2026-09-01",
    followUpDate: "2026-09-04",
    status: "New",
    assignedTo: "Admin",
    notes: "Interested in JEE Advanced batch.",
  },
  {
    id: "INQ-1002",
    name: "Priya Verma",
    phone: "9826012345",
    email: "priya@example.com",
    course: "NEET Preparation",
    source: "WhatsApp",
    inquiryDate: "2026-08-30",
    followUpDate: "2026-09-03",
    status: "Follow-up",
    assignedTo: "Admin",
    notes: "Parent requested fee details.",
  },
  {
    id: "INQ-1003",
    name: "Arjun Patel",
    phone: "9755512345",
    email: "arjun@example.com",
    course: "JEE Preparation",
    source: "Walk-in",
    inquiryDate: "2026-08-28",
    followUpDate: "2026-09-05",
    status: "Contacted",
    assignedTo: "Admin",
    notes: "Student visited the institute.",
  },
  {
    id: "INQ-1004",
    name: "Sneha Singh",
    phone: "9893012345",
    email: "sneha@example.com",
    course: "NEET Preparation",
    source: "Instagram",
    inquiryDate: "2026-08-26",
    followUpDate: "2026-09-02",
    status: "Converted",
    assignedTo: "Admin",
    notes: "Successfully registered for NEET batch.",
  },
  {
    id: "INQ-1005",
    name: "Aditya Joshi",
    phone: "9810012345",
    email: "aditya@example.com",
    course: "Foundation Course",
    source: "Referral",
    inquiryDate: "2026-08-24",
    followUpDate: "2026-09-06",
    status: "Lost",
    assignedTo: "Admin",
    notes: "Joined another institute.",
  },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [inquiryPage, setInquiryPage] = useState(1);
  const rowsPerPage = 10;
  useEffect(() => {
  setInquiryPage(1);
}, [searchQuery, statusFilter]);
  

  const [showAddInquiry, setShowAddInquiry] = useState(false);
  const [formError, setFormError] = useState("");

  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCourse, setInquiryCourse] = useState("");
  const [inquirySource, setInquirySource] = useState("Website");
  const [inquiryFollowUpDate, setInquiryFollowUpDate] = useState("");
  const [inquiryAssignedTo, setInquiryAssignedTo] = useState("Admin");
  const [inquiryNotes, setInquiryNotes] = useState("");

  const filteredInquiries = inquiries.filter((inquiry) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      inquiry.name.toLowerCase().includes(query) ||
      inquiry.phone.includes(query) ||
      inquiry.course.toLowerCase().includes(query) ||
      inquiry.id.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const inquiryTotalPages = Math.max(
    1,
    Math.ceil(filteredInquiries.length / rowsPerPage),
  );

  const inquiryStartIndex = (inquiryPage - 1) * rowsPerPage;

  const paginatedInquiries = filteredInquiries.slice(
    inquiryStartIndex,
    inquiryStartIndex + rowsPerPage,
  );

  const handleAddInquiry = () => {
    if (!inquiryName.trim()) {
      setFormError("Full name is required.");
      return;
    }

    if (!inquiryPhone.trim()) {
      setFormError("Phone number is required.");
      return;
    }

    if (!inquiryCourse.trim()) {
      setFormError("Interested course is required.");
      return;
    }

    if (!inquiryFollowUpDate) {
      setFormError("Follow-up date is required.");
      return;
    }

    const nextNumber =
      initialInquiries.length > 0
        ? Math.max(
            ...inquiries.map((inquiry) =>
              Number(inquiry.id.replace("INQ-", "")),
            ),
          ) + 1
        : 1001;

    const newInquiry: Inquiry = {
      id: `INQ-${nextNumber}`,
      name: inquiryName.trim(),
      phone: inquiryPhone.trim(),
      email: inquiryEmail.trim(),
      course: inquiryCourse.trim(),
      source: inquirySource,
      inquiryDate: new Date().toISOString().split("T")[0],
      followUpDate: inquiryFollowUpDate,
      status: "New",
      assignedTo: inquiryAssignedTo,
      notes: inquiryNotes.trim(),
    };

    setInquiries((currentInquiries) => [newInquiry, ...currentInquiries]);

    setInquiryName("");
    setInquiryPhone("");
    setInquiryEmail("");
    setInquiryCourse("");
    setInquirySource("Website");
    setInquiryFollowUpDate("");
    setInquiryAssignedTo("Admin");
    setInquiryNotes("");
    setFormError("");
    setInquiryPage(1);
    setShowAddInquiry(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Inquiry Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage leads, follow-ups, and admission inquiries.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormError("");
              setShowAddInquiry(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Inquiry
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-4 gap-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Inquiries
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">156</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">New Inquiries</p>
            <p className="mt-2 text-2xl font-bold text-blue-600">32</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Follow-ups</p>
            <p className="mt-2 text-2xl font-bold text-amber-500">18</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Converted</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">74</p>
          </div>
        </div>

        {/* Inquiry List Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Inquiries
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Track and manage your admission leads.
              </p>
            </div>

            <div className="relative w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Inquiry Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Inquiry
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Phone
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Course
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Source
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Follow-up
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="border-b border-slate-100 transition hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {inquiry.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {inquiry.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {inquiry.phone}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {inquiry.course}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {inquiry.source}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {inquiry.followUpDate}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          inquiry.status === "New"
                            ? "bg-blue-50 text-blue-700"
                            : inquiry.status === "Contacted"
                              ? "bg-slate-100 text-slate-700"
                              : inquiry.status === "Follow-up"
                                ? "bg-amber-50 text-amber-700"
                                : inquiry.status === "Converted"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-red-50 text-red-700"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredInquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              {filteredInquiries.length === 0 ? 0 : inquiryStartIndex + 1} to{" "}
              {Math.min(
                inquiryStartIndex + rowsPerPage,
                filteredInquiries.length,
              )}{" "}
              of {filteredInquiries.length} inquiries
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInquiryPage((page) => Math.max(page - 1, 1))}
                disabled={inquiryPage === 1}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: inquiryTotalPages },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setInquiryPage(page)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    inquiryPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  setInquiryPage((page) =>
                    Math.min(page + 1, inquiryTotalPages),
                  )
                }
                disabled={inquiryPage === inquiryTotalPages}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Add Inquiry Modal */}
      {showAddInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add New Inquiry
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the lead's inquiry information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddInquiry(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              {formError && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(event) => setInquiryName(event.target.value)}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone *
                  </label>

                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(event) => setInquiryPhone(event.target.value)}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={(event) => setInquiryEmail(event.target.value)}
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interested Course *
                  </label>

                  <input
                    type="text"
                    value={inquiryCourse}
                    onChange={(event) => setInquiryCourse(event.target.value)}
                    placeholder="e.g. JEE Preparation"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                {/* Source */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Lead Source
                  </label>

                  <select
                    value={inquirySource}
                    onChange={(event) => setInquirySource(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Referral">Referral</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Follow-up Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Follow-up Date *
                  </label>

                  <input
                    type="date"
                    value={inquiryFollowUpDate}
                    onChange={(event) =>
                      setInquiryFollowUpDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Assigned Staff */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Assigned Staff
                  </label>

                  <select
                    value={inquiryAssignedTo}
                    onChange={(event) =>
                      setInquiryAssignedTo(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Counsellor">Counsellor</option>
                    <option value="Reception">Reception</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Notes
                  </label>

                  <textarea
                    value={inquiryNotes}
                    onChange={(event) => setInquiryNotes(event.target.value)}
                    placeholder="Add any additional information..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  setFormError("");
                  setShowAddInquiry(false);
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddInquiry}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Add Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

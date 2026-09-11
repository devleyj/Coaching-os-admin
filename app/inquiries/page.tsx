"use client";

import Slidebar from "../components/Slidebar";
import {
  Search,
  Plus,
  UserRoundSearch,
  Phone,
  MessageCircle,
} from "lucide-react";
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

type FollowUp = {
  id: string;
  inquiryId: string;
  date: string;
  notes: string;
  outcome: string;
  nextFollowUpDate: string;
  assignedTo: string;
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
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: "FU-1001",
      inquiryId: "INQ-1002",
      date: "2026-09-03",
      notes: "Discussed NEET batch timings and fee structure.",
      outcome: "Interested",
      nextFollowUpDate: "2026-09-06",
      assignedTo: "Admin",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [inquiryPage, setInquiryPage] = useState(1);
  const rowsPerPage = 10;
  useEffect(() => {
    setInquiryPage(1);
  }, [searchQuery, statusFilter]);

  const [showAddInquiry, setShowAddInquiry] = useState(false);
  const [formError, setFormError] = useState("");
  const [viewingInquiryId, setViewingInquiryId] = useState<string | null>(null);
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);
  const [changingStatusInquiryId, setChangingStatusInquiryId] = useState<
    string | null
  >(null);
  const [followUpInquiryId, setFollowUpInquiryId] = useState<string | null>(
    null,
  );
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [followUpOutcome, setFollowUpOutcome] = useState("Interested");
  const [followUpNextDate, setFollowUpNextDate] = useState("");
  const [followUpFormError, setFollowUpFormError] = useState("");

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

  const totalInquiries = inquiries.length;

  const newInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "New",
  ).length;

  const followUpInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "Follow-up",
  ).length;

  const convertedInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "Converted",
  ).length;

  const inquiryTotalPages = Math.max(
    1,
    Math.ceil(filteredInquiries.length / rowsPerPage),
  );

  const inquiryStartIndex = (inquiryPage - 1) * rowsPerPage;

  const paginatedInquiries = filteredInquiries.slice(
    inquiryStartIndex,
    inquiryStartIndex + rowsPerPage,
  );

  const getInquiryFollowUps = (inquiryId: string) => {
    return followUps.filter((followUp) => followUp.inquiryId === inquiryId);
  };

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

    if (editingInquiryId) {
      setInquiries((currentInquiries) =>
        currentInquiries.map((inquiry) =>
          inquiry.id === editingInquiryId
            ? {
                ...inquiry,
                name: inquiryName.trim(),
                phone: inquiryPhone.trim(),
                email: inquiryEmail.trim(),
                course: inquiryCourse.trim(),
                source: inquirySource,
                followUpDate: inquiryFollowUpDate,
                assignedTo: inquiryAssignedTo,
                notes: inquiryNotes.trim(),
              }
            : inquiry,
        ),
      );
    } else {
      const nextNumber =
        inquiries.length > 0
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
    }

    setInquiryName("");
    setInquiryPhone("");
    setInquiryEmail("");
    setInquiryCourse("");
    setInquirySource("Website");
    setInquiryFollowUpDate("");
    setInquiryAssignedTo("Admin");
    setInquiryNotes("");
    setFormError("");
    setEditingInquiryId(null);
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
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {totalInquiries}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">New Inquiries</p>
            <p className="mt-2 text-2xl font-bold text-blue-600">
              {newInquiries}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Follow-ups</p>
            <p className="mt-2 text-2xl font-bold text-amber-500">
              {followUpInquiries}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Converted</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {convertedInquiries}
            </p>
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
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
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
                      <select
                        value={inquiry.status}
                        onChange={(event) => {
                          setChangingStatusInquiryId(inquiry.id);

                          setInquiries((currentInquiries) =>
                            currentInquiries.map((item) =>
                              item.id === inquiry.id
                                ? {
                                    ...item,
                                    status: event.target
                                      .value as Inquiry["status"],
                                  }
                                : item,
                            ),
                          );

                          setTimeout(() => {
                            setChangingStatusInquiryId(null);
                          }, 300);
                        }}
                        className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
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
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                      </select>

                      {changingStatusInquiryId === inquiry.id && (
                        <span className="ml-2 text-xs font-medium text-emerald-600">
                          Saved
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setViewingInquiryId(inquiry.id)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingInquiryId(inquiry.id);
                          setViewingInquiryId(null);

                          setInquiryName(inquiry.name);
                          setInquiryPhone(inquiry.phone);
                          setInquiryEmail(inquiry.email);
                          setInquiryCourse(inquiry.course);
                          setInquirySource(inquiry.source);
                          setInquiryFollowUpDate(inquiry.followUpDate);
                          setInquiryAssignedTo(inquiry.assignedTo);
                          setInquiryNotes(inquiry.notes);
                          setFormError("");
                          setShowAddInquiry(true);
                        }}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          window.location.href = `tel:${inquiry.phone}`;
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                      >
                        <Phone size={16} />
                        Call
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const phoneNumber = inquiry.phone.replace(/\D/g, "");
                          window.open(
                            `https://wa.me/91${phoneNumber}`,
                            "_blank",
                          );
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50"
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFollowUpInquiryId(inquiry.id);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        Follow-up
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredInquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
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
      {/* View Inquiry Modal */}
      {viewingInquiryId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            {(() => {
              const inquiry = inquiries.find(
                (item) => item.id === viewingInquiryId,
              );

              if (!inquiry) return null;

              return (
                <>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Inquiry Details
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Complete information about this inquiry.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setViewingInquiryId(null)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="px-6 py-6">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                        {inquiry.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {inquiry.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {inquiry.id}
                        </p>
                      </div>

                      <span
                        className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Phone
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {inquiry.phone}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Email
                        </p>
                        <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                          {inquiry.email || "Not provided"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Interested Course
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {inquiry.course}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Lead Source
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {inquiry.source}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Inquiry Date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {inquiry.inquiryDate}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Follow-up Date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {inquiry.followUpDate}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Assigned Staff
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {inquiry.assignedTo}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Inquiry ID
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {inquiry.id}
                        </p>
                      </div>

                      <div className="col-span-2 rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Notes
                        </p>
                        <p className="mt-1 text-sm font-medium leading-6 text-slate-700">
                          {inquiry.notes || "No notes added."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end border-t border-slate-200 px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setViewingInquiryId(null)}
                      className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Close
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
      {/* Add Inquiry Modal */}
      {showAddInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingInquiryId ? "Edit Inquiry" : "Add New Inquiry"}
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
                {editingInquiryId ? "Save Changes" : "Add Inquiry"}
              </button>
            </div>
          </div>
        </div>
      )}

      {followUpInquiryId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            {(() => {
              const inquiry = inquiries.find(
                (item) => item.id === followUpInquiryId,
              );

              if (!inquiry) return null;

              const inquiryFollowUps = getInquiryFollowUps(inquiry.id);

              return (
                <>
                  <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Follow-up History
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {inquiry.name} · {inquiry.id}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowFollowUpForm(true);
                        }}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        + Add Follow-up
                      </button>

                      <button
                        type="button"
                        onClick={() => setFollowUpInquiryId(null)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto p-6">
                    {showFollowUpForm && (
                      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-slate-900">
                            Add Follow-up
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            Record the conversation and schedule the next
                            follow-up.
                          </p>
                        </div>

                        {followUpFormError && (
                          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                            {followUpFormError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                              Outcome
                            </label>

                            <select
                              value={followUpOutcome}
                              onChange={(event) =>
                                setFollowUpOutcome(event.target.value)
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                            >
                              <option value="Interested">Interested</option>
                              <option value="Not Interested">
                                Not Interested
                              </option>
                              <option value="Call Back">Call Back</option>
                              <option value="Requested Details">
                                Requested Details
                              </option>
                              <option value="Converted">Converted</option>
                              <option value="No Response">No Response</option>
                            </select>
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                              Next Follow-up Date
                            </label>

                            <input
                              type="date"
                              value={followUpNextDate}
                              onChange={(event) =>
                                setFollowUpNextDate(event.target.value)
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                              Notes
                            </label>

                            <textarea
                              value={followUpNotes}
                              onChange={(event) =>
                                setFollowUpNotes(event.target.value)
                              }
                              rows={4}
                              placeholder="What was discussed with the inquiry?"
                              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setShowFollowUpForm(false);
                              setFollowUpFormError("");
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (!followUpInquiryId) return;

                              if (!followUpNotes.trim()) {
                                setFollowUpFormError("Notes are required.");
                                return;
                              }

                              if (!followUpNextDate) {
                                setFollowUpFormError(
                                  "Next follow-up date is required.",
                                );
                                return;
                              }

                              const nextNumber =
                                followUps.length > 0
                                  ? Math.max(
                                      ...followUps.map((followUp) =>
                                        Number(followUp.id.replace("FU-", "")),
                                      ),
                                    ) + 1
                                  : 1001;

                              const newFollowUp: FollowUp = {
                                id: `FU-${nextNumber}`,
                                inquiryId: followUpInquiryId,
                                date: new Date().toISOString().split("T")[0],
                                notes: followUpNotes.trim(),
                                outcome: followUpOutcome,
                                nextFollowUpDate: followUpNextDate,
                                assignedTo: "Admin",
                              };

                              setFollowUps((currentFollowUps) => [
                                newFollowUp,
                                ...currentFollowUps,
                              ]);

                              setFollowUpNotes("");
                              setFollowUpOutcome("Interested");
                              setFollowUpNextDate("");
                              setFollowUpFormError("");
                              setShowFollowUpForm(false);
                            }}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Save Follow-up
                          </button>
                        </div>
                      </div>
                    )}

                    {inquiryFollowUps.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                        <p className="text-sm font-semibold text-slate-700">
                          No follow-ups recorded yet.
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Follow-up activity will appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {inquiryFollowUps.map((followUp) => (
                          <div
                            key={followUp.id}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <p className="text-sm font-bold text-slate-900">
                                {followUp.date}
                              </p>

                              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                {followUp.outcome}
                              </span>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              {followUp.notes}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                              <span>
                                Next follow-up:{" "}
                                <span className="font-semibold text-slate-700">
                                  {followUp.nextFollowUpDate}
                                </span>
                              </span>

                              <span>
                                Assigned to:{" "}
                                <span className="font-semibold text-slate-700">
                                  {followUp.assignedTo}
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end border-t border-slate-200 px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setFollowUpInquiryId(null)}
                      className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

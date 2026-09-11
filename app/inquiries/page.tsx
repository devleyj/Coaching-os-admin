"use client";

import Slidebar from "../components/Slidebar";
import {
  Search,
  Plus,
  UserRoundSearch,
  Phone,
  MessageCircle,
  CalendarDays,
  X,
  Eye,
  Pencil,
  RotateCcw,
  Filter,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type InquiryStatus =
  | "New"
  | "Contacted"
  | "Follow-up"
  | "Converted"
  | "Lost";

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  source: string;
  inquiryDate: string;
  followUpDate: string;
  lastFollowUpDate: string;
  status: InquiryStatus;
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
    lastFollowUpDate: "",
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
    lastFollowUpDate: "2026-09-03",
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
    lastFollowUpDate: "",
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
    lastFollowUpDate: "",
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
    lastFollowUpDate: "",
    status: "Lost",
    assignedTo: "Admin",
    notes: "Joined another institute.",
  },
];

const initialFollowUps: FollowUp[] = [
  {
    id: "FU-1001",
    inquiryId: "INQ-1002",
    date: "2026-09-03",
    notes: "Discussed NEET batch timings and fee structure.",
    outcome: "Interested",
    nextFollowUpDate: "2026-09-06",
    assignedTo: "Admin",
  },
];

const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getFollowUpStatus = (followUpDate: string) => {
  if (!followUpDate) {
    return "No Follow-up";
  }

  const today = getLocalDateString();

  if (followUpDate < today) {
    return "Overdue";
  }

  if (followUpDate === today) {
    return "Due Today";
  }

  return "Upcoming";
};

const getFollowUpStatusClasses = (status: string) => {
  if (status === "Overdue") {
    return "bg-red-50 text-red-700";
  }

  if (status === "Due Today") {
    return "bg-amber-50 text-amber-700";
  }

  if (status === "Upcoming") {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-slate-100 text-slate-500";
};

const getStatusClasses = (status: InquiryStatus) => {
  if (status === "New") return "bg-blue-50 text-blue-700";
  if (status === "Contacted") return "bg-slate-100 text-slate-700";
  if (status === "Follow-up") return "bg-amber-50 text-amber-700";
  if (status === "Converted") return "bg-emerald-50 text-emerald-700";
  return "bg-red-50 text-red-700";
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [followUpFilter, setFollowUpFilter] = useState("All");
  const [inquiryPage, setInquiryPage] = useState(1);
  const rowsPerPage = 10;

  const [showAddInquiry, setShowAddInquiry] = useState(false);
  const [formError, setFormError] = useState("");
  const [viewingInquiryId, setViewingInquiryId] = useState<string | null>(null);
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);
  const [changingStatusInquiryId, setChangingStatusInquiryId] =
    useState<string | null>(null);

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

  useEffect(() => {
    setInquiryPage(1);
  }, [searchQuery, statusFilter, followUpFilter]);

  const filteredInquiries = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return inquiries.filter((inquiry) => {
      const matchesSearch =
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.phone.includes(query) ||
        inquiry.course.toLowerCase().includes(query) ||
        inquiry.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || inquiry.status === statusFilter;

      const matchesFollowUp =
        followUpFilter === "All" ||
        getFollowUpStatus(inquiry.followUpDate) === followUpFilter;

      return matchesSearch && matchesStatus && matchesFollowUp;
    });
  }, [inquiries, searchQuery, statusFilter, followUpFilter]);

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

  const overdueFollowUps = inquiries.filter(
    (inquiry) => getFollowUpStatus(inquiry.followUpDate) === "Overdue",
  ).length;
  const dueTodayFollowUps = inquiries.filter(
    (inquiry) => getFollowUpStatus(inquiry.followUpDate) === "Due Today",
  ).length;
  const upcomingFollowUps = inquiries.filter(
    (inquiry) => getFollowUpStatus(inquiry.followUpDate) === "Upcoming",
  ).length;

  const inquiryTotalPages = Math.max(
    1,
    Math.ceil(filteredInquiries.length / rowsPerPage),
  );
  const safeInquiryPage = Math.min(inquiryPage, inquiryTotalPages);
  const inquiryStartIndex = (safeInquiryPage - 1) * rowsPerPage;

  const paginatedInquiries = filteredInquiries.slice(
    inquiryStartIndex,
    inquiryStartIndex + rowsPerPage,
  );

  const getInquiryFollowUps = (inquiryId: string) =>
    followUps.filter((followUp) => followUp.inquiryId === inquiryId);

  const resetInquiryForm = () => {
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
  };

  const openAddInquiry = () => {
    resetInquiryForm();
    setShowAddInquiry(true);
  };

  const openEditInquiry = (inquiry: Inquiry) => {
    setEditingInquiryId(inquiry.id);
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
        inquiryDate: getLocalDateString(),
        followUpDate: inquiryFollowUpDate,
        lastFollowUpDate: "",
        status: "New",
        assignedTo: inquiryAssignedTo,
        notes: inquiryNotes.trim(),
      };

      setInquiries((currentInquiries) => [newInquiry, ...currentInquiries]);
    }

    resetInquiryForm();
    setInquiryPage(1);
    setShowAddInquiry(false);
  };

  const handleSaveFollowUp = () => {
    if (!followUpInquiryId) return;

    if (!followUpNotes.trim()) {
      setFollowUpFormError("Notes are required.");
      return;
    }

    if (!followUpNextDate) {
      setFollowUpFormError("Next follow-up date is required.");
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

    const today = getLocalDateString();

    const newFollowUp: FollowUp = {
      id: `FU-${nextNumber}`,
      inquiryId: followUpInquiryId,
      date: today,
      notes: followUpNotes.trim(),
      outcome: followUpOutcome,
      nextFollowUpDate: followUpNextDate,
      assignedTo: "Admin",
    };

    setFollowUps((currentFollowUps) => [
      newFollowUp,
      ...currentFollowUps,
    ]);

    setInquiries((currentInquiries) =>
      currentInquiries.map((inquiry) =>
        inquiry.id === followUpInquiryId
          ? {
              ...inquiry,
              followUpDate: followUpNextDate,
              lastFollowUpDate: today,
              status:
                followUpOutcome === "Converted"
                  ? "Converted"
                  : followUpOutcome === "Not Interested"
                    ? "Lost"
                    : inquiry.status === "New"
                      ? "Follow-up"
                      : inquiry.status,
            }
          : inquiry,
      ),
    );

    setFollowUpNotes("");
    setFollowUpOutcome("Interested");
    setFollowUpNextDate("");
    setFollowUpFormError("");
    setShowFollowUpForm(false);
  };

  const openFollowUp = (inquiryId: string) => {
    setFollowUpInquiryId(inquiryId);
    setShowFollowUpForm(false);
    setFollowUpFormError("");
    setFollowUpNotes("");
    setFollowUpOutcome("Interested");
    setFollowUpNextDate("");
  };

  const closeFollowUp = () => {
    setFollowUpInquiryId(null);
    setShowFollowUpForm(false);
    setFollowUpFormError("");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setFollowUpFilter("All");
    setInquiryPage(1);
  };

  const handleFollowUpFilter = (filter: string) => {
    setFollowUpFilter(filter);
    setStatusFilter("All");
    setSearchQuery("");
    setInquiryPage(1);
  };

  const selectedInquiry = inquiries.find(
    (inquiry) => inquiry.id === viewingInquiryId,
  );

  const followUpInquiry = inquiries.find(
    (inquiry) => inquiry.id === followUpInquiryId,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <UserRoundSearch size={22} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Inquiries & CRM
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage leads, conversations and follow-ups.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={openAddInquiry}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Inquiry
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total Inquiries
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalInquiries}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                All captured leads
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">New</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {newInquiries}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Fresh inquiries
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                In Follow-up
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-600">
                {followUpInquiries}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Active conversations
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Converted</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {convertedInquiries}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Successfully registered
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays size={18} className="text-slate-500" />
              <h2 className="text-base font-bold text-slate-900">
                Follow-up Action Center
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={() => handleFollowUpFilter("Overdue")}
                className={`w-full rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  followUpFilter === "Overdue"
                    ? "border-red-300 ring-2 ring-red-100"
                    : "border-red-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Overdue Follow-ups
                    </p>
                    <p className="mt-2 text-2xl font-bold text-red-600">
                      {overdueFollowUps}
                    </p>
                  </div>
                  <AlertCircle className="text-red-500" size={22} />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Follow-ups that need attention
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleFollowUpFilter("Due Today")}
                className={`w-full rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  followUpFilter === "Due Today"
                    ? "border-amber-300 ring-2 ring-amber-100"
                    : "border-amber-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Due Today
                    </p>
                    <p className="mt-2 text-2xl font-bold text-amber-600">
                      {dueTodayFollowUps}
                    </p>
                  </div>
                  <Clock3 className="text-amber-500" size={22} />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Follow-ups scheduled for today
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleFollowUpFilter("Upcoming")}
                className={`w-full rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  followUpFilter === "Upcoming"
                    ? "border-blue-300 ring-2 ring-blue-100"
                    : "border-blue-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Upcoming Follow-ups
                    </p>
                    <p className="mt-2 text-2xl font-bold text-blue-600">
                      {upcomingFollowUps}
                    </p>
                  </div>
                  <ArrowRight className="text-blue-500" size={22} />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Future scheduled follow-ups
                </p>
              </button>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  All Inquiries
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Search and manage your admission leads.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Name, ID, phone or course..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-72"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>

                <select
                  value={followUpFilter}
                  onChange={(event) =>
                    setFollowUpFilter(event.target.value)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All Follow-ups</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Due Today">Due Today</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="No Follow-up">No Follow-up</option>
                </select>

                {(searchQuery ||
                  statusFilter !== "All" ||
                  followUpFilter !== "All") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <RotateCcw size={16} />
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Inquiry
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Phone
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Course
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Source
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Last Follow-up
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Next Follow-up
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedInquiries.map((inquiry) => {
                    const followUpStatus = getFollowUpStatus(
                      inquiry.followUpDate,
                    );

                    return (
                      <tr
                        key={inquiry.id}
                        className="border-b border-slate-100 transition hover:bg-blue-50/40"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                              {inquiry.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {inquiry.name}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-500">
                                {inquiry.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                          {inquiry.phone}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-700">
                            {inquiry.course}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                            {inquiry.source}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-600">
                          {inquiry.lastFollowUpDate || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-slate-700">
                              {inquiry.followUpDate || "—"}
                            </span>

                            {inquiry.followUpDate && (
                              <span
                                className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${getFollowUpStatusClasses(
                                  followUpStatus,
                                )}`}
                              >
                                {followUpStatus}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={inquiry.status}
                              onChange={(event) => {
                                const nextStatus =
                                  event.target.value as InquiryStatus;

                                setChangingStatusInquiryId(inquiry.id);

                                setInquiries((currentInquiries) =>
                                  currentInquiries.map((item) =>
                                    item.id === inquiry.id
                                      ? {
                                          ...item,
                                          status: nextStatus,
                                        }
                                      : item,
                                  ),
                                );

                                setTimeout(() => {
                                  setChangingStatusInquiryId(null);
                                }, 500);
                              }}
                              className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${getStatusClasses(
                                inquiry.status,
                              )}`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Follow-up">Follow-up</option>
                              <option value="Converted">Converted</option>
                              <option value="Lost">Lost</option>
                            </select>

                            {changingStatusInquiryId === inquiry.id && (
                              <span className="text-xs font-semibold text-emerald-600">
                                Saved
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setViewingInquiryId(inquiry.id)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                              <Eye size={15} />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditInquiry(inquiry)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                            >
                              <Pencil size={15} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                window.location.href = `tel:${inquiry.phone}`;
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50"
                            >
                              <Phone size={15} />
                              Call
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const phoneNumber =
                                  inquiry.phone.replace(/\D/g, "");

                                window.open(
                                  `https://wa.me/91${phoneNumber}`,
                                  "_blank",
                                );
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-green-600 transition hover:bg-green-50"
                            >
                              <MessageCircle size={15} />
                              WhatsApp
                            </button>

                            <button
                              type="button"
                              onClick={() => openFollowUp(inquiry.id)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                            >
                              <CalendarDays size={15} />
                              Follow-up
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {paginatedInquiries.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-16 text-center"
                      >
                        <Filter
                          size={32}
                          className="mx-auto text-slate-300"
                        />
                        <p className="mt-3 text-sm font-bold text-slate-700">
                          No inquiries found
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your search or filters.
                        </p>
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Clear Filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredInquiries.length === 0
                    ? 0
                    : inquiryStartIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-slate-700">
                  {Math.min(
                    inquiryStartIndex + rowsPerPage,
                    filteredInquiries.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {filteredInquiries.length}
                </span>{" "}
                inquiries
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeInquiryPage === 1}
                  onClick={() =>
                    setInquiryPage((currentPage) =>
                      Math.max(1, currentPage - 1),
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                      safeInquiryPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safeInquiryPage === inquiryTotalPages}
                  onClick={() =>
                    setInquiryPage((currentPage) =>
                      Math.min(inquiryTotalPages, currentPage + 1),
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showAddInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingInquiryId ? "Edit Inquiry" : "Add New Inquiry"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the inquiry's basic information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetInquiryForm();
                  setShowAddInquiry(false);
                }}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-6">
              {formError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(event) => setInquiryName(event.target.value)}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(event) => setInquiryPhone(event.target.value)}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={(event) => setInquiryEmail(event.target.value)}
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interested Course *
                  </label>
                  <input
                    type="text"
                    value={inquiryCourse}
                    onChange={(event) => setInquiryCourse(event.target.value)}
                    placeholder="e.g. JEE Preparation"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Source
                  </label>
                  <select
                    value={inquirySource}
                    onChange={(event) => setInquirySource(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Next Follow-up Date *
                  </label>
                  <input
                    type="date"
                    value={inquiryFollowUpDate}
                    onChange={(event) =>
                      setInquiryFollowUpDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={inquiryAssignedTo}
                    onChange={(event) =>
                      setInquiryAssignedTo(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Notes
                  </label>
                  <textarea
                    value={inquiryNotes}
                    onChange={(event) => setInquiryNotes(event.target.value)}
                    rows={4}
                    placeholder="Add notes about this inquiry..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  resetInquiryForm();
                  setShowAddInquiry(false);
                }}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddInquiry}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {editingInquiryId ? "Save Changes" : "Add Inquiry"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Inquiry Profile
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedInquiry.name} · {selectedInquiry.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewingInquiryId(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl font-bold text-blue-700">
                  {selectedInquiry.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedInquiry.name}
                  </h3>
                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      selectedInquiry.status,
                    )}`}
                  >
                    {selectedInquiry.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedInquiry.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                    {selectedInquiry.email || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Course
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedInquiry.course}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Source
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedInquiry.source}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Inquiry Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedInquiry.inquiryDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Next Follow-up
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedInquiry.followUpDate || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Last Follow-up
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedInquiry.lastFollowUpDate || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Assigned To
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedInquiry.assignedTo}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Notes
                </p>
                <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selectedInquiry.notes || "No notes added."}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  setViewingInquiryId(null);
                  openEditInquiry(selectedInquiry);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setViewingInquiryId(null)}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {followUpInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Follow-up History
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {followUpInquiry.name} · {followUpInquiry.id}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFollowUpForm(true);
                    setFollowUpFormError("");
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  + Add Follow-up
                </button>

                <button
                  type="button"
                  onClick={closeFollowUp}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-6">
              {showFollowUpForm && (
                <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-slate-900">
                      Add Follow-up
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Record the conversation and schedule the next follow-up.
                    </p>
                  </div>

                  {followUpFormError && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                      {followUpFormError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Outcome
                      </label>
                      <select
                        value={followUpOutcome}
                        onChange={(event) =>
                          setFollowUpOutcome(event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="Interested">Interested</option>
                        <option value="Not Interested">Not Interested</option>
                        <option value="Call Back">Call Back</option>
                        <option value="Requested Details">
                          Requested Details
                        </option>
                        <option value="Converted">Converted</option>
                        <option value="No Response">No Response</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Next Follow-up Date
                      </label>
                      <input
                        type="date"
                        value={followUpNextDate}
                        onChange={(event) =>
                          setFollowUpNextDate(event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Notes
                      </label>
                      <textarea
                        value={followUpNotes}
                        onChange={(event) =>
                          setFollowUpNotes(event.target.value)
                        }
                        rows={4}
                        placeholder="What was discussed with the inquiry?"
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveFollowUp}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      <CheckCircle2 size={16} />
                      Save Follow-up
                    </button>
                  </div>
                </div>
              )}

              {getInquiryFollowUps(followUpInquiry.id).length === 0 ? (
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
                  {getInquiryFollowUps(followUpInquiry.id).map((followUp) => (
                    <div
                      key={followUp.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {followUp.date}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {followUp.id}
                          </p>
                        </div>

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
                onClick={closeFollowUp}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
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

"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  BriefcaseBusiness,
  UserCheck,
  UserX,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  X,
  RotateCcw,
  Phone,
  Mail,
  CalendarDays,
  Building2,
  ShieldCheck,
} from "lucide-react";
import Slidebar from "../components/Slidebar";

type StaffStatus = "Active" | "On Leave" | "Inactive";
type EmploymentType = "Full-time" | "Part-time" | "Contract";

type StaffMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  joiningDate: string;
  employmentType: EmploymentType;
  status: StaffStatus;
  salary: number;
  emergencyContact: string;
  address: string;
  notes: string;
};

const initialStaff: StaffMember[] = [
  {
    id: "STF-1001",
    name: "Rahul Verma",
    role: "Center Manager",
    department: "Administration",
    phone: "9876543210",
    email: "rahul.verma@example.com",
    joiningDate: "2025-04-12",
    employmentType: "Full-time",
    status: "Active",
    salary: 45000,
    emergencyContact: "9876500011",
    address: "Vijay Nagar, Indore",
    notes: "Manages daily center operations and administration.",
  },
  {
    id: "STF-1002",
    name: "Priya Sharma",
    role: "Receptionist",
    department: "Front Office",
    phone: "9876543211",
    email: "priya.sharma@example.com",
    joiningDate: "2025-06-18",
    employmentType: "Full-time",
    status: "Active",
    salary: 22000,
    emergencyContact: "9876500012",
    address: "Palasia, Indore",
    notes: "Handles reception, visitor records and inquiries.",
  },
  {
    id: "STF-1003",
    name: "Amit Patel",
    role: "Accountant",
    department: "Finance",
    phone: "9876543212",
    email: "amit.patel@example.com",
    joiningDate: "2024-11-08",
    employmentType: "Full-time",
    status: "Active",
    salary: 32000,
    emergencyContact: "9876500013",
    address: "Rau, Indore",
    notes: "Responsible for fee reconciliation and financial records.",
  },
  {
    id: "STF-1004",
    name: "Neha Singh",
    role: "HR Executive",
    department: "Human Resources",
    phone: "9876543213",
    email: "neha.singh@example.com",
    joiningDate: "2025-01-20",
    employmentType: "Full-time",
    status: "On Leave",
    salary: 30000,
    emergencyContact: "9876500014",
    address: "Bhawarkua, Indore",
    notes: "Handles staff onboarding, documents and HR operations.",
  },
  {
    id: "STF-1005",
    name: "Vikas Jain",
    role: "IT Support",
    department: "Technology",
    phone: "9876543214",
    email: "vikas.jain@example.com",
    joiningDate: "2025-08-02",
    employmentType: "Contract",
    status: "Active",
    salary: 28000,
    emergencyContact: "9876500015",
    address: "Scheme No. 54, Indore",
    notes: "Supports systems, devices and classroom technology.",
  },
  {
    id: "STF-1006",
    name: "Sneha Gupta",
    role: "Counsellor",
    department: "Admissions",
    phone: "9876543215",
    email: "sneha.gupta@example.com",
    joiningDate: "2025-09-10",
    employmentType: "Full-time",
    status: "Active",
    salary: 27000,
    emergencyContact: "9876500016",
    address: "Sudama Nagar, Indore",
    notes: "Counsels prospective students and handles admissions.",
  },
];

const emptyForm = {
  name: "",
  role: "",
  department: "",
  phone: "",
  email: "",
  joiningDate: "",
  employmentType: "Full-time" as EmploymentType,
  status: "Active" as StaffStatus,
  salary: "",
  emergencyContact: "",
  address: "",
  notes: "",
};

const statusClasses: Record<StaffStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  "On Leave": "bg-amber-50 text-amber-700",
  Inactive: "bg-red-50 text-red-700",
};

const getInitial = (name: string) => name.trim().charAt(0).toUpperCase();

const formatDate = (value: string) => {
  if (!value) return "—";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export default function StaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);

  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [employmentFilter, setEmploymentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const [viewingStaff, setViewingStaff] = useState<StaffMember | null>(null);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const departments = useMemo(
    () => Array.from(new Set(staffList.map((staff) => staff.department))).sort(),
    [staffList]
  );

  const stats = useMemo(() => {
    const total = staffList.length;
    const active = staffList.filter((staff) => staff.status === "Active").length;
    const onLeave = staffList.filter((staff) => staff.status === "On Leave").length;
    const inactive = staffList.filter((staff) => staff.status === "Inactive").length;

    return { total, active, onLeave, inactive };
  }, [staffList]);

  const filteredStaff = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const result = staffList.filter((staff) => {
      const matchesSearch =
        !query ||
        staff.name.toLowerCase().includes(query) ||
        staff.id.toLowerCase().includes(query) ||
        staff.phone.includes(query) ||
        staff.email.toLowerCase().includes(query) ||
        staff.role.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "All" || staff.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" || staff.status === statusFilter;

      const matchesEmployment =
        employmentFilter === "All" ||
        staff.employmentType === employmentFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesEmployment
      );
    });

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "role") {
        comparison = a.role.localeCompare(b.role);
      } else if (sortBy === "department") {
        comparison = a.department.localeCompare(b.department);
      } else if (sortBy === "salary") {
        comparison = a.salary - b.salary;
      } else if (sortBy === "joiningDate") {
        comparison = a.joiningDate.localeCompare(b.joiningDate);
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    staffList,
    searchQuery,
    departmentFilter,
    statusFilter,
    employmentFilter,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStaff.length / rowsPerPage)
  );

  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;
  const paginatedStaff = filteredStaff.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setDepartmentFilter("All");
    setStatusFilter("All");
    setEmploymentFilter("All");
    setSortBy("name");
    setSortOrder("asc");
    setPage(1);
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setOpenActionMenu(null);
    setShowModal(true);
  };

  const openEditModal = (staff: StaffMember) => {
    setEditingId(staff.id);
    setForm({
      name: staff.name,
      role: staff.role,
      department: staff.department,
      phone: staff.phone,
      email: staff.email,
      joiningDate: staff.joiningDate,
      employmentType: staff.employmentType,
      status: staff.status,
      salary: String(staff.salary),
      emergencyContact: staff.emergencyContact,
      address: staff.address,
      notes: staff.notes,
    });
    setFormError("");
    setOpenActionMenu(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormError("");
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    const name = form.name.trim();
    const role = form.role.trim();
    const department = form.department.trim();
    const phone = form.phone.trim();
    const salary = Number(form.salary);

    if (!name || !role || !department || !phone || !form.joiningDate) {
      setFormError(
        "Please fill in Name, Role, Department, Phone and Joining Date."
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setFormError("Phone number must contain exactly 10 digits.");
      return;
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!Number.isFinite(salary) || salary < 0) {
      setFormError("Please enter a valid salary.");
      return;
    }

    if (editingId) {
      setStaffList((current) =>
        current.map((staff) =>
          staff.id === editingId
            ? {
                ...staff,
                name,
                role,
                department,
                phone,
                email: form.email.trim(),
                joiningDate: form.joiningDate,
                employmentType: form.employmentType,
                status: form.status,
                salary,
                emergencyContact: form.emergencyContact.trim(),
                address: form.address.trim(),
                notes: form.notes.trim(),
              }
            : staff
        )
      );
    } else {
      const nextNumber =
        Math.max(
          0,
          ...staffList.map((staff) => {
            const number = Number(staff.id.replace("STF-", ""));
            return Number.isFinite(number) ? number : 0;
          })
        ) + 1;

      const newStaff: StaffMember = {
        id: `STF-${String(nextNumber).padStart(4, "0")}`,
        name,
        role,
        department,
        phone,
        email: form.email.trim(),
        joiningDate: form.joiningDate,
        employmentType: form.employmentType,
        status: form.status,
        salary,
        emergencyContact: form.emergencyContact.trim(),
        address: form.address.trim(),
        notes: form.notes.trim(),
      };

      setStaffList((current) => [newStaff, ...current]);
      setPage(1);
    }

    closeModal();
  };

  const deleteStaff = (id: string) => {
    const staff = staffList.find((item) => item.id === id);
    if (!staff) return;

    const confirmed = window.confirm(
      `Delete ${staff.name} (${staff.id})? This demo action removes the staff member from the current page data.`
    );

    if (!confirmed) return;

    setStaffList((current) => current.filter((item) => item.id !== id));
    setOpenActionMenu(null);
    setViewingStaff(null);
  };

  const updateStatus = (id: string, status: StaffStatus) => {
    setStaffList((current) =>
      current.map((staff) =>
        staff.id === id ? { ...staff, status } : staff
      )
    );
    setOpenActionMenu(null);
  };

  const setField = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (formError) setFormError("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold text-blue-600">
                Administration
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Staff Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage non-teaching staff, roles, departments and employment
                details.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Staff
            </button>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Staff
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Users size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Active</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-600">
                    {stats.active}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <UserCheck size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">On Leave</p>
                  <p className="mt-2 text-2xl font-bold text-amber-600">
                    {stats.onLeave}
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <CalendarDays size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Inactive</p>
                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {stats.inactive}
                  </p>
                </div>
                <div className="rounded-xl bg-red-50 p-3 text-red-600">
                  <UserX size={21} />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Staff Directory
                </h2>
                <p className="text-sm text-slate-500">
                  Search, filter and organize your staff records.
                </p>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw size={15} />
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              <div className="relative xl:col-span-2">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Name, ID, phone, email or role..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) => {
                  setDepartmentFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Departments</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={employmentFilter}
                onChange={(e) => {
                  setEmploymentFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Employment Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Sort
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 outline-none"
              >
                <option value="name">Name</option>
                <option value="role">Role</option>
                <option value="department">Department</option>
                <option value="salary">Salary</option>
                <option value="joiningDate">Joining Date</option>
                <option value="status">Status</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 outline-none"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>

              <span className="ml-auto text-sm font-semibold text-slate-500">
                {filteredStaff.length} staff member
                {filteredStaff.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Staff</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Department</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Joining Date</th>
                    <th className="px-5 py-4">Salary</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {paginatedStaff.map((staff) => (
                    <tr
                      key={staff.id}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                            {getInitial(staff.name)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              {staff.name}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-slate-500">
                              {staff.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {staff.role}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {staff.employmentType}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                          <Building2 size={13} />
                          {staff.department}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {staff.phone}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {staff.email || "No email"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        {formatDate(staff.joiningDate)}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-900">
                          {formatCurrency(staff.salary)}
                        </span>
                        <span className="ml-1 text-xs text-slate-400">
                          / month
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses[staff.status]}`}
                        >
                          {staff.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="relative flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setViewingStaff(staff)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenActionMenu(
                                openActionMenu === staff.id ? null : staff.id
                              )
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                            aria-label={`Actions for ${staff.name}`}
                          >
                            <MoreHorizontal size={17} />
                          </button>

                          {openActionMenu === staff.id && (
                            <div className="absolute right-0 top-11 z-30 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => setViewingStaff(staff)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={16} />
                                View Profile
                              </button>

                              <button
                                type="button"
                                onClick={() => openEditModal(staff)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Pencil size={16} />
                                Edit Staff
                              </button>

                              <div className="my-1 border-t border-slate-100" />

                              <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                                Change Status
                              </p>

                              {(["Active", "On Leave", "Inactive"] as StaffStatus[]).map(
                                (status) => (
                                  <button
                                    key={status}
                                    type="button"
                                    onClick={() => updateStatus(staff.id, status)}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                  >
                                    <span
                                      className={`h-2 w-2 rounded-full ${
                                        status === "Active"
                                          ? "bg-emerald-500"
                                          : status === "On Leave"
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                      }`}
                                    />
                                    {status}
                                  </button>
                                )
                              )}

                              <div className="my-1 border-t border-slate-100" />

                              <button
                                type="button"
                                onClick={() => deleteStaff(staff.id)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                                Delete Staff
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {paginatedStaff.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <Users size={22} />
                        </div>
                        <h3 className="mt-4 font-bold text-slate-900">
                          No staff found
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your filters or add a new staff member.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-500">
                Showing{" "}
                {filteredStaff.length === 0 ? 0 : startIndex + 1}–
                {Math.min(startIndex + rowsPerPage, filteredStaff.length)} of{" "}
                {filteredStaff.length}
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-bold ${
                        safePage === pageNumber
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit Staff" : "Add New Staff"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the staff member&apos;s professional and contact
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 p-6">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {formError}
                </div>
              )}

              <section>
                <div className="mb-4 flex items-center gap-2">
                  <BriefcaseBusiness size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">
                    Employment Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Full Name *
                    </span>
                    <input
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Enter full name"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Role *
                    </span>
                    <input
                      value={form.role}
                      onChange={(e) => setField("role", e.target.value)}
                      placeholder="e.g. Accountant"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Department *
                    </span>
                    <input
                      list="staff-departments"
                      value={form.department}
                      onChange={(e) => setField("department", e.target.value)}
                      placeholder="e.g. Finance"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                    <datalist id="staff-departments">
                      {departments.map((department) => (
                        <option key={department} value={department} />
                      ))}
                    </datalist>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Joining Date *
                    </span>
                    <input
                      type="date"
                      value={form.joiningDate}
                      onChange={(e) =>
                        setField("joiningDate", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Employment Type
                    </span>
                    <select
                      value={form.employmentType}
                      onChange={(e) =>
                        setField("employmentType", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Status
                    </span>
                    <select
                      value={form.status}
                      onChange={(e) => setField("status", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Monthly Salary
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={form.salary}
                      onChange={(e) => setField("salary", e.target.value)}
                      placeholder="e.g. 30000"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                </div>
              </section>

              <section className="border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <Phone size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">
                    Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Phone *
                    </span>
                    <input
                      inputMode="numeric"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) =>
                        setField(
                          "phone",
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      placeholder="10-digit phone number"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Email
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="staff@example.com"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Emergency Contact
                    </span>
                    <input
                      inputMode="numeric"
                      maxLength={10}
                      value={form.emergencyContact}
                      onChange={(e) =>
                        setField(
                          "emergencyContact",
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      placeholder="Emergency phone number"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Address
                    </span>
                    <textarea
                      rows={2}
                      value={form.address}
                      onChange={(e) => setField("address", e.target.value)}
                      placeholder="Enter residential address"
                      className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                </div>
              </section>

              <section className="border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">
                    Internal Notes
                  </h3>
                </div>

                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  placeholder="Add internal notes about this staff member..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </section>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  {editingId ? "Save Changes" : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                  {getInitial(viewingStaff.name)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {viewingStaff.name}
                  </h2>
                  <p className="text-sm font-semibold text-slate-500">
                    {viewingStaff.role} · {viewingStaff.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingStaff(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses[viewingStaff.status]}`}
                >
                  {viewingStaff.status}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Department
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {viewingStaff.department}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Employment Type
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {viewingStaff.employmentType}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Monthly Salary
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {formatCurrency(viewingStaff.salary)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <Phone size={14} />
                  Phone
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {viewingStaff.phone}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <Mail size={14} />
                  Email
                </p>
                <p className="mt-2 break-all font-bold text-slate-900">
                  {viewingStaff.email || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Joining Date
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {formatDate(viewingStaff.joiningDate)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Emergency Contact
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {viewingStaff.emergencyContact || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Address
                </p>
                <p className="mt-2 font-semibold text-slate-800">
                  {viewingStaff.address || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Internal Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap font-semibold text-slate-800">
                  {viewingStaff.notes || "No notes added."}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => openEditModal(viewingStaff)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setViewingStaff(null)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
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

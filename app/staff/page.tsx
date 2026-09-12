"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Building2,
  BriefcaseBusiness,
  Phone,
  Mail,
  MapPin,
  Pencil,
  Eye,
  Trash2,
  MoreHorizontal,
  X,
  RotateCcw,
  ShieldCheck,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  BrainCircuit,
  Sparkles,
  ArrowUpRight,
  Clock3,
  WalletCards,
  UserRoundCheck,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  FileText,
  CircleDollarSign,
  BadgeCheck,
  UserRound,
  CalendarClock,
  MessageCircle,
  BarChart3,
  Zap,
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

type FormState = {
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  joiningDate: string;
  employmentType: EmploymentType;
  status: StaffStatus;
  salary: string;
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
  {
    id: "STF-1007",
    name: "Rohit Malviya",
    role: "Office Executive",
    department: "Administration",
    phone: "9876543216",
    email: "rohit.malviya@example.com",
    joiningDate: "2024-08-15",
    employmentType: "Full-time",
    status: "Active",
    salary: 24000,
    emergencyContact: "9876500017",
    address: "Vijay Nagar, Indore",
    notes: "Handles administrative documentation and coordination.",
  },
  {
    id: "STF-1008",
    name: "Kavita Joshi",
    role: "Admission Executive",
    department: "Admissions",
    phone: "9876543217",
    email: "kavita.joshi@example.com",
    joiningDate: "2025-02-14",
    employmentType: "Full-time",
    status: "Active",
    salary: 26000,
    emergencyContact: "9876500018",
    address: "LIG Colony, Indore",
    notes: "Manages admissions follow-ups and student onboarding.",
  },
  {
    id: "STF-1009",
    name: "Manish Yadav",
    role: "Account Assistant",
    department: "Finance",
    phone: "9876543218",
    email: "manish.yadav@example.com",
    joiningDate: "2025-05-21",
    employmentType: "Part-time",
    status: "Active",
    salary: 18000,
    emergencyContact: "9876500019",
    address: "Bengali Square, Indore",
    notes: "Supports accounting and daily payment reconciliation.",
  },
  {
    id: "STF-1010",
    name: "Pooja Mehta",
    role: "Reception Executive",
    department: "Front Office",
    phone: "9876543219",
    email: "pooja.mehta@example.com",
    joiningDate: "2024-12-01",
    employmentType: "Full-time",
    status: "Inactive",
    salary: 21000,
    emergencyContact: "9876500020",
    address: "Palasia, Indore",
    notes: "Previously managed front-office operations.",
  },
  {
    id: "STF-1011",
    name: "Arjun Rathore",
    role: "IT Administrator",
    department: "Technology",
    phone: "9876543220",
    email: "arjun.rathore@example.com",
    joiningDate: "2025-07-05",
    employmentType: "Contract",
    status: "Active",
    salary: 35000,
    emergencyContact: "9876500021",
    address: "Rau, Indore",
    notes: "Maintains infrastructure, systems and classroom devices.",
  },
  {
    id: "STF-1012",
    name: "Nisha Agarwal",
    role: "HR Coordinator",
    department: "Human Resources",
    phone: "9876543221",
    email: "nisha.agarwal@example.com",
    joiningDate: "2025-03-11",
    employmentType: "Full-time",
    status: "Active",
    salary: 29000,
    emergencyContact: "9876500022",
    address: "Geeta Bhawan, Indore",
    notes: "Coordinates HR documentation and employee records.",
  },
];

const emptyForm: FormState = {
  name: "",
  role: "",
  department: "",
  phone: "",
  email: "",
  joiningDate: "",
  employmentType: "Full-time",
  status: "Active",
  salary: "",
  emergencyContact: "",
  address: "",
  notes: "",
};

const statusClasses: Record<StaffStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "On Leave": "bg-amber-50 text-amber-700 border-amber-100",
  Inactive: "bg-red-50 text-red-700 border-red-100",
};

const getInitial = (name: string) =>
  name.trim().charAt(0).toUpperCase() || "?";

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

const calculateExperience = (joiningDate: string) => {
  if (!joiningDate) return "—";

  const start = new Date(`${joiningDate}T00:00:00`);
  const now = new Date();

  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  if (now.getDate() < start.getDate()) {
    months -= 1;
  }

  months = Math.max(0, months);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths === 1 ? "" : "s"}`;
  }

  if (remainingMonths === 0) {
    return `${years} year${years === 1 ? "" : "s"}`;
  }

  return `${years}y ${remainingMonths}m`;
};

const escapeCsv = (value: string | number) => {
  const stringValue = String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
};

const downloadCsv = (staff: StaffMember[]) => {
  const headers = [
    "Staff ID",
    "Name",
    "Role",
    "Department",
    "Phone",
    "Email",
    "Joining Date",
    "Employment Type",
    "Status",
    "Monthly Salary",
    "Emergency Contact",
    "Address",
    "Notes",
  ];

  const rows = staff.map((item) => [
    item.id,
    item.name,
    item.role,
    item.department,
    item.phone,
    item.email,
    item.joiningDate,
    item.employmentType,
    item.status,
    item.salary,
    item.emergencyContact,
    item.address,
    item.notes,
  ]);

  const csv = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "staff-directory.csv";
  link.click();

  URL.revokeObjectURL(url);
};

export default function StaffPage() {
  const [staffList, setStaffList] =
    useState<StaffMember[]>(initialStaff);

  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [employmentFilter, setEmploymentFilter] = useState("All");

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState("");

  const [viewingStaff, setViewingStaff] =
    useState<StaffMember | null>(null);

  const [openActionMenu, setOpenActionMenu] =
    useState<string | null>(null);

  const [showAiModal, setShowAiModal] = useState(false);
  const [showPayrollModal, setShowPayrollModal] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);

  const departments = useMemo(
    () =>
      Array.from(
        new Set(staffList.map((staff) => staff.department))
      ).sort(),
    [staffList]
  );

  const stats = useMemo(() => {
    const total = staffList.length;

    const active = staffList.filter(
      (staff) => staff.status === "Active"
    ).length;

    const onLeave = staffList.filter(
      (staff) => staff.status === "On Leave"
    ).length;

    const inactive = staffList.filter(
      (staff) => staff.status === "Inactive"
    ).length;

    const monthlyPayroll = staffList
      .filter((staff) => staff.status !== "Inactive")
      .reduce((sum, staff) => sum + staff.salary, 0);

    const annualPayroll = monthlyPayroll * 12;

    const averageSalary =
      total > 0
        ? Math.round(
            staffList.reduce((sum, staff) => sum + staff.salary, 0) /
              total
          )
        : 0;

    return {
      total,
      active,
      onLeave,
      inactive,
      monthlyPayroll,
      annualPayroll,
      averageSalary,
    };
  }, [staffList]);

  const departmentStats = useMemo(() => {
    return departments
      .map((department) => {
        const count = staffList.filter(
          (staff) => staff.department === department
        ).length;

        return {
          department,
          count,
          percentage:
            staffList.length > 0
              ? Math.round((count / staffList.length) * 100)
              : 0,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [departments, staffList]);

  const filteredStaff = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const result = staffList.filter((staff) => {
      const matchesSearch =
        !query ||
        staff.name.toLowerCase().includes(query) ||
        staff.id.toLowerCase().includes(query) ||
        staff.phone.includes(query) ||
        staff.email.toLowerCase().includes(query) ||
        staff.role.toLowerCase().includes(query) ||
        staff.department.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        staff.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        staff.status === statusFilter;

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

  const highSalaryStaff = useMemo(
    () =>
      [...staffList]
        .sort((a, b) => b.salary - a.salary)
        .slice(0, 3),
    [staffList]
  );

  const aiInsights = useMemo(() => {
    const activePercentage =
      stats.total > 0
        ? Math.round((stats.active / stats.total) * 100)
        : 0;

    const highestSalary =
      highSalaryStaff.length > 0
        ? highSalaryStaff[0]
        : null;

    return [
      {
        title: "Workforce health",
        description: `${activePercentage}% of your staff is currently active. ${
          stats.onLeave > 0
            ? `${stats.onLeave} staff member${
                stats.onLeave > 1 ? "s are" : " is"
              } currently on leave.`
            : "No staff members are currently on leave."
        }`,
        type: "positive",
      },
      {
        title: "Retention opportunity",
        description:
          "Review staff with longer tenure and consistently strong operational responsibility for recognition, growth and retention planning.",
        type: "recommendation",
      },
      {
        title: "Payroll concentration",
        description: highestSalary
          ? `${highestSalary.name} currently has the highest monthly salary at ${formatCurrency(
              highestSalary.salary
            )}.`
          : "No salary data available.",
        type: "info",
      },
    ];
  }, [stats, highSalaryStaff]);

  const showToast = (
    message: string,
    type: "success" | "info" | "error" = "success"
  ) => {
    setToast({ message, type });

    window.setTimeout(() => {
      setToast(null);
    }, 2800);
  };

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
    setForm({
      ...emptyForm,
      joiningDate: new Date().toISOString().slice(0, 10),
    });
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
    setViewingStaff(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  };

  const setField = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    const name = form.name.trim();
    const role = form.role.trim();
    const department = form.department.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const salary = Number(form.salary);

    if (
      !name ||
      !role ||
      !department ||
      !phone ||
      !form.joiningDate
    ) {
      setFormError(
        "Please fill in Name, Role, Department, Phone and Joining Date."
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setFormError(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!Number.isFinite(salary) || salary < 0) {
      setFormError("Please enter a valid monthly salary.");
      return;
    }

    if (
      form.emergencyContact &&
      !/^[0-9]{10}$/.test(form.emergencyContact)
    ) {
      setFormError(
        "Emergency contact must contain exactly 10 digits."
      );
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
                email,
                joiningDate: form.joiningDate,
                employmentType: form.employmentType,
                status: form.status,
                salary,
                emergencyContact:
                  form.emergencyContact.trim(),
                address: form.address.trim(),
                notes: form.notes.trim(),
              }
            : staff
        )
      );

      showToast("Staff profile updated successfully.");
    } else {
      const nextNumber =
        Math.max(
          1000,
          ...staffList.map((staff) => {
            const number = Number(
              staff.id.replace("STF-", "")
            );

            return Number.isFinite(number) ? number : 1000;
          })
        ) + 1;

      const newStaff: StaffMember = {
        id: `STF-${String(nextNumber).padStart(4, "0")}`,
        name,
        role,
        department,
        phone,
        email,
        joiningDate: form.joiningDate,
        employmentType: form.employmentType,
        status: form.status,
        salary,
        emergencyContact:
          form.emergencyContact.trim(),
        address: form.address.trim(),
        notes: form.notes.trim(),
      };

      setStaffList((current) => [
        newStaff,
        ...current,
      ]);

      setPage(1);

      showToast("New staff member added successfully.");
    }

    closeModal();
  };

  const deleteStaff = (id: string) => {
    const staff = staffList.find(
      (item) => item.id === id
    );

    if (!staff) return;

    const confirmed = window.confirm(
      `Delete ${staff.name} (${staff.id})? This will remove the staff member from the current demo data.`
    );

    if (!confirmed) return;

    setStaffList((current) =>
      current.filter((item) => item.id !== id)
    );

    setOpenActionMenu(null);
    setViewingStaff(null);

    showToast(
      `${staff.name} was removed from staff records.`,
      "info"
    );
  };

  const updateStatus = (
    id: string,
    status: StaffStatus
  ) => {
    const staff = staffList.find(
      (item) => item.id === id
    );

    setStaffList((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );

    setOpenActionMenu(null);

    if (staff) {
      showToast(
        `${staff.name}'s status changed to ${status}.`
      );
    }
  };

  const handleExport = () => {
    downloadCsv(filteredStaff);
    showToast(
      `${filteredStaff.length} staff records exported.`,
      "success"
    );
  };

  const sendMessage = (staff: StaffMember) => {
    showToast(
      `Communication action prepared for ${staff.name}.`,
      "info"
    );
  };

  return (
    <div
      className="min-h-screen bg-slate-50"
      onClick={() => {
        if (openActionMenu) {
          setOpenActionMenu(null);
        }
      }}
    >
      <Slidebar />

      <main className="min-h-screen p-4 sm:p-6 lg:ml-64 lg:p-8">
        <div className="mx-auto max-w-[1600px]">
          {/* HEADER */}
          <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                <BriefcaseBusiness size={14} />
                Administration
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Staff Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage your non-teaching workforce, departments,
                employment details, payroll visibility and staff
                operations from one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Download size={17} />
                Export
              </button>

              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Staff
              </button>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Total Staff
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats.total}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <TrendingUp size={13} />
                    {stats.active} active members
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Users size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Active Workforce
                  </p>

                  <p className="mt-2 text-3xl font-bold text-emerald-600">
                    {stats.active}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    {stats.total > 0
                      ? Math.round(
                          (stats.active / stats.total) * 100
                        )
                      : 0}
                    % of total staff
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <UserRoundCheck size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    On Leave
                  </p>

                  <p className="mt-2 text-3xl font-bold text-amber-600">
                    {stats.onLeave}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    Currently unavailable
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <CalendarClock size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Monthly Payroll
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {formatCurrency(stats.monthlyPayroll)}
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowPayrollModal(true)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    View payroll
                    <ArrowUpRight size={13} />
                  </button>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <WalletCards size={21} />
                </div>
              </div>
            </div>
          </div>

          {/* AI COMMAND CENTER */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 shadow-sm">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                    <BrainCircuit size={23} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-slate-900">
                        AI Workforce Command Center
                      </h2>

                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600 shadow-sm">
                        AI Ready
                      </span>
                    </div>

                    <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                      Analyze workforce health, payroll concentration,
                      staffing risks and operational opportunities.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAiModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  <Sparkles size={16} />
                  Open AI Insights
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                {aiInsights.map((insight) => (
                  <div
                    key={insight.title}
                    className="rounded-xl border border-white bg-white/80 p-4"
                  >
                    <div className="flex items-center gap-2">
                      {insight.type === "positive" ? (
                        <CheckCircle2
                          size={16}
                          className="text-emerald-600"
                        />
                      ) : insight.type === "recommendation" ? (
                        <Sparkles
                          size={16}
                          className="text-blue-600"
                        />
                      ) : (
                        <BarChart3
                          size={16}
                          className="text-indigo-600"
                        />
                      )}

                      <p className="text-sm font-bold text-slate-900">
                        {insight.title}
                      </p>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* OPERATIONS SNAPSHOT */}
          <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Workforce Overview
                  </h2>

                  <p className="text-sm text-slate-500">
                    Current staffing distribution and operational health.
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
                  <Users size={14} />
                  {stats.total} employees
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Active
                  </p>
                  <p className="mt-2 text-xl font-bold text-emerald-600">
                    {stats.active}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    On Leave
                  </p>
                  <p className="mt-2 text-xl font-bold text-amber-600">
                    {stats.onLeave}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Inactive
                  </p>
                  <p className="mt-2 text-xl font-bold text-red-600">
                    {stats.inactive}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Avg. Salary
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {formatCurrency(stats.averageSalary)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-800">
                    Department Distribution
                  </p>

                  <p className="text-xs font-semibold text-slate-400">
                    {departments.length} departments
                  </p>
                </div>

                <div className="space-y-4">
                  {departmentStats.slice(0, 5).map((item) => (
                    <div key={item.department}>
                      <div className="mb-1.5 flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-slate-700">
                          {item.department}
                        </span>

                        <span className="text-xs font-semibold text-slate-400">
                          {item.count} · {item.percentage}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Payroll Snapshot
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current workforce cost overview.
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <CircleDollarSign size={20} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-xs font-semibold text-slate-300">
                  Estimated Annual Payroll
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {formatCurrency(stats.annualPayroll)}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <TrendingUp size={14} />
                  Based on current active workforce
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-xs font-semibold text-slate-500">
                    Active payroll
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    {formatCurrency(stats.monthlyPayroll)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-xs font-semibold text-slate-500">
                    Average salary
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    {formatCurrency(stats.averageSalary)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPayrollModal(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <WalletCards size={16} />
                  Open Payroll Summary
                </button>
              </div>
            </div>
          </div>

          {/* STAFF DIRECTORY */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Users
                    size={19}
                    className="text-blue-600"
                  />

                  <h2 className="text-lg font-bold text-slate-900">
                    Staff Directory
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Search, filter and manage every staff record.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw size={15} />
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <Download size={15} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* FILTERS */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              <div className="relative xl:col-span-2">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Name, ID, phone, email, role or department..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(event) => {
                  setDepartmentFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Departments</option>

                {departments.map((department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={employmentFilter}
                onChange={(event) => {
                  setEmploymentFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Employment Types
                </option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Filter
                  size={15}
                  className="text-slate-400"
                />

                <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Sort
                </span>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none"
                >
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="department">
                    Department
                  </option>
                  <option value="salary">Salary</option>
                  <option value="joiningDate">
                    Joining Date
                  </option>
                  <option value="status">Status</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(event) =>
                    setSortOrder(event.target.value)
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none"
                >
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </div>

              <span className="sm:ml-auto text-sm font-bold text-slate-500">
                {filteredStaff.length} staff member
                {filteredStaff.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1250px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">
                      Staff
                    </th>

                    <th className="px-5 py-4">
                      Role
                    </th>

                    <th className="px-5 py-4">
                      Department
                    </th>

                    <th className="px-5 py-4">
                      Contact
                    </th>

                    <th className="px-5 py-4">
                      Experience
                    </th>

                    <th className="px-5 py-4">
                      Salary
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {paginatedStaff.map((staff) => (
                    <tr
                      key={staff.id}
                      className="transition hover:bg-blue-50/40"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                            {getInitial(staff.name)}
                          </div>

                          <div className="min-w-0">
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
                        <p className="font-bold text-slate-800">
                          {staff.role}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {staff.employmentType}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                          <Building2 size={13} />
                          {staff.department}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                          <Phone
                            size={13}
                            className="text-slate-400"
                          />
                          {staff.phone}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                          <Mail
                            size={13}
                            className="text-slate-400"
                          />
                          <span className="max-w-[180px] truncate">
                            {staff.email || "No email"}
                          </span>
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-800">
                          {calculateExperience(
                            staff.joiningDate
                          )}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          Joined {formatDate(staff.joiningDate)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">
                          {formatCurrency(staff.salary)}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          / month
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusClasses[staff.status]}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              staff.status === "Active"
                                ? "bg-emerald-500"
                                : staff.status === "On Leave"
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          />

                          {staff.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="relative flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setViewingStaff(staff)
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenActionMenu(
                                openActionMenu === staff.id
                                  ? null
                                  : staff.id
                              )
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                            aria-label={`Actions for ${staff.name}`}
                          >
                            <MoreHorizontal size={17} />
                          </button>

                          {openActionMenu === staff.id && (
                            <div
                              className="absolute right-0 top-11 z-40 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl"
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setViewingStaff(staff);
                                  setOpenActionMenu(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={16} />
                                View Profile
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openEditModal(staff)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Pencil size={16} />
                                Edit Staff
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  sendMessage(staff)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <MessageCircle size={16} />
                                Contact Staff
                              </button>

                              <div className="my-1 border-t border-slate-100" />

                              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Change Status
                              </p>

                              {(
                                [
                                  "Active",
                                  "On Leave",
                                  "Inactive",
                                ] as StaffStatus[]
                              ).map((status) => (
                                <button
                                  key={status}
                                  type="button"
                                  onClick={() =>
                                    updateStatus(
                                      staff.id,
                                      status
                                    )
                                  }
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
                              ))}

                              <div className="my-1 border-t border-slate-100" />

                              <button
                                type="button"
                                onClick={() =>
                                  deleteStaff(staff.id)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
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
                      <td
                        colSpan={8}
                        className="px-6 py-20 text-center"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <Users size={24} />
                        </div>

                        <h3 className="mt-4 font-bold text-slate-900">
                          No staff found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your filters or add a
                          new staff member.
                        </p>

                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                        >
                          <RotateCcw size={15} />
                          Reset Filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-500">
                Showing{" "}
                {filteredStaff.length === 0
                  ? 0
                  : startIndex + 1}
                –
                {Math.min(
                  startIndex + rowsPerPage,
                  filteredStaff.length
                )}{" "}
                of {filteredStaff.length}
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() =>
                    setPage((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
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
                ))}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(
                        totalPages,
                        current + 1
                      )
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-5 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Staff Management Control Center · v0.1.20
            </p>

            <p>
              AI insights are currently simulated and will
              connect to the backend AI engine later.
            </p>
          </div>
        </div>
      </main>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <BriefcaseBusiness size={17} />
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {editingId
                      ? "Edit Staff Profile"
                      : "Add New Staff"}
                  </h2>
                </div>

                <p className="text-sm text-slate-500">
                  Add professional, contact and employment
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={21} />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="space-y-7 p-5 sm:p-7"
            >
              {formError && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />
                  {formError}
                </div>
              )}

              {/* EMPLOYMENT */}
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <BriefcaseBusiness size={17} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Employment Details
                    </h3>

                    <p className="text-xs text-slate-500">
                      Role, department, employment type and salary.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Full Name *
                    </span>

                    <input
                      value={form.name}
                      onChange={(event) =>
                        setField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Enter full name"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Role *
                    </span>

                    <input
                      value={form.role}
                      onChange={(event) =>
                        setField(
                          "role",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Accountant"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Department *
                    </span>

                    <input
                      list="staff-departments"
                      value={form.department}
                      onChange={(event) =>
                        setField(
                          "department",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Finance"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <datalist id="staff-departments">
                      {departments.map((department) => (
                        <option
                          key={department}
                          value={department}
                        />
                      ))}
                    </datalist>
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Joining Date *
                    </span>

                    <input
                      type="date"
                      value={form.joiningDate}
                      onChange={(event) =>
                        setField(
                          "joiningDate",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Employment Type
                    </span>

                    <select
                      value={form.employmentType}
                      onChange={(event) =>
                        setField(
                          "employmentType",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                    >
                      <option value="Full-time">
                        Full-time
                      </option>
                      <option value="Part-time">
                        Part-time
                      </option>
                      <option value="Contract">
                        Contract
                      </option>
                    </select>
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Status
                    </span>

                    <select
                      value={form.status}
                      onChange={(event) =>
                        setField(
                          "status",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                    >
                      <option value="Active">
                        Active
                      </option>
                      <option value="On Leave">
                        On Leave
                      </option>
                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Monthly Salary
                    </span>

                    <div className="relative">
                      <IndianRupee
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="number"
                        min="0"
                        value={form.salary}
                        onChange={(event) =>
                          setField(
                            "salary",
                            event.target.value
                          )
                        }
                        placeholder="e.g. 30000"
                        className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </label>
                </div>
              </section>

              {/* CONTACT */}
              <section className="border-t border-slate-100 pt-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                    <Phone size={17} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Contact Information
                    </h3>

                    <p className="text-xs text-slate-500">
                      Contact and emergency communication details.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Phone *
                    </span>

                    <input
                      inputMode="numeric"
                      maxLength={10}
                      value={form.phone}
                      onChange={(event) =>
                        setField(
                          "phone",
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        )
                      }
                      placeholder="10-digit phone number"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Email
                    </span>

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setField(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="staff@example.com"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Emergency Contact
                    </span>

                    <input
                      inputMode="numeric"
                      maxLength={10}
                      value={form.emergencyContact}
                      onChange={(event) =>
                        setField(
                          "emergencyContact",
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        )
                      }
                      placeholder="Emergency phone number"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                      Address
                    </span>

                    <input
                      value={form.address}
                      onChange={(event) =>
                        setField(
                          "address",
                          event.target.value
                        )
                      }
                      placeholder="Residential address"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                </div>
              </section>

              {/* NOTES */}
              <section className="border-t border-slate-100 pt-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-violet-50 p-2 text-violet-600">
                    <FileText size={17} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Internal Notes
                    </h3>

                    <p className="text-xs text-slate-500">
                      Private administrative notes for this staff profile.
                    </p>
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(event) =>
                    setField(
                      "notes",
                      event.target.value
                    )
                  }
                  placeholder="Add internal notes..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </section>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <CheckCircle2 size={17} />
                  {editingId
                    ? "Save Changes"
                    : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW PROFILE MODAL */}
      {viewingStaff && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                  {getInitial(viewingStaff.name)}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {viewingStaff.name}
                    </h2>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClasses[viewingStaff.status]}`}
                    >
                      {viewingStaff.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {viewingStaff.role}
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-400">
                    {viewingStaff.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setViewingStaff(null)
                }
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              {/* PROFILE SUMMARY */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Department
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {viewingStaff.department}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Employment
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {viewingStaff.employmentType}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Experience
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {calculateExperience(
                      viewingStaff.joiningDate
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Monthly Salary
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {formatCurrency(
                      viewingStaff.salary
                    )}
                  </p>
                </div>
              </div>

              {/* CONTACT */}
              <div className="mt-6">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Phone
                    size={16}
                    className="text-blue-600"
                  />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Phone size={14} />
                      Phone
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {viewingStaff.phone}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Mail size={14} />
                      Email
                    </p>

                    <p className="mt-2 break-all font-bold text-slate-900">
                      {viewingStaff.email ||
                        "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Phone size={14} />
                      Emergency Contact
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {viewingStaff.emergencyContact ||
                        "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <MapPin size={14} />
                      Address
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {viewingStaff.address ||
                        "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* EMPLOYMENT */}
              <div className="mt-6">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                  <BriefcaseBusiness
                    size={16}
                    className="text-blue-600"
                  />
                  Employment Information
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="text-xs font-bold text-slate-400">
                      Joining Date
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {formatDate(
                        viewingStaff.joiningDate
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="text-xs font-bold text-slate-400">
                      Current Experience
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {calculateExperience(
                        viewingStaff.joiningDate
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="text-xs font-bold text-slate-400">
                      Annual Salary
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {formatCurrency(
                        viewingStaff.salary * 12
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* NOTES */}
              <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <FileText size={14} />
                  Internal Notes
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-700">
                  {viewingStaff.notes ||
                    "No internal notes added."}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
              <button
                type="button"
                onClick={() =>
                  sendMessage(viewingStaff)
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <MessageCircle size={16} />
                Contact
              </button>

              <button
                type="button"
                onClick={() =>
                  openEditModal(viewingStaff)
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <BrainCircuit size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    AI Workforce Insights
                  </h2>

                  <p className="text-sm text-slate-500">
                    Intelligent recommendations based on current
                    staff data.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={17}
                    className="text-blue-600"
                  />

                  <p className="font-bold text-slate-900">
                    Workforce recommendation
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your current staff structure is distributed across
                  {` ${departments.length}`} departments. Consider
                  monitoring workload concentration within the largest
                  departments before hiring additional staff.
                </p>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    size={17}
                    className="text-amber-600"
                  />

                  <p className="font-bold text-slate-900">
                    Leave coverage
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {stats.onLeave === 0
                    ? "No current leave coverage issue detected."
                    : `${stats.onLeave} staff member${
                        stats.onLeave > 1 ? "s are" : " is"
                      } currently on leave. Review department coverage for critical operational roles.`}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp
                    size={17}
                    className="text-emerald-600"
                  />

                  <p className="font-bold text-slate-900">
                    Retention opportunity
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Staff tenure can be used later to build automated
                  retention scoring, recognition recommendations and
                  performance-review reminders.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Zap
                    size={17}
                    className="text-indigo-600"
                  />

                  <p className="font-bold text-slate-900">
                    Future AI capabilities
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    "Staff attrition prediction",
                    "Workload balancing",
                    "Payroll forecasting",
                    "Hiring recommendations",
                    "Performance insights",
                    "Leave planning",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-xs font-medium text-slate-400">
                AI insights shown here are simulated. Real AI
                analysis will be connected after the backend and
                AI service are implemented.
              </p>
            </div>

            <div className="border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                Close Insights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYROLL MODAL */}
      {showPayrollModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <WalletCards size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Payroll Summary
                  </h2>

                  <p className="text-sm text-slate-500">
                    Current estimated staff payroll.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowPayrollModal(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="rounded-2xl bg-slate-900 p-6 text-white">
                <p className="text-xs font-semibold text-slate-300">
                  Current Monthly Payroll
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {formatCurrency(
                    stats.monthlyPayroll
                  )}
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-400">
                  Estimated annual payroll:{" "}
                  {formatCurrency(stats.annualPayroll)}
                </p>
              </div>

              <div className="mt-5 space-y-2">
                {staffList
                  .filter(
                    (staff) =>
                      staff.status !== "Inactive"
                  )
                  .sort(
                    (a, b) => b.salary - a.salary
                  )
                  .map((staff) => (
                    <div
                      key={staff.id}
                      className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                          {getInitial(staff.name)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {staff.name}
                          </p>

                          <p className="text-xs font-medium text-slate-400">
                            {staff.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-bold text-slate-900">
                        {formatCurrency(staff.salary)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowPayrollModal(false)
                }
                className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                Close Payroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[200] w-[calc(100%-40px)] max-w-sm">
          <div
            className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-2xl ${
              toast.type === "success"
                ? "border-emerald-200"
                : toast.type === "error"
                ? "border-red-200"
                : "border-blue-200"
            }`}
          >
            <div
              className={`mt-0.5 rounded-lg p-2 ${
                toast.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : toast.type === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={17} />
              ) : toast.type === "error" ? (
                <AlertTriangle size={17} />
              ) : (
                <RefreshCw size={17} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900">
                {toast.type === "success"
                  ? "Success"
                  : toast.type === "error"
                  ? "Action failed"
                  : "Information"}
              </p>

              <p className="mt-0.5 text-xs font-medium leading-5 text-slate-500">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
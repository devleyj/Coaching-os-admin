"use client";

import Slidebar from "../components/Slidebar";
import PageHeader from "../components/PageHeader";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Download,
  FileText,
  IndianRupee,
  MoreHorizontal,
  Printer,
  Receipt,
  Search,
  Sparkles,
  TrendingUp,
  User,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getCollection, setCollection, subscribeToStore } from "../data/store";

type FeeRecord = {
  name: string;
  id: string;
  course: string;
  batch: string;
  phone: string;
  total: number;
  paid: number;
  dueDate: string;
};

type Payment = {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  batch: string;
  amount: number;
  method: string;
  date: string;
  physicalReceiptNo: string;
  previousPaid: number;
  remainingBalance: number;
};

type SharedStudent = {
  name: string;
  course: string;
  id: string;
  batch: string;
  phone: string;
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  status: "Active" | "Inactive" | "Pending";
  lastPayment: string;
};

const LEGACY_STUDENTS_KEY = "coaching-os-students";
const PAYMENTS_STORAGE_KEY = "coaching-os-fee-payments";

const legacyFeeRecords: FeeRecord[] = [
  {
    name: "Aarav Sharma",
    id: "STU-1001",
    course: "JEE Advanced",
    batch: "JEE Advanced 2027",
    phone: "9876543210",
    total: 45000,
    paid: 30000,
    dueDate: "2026-09-15",
  },
  {
    name: "Riya Patel",
    id: "STU-1002",
    course: "NEET",
    batch: "NEET 2027",
    phone: "9876543211",
    total: 52000,
    paid: 40000,
    dueDate: "2026-09-10",
  },
  {
    name: "Kabir Mehta",
    id: "STU-1003",
    course: "JEE Main",
    batch: "JEE Main 2027",
    phone: "9876543212",
    total: 38000,
    paid: 38000,
    dueDate: "2026-08-30",
  },
  {
    name: "Ananya Singh",
    id: "STU-1004",
    course: "Foundation",
    batch: "Foundation 2027",
    phone: "9876543213",
    total: 10000,
    paid: 5000,
    dueDate: "2026-09-05",
  },
  {
    name: "Vivaan Gupta",
    id: "STU-1005",
    course: "JEE Advanced",
    batch: "JEE Advanced 2027",
    phone: "9876543214",
    total: 60000,
    paid: 45000,
    dueDate: "2026-09-20",
  },
  {
    name: "Diya Verma",
    id: "STU-1006",
    course: "NEET",
    batch: "NEET 2027",
    phone: "9876543215",
    total: 55000,
    paid: 25000,
    dueDate: "2026-09-07",
  },
  {
    name: "Aditya Joshi",
    id: "STU-1007",
    course: "JEE Main",
    batch: "JEE Main 2027",
    phone: "9876543216",
    total: 40000,
    paid: 40000,
    dueDate: "2026-08-25",
  },
  {
    name: "Meera Shah",
    id: "STU-1008",
    course: "Foundation",
    batch: "Foundation 2027",
    phone: "9876543217",
    total: 12000,
    paid: 6000,
    dueDate: "2026-09-12",
  },
];

function readLegacyStudents(): SharedStudent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LEGACY_STUDENTS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SharedStudent[]) : [];
  } catch {
    return [];
  }
}

function buildFeeRecords(students: SharedStudent[]): FeeRecord[] {
  return students.map((student) => ({
    name: student.name,
    id: student.id,
    course: student.course,
    batch: student.batch,
    phone: student.phone,
    total: Number(student.totalFees) || 0,
    paid: Number(student.paidFees) || 0,
    dueDate: student.lastPayment || new Date().toISOString().split("T")[0],
  }));
}

const initialPayments: Payment[] = [
  {
    id: "PAY-1001",
    studentId: "STU-1001",
    studentName: "Aarav Sharma",
    course: "JEE Advanced",
    batch: "JEE Advanced 2027",
    amount: 10000,
    method: "UPI",
    date: "2026-09-01",
    physicalReceiptNo: "RCPT-2026-0001",
    previousPaid: 20000,
    remainingBalance: 15000,
  },
  {
    id: "PAY-1002",
    studentId: "STU-1002",
    studentName: "Riya Patel",
    course: "NEET",
    batch: "NEET 2027",
    amount: 15000,
    method: "Cash",
    date: "2026-08-28",
    physicalReceiptNo: "RCPT-2026-0002",
    previousPaid: 25000,
    remainingBalance: 12000,
  },
  {
    id: "PAY-1003",
    studentId: "STU-1003",
    studentName: "Kabir Mehta",
    course: "JEE Main",
    batch: "JEE Main 2027",
    amount: 18000,
    method: "Bank Transfer",
    date: "2026-08-25",
    physicalReceiptNo: "RCPT-2026-0003",
    previousPaid: 20000,
    remainingBalance: 0,
  },
];

const formatCurrency = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

const formatDate = (date: string) => {
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function numberToWords(num: number): string {
  if (num === 0) return "Zero Rupees Only";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const twoDigit = (n: number): string => {
    if (n < 20) return ones[n];
    return `${tens[Math.floor(n / 10)]}${n % 10 ? ` ${ones[n % 10]}` : ""}`;
  };

  const convert = (n: number): string => {
    if (n < 100) return twoDigit(n);

    if (n < 1000) {
      return `${ones[Math.floor(n / 100)]} Hundred${
        n % 100 ? ` ${convert(n % 100)}` : ""
      }`;
    }

    if (n < 100000) {
      return `${convert(Math.floor(n / 1000))} Thousand${
        n % 1000 ? ` ${convert(n % 1000)}` : ""
      }`;
    }

    if (n < 10000000) {
      return `${convert(Math.floor(n / 100000))} Lakh${
        n % 100000 ? ` ${convert(n % 100000)}` : ""
      }`;
    }

    return `${convert(Math.floor(n / 10000000))} Crore${
      n % 10000000 ? ` ${convert(n % 10000000)}` : ""
    }`;
  };

  return `${convert(Math.floor(num))} Rupees Only`;
}

export default function FeesPage() {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);

  const [paymentHistory, setPaymentHistory] = useState<Payment[]>(() => {
    if (typeof window === "undefined") return initialPayments;

    try {
      const raw = window.localStorage.getItem(PAYMENTS_STORAGE_KEY);
      if (!raw) return initialPayments;

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Payment[]) : initialPayments;
    } catch {
      return initialPayments;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(
      PAYMENTS_STORAGE_KEY,
      JSON.stringify(paymentHistory),
    );
  }, [paymentHistory]);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [physicalReceiptNo, setPhysicalReceiptNo] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");

  const [feePage, setFeePage] = useState(1);
  const [paymentPage, setPaymentPage] = useState(1);

  const [toast, setToast] = useState("");
  const [showAI, setShowAI] = useState(false);

  const rowsPerPage = 6;

  useEffect(() => {
    const loadStudents = () => {
      let students = getCollection<SharedStudent>("students");

      // Compatibility migration for older student data.
      if (students.length === 0) {
        const legacyStudents = readLegacyStudents();
        if (legacyStudents.length > 0) {
          students = legacyStudents;
          setCollection("students", students);
        }
      }

      setFeeRecords(buildFeeRecords(students));
    };

    loadStudents();

    return subscribeToStore(loadStudents);
  }, []);

  const totalFees = feeRecords.reduce((sum, record) => sum + record.total, 0);
  const collectedFees = feeRecords.reduce(
    (sum, record) => sum + record.paid,
    0,
  );
  const pendingFees = totalFees - collectedFees;

  const collectionRate =
    totalFees > 0 ? Math.round((collectedFees / totalFees) * 100) : 0;

  const fullyPaidStudents = feeRecords.filter(
    (record) => record.paid >= record.total,
  ).length;

  const overdueStudents = feeRecords.filter((record) => {
    const pending = record.total - record.paid;

    return pending > 0 && new Date(`${record.dueDate}T23:59:59`) < new Date();
  }).length;

  const courses = [...new Set(feeRecords.map((record) => record.course))];

  const filteredFeeRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return feeRecords.filter((record) => {
      const matchesSearch =
        !query ||
        record.name.toLowerCase().includes(query) ||
        record.id.toLowerCase().includes(query) ||
        record.course.toLowerCase().includes(query) ||
        record.batch.toLowerCase().includes(query);

      const pending = record.total - record.paid;

      const status =
        pending === 0 ? "Paid" : record.paid > 0 ? "Partial" : "Pending";

      const matchesStatus = statusFilter === "All" || status === statusFilter;

      const matchesCourse =
        courseFilter === "All" || record.course === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [feeRecords, search, statusFilter, courseFilter]);

  const feeTotalPages = Math.max(
    1,
    Math.ceil(filteredFeeRecords.length / rowsPerPage),
  );

  const safeFeePage = Math.min(feePage, feeTotalPages);

  const paginatedFeeRecords = filteredFeeRecords.slice(
    (safeFeePage - 1) * rowsPerPage,
    safeFeePage * rowsPerPage,
  );

  const paymentTotalPages = Math.max(
    1,
    Math.ceil(paymentHistory.length / rowsPerPage),
  );

  const safePaymentPage = Math.min(paymentPage, paymentTotalPages);

  const paginatedPaymentHistory = paymentHistory.slice(
    (safePaymentPage - 1) * rowsPerPage,
    safePaymentPage * rowsPerPage,
  );

  const filteredStudents = feeRecords.filter((student) => {
    const query = studentSearch.toLowerCase();

    return (
      student.name.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query)
    );
  });

  const selectedStudentData = feeRecords.find(
    (student) => student.id === selectedStudent,
  );

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const resetPaymentForm = () => {
    setSelectedStudent("");
    setStudentSearch("");
    setPaymentAmount("");
    setPaymentMethod("Cash");
    setPaymentDate(new Date().toISOString().split("T")[0]);
    setPhysicalReceiptNo("");
  };

  const handleOpenPayment = () => {
    resetPaymentForm();
    setShowPaymentForm(true);
  };

  const handleRecordPayment = () => {
    if (!selectedStudent) {
      showToast("Please select a student.");
      return;
    }

    if (!paymentAmount || Number(paymentAmount) <= 0) {
      showToast("Enter a valid payment amount.");
      return;
    }

    if (!paymentDate) {
      showToast("Please select payment date.");
      return;
    }

    if (!physicalReceiptNo.trim()) {
      showToast("Physical receipt number is required.");
      return;
    }

    const student = feeRecords.find((record) => record.id === selectedStudent);

    if (!student) {
      showToast("Student not found.");
      return;
    }

    const amount = Number(paymentAmount);
    const pending = student.total - student.paid;

    if (amount > pending) {
      showToast(
        `Payment cannot exceed pending balance of ${formatCurrency(pending)}.`,
      );
      return;
    }

    const previousPaid = student.paid;
    const remainingBalance = student.total - (student.paid + amount);

    const newPayment: Payment = {
      id: `PAY-${Date.now().toString().slice(-6)}`,
      studentId: student.id,
      studentName: student.name,
      course: student.course,
      batch: student.batch,
      amount,
      method: paymentMethod,
      date: paymentDate,
      physicalReceiptNo: physicalReceiptNo.trim(),
      previousPaid,
      remainingBalance,
    };

    const updatedStudents = getCollection<SharedStudent>("students").map(
      (item) =>
        item.id === student.id
          ? {
              ...item,
              paidFees: item.paidFees + amount,
              pendingFees: Math.max(
                item.totalFees - (item.paidFees + amount),
                0,
              ),
              lastPayment: paymentDate,
            }
          : item,
    );

    setCollection("students", updatedStudents);

    // Update the local fee view immediately as well as the shared Students data.
    setFeeRecords(buildFeeRecords(updatedStudents));

    setPaymentHistory((history) => [newPayment, ...history]);

    setSelectedPayment(newPayment);
    setShowPaymentForm(false);

    resetPaymentForm();

    setPaymentPage(1);

    showToast("Payment recorded successfully.");
  };

  const handlePrintReceipt = () => {
    if (!selectedPayment) return;

    window.print();
  };

  const exportPaymentsCSV = () => {
    const header = [
      "Payment ID",
      "Receipt Number",
      "Student",
      "Student ID",
      "Course",
      "Batch",
      "Amount",
      "Method",
      "Date",
      "Remaining Balance",
    ];

    const rows = paymentHistory.map((payment) => [
      payment.id,
      payment.physicalReceiptNo,
      payment.studentName,
      payment.studentId,
      payment.course,
      payment.batch,
      payment.amount,
      payment.method,
      payment.date,
      payment.remainingBalance,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "fee-payments.csv";
    link.click();

    URL.revokeObjectURL(url);

    showToast("Payment report exported.");
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm;
          }

          html,
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          body * {
            visibility: hidden !important;
          }

          .receipt-print-area,
          .receipt-print-area * {
            visibility: visible !important;
          }

          .receipt-print-area {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .receipt-copy {
            display: block !important;
            width: 100% !important;
            min-height: 125mm !important;
            box-sizing: border-box !important;
            border: 1.5px solid #111827 !important;
            padding: 9mm !important;
            margin: 0 0 8mm 0 !important;
            page-break-inside: avoid !important;
          }

          .receipt-copy:last-child {
            margin-bottom: 0 !important;
          }

          .receipt-cut-line {
            display: block !important;
            border-top: 1px dashed #374151 !important;
            margin: 4mm 0 !important;
            text-align: center !important;
            height: 0 !important;
          }

          .receipt-cut-line span {
            position: relative !important;
            top: -8px !important;
            background: white !important;
            padding: 0 10px !important;
            color: #4b5563 !important;
            font-size: 9px !important;
          }
        }

        @media screen {
          .receipt-print-area {
            display: none;
          }
        }
      `}</style>

      <div className="no-print min-h-screen bg-slate-50">
        <div className="print:hidden">
          <Slidebar />
        </div>

        <main className="ml-64 min-h-screen p-8">
          <div className="mx-auto max-w-7xl">
            {/* HEADER */}
            <PageHeader
              title="Fee Management"
              description="Manage collections, student balances, receipts and payment activity from one place."
              icon={<IndianRupee size={20} />}
              actions={
                <>
                  <button
                    type="button"
                    onClick={exportPaymentsCSV}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Download size={16} />
                    Export
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAI(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
                  >
                    <Sparkles size={16} />
                    AI Insights
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenPayment}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    <IndianRupee size={17} />
                    Record Payment
                  </button>
                </>
              }
            />

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Total Fees
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {formatCurrency(totalFees)}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <Wallet size={13} />
                      Across {feeRecords.length} students
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <IndianRupee size={21} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Collected
                    </p>
                    <p className="mt-2 text-2xl font-bold text-emerald-600">
                      {formatCurrency(collectedFees)}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <ArrowUpRight size={13} />
                      {collectionRate}% collection rate
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <CheckCircle2 size={21} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Pending
                    </p>
                    <p className="mt-2 text-2xl font-bold text-orange-600">
                      {formatCurrency(pendingFees)}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-orange-600">
                      <ArrowDownRight size={13} />
                      {overdueStudents} overdue
                    </p>
                  </div>

                  <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                    <Clock3 size={21} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Fully Paid
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {fullyPaidStudents}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      {feeRecords.length
                        ? Math.round(
                            (fullyPaidStudents / feeRecords.length) * 100,
                          )
                        : 0}
                      % of students
                    </p>
                  </div>

                  <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                    <CreditCard size={21} />
                  </div>
                </div>
              </div>
            </div>

            {/* COLLECTION PROGRESS */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-blue-600" />
                    <h2 className="font-bold text-slate-900">
                      Collection Progress
                    </h2>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Overall fee collection performance.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">
                    {collectionRate}%
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatCurrency(collectedFees)} collected
                  </p>
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${Math.min(collectionRate, 100)}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-500">
                <span>Collected</span>
                <span>Pending {formatCurrency(pendingFees)}</span>
              </div>
            </div>

            {/* AI COMMAND CENTER */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-blue-50 shadow-sm">
              <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm">
                    <Brain size={23} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-slate-900">
                        AI Finance Command Center
                      </h2>

                      <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                        AI Ready
                      </span>
                    </div>

                    <p className="mt-1 max-w-2xl text-sm text-slate-600">
                      Identify overdue balances, collection opportunities,
                      payment trends and students who may need a reminder.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                        {overdueStudents} overdue accounts
                      </span>

                      <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                        {collectionRate}% collection
                      </span>

                      <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                        {fullyPaidStudents} fully paid
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAI(true)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Zap size={16} />
                  Analyze Fees
                </button>
              </div>
            </div>

            {/* FILTERS */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_180px_180px_auto]">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setFeePage(1);
                    }}
                    placeholder="Search student, ID, course or batch..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setFeePage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Pending">Pending</option>
                </select>

                <select
                  value={courseFilter}
                  onChange={(event) => {
                    setCourseFilter(event.target.value);
                    setFeePage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="All">All Courses</option>

                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setCourseFilter("All");
                    setFeePage(1);
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* FEE RECORDS */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Fee Records
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage student fee balances and collection status.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                  {filteredFeeRecords.length} Students
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Student
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Course / Batch
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Total Fee
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Paid
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Pending
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Due Date
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedFeeRecords.map((record) => {
                      const pending = record.total - record.paid;

                      const progress =
                        record.total > 0
                          ? Math.round((record.paid / record.total) * 100)
                          : 0;

                      const isPaid = pending === 0;

                      const isOverdue =
                        pending > 0 &&
                        new Date(`${record.dueDate}T23:59:59`) < new Date();

                      return (
                        <tr
                          key={record.id}
                          className="border-b border-slate-100 transition hover:bg-blue-50/40"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                {record.name.charAt(0)}
                              </div>

                              <div>
                                <p className="text-sm font-bold text-slate-900">
                                  {record.name}
                                </p>

                                <p className="mt-0.5 text-xs font-medium text-slate-500">
                                  {record.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-sm font-semibold text-slate-800">
                              {record.course}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {record.batch}
                            </p>
                          </td>

                          <td className="px-6 py-5 text-sm font-bold text-slate-900">
                            {formatCurrency(record.total)}
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-sm font-bold text-emerald-600">
                              {formatCurrency(record.paid)}
                            </p>

                            <div className="mt-2 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-emerald-500"
                                style={{
                                  width: `${Math.min(progress, 100)}%`,
                                }}
                              />
                            </div>

                            <p className="mt-1 text-[11px] font-medium text-slate-400">
                              {progress}% paid
                            </p>
                          </td>

                          <td className="px-6 py-5 text-sm font-bold text-orange-600">
                            {formatCurrency(pending)}
                          </td>

                          <td className="px-6 py-5">
                            <p
                              className={`text-sm font-semibold ${
                                isOverdue ? "text-red-600" : "text-slate-700"
                              }`}
                            >
                              {formatDate(record.dueDate)}
                            </p>

                            {isOverdue && (
                              <span className="mt-1 inline-flex text-[11px] font-bold text-red-500">
                                Overdue
                              </span>
                            )}
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                isPaid
                                  ? "bg-emerald-50 text-emerald-600"
                                  : record.paid > 0
                                    ? "bg-orange-50 text-orange-600"
                                    : "bg-red-50 text-red-600"
                              }`}
                            >
                              {isPaid
                                ? "Paid"
                                : record.paid > 0
                                  ? "Partial"
                                  : "Pending"}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedStudent(record.id);
                                setStudentSearch("");
                                setPaymentAmount("");
                                setPhysicalReceiptNo("");
                                setShowPaymentForm(true);
                              }}
                              disabled={pending === 0}
                              className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {pending === 0 ? "Paid" : "Collect"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {paginatedFeeRecords.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-6 py-16 text-center">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                            <Search size={20} className="text-slate-400" />
                          </div>

                          <p className="mt-3 text-sm font-bold text-slate-700">
                            No fee records found
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Try changing your search or filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  {filteredFeeRecords.length === 0
                    ? 0
                    : (safeFeePage - 1) * rowsPerPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    safeFeePage * rowsPerPage,
                    filteredFeeRecords.length,
                  )}{" "}
                  of {filteredFeeRecords.length} records
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFeePage((page) => Math.max(page - 1, 1))}
                    disabled={safeFeePage === 1}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <span className="px-2 text-sm font-semibold text-slate-600">
                    {safeFeePage} / {feeTotalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setFeePage((page) => Math.min(page + 1, feeTotalPages))
                    }
                    disabled={safeFeePage === feeTotalPages}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* PAYMENT HISTORY */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Payment History
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Every recorded transaction and physical receipt.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Receipt size={18} className="text-blue-600" />

                  <span className="text-sm font-bold text-slate-700">
                    {paymentHistory.length} Payments
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Payment
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Student
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Receipt No.
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Method
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Date
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Receipt
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedPaymentHistory.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-slate-100 transition hover:bg-blue-50/40"
                      >
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-slate-900">
                            {payment.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Balance: {formatCurrency(payment.remainingBalance)}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-slate-900">
                            {payment.studentName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {payment.studentId}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                            {payment.physicalReceiptNo}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm font-bold text-emerald-600">
                          {formatCurrency(payment.amount)}
                        </td>

                        <td className="px-6 py-5">
                          <span className="text-sm font-semibold text-slate-700">
                            {payment.method}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm font-medium text-slate-600">
                          {formatDate(payment.date)}
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => setSelectedPayment(payment)}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
                          >
                            <Receipt size={14} />
                            View Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  {paymentHistory.length === 0
                    ? 0
                    : (safePaymentPage - 1) * rowsPerPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    safePaymentPage * rowsPerPage,
                    paymentHistory.length,
                  )}{" "}
                  of {paymentHistory.length} payments
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentPage((page) => Math.max(page - 1, 1))
                    }
                    disabled={safePaymentPage === 1}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <span className="px-2 text-sm font-semibold text-slate-600">
                    {safePaymentPage} / {paymentTotalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentPage((page) =>
                        Math.min(page + 1, paymentTotalPages),
                      )
                    }
                    disabled={safePaymentPage === paymentTotalPages}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER INFO */}
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-3">
                <div className="rounded-xl bg-white p-2.5 text-blue-600 shadow-sm">
                  <FileText size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Professional receipt system
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Each payment generates an Office Copy and Student Copy.
                  </p>
                </div>
              </div>

              <p className="text-xs font-semibold text-blue-700">
                Receipt printing is separated from the Fees dashboard.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentForm && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <IndianRupee size={18} />
                  </div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Record Payment
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Record a student fee payment and generate a receipt.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowPaymentForm(false);
                  resetPaymentForm();
                }}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              {/* STUDENT */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Student
                </label>

                {!selectedStudent ? (
                  <>
                    <div className="relative">
                      <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={studentSearch}
                        onChange={(event) =>
                          setStudentSearch(event.target.value)
                        }
                        placeholder="Search student name or ID..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {studentSearch && (
                      <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student) => {
                            const pending = student.total - student.paid;

                            return (
                              <button
                                key={student.id}
                                type="button"
                                disabled={pending <= 0}
                                onClick={() => {
                                  setSelectedStudent(student.id);
                                  setStudentSearch("");
                                }}
                                className="flex w-full items-center justify-between border-b border-slate-100 px-4 py-3 text-left transition last:border-0 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <div>
                                  <p className="text-sm font-bold text-slate-900">
                                    {student.name}
                                  </p>

                                  <p className="mt-0.5 text-xs text-slate-500">
                                    {student.id} • {student.course}
                                  </p>
                                </div>

                                <span className="text-xs font-bold text-orange-600">
                                  {formatCurrency(pending)}
                                </span>
                              </button>
                            );
                          })
                        ) : (
                          <p className="p-4 text-sm text-slate-500">
                            No students found.
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                          {selectedStudentData?.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {selectedStudentData?.name}
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-500">
                            {selectedStudentData?.id}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedStudent("")}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800"
                      >
                        Change
                      </button>
                    </div>

                    {selectedStudentData && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-white p-3">
                          <p className="text-[11px] font-semibold text-slate-500">
                            Total Fee
                          </p>
                          <p className="mt-1 text-sm font-bold text-slate-900">
                            {formatCurrency(selectedStudentData.total)}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <p className="text-[11px] font-semibold text-slate-500">
                            Pending
                          </p>
                          <p className="mt-1 text-sm font-bold text-orange-600">
                            {formatCurrency(
                              selectedStudentData.total -
                                selectedStudentData.paid,
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* AMOUNT */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Payment Amount
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={paymentAmount}
                    onChange={(event) => setPaymentAmount(event.target.value)}
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* RECEIPT */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Physical Receipt Number
                </label>

                <input
                  value={physicalReceiptNo}
                  onChange={(event) => setPhysicalReceiptNo(event.target.value)}
                  placeholder="e.g. RCPT-2026-0042"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  This number will appear on both printed receipt copies.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* METHOD */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Payment Method
                  </label>

                  <select
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Card</option>
                    <option>Cheque</option>
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Payment Date
                  </label>

                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(event) => setPaymentDate(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* PREVIEW */}
              {selectedStudentData && paymentAmount && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-emerald-600" />

                    <p className="text-sm font-bold text-emerald-800">
                      Payment Preview
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500">Amount Received</p>
                      <p className="mt-1 text-sm font-bold text-emerald-700">
                        {formatCurrency(Number(paymentAmount) || 0)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Remaining Balance
                      </p>
                      <p className="mt-1 text-sm font-bold text-orange-600">
                        {formatCurrency(
                          Math.max(
                            selectedStudentData.total -
                              selectedStudentData.paid -
                              (Number(paymentAmount) || 0),
                            0,
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentForm(false);
                    resetPaymentForm();
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleRecordPayment}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Receipt size={16} />
                  Record Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT PREVIEW MODAL */}
      {selectedPayment && (
        <div className="no-print fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <Receipt size={20} className="text-blue-600" />

                  <h2 className="text-lg font-bold text-slate-900">
                    Payment Receipt
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedPayment.physicalReceiptNo}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">
              {/* SCREEN PREVIEW */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="rounded-xl border border-slate-300 bg-white p-6">
                  <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                    <div>
                      <p className="text-lg font-black tracking-wide text-slate-900">
                        SAGAR CLASSES
                      </p>

                      <p className="text-xs font-semibold text-slate-500">
                        EduManage Coaching Institute
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        Professional Fee Receipt
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      PAID
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Receipt Number</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {selectedPayment.physicalReceiptNo}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">Payment Date</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {formatDate(selectedPayment.date)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Student</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {selectedPayment.studentName}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">Student ID</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {selectedPayment.studentId}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Course</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {selectedPayment.course}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">Payment Method</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {selectedPayment.method}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
                      <span className="text-sm font-bold text-slate-700">
                        Amount Received
                      </span>

                      <span className="text-lg font-black text-emerald-600">
                        {formatCurrency(selectedPayment.amount)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="border-r border-slate-200 p-4">
                        <p className="text-xs text-slate-500">Previous Paid</p>

                        <p className="mt-1 font-bold text-slate-900">
                          {formatCurrency(selectedPayment.previousPaid)}
                        </p>
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-slate-500">
                          Remaining Balance
                        </p>

                        <p className="mt-1 font-bold text-orange-600">
                          {formatCurrency(selectedPayment.remainingBalance)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <Printer size={17} />
                  Print Office + Student Copy
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment(null)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-semibold leading-5 text-blue-800">
                  The print version contains only the professional receipt. The
                  Fees dashboard, sidebar, buttons and other screen elements
                  will not be printed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI MODAL */}
      {showAI && (
        <div className="no-print fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-2.5 text-violet-600">
                  <Brain size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">AI Fee Insights</h2>

                  <p className="text-xs text-slate-500">
                    Intelligent finance analysis
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAI(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 p-6">
              <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="flex gap-3">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-red-800">
                      Overdue collection opportunity
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-700">
                      {overdueStudents} student accounts currently have pending
                      fees past their due date.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex gap-3">
                  <TrendingUp
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Collection performance
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      Current collection rate is {collectionRate}%. Continue
                      prioritizing partial-payment accounts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <Sparkles
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-blue-800">
                      Recommended automation
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      In the production version, AI can prioritize fee reminders
                      based on due dates, payment history and student risk
                      signals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex gap-3">
                  <User size={18} className="mt-0.5 shrink-0 text-slate-600" />

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Fully paid students
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {fullyPaidStudents} students have completed their current
                      fee obligation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAI(false)}
                className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
              >
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="no-print fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl">
          <CheckCircle2 size={18} className="text-emerald-400" />
          {toast}
        </div>
      )}

      {/* ========================================================= */}
      {/* PRINT-ONLY RECEIPT DOCUMENT                              */}
      {/* ========================================================= */}

      {selectedPayment && (
        <div className="receipt-print-area">
          {/* OFFICE COPY */}
          <div className="receipt-copy">
            <ReceiptHeader copyType="OFFICE COPY" payment={selectedPayment} />

            <ReceiptDetails payment={selectedPayment} />

            <ReceiptAmountSection payment={selectedPayment} />

            <ReceiptFooter office />
          </div>

          <div className="receipt-cut-line">
            <span>✂ CUT HERE</span>
          </div>

          {/* STUDENT COPY */}
          <div className="receipt-copy">
            <ReceiptHeader copyType="STUDENT COPY" payment={selectedPayment} />

            <ReceiptDetails payment={selectedPayment} />

            <ReceiptAmountSection payment={selectedPayment} />

            <ReceiptFooter office={false} />
          </div>
        </div>
      )}
    </>
  );
}

function ReceiptHeader({
  copyType,
  payment,
}: {
  copyType: string;
  payment: Payment;
}) {
  return (
    <div>
      <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-black tracking-wide text-slate-900">
            SAGAR CLASSES
          </h1>

          <p className="mt-1 text-sm font-bold text-slate-700">
            EduManage Coaching Institute
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Education • Excellence • Success
          </p>
        </div>

        <div className="text-right">
          <div className="inline-block border-2 border-slate-900 px-4 py-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
              {copyType}
            </p>
          </div>

          <p className="mt-3 text-xs font-semibold text-slate-500">
            PAYMENT RECEIPT
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 border-b border-slate-300 pb-5">
        <ReceiptField
          label="Receipt Number"
          value={payment.physicalReceiptNo}
        />

        <ReceiptField label="Payment ID" value={payment.id} right />

        <ReceiptField label="Payment Date" value={formatDate(payment.date)} />

        <ReceiptField label="Payment Method" value={payment.method} right />
      </div>
    </div>
  );
}

function ReceiptDetails({ payment }: { payment: Payment }) {
  return (
    <div className="mt-5">
      <div className="mb-3 border-b border-slate-300 pb-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-700">
          Student Information
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <ReceiptField label="Student Name" value={payment.studentName} />

        <ReceiptField label="Student ID" value={payment.studentId} right />

        <ReceiptField label="Course" value={payment.course} />

        <ReceiptField label="Batch" value={payment.batch} right />
      </div>
    </div>
  );
}

function ReceiptAmountSection({ payment }: { payment: Payment }) {
  return (
    <div className="mt-6">
      <div className="border border-slate-900">
        <div className="grid grid-cols-3 border-b border-slate-900 bg-slate-100">
          <div className="border-r border-slate-900 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Previous Paid
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {formatCurrency(payment.previousPaid)}
            </p>
          </div>

          <div className="border-r border-slate-900 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Amount Received
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {formatCurrency(payment.amount)}
            </p>
          </div>

          <div className="p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Balance Due
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {formatCurrency(payment.remainingBalance)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Amount Received
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-700">
              {numberToWords(payment.amount)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Total Received
            </p>

            <p className="mt-1 text-xl font-black text-slate-900">
              {formatCurrency(payment.amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptFooter({ office }: { office: boolean }) {
  return (
    <div className="mt-7">
      <div className="grid grid-cols-2 gap-16">
        <div className="pt-8">
          <div className="border-t border-slate-900 pt-2">
            <p className="text-xs font-bold text-slate-700">
              Student / Parent Signature
            </p>
          </div>
        </div>

        <div className="pt-8">
          <div className="border-t border-slate-900 pt-2">
            <p className="text-xs font-bold text-slate-700">
              Authorized Signatory
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-300 pt-3 text-center">
        <p className="text-[10px] font-semibold text-slate-600">
          Thank you for your payment.
        </p>

        <p className="mt-1 text-[9px] text-slate-400">
          This is a computer-generated receipt and does not require a physical
          stamp unless required by institute policy.
        </p>

        {office && (
          <p className="mt-1 text-[9px] font-bold text-slate-500">
            OFFICE COPY — Retain this copy for institute records.
          </p>
        )}

        {!office && (
          <p className="mt-1 text-[9px] font-bold text-slate-500">
            STUDENT COPY — Please retain this copy for your records.
          </p>
        )}
      </div>
    </div>
  );
}

function ReceiptField({
  label,
  value,
  right = false,
}: {
  label: string;
  value: string;
  right?: boolean;
}) {
  return (
    <div className={right ? "text-right" : ""}>
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

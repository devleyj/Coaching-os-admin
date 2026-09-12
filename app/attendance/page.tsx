"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileText,
  Fingerprint,
  History,
  MessageCircle,
  MoreHorizontal,
  Plus,
  RefreshCw,
  RotateCcw,
  ScanFace,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserX,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";

import Slidebar from "../components/Slidebar";
import {
  getCollection,
  setCollection,
  subscribeToStore,
} from "../data/store";

type AttendanceStatus = "Present" | "Absent" | "Late" | "Leave";

type AttendanceMethod =
  | "Face Scan"
  | "Card Tap"
  | "Fingerprint"
  | "Manual";

type AttendanceRecord = {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  batch: string;
  date: string;
  checkIn: string;
  status: AttendanceStatus;
  method: AttendanceMethod;
  remarks: string;
  whatsappSent: boolean;
};

type Student = {
  id: string;
  name: string;
  course: string;
  batch: string;
};

type NotificationRecord = {
  id: string;
  type: "attendance";
  title: string;
  message: string;
  studentId: string;
  studentName: string;
  batch: string;
  date: string;
  attendanceId: string;
  status: AttendanceStatus;
  read: boolean;
  createdAt: string;
};

const fallbackStudents: Student[] = [
  {
    id: "STU-1001",
    name: "Aarav Mehta",
    course: "JEE Preparation",
    batch: "JEE Advanced",
  },
  {
    id: "STU-1002",
    name: "Riya Sharma",
    course: "NEET Preparation",
    batch: "NEET 2027",
  },
  {
    id: "STU-1003",
    name: "Kabir Patel",
    course: "JEE Preparation",
    batch: "JEE Main",
  },
  {
    id: "STU-1004",
    name: "Ananya Singh",
    course: "NEET Preparation",
    batch: "NEET 2027",
  },
  {
    id: "STU-1005",
    name: "Vivaan Joshi",
    course: "JEE Preparation",
    batch: "JEE Advanced",
  },
  {
    id: "STU-1006",
    name: "Ishita Rao",
    course: "NEET Preparation",
    batch: "NEET 2027",
  },
  {
    id: "STU-1007",
    name: "Aditya Shah",
    course: "JEE Preparation",
    batch: "JEE Main",
  },
  {
    id: "STU-1008",
    name: "Meera Kapoor",
    course: "Foundation",
    batch: "Foundation 2027",
  },
  {
    id: "STU-1009",
    name: "Arjun Malhotra",
    course: "Foundation",
    batch: "Foundation 2027",
  },
  {
    id: "STU-1010",
    name: "Diya Agarwal",
    course: "JEE Preparation",
    batch: "JEE Advanced",
  },
  {
    id: "STU-1011",
    name: "Reyansh Gupta",
    course: "JEE Preparation",
    batch: "JEE Main",
  },
  {
    id: "STU-1012",
    name: "Sara Khan",
    course: "NEET Preparation",
    batch: "NEET 2027",
  },
];

const initialAttendance: AttendanceRecord[] = [
  {
    id: "ATT-1001",
    studentId: "STU-1001",
    studentName: "Aarav Mehta",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    date: "2026-09-11",
    checkIn: "08:52",
    status: "Present",
    method: "Face Scan",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1002",
    studentId: "STU-1002",
    studentName: "Riya Sharma",
    course: "NEET Preparation",
    batch: "NEET 2027",
    date: "2026-09-11",
    checkIn: "09:04",
    status: "Late",
    method: "Fingerprint",
    remarks: "Arrived 4 minutes late.",
    whatsappSent: true,
  },
  {
    id: "ATT-1003",
    studentId: "STU-1003",
    studentName: "Kabir Patel",
    course: "JEE Preparation",
    batch: "JEE Main",
    date: "2026-09-11",
    checkIn: "08:48",
    status: "Present",
    method: "Card Tap",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1004",
    studentId: "STU-1004",
    studentName: "Ananya Singh",
    course: "NEET Preparation",
    batch: "NEET 2027",
    date: "2026-09-11",
    checkIn: "—",
    status: "Absent",
    method: "Manual",
    remarks: "No attendance recorded.",
    whatsappSent: false,
  },
  {
    id: "ATT-1005",
    studentId: "STU-1005",
    studentName: "Vivaan Joshi",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    date: "2026-09-11",
    checkIn: "08:56",
    status: "Present",
    method: "Face Scan",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1006",
    studentId: "STU-1006",
    studentName: "Ishita Rao",
    course: "NEET Preparation",
    batch: "NEET 2027",
    date: "2026-09-11",
    checkIn: "—",
    status: "Leave",
    method: "Manual",
    remarks: "Approved medical leave.",
    whatsappSent: true,
  },
  {
    id: "ATT-1007",
    studentId: "STU-1007",
    studentName: "Aditya Shah",
    course: "JEE Preparation",
    batch: "JEE Main",
    date: "2026-09-11",
    checkIn: "09:13",
    status: "Late",
    method: "Card Tap",
    remarks: "Late arrival.",
    whatsappSent: true,
  },
  {
    id: "ATT-1008",
    studentId: "STU-1008",
    studentName: "Meera Kapoor",
    course: "Foundation",
    batch: "Foundation 2027",
    date: "2026-09-11",
    checkIn: "08:47",
    status: "Present",
    method: "Fingerprint",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1009",
    studentId: "STU-1009",
    studentName: "Arjun Malhotra",
    course: "Foundation",
    batch: "Foundation 2027",
    date: "2026-09-11",
    checkIn: "—",
    status: "Absent",
    method: "Manual",
    remarks: "No attendance recorded.",
    whatsappSent: false,
  },
  {
    id: "ATT-1010",
    studentId: "STU-1010",
    studentName: "Diya Agarwal",
    course: "JEE Preparation",
    batch: "JEE Advanced",
    date: "2026-09-11",
    checkIn: "08:50",
    status: "Present",
    method: "Face Scan",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1011",
    studentId: "STU-1011",
    studentName: "Reyansh Gupta",
    course: "JEE Preparation",
    batch: "JEE Main",
    date: "2026-09-11",
    checkIn: "09:08",
    status: "Late",
    method: "Fingerprint",
    remarks: "",
    whatsappSent: true,
  },
  {
    id: "ATT-1012",
    studentId: "STU-1012",
    studentName: "Sara Khan",
    course: "NEET Preparation",
    batch: "NEET 2027",
    date: "2026-09-11",
    checkIn: "08:59",
    status: "Present",
    method: "Card Tap",
    remarks: "",
    whatsappSent: true,
  },
];

const statusClasses: Record<AttendanceStatus, string> = {
  Present: "bg-emerald-50 text-emerald-700",
  Absent: "bg-red-50 text-red-700",
  Late: "bg-amber-50 text-amber-700",
  Leave: "bg-blue-50 text-blue-700",
};

const methodClasses: Record<AttendanceMethod, string> = {
  "Face Scan": "bg-violet-50 text-violet-700",
  "Card Tap": "bg-blue-50 text-blue-700",
  Fingerprint: "bg-emerald-50 text-emerald-700",
  Manual: "bg-slate-100 text-slate-700",
};

const getInitial = (name: string) =>
  name.trim().charAt(0).toUpperCase();

const getToday = () => {
  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const formatDate = (value: string) => {
  if (!value) return "—";

  return new Date(`${value}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatShortDate = (value: string) => {
  if (!value) return "—";

  return new Date(`${value}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
    }
  );
};

const methodIcon = (method: AttendanceMethod) => {
  if (method === "Face Scan") {
    return <ScanFace size={14} />;
  }

  if (method === "Card Tap") {
    return <CreditCard size={14} />;
  }

  if (method === "Fingerprint") {
    return <Fingerprint size={14} />;
  }

  return <ClipboardCheck size={14} />;
};

export default function AttendancePage() {
  const [students, setStudents] =
    useState<Student[]>(fallbackStudents);

  const [attendance, setAttendance] =
    useState<AttendanceRecord[]>([]);

  const [studentsHydrated, setStudentsHydrated] =
    useState(false);

  const [attendanceHydrated, setAttendanceHydrated] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState("2026-09-11");

  const [searchQuery, setSearchQuery] = useState("");

  const [batchFilter, setBatchFilter] =
    useState("All");

  const [courseFilter, setCourseFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [methodFilter, setMethodFilter] =
    useState("All");

  const [sortOrder, setSortOrder] =
    useState<"name" | "status" | "checkIn">("name");

  const [page, setPage] = useState(1);

  const rowsPerPage = 8;

  const [selectedRecord, setSelectedRecord] =
    useState<AttendanceRecord | null>(null);

  const [openActionMenu, setOpenActionMenu] =
    useState<string | null>(null);

  const [showMarkModal, setShowMarkModal] =
    useState(false);

  const [showBulkModal, setShowBulkModal] =
    useState(false);

  const [showAIModal, setShowAIModal] =
    useState(false);

  const [showHistoryModal, setShowHistoryModal] =
    useState(false);

  const [showDeviceModal, setShowDeviceModal] =
    useState(false);

  const [showLeaveModal, setShowLeaveModal] =
    useState(false);

  const [showCorrectionModal, setShowCorrectionModal] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const [selectedStudents, setSelectedStudents] =
    useState<string[]>([]);

  const [historyStudent, setHistoryStudent] =
    useState<Student | null>(null);

  const [correctionRecord, setCorrectionRecord] =
    useState<AttendanceRecord | null>(null);

  const [markForm, setMarkForm] = useState({
    studentId: students[0].id,
    status: "Present" as AttendanceStatus,
    method: "Manual" as AttendanceMethod,
    checkIn: "09:00",
    remarks: "",
  });

  const [bulkBatch, setBulkBatch] =
    useState("JEE Advanced");

  const [bulkStatus, setBulkStatus] =
    useState<AttendanceStatus>("Present");

  const [leaveStudentId, setLeaveStudentId] =
    useState(students[0].id);

  const [leaveReason, setLeaveReason] =
    useState("");

  useEffect(() => {
    const storedStudents = getCollection<Student>("students");
    const activeStudents =
      storedStudents.length > 0
        ? storedStudents
        : fallbackStudents;

    setStudents(activeStudents);
    setStudentsHydrated(true);

    const storedAttendance =
      getCollection<AttendanceRecord>("attendance");

    const activeStudentIds = new Set(
      activeStudents.map((student) => student.id),
    );

    const seededAttendance = initialAttendance.filter((record) =>
      activeStudentIds.has(record.studentId),
    );

    setAttendance(
      storedAttendance.length > 0
        ? storedAttendance
        : seededAttendance,
    );
    setAttendanceHydrated(true);

    return subscribeToStore(() => {
      const nextStudents = getCollection<Student>("students");
      if (nextStudents.length > 0) {
        setStudents(nextStudents);
      }

      const nextAttendance =
        getCollection<AttendanceRecord>("attendance");

      setAttendance((current) => {
        const currentJson = JSON.stringify(current);
        const nextJson = JSON.stringify(nextAttendance);

        return currentJson === nextJson
          ? current
          : nextAttendance;
      });
    });
  }, []);

  useEffect(() => {
    if (!studentsHydrated) return;

    const storedStudents = getCollection<Student>("students");
    if (storedStudents.length === 0) {
      setCollection("students", students);
    }
  }, [students, studentsHydrated]);

  useEffect(() => {
    if (!attendanceHydrated) return;

    const storedAttendance =
      getCollection<AttendanceRecord>("attendance");

    if (
      JSON.stringify(storedAttendance) !==
      JSON.stringify(attendance)
    ) {
      setCollection("attendance", attendance);
    }
  }, [attendance, attendanceHydrated]);

  const batches = useMemo(
    () =>
      Array.from(
        new Set(students.map((item) => item.batch))
      ).sort(),
    [students]
  );

  const courses = useMemo(
    () =>
      Array.from(
        new Set(students.map((item) => item.course))
      ).sort(),
    [students]
  );

  const stats = useMemo(() => {
    const dayRecords = attendance.filter(
      (item) => item.date === selectedDate
    );

    const present = dayRecords.filter(
      (item) => item.status === "Present"
    ).length;

    const absent = dayRecords.filter(
      (item) => item.status === "Absent"
    ).length;

    const late = dayRecords.filter(
      (item) => item.status === "Late"
    ).length;

    const leave = dayRecords.filter(
      (item) => item.status === "Leave"
    ).length;

    const marked = dayRecords.filter(
      (item) =>
        item.status === "Present" ||
        item.status === "Late" ||
        item.status === "Leave"
    ).length;

    const unmarked = Math.max(
      students.length - dayRecords.length,
      0
    );

    const percentage =
      students.length > 0
        ? Math.round(
            ((present + late) / students.length) *
              100
          )
        : 0;

    return {
      total: students.length,
      records: dayRecords.length,
      present,
      absent,
      late,
      leave,
      marked,
      unmarked,
      percentage,
    };
  }, [attendance, selectedDate]);

  const filteredAttendance = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const result = attendance.filter((item) => {
      const matchesDate = item.date === selectedDate;

      const matchesSearch =
        !query ||
        item.studentName.toLowerCase().includes(query) ||
        item.studentId.toLowerCase().includes(query) ||
        item.batch.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query);

      const matchesBatch =
        batchFilter === "All" ||
        item.batch === batchFilter;

      const matchesCourse =
        courseFilter === "All" ||
        item.course === courseFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" ||
        item.method === methodFilter;

      return (
        matchesDate &&
        matchesSearch &&
        matchesBatch &&
        matchesCourse &&
        matchesStatus &&
        matchesMethod
      );
    });

    return result.sort((a, b) => {
      if (sortOrder === "status") {
        return a.status.localeCompare(b.status);
      }

      if (sortOrder === "checkIn") {
        return a.checkIn.localeCompare(b.checkIn);
      }

      return a.studentName.localeCompare(b.studentName);
    });
  }, [
    attendance,
    selectedDate,
    searchQuery,
    batchFilter,
    courseFilter,
    statusFilter,
    methodFilter,
    sortOrder,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAttendance.length / rowsPerPage
    )
  );

  const safePage = Math.min(page, totalPages);

  const startIndex =
    (safePage - 1) * rowsPerPage;

  const paginatedAttendance =
    filteredAttendance.slice(
      startIndex,
      startIndex + rowsPerPage
    );

  const selectedStudent = students.find(
    (student) =>
      student.id === markForm.studentId
  );

  const historyRecords = useMemo(() => {
    if (!historyStudent) return [];

    return attendance
      .filter(
        (item) =>
          item.studentId === historyStudent.id
      )
      .sort((a, b) =>
        b.date.localeCompare(a.date)
      );
  }, [attendance, historyStudent]);

  const historyStats = useMemo(() => {
    if (!historyStudent) {
      return {
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
        percentage: 0,
      };
    }

    const records = attendance.filter(
      (item) =>
        item.studentId === historyStudent.id
    );

    const present = records.filter(
      (item) =>
        item.status === "Present" ||
        item.status === "Late"
    ).length;

    const absent = records.filter(
      (item) => item.status === "Absent"
    ).length;

    const late = records.filter(
      (item) => item.status === "Late"
    ).length;

    return {
      total: records.length,
      present,
      absent,
      late,
      percentage:
        records.length > 0
          ? Math.round(
              (present / records.length) * 100
            )
          : 0,
    };
  }, [attendance, historyStudent]);

  const aiRiskStudents = useMemo(() => {
    return students
      .map((student) => {
        const records = attendance.filter(
          (item) =>
            item.studentId === student.id
        );

        const absent = records.filter(
          (item) => item.status === "Absent"
        ).length;

        const late = records.filter(
          (item) => item.status === "Late"
        ).length;

        const attended = records.filter(
          (item) =>
            item.status === "Present" ||
            item.status === "Late"
        ).length;

        const percentage =
          records.length > 0
            ? Math.round(
                (attended / records.length) * 100
              )
            : 100;

        let risk: "High" | "Medium" | "Low" =
          "Low";

        if (
          percentage < 70 ||
          absent >= 2
        ) {
          risk = "High";
        } else if (
          percentage < 85 ||
          late >= 2
        ) {
          risk = "Medium";
        }

        return {
          ...student,
          percentage,
          absent,
          late,
          risk,
        };
      })
      .filter((student) => student.risk !== "Low")
      .sort((a, b) => {
        const riskWeight = {
          High: 3,
          Medium: 2,
          Low: 1,
        };

        return (
          riskWeight[b.risk] -
          riskWeight[a.risk]
        );
      });
  }, [attendance]);

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2600);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setBatchFilter("All");
    setCourseFilter("All");
    setStatusFilter("All");
    setMethodFilter("All");
    setSortOrder("name");
    setPage(1);
  };

  const openMarkModal = () => {
    setMarkForm({
      studentId: students[0].id,
      status: "Present",
      method: "Manual",
      checkIn: "09:00",
      remarks: "",
    });

    setShowMarkModal(true);
  };

  const createAttendanceId = (
    records: AttendanceRecord[]
  ) => {
    const highest = Math.max(
      0,
      ...records.map((item) => {
        const number = Number(
          item.id.replace("ATT-", "")
        );

        return Number.isFinite(number)
          ? number
          : 0;
      })
    );

    return `ATT-${String(
      highest + 1
    ).padStart(4, "0")}`;
  };

  const createAttendanceNotification = (
    record: AttendanceRecord,
  ) => {
    if (
      record.status !== "Absent" &&
      record.status !== "Late" &&
      record.status !== "Leave"
    ) {
      return;
    }

    const notifications =
      getCollection<NotificationRecord>("notifications");

    const notificationId =
      `NTF-ATT-${record.id}-${record.status.toUpperCase()}`;

    const alreadyExists = notifications.some(
      (item) => String(item.id) === notificationId,
    );

    if (alreadyExists) return;

    const statusLabel =
      record.status === "Absent"
        ? "Absent"
        : record.status === "Late"
          ? "Late"
          : "Leave";

    const message =
      record.status === "Absent"
        ? `${record.studentName} was marked absent for ${record.batch}.`
        : record.status === "Late"
          ? `${record.studentName} was marked late for ${record.batch}.`
          : `${record.studentName}'s leave was recorded for ${record.batch}.`;

    const notification: NotificationRecord = {
      id: notificationId,
      type: "attendance",
      title: `Attendance: ${statusLabel}`,
      message,
      studentId: record.studentId,
      studentName: record.studentName,
      batch: record.batch,
      date: record.date,
      attendanceId: record.id,
      status: record.status,
      read: false,
      createdAt: new Date().toISOString(),
    };

    setCollection("notifications", [
      notification,
      ...notifications,
    ]);
  };

  const handleMarkAttendance = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const student = students.find(
      (item) =>
        item.id === markForm.studentId
    );

    if (!student) return;

    const existing = attendance.find(
      (item) =>
        item.studentId === student.id &&
        item.date === selectedDate
    );

    const nextRecord: AttendanceRecord = existing
      ? {
          ...existing,
          status: markForm.status,
          method: markForm.method,
          checkIn:
            markForm.status === "Absent" ||
            markForm.status === "Leave"
              ? "—"
              : markForm.checkIn,
          remarks: markForm.remarks.trim(),
          whatsappSent:
            markForm.status === "Absent" ||
            markForm.status === "Leave"
              ? false
              : existing.whatsappSent,
        }
      : {
          id: createAttendanceId(attendance),
          studentId: student.id,
          studentName: student.name,
          course: student.course,
          batch: student.batch,
          date: selectedDate,
          checkIn:
            markForm.status === "Absent" ||
            markForm.status === "Leave"
              ? "—"
              : markForm.checkIn,
          status: markForm.status,
          method: markForm.method,
          remarks: markForm.remarks.trim(),
          whatsappSent:
            markForm.status === "Present" ||
            markForm.status === "Late"
              ? true
              : false,
        };

    const nextAttendance = existing
      ? attendance.map((item) =>
          item.id === existing.id ? nextRecord : item
        )
      : [nextRecord, ...attendance];

    setAttendance(nextAttendance);
    setCollection("attendance", nextAttendance);
    createAttendanceNotification(nextRecord);

    setShowMarkModal(false);
    setPage(1);
    showToast(
      "Attendance saved successfully."
    );
  };

  const updateStatus = (
    id: string,
    status: AttendanceStatus
  ) => {
    const currentRecord = attendance.find(
      (item) => item.id === id,
    );

    if (!currentRecord) return;

    const nextRecord: AttendanceRecord = {
      ...currentRecord,
      status,
      checkIn:
        status === "Absent" ||
        status === "Leave"
          ? "—"
          : currentRecord.checkIn === "—"
            ? "09:00"
            : currentRecord.checkIn,
      method: currentRecord.method || "Manual",
    };

    const nextAttendance = attendance.map((item) =>
      item.id === id ? nextRecord : item
    );

    setAttendance(nextAttendance);
    setCollection("attendance", nextAttendance);
    createAttendanceNotification(nextRecord);

    setOpenActionMenu(null);

    showToast(
      `Attendance marked ${status.toLowerCase()}.`
    );
  };

  const sendWhatsApp = (
    record: AttendanceRecord
  ) => {
    setAttendance((current) =>
      current.map((item) =>
        item.id === record.id
          ? {
              ...item,
              whatsappSent: true,
            }
          : item
      )
    );

    setOpenActionMenu(null);

    showToast(
      `WhatsApp notification queued for ${record.studentName}.`
    );
  };

  const handleBulkAttendance = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const studentsInBatch =
      students.filter(
        (student) =>
          student.batch === bulkBatch
      );

    setAttendance((current) => {
      const updated = [...current];

      studentsInBatch.forEach((student) => {
        const existingIndex =
          updated.findIndex(
            (item) =>
              item.studentId === student.id &&
              item.date === selectedDate
          );

        if (existingIndex >= 0) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            status: bulkStatus,
            method: "Manual",
            checkIn:
              bulkStatus === "Absent" ||
              bulkStatus === "Leave"
                ? "—"
                : "09:00",
            whatsappSent:
              bulkStatus === "Present" ||
              bulkStatus === "Late",
          };
        } else {
          updated.unshift({
            id: createAttendanceId(updated),
            studentId: student.id,
            studentName: student.name,
            course: student.course,
            batch: student.batch,
            date: selectedDate,
            checkIn:
              bulkStatus === "Absent" ||
              bulkStatus === "Leave"
                ? "—"
                : "09:00",
            status: bulkStatus,
            method: "Manual",
            remarks: "",
            whatsappSent:
              bulkStatus === "Present" ||
              bulkStatus === "Late",
          });
        }
      });

      return updated;
    });

    setShowBulkModal(false);
    setPage(1);

    showToast(
      `${studentsInBatch.length} students updated.`
    );
  };

  const toggleStudentSelection = (
    studentId: string
  ) => {
    setSelectedStudents((current) =>
      current.includes(studentId)
        ? current.filter(
            (id) => id !== studentId
          )
        : [...current, studentId]
    );
  };

  const toggleSelectAll = () => {
    const visibleIds =
      paginatedAttendance.map(
        (record) => record.studentId
      );

    const allSelected = visibleIds.every(
      (id) => selectedStudents.includes(id)
    );

    if (allSelected) {
      setSelectedStudents((current) =>
        current.filter(
          (id) => !visibleIds.includes(id)
        )
      );
    } else {
      setSelectedStudents((current) =>
        Array.from(
          new Set([
            ...current,
            ...visibleIds,
          ])
        )
      );
    }
  };

  const applySelectedStatus = (
    status: AttendanceStatus
  ) => {
    if (selectedStudents.length === 0) {
      showToast(
        "Select at least one student first."
      );
      return;
    }

    const nextAttendance = attendance.map((item) =>
      item.date === selectedDate &&
      selectedStudents.includes(item.studentId)
        ? {
            ...item,
            status,
            checkIn:
              status === "Absent" ||
              status === "Leave"
                ? "—"
                : item.checkIn === "—"
                  ? "09:00"
                  : item.checkIn,
          }
        : item
    );

    setAttendance(nextAttendance);

    nextAttendance
      .filter(
        (item) =>
          item.date === selectedDate &&
          selectedStudents.includes(item.studentId)
      )
      .forEach(createAttendanceNotification);

    showToast(
      `${selectedStudents.length} selected students updated.`
    );

    setSelectedStudents([]);
  };

  const exportAttendance = () => {
    const header = [
      "Attendance ID",
      "Student ID",
      "Student Name",
      "Course",
      "Batch",
      "Date",
      "Check In",
      "Status",
      "Method",
      "Remarks",
      "WhatsApp",
    ];

    const rows = filteredAttendance.map(
      (item) => [
        item.id,
        item.studentId,
        item.studentName,
        item.course,
        item.batch,
        item.date,
        item.checkIn,
        item.status,
        item.method,
        item.remarks,
        item.whatsappSent
          ? "Sent"
          : "Not Sent",
      ]
    );

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = `attendance-${selectedDate}.csv`;
    link.click();

    URL.revokeObjectURL(url);

    showToast("Attendance CSV exported.");
  };

  const openHistory = (studentId: string) => {
    const student = students.find(
      (item) => item.id === studentId
    );

    if (!student) return;

    setHistoryStudent(student);
    setShowHistoryModal(true);
    setOpenActionMenu(null);
  };

  const saveCorrection = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!correctionRecord) return;

    setAttendance((current) =>
      current.map((item) =>
        item.id === correctionRecord.id
          ? correctionRecord
          : item
      )
    );

    setCorrectionRecord(null);
    setShowCorrectionModal(false);

    showToast(
      "Attendance correction saved."
    );
  };

  const approveLeave = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const student = students.find(
      (item) =>
        item.id === leaveStudentId
    );

    if (!student) return;

    const existing = attendance.find(
      (item) =>
        item.studentId === student.id &&
        item.date === selectedDate
    );

    const nextRecord: AttendanceRecord = existing
      ? {
          ...existing,
          status: "Leave",
          method: "Manual",
          checkIn: "—",
          remarks: leaveReason || "Leave approved.",
          whatsappSent: true,
        }
      : {
          id: createAttendanceId(attendance),
          studentId: student.id,
          studentName: student.name,
          course: student.course,
          batch: student.batch,
          date: selectedDate,
          checkIn: "—",
          status: "Leave",
          method: "Manual",
          remarks: leaveReason || "Leave approved.",
          whatsappSent: true,
        };

    const nextAttendance = existing
      ? attendance.map((item) =>
          item.id === existing.id ? nextRecord : item
        )
      : [nextRecord, ...attendance];

    setAttendance(nextAttendance);
    createAttendanceNotification(nextRecord);

    setLeaveReason("");
    setShowLeaveModal(false);

    showToast(
      `${student.name}'s leave was approved.`
    );
  };

  const moveDate = (days: number) => {
    const date = new Date(
      `${selectedDate}T00:00:00`
    );

    date.setDate(
      date.getDate() + days
    );

    const nextDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

    setSelectedDate(nextDate);
    setPage(1);
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

      <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-[1700px]">
          {/* HEADER */}
          <PageHeader
  title="Attendance Management"
  description="Manage attendance, devices, notifications, analytics and AI-powered attendance insights."
  icon={<ClipboardCheck size={20} />}
  actions={
    <>
      <button
        type="button"
        onClick={() => setShowAIModal(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 shadow-sm transition hover:border-purple-300 hover:bg-purple-100"
      >
        <Sparkles size={16} />
        AI Insights
      </button>

      <button
        type="button"
        onClick={exportAttendance}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        <Download size={16} />
        Export
      </button>

      <button
        type="button"
        onClick={() => setShowBulkModal(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        <Users size={16} />
        Bulk Mark
      </button>

      <button
        type="button"
        onClick={openMarkModal}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        <Plus size={17} />
        Mark Attendance
      </button>
    </>
  }
/>

          {/* DATE CONTROL */}
          <div
            className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Attendance Date
                </p>

                <p className="text-sm font-bold text-slate-900">
                  {formatDate(selectedDate)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:ml-auto">
              <button
                type="button"
                onClick={() => moveDate(-1)}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
              >
                <ChevronLeft size={18} />
              </button>

              <input
                type="date"
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(
                    event.target.value
                  );
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => moveDate(1)}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
              >
                <ChevronRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedDate(getToday());
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Today
              </button>

              <button
                type="button"
                onClick={() =>
                  showToast(
                    "Attendance data refreshed."
                  )
                }
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
              >
                <RefreshCw size={17} />
              </button>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Students
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
                  <p className="text-sm font-medium text-slate-500">
                    Present
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-600">
                    {stats.present}
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
                  <p className="text-sm font-medium text-slate-500">
                    Absent
                  </p>

                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {stats.absent}
                  </p>
                </div>

                <div className="rounded-xl bg-red-50 p-3 text-red-600">
                  <UserX size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Late
                  </p>

                  <p className="mt-2 text-2xl font-bold text-amber-600">
                    {stats.late}
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Clock3 size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Leave
                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-600">
                    {stats.leave}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <FileText size={21} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Attendance Rate
                  </p>

                  <p className="mt-2 text-2xl font-bold text-violet-600">
                    {stats.percentage}%
                  </p>
                </div>

                <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                  <BarChart3 size={21} />
                </div>
              </div>
            </div>
          </div>

          {/* ATTENDANCE PROGRESS */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Daily Attendance Progress
                </p>

                <p className="text-xs font-medium text-slate-500">
                  {stats.marked} of{" "}
                  {stats.total} students have
                  attendance status.
                </p>
              </div>

              <span className="text-sm font-bold text-blue-600">
                {stats.percentage}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${stats.percentage}%`,
                }}
              />
            </div>

            {stats.unmarked > 0 && (
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-amber-700">
                <AlertTriangle size={14} />
                {stats.unmarked} student
                {stats.unmarked !== 1
                  ? "s"
                  : ""} still need attendance
                marking.
              </div>
            )}
          </div>

          {/* AI COMMAND CENTER */}
          <div className="mb-6 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-blue-50 p-5 shadow-sm">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm">
                  <Sparkles size={22} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-slate-900">
                      AI Attendance Command Center
                    </h2>

                    <span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                      AI Ready
                    </span>
                  </div>

                  <p className="mt-1 max-w-3xl text-sm font-medium text-slate-600">
                    Detect attendance risks, identify
                    repeated absences, analyze late
                    arrivals and recommend follow-up
                    actions.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAIModal(true)
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-violet-700"
              >
                <Sparkles size={17} />
                Analyze Attendance
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white bg-white/80 p-4">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertTriangle size={17} />
                  <span className="text-sm font-bold">
                    High Risk
                  </span>
                </div>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {
                    aiRiskStudents.filter(
                      (student) =>
                        student.risk === "High"
                    ).length
                  }
                </p>

                <p className="text-xs font-medium text-slate-500">
                  Students needing attention
                </p>
              </div>

              <div className="rounded-xl border border-white bg-white/80 p-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <Clock3 size={17} />
                  <span className="text-sm font-bold">
                    Late Pattern
                  </span>
                </div>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.late}
                </p>

                <p className="text-xs font-medium text-slate-500">
                  Late arrivals today
                </p>
              </div>

              <div className="rounded-xl border border-white bg-white/80 p-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Zap size={17} />
                  <span className="text-sm font-bold">
                    AI Recommendation
                  </span>
                </div>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  Follow up with absent students
                </p>

                <p className="text-xs font-medium text-slate-500">
                  Suggested next action
                </p>
              </div>
            </div>
          </div>

          {/* DEVICE CENTER */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Attendance Devices
                </h2>

                <p className="text-sm font-medium text-slate-500">
                  Monitor attendance capture sources.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDeviceModal(true)
                }
                className="text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                View Devices
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                    <ScanFace size={20} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      Face Recognition
                    </p>

                    <p className="text-xs font-medium text-slate-500">
                      Integration ready
                    </p>
                  </div>

                  <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Ready
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <CreditCard size={20} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      RFID / Card
                    </p>

                    <p className="text-xs font-medium text-slate-500">
                      Integration ready
                    </p>
                  </div>

                  <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Ready
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <Fingerprint size={20} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      Fingerprint
                    </p>

                    <p className="text-xs font-medium text-slate-500">
                      Integration ready
                    </p>
                  </div>

                  <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <div
            className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Attendance Records
                </h2>

                <p className="text-sm font-medium text-slate-500">
                  Search, filter and manage attendance
                  for the selected date.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedStudents.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        applySelectedStatus(
                          "Present"
                        )
                      }
                      className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                    >
                      Mark Present
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        applySelectedStatus(
                          "Absent"
                        )
                      }
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100"
                    >
                      Mark Absent
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedStudents([])
                      }
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                    >
                      Clear Selection
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <RotateCcw size={15} />
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
              <div className="relative xl:col-span-2">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  placeholder="Student name, ID, course or batch..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={batchFilter}
                onChange={(event) => {
                  setBatchFilter(
                    event.target.value
                  );
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Batches
                </option>

                {batches.map((batch) => (
                  <option
                    key={batch}
                    value={batch}
                  >
                    {batch}
                  </option>
                ))}
              </select>

              <select
                value={courseFilter}
                onChange={(event) => {
                  setCourseFilter(
                    event.target.value
                  );
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Courses
                </option>

                {courses.map((course) => (
                  <option
                    key={course}
                    value={course}
                  >
                    {course}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(
                    event.target.value
                  );
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Statuses
                </option>
                <option value="Present">
                  Present
                </option>
                <option value="Absent">
                  Absent
                </option>
                <option value="Late">
                  Late
                </option>
                <option value="Leave">
                  Leave
                </option>
              </select>

              <select
                value={methodFilter}
                onChange={(event) => {
                  setMethodFilter(
                    event.target.value
                  );
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Methods
                </option>
                <option value="Face Scan">
                  Face Scan
                </option>
                <option value="Card Tap">
                  Card Tap
                </option>
                <option value="Fingerprint">
                  Fingerprint
                </option>
                <option value="Manual">
                  Manual
                </option>
              </select>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                Sort:
              </span>

              <button
                type="button"
                onClick={() =>
                  setSortOrder("name")
                }
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  sortOrder === "name"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Name
              </button>

              <button
                type="button"
                onClick={() =>
                  setSortOrder("status")
                }
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  sortOrder === "status"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Status
              </button>

              <button
                type="button"
                onClick={() =>
                  setSortOrder("checkIn")
                }
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  sortOrder === "checkIn"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Check-in
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1400px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    <th className="w-12 px-5 py-4">
                      <input
                        type="checkbox"
                        checked={
                          paginatedAttendance.length >
                            0 &&
                          paginatedAttendance.every(
                            (record) =>
                              selectedStudents.includes(
                                record.studentId
                              )
                          )
                        }
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600"
                      />
                    </th>

                    <th className="px-5 py-4">
                      Student
                    </th>

                    <th className="px-5 py-4">
                      Course / Batch
                    </th>

                    <th className="px-5 py-4">
                      Check In
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4">
                      Method
                    </th>

                    <th className="px-5 py-4">
                      Notification
                    </th>

                    <th className="px-5 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {paginatedAttendance.map(
                    (record) => (
                      <tr
                        key={record.id}
                        className="transition hover:bg-blue-50/40"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        <td className="px-5 py-4">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(
                              record.studentId
                            )}
                            onChange={() =>
                              toggleStudentSelection(
                                record.studentId
                              )
                            }
                            className="h-4 w-4 rounded border-slate-300 text-blue-600"
                          />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                              {getInitial(
                                record.studentName
                              )}
                            </div>

                            <div>
                              <p className="font-bold text-slate-900">
                                {record.studentName}
                              </p>

                              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                                {record.studentId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-800">
                            {record.course}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {record.batch}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-bold text-slate-800">
                            {record.checkIn}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses[record.status]}`}
                          >
                            {record.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold ${methodClasses[record.method]}`}
                          >
                            {methodIcon(
                              record.method
                            )}
                            {record.method}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          {record.whatsappSent ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                              <CheckCircle2
                                size={15}
                              />
                              Sent
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                              <XCircle
                                size={15}
                              />
                              Not Sent
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="relative flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedRecord(
                                  record
                                )
                              }
                              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                            >
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setOpenActionMenu(
                                  openActionMenu ===
                                    record.id
                                    ? null
                                    : record.id
                                )
                              }
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                            >
                              <MoreHorizontal
                                size={17}
                              />
                            </button>

                            {openActionMenu ===
                              record.id && (
                              <div
                                className="absolute right-0 top-11 z-40 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                                onClick={(event) =>
                                  event.stopPropagation()
                                }
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedRecord(
                                      record
                                    )
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  <Eye
                                    size={16}
                                  />
                                  View Details
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setCorrectionRecord(
                                      record
                                    );
                                    setShowCorrectionModal(
                                      true
                                    );
                                    setOpenActionMenu(
                                      null
                                    );
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  <History
                                    size={16}
                                  />
                                  Correct Attendance
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    openHistory(
                                      record.studentId
                                    )
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  <BarChart3
                                    size={16}
                                  />
                                  Student History
                                </button>

                                <div className="my-1 border-t border-slate-100" />

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateStatus(
                                      record.id,
                                      "Present"
                                    )
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                                >
                                  <UserCheck
                                    size={16}
                                  />
                                  Mark Present
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateStatus(
                                      record.id,
                                      "Late"
                                    )
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-amber-700 hover:bg-amber-50"
                                >
                                  <Clock3
                                    size={16}
                                  />
                                  Mark Late
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateStatus(
                                      record.id,
                                      "Absent"
                                    )
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
                                >
                                  <UserX
                                    size={16}
                                  />
                                  Mark Absent
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setLeaveStudentId(
                                      record.studentId
                                    );
                                    setShowLeaveModal(
                                      true
                                    );
                                    setOpenActionMenu(
                                      null
                                    );
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-blue-700 hover:bg-blue-50"
                                >
                                  <FileText
                                    size={16}
                                  />
                                  Mark Leave
                                </button>

                                {!record.whatsappSent && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      sendWhatsApp(
                                        record
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-green-700 hover:bg-green-50"
                                  >
                                    <MessageCircle
                                      size={16}
                                    />
                                    Send WhatsApp
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  )}

                  {paginatedAttendance.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-16 text-center"
                      >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <ClipboardCheck
                            size={22}
                          />
                        </div>

                        <h3 className="mt-4 font-bold text-slate-900">
                          No attendance records
                          found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Try changing the date or
                          filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-500">
                Showing{" "}
                {filteredAttendance.length ===
                0
                  ? 0
                  : startIndex + 1}
                –
                {Math.min(
                  startIndex + rowsPerPage,
                  filteredAttendance.length
                )}{" "}
                of {filteredAttendance.length}
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() =>
                    setPage((current) =>
                      Math.max(
                        1,
                        current - 1
                      )
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    onClick={() =>
                      setPage(pageNumber)
                    }
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
                  disabled={
                    safePage === totalPages
                  }
                  onClick={() =>
                    setPage((current) =>
                      Math.min(
                        totalPages,
                        current + 1
                      )
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM INSIGHTS */}
          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle size={18} />
                <h3 className="font-bold">
                  Needs Attention
                </h3>
              </div>

              <p className="mt-2 text-sm font-medium text-red-800/80">
                {stats.absent} students are
                currently absent and may need
                parent follow-up.
              </p>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("Absent");
                  setPage(1);
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-red-700 shadow-sm"
              >
                View Absent
                <ArrowUp
                  size={14}
                  className="rotate-45"
                />
              </button>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center gap-2 text-amber-700">
                <Clock3 size={18} />
                <h3 className="font-bold">
                  Late Arrivals
                </h3>
              </div>

              <p className="mt-2 text-sm font-medium text-amber-800/80">
                {stats.late} students arrived late
                today.
              </p>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("Late");
                  setPage(1);
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-amber-700 shadow-sm"
              >
                View Late Arrivals
                <ArrowUp
                  size={14}
                  className="rotate-45"
                />
              </button>
            </div>

            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
              <div className="flex items-center gap-2 text-violet-700">
                <Sparkles size={18} />
                <h3 className="font-bold">
                  AI Recommendation
                </h3>
              </div>

              <p className="mt-2 text-sm font-medium text-violet-800/80">
                Prioritize follow-up for students
                with repeated absence or late
                arrival patterns.
              </p>

              <button
                type="button"
                onClick={() =>
                  setShowAIModal(true)
                }
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-violet-700 shadow-sm"
              >
                Open AI Insights
                <Sparkles size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MARK ATTENDANCE MODAL */}
      {showMarkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Mark Attendance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Record or update attendance
                  for {formatDate(selectedDate)}.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowMarkModal(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleMarkAttendance}
              className="space-y-5 p-6"
            >
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Student *
                </span>

                <select
                  value={markForm.studentId}
                  onChange={(event) =>
                    setMarkForm((current) => ({
                      ...current,
                      studentId:
                        event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {students.map(
                    (student) => (
                      <option
                        key={student.id}
                        value={student.id}
                      >
                        {student.name} —{" "}
                        {student.id} —{" "}
                        {student.batch}
                      </option>
                    )
                  )}
                </select>
              </label>

              {selectedStudent && (
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-900">
                    {selectedStudent.name}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {selectedStudent.course} ·{" "}
                    {selectedStudent.batch}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Status
                  </span>

                  <select
                    value={markForm.status}
                    onChange={(event) =>
                      setMarkForm((current) => ({
                        ...current,
                        status:
                          event.target.value as AttendanceStatus,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="Present">
                      Present
                    </option>
                    <option value="Absent">
                      Absent
                    </option>
                    <option value="Late">
                      Late
                    </option>
                    <option value="Leave">
                      Leave
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Attendance Method
                  </span>

                  <select
                    value={markForm.method}
                    onChange={(event) =>
                      setMarkForm((current) => ({
                        ...current,
                        method:
                          event.target.value as AttendanceMethod,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="Manual">
                      Manual
                    </option>
                    <option value="Face Scan">
                      Face Scan
                    </option>
                    <option value="Card Tap">
                      Card Tap
                    </option>
                    <option value="Fingerprint">
                      Fingerprint
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Check-in Time
                  </span>

                  <input
                    type="time"
                    value={markForm.checkIn}
                    disabled={
                      markForm.status ===
                        "Absent" ||
                      markForm.status ===
                        "Leave"
                    }
                    onChange={(event) =>
                      setMarkForm((current) => ({
                        ...current,
                        checkIn:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none disabled:bg-slate-100 focus:border-blue-500"
                  />
                </label>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {formatDate(selectedDate)}
                  </p>
                </div>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Remarks
                </span>

                <textarea
                  rows={3}
                  value={markForm.remarks}
                  onChange={(event) =>
                    setMarkForm((current) => ({
                      ...current,
                      remarks:
                        event.target.value,
                    }))
                  }
                  placeholder="Add an optional attendance remark..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setShowMarkModal(false)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <SaveIcon />
                  Save Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Bulk Mark Attendance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Apply one status to an entire
                  batch.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowBulkModal(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleBulkAttendance}
              className="space-y-5 p-6"
            >
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-bold text-blue-900">
                  {formatDate(selectedDate)}
                </p>

                <p className="mt-1 text-xs font-medium text-blue-700">
                  Existing records will be updated
                  and missing records will be
                  created.
                </p>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Batch
                </span>

                <select
                  value={bulkBatch}
                  onChange={(event) =>
                    setBulkBatch(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                >
                  {batches.map((batch) => (
                    <option
                      key={batch}
                      value={batch}
                    >
                      {batch}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Attendance Status
                </span>

                <select
                  value={bulkStatus}
                  onChange={(event) =>
                    setBulkStatus(
                      event.target.value as AttendanceStatus
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="Present">
                    Present
                  </option>
                  <option value="Absent">
                    Absent
                  </option>
                  <option value="Late">
                    Late
                  </option>
                  <option value="Leave">
                    Leave
                  </option>
                </select>
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setShowBulkModal(false)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <ClipboardCheck
                    size={16}
                  />
                  Apply to Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                  {getInitial(
                    selectedRecord.studentName
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedRecord.studentName}
                  </h2>

                  <p className="text-sm font-semibold text-slate-500">
                    {selectedRecord.studentId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRecord(null)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <InfoBox
                label="Attendance ID"
                value={selectedRecord.id}
              />

              <InfoBox
                label="Date"
                value={formatDate(
                  selectedRecord.date
                )}
              />

              <InfoBox
                label="Check In"
                value={selectedRecord.checkIn}
              />

              <InfoBox
                label="Course"
                value={selectedRecord.course}
              />

              <InfoBox
                label="Batch"
                value={selectedRecord.batch}
              />

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses[selectedRecord.status]}`}
                >
                  {selectedRecord.status}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Attendance Method
                </p>

                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold ${methodClasses[selectedRecord.method]}`}
                >
                  {methodIcon(
                    selectedRecord.method
                  )}
                  {selectedRecord.method}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Notification
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                  {selectedRecord.whatsappSent ? (
                    <>
                      <CheckCircle2
                        size={17}
                        className="text-emerald-600"
                      />
                      WhatsApp notification
                      marked as sent
                    </>
                  ) : (
                    <>
                      <XCircle
                        size={17}
                        className="text-slate-400"
                      />
                      Notification not sent
                    </>
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Remarks
                </p>

                <p className="mt-2 font-semibold text-slate-800">
                  {selectedRecord.remarks ||
                    "No remarks added."}
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setSelectedRecord(null)
                }
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI MODAL */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    AI Attendance Insights
                  </h2>

                  <p className="text-sm font-medium text-slate-500">
                    AI-ready attendance analysis
                    and recommendations.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAIModal(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
                <div className="flex gap-3">
                  <Sparkles
                    size={20}
                    className="mt-0.5 text-violet-600"
                  />

                  <div>
                    <p className="font-bold text-violet-900">
                      AI Summary
                    </p>

                    <p className="mt-1 text-sm font-medium leading-6 text-violet-800">
                      Today&apos;s attendance rate
                      is{" "}
                      <strong>
                        {stats.percentage}%
                      </strong>
                      . The system recommends
                      prioritizing follow-up for
                      absent students and monitoring
                      repeated late arrivals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle size={18} />
                    <p className="font-bold">
                      High Risk Students
                    </p>
                  </div>

                  <div className="mt-3 space-y-2">
                    {aiRiskStudents
                      .filter(
                        (student) =>
                          student.risk ===
                          "High"
                      )
                      .slice(0, 4)
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between rounded-lg bg-white p-3"
                        >
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {student.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {student.batch}
                            </p>
                          </div>

                          <span className="text-xs font-bold text-red-600">
                            {student.percentage}%
                          </span>
                        </div>
                      ))}

                    {aiRiskStudents.filter(
                      (student) =>
                        student.risk === "High"
                    ).length === 0 && (
                      <p className="text-sm font-medium text-red-700">
                        No high-risk students
                        detected.
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Clock3 size={18} />
                    <p className="font-bold">
                      Recommended Actions
                    </p>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg bg-white p-3 text-sm font-semibold text-slate-700">
                      1. Contact students with
                      repeated absences.
                    </div>

                    <div className="rounded-lg bg-white p-3 text-sm font-semibold text-slate-700">
                      2. Notify parents about
                      unexplained absence.
                    </div>

                    <div className="rounded-lg bg-white p-3 text-sm font-semibold text-slate-700">
                      3. Monitor repeated late
                      arrivals.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={18}
                    className="text-emerald-600"
                  />

                  <p className="font-bold text-slate-900">
                    AI Data Safety
                  </p>
                </div>

                <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                  These insights are currently
                  simulated in the frontend. Real AI
                  analysis will be connected through
                  the backend after the attendance
                  database and analytics pipeline are
                  implemented.
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowAIModal(false)
                }
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700"
              >
                Close Insights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT HISTORY MODAL */}
      {showHistoryModal &&
        historyStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
            <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {getInitial(
                      historyStudent.name
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {historyStudent.name}
                    </h2>

                    <p className="text-sm font-medium text-slate-500">
                      {historyStudent.id} ·{" "}
                      {historyStudent.batch}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowHistoryModal(false)
                  }
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 p-6 md:grid-cols-4">
                <MiniStat
                  label="Records"
                  value={historyStats.total}
                />

                <MiniStat
                  label="Present"
                  value={historyStats.present}
                />

                <MiniStat
                  label="Absent"
                  value={historyStats.absent}
                />

                <MiniStat
                  label="Attendance"
                  value={`${historyStats.percentage}%`}
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto px-6 pb-6">
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3">
                          Date
                        </th>

                        <th className="px-4 py-3">
                          Status
                        </th>

                        <th className="px-4 py-3">
                          Check In
                        </th>

                        <th className="px-4 py-3">
                          Method
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {historyRecords.map(
                        (record) => (
                          <tr key={record.id}>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                              {formatDate(
                                record.date
                              )}
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClasses[record.status]}`}
                              >
                                {record.status}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-sm font-bold text-slate-700">
                              {record.checkIn}
                            </td>

                            <td className="px-4 py-3 text-xs font-bold text-slate-600">
                              {record.method}
                            </td>
                          </tr>
                        )
                      )}

                      {historyRecords.length ===
                        0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-10 text-center text-sm text-slate-500"
                          >
                            No attendance history
                            available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* DEVICE MODAL */}
      {showDeviceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Attendance Device Center
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Device monitoring and future
                  integration controls.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDeviceModal(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 p-6">
              {[
                {
                  name: "Face Recognition Terminal",
                  icon: ScanFace,
                  status: "Ready",
                },
                {
                  name: "RFID / Card Reader",
                  icon: CreditCard,
                  status: "Ready",
                },
                {
                  name: "Fingerprint Scanner",
                  icon: Fingerprint,
                  status: "Ready",
                },
              ].map((device) => {
                const Icon = device.icon;

                return (
                  <div
                    key={device.name}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"
                  >
                    <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        {device.name}
                      </p>

                      <p className="text-xs font-medium text-slate-500">
                        Hardware integration
                        placeholder
                      </p>
                    </div>

                    <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      {device.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-200 px-6 py-4">
              <p className="text-xs font-medium leading-5 text-slate-500">
                Real device connectivity will be
                implemented through the backend/device
                gateway. The current controls do not
                communicate with physical hardware.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LEAVE MODAL */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Approve Leave
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Record approved leave for the
                  selected date.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowLeaveModal(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={approveLeave}
              className="space-y-5 p-6"
            >
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Student
                </span>

                <select
                  value={leaveStudentId}
                  onChange={(event) =>
                    setLeaveStudentId(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900"
                >
                  {students.map(
                    (student) => (
                      <option
                        key={student.id}
                        value={student.id}
                      >
                        {student.name} —{" "}
                        {student.batch}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Reason
                </span>

                <textarea
                  rows={4}
                  value={leaveReason}
                  onChange={(event) =>
                    setLeaveReason(
                      event.target.value
                    )
                  }
                  placeholder="Enter leave reason..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setShowLeaveModal(false)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  <Check size={16} />
                  Approve Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CORRECTION MODAL */}
      {showCorrectionModal &&
        correctionRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Correct Attendance
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Update an existing attendance
                    record.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowCorrectionModal(false)
                  }
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={saveCorrection}
                className="space-y-5 p-6"
              >
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="font-bold text-slate-900">
                    {
                      correctionRecord.studentName
                    }
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {
                      correctionRecord.studentId
                    }{" "}
                    ·{" "}
                    {formatDate(
                      correctionRecord.date
                    )}
                  </p>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Status
                  </span>

                  <select
                    value={
                      correctionRecord.status
                    }
                    onChange={(event) =>
                      setCorrectionRecord(
                        (current) =>
                          current
                            ? {
                                ...current,
                                status:
                                  event.target.value as AttendanceStatus,
                              }
                            : current
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900"
                  >
                    <option value="Present">
                      Present
                    </option>
                    <option value="Absent">
                      Absent
                    </option>
                    <option value="Late">
                      Late
                    </option>
                    <option value="Leave">
                      Leave
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Check-in
                  </span>

                  <input
                    type="time"
                    value={
                      correctionRecord.checkIn ===
                      "—"
                        ? "09:00"
                        : correctionRecord.checkIn
                    }
                    disabled={
                      correctionRecord.status ===
                        "Absent" ||
                      correctionRecord.status ===
                        "Leave"
                    }
                    onChange={(event) =>
                      setCorrectionRecord(
                        (current) =>
                          current
                            ? {
                                ...current,
                                checkIn:
                                  event.target
                                    .value,
                              }
                            : current
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 disabled:bg-slate-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Remarks
                  </span>

                  <textarea
                    rows={3}
                    value={
                      correctionRecord.remarks
                    }
                    onChange={(event) =>
                      setCorrectionRecord(
                        (current) =>
                          current
                            ? {
                                ...current,
                                remarks:
                                  event.target
                                    .value,
                              }
                            : current
                      )
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900"
                  />
                </label>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setShowCorrectionModal(
                        false
                      )
                    }
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                  >
                    <Check size={16} />
                    Save Correction
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-2xl">
          <CheckCircle2
            size={18}
            className="text-emerald-400"
          />

          {toast}
        </div>
      )}
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function SaveIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}
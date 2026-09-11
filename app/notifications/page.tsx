"use client";

import { useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import {
  Bell,
  Search,
  Plus,
  Filter,
  X,
  Check,
  CheckCheck,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  Users,
  GraduationCap,
  BookOpen,
  MessageCircle,
  Mail,
  Smartphone,
  Send,
  Megaphone,
  AlertCircle,
  Info,
  CheckCircle2,
  CircleAlert,
  CalendarClock,
  UserRound,
  Layers,
  RefreshCw,
  FileText,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type NotificationStatus =
  | "Draft"
  | "Scheduled"
  | "Sent"
  | "Failed"
  | "Cancelled";

type NotificationType =
  | "General"
  | "Announcement"
  | "Fee Reminder"
  | "Attendance"
  | "Exam"
  | "Class"
  | "Important"
  | "System";

type AudienceType =
  | "All Students"
  | "Specific Batch"
  | "Specific Course"
  | "Teachers"
  | "Staff"
  | "Parents";

type ChannelType = "In-App" | "WhatsApp" | "Email";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  audience: AudienceType;
  target: string;
  channels: ChannelType[];
  status: NotificationStatus;
  scheduledDate: string;
  scheduledTime: string;
  sentDate: string;
  sentTime: string;
  recipients: number;
  readCount: number;
  createdBy: string;
  createdAt: string;
};

/* =========================================================
   INITIAL DATA
========================================================= */

const initialNotifications: Notification[] = [
  {
    id: "NOT-1001",
    title: "Fee Payment Reminder",
    message:
      "Dear parent, your upcoming fee payment is due soon. Please complete the payment before the due date to avoid interruption.",
    type: "Fee Reminder",
    audience: "All Students",
    target: "All Students",
    channels: ["In-App", "WhatsApp"],
    status: "Sent",
    scheduledDate: "2026-09-01",
    scheduledTime: "09:00",
    sentDate: "2026-09-01",
    sentTime: "09:00",
    recipients: 1248,
    readCount: 982,
    createdBy: "Admin",
    createdAt: "2026-08-31",
  },
  {
    id: "NOT-1002",
    title: "JEE Mock Test Tomorrow",
    message:
      "Reminder: JEE Advanced mock test will be conducted tomorrow at 10:00 AM. Students are requested to report 15 minutes early.",
    type: "Exam",
    audience: "Specific Batch",
    target: "JEE Advanced",
    channels: ["In-App", "WhatsApp", "Email"],
    status: "Sent",
    scheduledDate: "2026-09-02",
    scheduledTime: "18:00",
    sentDate: "2026-09-02",
    sentTime: "18:00",
    recipients: 156,
    readCount: 142,
    createdBy: "Admin",
    createdAt: "2026-09-01",
  },
  {
    id: "NOT-1003",
    title: "Attendance Alert",
    message:
      "Attendance has been marked for today's classes. Please check your attendance record in the student portal.",
    type: "Attendance",
    audience: "All Students",
    target: "All Students",
    channels: ["In-App"],
    status: "Sent",
    scheduledDate: "2026-09-03",
    scheduledTime: "19:30",
    sentDate: "2026-09-03",
    sentTime: "19:30",
    recipients: 1248,
    readCount: 1114,
    createdBy: "Admin",
    createdAt: "2026-09-03",
  },
  {
    id: "NOT-1004",
    title: "NEET Parent Meeting",
    message:
      "A parent-teacher meeting for the NEET 2027 batch has been scheduled. Please attend the meeting as per the announced schedule.",
    type: "Announcement",
    audience: "Specific Batch",
    target: "NEET 2027",
    channels: ["In-App", "WhatsApp", "Email"],
    status: "Scheduled",
    scheduledDate: "2026-09-12",
    scheduledTime: "10:00",
    sentDate: "",
    sentTime: "",
    recipients: 186,
    readCount: 0,
    createdBy: "Admin",
    createdAt: "2026-09-05",
  },
  {
    id: "NOT-1005",
    title: "Holiday Announcement",
    message:
      "The coaching institute will remain closed tomorrow due to a scheduled holiday. Regular classes will resume as per the timetable.",
    type: "Important",
    audience: "All Students",
    target: "All Students",
    channels: ["In-App", "WhatsApp"],
    status: "Sent",
    scheduledDate: "2026-09-04",
    scheduledTime: "12:00",
    sentDate: "2026-09-04",
    sentTime: "12:00",
    recipients: 1248,
    readCount: 1202,
    createdBy: "Admin",
    createdAt: "2026-09-04",
  },
  {
    id: "NOT-1006",
    title: "Teacher Meeting",
    message:
      "All teaching staff are requested to attend the monthly academic review meeting.",
    type: "Announcement",
    audience: "Teachers",
    target: "All Teachers",
    channels: ["In-App", "Email"],
    status: "Scheduled",
    scheduledDate: "2026-09-14",
    scheduledTime: "17:30",
    sentDate: "",
    sentTime: "",
    recipients: 42,
    readCount: 0,
    createdBy: "Admin",
    createdAt: "2026-09-06",
  },
  {
    id: "NOT-1007",
    title: "Online Class Link",
    message:
      "Today's physics online class link is now available. Please join five minutes before the scheduled start time.",
    type: "Class",
    audience: "Specific Course",
    target: "JEE Preparation",
    channels: ["In-App"],
    status: "Sent",
    scheduledDate: "2026-09-06",
    scheduledTime: "16:00",
    sentDate: "2026-09-06",
    sentTime: "16:00",
    recipients: 310,
    readCount: 278,
    createdBy: "Admin",
    createdAt: "2026-09-06",
  },
  {
    id: "NOT-1008",
    title: "System Maintenance",
    message:
      "The student portal may be temporarily unavailable tonight due to scheduled system maintenance.",
    type: "System",
    audience: "All Students",
    target: "All Students",
    channels: ["In-App", "Email"],
    status: "Draft",
    scheduledDate: "",
    scheduledTime: "",
    sentDate: "",
    sentTime: "",
    recipients: 0,
    readCount: 0,
    createdBy: "Admin",
    createdAt: "2026-09-07",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCurrentTime = () => {
  const date = new Date();

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};

const getNotificationTypeIcon = (type: NotificationType) => {
  switch (type) {
    case "Announcement":
      return Megaphone;

    case "Fee Reminder":
      return AlertCircle;

    case "Attendance":
      return CheckCircle2;

    case "Exam":
      return FileText;

    case "Class":
      return BookOpen;

    case "Important":
      return CircleAlert;

    case "System":
      return Info;

    default:
      return Bell;
  }
};

const getNotificationTypeClass = (type: NotificationType) => {
  switch (type) {
    case "Announcement":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "Fee Reminder":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "Attendance":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Exam":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "Class":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";

    case "Important":
      return "bg-red-50 text-red-700 border-red-200";

    case "System":
      return "bg-slate-100 text-slate-700 border-slate-200";

    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const getStatusClass = (status: NotificationStatus) => {
  switch (status) {
    case "Sent":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "Draft":
      return "bg-slate-100 text-slate-700 border-slate-200";

    case "Failed":
      return "bg-red-50 text-red-700 border-red-200";

    case "Cancelled":
      return "bg-orange-50 text-orange-700 border-orange-200";

    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const getAudienceIcon = (audience: AudienceType) => {
  switch (audience) {
    case "Teachers":
      return GraduationCap;

    case "Staff":
      return UserRound;

    case "Specific Course":
      return BookOpen;

    case "Specific Batch":
      return Layers;

    case "Parents":
      return Users;

    default:
      return Users;
  }
};

/* =========================================================
   PAGE
========================================================= */

export default function NotificationsPage() {
  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [audienceFilter, setAudienceFilter] = useState("All");

  const [sortBy, setSortBy] = useState<
    "date" | "title" | "recipients" | "status"
  >("date");

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(1);

  const rowsPerPage = 8;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNotificationId, setEditingNotificationId] = useState<
    string | null
  >(null);

  const [viewingNotificationId, setViewingNotificationId] = useState<
    string | null
  >(null);

  const [deleteNotificationId, setDeleteNotificationId] = useState<
    string | null
  >(null);

  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const [formError, setFormError] = useState("");

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const [notificationType, setNotificationType] =
    useState<NotificationType>("General");

  const [audience, setAudience] =
    useState<AudienceType>("All Students");

  const [target, setTarget] = useState("All Students");

  const [channels, setChannels] = useState<ChannelType[]>(["In-App"]);

  const [scheduleType, setScheduleType] = useState<"now" | "schedule">("now");

  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  /* -------------------------------------------------------
     FILTER + SORT
  ------------------------------------------------------- */

  const filteredNotifications = useMemo(() => {
    let result = notifications.filter((notification) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        notification.title.toLowerCase().includes(searchText) ||
        notification.message.toLowerCase().includes(searchText) ||
        notification.id.toLowerCase().includes(searchText) ||
        notification.target.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || notification.status === statusFilter;

      const matchesType =
        typeFilter === "All" || notification.type === typeFilter;

      const matchesAudience =
        audienceFilter === "All" ||
        notification.audience === audienceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesAudience
      );
    });

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      }

      if (sortBy === "recipients") {
        comparison = a.recipients - b.recipients;
      }

      if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status);
      }

      if (sortBy === "date") {
        const aDate = `${a.scheduledDate} ${a.scheduledTime}`;
        const bDate = `${b.scheduledDate} ${b.scheduledTime}`;

        comparison = aDate.localeCompare(bDate);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    notifications,
    search,
    statusFilter,
    typeFilter,
    audienceFilter,
    sortBy,
    sortDirection,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / rowsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  /* -------------------------------------------------------
     STATS
  ------------------------------------------------------- */

  const totalNotifications = notifications.length;

  const sentNotifications = notifications.filter(
    (item) => item.status === "Sent"
  ).length;

  const scheduledNotifications = notifications.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const draftNotifications = notifications.filter(
    (item) => item.status === "Draft"
  ).length;

  const totalRecipients = notifications.reduce(
    (sum, item) => sum + item.recipients,
    0
  );

  const totalRead = notifications.reduce(
    (sum, item) => sum + item.readCount,
    0
  );

  const readRate =
    totalRecipients > 0
      ? Math.round((totalRead / totalRecipients) * 100)
      : 0;

  /* -------------------------------------------------------
     RESET FORM
  ------------------------------------------------------- */

  const resetForm = () => {
    setNotificationTitle("");
    setNotificationMessage("");
    setNotificationType("General");
    setAudience("All Students");
    setTarget("All Students");
    setChannels(["In-App"]);
    setScheduleType("now");
    setScheduledDate("");
    setScheduledTime("");
    setEditingNotificationId(null);
    setFormError("");
  };

  /* -------------------------------------------------------
     OPEN CREATE
  ------------------------------------------------------- */

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  /* -------------------------------------------------------
     OPEN EDIT
  ------------------------------------------------------- */

  const openEditModal = (notification: Notification) => {
    setNotificationTitle(notification.title);
    setNotificationMessage(notification.message);
    setNotificationType(notification.type);
    setAudience(notification.audience);
    setTarget(notification.target);
    setChannels(notification.channels);

    if (notification.status === "Scheduled") {
      setScheduleType("schedule");
    } else {
      setScheduleType("now");
    }

    setScheduledDate(notification.scheduledDate);
    setScheduledTime(notification.scheduledTime);

    setEditingNotificationId(notification.id);
    setFormError("");
    setShowCreateModal(true);
    setOpenActionMenu(null);
  };

  /* -------------------------------------------------------
     SAVE NOTIFICATION
  ------------------------------------------------------- */

  const handleSaveNotification = () => {
    setFormError("");

    if (!notificationTitle.trim()) {
      setFormError("Notification title is required.");
      return;
    }

    if (!notificationMessage.trim()) {
      setFormError("Notification message is required.");
      return;
    }

    if (!audience) {
      setFormError("Please select an audience.");
      return;
    }

    if (channels.length === 0) {
      setFormError("Please select at least one notification channel.");
      return;
    }

    if (scheduleType === "schedule") {
      if (!scheduledDate) {
        setFormError("Please select a scheduled date.");
        return;
      }

      if (!scheduledTime) {
        setFormError("Please select a scheduled time.");
        return;
      }
    }

    if (editingNotificationId) {
      setNotifications((current) =>
        current.map((notification) => {
          if (notification.id !== editingNotificationId) {
            return notification;
          }

          return {
            ...notification,
            title: notificationTitle.trim(),
            message: notificationMessage.trim(),
            type: notificationType,
            audience,
            target,
            channels,
            status:
              scheduleType === "schedule"
                ? "Scheduled"
                : notification.status === "Sent"
                ? "Sent"
                : "Draft",
            scheduledDate:
              scheduleType === "schedule"
                ? scheduledDate
                : notification.scheduledDate,
            scheduledTime:
              scheduleType === "schedule"
                ? scheduledTime
                : notification.scheduledTime,
          };
        })
      );
    } else {
      const numericIds = notifications
        .map((notification) =>
          Number(notification.id.replace("NOT-", ""))
        )
        .filter((value) => !Number.isNaN(value));

      const nextId =
        numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1001;

      const isScheduled = scheduleType === "schedule";

      const newNotification: Notification = {
        id: `NOT-${nextId}`,
        title: notificationTitle.trim(),
        message: notificationMessage.trim(),
        type: notificationType,
        audience,
        target,
        channels,
        status: isScheduled ? "Scheduled" : "Sent",
        scheduledDate: isScheduled ? scheduledDate : getToday(),
        scheduledTime: isScheduled ? scheduledTime : getCurrentTime(),
        sentDate: isScheduled ? "" : getToday(),
        sentTime: isScheduled ? "" : getCurrentTime(),
        recipients:
          audience === "All Students"
            ? 1248
            : audience === "Teachers"
            ? 42
            : audience === "Staff"
            ? 28
            : audience === "Parents"
            ? 1248
            : 0,
        readCount: 0,
        createdBy: "Admin",
        createdAt: getToday(),
      };

      setNotifications((current) => [newNotification, ...current]);
    }

    setShowCreateModal(false);
    resetForm();
    setPage(1);
  };

  /* -------------------------------------------------------
     DELETE
  ------------------------------------------------------- */

  const handleDeleteNotification = () => {
    if (!deleteNotificationId) return;

    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== deleteNotificationId
      )
    );

    setDeleteNotificationId(null);
    setOpenActionMenu(null);

    setPage(1);
  };

  /* -------------------------------------------------------
     MARK READ
  ------------------------------------------------------- */

  const handleMarkAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) => {
        if (notification.id !== id) return notification;

        return {
          ...notification,
          readCount: notification.recipients,
        };
      })
    );

    setOpenActionMenu(null);
  };

  /* -------------------------------------------------------
     DUPLICATE
  ------------------------------------------------------- */

  const handleDuplicate = (notification: Notification) => {
    const numericIds = notifications
      .map((item) => Number(item.id.replace("NOT-", "")))
      .filter((value) => !Number.isNaN(value));

    const nextId =
      numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1001;

    const duplicate: Notification = {
      ...notification,
      id: `NOT-${nextId}`,
      title: `${notification.title} - Copy`,
      status: "Draft",
      sentDate: "",
      sentTime: "",
      readCount: 0,
      createdAt: getToday(),
    };

    setNotifications((current) => [duplicate, ...current]);
    setOpenActionMenu(null);
    setPage(1);
  };

  /* -------------------------------------------------------
     CHANNEL TOGGLE
  ------------------------------------------------------- */

  const toggleChannel = (channel: ChannelType) => {
    setChannels((current) => {
      if (current.includes(channel)) {
        return current.filter((item) => item !== channel);
      }

      return [...current, channel];
    });
  };

  /* -------------------------------------------------------
     TARGET UPDATE
  ------------------------------------------------------- */

  const handleAudienceChange = (value: AudienceType) => {
    setAudience(value);

    switch (value) {
      case "All Students":
        setTarget("All Students");
        break;

      case "Teachers":
        setTarget("All Teachers");
        break;

      case "Staff":
        setTarget("All Staff");
        break;

      case "Parents":
        setTarget("All Parents");
        break;

      case "Specific Batch":
        setTarget("JEE Advanced");
        break;

      case "Specific Course":
        setTarget("JEE Preparation");
        break;
    }
  };

  /* -------------------------------------------------------
     CLEAR FILTERS
  ------------------------------------------------------- */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setAudienceFilter("All");
    setSortBy("date");
    setSortDirection("desc");
    setPage(1);
  };

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

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
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Bell className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Notifications
                </h1>

                <p className="text-sm text-slate-500">
                  Manage announcements, alerts and communication.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openCreateModal();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Notification
          </button>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Notifications
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalNotifications}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Bell className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              All notification records
            </p>
          </div>

          {/* Sent */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Sent
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {sentNotifications}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Send className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-emerald-600">
              Successfully sent
            </p>
          </div>

          {/* Scheduled */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Scheduled
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {scheduledNotifications}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <CalendarClock className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-purple-600">
              Waiting to be sent
            </p>
          </div>

          {/* Drafts */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Drafts
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {draftNotifications}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FileText className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Not sent yet
            </p>
          </div>

          {/* Read rate */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Read Rate
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {readRate}%
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <CheckCheck className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Across sent notifications
            </p>
          </div>
        </div>

        {/* =================================================
            FILTER CARD
        ================================================= */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />

              <h2 className="font-semibold text-slate-900">
                Filters & Search
              </h2>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search notifications..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Sent">Sent</option>
              <option value="Failed">Failed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Type */}
            <select
              value={typeFilter}
              onChange={(event) => {
                setTypeFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Types</option>
              <option value="General">General</option>
              <option value="Announcement">Announcement</option>
              <option value="Fee Reminder">Fee Reminder</option>
              <option value="Attendance">Attendance</option>
              <option value="Exam">Exam</option>
              <option value="Class">Class</option>
              <option value="Important">Important</option>
              <option value="System">System</option>
            </select>

            {/* Audience */}
            <select
              value={audienceFilter}
              onChange={(event) => {
                setAudienceFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Audiences</option>
              <option value="All Students">All Students</option>
              <option value="Specific Batch">Specific Batch</option>
              <option value="Specific Course">Specific Course</option>
              <option value="Teachers">Teachers</option>
              <option value="Staff">Staff</option>
              <option value="Parents">Parents</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Sort:
            </span>

            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(
                  event.target.value as
                    | "date"
                    | "title"
                    | "recipients"
                    | "status"
                );
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="recipients">Recipients</option>
              <option value="status">Status</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSortDirection((current) =>
                  current === "asc" ? "desc" : "asc"
                );
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {sortDirection === "asc" ? "Ascending ↑" : "Descending ↓"}
            </button>
          </div>
        </div>

        {/* =================================================
            NOTIFICATION TABLE
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-slate-900">
                Notification History
              </h2>

              <p className="text-sm text-slate-500">
                Manage and track all institute notifications.
              </p>
            </div>

            <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              {filteredNotifications.length} Notifications
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Notification
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Audience
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Channels
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Schedule
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Read
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedNotifications.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <Bell className="h-6 w-6 text-slate-400" />
                      </div>

                      <h3 className="mt-4 font-semibold text-slate-900">
                        No notifications found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your filters or create a new notification.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedNotifications.map((notification) => {
                    const TypeIcon = getNotificationTypeIcon(
                      notification.type
                    );

                    const AudienceIcon = getAudienceIcon(
                      notification.audience
                    );

                    const readPercentage =
                      notification.recipients > 0
                        ? Math.round(
                            (notification.readCount /
                              notification.recipients) *
                              100
                          )
                        : 0;

                    return (
                      <tr
                        key={notification.id}
                        className="group transition hover:bg-blue-50/40"
                      >
                        {/* Notification */}
                        <td className="px-5 py-4">
                          <div className="flex min-w-[280px] items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <TypeIcon className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate font-semibold text-slate-900">
                                  {notification.title}
                                </p>

                                {notification.readCount === 0 &&
                                  notification.status === "Sent" && (
                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                  )}
                              </div>

                              <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                {notification.message}
                              </p>

                              <p className="mt-1 text-[11px] font-medium text-slate-400">
                                {notification.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getNotificationTypeClass(
                              notification.type
                            )}`}
                          >
                            {notification.type}
                          </span>
                        </td>

                        {/* Audience */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                              <AudienceIcon className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {notification.audience}
                              </p>

                              <p className="text-xs text-slate-500">
                                {notification.target}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Channels */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            {notification.channels.includes("In-App") && (
                              <div
                                title="In-App"
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                              >
                                <Smartphone className="h-4 w-4" />
                              </div>
                            )}

                            {notification.channels.includes("WhatsApp") && (
                              <div
                                title="WhatsApp"
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
                              >
                                <MessageCircle className="h-4 w-4" />
                              </div>
                            )}

                            {notification.channels.includes("Email") && (
                              <div
                                title="Email"
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600"
                              >
                                <Mail className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Schedule */}
                        <td className="px-5 py-4">
                          {notification.scheduledDate ? (
                            <div>
                              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                                <CalendarDays className="h-3.5 w-3.5 text-slate-400" />

                                {notification.scheduledDate}
                              </div>

                              {notification.scheduledTime && (
                                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                  <Clock3 className="h-3.5 w-3.5" />

                                  {notification.scheduledTime}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-slate-400">
                              Not scheduled
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                              notification.status
                            )}`}
                          >
                            {notification.status}
                          </span>
                        </td>

                        {/* Read */}
                        <td className="px-5 py-4">
                          {notification.status === "Sent" ? (
                            <div className="w-24">
                              <div className="mb-1 flex items-center justify-between text-xs">
                                <span className="font-semibold text-slate-700">
                                  {readPercentage}%
                                </span>

                                <span className="text-slate-400">
                                  {notification.readCount}/
                                  {notification.recipients}
                                </span>
                              </div>

                              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-emerald-500"
                                  style={{
                                    width: `${readPercentage}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">
                              —
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="relative flex justify-end">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();

                                setOpenActionMenu((current) =>
                                  current === notification.id
                                    ? null
                                    : notification.id
                                );
                              }}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </button>

                            {openActionMenu === notification.id && (
                              <div
                                onClick={(event) => event.stopPropagation()}
                                className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setViewingNotificationId(
                                      notification.id
                                    );
                                    setOpenActionMenu(null);
                                  }}
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    openEditModal(notification)
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                  <Pencil className="h-4 w-4" />
                                  Edit
                                </button>

                                {notification.status === "Sent" &&
                                  notification.readCount <
                                    notification.recipients && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleMarkAsRead(notification.id)
                                      }
                                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                      <CheckCheck className="h-4 w-4" />
                                      Mark Read
                                    </button>
                                  )}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDuplicate(notification)
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                  <RefreshCw className="h-4 w-4" />
                                  Duplicate
                                </button>

                                <div className="my-1 border-t border-slate-100" />

                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteNotificationId(
                                      notification.id
                                    );
                                    setOpenActionMenu(null);
                                  }}
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="flex flex-col justify-between gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredNotifications.length === 0
                  ? 0
                  : startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-800">
                {Math.min(
                  startIndex + rowsPerPage,
                  filteredNotifications.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {filteredNotifications.length}
              </span>{" "}
              notifications
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                )
                .map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((current) =>
                    Math.min(totalPages, current + 1)
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            CREATE / EDIT MODAL
        ================================================= */}

        {showCreateModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
            onClick={() => {
              setShowCreateModal(false);
              resetForm();
            }}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              {/* Modal header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingNotificationId
                      ? "Edit Notification"
                      : "Create Notification"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Create and send notifications to your audience.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6 p-6">
                {/* Error */}
                {formError && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

                    <p className="font-medium">{formError}</p>
                  </div>
                )}

                {/* Basic information */}
                <div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-900">
                      Notification Details
                    </h3>

                    <p className="text-sm text-slate-500">
                      Add the message and notification type.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Notification Title
                      </label>

                      <input
                        type="text"
                        value={notificationTitle}
                        onChange={(event) =>
                          setNotificationTitle(event.target.value)
                        }
                        placeholder="e.g. Fee Payment Reminder"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Message
                      </label>

                      <textarea
                        rows={5}
                        value={notificationMessage}
                        onChange={(event) =>
                          setNotificationMessage(event.target.value)
                        }
                        placeholder="Write your notification message..."
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <p className="mt-1 text-right text-xs text-slate-400">
                        {notificationMessage.length} characters
                      </p>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Notification Type
                      </label>

                      <select
                        value={notificationType}
                        onChange={(event) =>
                          setNotificationType(
                            event.target.value as NotificationType
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="General">General</option>
                        <option value="Announcement">
                          Announcement
                        </option>
                        <option value="Fee Reminder">
                          Fee Reminder
                        </option>
                        <option value="Attendance">Attendance</option>
                        <option value="Exam">Exam</option>
                        <option value="Class">Class</option>
                        <option value="Important">Important</option>
                        <option value="System">System</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Audience */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-900">
                      Target Audience
                    </h3>

                    <p className="text-sm text-slate-500">
                      Choose who should receive this notification.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Audience
                      </label>

                      <select
                        value={audience}
                        onChange={(event) =>
                          handleAudienceChange(
                            event.target.value as AudienceType
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="All Students">
                          All Students
                        </option>

                        <option value="Specific Batch">
                          Specific Batch
                        </option>

                        <option value="Specific Course">
                          Specific Course
                        </option>

                        <option value="Teachers">Teachers</option>

                        <option value="Staff">Staff</option>

                        <option value="Parents">Parents</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Target
                      </label>

                      {audience === "Specific Batch" ? (
                        <select
                          value={target}
                          onChange={(event) =>
                            setTarget(event.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="JEE Advanced">
                            JEE Advanced
                          </option>

                          <option value="JEE Main">JEE Main</option>

                          <option value="NEET 2027">NEET 2027</option>

                          <option value="Class 10 Foundation">
                            Class 10 Foundation
                          </option>
                        </select>
                      ) : audience === "Specific Course" ? (
                        <select
                          value={target}
                          onChange={(event) =>
                            setTarget(event.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="JEE Preparation">
                            JEE Preparation
                          </option>

                          <option value="NEET Preparation">
                            NEET Preparation
                          </option>

                          <option value="Foundation Course">
                            Foundation Course
                          </option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={target}
                          onChange={(event) =>
                            setTarget(event.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Channels */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-900">
                      Notification Channels
                    </h3>

                    <p className="text-sm text-slate-500">
                      Select where the notification should be delivered.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {/* In-App */}
                    <button
                      type="button"
                      onClick={() => toggleChannel("In-App")}
                      className={`rounded-xl border p-4 text-left transition ${
                        channels.includes("In-App")
                          ? "border-blue-300 bg-blue-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <Smartphone className="h-5 w-5" />
                        </div>

                        {channels.includes("In-App") && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>

                      <p className="mt-3 font-semibold text-slate-900">
                        In-App
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Student/admin app notification
                      </p>
                    </button>

                    {/* WhatsApp */}
                    <button
                      type="button"
                      onClick={() => toggleChannel("WhatsApp")}
                      className={`rounded-xl border p-4 text-left transition ${
                        channels.includes("WhatsApp")
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                          <MessageCircle className="h-5 w-5" />
                        </div>

                        {channels.includes("WhatsApp") && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>

                      <p className="mt-3 font-semibold text-slate-900">
                        WhatsApp
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        WhatsApp Business notification
                      </p>
                    </button>

                    {/* Email */}
                    <button
                      type="button"
                      onClick={() => toggleChannel("Email")}
                      className={`rounded-xl border p-4 text-left transition ${
                        channels.includes("Email")
                          ? "border-purple-300 bg-purple-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                          <Mail className="h-5 w-5" />
                        </div>

                        {channels.includes("Email") && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>

                      <p className="mt-3 font-semibold text-slate-900">
                        Email
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Email notification delivery
                      </p>
                    </button>
                  </div>
                </div>

                {/* Schedule */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-900">
                      Delivery Schedule
                    </h3>

                    <p className="text-sm text-slate-500">
                      Send immediately or schedule for later.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setScheduleType("now")}
                      className={`rounded-xl border p-4 text-left ${
                        scheduleType === "now"
                          ? "border-blue-300 bg-blue-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <Send className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            Send Now
                          </p>

                          <p className="text-xs text-slate-500">
                            Send immediately
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setScheduleType("schedule")}
                      className={`rounded-xl border p-4 text-left ${
                        scheduleType === "schedule"
                          ? "border-purple-300 bg-purple-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                          <CalendarClock className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            Schedule
                          </p>

                          <p className="text-xs text-slate-500">
                            Choose date and time
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {scheduleType === "schedule" && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Date
                        </label>

                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={(event) =>
                            setScheduledDate(event.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Time
                        </label>

                        <input
                          type="time"
                          value={scheduledTime}
                          onChange={(event) =>
                            setScheduledTime(event.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveNotification}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {scheduleType === "schedule" ? (
                    <CalendarClock className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}

                  {editingNotificationId
                    ? "Save Changes"
                    : scheduleType === "schedule"
                    ? "Schedule Notification"
                    : "Send Notification"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            VIEW DETAILS MODAL
        ================================================= */}

        {viewingNotificationId && (
          <>
            {(() => {
              const notification = notifications.find(
                (item) => item.id === viewingNotificationId
              );

              if (!notification) return null;

              const TypeIcon = getNotificationTypeIcon(
                notification.type
              );

              const AudienceIcon = getAudienceIcon(
                notification.audience
              );

              const readPercentage =
                notification.recipients > 0
                  ? Math.round(
                      (notification.readCount /
                        notification.recipients) *
                        100
                    )
                  : 0;

              return (
                <div
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
                  onClick={() =>
                    setViewingNotificationId(null)
                  }
                >
                  <div
                    onClick={(event) => event.stopPropagation()}
                    className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-slate-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <TypeIcon className="h-6 w-6" />
                        </div>

                        <div>
                          <h2 className="text-xl font-bold text-slate-900">
                            {notification.title}
                          </h2>

                          <p className="mt-1 text-sm text-slate-500">
                            {notification.id}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setViewingNotificationId(null)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-6 p-6">
                      {/* Status */}
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                            notification.status
                          )}`}
                        >
                          {notification.status}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getNotificationTypeClass(
                            notification.type
                          )}`}
                        >
                          {notification.type}
                        </span>
                      </div>

                      {/* Message */}
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                          Message
                        </p>

                        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-800">
                          {notification.message}
                        </p>
                      </div>

                      {/* Audience */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <AudienceIcon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-xs font-medium text-slate-500">
                                Audience
                              </p>

                              <p className="mt-0.5 font-semibold text-slate-900">
                                {notification.audience}
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 text-sm text-slate-600">
                            Target:{" "}
                            <span className="font-semibold text-slate-800">
                              {notification.target}
                            </span>
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                              <Users className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-xs font-medium text-slate-500">
                                Recipients
                              </p>

                              <p className="mt-0.5 font-semibold text-slate-900">
                                {notification.recipients}
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 text-sm text-slate-600">
                            Read:{" "}
                            <span className="font-semibold text-slate-800">
                              {notification.readCount}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Channels */}
                      <div>
                        <p className="mb-3 text-sm font-semibold text-slate-900">
                          Delivery Channels
                        </p>

                        <div className="flex flex-wrap gap-3">
                          {notification.channels.includes(
                            "In-App"
                          ) && (
                            <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                              <Smartphone className="h-4 w-4" />
                              In-App
                            </div>
                          )}

                          {notification.channels.includes(
                            "WhatsApp"
                          ) && (
                            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                              <MessageCircle className="h-4 w-4" />
                              WhatsApp
                            </div>
                          )}

                          {notification.channels.includes(
                            "Email"
                          ) && (
                            <div className="flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700">
                              <Mail className="h-4 w-4" />
                              Email
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Read progress */}
                      {notification.status === "Sent" && (
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-900">
                              Read Progress
                            </p>

                            <p className="text-sm font-bold text-emerald-600">
                              {readPercentage}%
                            </p>
                          </div>

                          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-emerald-500 transition-all"
                              style={{
                                width: `${readPercentage}%`,
                              }}
                            />
                          </div>

                          <p className="mt-2 text-xs text-slate-500">
                            {notification.readCount} of{" "}
                            {notification.recipients} recipients have
                            read this notification.
                          </p>
                        </div>
                      )}

                      {/* Timing */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-medium text-slate-500">
                            Scheduled
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {notification.scheduledDate || "Not scheduled"}
                          </p>

                          {notification.scheduledTime && (
                            <p className="mt-1 text-sm text-slate-500">
                              {notification.scheduledTime}
                            </p>
                          )}
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-medium text-slate-500">
                            Sent
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {notification.sentDate || "Not sent"}
                          </p>

                          {notification.sentTime && (
                            <p className="mt-1 text-sm text-slate-500">
                              {notification.sentTime}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer info */}
                      <div className="border-t border-slate-100 pt-4 text-xs text-slate-500">
                        Created by{" "}
                        <span className="font-semibold text-slate-700">
                          {notification.createdBy}
                        </span>{" "}
                        on{" "}
                        <span className="font-semibold text-slate-700">
                          {notification.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(notification)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setViewingNotificationId(null)
                        }
                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {/* =================================================
            DELETE CONFIRMATION
        ================================================= */}

        {deleteNotificationId && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
            onClick={() => setDeleteNotificationId(null)}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Delete Notification?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This notification will be permanently removed from
                your notification history. This action cannot be
                undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteNotificationId(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteNotification}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Notification
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
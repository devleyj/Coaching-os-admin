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
  Sparkles,
  BrainCircuit,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Copy,
  Download,
  RotateCcw,
  PauseCircle,
  PlayCircle,
  Target,
  Bot,
  WandSparkles,
  Lightbulb,
  Activity,
  ShieldCheck,
  Timer,
  UsersRound,
  MessageSquareText,
  ArrowUpRight,
  Settings2,
  CheckCircle,
  AlertTriangle,
  Megaphone as AnnouncementIcon,
  SlidersHorizontal,
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
  | "Specific Students"
  | "Specific Batch"
  | "Specific Course"
  | "Teachers"
  | "Staff"
  | "Parents"
  | "Fee Defaulters"
  | "Low Attendance"
  | "At Risk Students";

type ChannelType = "In-App" | "WhatsApp" | "Email";

type ToneType = "Professional" | "Friendly" | "Urgent" | "Concise";

type RecurrenceType =
  | "None"
  | "Daily"
  | "Weekly"
  | "Monthly";

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
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  createdBy: string;
  createdAt: string;
  tone: ToneType;
  recurrence: RecurrenceType;
  aiGenerated?: boolean;
};

type Template = {
  id: string;
  name: string;
  type: NotificationType;
  title: string;
  message: string;
};

type ToastType = "success" | "error" | "info";

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
    deliveredCount: 1219,
    readCount: 982,
    failedCount: 29,
    createdBy: "Admin",
    createdAt: "2026-08-31",
    tone: "Professional",
    recurrence: "Monthly",
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
    deliveredCount: 153,
    readCount: 142,
    failedCount: 3,
    createdBy: "Admin",
    createdAt: "2026-09-01",
    tone: "Urgent",
    recurrence: "None",
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
    deliveredCount: 1248,
    readCount: 1114,
    failedCount: 0,
    createdBy: "Admin",
    createdAt: "2026-09-03",
    tone: "Concise",
    recurrence: "Daily",
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
    deliveredCount: 0,
    readCount: 0,
    failedCount: 0,
    createdBy: "Admin",
    createdAt: "2026-09-05",
    tone: "Professional",
    recurrence: "None",
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
    deliveredCount: 1237,
    readCount: 1202,
    failedCount: 11,
    createdBy: "Admin",
    createdAt: "2026-09-04",
    tone: "Professional",
    recurrence: "None",
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
    deliveredCount: 0,
    readCount: 0,
    failedCount: 0,
    createdBy: "Admin",
    createdAt: "2026-09-06",
    tone: "Professional",
    recurrence: "Monthly",
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
    deliveredCount: 310,
    readCount: 278,
    failedCount: 0,
    createdBy: "Admin",
    createdAt: "2026-09-06",
    tone: "Friendly",
    recurrence: "None",
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
    deliveredCount: 0,
    readCount: 0,
    failedCount: 0,
    createdBy: "Admin",
    createdAt: "2026-09-07",
    tone: "Professional",
    recurrence: "None",
  },
];

/* =========================================================
   TEMPLATES
========================================================= */

const initialTemplates: Template[] = [
  {
    id: "TPL-001",
    name: "Fee Reminder",
    type: "Fee Reminder",
    title: "Fee Payment Reminder",
    message:
      "Dear Parent, this is a reminder that your upcoming fee payment is due soon. Please complete the payment before the due date.",
  },
  {
    id: "TPL-002",
    name: "Attendance Alert",
    type: "Attendance",
    title: "Attendance Alert",
    message:
      "Your attendance has been updated. Please check your attendance record in the student portal.",
  },
  {
    id: "TPL-003",
    name: "Exam Reminder",
    type: "Exam",
    title: "Exam Reminder",
    message:
      "Reminder: Your upcoming examination is scheduled soon. Please review the timetable and arrive on time.",
  },
  {
    id: "TPL-004",
    name: "Class Cancellation",
    type: "Class",
    title: "Class Cancellation Notice",
    message:
      "Today's scheduled class has been cancelled. Please check the updated timetable for the next session.",
  },
  {
    id: "TPL-005",
    name: "Parent Meeting",
    type: "Announcement",
    title: "Parent-Teacher Meeting",
    message:
      "A parent-teacher meeting has been scheduled. Please attend according to the announced schedule.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getToday = () => {
  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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

    case "Specific Students":
      return UserRound;

    case "Fee Defaulters":
      return AlertCircle;

    case "Low Attendance":
      return CircleAlert;

    case "At Risk Students":
      return Target;

    default:
      return Users;
  }
};

const getChannelIcon = (channel: ChannelType) => {
  switch (channel) {
    case "WhatsApp":
      return MessageCircle;

    case "Email":
      return Mail;

    default:
      return Smartphone;
  }
};

/* =========================================================
   PAGE
========================================================= */

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const [templates] = useState<Template[]>(initialTemplates);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [audienceFilter, setAudienceFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");

  const [sortBy, setSortBy] = useState<
    "date" | "title" | "recipients" | "status" | "read"
  >("date");

  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(1);

  const rowsPerPage = 8;

  const [activeTab, setActiveTab] = useState<
    "overview" | "campaigns" | "templates"
  >("overview");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [editingNotificationId, setEditingNotificationId] =
    useState<string | null>(null);

  const [viewingNotificationId, setViewingNotificationId] =
    useState<string | null>(null);

  const [deleteNotificationId, setDeleteNotificationId] =
    useState<string | null>(null);

  const [openActionMenu, setOpenActionMenu] =
    useState<string | null>(null);

  const [showAIModal, setShowAIModal] = useState(false);

  const [showAnalyticsModal, setShowAnalyticsModal] =
    useState(false);

  const [showPreviewModal, setShowPreviewModal] =
    useState(false);

  const [showTemplateModal, setShowTemplateModal] =
    useState(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<Template | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [formError, setFormError] = useState("");

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  /* =========================================================
     FORM
  ========================================================= */

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const [notificationType, setNotificationType] =
    useState<NotificationType>("General");

  const [audience, setAudience] =
    useState<AudienceType>("All Students");

  const [target, setTarget] = useState("All Students");

  const [channels, setChannels] =
    useState<ChannelType[]>(["In-App"]);

  const [scheduleType, setScheduleType] =
    useState<"now" | "schedule">("now");

  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const [tone, setTone] =
    useState<ToneType>("Professional");

  const [recurrence, setRecurrence] =
    useState<RecurrenceType>("None");

  const [sendCopyToAdmin, setSendCopyToAdmin] =
    useState(false);

  const [trackEngagement, setTrackEngagement] =
    useState(true);

  /* =========================================================
     AI STATE
  ========================================================= */

  const [aiAction, setAiAction] = useState<
    | "generate"
    | "improve"
    | "shorten"
    | "whatsapp"
    | "email"
    | "audience"
    | "timing"
    | null
  >(null);

  const [aiResult, setAiResult] = useState("");

  /* =========================================================
     TOAST
  ========================================================= */

  const showToast = (
    message: string,
    type: ToastType = "success"
  ) => {
    setToast({ message, type });

    window.setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  /* =========================================================
     FILTER
  ========================================================= */

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
        statusFilter === "All" ||
        notification.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        notification.type === typeFilter;

      const matchesAudience =
        audienceFilter === "All" ||
        notification.audience === audienceFilter;

      const matchesChannel =
        channelFilter === "All" ||
        notification.channels.includes(
          channelFilter as ChannelType
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesAudience &&
        matchesChannel
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

      if (sortBy === "read") {
        const aRate =
          a.recipients > 0
            ? a.readCount / a.recipients
            : 0;

        const bRate =
          b.recipients > 0
            ? b.readCount / b.recipients
            : 0;

        comparison = aRate - bRate;
      }

      if (sortBy === "date") {
        const aDate = `${a.scheduledDate} ${a.scheduledTime}`;
        const bDate = `${b.scheduledDate} ${b.scheduledTime}`;

        comparison = aDate.localeCompare(bDate);
      }

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    notifications,
    search,
    statusFilter,
    typeFilter,
    audienceFilter,
    channelFilter,
    sortBy,
    sortDirection,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredNotifications.length / rowsPerPage
    )
  );

  const currentPage = Math.min(page, totalPages);

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const paginatedNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex + rowsPerPage
    );

  /* =========================================================
     STATS
  ========================================================= */

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

  const failedNotifications = notifications.filter(
    (item) => item.status === "Failed"
  ).length;

  const totalRecipients = notifications.reduce(
    (sum, item) => sum + item.recipients,
    0
  );

  const totalDelivered = notifications.reduce(
    (sum, item) => sum + item.deliveredCount,
    0
  );

  const totalRead = notifications.reduce(
    (sum, item) => sum + item.readCount,
    0
  );

  const totalFailed = notifications.reduce(
    (sum, item) => sum + item.failedCount,
    0
  );

  const readRate =
    totalRecipients > 0
      ? Math.round(
          (totalRead / totalRecipients) * 100
        )
      : 0;

  const deliveryRate =
    totalRecipients > 0
      ? Math.round(
          (totalDelivered / totalRecipients) * 100
        )
      : 0;

  const failureRate =
    totalRecipients > 0
      ? Math.round(
          (totalFailed / totalRecipients) * 100
        )
      : 0;

  const whatsappCount = notifications.filter((item) =>
    item.channels.includes("WhatsApp")
  ).length;

  const emailCount = notifications.filter((item) =>
    item.channels.includes("Email")
  ).length;

  const inAppCount = notifications.filter((item) =>
    item.channels.includes("In-App")
  ).length;

  /* =========================================================
     RESET
  ========================================================= */

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
    setTone("Professional");
    setRecurrence("None");
    setSendCopyToAdmin(false);
    setTrackEngagement(true);
    setEditingNotificationId(null);
    setFormError("");
  };

  /* =========================================================
     CREATE
  ========================================================= */

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const openEditModal = (
    notification: Notification
  ) => {
    setNotificationTitle(notification.title);
    setNotificationMessage(notification.message);
    setNotificationType(notification.type);
    setAudience(notification.audience);
    setTarget(notification.target);
    setChannels(notification.channels);
    setTone(notification.tone);
    setRecurrence(notification.recurrence);

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

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSaveNotification = () => {
    setFormError("");

    if (!notificationTitle.trim()) {
      setFormError(
        "Notification title is required."
      );
      return;
    }

    if (!notificationMessage.trim()) {
      setFormError(
        "Notification message is required."
      );
      return;
    }

    if (channels.length === 0) {
      setFormError(
        "Please select at least one notification channel."
      );
      return;
    }

    if (scheduleType === "schedule") {
      if (!scheduledDate) {
        setFormError(
          "Please select a scheduled date."
        );
        return;
      }

      if (!scheduledTime) {
        setFormError(
          "Please select a scheduled time."
        );
        return;
      }
    }

    if (editingNotificationId) {
      setNotifications((current) =>
        current.map((notification) => {
          if (
            notification.id !==
            editingNotificationId
          ) {
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
            tone,
            recurrence,
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

      showToast(
        "Notification updated successfully."
      );
    } else {
      const numericIds = notifications
        .map((notification) =>
          Number(
            notification.id.replace("NOT-", "")
          )
        )
        .filter(
          (value) => !Number.isNaN(value)
        );

      const nextId =
        numericIds.length > 0
          ? Math.max(...numericIds) + 1
          : 1001;

      const isScheduled =
        scheduleType === "schedule";

      const recipientCount =
        audience === "All Students"
          ? 1248
          : audience === "Parents"
          ? 1248
          : audience === "Teachers"
          ? 42
          : audience === "Staff"
          ? 28
          : audience === "Specific Batch"
          ? 186
          : audience === "Specific Course"
          ? 310
          : audience === "Fee Defaulters"
          ? 142
          : audience === "Low Attendance"
          ? 97
          : audience === "At Risk Students"
          ? 64
          : 12;

      const newNotification: Notification = {
        id: `NOT-${nextId}`,
        title: notificationTitle.trim(),
        message: notificationMessage.trim(),
        type: notificationType,
        audience,
        target,
        channels,
        status: isScheduled
          ? "Scheduled"
          : "Sent",
        scheduledDate: isScheduled
          ? scheduledDate
          : getToday(),
        scheduledTime: isScheduled
          ? scheduledTime
          : getCurrentTime(),
        sentDate: isScheduled
          ? ""
          : getToday(),
        sentTime: isScheduled
          ? ""
          : getCurrentTime(),
        recipients: recipientCount,
        deliveredCount: isScheduled
          ? 0
          : recipientCount,
        readCount: 0,
        failedCount: 0,
        createdBy: "Admin",
        createdAt: getToday(),
        tone,
        recurrence,
      };

      setNotifications((current) => [
        newNotification,
        ...current,
      ]);

      showToast(
        isScheduled
          ? "Notification scheduled successfully."
          : "Notification sent successfully."
      );
    }

    setShowCreateModal(false);
    resetForm();
    setPage(1);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDeleteNotification = () => {
    if (!deleteNotificationId) return;

    setNotifications((current) =>
      current.filter(
        (notification) =>
          notification.id !== deleteNotificationId
      )
    );

    setDeleteNotificationId(null);
    setOpenActionMenu(null);
    setPage(1);

    showToast(
      "Notification deleted successfully."
    );
  };

  /* =========================================================
     MARK READ
  ========================================================= */

  const handleMarkAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) => {
        if (notification.id !== id) {
          return notification;
        }

        return {
          ...notification,
          readCount: notification.recipients,
        };
      })
    );

    setOpenActionMenu(null);

    showToast("Notification marked as read.");
  };

  /* =========================================================
     DUPLICATE
  ========================================================= */

  const handleDuplicate = (
    notification: Notification
  ) => {
    const numericIds = notifications
      .map((item) =>
        Number(item.id.replace("NOT-", ""))
      )
      .filter(
        (value) => !Number.isNaN(value)
      );

    const nextId =
      numericIds.length > 0
        ? Math.max(...numericIds) + 1
        : 1001;

    const duplicate: Notification = {
      ...notification,
      id: `NOT-${nextId}`,
      title: `${notification.title} - Copy`,
      status: "Draft",
      sentDate: "",
      sentTime: "",
      readCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      createdAt: getToday(),
    };

    setNotifications((current) => [
      duplicate,
      ...current,
    ]);

    setOpenActionMenu(null);
    setPage(1);

    showToast("Notification duplicated.");
  };

  /* =========================================================
     RESEND
  ========================================================= */

  const handleResend = (
    notification: Notification
  ) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? {
              ...item,
              status: "Sent",
              sentDate: getToday(),
              sentTime: getCurrentTime(),
              deliveredCount: item.recipients,
              readCount: 0,
              failedCount: 0,
            }
          : item
      )
    );

    setOpenActionMenu(null);

    showToast(
      "Notification queued for resend."
    );
  };

  /* =========================================================
     CANCEL SCHEDULE
  ========================================================= */

  const handleCancelSchedule = (
    notification: Notification
  ) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? {
              ...item,
              status: "Cancelled",
            }
          : item
      )
    );

    setOpenActionMenu(null);

    showToast(
      "Scheduled notification cancelled."
    );
  };

  /* =========================================================
     CHANNEL
  ========================================================= */

  const toggleChannel = (
    channel: ChannelType
  ) => {
    setChannels((current) => {
      if (current.includes(channel)) {
        return current.filter(
          (item) => item !== channel
        );
      }

      return [...current, channel];
    });
  };

  /* =========================================================
     AUDIENCE
  ========================================================= */

  const handleAudienceChange = (
    value: AudienceType
  ) => {
    setAudience(value);

    switch (value) {
      case "All Students":
        setTarget("All Students");
        break;

      case "Specific Students":
        setTarget("Selected Students");
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

      case "Fee Defaulters":
        setTarget("Students with pending fees");
        break;

      case "Low Attendance":
        setTarget("Attendance below 75%");
        break;

      case "At Risk Students":
        setTarget("AI identified at-risk students");
        break;
    }
  };

  /* =========================================================
     CLEAR
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setAudienceFilter("All");
    setChannelFilter("All");
    setSortBy("date");
    setSortDirection("desc");
    setPage(1);
  };

  /* =========================================================
     BULK
  ========================================================= */

  const toggleSelectAll = () => {
    const pageIds =
      paginatedNotifications.map(
        (item) => item.id
      );

    const allSelected = pageIds.every((id) =>
      selectedIds.includes(id)
    );

    if (allSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) => !pageIds.includes(id)
        )
      );
    } else {
      setSelectedIds((current) => [
        ...new Set([
          ...current,
          ...pageIds,
        ]),
      ]);
    }
  };

  const toggleSelected = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  };

  const bulkMarkRead = () => {
    if (selectedIds.length === 0) return;

    setNotifications((current) =>
      current.map((item) =>
        selectedIds.includes(item.id)
          ? {
              ...item,
              readCount: item.recipients,
            }
          : item
      )
    );

    setSelectedIds([]);

    showToast(
      "Selected notifications marked as read."
    );
  };

  const bulkDelete = () => {
    if (selectedIds.length === 0) return;

    setNotifications((current) =>
      current.filter(
        (item) =>
          !selectedIds.includes(item.id)
      )
    );

    setSelectedIds([]);
    setPage(1);

    showToast(
      "Selected notifications deleted."
    );
  };

  /* =========================================================
     CSV EXPORT
  ========================================================= */

  const exportCSV = () => {
    const rows = [
      [
        "ID",
        "Title",
        "Type",
        "Audience",
        "Target",
        "Channels",
        "Status",
        "Recipients",
        "Delivered",
        "Read",
        "Failed",
        "Scheduled Date",
        "Scheduled Time",
      ],
      ...filteredNotifications.map(
        (item) => [
          item.id,
          item.title,
          item.type,
          item.audience,
          item.target,
          item.channels.join(" | "),
          item.status,
          item.recipients,
          item.deliveredCount,
          item.readCount,
          item.failedCount,
          item.scheduledDate,
          item.scheduledTime,
        ]
      ),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) =>
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
    link.download =
      "notifications-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast(
      "Notification report exported."
    );
  };

  /* =========================================================
     AI
  ========================================================= */

  const runAI = (
    action:
      | "generate"
      | "improve"
      | "shorten"
      | "whatsapp"
      | "email"
      | "audience"
      | "timing"
  ) => {
    setAiAction(action);

    window.setTimeout(() => {
      let result = "";

      if (action === "generate") {
        result =
          "Reminder: Your upcoming class/examination activity is scheduled soon. Please check the student portal for the latest schedule and arrive on time.";
      }

      if (action === "improve") {
        result =
          notificationMessage.trim()
            ? `${notificationMessage.trim()}\n\nPlease make sure to review the latest information in your student portal and take the necessary action before the deadline.`
            : "Please review the latest information in your student portal and take the required action before the deadline.";
      }

      if (action === "shorten") {
        result =
          "Reminder: Please check the latest update in your student portal and take action before the deadline.";
      }

      if (action === "whatsapp") {
        result =
          "📢 Important Update\n\nDear Parent/Student,\n\nPlease check the latest institute update in your student portal.\n\nThank you.";
      }

      if (action === "email") {
        result =
          "Subject: Important Institute Update\n\nDear Parent/Student,\n\nWe would like to inform you about an important update from the institute. Please review the latest information in your student portal.\n\nRegards,\nAdmin Team";
      }

      if (action === "audience") {
        result =
          "AI Recommendation: Based on the notification type, the most relevant audience is the affected batch/course rather than all students. This can reduce unnecessary communication and improve engagement.";
      }

      if (action === "timing") {
        result =
          "AI Recommendation: For student-facing notifications, a morning or early-evening delivery window is generally preferable. For urgent exam/class reminders, send the reminder closer to the event.";
      }

      setAiResult(result);
      setAiAction(null);
    }, 700);
  };

  const applyAIResult = () => {
    if (!aiResult) return;

    if (
      aiAction === "audience" ||
      aiAction === "timing"
    ) {
      showToast(
        "AI recommendation reviewed."
      );
      return;
    }

    if (aiResult.includes("Subject:")) {
      setNotificationMessage(
        aiResult.replace(
          /^Subject:.*\n\n/,
          ""
        )
      );
    } else {
      setNotificationMessage(aiResult);
    }

    setShowAIModal(false);

    showToast(
      "AI suggestion applied to message."
    );
  };

  /* =========================================================
     TEMPLATE
  ========================================================= */

  const useTemplate = (
    template: Template
  ) => {
    setNotificationTitle(
      template.title
    );

    setNotificationMessage(
      template.message
    );

    setNotificationType(
      template.type
    );

    setSelectedTemplate(null);
    setShowTemplateModal(false);
    setShowCreateModal(true);

    showToast(
      `${template.name} template loaded.`
    );
  };

  /* =========================================================
     PREVIEW
  ========================================================= */

  const previewCurrentMessage = () => {
    if (!notificationTitle.trim()) {
      setFormError(
        "Add a notification title before previewing."
      );
      return;
    }

    if (!notificationMessage.trim()) {
      setFormError(
        "Add a notification message before previewing."
      );
      return;
    }

    setShowPreviewModal(true);
  };

  /* =========================================================
     RENDER
  ========================================================= */

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
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <Bell className="h-6 w-6" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Notifications
                  </h1>

                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                    Command Center
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Create, automate and analyze institute communication.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setShowAIModal(true)
              }
              className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
            >
              <Sparkles className="h-4 w-4" />
              AI Assistant
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Create Notification
            </button>
          </div>
        </div>

        {/* =====================================================
            TABS
        ===================================================== */}

        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() =>
              setActiveTab("overview")
            }
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "overview"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab("campaigns")
            }
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "campaigns"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Campaigns
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab("templates")
            }
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "templates"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Templates
          </button>

          <div className="ml-auto hidden items-center gap-2 pr-2 text-xs text-slate-400 md:flex">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Communication center ready
          </div>
        </div>

        {/* =====================================================
            OVERVIEW
        ===================================================== */}

        {activeTab === "overview" && (
          <>
            {/* KPI */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Total
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
                  All campaigns
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                  Delivered campaigns
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                  Upcoming delivery
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Delivery
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {deliveryRate}%
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>

                <p className="mt-3 text-xs text-cyan-600">
                  Overall delivery rate
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
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

                <p className="mt-3 text-xs text-orange-600">
                  Audience engagement
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Failed
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {failedNotifications}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                </div>

                <p className="mt-3 text-xs text-red-600">
                  {failureRate}% recipient failure
                </p>
              </div>
            </div>

            {/* AI COMMAND CENTER */}
            <div className="mb-6 overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 shadow-sm">
              <div className="border-b border-purple-100 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
                      <BrainCircuit className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-slate-900">
                          AI Communication Command Center
                        </h2>

                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-700">
                          AI Ready
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        Intelligent recommendations for better communication.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowAIModal(true)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
                  >
                    <Sparkles className="h-4 w-4" />
                    Open AI Assistant
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
                <div className="rounded-xl border border-white bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Engagement
                      </p>

                      <p className="text-sm font-bold text-slate-900">
                        Read rate is healthy
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Your recent campaigns are receiving strong audience engagement.
                  </p>
                </div>

                <div className="rounded-xl border border-white bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <Lightbulb className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Recommendation
                      </p>

                      <p className="text-sm font-bold text-slate-900">
                        Use targeted audiences
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Batch-specific messages can reduce unnecessary notifications.
                  </p>
                </div>

                <div className="rounded-xl border border-white bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Timer className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Timing
                      </p>

                      <p className="text-sm font-bold text-slate-900">
                        Optimize send windows
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    AI can recommend delivery timing based on notification type.
                  </p>
                </div>
              </div>
            </div>

            {/* CHANNEL + PERFORMANCE */}
            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Channel Mix
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Campaign usage by channel
                    </p>
                  </div>

                  <MessageSquareText className="h-5 w-5 text-slate-400" />
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          In-App
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {inAppCount}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{
                          width: `${
                            totalNotifications
                              ? Math.min(
                                  100,
                                  (inAppCount /
                                    totalNotifications) *
                                    100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          WhatsApp
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {whatsappCount}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${
                            totalNotifications
                              ? Math.min(
                                  100,
                                  (whatsappCount /
                                    totalNotifications) *
                                    100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          Email
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {emailCount}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-purple-500"
                        style={{
                          width: `${
                            totalNotifications
                              ? Math.min(
                                  100,
                                  (emailCount /
                                    totalNotifications) *
                                    100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Communication Performance
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Overall delivery and engagement health
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowAnalyticsModal(true)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Detailed Analytics
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-700">
                        Delivered
                      </span>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-emerald-800">
                      {totalDelivered.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-emerald-600">
                      {deliveryRate}% delivery rate
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">
                        Read
                      </span>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-blue-800">
                      {totalRead.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-blue-600">
                      {readRate}% engagement
                    </p>
                  </div>

                  <div className="rounded-xl bg-red-50 p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-xs font-semibold text-red-700">
                        Failed
                      </span>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-red-800">
                      {totalFailed.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-red-600">
                      {failureRate}% failure rate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* =====================================================
            CAMPAIGNS
        ===================================================== */}

        {activeTab === "campaigns" && (
          <>
            {/* FILTER CARD */}

            <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-slate-500" />

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Campaign Manager
                    </h2>

                    <p className="text-xs text-slate-500">
                      Search, filter and manage every communication campaign.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={exportCSV}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </button>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                <div className="relative xl:col-span-2">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search campaigns, IDs, messages..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">
                    All Status
                  </option>
                  <option value="Draft">
                    Draft
                  </option>
                  <option value="Scheduled">
                    Scheduled
                  </option>
                  <option value="Sent">
                    Sent
                  </option>
                  <option value="Failed">
                    Failed
                  </option>
                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(event) => {
                    setTypeFilter(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">
                    All Types
                  </option>
                  <option value="General">
                    General
                  </option>
                  <option value="Announcement">
                    Announcement
                  </option>
                  <option value="Fee Reminder">
                    Fee Reminder
                  </option>
                  <option value="Attendance">
                    Attendance
                  </option>
                  <option value="Exam">
                    Exam
                  </option>
                  <option value="Class">
                    Class
                  </option>
                  <option value="Important">
                    Important
                  </option>
                  <option value="System">
                    System
                  </option>
                </select>

                <select
                  value={channelFilter}
                  onChange={(event) => {
                    setChannelFilter(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">
                    All Channels
                  </option>
                  <option value="In-App">
                    In-App
                  </option>
                  <option value="WhatsApp">
                    WhatsApp
                  </option>
                  <option value="Email">
                    Email
                  </option>
                </select>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <select
                  value={audienceFilter}
                  onChange={(event) => {
                    setAudienceFilter(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="All">
                    All Audiences
                  </option>
                  <option value="All Students">
                    All Students
                  </option>
                  <option value="Specific Students">
                    Specific Students
                  </option>
                  <option value="Specific Batch">
                    Specific Batch
                  </option>
                  <option value="Specific Course">
                    Specific Course
                  </option>
                  <option value="Teachers">
                    Teachers
                  </option>
                  <option value="Staff">
                    Staff
                  </option>
                  <option value="Parents">
                    Parents
                  </option>
                  <option value="Fee Defaulters">
                    Fee Defaulters
                  </option>
                  <option value="Low Attendance">
                    Low Attendance
                  </option>
                  <option value="At Risk Students">
                    At Risk Students
                  </option>
                </select>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(
                        event.target.value as
                          | "date"
                          | "title"
                          | "recipients"
                          | "status"
                          | "read"
                      );
                      setPage(1);
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="date">
                      Sort by Date
                    </option>
                    <option value="title">
                      Sort by Title
                    </option>
                    <option value="recipients">
                      Sort by Recipients
                    </option>
                    <option value="status">
                      Sort by Status
                    </option>
                    <option value="read">
                      Sort by Read Rate
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      setSortDirection(
                        (current) =>
                          current === "asc"
                            ? "desc"
                            : "asc"
                      )
                    }
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {sortDirection === "asc"
                      ? "Ascending ↑"
                      : "Descending ↓"}
                  </button>
                </div>
              </div>
            </div>

            {/* BULK BAR */}

            {selectedIds.length > 0 && (
              <div className="mb-4 flex flex-col justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Check className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      {selectedIds.length} selected
                    </p>

                    <p className="text-xs text-blue-700">
                      Choose a bulk action.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={bulkMarkRead}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                  >
                    <CheckCheck className="h-4 w-4" />
                    Mark Read
                  </button>

                  <button
                    type="button"
                    onClick={bulkDelete}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* TABLE */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Notification Campaigns
                  </h2>

                  <p className="text-sm text-slate-500">
                    Manage and monitor communication campaigns.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    {filteredNotifications.length} campaigns
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1250px] text-left">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="w-12 px-5 py-4">
                        <input
                          type="checkbox"
                          checked={
                            paginatedNotifications.length >
                              0 &&
                            paginatedNotifications.every(
                              (item) =>
                                selectedIds.includes(
                                  item.id
                                )
                            )
                          }
                          onChange={toggleSelectAll}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Campaign
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
                        Performance
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginatedNotifications.length ===
                    0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-16 text-center"
                        >
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <Bell className="h-6 w-6 text-slate-400" />
                          </div>

                          <h3 className="mt-4 font-semibold text-slate-900">
                            No campaigns found
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Try changing your filters or create a new campaign.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      paginatedNotifications.map(
                        (notification) => {
                          const TypeIcon =
                            getNotificationTypeIcon(
                              notification.type
                            );

                          const AudienceIcon =
                            getAudienceIcon(
                              notification.audience
                            );

                          const readPercentage =
                            notification.recipients >
                            0
                              ? Math.round(
                                  (notification.readCount /
                                    notification.recipients) *
                                    100
                                )
                              : 0;

                          const deliveryPercentage =
                            notification.recipients >
                            0
                              ? Math.round(
                                  (notification.deliveredCount /
                                    notification.recipients) *
                                    100
                                )
                              : 0;

                          return (
                            <tr
                              key={
                                notification.id
                              }
                              className="group transition hover:bg-blue-50/40"
                            >
                              <td className="px-5 py-4">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(
                                    notification.id
                                  )}
                                  onChange={() =>
                                    toggleSelected(
                                      notification.id
                                    )
                                  }
                                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex min-w-[300px] items-start gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <TypeIcon className="h-5 w-5" />
                                  </div>

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="truncate font-bold text-slate-900">
                                        {
                                          notification.title
                                        }
                                      </p>

                                      {notification.aiGenerated && (
                                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-purple-500" />
                                      )}
                                    </div>

                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                                      {
                                        notification.message
                                      }
                                    </p>

                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                      <span className="text-[11px] font-semibold text-slate-400">
                                        {
                                          notification.id
                                        }
                                      </span>

                                      <span className="text-[11px] text-slate-300">
                                        •
                                      </span>

                                      <span className="text-[11px] font-medium text-slate-400">
                                        {
                                          notification.recipients
                                        }{" "}
                                        recipients
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                    <AudienceIcon className="h-4 w-4" />
                                  </div>

                                  <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                      {
                                        notification.audience
                                      }
                                    </p>

                                    <p className="max-w-[160px] truncate text-xs text-slate-500">
                                      {
                                        notification.target
                                      }
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-1.5">
                                  {notification.channels.map(
                                    (channel) => {
                                      const Icon =
                                        getChannelIcon(
                                          channel
                                        );

                                      return (
                                        <div
                                          key={
                                            channel
                                          }
                                          title={
                                            channel
                                          }
                                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                            channel ===
                                            "WhatsApp"
                                              ? "bg-emerald-50 text-emerald-600"
                                              : channel ===
                                                "Email"
                                              ? "bg-purple-50 text-purple-600"
                                              : "bg-blue-50 text-blue-600"
                                          }`}
                                        >
                                          <Icon className="h-4 w-4" />
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                {notification.scheduledDate ? (
                                  <div>
                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                                      <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                                      {
                                        notification.scheduledDate
                                      }
                                    </div>

                                    {notification.scheduledTime && (
                                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                        <Clock3 className="h-3.5 w-3.5" />
                                        {
                                          notification.scheduledTime
                                        }
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-slate-400">
                                    Not scheduled
                                  </span>
                                )}
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex flex-col items-start gap-2">
                                  <span
                                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                                      notification.status
                                    )}`}
                                  >
                                    {
                                      notification.status
                                    }
                                  </span>

                                  {notification.recurrence !==
                                    "None" && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                                      <RefreshCw className="h-3 w-3" />
                                      {
                                        notification.recurrence
                                      }
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                {notification.status ===
                                "Sent" ? (
                                  <div className="w-40">
                                    <div className="mb-2 flex items-center justify-between">
                                      <span className="text-xs font-semibold text-slate-600">
                                        Delivery
                                      </span>

                                      <span className="text-xs font-bold text-emerald-600">
                                        {
                                          deliveryPercentage
                                        }
                                        %
                                      </span>
                                    </div>

                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                      <div
                                        className="h-full rounded-full bg-emerald-500"
                                        style={{
                                          width: `${deliveryPercentage}%`,
                                        }}
                                      />
                                    </div>

                                    <div className="mt-2 flex items-center justify-between">
                                      <span className="text-[11px] text-slate-400">
                                        Read{" "}
                                        {
                                          readPercentage
                                        }
                                        %
                                      </span>

                                      <span className="text-[11px] font-medium text-slate-400">
                                        {
                                          notification.readCount
                                        }
                                        /
                                        {
                                          notification.recipients
                                        }
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-xs text-slate-400">
                                    —
                                  </span>
                                )}
                              </td>

                              <td className="px-5 py-4">
                                <div className="relative flex justify-end">
                                  <button
                                    type="button"
                                    onClick={(
                                      event
                                    ) => {
                                      event.stopPropagation();

                                      setOpenActionMenu(
                                        (
                                          current
                                        ) =>
                                          current ===
                                          notification.id
                                            ? null
                                            : notification.id
                                      );
                                    }}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                  >
                                    <MoreHorizontal className="h-5 w-5" />
                                  </button>

                                  {openActionMenu ===
                                    notification.id && (
                                    <div
                                      onClick={(
                                        event
                                      ) =>
                                        event.stopPropagation()
                                      }
                                      className="absolute right-0 top-11 z-40 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setViewingNotificationId(
                                            notification.id
                                          );
                                          setOpenActionMenu(
                                            null
                                          );
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                      >
                                        <Eye className="h-4 w-4" />
                                        View Details
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          openEditModal(
                                            notification
                                          )
                                        }
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                      >
                                        <Pencil className="h-4 w-4" />
                                        Edit
                                      </button>

                                      {notification.status ===
                                        "Sent" &&
                                        notification.readCount <
                                          notification.recipients && (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleMarkAsRead(
                                                notification.id
                                              )
                                            }
                                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                          >
                                            <CheckCheck className="h-4 w-4" />
                                            Mark Read
                                          </button>
                                        )}

                                      {notification.status ===
                                        "Sent" && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleResend(
                                              notification
                                            )
                                          }
                                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                          <RotateCcw className="h-4 w-4" />
                                          Resend
                                        </button>
                                      )}

                                      {notification.status ===
                                        "Scheduled" && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleCancelSchedule(
                                              notification
                                            )
                                          }
                                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-orange-600 hover:bg-orange-50"
                                        >
                                          <PauseCircle className="h-4 w-4" />
                                          Cancel Schedule
                                        </button>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDuplicate(
                                            notification
                                          )
                                        }
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                      >
                                        <Copy className="h-4 w-4" />
                                        Duplicate
                                      </button>

                                      <div className="my-1 border-t border-slate-100" />

                                      <button
                                        type="button"
                                        onClick={() => {
                                          setDeleteNotificationId(
                                            notification.id
                                          );
                                          setOpenActionMenu(
                                            null
                                          );
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
                        }
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}

              <div className="flex flex-col justify-between gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-800">
                    {filteredNotifications.length ===
                    0
                      ? 0
                      : startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-800">
                    {Math.min(
                      startIndex +
                        rowsPerPage,
                      filteredNotifications.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {
                      filteredNotifications.length
                    }
                  </span>{" "}
                  campaigns
                </p>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setPage((current) =>
                        Math.max(
                          1,
                          current - 1
                        )
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) =>
                      index + 1
                  )
                    .slice(
                      Math.max(
                        0,
                        currentPage - 3
                      ),
                      Math.min(
                        totalPages,
                        currentPage + 2
                      )
                    )
                    .map(
                      (pageNumber) => (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() =>
                            setPage(
                              pageNumber
                            )
                          }
                          className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold ${
                            currentPage ===
                            pageNumber
                              ? "bg-blue-600 text-white"
                              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {
                            pageNumber
                          }
                        </button>
                      )
                    )}

                  <button
                    type="button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setPage((current) =>
                        Math.min(
                          totalPages,
                          current + 1
                        )
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* =====================================================
            TEMPLATES
        ===================================================== */}

        {activeTab === "templates" && (
          <div className="space-y-5">
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
              <div>
                <h2 className="font-bold text-slate-900">
                  Notification Templates
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Reusable communication templates for common institute workflows.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Create from scratch
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {templates.map((template) => {
                const Icon =
                  getNotificationTypeIcon(
                    template.type
                  );

                return (
                  <div
                    key={template.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getNotificationTypeClass(
                          template.type
                        )}`}
                      >
                        {template.type}
                      </span>
                    </div>

                    <h3 className="mt-4 font-bold text-slate-900">
                      {template.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {template.title}
                    </p>

                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">
                      {template.message}
                    </p>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          useTemplate(
                            template
                          )
                        }
                        className="flex-1 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        Use Template
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(
                            template
                          );
                          setShowTemplateModal(
                            true
                          );
                        }}
                        className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================
            CREATE / EDIT MODAL
        ===================================================== */}

        {showCreateModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            onClick={() => {
              setShowCreateModal(false);
              resetForm();
            }}
          >
            <div
              onClick={(event) =>
                event.stopPropagation()
              }
              className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {editingNotificationId
                        ? "Edit Notification"
                        : "Create Notification"}
                    </h2>

                    <span className="rounded-full bg-purple-50 px-2 py-1 text-[10px] font-bold uppercase text-purple-700">
                      AI Ready
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Build a targeted, multi-channel communication campaign.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-7 p-6">
                {formError && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

                    <p className="font-medium">
                      {formError}
                    </p>
                  </div>
                )}

                {/* BASIC */}

                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Message
                      </h3>

                      <p className="text-sm text-slate-500">
                        Create the main communication content.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowTemplateModal(
                          true
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <FileText className="h-4 w-4" />
                      Templates
                    </button>
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
                          setNotificationTitle(
                            event.target.value
                          )
                        }
                        placeholder="e.g. Fee Payment Reminder"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="block text-sm font-semibold text-slate-700">
                          Message
                        </label>

                        <span className="text-xs text-slate-400">
                          {
                            notificationMessage.length
                          }{" "}
                          characters
                        </span>
                      </div>

                      <textarea
                        rows={6}
                        value={notificationMessage}
                        onChange={(event) =>
                          setNotificationMessage(
                            event.target.value
                          )
                        }
                        placeholder="Write your notification message..."
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium leading-6 text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAIModal(
                              true
                            );
                            runAI(
                              "improve"
                            );
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100"
                        >
                          <WandSparkles className="h-3.5 w-3.5" />
                          Improve with AI
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowAIModal(
                              true
                            );
                            runAI(
                              "shorten"
                            );
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          <Zap className="h-3.5 w-3.5" />
                          Shorten
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowAIModal(
                              true
                            );
                            runAI(
                              "whatsapp"
                            );
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          WhatsApp Version
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowAIModal(
                              true
                            );
                            runAI(
                              "email"
                            );
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Email Version
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Notification Type
                        </label>

                        <select
                          value={
                            notificationType
                          }
                          onChange={(event) =>
                            setNotificationType(
                              event.target
                                .value as NotificationType
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                        >
                          <option value="General">
                            General
                          </option>
                          <option value="Announcement">
                            Announcement
                          </option>
                          <option value="Fee Reminder">
                            Fee Reminder
                          </option>
                          <option value="Attendance">
                            Attendance
                          </option>
                          <option value="Exam">
                            Exam
                          </option>
                          <option value="Class">
                            Class
                          </option>
                          <option value="Important">
                            Important
                          </option>
                          <option value="System">
                            System
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Tone
                        </label>

                        <select
                          value={tone}
                          onChange={(event) =>
                            setTone(
                              event.target
                                .value as ToneType
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                        >
                          <option value="Professional">
                            Professional
                          </option>
                          <option value="Friendly">
                            Friendly
                          </option>
                          <option value="Urgent">
                            Urgent
                          </option>
                          <option value="Concise">
                            Concise
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                {/* AUDIENCE */}

                <section className="border-t border-slate-100 pt-7">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Target Audience
                      </h3>

                      <p className="text-sm text-slate-500">
                        Send only to the people who need this information.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAIModal(
                          true
                        );
                        runAI(
                          "audience"
                        );
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      AI Suggest
                    </button>
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
                            event.target
                              .value as AudienceType
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                      >
                        <option value="All Students">
                          All Students
                        </option>
                        <option value="Specific Students">
                          Specific Students
                        </option>
                        <option value="Specific Batch">
                          Specific Batch
                        </option>
                        <option value="Specific Course">
                          Specific Course
                        </option>
                        <option value="Teachers">
                          Teachers
                        </option>
                        <option value="Staff">
                          Staff
                        </option>
                        <option value="Parents">
                          Parents
                        </option>
                        <option value="Fee Defaulters">
                          Fee Defaulters
                        </option>
                        <option value="Low Attendance">
                          Low Attendance
                        </option>
                        <option value="At Risk Students">
                          At Risk Students
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Target
                      </label>

                      {audience ===
                        "Specific Batch" ? (
                        <select
                          value={target}
                          onChange={(event) =>
                            setTarget(
                              event.target
                                .value
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                        >
                          <option value="JEE Advanced">
                            JEE Advanced
                          </option>
                          <option value="JEE Main">
                            JEE Main
                          </option>
                          <option value="NEET 2027">
                            NEET 2027
                          </option>
                          <option value="Class 10 Foundation">
                            Class 10 Foundation
                          </option>
                        </select>
                      ) : audience ===
                        "Specific Course" ? (
                        <select
                          value={target}
                          onChange={(event) =>
                            setTarget(
                              event.target
                                .value
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
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
                      ) : audience ===
                        "Specific Students" ? (
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <span>
                            Select Students
                          </span>

                          <UsersRound className="h-4 w-4 text-slate-400" />
                        </button>
                      ) : (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                          {target}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <Target className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                      <div>
                        <p className="text-sm font-semibold text-blue-900">
                          Estimated audience
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700">
                          Based on the selected audience, this campaign may reach approximately{" "}
                          <span className="font-bold">
                            {audience ===
                            "All Students"
                              ? "1,248"
                              : audience ===
                                "Parents"
                              ? "1,248"
                              : audience ===
                                "Teachers"
                              ? "42"
                              : audience ===
                                "Staff"
                              ? "28"
                              : audience ===
                                "Specific Batch"
                              ? "186"
                              : audience ===
                                "Specific Course"
                              ? "310"
                              : audience ===
                                "Fee Defaulters"
                              ? "142"
                              : audience ===
                                "Low Attendance"
                              ? "97"
                              : audience ===
                                "At Risk Students"
                              ? "64"
                              : "selected students"}{" "}
                            recipients.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CHANNELS */}

                <section className="border-t border-slate-100 pt-7">
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900">
                      Delivery Channels
                    </h3>

                    <p className="text-sm text-slate-500">
                      Choose where this campaign should be delivered.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {(
                      [
                        [
                          "In-App",
                          Smartphone,
                          "Blue",
                          "Instant app notification",
                        ],
                        [
                          "WhatsApp",
                          MessageCircle,
                          "Green",
                          "WhatsApp Business delivery",
                        ],
                        [
                          "Email",
                          Mail,
                          "Purple",
                          "Email communication",
                        ],
                      ] as const
                    ).map(
                      ([
                        channel,
                        Icon,
                        color,
                        description,
                      ]) => {
                        const active =
                          channels.includes(
                            channel
                          );

                        return (
                          <button
                            key={channel}
                            type="button"
                            onClick={() =>
                              toggleChannel(
                                channel
                              )
                            }
                            className={`rounded-xl border p-4 text-left transition ${
                              active
                                ? channel ===
                                  "WhatsApp"
                                  ? "border-emerald-300 bg-emerald-50"
                                  : channel ===
                                    "Email"
                                  ? "border-purple-300 bg-purple-50"
                                  : "border-blue-300 bg-blue-50"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                  color ===
                                  "Green"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : color ===
                                      "Purple"
                                    ? "bg-purple-100 text-purple-600"
                                    : "bg-blue-100 text-blue-600"
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                              </div>

                              {active && (
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>

                            <p className="mt-3 font-semibold text-slate-900">
                              {channel}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {description}
                            </p>
                          </button>
                        );
                      }
                    )}
                  </div>
                </section>

                {/* SCHEDULE */}

                <section className="border-t border-slate-100 pt-7">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Delivery Schedule
                      </h3>

                      <p className="text-sm text-slate-500">
                        Send now, schedule later, or create a recurring workflow.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAIModal(
                          true
                        );
                        runAI(
                          "timing"
                        );
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      AI Timing
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        setScheduleType(
                          "now"
                        )
                      }
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
                            Deliver immediately
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setScheduleType(
                          "schedule"
                        )
                      }
                      className={`rounded-xl border p-4 text-left ${
                        scheduleType ===
                        "schedule"
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

                  {scheduleType ===
                    "schedule" && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Date
                        </label>

                        <input
                          type="date"
                          value={
                            scheduledDate
                          }
                          onChange={(event) =>
                            setScheduledDate(
                              event.target
                                .value
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Time
                        </label>

                        <input
                          type="time"
                          value={
                            scheduledTime
                          }
                          onChange={(event) =>
                            setScheduledTime(
                              event.target
                                .value
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Repeat
                        </label>

                        <select
                          value={
                            recurrence
                          }
                          onChange={(event) =>
                            setRecurrence(
                              event.target
                                .value as RecurrenceType
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500"
                        >
                          <option value="None">
                            Does not repeat
                          </option>
                          <option value="Daily">
                            Daily
                          </option>
                          <option value="Weekly">
                            Weekly
                          </option>
                          <option value="Monthly">
                            Monthly
                          </option>
                        </select>
                      </div>
                    </div>
                  )}
                </section>

                {/* OPTIONS */}

                <section className="border-t border-slate-100 pt-7">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={
                          trackEngagement
                        }
                        onChange={(event) =>
                          setTrackEngagement(
                            event.target.checked
                          )
                        }
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Track engagement
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Track delivery and read analytics for this campaign.
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={
                          sendCopyToAdmin
                        }
                        onChange={(event) =>
                          setSendCopyToAdmin(
                            event.target.checked
                          )
                        }
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Send copy to admin
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Keep an admin copy for communication records.
                        </p>
                      </div>
                    </label>
                  </div>
                </section>
              </div>

              {/* FOOTER */}

              <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={previewCurrentMessage}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </button>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(
                        false
                      );
                      resetForm();
                    }}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleSaveNotification
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    {scheduleType ===
                    "schedule" ? (
                      <CalendarClock className="h-4 w-4" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}

                    {editingNotificationId
                      ? "Save Changes"
                      : scheduleType ===
                        "schedule"
                      ? "Schedule Notification"
                      : "Send Notification"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            VIEW DETAILS
        ===================================================== */}

        {viewingNotificationId && (
          <>
            {(() => {
              const notification =
                notifications.find(
                  (item) =>
                    item.id ===
                    viewingNotificationId
                );

              if (!notification)
                return null;

              const TypeIcon =
                getNotificationTypeIcon(
                  notification.type
                );

              const AudienceIcon =
                getAudienceIcon(
                  notification.audience
                );

              const readPercentage =
                notification.recipients >
                0
                  ? Math.round(
                      (notification.readCount /
                        notification.recipients) *
                        100
                    )
                  : 0;

              const deliveryPercentage =
                notification.recipients >
                0
                  ? Math.round(
                      (notification.deliveredCount /
                        notification.recipients) *
                        100
                    )
                  : 0;

              return (
                <div
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
                  onClick={() =>
                    setViewingNotificationId(
                      null
                    )
                  }
                >
                  <div
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                  >
                    <div className="flex items-start justify-between border-b border-slate-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <TypeIcon className="h-6 w-6" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-bold text-slate-900">
                              {
                                notification.title
                              }
                            </h2>

                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClass(
                                notification.status
                              )}`}
                            >
                              {
                                notification.status
                              }
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-slate-500">
                            {
                              notification.id
                            }
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setViewingNotificationId(
                            null
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-6 p-6">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                            Message
                          </p>

                          <span className="text-xs font-semibold text-slate-400">
                            {
                              notification.tone
                            }{" "}
                            tone
                          </span>
                        </div>

                        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-800">
                          {
                            notification.message
                          }
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-medium text-slate-500">
                            Recipients
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            {
                              notification.recipients
                            }
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-medium text-slate-500">
                            Delivered
                          </p>

                          <p className="mt-2 text-xl font-bold text-emerald-600">
                            {
                              notification.deliveredCount
                            }
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-medium text-slate-500">
                            Read
                          </p>

                          <p className="mt-2 text-xl font-bold text-blue-600">
                            {
                              notification.readCount
                            }
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <AudienceIcon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-xs text-slate-500">
                                Audience
                              </p>

                              <p className="font-semibold text-slate-900">
                                {
                                  notification.audience
                                }
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 text-sm text-slate-600">
                            Target:{" "}
                            <span className="font-semibold text-slate-800">
                              {
                                notification.target
                              }
                            </span>
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                              <CalendarClock className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-xs text-slate-500">
                                Schedule
                              </p>

                              <p className="font-semibold text-slate-900">
                                {
                                  notification.scheduledDate ||
                                  "Not scheduled"
                                }
                              </p>
                            </div>
                          </div>

                          {notification.scheduledTime && (
                            <p className="mt-3 text-sm text-slate-600">
                              {
                                notification.scheduledTime
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-sm font-bold text-slate-900">
                          Delivery Channels
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {notification.channels.map(
                            (channel) => {
                              const Icon =
                                getChannelIcon(
                                  channel
                                );

                              return (
                                <span
                                  key={
                                    channel
                                  }
                                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                                >
                                  <Icon className="h-4 w-4" />
                                  {channel}
                                </span>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {notification.status ===
                        "Sent" && (
                        <div className="space-y-5">
                          <div>
                            <div className="mb-2 flex justify-between">
                              <p className="text-sm font-semibold text-slate-900">
                                Delivery Progress
                              </p>

                              <p className="text-sm font-bold text-emerald-600">
                                {
                                  deliveryPercentage
                                }
                                %
                              </p>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-emerald-500"
                                style={{
                                  width: `${deliveryPercentage}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="mb-2 flex justify-between">
                              <p className="text-sm font-semibold text-slate-900">
                                Read Progress
                              </p>

                              <p className="text-sm font-bold text-blue-600">
                                {readPercentage}%
                              </p>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-blue-500"
                                style={{
                                  width: `${readPercentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                        <div className="flex items-start gap-3">
                          <Sparkles className="mt-0.5 h-4 w-4 text-purple-600" />

                          <div>
                            <p className="text-sm font-bold text-purple-900">
                              AI Insight
                            </p>

                            <p className="mt-1 text-xs leading-5 text-purple-700">
                              This campaign can be analyzed against audience, channel, delivery and engagement performance once connected to the backend analytics engine.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 text-xs text-slate-500">
                        Created by{" "}
                        <span className="font-semibold text-slate-700">
                          {
                            notification.createdBy
                          }
                        </span>{" "}
                        on{" "}
                        <span className="font-semibold text-slate-700">
                          {
                            notification.createdAt
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            notification
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>

                      {notification.status ===
                        "Sent" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleResend(
                              notification
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Resend
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setViewingNotificationId(
                            null
                          )
                        }
                        className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
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

        {/* =====================================================
            AI MODAL
        ===================================================== */}

        {showAIModal && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            onClick={() => {
              setShowAIModal(false);
              setAiResult("");
              setAiAction(null);
            }}
          >
            <div
              onClick={(event) =>
                event.stopPropagation()
              }
              className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-white">
                    <BrainCircuit className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      AI Notification Assistant
                    </h2>

                    <p className="text-sm text-slate-500">
                      Create better communication with AI-powered tools.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowAIModal(
                      false
                    );
                    setAiResult("");
                    setAiAction(null);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <button
                    type="button"
                    onClick={() =>
                      runAI("generate")
                    }
                    className="rounded-xl border border-slate-200 p-3 text-left hover:bg-purple-50"
                  >
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <p className="mt-2 text-xs font-bold text-slate-800">
                      Generate
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      runAI("improve")
                    }
                    className="rounded-xl border border-slate-200 p-3 text-left hover:bg-purple-50"
                  >
                    <WandSparkles className="h-5 w-5 text-purple-600" />
                    <p className="mt-2 text-xs font-bold text-slate-800">
                      Improve
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      runAI("shorten")
                    }
                    className="rounded-xl border border-slate-200 p-3 text-left hover:bg-blue-50"
                  >
                    <Zap className="h-5 w-5 text-blue-600" />
                    <p className="mt-2 text-xs font-bold text-slate-800">
                      Shorten
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      runAI("whatsapp")
                    }
                    className="rounded-xl border border-slate-200 p-3 text-left hover:bg-emerald-50"
                  >
                    <MessageCircle className="h-5 w-5 text-emerald-600" />
                    <p className="mt-2 text-xs font-bold text-slate-800">
                      WhatsApp
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      runAI("email")
                    }
                    className="rounded-xl border border-slate-200 p-3 text-left hover:bg-purple-50"
                  >
                    <Mail className="h-5 w-5 text-purple-600" />
                    <p className="mt-2 text-xs font-bold text-slate-800">
                      Email
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      runAI("audience")
                    }
                    className="rounded-xl border border-slate-200 p-3 text-left hover:bg-orange-50"
                  >
                    <Target className="h-5 w-5 text-orange-600" />
                    <p className="mt-2 text-xs font-bold text-slate-800">
                      Audience
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      runAI("timing")
                    }
                    className="rounded-xl border border-slate-200 p-3 text-left hover:bg-blue-50"
                  >
                    <Timer className="h-5 w-5 text-blue-600" />
                    <p className="mt-2 text-xs font-bold text-slate-800">
                      Best Time
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      runAI("generate")
                    }
                    className="rounded-xl border border-slate-200 p-3 text-left hover:bg-purple-50"
                  >
                    <Bot className="h-5 w-5 text-purple-600" />
                    <p className="mt-2 text-xs font-bold text-slate-800">
                      Smart Draft
                    </p>
                  </button>
                </div>

                <div className="mt-5 rounded-2xl border border-purple-100 bg-purple-50 p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />

                    <p className="text-sm font-bold text-purple-900">
                      AI Workspace
                    </p>
                  </div>

                  {aiAction ? (
                    <div className="mt-5 flex items-center gap-3 text-sm text-purple-700">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      AI is preparing a suggestion...
                    </div>
                  ) : aiResult ? (
                    <>
                      <div className="mt-4 whitespace-pre-wrap rounded-xl border border-purple-100 bg-white p-4 text-sm leading-6 text-slate-700">
                        {aiResult}
                      </div>

                      <div className="mt-4 flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setAiResult("")
                          }
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
                        >
                          Clear
                        </button>

                        <button
                          type="button"
                          onClick={
                            applyAIResult
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
                        >
                          <Check className="h-4 w-4" />
                          Apply Suggestion
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-purple-700">
                      Choose an AI action above. The current frontend simulates the assistant so we can build the complete UX before connecting the real AI API.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            ANALYTICS MODAL
        ===================================================== */}

        {showAnalyticsModal && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            onClick={() =>
              setShowAnalyticsModal(
                false
              )
            }
          >
            <div
              onClick={(event) =>
                event.stopPropagation()
              }
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Notification Analytics
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    High-level communication performance overview.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAnalyticsModal(
                      false
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Delivery Rate
                      </p>

                      <p className="text-2xl font-bold text-slate-900">
                        {deliveryRate}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-blue-600" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Read Rate
                      </p>

                      <p className="text-2xl font-bold text-slate-900">
                        {readRate}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-600" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Total Recipients
                      </p>

                      <p className="text-2xl font-bold text-slate-900">
                        {totalRecipients.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Failed Deliveries
                      </p>

                      <p className="text-2xl font-bold text-slate-900">
                        {totalFailed.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 px-6 pb-6">
                <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 text-purple-600" />

                    <div>
                      <p className="font-bold text-purple-900">
                        AI Analytics
                      </p>

                      <p className="mt-1 text-sm leading-6 text-purple-700">
                        Once connected to real delivery events, this section can automatically identify engagement trends, failed channels, optimal send windows, audience fatigue and high-performing campaign types.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900">
                    Current Channel Coverage
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          In-App
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {inAppCount} campaigns
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          WhatsApp
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {whatsappCount} campaigns
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          Email
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {emailCount} campaigns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            TEMPLATE PREVIEW
        ===================================================== */}

        {showTemplateModal && (
          <div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            onClick={() => {
              setShowTemplateModal(
                false
              );
              setSelectedTemplate(null);
            }}
          >
            <div
              onClick={(event) =>
                event.stopPropagation()
              }
              className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="font-bold text-slate-900">
                    {selectedTemplate
                      ? selectedTemplate.name
                      : "Choose Template"}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Select a reusable communication template.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowTemplateModal(
                      false
                    );
                    setSelectedTemplate(
                      null
                    );
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedTemplate ? (
                <div className="p-6">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      {selectedTemplate.type}
                    </p>

                    <h3 className="mt-2 font-bold text-slate-900">
                      {
                        selectedTemplate.title
                      }
                    </h3>

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {
                        selectedTemplate.message
                      }
                    </p>
                  </div>

                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedTemplate(
                          null
                        )
                      }
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        useTemplate(
                          selectedTemplate
                        )
                      }
                      className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-h-[65vh] space-y-2 overflow-y-auto p-5">
                  {templates.map(
                    (template) => (
                      <button
                        key={
                          template.id
                        }
                        type="button"
                        onClick={() =>
                          setSelectedTemplate(
                            template
                          )
                        }
                        className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <FileText className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">
                            {
                              template.name
                            }
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {
                              template.message
                            }
                          </p>
                        </div>

                        <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =====================================================
            MESSAGE PREVIEW
        ===================================================== */}

        {showPreviewModal && (
          <div
            className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            onClick={() =>
              setShowPreviewModal(
                false
              )
            }
          >
            <div
              onClick={(event) =>
                event.stopPropagation()
              }
              className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Notification Preview
                  </h2>

                  <p className="text-sm text-slate-500">
                    Preview how the campaign content will appear.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowPreviewModal(
                      false
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div className="mx-auto max-w-md rounded-[28px] border-8 border-slate-900 bg-slate-100 p-3 shadow-xl">
                  <div className="rounded-[20px] bg-white p-5">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Bell className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-400">
                          Coaching OS
                        </p>

                        <p className="font-bold text-slate-900">
                          {
                            notificationTitle
                          }
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {
                        notificationMessage
                      }
                    </p>

                    <p className="mt-5 text-[10px] text-slate-400">
                      Just now
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {channels.map(
                    (channel) => {
                      const Icon =
                        getChannelIcon(
                          channel
                        );

                      return (
                        <div
                          key={channel}
                          className="rounded-xl border border-slate-200 p-3 text-center"
                        >
                          <Icon className="mx-auto h-5 w-5 text-slate-500" />

                          <p className="mt-2 text-xs font-semibold text-slate-700">
                            {channel}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setShowPreviewModal(
                      false
                    )
                  }
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            DELETE MODAL
        ===================================================== */}

        {deleteNotificationId && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            onClick={() =>
              setDeleteNotificationId(
                null
              )
            }
          >
            <div
              onClick={(event) =>
                event.stopPropagation()
              }
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Delete Notification?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This campaign will be permanently removed from the current notification history. This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteNotificationId(
                      null
                    )
                  }
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleDeleteNotification
                  }
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Notification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            TOAST
        ===================================================== */}

        {toast && (
          <div className="fixed bottom-6 right-6 z-[200]">
            <div
              className={`flex min-w-[280px] items-start gap-3 rounded-2xl border bg-white p-4 shadow-2xl ${
                toast.type ===
                "success"
                  ? "border-emerald-200"
                  : toast.type === "error"
                  ? "border-red-200"
                  : "border-blue-200"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  toast.type ===
                  "success"
                    ? "bg-emerald-50 text-emerald-600"
                    : toast.type === "error"
                    ? "bg-red-50 text-red-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {toast.type ===
                "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : toast.type ===
                  "error" ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <Info className="h-4 w-4" />
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {toast.type ===
                  "success"
                    ? "Success"
                    : toast.type ===
                      "error"
                    ? "Error"
                    : "Information"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {toast.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setToast(null)
                }
                className="ml-auto text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
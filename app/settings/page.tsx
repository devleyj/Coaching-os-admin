"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import Slidebar from "../components/Slidebar";
import PageHeader from "../components/PageHeader";
import {
  Activity,
  AlertTriangle,
  AppWindow,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Cloud,
  Code2,
  Copy,
  Database,
  Download,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Globe,
  GraduationCap,
  HardDrive,
  KeyRound,
  Laptop,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Palette,
  Pencil,
  Phone,
  Printer,
  RefreshCw,
  Save,
  Search,
  Server,
  Settings as SettingsIcon,
  Shield,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  User,
  Users,
  Wallet,
  Webhook,
  X,
  Zap,
} from "lucide-react";

/* ==========================================================================
   TYPES
   ========================================================================== */

type SettingsSection =
  | "general"
  | "profile"
  | "appearance"
  | "academic"
  | "attendance"
  | "fees"
  | "exams"
  | "notifications"
  | "whatsapp"
  | "email"
  | "roles"
  | "security"
  | "branding"
  | "apps"
  | "integrations"
  | "backup"
  | "audit"
  | "privacy"
  | "danger";

type AIAction =
  | "overview"
  | "security"
  | "attendance"
  | "fees"
  | "notifications"
  | "performance";

type Role = {
  id: number;
  name: string;
  description: string;
  users: number;
  color: string;
};

type PermissionGroup = {
  name: string;
  permissions: string[];
};

type AuditLog = {
  id: number;
  user: string;
  action: string;
  module: string;
  time: string;
  type: "success" | "warning" | "info";
};

type Integration = {
  name: string;
  description: string;
  icon: any;
  connected: boolean;
  category: string;
};

type Recommendation = {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  action: AIAction;
};

/* ==========================================================================
   DATA
   ========================================================================== */

const APP_VERSION = "v0.1.20";

const settingsMenu: {
  id: SettingsSection;
  label: string;
  description: string;
  icon: any;
  group: string;
}[] = [
  {
    id: "general",
    label: "Institute",
    description: "Organization information",
    icon: Building2,
    group: "Organization",
  },
  {
    id: "profile",
    label: "Admin Profile",
    description: "Your account",
    icon: User,
    group: "Organization",
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme and interface",
    icon: Palette,
    group: "Experience",
  },
  {
    id: "branding",
    label: "Branding",
    description: "Brand identity",
    icon: Palette,
    group: "Experience",
  },
  {
    id: "apps",
    label: "Website & Apps",
    description: "Platform settings",
    icon: AppWindow,
    group: "Experience",
  },
  {
    id: "academic",
    label: "Academic",
    description: "Academic configuration",
    icon: GraduationCap,
    group: "Academic",
  },
  {
    id: "attendance",
    label: "Attendance",
    description: "Attendance rules",
    icon: ClipboardCheck,
    group: "Academic",
  },
  {
    id: "exams",
    label: "Exams",
    description: "Exam configuration",
    icon: FileText,
    group: "Academic",
  },
  {
    id: "fees",
    label: "Fees & Payments",
    description: "Fee configuration",
    icon: Wallet,
    group: "Finance",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Notification preferences",
    icon: Bell,
    group: "Communication",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "WhatsApp communication",
    icon: MessageCircle,
    group: "Communication",
  },
  {
    id: "email",
    label: "Email",
    description: "Email delivery",
    icon: Mail,
    group: "Communication",
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    description: "Access control",
    icon: Shield,
    group: "Security",
  },
  {
    id: "security",
    label: "Security",
    description: "Login and protection",
    icon: Lock,
    group: "Security",
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Privacy controls",
    icon: Eye,
    group: "Security",
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Connected services",
    icon: Zap,
    group: "System",
  },
  {
    id: "backup",
    label: "Data & Backup",
    description: "Backup and export",
    icon: Database,
    group: "System",
  },
  {
    id: "audit",
    label: "Audit Logs",
    description: "System activity",
    icon: Activity,
    group: "System",
  },
  {
    id: "danger",
    label: "Danger Zone",
    description: "Destructive actions",
    icon: AlertTriangle,
    group: "System",
  },
];

const permissionGroups: PermissionGroup[] = [
  {
    name: "Students",
    permissions: [
      "View Students",
      "Create Students",
      "Edit Students",
      "Delete Students",
      "Export Students",
    ],
  },
  {
    name: "Teachers",
    permissions: [
      "View Teachers",
      "Create Teachers",
      "Edit Teachers",
      "Delete Teachers",
    ],
  },
  {
    name: "Fees",
    permissions: [
      "View Fees",
      "Record Payment",
      "Edit Fee Records",
      "Refund Payment",
      "Financial Reports",
    ],
  },
  {
    name: "Attendance",
    permissions: [
      "View Attendance",
      "Mark Attendance",
      "Edit Attendance",
      "Export Attendance",
    ],
  },
  {
    name: "Exams",
    permissions: [
      "View Exams",
      "Create Exams",
      "Edit Exams",
      "Delete Exams",
      "Publish Results",
    ],
  },
  {
    name: "Reports & AI",
    permissions: [
      "View Reports",
      "Export Reports",
      "AI Insights",
      "AI Assistant",
      "System Analytics",
    ],
  },
];

const initialAuditLogs: AuditLog[] = [
  {
    id: 1,
    user: "Admin User",
    action: "Updated notification settings",
    module: "Notifications",
    time: "Today, 10:42 AM",
    type: "success",
  },
  {
    id: 2,
    user: "Admin User",
    action: "Created new exam EXM-1006",
    module: "Exams",
    time: "Today, 09:25 AM",
    type: "info",
  },
  {
    id: 3,
    user: "Administrator",
    action: "Recorded fee payment PAY-1024",
    module: "Fees",
    time: "Yesterday, 05:18 PM",
    type: "success",
  },
  {
    id: 4,
    user: "Counsellor",
    action: "Updated inquiry INQ-1032",
    module: "Inquiries",
    time: "Yesterday, 04:42 PM",
    type: "warning",
  },
  {
    id: 5,
    user: "Teacher",
    action: "Marked attendance",
    module: "Attendance",
    time: "Yesterday, 02:10 PM",
    type: "success",
  },
];

const recommendations: Recommendation[] = [
  {
    id: 1,
    title: "Enable two-factor authentication",
    description:
      "Your administrator account is currently using password-only authentication.",
    category: "Security",
    priority: "High",
    action: "security",
  },
  {
    id: 2,
    title: "Increase attendance automation",
    description:
      "Face scan, RFID and fingerprint are enabled. Add automated low-attendance alerts for parents.",
    category: "Attendance",
    priority: "Medium",
    action: "attendance",
  },
  {
    id: 3,
    title: "Automate overdue fee reminders",
    description:
      "WhatsApp fee reminders are enabled, but the reminder workflow can be made more consistent.",
    category: "Finance",
    priority: "Medium",
    action: "fees",
  },
  {
    id: 4,
    title: "Connect WhatsApp Business",
    description:
      "WhatsApp automation is configured but the actual provider connection is not active.",
    category: "Communication",
    priority: "High",
    action: "notifications",
  },
  {
    id: 5,
    title: "Enable cloud backups",
    description:
      "Automatic local backup is active. Cloud backup would improve disaster recovery.",
    category: "Data",
    priority: "Medium",
    action: "performance",
  },
];

const initialIntegrations: Integration[] = [
  {
    name: "Google Calendar",
    description: "Sync classes, exams and institute events.",
    icon: CalendarDays,
    connected: false,
    category: "Productivity",
  },
  {
    name: "Google Drive",
    description: "Store educational documents and files.",
    icon: Cloud,
    connected: false,
    category: "Storage",
  },
  {
    name: "Payment Gateway",
    description: "Accept online student and parent payments.",
    icon: Wallet,
    connected: false,
    category: "Finance",
  },
  {
    name: "Firebase",
    description: "Push notifications and mobile infrastructure.",
    icon: Smartphone,
    connected: false,
    category: "Mobile",
  },
  {
    name: "Cloud Storage",
    description: "S3-compatible storage for application files.",
    icon: HardDrive,
    connected: false,
    category: "Storage",
  },
  {
    name: "Webhooks",
    description: "Send platform events to external systems.",
    icon: Webhook,
    connected: false,
    category: "Developer",
  },
];

/* ==========================================================================
   HELPERS
   ========================================================================== */

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const selectClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const makeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

const priorityClasses = (priority: Recommendation["priority"]) => {
  if (priority === "High") {
    return "bg-red-50 text-red-700 border-red-100";
  }

  if (priority === "Medium") {
    return "bg-amber-50 text-amber-700 border-amber-100";
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-100";
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiAction, setAIAction] = useState<AIAction>("overview");

  const [saved, setSaved] = useState(true);
  const [toast, setToast] = useState("");
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const [importing, setImporting] = useState(false);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  /* ------------------------------------------------------------------------
     GENERAL
     ------------------------------------------------------------------------ */

  const [instituteName, setInstituteName] = useState("Coaching Institute");
  const [instituteCode, setInstituteCode] = useState("COACH-001");
  const [instituteEmail, setInstituteEmail] = useState(
    "admin@coachinginstitute.com",
  );
  const [institutePhone, setInstitutePhone] = useState("+91 98765 43210");
  const [website, setWebsite] = useState("https://coachinginstitute.com");
  const [address, setAddress] = useState("Indore, Madhya Pradesh, India");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("12-hour");
  const [businessStart, setBusinessStart] = useState("08:00");
  const [businessEnd, setBusinessEnd] = useState("20:00");

  /* ------------------------------------------------------------------------
     PROFILE
     ------------------------------------------------------------------------ */

  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("admin@coachinginstitute.com");
  const [adminPhone, setAdminPhone] = useState("+91 98765 43210");
  const [jobTitle, setJobTitle] = useState("Institute Administrator");

  /* ------------------------------------------------------------------------
     APPEARANCE
     ------------------------------------------------------------------------ */

  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("blue");
  const [density, setDensity] = useState("comfortable");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [compactTables, setCompactTables] = useState(false);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
  const [stickyHeaders, setStickyHeaders] = useState(true);

  /* ------------------------------------------------------------------------
     ACADEMIC
     ------------------------------------------------------------------------ */

  const [academicYear, setAcademicYear] = useState("2026-27");
  const [weekStart, setWeekStart] = useState("Monday");
  const [gradingSystem, setGradingSystem] = useState("Marks");
  const [defaultClassDuration, setDefaultClassDuration] = useState("60");
  const [maxStudentsPerBatch, setMaxStudentsPerBatch] = useState("60");
  const [defaultBreakDuration, setDefaultBreakDuration] = useState("10");
  const [workingDays, setWorkingDays] = useState("Monday - Saturday");
  const [autoGenerateStudentId, setAutoGenerateStudentId] = useState(true);
  const [autoGenerateBatchId, setAutoGenerateBatchId] = useState(true);

  /* ------------------------------------------------------------------------
     ATTENDANCE
     ------------------------------------------------------------------------ */

  const [lateAfter, setLateAfter] = useState("10");
  const [attendanceRequired, setAttendanceRequired] = useState("75");
  const [autoAbsent, setAutoAbsent] = useState(true);
  const [faceScan, setFaceScan] = useState(true);
  const [rfid, setRfid] = useState(true);
  const [fingerprint, setFingerprint] = useState(true);
  const [attendanceWhatsapp, setAttendanceWhatsapp] = useState(true);
  const [lowAttendanceAlert, setLowAttendanceAlert] = useState(true);
  const [attendanceDigest, setAttendanceDigest] = useState(false);
  const [allowManualOverride, setAllowManualOverride] = useState(true);

  /* ------------------------------------------------------------------------
     FEES
     ------------------------------------------------------------------------ */

  const [lateFeeEnabled, setLateFeeEnabled] = useState(true);
  const [lateFeeAmount, setLateFeeAmount] = useState("500");
  const [lateFeeType, setLateFeeType] = useState("Fixed");
  const [receiptPrefix, setReceiptPrefix] = useState("RCPT");
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [paymentReminderDays, setPaymentReminderDays] = useState("3");
  const [overdueReminderDays, setOverdueReminderDays] = useState("1");
  const [onlinePayments, setOnlinePayments] = useState(true);
  const [partialPayments, setPartialPayments] = useState(true);
  const [autoReceipt, setAutoReceipt] = useState(true);
  const [feeWhatsapp, setFeeWhatsapp] = useState(true);
  const [feeEmail, setFeeEmail] = useState(true);

  /* ------------------------------------------------------------------------
     EXAMS
     ------------------------------------------------------------------------ */

  const [defaultPassingPercentage, setDefaultPassingPercentage] =
    useState("40");
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [negativeMarksValue, setNegativeMarksValue] = useState("0.25");
  const [autoPublishResults, setAutoPublishResults] = useState(false);
  const [examNotifications, setExamNotifications] = useState(true);
  const [resultNotifications, setResultNotifications] = useState(true);
  const [showRank, setShowRank] = useState(true);
  const [showPercentile, setShowPercentile] = useState(true);
  const [allowRevaluation, setAllowRevaluation] = useState(false);

  /* ------------------------------------------------------------------------
     NOTIFICATIONS
     ------------------------------------------------------------------------ */

  const [notifyNewStudent, setNotifyNewStudent] = useState(true);
  const [notifyPayment, setNotifyPayment] = useState(true);
  const [notifyAttendance, setNotifyAttendance] = useState(true);
  const [notifyExam, setNotifyExam] = useState(true);
  const [notifyInquiry, setNotifyInquiry] = useState(true);
  const [notifySystem, setNotifySystem] = useState(true);
  const [notifyTeacher, setNotifyTeacher] = useState(true);
  const [notifyBatch, setNotifyBatch] = useState(true);
  const [quietHours, setQuietHours] = useState(false);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("07:00");
  const [criticalOverride, setCriticalOverride] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  /* ------------------------------------------------------------------------
     WHATSAPP
     ------------------------------------------------------------------------ */

  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [whatsappProvider, setWhatsappProvider] =
    useState("WhatsApp Cloud API");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappBusinessId, setWhatsappBusinessId] = useState("");
  const [whatsappAutoInquiry, setWhatsappAutoInquiry] = useState(true);
  const [whatsappAttendance, setWhatsappAttendance] = useState(true);
  const [whatsappFeeReminder, setWhatsappFeeReminder] = useState(true);
  const [whatsappExam, setWhatsappExam] = useState(true);
  const [whatsappResults, setWhatsappResults] = useState(true);
  const [whatsappTemplates, setWhatsappTemplates] = useState(true);

  /* ------------------------------------------------------------------------
     EMAIL
     ------------------------------------------------------------------------ */

  const [emailEnabled, setEmailEnabled] = useState(false);
  const [emailProvider, setEmailProvider] = useState("SMTP");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUsername, setSmtpUsername] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [emailSenderName, setEmailSenderName] = useState("Coaching Institute");
  const [emailSenderAddress, setEmailSenderAddress] = useState(
    "noreply@coachinginstitute.com",
  );
  const [emailReplyTo, setEmailReplyTo] = useState(
    "admin@coachinginstitute.com",
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(true);

  /* ------------------------------------------------------------------------
     SECURITY
     ------------------------------------------------------------------------ */

  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5");
  const [passwordExpiry, setPasswordExpiry] = useState("90");
  const [forceStrongPasswords, setForceStrongPasswords] = useState(true);
  const [singleSession, setSingleSession] = useState(false);
  const [ipRestriction, setIpRestriction] = useState(false);
  const [apiSecurity, setApiSecurity] = useState(true);

  /* ------------------------------------------------------------------------
     BRANDING
     ------------------------------------------------------------------------ */

  const [brandName, setBrandName] = useState("Coaching OS");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [secondaryColor, setSecondaryColor] = useState("#f59e0b");
  const [favicon, setFavicon] = useState("Default");
  const [logoText, setLogoText] = useState("CO");
  const [showPoweredBy, setShowPoweredBy] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  const [loginMessage, setLoginMessage] = useState(
    "Welcome back! Sign in to continue.",
  );

  /* ------------------------------------------------------------------------
     APPS
     ------------------------------------------------------------------------ */

  const [studentAppEnabled, setStudentAppEnabled] = useState(true);
  const [teacherAppEnabled, setTeacherAppEnabled] = useState(true);
  const [parentAppEnabled, setParentAppEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [publicWebsite, setPublicWebsite] = useState(true);
  const [allowSelfRegistration, setAllowSelfRegistration] = useState(true);
  const [enableStudentPortal, setEnableStudentPortal] = useState(true);
  const [enableParentPortal, setEnableParentPortal] = useState(true);
  const [enableTeacherPortal, setEnableTeacherPortal] = useState(true);

  /* ------------------------------------------------------------------------
     INTEGRATIONS
     ------------------------------------------------------------------------ */

  const [integrations, setIntegrations] =
    useState<Integration[]>(initialIntegrations);

  /* ------------------------------------------------------------------------
     BACKUP
     ------------------------------------------------------------------------ */

  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("Daily");
  const [backupRetention, setBackupRetention] = useState("30");
  const [cloudBackup, setCloudBackup] = useState(false);
  const [backupEncryption, setBackupEncryption] = useState(true);
  const [backupBeforeUpdates, setBackupBeforeUpdates] = useState(true);

  /* ------------------------------------------------------------------------
     PRIVACY
     ------------------------------------------------------------------------ */

  const [analytics, setAnalytics] = useState(true);
  const [errorTracking, setErrorTracking] = useState(true);
  const [dataEncryption, setDataEncryption] = useState(true);
  const [maskSensitiveData, setMaskSensitiveData] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [activityTracking, setActivityTracking] = useState(true);
  const [dataRetention, setDataRetention] = useState("365");

  /* ------------------------------------------------------------------------
     ROLES
     ------------------------------------------------------------------------ */

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Super Admin",
      description: "Full access to the entire system",
      users: 1,
      color: "blue",
    },
    {
      id: 2,
      name: "Administrator",
      description: "Manage daily institute operations",
      users: 3,
      color: "purple",
    },
    {
      id: 3,
      name: "Teacher",
      description: "Classes, attendance and academic access",
      users: 18,
      color: "green",
    },
    {
      id: 4,
      name: "Accountant",
      description: "Fees and financial management",
      users: 4,
      color: "orange",
    },
    {
      id: 5,
      name: "Counsellor",
      description: "Inquiry and student communication",
      users: 6,
      color: "pink",
    },
  ]);

  const [selectedRoleId, setSelectedRoleId] = useState(2);

  const [permissionState, setPermissionState] = useState<
    Record<string, boolean>
  >({
    "View Students": true,
    "Create Students": true,
    "Edit Students": true,
    "Delete Students": false,
    "Export Students": true,
    "View Teachers": true,
    "Create Teachers": false,
    "Edit Teachers": true,
    "Delete Teachers": false,
    "View Fees": true,
    "Record Payment": true,
    "Edit Fee Records": true,
    "Refund Payment": false,
    "Financial Reports": true,
    "View Attendance": true,
    "Mark Attendance": true,
    "Edit Attendance": true,
    "Export Attendance": true,
    "View Exams": true,
    "Create Exams": true,
    "Edit Exams": true,
    "Delete Exams": false,
    "Publish Results": false,
    "View Reports": true,
    "Export Reports": true,
    "AI Insights": true,
    "AI Assistant": true,
    "System Analytics": true,
  });

  /* ------------------------------------------------------------------------
     AUDIT
     ------------------------------------------------------------------------ */

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  /* ------------------------------------------------------------------------
     MODALS
     ------------------------------------------------------------------------ */

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);

  const [showDangerModal, setShowDangerModal] = useState(false);
  const [dangerAction, setDangerAction] = useState("");

  const [showSessionModal, setShowSessionModal] = useState(false);

  const [showTestModal, setShowTestModal] = useState(false);
  const [testType, setTestType] = useState("");

  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  /* ==========================================================================
     SEARCH
     ========================================================================== */

  const filteredMenu = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return settingsMenu;

    return settingsMenu.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.group.toLowerCase().includes(term),
    );
  }, [search]);

  /* ==========================================================================
     DERIVED DATA
     ========================================================================== */

  const securityScore = useMemo(() => {
    let score = 45;

    if (twoFactor) score += 15;
    if (forceStrongPasswords) score += 10;
    if (loginAlerts) score += 5;
    if (apiSecurity) score += 10;
    if (dataEncryption) score += 10;
    if (maskSensitiveData) score += 5;

    return Math.min(score, 100);
  }, [
    twoFactor,
    forceStrongPasswords,
    loginAlerts,
    apiSecurity,
    dataEncryption,
    maskSensitiveData,
  ]);

  const systemScore = useMemo(() => {
    let score = 72;

    if (autoBackup) score += 7;
    if (cloudBackup) score += 7;
    if (backupEncryption) score += 4;
    if (whatsappEnabled) score += 3;
    if (emailEnabled) score += 2;
    if (twoFactor) score += 5;

    return Math.min(score, 100);
  }, [
    autoBackup,
    cloudBackup,
    backupEncryption,
    whatsappEnabled,
    emailEnabled,
    twoFactor,
  ]);

  const connectedIntegrations = integrations.filter(
    (item) => item.connected,
  ).length;

  const currentRole =
    roles.find((role) => role.id === selectedRoleId) || roles[0];

  /* ==========================================================================
     UI HELPERS
     ========================================================================== */

  const markChanged = () => {
    setSaved(false);
  };

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2800);
  };

  const addAudit = (
    action: string,
    module: string,
    type: AuditLog["type"] = "success",
  ) => {
    setAuditLogs((current) => [
      {
        id: Date.now(),
        user: adminName,
        action,
        module,
        time: "Just now",
        type,
      },
      ...current,
    ]);
  };

  const saveSettings = () => {
    setSaved(true);
    setShowSaveConfirm(false);

    addAudit(
      `Saved ${
        settingsMenu.find((item) => item.id === activeSection)?.label ??
        "settings"
      } configuration`,
      "Settings",
    );

    showToast("Settings saved successfully");
  };

  const requestSave = () => {
    if (!saved) {
      setShowSaveConfirm(true);
      return;
    }

    showToast("Everything is already saved");
  };

  const resetSettings = () => {
    if (
      !window.confirm(
        "Reset the current settings section to its saved configuration? Demo state will be refreshed.",
      )
    ) {
      return;
    }

    setSaved(true);
    showToast("Current settings reset");
  };

  const selectSection = (section: SettingsSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const openAI = (action: AIAction = "overview") => {
    setAIAction(action);
    setShowAI(true);
  };

  /* ==========================================================================
     TOGGLE COMPONENT
     ========================================================================== */

  const Toggle = ({
    enabled,
    onChange,
    label,
  }: {
    enabled: boolean;
    onChange: (value: boolean) => void;
    label?: string;
  }) => (
    <button
      type="button"
      onClick={() => {
        onChange(!enabled);
        markChanged();
      }}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition",
        enabled ? "bg-blue-600" : "bg-slate-300",
      )}
      aria-label={label || "Toggle setting"}
      aria-pressed={enabled}
    >
      <span
        className={cn(
          "inline-block h-6 w-6 rounded-full bg-white shadow-md transition",
          enabled ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );

  /* ==========================================================================
     FIELD
     ========================================================================== */

  const Field = ({
    label,
    children,
    hint,
  }: {
    label: string;
    children: ReactNode;
    hint?: string;
  }) => (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-xs leading-5 text-slate-400">{hint}</p>
      )}
    </div>
  );

  /* ==========================================================================
     CARD
     ========================================================================== */

  const Card = ({
    children,
    className = "",
  }: {
    children: ReactNode;
    className?: string;
  }) => (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );

  /* ==========================================================================
     SECTION HEADER
     ========================================================================== */

  const SectionHeader = ({
    icon: Icon,
    title,
    description,
    badge,
  }: {
    icon: any;
    title: string;
    description: string;
    badge?: string;
  }) => (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Icon size={22} />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-slate-900">{title}</h2>

            {badge && (
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                {badge}
              </span>
            )}
          </div>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => openAI("overview")}
        className="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2.5 text-xs font-black text-violet-700 transition hover:bg-violet-100"
      >
        <Sparkles size={15} />
        AI Help
      </button>
    </div>
  );

  /* ==========================================================================
     SETTING ROW
     ========================================================================== */

  const SettingRow = ({
    icon: Icon,
    title,
    description,
    enabled,
    onChange,
    danger = false,
  }: {
    icon: any;
    title: string;
    description: string;
    enabled: boolean;
    onChange: (value: boolean) => void;
    danger?: boolean;
  }) => (
    <div className="flex items-center justify-between gap-5 border-b border-slate-100 py-5 last:border-b-0">
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={cn(
            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            danger ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600",
          )}
        >
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p
            className={cn(
              "text-sm font-black",
              danger ? "text-red-800" : "text-slate-800",
            )}
          >
            {title}
          </p>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <Toggle enabled={enabled} onChange={onChange} label={title} />
    </div>
  );

  /* ==========================================================================
     SAVE BAR
     ========================================================================== */

  const SaveBar = () => (
    <div className="sticky bottom-4 z-30 mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
      <div className="flex items-center gap-2">
        {saved ? (
          <>
            <CheckCircle2 size={18} className="text-emerald-500" />
            <div>
              <p className="text-sm font-bold text-slate-700">
                All changes saved
              </p>
              <p className="text-[11px] text-slate-400">
                Your current configuration is up to date.
              </p>
            </div>
          </>
        ) : (
          <>
            <AlertTriangle size={18} className="text-amber-500" />
            <div>
              <p className="text-sm font-bold text-amber-700">
                Unsaved changes
              </p>
              <p className="text-[11px] text-amber-600">
                Save before leaving this section.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={resetSettings}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={requestSave}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-blue-700"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );

  /* ==========================================================================
     EXPORT SETTINGS
     ========================================================================== */

  const exportSettings = () => {
    const backup = {
      product: "Coaching OS",
      version: APP_VERSION,
      exportedAt: new Date().toISOString(),

      general: {
        instituteName,
        instituteCode,
        instituteEmail,
        institutePhone,
        website,
        address,
        timezone,
        currency,
        dateFormat,
        timeFormat,
        businessStart,
        businessEnd,
      },

      profile: {
        adminName,
        adminEmail,
        adminPhone,
        jobTitle,
      },

      appearance: {
        theme,
        accent,
        density,
        sidebarCollapsed,
        animations,
        compactTables,
        showBreadcrumbs,
        stickyHeaders,
      },

      academic: {
        academicYear,
        weekStart,
        gradingSystem,
        defaultClassDuration,
        maxStudentsPerBatch,
        defaultBreakDuration,
        workingDays,
        autoGenerateStudentId,
        autoGenerateBatchId,
      },

      attendance: {
        lateAfter,
        attendanceRequired,
        autoAbsent,
        faceScan,
        rfid,
        fingerprint,
        attendanceWhatsapp,
        lowAttendanceAlert,
        attendanceDigest,
        allowManualOverride,
      },

      fees: {
        lateFeeEnabled,
        lateFeeAmount,
        lateFeeType,
        receiptPrefix,
        invoicePrefix,
        paymentReminderDays,
        overdueReminderDays,
        onlinePayments,
        partialPayments,
        autoReceipt,
        feeWhatsapp,
        feeEmail,
      },

      exams: {
        defaultPassingPercentage,
        negativeMarking,
        negativeMarksValue,
        autoPublishResults,
        examNotifications,
        resultNotifications,
        showRank,
        showPercentile,
        allowRevaluation,
      },

      notifications: {
        notifyNewStudent,
        notifyPayment,
        notifyAttendance,
        notifyExam,
        notifyInquiry,
        notifySystem,
        notifyTeacher,
        notifyBatch,
        quietHours,
        quietStart,
        quietEnd,
        criticalOverride,
        dailyDigest,
        pushNotifications,
      },

      whatsapp: {
        whatsappEnabled,
        whatsappProvider,
        whatsappPhone,
        whatsappBusinessId,
        whatsappAutoInquiry,
        whatsappAttendance,
        whatsappFeeReminder,
        whatsappExam,
        whatsappResults,
        whatsappTemplates,
      },

      email: {
        emailEnabled,
        emailProvider,
        smtpHost,
        smtpPort,
        smtpUsername,
        emailSenderName,
        emailSenderAddress,
        emailReplyTo,
        emailNotifications,
        emailReceipts,
      },

      security: {
        twoFactor,
        loginAlerts,
        sessionTimeout,
        maxLoginAttempts,
        passwordExpiry,
        forceStrongPasswords,
        singleSession,
        ipRestriction,
        apiSecurity,
      },

      branding: {
        brandName,
        primaryColor,
        secondaryColor,
        favicon,
        logoText,
        showPoweredBy,
        customDomain,
        loginMessage,
      },

      apps: {
        studentAppEnabled,
        teacherAppEnabled,
        parentAppEnabled,
        maintenanceMode,
        publicWebsite,
        allowSelfRegistration,
        enableStudentPortal,
        enableParentPortal,
        enableTeacherPortal,
      },

      roles,
      permissions: permissionState,

      integrations,

      backup: {
        autoBackup,
        backupFrequency,
        backupRetention,
        cloudBackup,
        backupEncryption,
        backupBeforeUpdates,
      },

      privacy: {
        analytics,
        errorTracking,
        dataEncryption,
        maskSensitiveData,
        privacyMode,
        activityTracking,
        dataRetention,
      },
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "coaching-os-settings-backup.json";
    link.click();

    URL.revokeObjectURL(url);

    addAudit("Exported system settings backup", "Data & Backup");

    showToast("Settings backup exported");
  };

  /* ==========================================================================
     IMPORT SETTINGS
     ========================================================================== */

  const importSettings = (file: File) => {
    setImporting(true);

    const reader = new FileReader();

    reader.onload = () => {
      try {
        JSON.parse(String(reader.result));

        setImporting(false);
        markChanged();

        addAudit("Imported settings configuration", "Data & Backup", "warning");

        showToast(
          "Backup validated. Full backend restore will be connected later.",
        );
      } catch {
        setImporting(false);
        showToast("Invalid settings backup file");
      }
    };

    reader.onerror = () => {
      setImporting(false);
      showToast("Unable to read backup file");
    };

    reader.readAsText(file);
  };

  /* ==========================================================================
     PASSWORD
     ========================================================================== */

  const changePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("Please complete all password fields");
      return;
    }

    if (newPassword.length < 8) {
      showToast("New password must contain at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(false);

    addAudit("Changed administrator password", "Security");

    showToast("Password changed successfully");
  };

  /* ==========================================================================
     ROLE ACTIONS
     ========================================================================== */

  const openCreateRole = () => {
    setEditingRole(null);
    setRoleName("");
    setRoleDescription("");
    setShowRoleModal(true);
  };

  const openEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setShowRoleModal(true);
  };

  const saveRole = () => {
    if (!roleName.trim()) {
      showToast("Role name is required");
      return;
    }

    if (editingRole) {
      setRoles((current) =>
        current.map((role) =>
          role.id === editingRole.id
            ? {
                ...role,
                name: roleName.trim(),
                description: roleDescription.trim(),
              }
            : role,
        ),
      );

      addAudit(`Updated role ${roleName.trim()}`, "Roles");

      showToast("Role updated successfully");
    } else {
      const newRole: Role = {
        id: Date.now(),
        name: roleName.trim(),
        description: roleDescription.trim(),
        users: 0,
        color: "blue",
      };

      setRoles((current) => [...current, newRole]);
      setSelectedRoleId(newRole.id);

      addAudit(`Created role ${newRole.name}`, "Roles");

      showToast("Role created successfully");
    }

    setShowRoleModal(false);
    markChanged();
  };

  const deleteRole = (role: Role) => {
    if (role.name === "Super Admin") {
      showToast("Super Admin cannot be deleted");
      return;
    }

    if (role.users > 0) {
      showToast(
        "This role has assigned users. Reassign users before deleting it.",
      );
      return;
    }

    if (!window.confirm(`Delete the ${role.name} role?`)) {
      return;
    }

    setRoles((current) => current.filter((item) => item.id !== role.id));

    addAudit(`Deleted role ${role.name}`, "Roles", "warning");

    showToast("Role deleted");
    markChanged();
  };

  /* ==========================================================================
     INTEGRATION
     ========================================================================== */

  const openIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowIntegrationModal(true);
  };

  const toggleIntegration = (name: string) => {
    setIntegrations((current) =>
      current.map((integration) =>
        integration.name === name
          ? {
              ...integration,
              connected: !integration.connected,
            }
          : integration,
      ),
    );

    const integration = integrations.find((item) => item.name === name);

    const nextState = !integration?.connected;

    addAudit(
      `${nextState ? "Connected" : "Disconnected"} ${name}`,
      "Integrations",
    );

    markChanged();

    showToast(nextState ? `${name} connected` : `${name} disconnected`);
  };

  /* ==========================================================================
     TEST CONNECTION
     ========================================================================== */

  const openTest = (type: string) => {
    setTestType(type);
    setShowTestModal(true);
  };

  const runTest = () => {
    setShowTestModal(false);

    addAudit(`Ran ${testType} connection test`, "Integrations");

    showToast(`${testType} test completed successfully`);
  };

  /* ==========================================================================
     DANGER ACTION
     ========================================================================== */

  const requestDangerAction = (action: string) => {
    setDangerAction(action);
    setShowDangerModal(true);
  };

  const confirmDangerAction = () => {
    setShowDangerModal(false);

    if (dangerAction === "cache") {
      addAudit("Cleared application cache", "System", "warning");

      showToast("Application cache cleared");
      return;
    }

    if (dangerAction === "demo") {
      addAudit("Requested demo-data reset", "System", "warning");

      showToast("Demo reset requires backend authorization");

      return;
    }

    if (dangerAction === "account") {
      addAudit("Requested institute account deletion", "System", "warning");

      showToast("Account deletion requires secure backend confirmation");
    }
  };

  /* ==========================================================================
     AI ACTIONS
     ========================================================================== */

  const aiContent = useMemo(() => {
    switch (aiAction) {
      case "security":
        return {
          title: "Security Optimization",
          summary:
            "Your security configuration is functional, but there are a few high-value improvements.",
          score: securityScore,
          items: [
            twoFactor
              ? "Two-factor authentication is enabled."
              : "Enable two-factor authentication for administrator accounts.",
            forceStrongPasswords
              ? "Strong password enforcement is active."
              : "Enable strong password requirements.",
            apiSecurity
              ? "API security controls are enabled."
              : "Enable API security before connecting external applications.",
            dataEncryption
              ? "Sensitive data encryption is configured."
              : "Enable encryption for sensitive data.",
          ],
        };

      case "attendance":
        return {
          title: "Attendance Optimization",
          summary:
            "Your attendance stack already supports multiple capture methods. Automation can make it more proactive.",
          score: faceScan && rfid && fingerprint ? 94 : 76,
          items: [
            "Keep multiple attendance methods available for fallback.",
            lowAttendanceAlert
              ? "Low-attendance alerts are enabled."
              : "Enable low-attendance alerts for parents.",
            attendanceWhatsapp
              ? "WhatsApp attendance messaging is configured."
              : "Enable attendance communication.",
            "Consider a daily attendance anomaly report for administrators.",
          ],
        };

      case "fees":
        return {
          title: "Fee Collection Optimization",
          summary:
            "The configuration supports online and automated fee collection. Reminder automation is the biggest opportunity.",
          score: onlinePayments && autoReceipt ? 91 : 70,
          items: [
            onlinePayments
              ? "Online payments are enabled."
              : "Enable online payments.",
            autoReceipt
              ? "Automatic receipt generation is enabled."
              : "Enable automatic receipts.",
            feeWhatsapp
              ? "WhatsApp fee reminders are configured."
              : "Enable WhatsApp fee reminders.",
            "Use separate reminder schedules for upcoming and overdue fees.",
          ],
        };

      case "notifications":
        return {
          title: "Communication Optimization",
          summary:
            "Your notification system is ready for event-driven automation.",
          score:
            pushNotifications && (whatsappEnabled || emailEnabled) ? 88 : 69,
          items: [
            pushNotifications
              ? "Push notifications are enabled."
              : "Enable push notifications.",
            whatsappEnabled
              ? "WhatsApp provider is active."
              : "Connect WhatsApp Business for automated communication.",
            emailEnabled
              ? "Email delivery is active."
              : "Configure email delivery for reliable fallback communication.",
            "Use quiet hours while allowing critical alerts to bypass them.",
          ],
        };

      case "performance":
        return {
          title: "System Optimization",
          summary:
            "The platform has a healthy foundation. Backup and integration readiness are the next priorities.",
          score: systemScore,
          items: [
            autoBackup
              ? "Automatic backups are enabled."
              : "Enable automatic backups.",
            cloudBackup
              ? "Cloud backup is enabled."
              : "Connect cloud backup for disaster recovery.",
            backupEncryption
              ? "Backup encryption is enabled."
              : "Enable encrypted backups.",
            "Connect production integrations only through secure backend services.",
          ],
        };

      default:
        return {
          title: "AI Settings Assistant",
          summary:
            "I analyzed the current configuration and found several opportunities to make Coaching OS more secure, automated and operationally efficient.",
          score: systemScore,
          items: [
            "Enable two-factor authentication.",
            "Connect WhatsApp Business for automated communication.",
            "Enable cloud backups.",
            "Use automated low-attendance and overdue-fee workflows.",
            "Keep production API credentials on the backend, never in frontend code.",
          ],
        };
    }
  }, [
    aiAction,
    securityScore,
    systemScore,
    twoFactor,
    forceStrongPasswords,
    apiSecurity,
    dataEncryption,
    faceScan,
    rfid,
    fingerprint,
    lowAttendanceAlert,
    attendanceWhatsapp,
    onlinePayments,
    autoReceipt,
    feeWhatsapp,
    pushNotifications,
    whatsappEnabled,
    emailEnabled,
    autoBackup,
    cloudBackup,
    backupEncryption,
  ]);

  const applyAIRecommendation = (recommendation: Recommendation) => {
    if (recommendation.action === "security") {
      setTwoFactor(true);
      setForceStrongPasswords(true);
      setApiSecurity(true);
      markChanged();
      showToast("Security recommendations applied");
    }

    if (recommendation.action === "attendance") {
      setLowAttendanceAlert(true);
      setAttendanceWhatsapp(true);
      markChanged();
      showToast("Attendance recommendations applied");
    }

    if (recommendation.action === "fees") {
      setFeeWhatsapp(true);
      setFeeEmail(true);
      setAutoReceipt(true);
      markChanged();
      showToast("Fee recommendations applied");
    }

    if (recommendation.action === "notifications") {
      setWhatsappEnabled(true);
      setPushNotifications(true);
      setCriticalOverride(true);
      markChanged();
      showToast("Communication recommendations applied");
    }

    if (recommendation.action === "performance") {
      setAutoBackup(true);
      setBackupEncryption(true);
      markChanged();
      showToast("System optimization recommendations applied");
    }

    addAudit(
      `Applied AI recommendation: ${recommendation.title}`,
      "AI Assistant",
    );
  };

  /* ==========================================================================
     GENERAL SECTION
     ========================================================================== */

  const renderGeneral = () => (
    <>
      <SectionHeader
        icon={Building2}
        title="Institute Profile"
        description="Manage the organization information used throughout the Coaching OS platform."
        badge="Core"
      />

      <Card>
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                Institute Workspace
              </p>

              <h3 className="mt-2 text-2xl font-black">{instituteName}</h3>

              <p className="mt-1 text-sm text-blue-100">
                {instituteCode} · {timezone}
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <p className="text-xs font-bold text-blue-100">System Status</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-black">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Operational
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Institute Name">
            <input
              value={instituteName}
              onChange={(e) => {
                setInstituteName(e.target.value);
                markChanged();
              }}
              className={inputClasses}
              placeholder="Enter institute name"
            />
          </Field>

          <Field label="Institute Code">
            <input
              value={instituteCode}
              onChange={(e) => {
                setInstituteCode(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Institute Email">
            <input
              type="email"
              value={instituteEmail}
              onChange={(e) => {
                setInstituteEmail(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Phone Number">
            <input
              value={institutePhone}
              onChange={(e) => {
                setInstitutePhone(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Website">
            <input
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Timezone">
            <select
              value={timezone}
              onChange={(e) => {
                setTimezone(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="Asia/Dubai">Asia/Dubai</option>
              <option value="Asia/Singapore">Asia/Singapore</option>
              <option value="Europe/London">Europe/London</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </Field>

          <Field label="Currency">
            <select
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option value="INR">INR — Indian Rupee</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </Field>

          <Field label="Date Format">
            <select
              value={dateFormat}
              onChange={(e) => {
                setDateFormat(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </Field>

          <Field label="Time Format">
            <select
              value={timeFormat}
              onChange={(e) => {
                setTimeFormat(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>12-hour</option>
              <option>24-hour</option>
            </select>
          </Field>

          <Field label="Business Start">
            <input
              type="time"
              value={businessStart}
              onChange={(e) => {
                setBusinessStart(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Business End">
            <input
              type="time"
              value={businessEnd}
              onChange={(e) => {
                setBusinessEnd(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Institute Address">
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  markChanged();
                }}
                rows={4}
                className={inputClasses}
              />
            </Field>
          </div>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     PROFILE
     ========================================================================== */

  const renderProfile = () => (
    <>
      <SectionHeader
        icon={User}
        title="Admin Profile"
        description="Manage your administrator identity, contact information and authentication."
      />

      <Card>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-black text-white shadow-lg">
              {adminName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">{adminName}</h3>

              <p className="mt-1 text-sm text-slate-500">{jobTitle}</p>

              <button
                type="button"
                onClick={() =>
                  showToast("Profile photo upload will be connected later")
                }
                className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-600"
              >
                <Pencil size={15} />
                Change profile photo
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-xs font-bold text-emerald-700">Account Status</p>
            <p className="mt-1 text-sm font-black text-emerald-900">
              Active Administrator
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full Name">
            <input
              value={adminName}
              onChange={(e) => {
                setAdminName(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Job Title">
            <input
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => {
                setAdminEmail(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Phone">
            <input
              value={adminPhone}
              onChange={(e) => {
                setAdminPhone(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-black text-slate-900">
                Password & Authentication
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Protect your administrator account.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <KeyRound size={16} />
              Change Password
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-400">Last Login</p>
            <p className="mt-2 text-sm font-black text-slate-800">
              Today, 09:12 AM
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-400">Active Sessions</p>
            <p className="mt-2 text-sm font-black text-slate-800">2 devices</p>
          </div>

          <button
            type="button"
            onClick={() => setShowSessionModal(true)}
            className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-left transition hover:bg-blue-100"
          >
            <p className="text-xs font-bold text-blue-500">Security</p>
            <p className="mt-2 text-sm font-black text-blue-800">
              Manage Sessions →
            </p>
          </button>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     APPEARANCE
     ========================================================================== */

  const renderAppearance = () => (
    <>
      <SectionHeader
        icon={Palette}
        title="Appearance"
        description="Customize the visual experience of the Coaching OS administration console."
      />

      <Card>
        <h3 className="text-sm font-black text-slate-800">Theme</h3>

        <p className="mt-1 text-xs text-slate-500">
          Choose how the administration console should appear.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            {
              id: "light",
              label: "Light",
              icon: Sun,
              description: "Clean and bright",
            },
            {
              id: "dark",
              label: "Dark",
              icon: Moon,
              description: "Low-light workspace",
            },
            {
              id: "system",
              label: "System",
              icon: Laptop,
              description: "Follow device",
            },
          ].map((item) => {
            const Icon = item.icon;
            const active = theme === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setTheme(item.id);
                  markChanged();
                }}
                className={cn(
                  "relative rounded-2xl border p-5 text-left transition",
                  active
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                )}
              >
                {active && (
                  <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check size={14} />
                  </span>
                )}

                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600",
                  )}
                >
                  <Icon size={20} />
                </div>

                <p className="mt-4 text-sm font-black text-slate-800">
                  {item.label}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-8 border-t border-slate-100 pt-7">
          <h3 className="text-sm font-black text-slate-800">Accent Color</h3>

          <div className="mt-4 flex flex-wrap gap-3">
            {[
              ["blue", "bg-blue-600"],
              ["indigo", "bg-indigo-600"],
              ["violet", "bg-violet-600"],
              ["emerald", "bg-emerald-600"],
              ["orange", "bg-orange-500"],
              ["rose", "bg-rose-500"],
            ].map(([id, color]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setAccent(id);
                  markChanged();
                }}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full ring-offset-2 transition",
                  color,
                  accent === id && "ring-2 ring-slate-900",
                )}
                aria-label={`${id} accent`}
              >
                {accent === id && <Check size={18} className="text-white" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-slate-100 pt-7 md:grid-cols-2">
          <Field label="Interface Density">
            <select
              value={density}
              onChange={(e) => {
                setDensity(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
              <option value="spacious">Spacious</option>
            </select>
          </Field>

          <SettingRow
            icon={Menu}
            title="Collapsed Sidebar"
            description="Use a compact navigation sidebar."
            enabled={sidebarCollapsed}
            onChange={setSidebarCollapsed}
          />

          <SettingRow
            icon={Zap}
            title="Animations"
            description="Enable smooth interface transitions."
            enabled={animations}
            onChange={setAnimations}
          />

          <SettingRow
            icon={FileText}
            title="Compact Tables"
            description="Reduce table row height."
            enabled={compactTables}
            onChange={setCompactTables}
          />

          <SettingRow
            icon={ChevronRight}
            title="Breadcrumbs"
            description="Show contextual navigation breadcrumbs."
            enabled={showBreadcrumbs}
            onChange={setShowBreadcrumbs}
          />

          <SettingRow
            icon={Menu}
            title="Sticky Table Headers"
            description="Keep important table headers visible while scrolling."
            enabled={stickyHeaders}
            onChange={setStickyHeaders}
          />
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     ACADEMIC
     ========================================================================== */

  const renderAcademic = () => (
    <>
      <SectionHeader
        icon={GraduationCap}
        title="Academic Settings"
        description="Configure the academic structure, timetable defaults and automatic identifiers."
      />

      <Card>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Current Academic Year">
            <select
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>2026-27</option>
              <option>2027-28</option>
              <option>2028-29</option>
            </select>
          </Field>

          <Field label="Week Starts On">
            <select
              value={weekStart}
              onChange={(e) => {
                setWeekStart(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </Field>

          <Field label="Grading System">
            <select
              value={gradingSystem}
              onChange={(e) => {
                setGradingSystem(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>Marks</option>
              <option>Grades</option>
              <option>Percentage</option>
              <option>CGPA</option>
            </select>
          </Field>

          <Field label="Default Class Duration">
            <input
              type="number"
              value={defaultClassDuration}
              onChange={(e) => {
                setDefaultClassDuration(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Maximum Students Per Batch">
            <input
              type="number"
              value={maxStudentsPerBatch}
              onChange={(e) => {
                setMaxStudentsPerBatch(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Default Break Duration">
            <input
              type="number"
              value={defaultBreakDuration}
              onChange={(e) => {
                setDefaultBreakDuration(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Working Days">
            <select
              value={workingDays}
              onChange={(e) => {
                setWorkingDays(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>Monday - Friday</option>
              <option>Monday - Saturday</option>
              <option>Monday - Sunday</option>
            </select>
          </Field>
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={Users}
            title="Auto Generate Student IDs"
            description="Automatically create unique IDs when students are registered."
            enabled={autoGenerateStudentId}
            onChange={setAutoGenerateStudentId}
          />

          <SettingRow
            icon={BookOpen}
            title="Auto Generate Batch IDs"
            description="Automatically create unique batch identifiers."
            enabled={autoGenerateBatchId}
            onChange={setAutoGenerateBatchId}
          />
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     ATTENDANCE
     ========================================================================== */

  const renderAttendance = () => (
    <>
      <SectionHeader
        icon={ClipboardCheck}
        title="Attendance"
        description="Configure attendance rules, biometric methods and automated communication."
      />

      <Card>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Mark Late After (minutes)">
            <input
              type="number"
              value={lateAfter}
              onChange={(e) => {
                setLateAfter(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Minimum Required Attendance (%)">
            <input
              type="number"
              value={attendanceRequired}
              onChange={(e) => {
                setAttendanceRequired(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={ClipboardCheck}
            title="Automatic Absent Marking"
            description="Automatically mark students absent when attendance is not recorded."
            enabled={autoAbsent}
            onChange={setAutoAbsent}
          />

          <SettingRow
            icon={Eye}
            title="Face Scan"
            description="Allow supported attendance devices to use facial recognition."
            enabled={faceScan}
            onChange={setFaceScan}
          />

          <SettingRow
            icon={Smartphone}
            title="Card / RFID / NFC"
            description="Allow attendance through supported cards or NFC devices."
            enabled={rfid}
            onChange={setRfid}
          />

          <SettingRow
            icon={Shield}
            title="Fingerprint"
            description="Allow biometric thumb/fingerprint attendance."
            enabled={fingerprint}
            onChange={setFingerprint}
          />

          <SettingRow
            icon={MessageCircle}
            title="WhatsApp Attendance Notifications"
            description="Notify parents or students about attendance events."
            enabled={attendanceWhatsapp}
            onChange={setAttendanceWhatsapp}
          />

          <SettingRow
            icon={AlertTriangle}
            title="Low Attendance Alerts"
            description="Alert parents and administrators when attendance drops below the configured threshold."
            enabled={lowAttendanceAlert}
            onChange={setLowAttendanceAlert}
          />

          <SettingRow
            icon={Activity}
            title="Attendance Digest"
            description="Generate periodic attendance summaries for administrators."
            enabled={attendanceDigest}
            onChange={setAttendanceDigest}
          />

          <SettingRow
            icon={Pencil}
            title="Manual Override"
            description="Allow authorized staff to correct attendance records."
            enabled={allowManualOverride}
            onChange={setAllowManualOverride}
          />
        </div>
      </Card>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="mt-0.5 shrink-0 text-blue-600" />

          <div>
            <h3 className="font-black text-blue-900">
              AI attendance recommendation
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              Your system supports multiple attendance methods. A future AI
              layer can detect unusual attendance patterns, identify at-risk
              students and recommend parent follow-up.
            </p>

            <button
              type="button"
              onClick={() => openAI("attendance")}
              className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-black text-blue-700 shadow-sm"
            >
              Analyze attendance configuration
            </button>
          </div>
        </div>
      </div>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     FEES
     ========================================================================== */

  const renderFees = () => (
    <>
      <SectionHeader
        icon={Wallet}
        title="Fees & Payments"
        description="Configure fee collection, payment reminders, receipts and online payment behavior."
      />

      <Card>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Receipt Prefix">
            <input
              value={receiptPrefix}
              onChange={(e) => {
                setReceiptPrefix(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Invoice Prefix">
            <input
              value={invoicePrefix}
              onChange={(e) => {
                setInvoicePrefix(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Reminder Before Due Date">
            <input
              type="number"
              value={paymentReminderDays}
              onChange={(e) => {
                setPaymentReminderDays(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Overdue Reminder Interval">
            <input
              type="number"
              value={overdueReminderDays}
              onChange={(e) => {
                setOverdueReminderDays(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Late Fee Type">
            <select
              value={lateFeeType}
              onChange={(e) => {
                setLateFeeType(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>Fixed</option>
              <option>Percentage</option>
            </select>
          </Field>

          <Field label="Late Fee Amount">
            <input
              type="number"
              value={lateFeeAmount}
              onChange={(e) => {
                setLateFeeAmount(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={AlertTriangle}
            title="Late Fee"
            description="Automatically apply late charges to overdue payments."
            enabled={lateFeeEnabled}
            onChange={setLateFeeEnabled}
          />

          <SettingRow
            icon={Globe}
            title="Online Payments"
            description="Allow students and parents to pay fees online."
            enabled={onlinePayments}
            onChange={setOnlinePayments}
          />

          <SettingRow
            icon={Wallet}
            title="Partial Payments"
            description="Allow students to make payments in installments."
            enabled={partialPayments}
            onChange={setPartialPayments}
          />

          <SettingRow
            icon={FileText}
            title="Automatic Receipts"
            description="Generate receipts automatically after successful payments."
            enabled={autoReceipt}
            onChange={setAutoReceipt}
          />

          <SettingRow
            icon={MessageCircle}
            title="WhatsApp Fee Reminders"
            description="Send fee reminders through WhatsApp."
            enabled={feeWhatsapp}
            onChange={setFeeWhatsapp}
          />

          <SettingRow
            icon={Mail}
            title="Email Fee Reminders"
            description="Send fee reminders through email."
            enabled={feeEmail}
            onChange={setFeeEmail}
          />
        </div>
      </Card>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-xs font-bold text-emerald-600">Collection</p>
          <p className="mt-2 text-2xl font-black text-emerald-900">87.4%</p>
          <p className="mt-1 text-xs text-emerald-700">
            Demo collection efficiency
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <p className="text-xs font-bold text-amber-600">Pending</p>
          <p className="mt-2 text-2xl font-black text-amber-900">₹4.82L</p>
          <p className="mt-1 text-xs text-amber-700">Demo outstanding amount</p>
        </div>

        <button
          type="button"
          onClick={() => openAI("fees")}
          className="rounded-2xl border border-violet-100 bg-violet-50 p-5 text-left transition hover:bg-violet-100"
        >
          <Sparkles size={18} className="text-violet-600" />
          <p className="mt-3 text-sm font-black text-violet-900">
            AI Fee Optimization
          </p>
          <p className="mt-1 text-xs leading-5 text-violet-700">
            Analyze reminders, collection and overdue workflows.
          </p>
        </button>
      </div>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     EXAMS
     ========================================================================== */

  const renderExams = () => (
    <>
      <SectionHeader
        icon={FileText}
        title="Exam Settings"
        description="Configure default exam rules, result publishing and student-facing performance information."
      />

      <Card>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Default Passing Percentage">
            <input
              type="number"
              value={defaultPassingPercentage}
              onChange={(e) => {
                setDefaultPassingPercentage(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Negative Marks Per Wrong Answer">
            <input
              type="number"
              step="0.01"
              value={negativeMarksValue}
              onChange={(e) => {
                setNegativeMarksValue(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={AlertTriangle}
            title="Negative Marking"
            description="Enable negative marks as a default exam option."
            enabled={negativeMarking}
            onChange={setNegativeMarking}
          />

          <SettingRow
            icon={CheckCircle2}
            title="Auto Publish Results"
            description="Automatically publish results after an exam is completed."
            enabled={autoPublishResults}
            onChange={setAutoPublishResults}
          />

          <SettingRow
            icon={Bell}
            title="Exam Notifications"
            description="Notify students and parents about upcoming exams."
            enabled={examNotifications}
            onChange={setExamNotifications}
          />

          <SettingRow
            icon={Bell}
            title="Result Notifications"
            description="Notify students and parents when results are published."
            enabled={resultNotifications}
            onChange={setResultNotifications}
          />

          <SettingRow
            icon={Activity}
            title="Show Rank"
            description="Display rank in supported result reports."
            enabled={showRank}
            onChange={setShowRank}
          />

          <SettingRow
            icon={Activity}
            title="Show Percentile"
            description="Display percentile information in results."
            enabled={showPercentile}
            onChange={setShowPercentile}
          />

          <SettingRow
            icon={RefreshCw}
            title="Allow Revaluation"
            description="Allow authorized staff to initiate result revaluation workflows."
            enabled={allowRevaluation}
            onChange={setAllowRevaluation}
          />
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     NOTIFICATIONS
     ========================================================================== */

  const renderNotifications = () => (
    <>
      <SectionHeader
        icon={Bell}
        title="Notification Preferences"
        description="Control system alerts, event notifications, quiet hours and communication behavior."
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Push", pushNotifications],
            ["Quiet Hours", quietHours],
            ["Critical Override", criticalOverride],
            ["Daily Digest", dailyDigest],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-xs font-bold text-slate-400">{label}</p>

              <p className="mt-2 text-sm font-black text-slate-800">
                {value ? "Enabled" : "Disabled"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={User}
            title="New Student"
            description="Notify administrators when a new student is registered."
            enabled={notifyNewStudent}
            onChange={setNotifyNewStudent}
          />

          <SettingRow
            icon={Wallet}
            title="Payment Received"
            description="Notify administrators when a payment is recorded."
            enabled={notifyPayment}
            onChange={setNotifyPayment}
          />

          <SettingRow
            icon={ClipboardCheck}
            title="Attendance"
            description="Notify administrators about attendance events."
            enabled={notifyAttendance}
            onChange={setNotifyAttendance}
          />

          <SettingRow
            icon={FileText}
            title="Exams"
            description="Notify administrators about exam events."
            enabled={notifyExam}
            onChange={setNotifyExam}
          />

          <SettingRow
            icon={Phone}
            title="New Inquiry"
            description="Notify counsellors when a new inquiry is received."
            enabled={notifyInquiry}
            onChange={setNotifyInquiry}
          />

          <SettingRow
            icon={GraduationCap}
            title="Teacher Events"
            description="Notify administrators about important teacher events."
            enabled={notifyTeacher}
            onChange={setNotifyTeacher}
          />

          <SettingRow
            icon={BookOpen}
            title="Batch Events"
            description="Notify administrators about important batch changes."
            enabled={notifyBatch}
            onChange={setNotifyBatch}
          />

          <SettingRow
            icon={Server}
            title="System Alerts"
            description="Receive important technical and system notifications."
            enabled={notifySystem}
            onChange={setNotifySystem}
          />

          <SettingRow
            icon={Smartphone}
            title="Push Notifications"
            description="Enable browser and mobile push notifications."
            enabled={pushNotifications}
            onChange={setPushNotifications}
          />

          <SettingRow
            icon={Moon}
            title="Quiet Hours"
            description="Pause non-critical notifications during selected hours."
            enabled={quietHours}
            onChange={setQuietHours}
          />

          <SettingRow
            icon={AlertTriangle}
            title="Critical Alert Override"
            description="Allow critical alerts to bypass quiet hours."
            enabled={criticalOverride}
            onChange={setCriticalOverride}
          />

          <SettingRow
            icon={Activity}
            title="Daily Digest"
            description="Combine non-critical administrative notifications into a digest."
            enabled={dailyDigest}
            onChange={setDailyDigest}
          />
        </div>

        {quietHours && (
          <div className="mt-5 grid gap-5 rounded-2xl bg-slate-50 p-5 md:grid-cols-2">
            <Field label="Quiet Hours Start">
              <input
                type="time"
                value={quietStart}
                onChange={(e) => {
                  setQuietStart(e.target.value);
                  markChanged();
                }}
                className={inputClasses}
              />
            </Field>

            <Field label="Quiet Hours End">
              <input
                type="time"
                value={quietEnd}
                onChange={(e) => {
                  setQuietEnd(e.target.value);
                  markChanged();
                }}
                className={inputClasses}
              />
            </Field>
          </div>
        )}
      </Card>

      <div className="mt-6 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-blue-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
            <Sparkles size={20} />
          </div>

          <div className="flex-1">
            <h3 className="font-black text-violet-900">
              AI Communication Assistant
            </h3>

            <p className="mt-1 text-sm leading-6 text-violet-800">
              AI can later analyze delivery behavior, recommend channels and
              suggest the best time to send attendance, fee and exam
              notifications.
            </p>

            <button
              type="button"
              onClick={() => openAI("notifications")}
              className="mt-4 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-violet-700 shadow-sm"
            >
              Analyze notification settings
            </button>
          </div>
        </div>
      </div>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     WHATSAPP
     ========================================================================== */

  const renderWhatsApp = () => (
    <>
      <SectionHeader
        icon={MessageCircle}
        title="WhatsApp Business"
        description="Configure WhatsApp communication for inquiries, attendance, fees, exams and results."
        badge={whatsappEnabled ? "Active" : "Setup Required"}
      />

      <Card>
        <div
          className={cn(
            "mb-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5",
            whatsappEnabled ? "bg-emerald-50" : "bg-amber-50",
          )}
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full text-white",
                whatsappEnabled ? "bg-emerald-500" : "bg-amber-500",
              )}
            >
              <MessageCircle size={21} />
            </div>

            <div>
              <p
                className={cn(
                  "text-sm font-black",
                  whatsappEnabled ? "text-emerald-900" : "text-amber-900",
                )}
              >
                WhatsApp Business Communication
              </p>

              <p
                className={cn(
                  "mt-1 text-xs",
                  whatsappEnabled ? "text-emerald-700" : "text-amber-700",
                )}
              >
                {whatsappEnabled
                  ? "Provider connection is enabled."
                  : "Connect your provider to activate automation."}
              </p>
            </div>
          </div>

          <Toggle
            enabled={whatsappEnabled}
            onChange={setWhatsappEnabled}
            label="WhatsApp enabled"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Provider">
            <select
              value={whatsappProvider}
              onChange={(e) => {
                setWhatsappProvider(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>WhatsApp Cloud API</option>
              <option>Twilio WhatsApp</option>
              <option>Other Provider</option>
            </select>
          </Field>

          <Field label="Business Phone">
            <input
              value={whatsappPhone}
              onChange={(e) => {
                setWhatsappPhone(e.target.value);
                markChanged();
              }}
              className={inputClasses}
              placeholder="+91..."
            />
          </Field>

          <Field label="Business Account ID">
            <input
              value={whatsappBusinessId}
              onChange={(e) => {
                setWhatsappBusinessId(e.target.value);
                markChanged();
              }}
              className={inputClasses}
              placeholder="Enter business account ID"
            />
          </Field>

          <Field label="Template Mode">
            <select
              className={selectClasses}
              defaultValue="Approved Templates"
              onChange={() => markChanged()}
            >
              <option>Approved Templates</option>
              <option>Template + Session Messages</option>
            </select>
          </Field>
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={User}
            title="Inquiry Automation"
            description="Send WhatsApp follow-ups to inquiry leads."
            enabled={whatsappAutoInquiry}
            onChange={setWhatsappAutoInquiry}
          />

          <SettingRow
            icon={ClipboardCheck}
            title="Attendance Messages"
            description="Send attendance notifications."
            enabled={whatsappAttendance}
            onChange={setWhatsappAttendance}
          />

          <SettingRow
            icon={Wallet}
            title="Fee Reminders"
            description="Send automatic fee reminders."
            enabled={whatsappFeeReminder}
            onChange={setWhatsappFeeReminder}
          />

          <SettingRow
            icon={FileText}
            title="Exam Messages"
            description="Send exam reminders."
            enabled={whatsappExam}
            onChange={setWhatsappExam}
          />

          <SettingRow
            icon={CheckCircle2}
            title="Result Messages"
            description="Send result publication notifications."
            enabled={whatsappResults}
            onChange={setWhatsappResults}
          />

          <SettingRow
            icon={FileText}
            title="Template Enforcement"
            description="Require approved WhatsApp templates for automated outbound messages."
            enabled={whatsappTemplates}
            onChange={setWhatsappTemplates}
          />
        </div>

        <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => openTest("WhatsApp")}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white hover:bg-blue-700"
          >
            <MessageCircle size={16} />
            Test Connection
          </button>

          <button
            type="button"
            onClick={() =>
              showToast("WhatsApp template manager will be connected later")
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <FileText size={16} />
            Manage Templates
          </button>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     EMAIL
     ========================================================================== */

  const renderEmail = () => (
    <>
      <SectionHeader
        icon={Mail}
        title="Email Delivery"
        description="Configure transactional and administrative email delivery."
      />

      <Card>
        <div className="mb-7 flex items-center justify-between rounded-2xl bg-blue-50 p-5">
          <div>
            <p className="text-sm font-black text-blue-900">Email Delivery</p>

            <p className="mt-1 text-xs text-blue-700">
              Configure SMTP or a supported email provider.
            </p>
          </div>

          <Toggle
            enabled={emailEnabled}
            onChange={setEmailEnabled}
            label="Email enabled"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Provider">
            <select
              value={emailProvider}
              onChange={(e) => {
                setEmailProvider(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>SMTP</option>
              <option>SendGrid</option>
              <option>Amazon SES</option>
              <option>Resend</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="SMTP Host">
            <input
              value={smtpHost}
              onChange={(e) => {
                setSmtpHost(e.target.value);
                markChanged();
              }}
              className={inputClasses}
              placeholder="smtp.example.com"
            />
          </Field>

          <Field label="Port">
            <input
              value={smtpPort}
              onChange={(e) => {
                setSmtpPort(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Username">
            <input
              value={smtpUsername}
              onChange={(e) => {
                setSmtpUsername(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Password">
            <input
              type="password"
              value={smtpPassword}
              onChange={(e) => {
                setSmtpPassword(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Sender Name">
            <input
              value={emailSenderName}
              onChange={(e) => {
                setEmailSenderName(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Sender Email">
            <input
              type="email"
              value={emailSenderAddress}
              onChange={(e) => {
                setEmailSenderAddress(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Reply-To Email">
            <input
              type="email"
              value={emailReplyTo}
              onChange={(e) => {
                setEmailReplyTo(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={Bell}
            title="System Emails"
            description="Send administrative system notifications through email."
            enabled={emailNotifications}
            onChange={setEmailNotifications}
          />

          <SettingRow
            icon={FileText}
            title="Email Receipts"
            description="Send payment receipts to configured recipients."
            enabled={emailReceipts}
            onChange={setEmailReceipts}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openTest("Email")}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white hover:bg-blue-700"
          >
            <Mail size={16} />
            Send Test Email
          </button>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     ROLES
     ========================================================================== */

  const renderRoles = () => (
    <>
      <SectionHeader
        icon={Shield}
        title="Roles & Permissions"
        description="Control access across students, teachers, finance, attendance, exams, reports and AI."
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-slate-900">System Roles</h3>

            <p className="mt-1 text-sm text-slate-500">
              Create custom access roles for your organization.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateRole}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white hover:bg-blue-700"
          >
            <Users size={16} />
            Add Role
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRoleId(role.id)}
              className={cn(
                "rounded-2xl border p-4 text-left transition",
                selectedRoleId === role.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:bg-slate-50",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Shield size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-black text-slate-800">
                      {role.name}
                    </p>

                    <p className="text-xs text-slate-400">{role.users} users</p>
                  </div>
                </div>

                {selectedRoleId === role.id && (
                  <CheckCircle2 size={18} className="text-blue-600" />
                )}
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                {role.description}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => currentRole && openEditRole(currentRole)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <Edit3 size={16} />
            Edit Selected Role
          </button>

          {currentRole && currentRole.name !== "Super Admin" && (
            <button
              type="button"
              onClick={() => deleteRole(currentRole)}
              className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100"
            >
              <Trash2 size={16} />
              Delete Selected Role
            </button>
          )}
        </div>
      </Card>

      <Card>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-slate-900">Permission Matrix</h3>

            <p className="mt-1 text-sm text-slate-500">
              Editing permissions for{" "}
              <span className="font-bold text-slate-700">
                {currentRole?.name}
              </span>
              .
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
            {Object.values(permissionState).filter(Boolean).length} permissions
            enabled
          </span>
        </div>

        <div className="space-y-6">
          {permissionGroups.map((group) => (
            <div
              key={group.name}
              className="overflow-hidden rounded-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between bg-slate-50 px-4 py-3">
                <p className="text-sm font-black text-slate-800">
                  {group.name}
                </p>

                <span className="text-[11px] font-bold text-slate-400">
                  {group.permissions.length} controls
                </span>
              </div>

              <div className="grid md:grid-cols-2">
                {group.permissions.map((permission) => (
                  <label
                    key={permission}
                    className="flex cursor-pointer items-center justify-between border-b border-r border-slate-100 px-4 py-4 transition hover:bg-slate-50"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {permission}
                    </span>

                    <input
                      type="checkbox"
                      checked={permissionState[permission] ?? false}
                      onChange={(e) => {
                        setPermissionState((current) => ({
                          ...current,
                          [permission]: e.target.checked,
                        }));

                        markChanged();
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     SECURITY
     ========================================================================== */

  const renderSecurity = () => (
    <>
      <SectionHeader
        icon={Lock}
        title="Security"
        description="Protect administrator accounts, sessions, APIs and authentication."
        badge={`${securityScore}% secure`}
      />

      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400">Security Score</p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-black text-slate-900">
              {securityScore}%
            </p>

            <Shield size={25} className="text-blue-600" />
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${securityScore}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-xs font-bold text-emerald-600">Protection</p>

          <p className="mt-3 text-lg font-black text-emerald-900">
            {dataEncryption ? "Encryption enabled" : "Review encryption"}
          </p>

          <p className="mt-1 text-xs text-emerald-700">
            Sensitive-data protection status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openAI("security")}
          className="rounded-2xl border border-violet-100 bg-violet-50 p-5 text-left transition hover:bg-violet-100"
        >
          <Sparkles size={20} className="text-violet-600" />

          <p className="mt-3 text-sm font-black text-violet-900">
            AI Security Review
          </p>

          <p className="mt-1 text-xs leading-5 text-violet-700">
            Analyze the current security configuration.
          </p>
        </button>
      </div>

      <Card>
        <SettingRow
          icon={Shield}
          title="Two-Factor Authentication"
          description="Require a second verification step for administrator accounts."
          enabled={twoFactor}
          onChange={setTwoFactor}
        />

        <SettingRow
          icon={Bell}
          title="Login Alerts"
          description="Notify administrators about new account logins."
          enabled={loginAlerts}
          onChange={setLoginAlerts}
        />

        <SettingRow
          icon={KeyRound}
          title="Force Strong Passwords"
          description="Require stronger passwords for staff accounts."
          enabled={forceStrongPasswords}
          onChange={setForceStrongPasswords}
        />

        <SettingRow
          icon={Laptop}
          title="Single Active Session"
          description="Limit an account to one active session at a time."
          enabled={singleSession}
          onChange={setSingleSession}
        />

        <SettingRow
          icon={Globe}
          title="IP Restrictions"
          description="Restrict administrative access to approved IP ranges."
          enabled={ipRestriction}
          onChange={setIpRestriction}
        />

        <SettingRow
          icon={Code2}
          title="API Security"
          description="Apply authentication and security requirements to API access."
          enabled={apiSecurity}
          onChange={setApiSecurity}
        />

        <div className="mt-6 grid gap-5 border-t border-slate-100 pt-6 md:grid-cols-3">
          <Field label="Session Timeout (minutes)">
            <input
              type="number"
              value={sessionTimeout}
              onChange={(e) => {
                setSessionTimeout(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Maximum Login Attempts">
            <input
              type="number"
              value={maxLoginAttempts}
              onChange={(e) => {
                setMaxLoginAttempts(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Password Expiry (days)">
            <input
              type="number"
              value={passwordExpiry}
              onChange={(e) => {
                setPasswordExpiry(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>
        </div>
      </Card>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-600" />

          <div>
            <h3 className="font-black text-amber-900">
              Production security reminder
            </h3>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              These controls are currently frontend configuration UI. Real
              authentication, authorization, encryption, rate limiting, session
              invalidation and API protection will be enforced by the backend.
            </p>
          </div>
        </div>
      </div>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     BRANDING
     ========================================================================== */

  const renderBranding = () => (
    <>
      <SectionHeader
        icon={Palette}
        title="Branding"
        description="Customize the identity customers and students see across your platform."
      />

      <Card>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Brand Name">
            <input
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Logo Text">
            <input
              value={logoText}
              onChange={(e) => {
                setLogoText(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>

          <Field label="Primary Brand Color">
            <div className="flex gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  markChanged();
                }}
                className="h-12 w-16 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
              />

              <input
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  markChanged();
                }}
                className={inputClasses}
              />
            </div>
          </Field>

          <Field label="Secondary Brand Color">
            <div className="flex gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => {
                  setSecondaryColor(e.target.value);
                  markChanged();
                }}
                className="h-12 w-16 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
              />

              <input
                value={secondaryColor}
                onChange={(e) => {
                  setSecondaryColor(e.target.value);
                  markChanged();
                }}
                className={inputClasses}
              />
            </div>
          </Field>

          <Field label="Favicon">
            <select
              value={favicon}
              onChange={(e) => {
                setFavicon(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>Default</option>
              <option>Institute Logo</option>
              <option>Custom Icon</option>
            </select>
          </Field>

          <Field label="Custom Domain">
            <input
              value={customDomain}
              onChange={(e) => {
                setCustomDomain(e.target.value);
                markChanged();
              }}
              className={inputClasses}
              placeholder="portal.yourinstitute.com"
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Login Page Message">
              <textarea
                value={loginMessage}
                onChange={(e) => {
                  setLoginMessage(e.target.value);
                  markChanged();
                }}
                rows={3}
                className={inputClasses}
              />
            </Field>
          </div>
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={Globe}
            title="Show Powered By"
            description="Display Coaching OS branding on public-facing pages."
            enabled={showPoweredBy}
            onChange={setShowPoweredBy}
          />
        </div>

        <div className="mt-7 rounded-2xl border border-slate-200 p-6">
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
            Live Brand Preview
          </p>

          <div className="mt-5 rounded-2xl bg-slate-50 p-6">
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg"
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                {logoText.slice(0, 3).toUpperCase()}
              </div>

              <div>
                <p className="text-xl font-black text-slate-900">{brandName}</p>

                <p className="mt-1 text-sm text-slate-500">{loginMessage}</p>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 rounded-xl px-5 py-3 text-sm font-black text-white"
              style={{
                backgroundColor: primaryColor,
              }}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     APPS
     ========================================================================== */

  const renderApps = () => (
    <>
      <SectionHeader
        icon={AppWindow}
        title="Website & Apps"
        description="Control the availability of student, parent, teacher and public applications."
      />

      <Card>
        <SettingRow
          icon={Smartphone}
          title="Student App"
          description="Enable the student mobile application."
          enabled={studentAppEnabled}
          onChange={setStudentAppEnabled}
        />

        <SettingRow
          icon={GraduationCap}
          title="Teacher App"
          description="Enable the teacher mobile application."
          enabled={teacherAppEnabled}
          onChange={setTeacherAppEnabled}
        />

        <SettingRow
          icon={Users}
          title="Parent App"
          description="Enable the parent mobile application."
          enabled={parentAppEnabled}
          onChange={setParentAppEnabled}
        />

        <SettingRow
          icon={User}
          title="Student Portal"
          description="Allow students to access the web portal."
          enabled={enableStudentPortal}
          onChange={setEnableStudentPortal}
        />

        <SettingRow
          icon={Users}
          title="Parent Portal"
          description="Allow parents to access the web portal."
          enabled={enableParentPortal}
          onChange={setEnableParentPortal}
        />

        <SettingRow
          icon={GraduationCap}
          title="Teacher Portal"
          description="Allow teachers to access the web portal."
          enabled={enableTeacherPortal}
          onChange={setEnableTeacherPortal}
        />

        <SettingRow
          icon={Globe}
          title="Public Website"
          description="Allow your public-facing website to remain accessible."
          enabled={publicWebsite}
          onChange={setPublicWebsite}
        />

        <SettingRow
          icon={User}
          title="Self Registration"
          description="Allow students or parents to submit registration requests."
          enabled={allowSelfRegistration}
          onChange={setAllowSelfRegistration}
        />

        <SettingRow
          icon={AlertTriangle}
          title="Maintenance Mode"
          description="Temporarily restrict platform access while maintenance is performed."
          enabled={maintenanceMode}
          onChange={setMaintenanceMode}
        />
      </Card>

      {maintenanceMode && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={19} className="text-amber-600" />

            <div>
              <p className="font-black text-amber-900">
                Maintenance mode is enabled
              </p>

              <p className="mt-1 text-sm text-amber-800">
                In production, this will be enforced by the backend and can
                display a maintenance page to students, parents and staff.
              </p>
            </div>
          </div>
        </div>
      )}

      <SaveBar />
    </>
  );

  /* ==========================================================================
     INTEGRATIONS
     ========================================================================== */

  const renderIntegrations = () => (
    <>
      <SectionHeader
        icon={Zap}
        title="Integrations"
        description="Connect external services to extend Coaching OS."
        badge={`${connectedIntegrations}/${integrations.length} connected`}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {integrations.map((integration) => {
          const Icon = integration.icon;

          return (
            <Card key={integration.name}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={21} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black text-slate-900">
                        {integration.name}
                      </h3>

                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                        {integration.category}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {integration.description}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-black",
                    integration.connected
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  {integration.connected ? "Connected" : "Not Connected"}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => openIntegration(integration)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-50"
                >
                  <SettingsIcon size={16} />
                  Configure
                </button>

                <button
                  type="button"
                  onClick={() => toggleIntegration(integration.name)}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm font-black",
                    integration.connected
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-blue-600 text-white hover:bg-blue-700",
                  )}
                >
                  {integration.connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-start gap-3">
          <Shield size={19} className="mt-0.5 text-blue-600" />

          <p className="text-sm leading-6 text-blue-800">
            Production API keys, OAuth secrets, payment credentials and webhook
            secrets should be stored on the backend or secret manager, not
            inside this frontend page.
          </p>
        </div>
      </div>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     BACKUP
     ========================================================================== */

  const renderBackup = () => (
    <>
      <SectionHeader
        icon={Database}
        title="Data & Backup"
        description="Protect configuration and prepare your platform for reliable disaster recovery."
      />

      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-xs font-bold text-emerald-600">Backup Status</p>

          <p className="mt-2 text-xl font-black text-emerald-900">
            {autoBackup ? "Protected" : "Review Needed"}
          </p>

          <p className="mt-1 text-xs text-emerald-700">
            Automatic backup configuration.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold text-slate-400">Frequency</p>

          <p className="mt-2 text-xl font-black text-slate-900">
            {backupFrequency}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Current backup schedule.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-xs font-bold text-blue-600">Retention</p>

          <p className="mt-2 text-xl font-black text-blue-900">
            {backupRetention} days
          </p>

          <p className="mt-1 text-xs text-blue-700">
            Configured retention period.
          </p>
        </div>
      </div>

      <Card>
        <SettingRow
          icon={Database}
          title="Automatic Backup"
          description="Automatically create scheduled backups."
          enabled={autoBackup}
          onChange={setAutoBackup}
        />

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Backup Frequency">
            <select
              value={backupFrequency}
              onChange={(e) => {
                setBackupFrequency(e.target.value);
                markChanged();
              }}
              className={selectClasses}
            >
              <option>Every Hour</option>
              <option>Every 6 Hours</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </Field>

          <Field label="Retention Period (days)">
            <input
              type="number"
              value={backupRetention}
              onChange={(e) => {
                setBackupRetention(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-2">
          <SettingRow
            icon={Cloud}
            title="Cloud Backup"
            description="Store backups in connected cloud storage."
            enabled={cloudBackup}
            onChange={setCloudBackup}
          />

          <SettingRow
            icon={Lock}
            title="Backup Encryption"
            description="Encrypt backup data before storage."
            enabled={backupEncryption}
            onChange={setBackupEncryption}
          />

          <SettingRow
            icon={RefreshCw}
            title="Backup Before Updates"
            description="Create a backup before important application updates."
            enabled={backupBeforeUpdates}
            onChange={setBackupBeforeUpdates}
          />
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="font-black text-slate-900">Configuration Backup</h3>

        <p className="mt-1 text-sm text-slate-500">
          Export or import your current frontend configuration.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportSettings}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white hover:bg-blue-700"
          >
            <Download size={16} />
            Export Settings
          </button>

          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            disabled={importing}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <ArrowUpFromLine size={16} />
            {importing ? "Validating..." : "Import Backup"}
          </button>

          <input
            ref={importInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                importSettings(file);
              }

              e.currentTarget.value = "";
            }}
          />
        </div>
      </Card>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     AUDIT
     ========================================================================== */

  const renderAudit = () => (
    <>
      <SectionHeader
        icon={Activity}
        title="Audit Logs"
        description="Review important administrative actions performed inside Coaching OS."
      />

      <Card>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-slate-900">Activity Timeline</h3>

            <p className="mt-1 text-sm text-slate-500">
              Recent system and administrator activity.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setAuditLogs([]);
                showToast("Audit display cleared");
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              <RefreshCw size={15} />
              Clear View
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <Printer size={15} />
              Print
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {auditLogs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
              <Activity size={30} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm font-bold text-slate-500">
                No visible audit records
              </p>
            </div>
          )}

          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex gap-4 rounded-2xl border border-slate-100 p-4"
            >
              <div
                className={cn(
                  "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  log.type === "success" && "bg-emerald-50 text-emerald-600",
                  log.type === "warning" && "bg-amber-50 text-amber-600",
                  log.type === "info" && "bg-blue-50 text-blue-600",
                )}
              >
                {log.type === "success" && <Check size={16} />}

                {log.type === "warning" && <AlertTriangle size={16} />}

                {log.type === "info" && <Activity size={16} />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-black text-slate-800">
                    {log.action}
                  </p>

                  <span className="text-xs text-slate-400">{log.time}</span>
                </div>

                <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>{log.user}</span>
                  <span>•</span>
                  <span>{log.module}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );

  /* ==========================================================================
     PRIVACY
     ========================================================================== */

  const renderPrivacy = () => (
    <>
      <SectionHeader
        icon={Eye}
        title="Privacy & Data"
        description="Control analytics, data protection, sensitive information and retention behavior."
      />

      <Card>
        <SettingRow
          icon={Activity}
          title="Usage Analytics"
          description="Collect anonymous product usage analytics."
          enabled={analytics}
          onChange={setAnalytics}
        />

        <SettingRow
          icon={AlertTriangle}
          title="Error Tracking"
          description="Collect application errors for debugging."
          enabled={errorTracking}
          onChange={setErrorTracking}
        />

        <SettingRow
          icon={Lock}
          title="Data Encryption"
          description="Enable encryption for sensitive application data."
          enabled={dataEncryption}
          onChange={setDataEncryption}
        />

        <SettingRow
          icon={EyeOff}
          title="Mask Sensitive Data"
          description="Hide sensitive information from standard administrative views."
          enabled={maskSensitiveData}
          onChange={setMaskSensitiveData}
        />

        <SettingRow
          icon={Shield}
          title="Strict Privacy Mode"
          description="Apply stricter privacy defaults across the platform."
          enabled={privacyMode}
          onChange={setPrivacyMode}
        />

        <SettingRow
          icon={Activity}
          title="Activity Tracking"
          description="Maintain administrative activity history for accountability."
          enabled={activityTracking}
          onChange={setActivityTracking}
        />

        <div className="mt-6 border-t border-slate-100 pt-6">
          <Field
            label="Data Retention Period (days)"
            hint="Production retention policies will ultimately be enforced by backend data services."
          >
            <input
              type="number"
              value={dataRetention}
              onChange={(e) => {
                setDataRetention(e.target.value);
                markChanged();
              }}
              className={inputClasses}
            />
          </Field>
        </div>
      </Card>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-start gap-3">
          <CircleHelp size={20} className="mt-0.5 text-blue-600" />

          <div>
            <h3 className="font-black text-blue-900">Privacy architecture</h3>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              Final privacy enforcement will be implemented across the backend,
              database, API, authentication and storage layers. These controls
              define intended product behavior.
            </p>
          </div>
        </div>
      </div>

      <SaveBar />
    </>
  );

  /* ==========================================================================
     DANGER
     ========================================================================== */

  const renderDanger = () => (
    <>
      <SectionHeader
        icon={AlertTriangle}
        title="Danger Zone"
        description="Actions in this section can affect important system data."
      />

      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertTriangle size={22} />
          </div>

          <div>
            <h3 className="font-black text-red-900">Destructive Actions</h3>

            <p className="mt-1 text-sm leading-6 text-red-700">
              Real destructive operations will require backend authorization,
              audit logging and explicit confirmation.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => requestDangerAction("cache")}
            className="flex w-full items-center justify-between rounded-xl border border-red-200 bg-white px-5 py-4 text-left transition hover:bg-red-50"
          >
            <div>
              <p className="text-sm font-black text-red-800">
                Clear Application Cache
              </p>

              <p className="mt-1 text-xs text-red-600">
                Remove temporary cached application data.
              </p>
            </div>

            <RefreshCw size={18} className="text-red-500" />
          </button>

          <button
            type="button"
            onClick={() => requestDangerAction("demo")}
            className="flex w-full items-center justify-between rounded-xl border border-red-200 bg-white px-5 py-4 text-left transition hover:bg-red-50"
          >
            <div>
              <p className="text-sm font-black text-red-800">Reset Demo Data</p>

              <p className="mt-1 text-xs text-red-600">
                Reset sample frontend data after authorization.
              </p>
            </div>

            <Database size={18} className="text-red-500" />
          </button>

          <button
            type="button"
            onClick={() => requestDangerAction("account")}
            className="flex w-full items-center justify-between rounded-xl border border-red-300 bg-red-600 px-5 py-4 text-left transition hover:bg-red-700"
          >
            <div>
              <p className="text-sm font-black text-white">
                Delete Institute Account
              </p>

              <p className="mt-1 text-xs text-red-100">
                Permanently delete the organization and its data.
              </p>
            </div>

            <Trash2 size={18} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );

  /* ==========================================================================
     RENDER SECTION
     ========================================================================== */

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return renderGeneral();

      case "profile":
        return renderProfile();

      case "appearance":
        return renderAppearance();

      case "academic":
        return renderAcademic();

      case "attendance":
        return renderAttendance();

      case "fees":
        return renderFees();

      case "exams":
        return renderExams();

      case "notifications":
        return renderNotifications();

      case "whatsapp":
        return renderWhatsApp();

      case "email":
        return renderEmail();

      case "roles":
        return renderRoles();

      case "security":
        return renderSecurity();

      case "branding":
        return renderBranding();

      case "apps":
        return renderApps();

      case "integrations":
        return renderIntegrations();

      case "backup":
        return renderBackup();

      case "audit":
        return renderAudit();

      case "privacy":
        return renderPrivacy();

      case "danger":
        return renderDanger();

      default:
        return renderGeneral();
    }
  };

  /* ==========================================================================
     PAGE
     ========================================================================== */

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* ------------------------------------------------------------------
            HEADER
        ------------------------------------------------------------------ */}

        <PageHeader
          title="Settings"
          description="Your central command center for Coaching OS configuration, security, communication, automation and platform behavior."
          icon={<SettingsIcon size={20} />}
          actions={
            <>
              <button
                type="button"
                onClick={() => openAI("overview")}
                className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 shadow-sm transition hover:bg-violet-100"
              >
                <Sparkles size={16} />
                AI Assistant
              </button>

              <button
                type="button"
                onClick={exportSettings}
                className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 md:flex"
              >
                <Download size={16} />
                Export
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
              >
                <Menu size={16} />
                Sections
              </button>
            </>
          }
        />
        {/* ------------------------------------------------------------------
            COMMAND CENTER
        ------------------------------------------------------------------ */}

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button
            type="button"
            onClick={() => openAI("overview")}
            className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Sparkles size={18} />
              </span>

              <ChevronRight size={17} className="text-violet-400" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-violet-500">
              AI System Score
            </p>

            <p className="mt-1 text-2xl font-black text-violet-900">
              {systemScore}%
            </p>

            <p className="mt-1 text-xs text-violet-700">Configuration health</p>
          </button>

          <button
            type="button"
            onClick={() => selectSection("security")}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Shield size={18} />
              </span>

              <ChevronRight size={17} className="text-slate-300" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">
              Security
            </p>

            <p className="mt-1 text-2xl font-black text-slate-900">
              {securityScore}%
            </p>

            <p className="mt-1 text-xs text-slate-500">Protection score</p>
          </button>

          <button
            type="button"
            onClick={() => selectSection("integrations")}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Zap size={18} />
              </span>

              <ChevronRight size={17} className="text-slate-300" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">
              Integrations
            </p>

            <p className="mt-1 text-2xl font-black text-slate-900">
              {connectedIntegrations}
              <span className="text-base text-slate-400">
                /{integrations.length}
              </span>
            </p>

            <p className="mt-1 text-xs text-slate-500">Services connected</p>
          </button>

          <button
            type="button"
            onClick={() => selectSection("backup")}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Database size={18} />
              </span>

              <ChevronRight size={17} className="text-slate-300" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">
              Backup
            </p>

            <p className="mt-1 text-2xl font-black text-slate-900">
              {autoBackup ? "Active" : "Off"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {backupFrequency} protection
            </p>
          </button>
        </div>

        {/* ------------------------------------------------------------------
            SEARCH
        ------------------------------------------------------------------ */}

        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search settings, security, fees, attendance, WhatsApp..."
              className={`${inputClasses} pl-11 pr-12`}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            MAIN LAYOUT
        ------------------------------------------------------------------ */}

        <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          {/* Settings navigation */}

          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between px-3 py-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Admin Control Center
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {filteredMenu.length} settings
                  </p>
                </div>

                <SettingsIcon size={18} className="text-slate-300" />
              </div>

              <div className="max-h-[calc(100vh-260px)] space-y-1 overflow-y-auto pr-1">
                {filteredMenu.map((item) => {
                  const Icon = item.icon;
                  const active = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectSection(item.id)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                        active
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-50",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          active
                            ? "bg-white/15 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:text-slate-700",
                        )}
                      >
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "truncate text-sm font-black",
                            active ? "text-white" : "text-slate-700",
                          )}
                        >
                          {item.label}
                        </p>

                        <p
                          className={cn(
                            "mt-0.5 truncate text-[11px]",
                            active ? "text-blue-100" : "text-slate-400",
                          )}
                        >
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight
                        size={15}
                        className={active ? "text-white" : "text-slate-300"}
                      />
                    </button>
                  );
                })}

                {filteredMenu.length === 0 && (
                  <div className="px-3 py-10 text-center">
                    <Search size={24} className="mx-auto text-slate-300" />

                    <p className="mt-3 text-sm font-black text-slate-500">
                      No settings found
                    </p>

                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="mt-2 text-xs font-bold text-blue-600"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-slate-100 px-3 pt-4">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black text-slate-600">
                      Coaching OS
                    </p>

                    <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-slate-400">
                      {APP_VERSION}
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-5 text-slate-400">
                    Administration control center
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}

          <section className="min-w-0">{renderSection()}</section>
        </div>
      </main>

      {/* =========================================================================
          MOBILE SETTINGS MENU
      ========================================================================= */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute inset-y-0 left-0 w-[90%] max-w-sm overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-lg font-black text-slate-900">Settings</p>

                <p className="text-xs text-slate-400">Admin Control Center</p>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search settings..."
                  className={`${inputClasses} py-2.5 pl-9`}
                />
              </div>
            </div>

            <div className="space-y-1">
              {filteredMenu.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectSection(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left",
                      active
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-50",
                    )}
                  >
                    <Icon size={18} />

                    <div>
                      <p className="text-sm font-black">{item.label}</p>

                      <p
                        className={cn(
                          "text-[11px]",
                          active ? "text-blue-100" : "text-slate-400",
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          AI ASSISTANT
      ========================================================================= */}

      {showAI && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Sparkles size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-100">
                      Coaching OS AI
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      {aiContent.title}
                    </h2>

                    <p className="mt-1 text-sm text-violet-100">
                      Configuration intelligence
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAI(false)}
                  className="rounded-xl p-2 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-5">
                {[
                  ["Overview", "overview"],
                  ["Security", "security"],
                  ["Attendance", "attendance"],
                  ["Fees", "fees"],
                  ["Communication", "notifications"],
                ].map(([label, action]) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => setAIAction(action as AIAction)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-xs font-black transition",
                      aiAction === action
                        ? "border-violet-500 bg-violet-50 text-violet-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      AI Configuration Score
                    </p>

                    <p className="mt-1 text-3xl font-black text-slate-900">
                      {aiContent.score}%
                    </p>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-violet-100 bg-white text-sm font-black text-violet-700">
                    {aiContent.score}
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                    style={{
                      width: `${aiContent.score}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 p-5">
                <p className="text-sm leading-6 text-violet-900">
                  {aiContent.summary}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {aiContent.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-slate-100 bg-white p-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs leading-5 text-amber-800">
                  <strong>AI demo:</strong> These recommendations are currently
                  generated from local configuration rules. Later we can connect
                  the page to a real AI service through the Coaching OS backend.
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAI(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (aiAction === "security") {
                      setTwoFactor(true);
                      setForceStrongPasswords(true);
                      setApiSecurity(true);
                    }

                    if (aiAction === "attendance") {
                      setLowAttendanceAlert(true);
                      setAttendanceWhatsapp(true);
                    }

                    if (aiAction === "fees") {
                      setFeeWhatsapp(true);
                      setFeeEmail(true);
                      setAutoReceipt(true);
                    }

                    if (aiAction === "notifications") {
                      setPushNotifications(true);
                      setCriticalOverride(true);
                    }

                    if (aiAction === "performance") {
                      setAutoBackup(true);
                      setBackupEncryption(true);
                    }

                    markChanged();
                    showToast("AI recommendations applied");
                  }}
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-black text-white hover:bg-violet-700"
                >
                  <Sparkles size={16} />
                  Apply Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PASSWORD MODAL
      ========================================================================= */}

      {showPasswordModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your administrator password.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Field label="Current Password">
                <input
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={inputClasses}
                />
              </Field>

              <Field label="New Password">
                <input
                  type={showPasswords ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={inputClasses}
                />
              </Field>

              <Field label="Confirm New Password">
                <input
                  type={showPasswords ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClasses}
                />
              </Field>

              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={showPasswords}
                  onChange={(e) => setShowPasswords(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                Show passwords
              </label>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={changePassword}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ROLE MODAL
      ========================================================================= */}

      {showRoleModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {editingRole ? "Edit Role" : "Create Role"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Define an access role for your team.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowRoleModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Field label="Role Name">
                <input
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className={inputClasses}
                  placeholder="e.g. Branch Manager"
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  rows={4}
                  className={inputClasses}
                  placeholder="Describe what this role is responsible for..."
                />
              </Field>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRoleModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveRole}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white hover:bg-blue-700"
              >
                {editingRole ? "Save Role" : "Create Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTEGRATION MODAL
      ========================================================================= */}

      {showIntegrationModal && selectedIntegration && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Configure {selectedIntegration.name}
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Configure the integration before connecting it to the
                  production backend.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowIntegrationModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-amber-50 p-4">
              <div className="flex gap-3">
                <AlertTriangle size={19} className="shrink-0 text-amber-600" />

                <p className="text-sm leading-6 text-amber-800">
                  Never place real API keys, payment secrets or private
                  credentials directly in this frontend component. Production
                  secrets belong on the backend.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <Field label="Integration">
                <input
                  value={selectedIntegration.name}
                  readOnly
                  className={`${inputClasses} bg-slate-50`}
                />
              </Field>

              <Field label="Environment">
                <select className={selectClasses} defaultValue="Sandbox">
                  <option>Sandbox</option>
                  <option>Production</option>
                </select>
              </Field>

              <Field label="Connection Status">
                <select
                  className={selectClasses}
                  defaultValue={
                    selectedIntegration.connected
                      ? "Connected"
                      : "Ready to Connect"
                  }
                >
                  <option>Ready to Connect</option>
                  <option>Connected</option>
                  <option>Disabled</option>
                </select>
              </Field>

              <Field label="Webhook Endpoint">
                <input
                  className={inputClasses}
                  placeholder="Backend endpoint will be generated later"
                />
              </Field>
            </div>

            <div className="mt-7 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => openTest(selectedIntegration.name)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <RefreshCw size={15} />
                Test
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowIntegrationModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    toggleIntegration(selectedIntegration.name);
                    setShowIntegrationModal(false);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white hover:bg-blue-700"
                >
                  <Save size={16} />
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DANGER CONFIRMATION
      ========================================================================= */}

      {showDangerModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertTriangle size={22} />
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-900">
              Confirm destructive action
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to perform:
            </p>

            <p className="mt-2 rounded-xl bg-red-50 p-3 text-sm font-black text-red-700">
              {dangerAction === "cache" && "Clear Application Cache"}

              {dangerAction === "demo" && "Reset Demo Data"}

              {dangerAction === "account" && "Delete Institute Account"}
            </p>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              This frontend build does not perform real destructive database
              operations. Production actions will require backend authorization
              and confirmation.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDangerModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDangerAction}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white hover:bg-red-700"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ACTIVE SESSION MODAL
      ========================================================================= */}

      {showSessionModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Active Sessions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review devices currently signed into the admin account.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSessionModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {[
                [
                  "Windows Desktop",
                  "Chrome · Current session",
                  "Indore, India",
                ],
                ["Android Device", "Coaching OS App", "India"],
              ].map((session, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {index === 0 ? (
                      <Laptop size={20} />
                    ) : (
                      <Smartphone size={20} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-slate-800">
                      {session[0]}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">{session[1]}</p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {session[2]}
                    </p>
                  </div>

                  {index === 0 ? (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
                      Current
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          "Session revocation will be connected to the backend",
                        )
                      }
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-black text-red-600"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TEST MODAL
      ========================================================================= */}

      {showTestModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <RefreshCw size={21} />
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-900">
              Test {testType}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This demo will simulate a connection test. Real connectivity will
              be performed by the backend integration service.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={19} className="text-emerald-500" />

                <div>
                  <p className="text-sm font-black text-slate-800">
                    Configuration looks valid
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Ready for backend connection.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowTestModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={runTest}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white hover:bg-blue-700"
              >
                Run Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAVE CONFIRMATION
      ========================================================================= */}

      {showSaveConfirm && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Save size={21} />
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-900">
              Save changes?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Save the current configuration for the{" "}
              <strong>
                {settingsMenu.find((item) => item.id === activeSection)?.label}
              </strong>{" "}
              section.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSaveConfirm(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveSettings}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white hover:bg-blue-700"
              >
                <Check size={16} />
                Save Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOAST
      ========================================================================= */}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] max-w-sm">
          <div className="flex items-start gap-3 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white shadow-2xl">
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-emerald-400"
            />

            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Slidebar from "../components/Slidebar";
import {
  Activity,
  AlertTriangle,
  AppWindow,
  Archive,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Cloud,
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
  Sun,
  Trash2,
  User,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const settingsMenu: {
  id: SettingsSection;
  label: string;
  description: string;
  icon: any;
}[] = [
  {
    id: "general",
    label: "Institute",
    description: "Organization information",
    icon: Building2,
  },
  {
    id: "profile",
    label: "Admin Profile",
    description: "Your account",
    icon: User,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme and interface",
    icon: Palette,
  },
  {
    id: "academic",
    label: "Academic",
    description: "Academic configuration",
    icon: GraduationCap,
  },
  {
    id: "attendance",
    label: "Attendance",
    description: "Attendance rules",
    icon: ClipboardCheck,
  },
  {
    id: "fees",
    label: "Fees & Payments",
    description: "Fee configuration",
    icon: Wallet,
  },
  {
    id: "exams",
    label: "Exams",
    description: "Exam configuration",
    icon: FileText,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Notification preferences",
    icon: Bell,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "WhatsApp communication",
    icon: MessageCircle,
  },
  {
    id: "email",
    label: "Email",
    description: "Email configuration",
    icon: Mail,
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    description: "Access control",
    icon: Shield,
  },
  {
    id: "security",
    label: "Security",
    description: "Login and protection",
    icon: Lock,
  },
  {
    id: "branding",
    label: "Branding",
    description: "Brand identity",
    icon: Palette,
  },
  {
    id: "apps",
    label: "Website & Apps",
    description: "Platform settings",
    icon: AppWindow,
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Connected services",
    icon: Zap,
  },
  {
    id: "backup",
    label: "Data & Backup",
    description: "Backup and export",
    icon: Database,
  },
  {
    id: "audit",
    label: "Audit Logs",
    description: "System activity",
    icon: Activity,
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Privacy controls",
    icon: Eye,
  },
  {
    id: "danger",
    label: "Danger Zone",
    description: "Destructive actions",
    icon: AlertTriangle,
  },
];

const permissionGroups: PermissionGroup[] = [
  {
    name: "Students",
    permissions: ["View Students", "Create Students", "Edit Students", "Delete Students"],
  },
  {
    name: "Teachers",
    permissions: ["View Teachers", "Create Teachers", "Edit Teachers", "Delete Teachers"],
  },
  {
    name: "Fees",
    permissions: ["View Fees", "Record Payment", "Edit Fee Records", "Refund Payment"],
  },
  {
    name: "Attendance",
    permissions: ["View Attendance", "Mark Attendance", "Edit Attendance", "Export Attendance"],
  },
  {
    name: "Exams",
    permissions: ["View Exams", "Create Exams", "Edit Exams", "Delete Exams"],
  },
  {
    name: "Reports",
    permissions: ["View Reports", "Export Reports", "AI Insights", "Financial Reports"],
  },
];

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

const toggleClasses = (enabled: boolean) =>
  `relative inline-flex h-6 w-11 items-center rounded-full transition ${
    enabled ? "bg-blue-600" : "bg-slate-300"
  }`;

const toggleCircleClasses = (enabled: boolean) =>
  `inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
    enabled ? "translate-x-5" : "translate-x-0.5"
  }`;

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const selectClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [saved, setSaved] = useState(true);
  const [toast, setToast] = useState("");

  /* General */
  const [instituteName, setInstituteName] =
    useState("Coaching Institute");
  const [instituteCode, setInstituteCode] = useState("COACH-001");
  const [instituteEmail, setInstituteEmail] =
    useState("admin@coachinginstitute.com");
  const [institutePhone, setInstitutePhone] =
    useState("+91 98765 43210");
  const [website, setWebsite] = useState("https://example.com");
  const [address, setAddress] =
    useState("Indore, Madhya Pradesh, India");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  /* Profile */
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] =
    useState("admin@coachinginstitute.com");
  const [adminPhone, setAdminPhone] = useState("+91 98765 43210");
  const [jobTitle, setJobTitle] = useState("Institute Administrator");

  /* Appearance */
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("blue");
  const [density, setDensity] = useState("comfortable");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [compactTables, setCompactTables] = useState(false);

  /* Academic */
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [weekStart, setWeekStart] = useState("Monday");
  const [gradingSystem, setGradingSystem] = useState("Marks");
  const [defaultClassDuration, setDefaultClassDuration] = useState("60");
  const [maxStudentsPerBatch, setMaxStudentsPerBatch] = useState("60");

  /* Attendance */
  const [lateAfter, setLateAfter] = useState("10");
  const [attendanceRequired, setAttendanceRequired] = useState("75");
  const [autoAbsent, setAutoAbsent] = useState(true);
  const [faceScan, setFaceScan] = useState(true);
  const [rfid, setRfid] = useState(true);
  const [fingerprint, setFingerprint] = useState(true);
  const [attendanceWhatsapp, setAttendanceWhatsapp] = useState(true);

  /* Fees */
  const [lateFeeEnabled, setLateFeeEnabled] = useState(true);
  const [lateFeeAmount, setLateFeeAmount] = useState("500");
  const [receiptPrefix, setReceiptPrefix] = useState("RCPT");
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [paymentReminderDays, setPaymentReminderDays] = useState("3");
  const [onlinePayments, setOnlinePayments] = useState(true);

  /* Exams */
  const [defaultPassingPercentage, setDefaultPassingPercentage] =
    useState("40");
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [autoPublishResults, setAutoPublishResults] = useState(false);
  const [examNotifications, setExamNotifications] = useState(true);
  const [resultNotifications, setResultNotifications] = useState(true);

  /* Notifications */
  const [notifyNewStudent, setNotifyNewStudent] = useState(true);
  const [notifyPayment, setNotifyPayment] = useState(true);
  const [notifyAttendance, setNotifyAttendance] = useState(true);
  const [notifyExam, setNotifyExam] = useState(true);
  const [notifyInquiry, setNotifyInquiry] = useState(true);
  const [notifySystem, setNotifySystem] = useState(true);
  const [quietHours, setQuietHours] = useState(false);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("07:00");

  /* WhatsApp */
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [whatsappProvider, setWhatsappProvider] =
    useState("WhatsApp Cloud API");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappBusinessId, setWhatsappBusinessId] = useState("");
  const [whatsappAutoInquiry, setWhatsappAutoInquiry] = useState(true);
  const [whatsappAttendance, setWhatsappAttendance] = useState(true);
  const [whatsappFeeReminder, setWhatsappFeeReminder] = useState(true);
  const [whatsappExam, setWhatsappExam] = useState(true);

  /* Email */
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [emailProvider, setEmailProvider] = useState("SMTP");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUsername, setSmtpUsername] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [emailSenderName, setEmailSenderName] =
    useState("Coaching Institute");
  const [emailSenderAddress, setEmailSenderAddress] =
    useState("noreply@example.com");

  /* Security */
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5");
  const [passwordExpiry, setPasswordExpiry] = useState("90");
  const [forceStrongPasswords, setForceStrongPasswords] = useState(true);

  /* Branding */
  const [brandName, setBrandName] = useState("Coaching OS");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [secondaryColor, setSecondaryColor] = useState("#f59e0b");
  const [favicon, setFavicon] = useState("Default");
  const [logoText, setLogoText] = useState("CO");
  const [showPoweredBy, setShowPoweredBy] = useState(false);

  /* Apps */
  const [studentAppEnabled, setStudentAppEnabled] = useState(true);
  const [teacherAppEnabled, setTeacherAppEnabled] = useState(true);
  const [parentAppEnabled, setParentAppEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [publicWebsite, setPublicWebsite] = useState(true);
  const [allowSelfRegistration, setAllowSelfRegistration] = useState(true);

  /* Integrations */
  const [googleCalendar, setGoogleCalendar] = useState(false);
  const [googleDrive, setGoogleDrive] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState(false);
  const [firebase, setFirebase] = useState(false);
  const [storage, setStorage] = useState(false);

  /* Backup */
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("Daily");
  const [backupRetention, setBackupRetention] = useState("30");
  const [cloudBackup, setCloudBackup] = useState(false);

  /* Privacy */
  const [analytics, setAnalytics] = useState(true);
  const [errorTracking, setErrorTracking] = useState(true);
  const [dataEncryption, setDataEncryption] = useState(true);
  const [maskSensitiveData, setMaskSensitiveData] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  /* Roles */
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

  const [permissionState, setPermissionState] = useState<
    Record<string, boolean>
  >({
    "View Students": true,
    "Create Students": true,
    "Edit Students": true,
    "Delete Students": false,
    "View Teachers": true,
    "Create Teachers": false,
    "Edit Teachers": true,
    "Delete Teachers": false,
    "View Fees": true,
    "Record Payment": true,
    "Edit Fee Records": true,
    "Refund Payment": false,
    "View Attendance": true,
    "Mark Attendance": true,
    "Edit Attendance": true,
    "Export Attendance": true,
    "View Exams": true,
    "Create Exams": true,
    "Edit Exams": true,
    "Delete Exams": false,
    "View Reports": true,
    "Export Reports": true,
    "AI Insights": true,
    "Financial Reports": true,
  });

  /* Modals */
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState("");

  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  /* ------------------------------------------------------------------------ */
  /* SEARCH                                                                   */
  /* ------------------------------------------------------------------------ */

  const filteredMenu = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return settingsMenu;

    return settingsMenu.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }, [search]);

  /* ------------------------------------------------------------------------ */
  /* UI HELPERS                                                               */
  /* ------------------------------------------------------------------------ */

  const markChanged = () => {
    setSaved(false);
  };

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const saveSettings = () => {
    setSaved(true);
    showToast("Settings saved successfully");
  };

  const resetSettings = () => {
    if (
      !window.confirm(
        "Reset this settings page to the current saved configuration?"
      )
    ) {
      return;
    }

    setSaved(true);
    showToast("Settings reset");
  };

  const selectSection = (section: SettingsSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  /* ------------------------------------------------------------------------ */
  /* ROLE ACTIONS                                                             */
  /* ------------------------------------------------------------------------ */

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
            : role
        )
      );

      showToast("Role updated successfully");
    } else {
      setRoles((current) => [
        ...current,
        {
          id: Date.now(),
          name: roleName.trim(),
          description: roleDescription.trim(),
          users: 0,
          color: "blue",
        },
      ]);

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

    if (
      !window.confirm(
        `Delete the ${role.name} role? This is a demo configuration action.`
      )
    ) {
      return;
    }

    setRoles((current) => current.filter((item) => item.id !== role.id));
    showToast("Role deleted");
    markChanged();
  };

  /* ------------------------------------------------------------------------ */
  /* PASSWORD                                                                  */
  /* ------------------------------------------------------------------------ */

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
    showToast("Password changed successfully");
  };

  /* ------------------------------------------------------------------------ */
  /* EXPORT SETTINGS                                                          */
  /* ------------------------------------------------------------------------ */

  const exportSettings = () => {
    const backup = {
      version: "0.1.19",
      exportedAt: new Date().toISOString(),
      institute: {
        instituteName,
        instituteCode,
        instituteEmail,
        institutePhone,
        website,
        address,
        timezone,
        currency,
        dateFormat,
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
      },
      academic: {
        academicYear,
        weekStart,
        gradingSystem,
        defaultClassDuration,
        maxStudentsPerBatch,
      },
      attendance: {
        lateAfter,
        attendanceRequired,
        autoAbsent,
        faceScan,
        rfid,
        fingerprint,
        attendanceWhatsapp,
      },
      fees: {
        lateFeeEnabled,
        lateFeeAmount,
        receiptPrefix,
        invoicePrefix,
        paymentReminderDays,
        onlinePayments,
      },
      exams: {
        defaultPassingPercentage,
        negativeMarking,
        autoPublishResults,
        examNotifications,
        resultNotifications,
      },
      notifications: {
        notifyNewStudent,
        notifyPayment,
        notifyAttendance,
        notifyExam,
        notifyInquiry,
        notifySystem,
        quietHours,
        quietStart,
        quietEnd,
      },
      roles,
      security: {
        twoFactor,
        loginAlerts,
        sessionTimeout,
        maxLoginAttempts,
        passwordExpiry,
        forceStrongPasswords,
      },
      branding: {
        brandName,
        primaryColor,
        secondaryColor,
        favicon,
        logoText,
        showPoweredBy,
      },
      apps: {
        studentAppEnabled,
        teacherAppEnabled,
        parentAppEnabled,
        maintenanceMode,
        publicWebsite,
        allowSelfRegistration,
      },
      integrations: {
        googleCalendar,
        googleDrive,
        paymentGateway,
        firebase,
        storage,
      },
      backup: {
        autoBackup,
        backupFrequency,
        backupRetention,
        cloudBackup,
      },
      privacy: {
        analytics,
        errorTracking,
        dataEncryption,
        maskSensitiveData,
        privacyMode,
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

    showToast("Settings backup exported");
  };

  /* ------------------------------------------------------------------------ */
  /* INTEGRATIONS                                                             */
  /* ------------------------------------------------------------------------ */

  const openIntegration = (name: string) => {
    setSelectedIntegration(name);
    setShowIntegrationModal(true);
  };

  /* ------------------------------------------------------------------------ */
  /* SHARED COMPONENTS                                                        */
  /* ------------------------------------------------------------------------ */

  const Toggle = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <button
      type="button"
      onClick={() => {
        onChange(!enabled);
        markChanged();
      }}
      className={toggleClasses(enabled)}
      aria-label="Toggle setting"
    >
      <span className={toggleCircleClasses(enabled)} />
    </button>
  );

  const SettingRow = ({
    icon: Icon,
    title,
    description,
    enabled,
    onChange,
  }: {
    icon: any;
    title: string;
    description: string;
    enabled: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-5 last:border-b-0">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <Icon size={17} />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );

  const SectionHeader = ({
    icon: Icon,
    title,
    description,
  }: {
    icon: any;
    title: string;
    description: string;
  }) => (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={21} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );

  const Card = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );

  const Field = ({
    label,
    children,
    hint,
  }: {
    label: string;
    children: React.ReactNode;
    hint?: string;
  }) => (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );

  const SaveBar = () => (
    <div className="sticky bottom-4 z-20 mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
      <div className="flex items-center gap-2 text-sm">
        {saved ? (
          <>
            <CheckCircle2 size={17} className="text-emerald-500" />
            <span className="font-semibold text-slate-600">
              All changes saved
            </span>
          </>
        ) : (
          <>
            <AlertTriangle size={17} className="text-amber-500" />
            <span className="font-semibold text-amber-700">
              You have unsaved changes
            </span>
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
          onClick={saveSettings}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );

  /* ------------------------------------------------------------------------ */
  /* RENDER SECTIONS                                                          */
  /* ------------------------------------------------------------------------ */

  const renderGeneral = () => (
    <>
      <SectionHeader
        icon={Building2}
        title="Institute Profile"
        description="Manage the main information displayed across your coaching platform."
      />

      <Card>
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
              placeholder="COACH-001"
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
              <option value="America/New_York">
                America/New_York
              </option>
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

          <div className="md:col-span-2">
            <Field label="Address">
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

  const renderProfile = () => (
    <>
      <SectionHeader
        icon={User}
        title="Admin Profile"
        description="Manage your administrator account information."
      />

      <Card>
        <div className="mb-8 flex flex-wrap items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-black text-white shadow-lg">
            {adminName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {adminName}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {jobTitle}
            </p>

            <button
              type="button"
              className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              <Pencil size={15} />
              Change profile photo
            </button>
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

        <div className="mt-8 border-t border-slate-100 pt-6">
          <h3 className="font-bold text-slate-900">
            Password & Authentication
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Keep your administrator account secure.
          </p>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <KeyRound size={16} />
            Change Password
          </button>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderAppearance = () => (
    <>
      <SectionHeader
        icon={Palette}
        title="Appearance"
        description="Customize the look and feel of the admin panel."
      />

      <Card>
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Theme
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Choose how Coaching OS should appear.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                id: "light",
                label: "Light",
                icon: Sun,
              },
              {
                id: "dark",
                label: "Dark",
                icon: Moon,
              },
              {
                id: "system",
                label: "System",
                icon: Laptop,
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
                  className={`relative rounded-2xl border p-5 text-left transition ${
                    active
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {active && (
                    <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={14} />
                    </span>
                  )}

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <p className="mt-4 text-sm font-bold text-slate-800">
                    {item.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-7">
          <h3 className="text-sm font-bold text-slate-800">
            Accent Color
          </h3>

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
                className={`flex h-11 w-11 items-center justify-center rounded-full ${color} ring-offset-2 transition ${
                  accent === id ? "ring-2 ring-slate-900" : ""
                }`}
                aria-label={`${id} accent`}
              >
                {accent === id && (
                  <Check size={18} className="text-white" />
                )}
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
            description="Enable smooth interface animations."
            enabled={animations}
            onChange={setAnimations}
          />

          <SettingRow
            icon={FileText}
            title="Compact Tables"
            description="Reduce row height in data tables."
            enabled={compactTables}
            onChange={setCompactTables}
          />
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderAcademic = () => (
    <>
      <SectionHeader
        icon={GraduationCap}
        title="Academic Settings"
        description="Configure the academic structure used by the institute."
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

          <Field label="Default Class Duration (minutes)">
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
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderAttendance = () => (
    <>
      <SectionHeader
        icon={ClipboardCheck}
        title="Attendance Settings"
        description="Configure attendance rules and supported attendance methods."
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
            description="Allow attendance devices to use facial recognition."
            enabled={faceScan}
            onChange={setFaceScan}
          />

          <SettingRow
            icon={Smartphone}
            title="Card / RFID"
            description="Allow attendance using RFID or NFC cards."
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
            description="Notify parents/students about attendance events."
            enabled={attendanceWhatsapp}
            onChange={setAttendanceWhatsapp}
          />
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderFees = () => (
    <>
      <SectionHeader
        icon={Wallet}
        title="Fees & Payments"
        description="Configure fee collection, receipts, reminders and payment behavior."
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

          <Field label="Payment Reminder Before Due Date (days)">
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
            icon={Wallet}
            title="Late Fee"
            description="Automatically apply late fees to overdue payments."
            enabled={lateFeeEnabled}
            onChange={setLateFeeEnabled}
          />

          <SettingRow
            icon={Globe}
            title="Online Payments"
            description="Allow students or parents to pay fees online."
            enabled={onlinePayments}
            onChange={setOnlinePayments}
          />
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderExams = () => (
    <>
      <SectionHeader
        icon={FileText}
        title="Exam Settings"
        description="Configure default examination and result behavior."
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
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderNotifications = () => (
    <>
      <SectionHeader
        icon={Bell}
        title="Notification Preferences"
        description="Control which events generate administrative notifications."
      />

      <Card>
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
          icon={Server}
          title="System Alerts"
          description="Receive important technical and system notifications."
          enabled={notifySystem}
          onChange={setNotifySystem}
        />

        <SettingRow
          icon={Moon}
          title="Quiet Hours"
          description="Pause non-critical notifications during selected hours."
          enabled={quietHours}
          onChange={setQuietHours}
        />

        {quietHours && (
          <div className="mt-5 grid gap-5 rounded-xl bg-slate-50 p-5 md:grid-cols-2">
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

      <SaveBar />
    </>
  );

  const renderWhatsApp = () => (
    <>
      <SectionHeader
        icon={MessageCircle}
        title="WhatsApp"
        description="Prepare WhatsApp communication for inquiries, attendance, fees and exams."
      />

      <Card>
        <div className="mb-6 flex items-center justify-between rounded-xl bg-emerald-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
              <MessageCircle size={19} />
            </div>

            <div>
              <p className="text-sm font-bold text-emerald-900">
                WhatsApp Business
              </p>
              <p className="text-xs text-emerald-700">
                Real API connection can be added later.
              </p>
            </div>
          </div>

          <Toggle
            enabled={whatsappEnabled}
            onChange={setWhatsappEnabled}
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
            description="Send exam and result notifications."
            enabled={whatsappExam}
            onChange={setWhatsappExam}
          />
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderEmail = () => (
    <>
      <SectionHeader
        icon={Mail}
        title="Email Configuration"
        description="Configure email delivery for system notifications."
      />

      <Card>
        <div className="mb-7 flex items-center justify-between rounded-xl bg-blue-50 p-4">
          <div>
            <p className="text-sm font-bold text-blue-900">
              Email Delivery
            </p>
            <p className="mt-1 text-xs text-blue-700">
              Connect SMTP or an email provider later.
            </p>
          </div>

          <Toggle
            enabled={emailEnabled}
            onChange={setEmailEnabled}
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
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderRoles = () => (
    <>
      <SectionHeader
        icon={Shield}
        title="Roles & Permissions"
        description="Control what administrators, teachers and staff can access."
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900">
              System Roles
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create custom roles for your organization.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateRole}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Users size={16} />
            Add Role
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Description</th>
                <th className="px-3 py-3">Users</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Shield size={17} />
                      </div>

                      <span className="text-sm font-bold text-slate-800">
                        {role.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-4 text-sm text-slate-500">
                    {role.description}
                  </td>

                  <td className="px-3 py-4 text-sm font-bold text-slate-700">
                    {role.users}
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditRole(role)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                        title="Edit role"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteRole(role)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete role"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="mb-5">
          <h3 className="font-bold text-slate-900">
            Permission Matrix
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Configure permissions for the currently selected default role.
          </p>
        </div>

        <div className="space-y-6">
          {permissionGroups.map((group) => (
            <div
              key={group.name}
              className="overflow-hidden rounded-xl border border-slate-200"
            >
              <div className="bg-slate-50 px-4 py-3">
                <p className="text-sm font-bold text-slate-800">
                  {group.name}
                </p>
              </div>

              <div className="grid md:grid-cols-2">
                {group.permissions.map((permission) => (
                  <label
                    key={permission}
                    className="flex cursor-pointer items-center justify-between border-b border-r border-slate-100 px-4 py-4 last:border-b-0"
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

  const renderSecurity = () => (
    <>
      <SectionHeader
        icon={Lock}
        title="Security"
        description="Protect administrator accounts and control login behavior."
      />

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

      <Card className="mt-6">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 text-blue-600" size={20} />

          <div>
            <h3 className="font-bold text-slate-900">
              Security architecture
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Production security will be enforced by the backend,
              authentication provider, database permissions, encrypted
              secrets and server-side authorization. These controls are
              currently configuration UI only.
            </p>
          </div>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderBranding = () => (
    <>
      <SectionHeader
        icon={Palette}
        title="Branding"
        description="Customize your institute's visual identity."
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
        </div>

        <div className="mt-7 border-t border-slate-100 pt-2">
          <SettingRow
            icon={Globe}
            title="Show Powered By"
            description="Display the Coaching OS branding on public pages."
            enabled={showPoweredBy}
            onChange={setShowPoweredBy}
          />
        </div>

        <div className="mt-7 rounded-2xl border border-slate-200 p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Brand Preview
          </p>

          <div className="mt-5 flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              {logoText.slice(0, 3).toUpperCase()}
            </div>

            <div>
              <p className="text-lg font-black text-slate-900">
                {brandName}
              </p>

              <p className="text-sm text-slate-500">
                Your coaching management platform
              </p>
            </div>
          </div>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderApps = () => (
    <>
      <SectionHeader
        icon={AppWindow}
        title="Website & Apps"
        description="Control the availability and behavior of your platform applications."
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
          icon={Globe}
          title="Public Website"
          description="Allow your public-facing website to remain accessible."
          enabled={publicWebsite}
          onChange={setPublicWebsite}
        />

        <SettingRow
          icon={User}
          title="Self Registration"
          description="Allow students or parents to submit registrations."
          enabled={allowSelfRegistration}
          onChange={setAllowSelfRegistration}
        />

        <SettingRow
          icon={AlertTriangle}
          title="Maintenance Mode"
          description="Temporarily restrict access while maintenance is performed."
          enabled={maintenanceMode}
          onChange={setMaintenanceMode}
        />
      </Card>

      <SaveBar />
    </>
  );

  const integrationItems = [
    {
      name: "Google Calendar",
      description: "Sync classes, exams and events.",
      icon: Globe,
      connected: googleCalendar,
      setConnected: setGoogleCalendar,
    },
    {
      name: "Google Drive",
      description: "Store documents and educational files.",
      icon: Cloud,
      connected: googleDrive,
      setConnected: setGoogleDrive,
    },
    {
      name: "Payment Gateway",
      description: "Connect online fee collection.",
      icon: Wallet,
      connected: paymentGateway,
      setConnected: setPaymentGateway,
    },
    {
      name: "Firebase",
      description: "Push notifications and mobile services.",
      icon: Smartphone,
      connected: firebase,
      setConnected: setFirebase,
    },
    {
      name: "Cloud Storage",
      description: "S3-compatible document storage.",
      icon: HardDrive,
      connected: storage,
      setConnected: setStorage,
    },
  ];

  const renderIntegrations = () => (
    <>
      <SectionHeader
        icon={Zap}
        title="Integrations"
        description="Connect external services to extend Coaching OS."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {integrationItems.map((integration) => {
          const Icon = integration.icon;

          return (
            <Card key={integration.name}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {integration.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {integration.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    integration.connected
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {integration.connected ? "Connected" : "Not Connected"}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => openIntegration(integration.name)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  <SettingsIcon size={16} />
                  Configure
                </button>

                <button
                  type="button"
                  onClick={() => {
                    integration.setConnected(!integration.connected);
                    markChanged();
                    showToast(
                      !integration.connected
                        ? `${integration.name} connected`
                        : `${integration.name} disconnected`
                    );
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-bold ${
                    integration.connected
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {integration.connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <SaveBar />
    </>
  );

  const renderBackup = () => (
    <>
      <SectionHeader
        icon={Database}
        title="Data & Backup"
        description="Protect your institute data and export your configuration."
      />

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
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="font-bold text-slate-900">
          Backup & Export
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Export the current local configuration as a JSON backup.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportSettings}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Download size={16} />
            Export Settings
          </button>

          <button
            type="button"
            onClick={() =>
              showToast("Import workflow will be connected to the backend later")
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <ArrowUpFromLine size={16} />
            Import Backup
          </button>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderAudit = () => {
    const logs = [
      ["Admin User", "Updated notification settings", "Today, 10:42 AM"],
      ["Admin User", "Created new exam EXM-1006", "Today, 09:25 AM"],
      ["Administrator", "Recorded fee payment PAY-1024", "Yesterday, 05:18 PM"],
      ["Counsellor", "Updated inquiry INQ-1032", "Yesterday, 04:42 PM"],
      ["Teacher", "Marked attendance", "Yesterday, 02:10 PM"],
    ];

    return (
      <>
        <SectionHeader
          icon={Activity}
          title="Audit Logs"
          description="Review important actions performed inside the admin system."
        />

        <Card>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900">
                Recent Activity
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                System activity history.
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <Printer size={16} />
              Print
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <th className="px-3 py-3">User</th>
                  <th className="px-3 py-3">Action</th>
                  <th className="px-3 py-3">Time</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-3 py-4 text-sm font-bold text-slate-800">
                      {log[0]}
                    </td>

                    <td className="px-3 py-4 text-sm text-slate-600">
                      {log[1]}
                    </td>

                    <td className="px-3 py-4 text-sm text-slate-400">
                      {log[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </>
    );
  };

  const renderPrivacy = () => (
    <>
      <SectionHeader
        icon={Eye}
        title="Privacy & Data"
        description="Control analytics, data protection and privacy behavior."
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
      </Card>

      <Card className="mt-6">
        <div className="flex items-start gap-3">
          <CircleHelp className="mt-0.5 text-blue-600" size={20} />

          <div>
            <h3 className="font-bold text-slate-900">
              Privacy architecture
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Final privacy enforcement will be implemented at the
              backend, database, API, authentication and storage layers.
              These settings define the product behavior that will later
              be wired into those services.
            </p>
          </div>
        </div>
      </Card>

      <SaveBar />
    </>
  );

  const renderDanger = () => (
    <>
      <SectionHeader
        icon={AlertTriangle}
        title="Danger Zone"
        description="Actions in this section can affect important system data."
      />

      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertTriangle size={21} />
          </div>

          <div>
            <h3 className="font-bold text-red-900">
              Destructive Actions
            </h3>

            <p className="mt-1 text-sm leading-6 text-red-700">
              These controls are intentionally simulated in the frontend
              right now. Real destructive operations will require backend
              authorization and confirmation.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() =>
              showToast("Cache clearing will be connected later")
            }
            className="flex w-full items-center justify-between rounded-xl border border-red-200 bg-white px-4 py-4 text-left transition hover:bg-red-50"
          >
            <div>
              <p className="text-sm font-bold text-red-800">
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
            onClick={() =>
              showToast("Database reset is disabled in this frontend build")
            }
            className="flex w-full items-center justify-between rounded-xl border border-red-200 bg-white px-4 py-4 text-left transition hover:bg-red-50"
          >
            <div>
              <p className="text-sm font-bold text-red-800">
                Reset Demo Data
              </p>
              <p className="mt-1 text-xs text-red-600">
                Backend data reset will be added only after authorization.
              </p>
            </div>

            <Database size={18} className="text-red-500" />
          </button>

          <button
            type="button"
            onClick={() =>
              showToast("Account deletion requires backend confirmation")
            }
            className="flex w-full items-center justify-between rounded-xl border border-red-300 bg-red-600 px-4 py-4 text-left transition hover:bg-red-700"
          >
            <div>
              <p className="text-sm font-bold text-white">
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

  /* ------------------------------------------------------------------------ */
  /* PAGE                                                                      */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Settings
              </h1>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                v0.1.19
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Configure and control your Coaching OS administration system.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={exportSettings}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 md:flex"
            >
              <Download size={16} />
              Export
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm lg:hidden"
            >
              <Menu size={17} />
              Sections
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search settings..."
              className={`${inputClasses} pl-11`}
            />
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          {/* Settings navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 px-3 py-3">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Admin Control Center
                </p>
              </div>

              <div className="max-h-[calc(100vh-150px)] space-y-1 overflow-y-auto pr-1">
                {filteredMenu.map((item) => {
                  const Icon = item.icon;
                  const active = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectSection(item.id)}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                        active
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          active
                            ? "bg-white/15 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:text-slate-700"
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-bold ${
                            active ? "text-white" : "text-slate-700"
                          }`}
                        >
                          {item.label}
                        </p>

                        <p
                          className={`mt-0.5 truncate text-[11px] ${
                            active
                              ? "text-blue-100"
                              : "text-slate-400"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight
                        size={15}
                        className={
                          active
                            ? "text-white"
                            : "text-slate-300"
                        }
                      />
                    </button>
                  );
                })}

                {filteredMenu.length === 0 && (
                  <div className="px-3 py-8 text-center">
                    <Search
                      size={22}
                      className="mx-auto text-slate-300"
                    />
                    <p className="mt-2 text-sm font-bold text-slate-500">
                      No settings found
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-slate-100 px-3 pt-4">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-bold text-slate-500">
                    Coaching OS
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Admin Console v0.1.19
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="min-w-0">{renderSection()}</section>
        </div>
      </main>

      {/* Mobile settings menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-lg font-black text-slate-900">
                  Settings
                </p>

                <p className="text-xs text-slate-400">
                  Admin Control Center
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
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
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={18} />

                    <div>
                      <p className="text-sm font-bold">
                        {item.label}
                      </p>

                      <p
                        className={`text-[11px] ${
                          active
                            ? "text-blue-100"
                            : "text-slate-400"
                        }`}
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

      {/* Password modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
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
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
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
                  onChange={(e) =>
                    setRoleDescription(e.target.value)
                  }
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
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                {editingRole ? "Save Role" : "Create Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integration modal */}
      {showIntegrationModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Configure {selectedIntegration}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Integration credentials and API configuration will
                  be connected to the backend later.
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
                <AlertTriangle
                  size={19}
                  className="shrink-0 text-amber-600"
                />

                <p className="text-sm leading-6 text-amber-800">
                  Do not place real API keys or secret credentials in
                  this frontend page. Production credentials will be
                  stored securely on the backend.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <Field label="Integration Name">
                <input
                  value={selectedIntegration}
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

              <Field label="Configuration Status">
                <select className={selectClasses} defaultValue="Ready to Connect">
                  <option>Ready to Connect</option>
                  <option>Connected</option>
                  <option>Disabled</option>
                </select>
              </Field>
            </div>

            <div className="mt-7 flex justify-end gap-3">
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
                  setShowIntegrationModal(false);
                  markChanged();
                  showToast(
                    `${selectedIntegration} configuration saved`
                  );
                }}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                <Save size={16} />
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-2xl">
            <CheckCircle2 size={18} className="text-emerald-400" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
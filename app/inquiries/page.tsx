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
  Trash2,
  RotateCcw,
  Filter,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Users,
  IndianRupee,
  Target,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Brain,
  ShieldAlert,
  Lightbulb,
  BarChart3,
  Download,
  RefreshCw,
  UserPlus,
  Save,
  Flame,
  Thermometer,
  Snowflake,
  PhoneCall,
  Mail,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type InquiryStatus =
  | "New"
  | "Contacted"
  | "Follow-up"
  | "Converted"
  | "Lost";

type InquiryPriority = "Hot" | "Warm" | "Cold";

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  batch: string;
  source: string;
  inquiryDate: string;
  followUpDate: string;
  lastFollowUpDate: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  assignedTo: string;
  expectedFee: number;
  lostReason: string;
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

const courses = [
  "JEE Preparation",
  "NEET Preparation",
  "Foundation Course",
  "Class 10",
  "Class 12",
  "JEE Main",
  "JEE Advanced",
  "NEET 2027",
];

const batches = [
  "JEE Advanced 2027",
  "JEE Main 2027",
  "NEET 2027 Morning",
  "NEET 2027 Evening",
  "Foundation 2027",
  "Class 10 Evening",
  "Class 12 Science",
];

const sources = [
  "Website",
  "WhatsApp",
  "Walk-in",
  "Instagram",
  "Facebook",
  "Referral",
  "Google Ads",
  "YouTube",
  "Other",
];

const staffMembers = [
  "Admin",
  "Rahul Coordinator",
  "Priya Counsellor",
  "Amit Sharma",
  "Neha Verma",
];

const initialInquiries: Inquiry[] = [
  {
    id: "INQ-1001",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
    course: "JEE Preparation",
    batch: "JEE Advanced 2027",
    source: "Website",
    inquiryDate: "2026-09-01",
    followUpDate: "2026-09-14",
    lastFollowUpDate: "",
    status: "New",
    priority: "Hot",
    assignedTo: "Admin",
    expectedFee: 65000,
    lostReason: "",
    notes:
      "Interested in JEE Advanced batch. Parent wants detailed fee structure and scholarship information.",
  },
  {
    id: "INQ-1002",
    name: "Priya Verma",
    phone: "9826012345",
    email: "priya@example.com",
    course: "NEET Preparation",
    batch: "NEET 2027 Morning",
    source: "WhatsApp",
    inquiryDate: "2026-08-30",
    followUpDate: "2026-09-13",
    lastFollowUpDate: "2026-09-10",
    status: "Follow-up",
    priority: "Hot",
    assignedTo: "Priya Counsellor",
    expectedFee: 72000,
    lostReason: "",
    notes: "Parent requested fee details and batch timings.",
  },
  {
    id: "INQ-1003",
    name: "Arjun Patel",
    phone: "9755512345",
    email: "arjun@example.com",
    course: "JEE Preparation",
    batch: "JEE Main 2027",
    source: "Walk-in",
    inquiryDate: "2026-08-28",
    followUpDate: "2026-09-15",
    lastFollowUpDate: "2026-09-08",
    status: "Contacted",
    priority: "Warm",
    assignedTo: "Rahul Coordinator",
    expectedFee: 55000,
    lostReason: "",
    notes: "Student visited the institute and discussed JEE Main preparation.",
  },
  {
    id: "INQ-1004",
    name: "Sneha Singh",
    phone: "9893012345",
    email: "sneha@example.com",
    course: "NEET Preparation",
    batch: "NEET 2027 Evening",
    source: "Instagram",
    inquiryDate: "2026-08-26",
    followUpDate: "",
    lastFollowUpDate: "2026-09-02",
    status: "Converted",
    priority: "Hot",
    assignedTo: "Priya Counsellor",
    expectedFee: 72000,
    lostReason: "",
    notes: "Successfully registered for NEET batch.",
  },
  {
    id: "INQ-1005",
    name: "Aditya Joshi",
    phone: "9810012345",
    email: "aditya@example.com",
    course: "Foundation Course",
    batch: "Foundation 2027",
    source: "Referral",
    inquiryDate: "2026-08-24",
    followUpDate: "",
    lastFollowUpDate: "2026-09-03",
    status: "Lost",
    priority: "Cold",
    assignedTo: "Admin",
    expectedFee: 35000,
    lostReason: "Joined another institute",
    notes: "Student joined another coaching institute.",
  },
  {
    id: "INQ-1006",
    name: "Kavya Gupta",
    phone: "9826123456",
    email: "kavya@example.com",
    course: "NEET Preparation",
    batch: "NEET 2027 Morning",
    source: "Google Ads",
    inquiryDate: "2026-09-02",
    followUpDate: "2026-09-12",
    lastFollowUpDate: "2026-09-05",
    status: "Follow-up",
    priority: "Hot",
    assignedTo: "Neha Verma",
    expectedFee: 72000,
    lostReason: "",
    notes: "Very interested. Asked about faculty and test series.",
  },
  {
    id: "INQ-1007",
    name: "Mohit Yadav",
    phone: "9770012345",
    email: "mohit@example.com",
    course: "Class 12",
    batch: "Class 12 Science",
    source: "Facebook",
    inquiryDate: "2026-09-03",
    followUpDate: "2026-09-16",
    lastFollowUpDate: "",
    status: "New",
    priority: "Warm",
    assignedTo: "Admin",
    expectedFee: 42000,
    lostReason: "",
    notes: "Interested in PCM preparation and board support.",
  },
  {
    id: "INQ-1008",
    name: "Anjali Mehta",
    phone: "9893123456",
    email: "anjali@example.com",
    course: "JEE Advanced",
    batch: "JEE Advanced 2027",
    source: "Referral",
    inquiryDate: "2026-09-04",
    followUpDate: "2026-09-11",
    lastFollowUpDate: "2026-09-09",
    status: "Contacted",
    priority: "Hot",
    assignedTo: "Rahul Coordinator",
    expectedFee: 68000,
    lostReason: "",
    notes: "Strong academic profile. Parents requested scholarship discussion.",
  },
  {
    id: "INQ-1009",
    name: "Rohan Jain",
    phone: "9900012345",
    email: "rohan@example.com",
    course: "Foundation Course",
    batch: "Foundation 2027",
    source: "YouTube",
    inquiryDate: "2026-09-04",
    followUpDate: "2026-09-17",
    lastFollowUpDate: "",
    status: "New",
    priority: "Warm",
    assignedTo: "Admin",
    expectedFee: 35000,
    lostReason: "",
    notes: "Parent discovered institute through YouTube.",
  },
  {
    id: "INQ-1010",
    name: "Ishita Rao",
    phone: "9811123456",
    email: "ishita@example.com",
    course: "NEET Preparation",
    batch: "NEET 2027 Morning",
    source: "Website",
    inquiryDate: "2026-09-05",
    followUpDate: "2026-09-12",
    lastFollowUpDate: "",
    status: "New",
    priority: "Hot",
    assignedTo: "Priya Counsellor",
    expectedFee: 72000,
    lostReason: "",
    notes: "Requested faculty details and demo class.",
  },
  {
    id: "INQ-1011",
    name: "Varun Malhotra",
    phone: "9822123456",
    email: "varun@example.com",
    course: "JEE Main",
    batch: "JEE Main 2027",
    source: "Instagram",
    inquiryDate: "2026-09-05",
    followUpDate: "2026-09-18",
    lastFollowUpDate: "",
    status: "Contacted",
    priority: "Warm",
    assignedTo: "Neha Verma",
    expectedFee: 55000,
    lostReason: "",
    notes: "Discussed online and offline class options.",
  },
  {
    id: "INQ-1012",
    name: "Pooja Tiwari",
    phone: "9833123456",
    email: "pooja@example.com",
    course: "Class 10",
    batch: "Class 10 Evening",
    source: "Walk-in",
    inquiryDate: "2026-09-06",
    followUpDate: "2026-09-19",
    lastFollowUpDate: "",
    status: "New",
    priority: "Cold",
    assignedTo: "Admin",
    expectedFee: 28000,
    lostReason: "",
    notes: "Parent is comparing multiple coaching options.",
  },
];

const initialFollowUps: FollowUp[] = [
  {
    id: "FU-1001",
    inquiryId: "INQ-1002",
    date: "2026-09-10",
    notes: "Discussed NEET batch timings and fee structure.",
    outcome: "Interested",
    nextFollowUpDate: "2026-09-13",
    assignedTo: "Priya Counsellor",
  },
  {
    id: "FU-1002",
    inquiryId: "INQ-1003",
    date: "2026-09-08",
    notes: "Student visited the institute and requested course details.",
    outcome: "Requested Details",
    nextFollowUpDate: "2026-09-15",
    assignedTo: "Rahul Coordinator",
  },
  {
    id: "FU-1003",
    inquiryId: "INQ-1008",
    date: "2026-09-09",
    notes: "Parents interested in scholarship and faculty details.",
    outcome: "Interested",
    nextFollowUpDate: "2026-09-11",
    assignedTo: "Rahul Coordinator",
  },
  {
    id: "FU-1004",
    inquiryId: "INQ-1006",
    date: "2026-09-05",
    notes: "Asked about test series and NEET faculty.",
    outcome: "Interested",
    nextFollowUpDate: "2026-09-12",
    assignedTo: "Neha Verma",
  },
];

const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getFollowUpStatus = (followUpDate: string) => {
  if (!followUpDate) return "No Follow-up";

  const today = getLocalDateString();

  if (followUpDate < today) return "Overdue";
  if (followUpDate === today) return "Due Today";

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

const getPriorityClasses = (priority: InquiryPriority) => {
  if (priority === "Hot") {
    return "bg-red-50 text-red-700";
  }

  if (priority === "Warm") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-sky-50 text-sky-700";
};

const getPriorityIcon = (priority: InquiryPriority) => {
  if (priority === "Hot") return <Flame size={14} />;
  if (priority === "Warm") return <Thermometer size={14} />;

  return <Snowflake size={14} />;
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] =
    useState<Inquiry[]>(initialInquiries);

  const [followUps, setFollowUps] =
    useState<FollowUp[]>(initialFollowUps);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [followUpFilter, setFollowUpFilter] = useState("All");

  const [inquiryPage, setInquiryPage] = useState(1);

  const [showAddInquiry, setShowAddInquiry] = useState(false);
  const [editingInquiryId, setEditingInquiryId] =
    useState<string | null>(null);

  const [viewingInquiryId, setViewingInquiryId] =
    useState<string | null>(null);

  const [followUpInquiryId, setFollowUpInquiryId] =
    useState<string | null>(null);

  const [showFollowUpForm, setShowFollowUpForm] =
    useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState<string | null>(null);

  const [showAiCenter, setShowAiCenter] = useState(false);
  const [showPipeline, setShowPipeline] = useState(false);

  const [openActionMenu, setOpenActionMenu] =
    useState<string | null>(null);

  const [toast, setToast] = useState("");

  const [formError, setFormError] = useState("");

  const [followUpFormError, setFollowUpFormError] =
    useState("");

  const [changingStatusInquiryId, setChangingStatusInquiryId] =
    useState<string | null>(null);

  const [changingPriorityInquiryId, setChangingPriorityInquiryId] =
    useState<string | null>(null);

  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCourse, setInquiryCourse] = useState("");
  const [inquiryBatch, setInquiryBatch] = useState("");
  const [inquirySource, setInquirySource] =
    useState("Website");
  const [inquiryFollowUpDate, setInquiryFollowUpDate] =
    useState("");
  const [inquiryPriority, setInquiryPriority] =
    useState<InquiryPriority>("Warm");
  const [inquiryAssignedTo, setInquiryAssignedTo] =
    useState("Admin");
  const [inquiryExpectedFee, setInquiryExpectedFee] =
    useState("");
  const [inquiryLostReason, setInquiryLostReason] =
    useState("");
  const [inquiryNotes, setInquiryNotes] = useState("");

  const [followUpNotes, setFollowUpNotes] = useState("");
  const [followUpOutcome, setFollowUpOutcome] =
    useState("Interested");
  const [followUpNextDate, setFollowUpNextDate] =
    useState("");
  const [followUpAssignedTo, setFollowUpAssignedTo] =
    useState("Admin");

  const rowsPerPage = 10;

  useEffect(() => {
    setInquiryPage(1);
  }, [
    searchQuery,
    statusFilter,
    priorityFilter,
    sourceFilter,
    courseFilter,
    followUpFilter,
  ]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string) => {
    setToast(message);
  };

  const filteredInquiries = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return inquiries.filter((inquiry) => {
      const matchesSearch =
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.phone.includes(query) ||
        inquiry.email.toLowerCase().includes(query) ||
        inquiry.course.toLowerCase().includes(query) ||
        inquiry.batch.toLowerCase().includes(query) ||
        inquiry.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        inquiry.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        inquiry.priority === priorityFilter;

      const matchesSource =
        sourceFilter === "All" ||
        inquiry.source === sourceFilter;

      const matchesCourse =
        courseFilter === "All" ||
        inquiry.course === courseFilter;

      const matchesFollowUp =
        followUpFilter === "All" ||
        getFollowUpStatus(inquiry.followUpDate) ===
          followUpFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesSource &&
        matchesCourse &&
        matchesFollowUp
      );
    });
  }, [
    inquiries,
    searchQuery,
    statusFilter,
    priorityFilter,
    sourceFilter,
    courseFilter,
    followUpFilter,
  ]);

  const totalInquiries = inquiries.length;

  const newInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "New",
  ).length;

  const contactedInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "Contacted",
  ).length;

  const followUpInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "Follow-up",
  ).length;

  const convertedInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "Converted",
  ).length;

  const lostInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "Lost",
  ).length;

  const hotLeads = inquiries.filter(
    (inquiry) => inquiry.priority === "Hot",
  ).length;

  const warmLeads = inquiries.filter(
    (inquiry) => inquiry.priority === "Warm",
  ).length;

  const coldLeads = inquiries.filter(
    (inquiry) => inquiry.priority === "Cold",
  ).length;

  const overdueFollowUps = inquiries.filter(
    (inquiry) =>
      getFollowUpStatus(inquiry.followUpDate) === "Overdue",
  ).length;

  const dueTodayFollowUps = inquiries.filter(
    (inquiry) =>
      getFollowUpStatus(inquiry.followUpDate) === "Due Today",
  ).length;

  const upcomingFollowUps = inquiries.filter(
    (inquiry) =>
      getFollowUpStatus(inquiry.followUpDate) === "Upcoming",
  ).length;

  const conversionRate =
    totalInquiries === 0
      ? 0
      : Math.round(
          (convertedInquiries / totalInquiries) * 100,
        );

  const totalPipelineValue = inquiries
    .filter((inquiry) => inquiry.status !== "Lost")
    .reduce(
      (total, inquiry) => total + inquiry.expectedFee,
      0,
    );

  const convertedRevenue = inquiries
    .filter((inquiry) => inquiry.status === "Converted")
    .reduce(
      (total, inquiry) => total + inquiry.expectedFee,
      0,
    );

  const inquiryTotalPages = Math.max(
    1,
    Math.ceil(filteredInquiries.length / rowsPerPage),
  );

  const safeInquiryPage = Math.min(
    inquiryPage,
    inquiryTotalPages,
  );

  const inquiryStartIndex =
    (safeInquiryPage - 1) * rowsPerPage;

  const paginatedInquiries = filteredInquiries.slice(
    inquiryStartIndex,
    inquiryStartIndex + rowsPerPage,
  );

  const selectedInquiry = inquiries.find(
    (inquiry) => inquiry.id === viewingInquiryId,
  );

  const followUpInquiry = inquiries.find(
    (inquiry) => inquiry.id === followUpInquiryId,
  );

  const aiHotOpportunities = inquiries
    .filter(
      (inquiry) =>
        inquiry.priority === "Hot" &&
        inquiry.status !== "Converted" &&
        inquiry.status !== "Lost",
    )
    .sort((a, b) => b.expectedFee - a.expectedFee)
    .slice(0, 5);

  const aiRiskLeads = inquiries
    .filter(
      (inquiry) =>
        getFollowUpStatus(inquiry.followUpDate) ===
          "Overdue" &&
        inquiry.status !== "Converted" &&
        inquiry.status !== "Lost",
    )
    .slice(0, 5);

  const sourcePerformance = useMemo(() => {
    const map = new Map<
      string,
      {
        total: number;
        converted: number;
        value: number;
      }
    >();

    inquiries.forEach((inquiry) => {
      const current = map.get(inquiry.source) || {
        total: 0,
        converted: 0,
        value: 0,
      };

      current.total += 1;

      if (inquiry.status === "Converted") {
        current.converted += 1;
      }

      current.value += inquiry.expectedFee;

      map.set(inquiry.source, current);
    });

    return Array.from(map.entries())
      .map(([source, data]) => ({
        source,
        ...data,
        rate:
          data.total === 0
            ? 0
            : Math.round(
                (data.converted / data.total) * 100,
              ),
      }))
      .sort((a, b) => b.total - a.total);
  }, [inquiries]);

  const courseDemand = useMemo(() => {
    const map = new Map<string, number>();

    inquiries.forEach((inquiry) => {
      map.set(
        inquiry.course,
        (map.get(inquiry.course) || 0) + 1,
      );
    });

    return Array.from(map.entries())
      .map(([course, count]) => ({
        course,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [inquiries]);

  const resetInquiryForm = () => {
    setInquiryName("");
    setInquiryPhone("");
    setInquiryEmail("");
    setInquiryCourse("");
    setInquiryBatch("");
    setInquirySource("Website");
    setInquiryFollowUpDate("");
    setInquiryPriority("Warm");
    setInquiryAssignedTo("Admin");
    setInquiryExpectedFee("");
    setInquiryLostReason("");
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
    setInquiryBatch(inquiry.batch);
    setInquirySource(inquiry.source);
    setInquiryFollowUpDate(inquiry.followUpDate);
    setInquiryPriority(inquiry.priority);
    setInquiryAssignedTo(inquiry.assignedTo);
    setInquiryExpectedFee(
      String(inquiry.expectedFee),
    );
    setInquiryLostReason(inquiry.lostReason);
    setInquiryNotes(inquiry.notes);

    setFormError("");
    setShowAddInquiry(true);
    setOpenActionMenu(null);
  };

  const handleSaveInquiry = () => {
    if (!inquiryName.trim()) {
      setFormError("Full name is required.");
      return;
    }

    if (!inquiryPhone.trim()) {
      setFormError("Phone number is required.");
      return;
    }

    const cleanedPhone = inquiryPhone.replace(/\D/g, "");

    if (cleanedPhone.length < 10) {
      setFormError(
        "Please enter a valid phone number.",
      );
      return;
    }

    if (!inquiryCourse.trim()) {
      setFormError("Interested course is required.");
      return;
    }

    if (!inquiryBatch.trim()) {
      setFormError("Interested batch is required.");
      return;
    }

    if (!inquiryExpectedFee) {
      setFormError("Expected fee is required.");
      return;
    }

    if (
      Number.isNaN(Number(inquiryExpectedFee)) ||
      Number(inquiryExpectedFee) < 0
    ) {
      setFormError("Enter a valid expected fee.");
      return;
    }

    if (editingInquiryId) {
      setInquiries((current) =>
        current.map((inquiry) =>
          inquiry.id === editingInquiryId
            ? {
                ...inquiry,
                name: inquiryName.trim(),
                phone: cleanedPhone,
                email: inquiryEmail.trim(),
                course: inquiryCourse.trim(),
                batch: inquiryBatch.trim(),
                source: inquirySource,
                followUpDate: inquiryFollowUpDate,
                priority: inquiryPriority,
                assignedTo: inquiryAssignedTo,
                expectedFee: Number(
                  inquiryExpectedFee,
                ),
                lostReason: inquiryLostReason.trim(),
                notes: inquiryNotes.trim(),
              }
            : inquiry,
        ),
      );

      showToast("Inquiry updated successfully.");
    } else {
      const nextNumber =
        inquiries.length > 0
          ? Math.max(
              ...inquiries.map((inquiry) =>
                Number(
                  inquiry.id.replace("INQ-", ""),
                ),
              ),
            ) + 1
          : 1001;

      const newInquiry: Inquiry = {
        id: `INQ-${nextNumber}`,
        name: inquiryName.trim(),
        phone: cleanedPhone,
        email: inquiryEmail.trim(),
        course: inquiryCourse.trim(),
        batch: inquiryBatch.trim(),
        source: inquirySource,
        inquiryDate: getLocalDateString(),
        followUpDate: inquiryFollowUpDate,
        lastFollowUpDate: "",
        status: "New",
        priority: inquiryPriority,
        assignedTo: inquiryAssignedTo,
        expectedFee: Number(inquiryExpectedFee),
        lostReason: inquiryLostReason.trim(),
        notes: inquiryNotes.trim(),
      };

      setInquiries((current) => [
        newInquiry,
        ...current,
      ]);

      showToast("New inquiry added successfully.");
    }

    resetInquiryForm();
    setInquiryPage(1);
    setShowAddInquiry(false);
  };

  const handleDeleteInquiry = (inquiryId: string) => {
    setInquiries((current) =>
      current.filter(
        (inquiry) => inquiry.id !== inquiryId,
      ),
    );

    setFollowUps((current) =>
      current.filter(
        (followUp) =>
          followUp.inquiryId !== inquiryId,
      ),
    );

    setShowDeleteConfirm(null);
    setViewingInquiryId(null);
    setOpenActionMenu(null);

    showToast("Inquiry deleted successfully.");
  };

  const handleStatusChange = (
    inquiryId: string,
    nextStatus: InquiryStatus,
  ) => {
    setChangingStatusInquiryId(inquiryId);

    setInquiries((current) =>
      current.map((inquiry) =>
        inquiry.id === inquiryId
          ? {
              ...inquiry,
              status: nextStatus,
              followUpDate:
                nextStatus === "Converted" ||
                nextStatus === "Lost"
                  ? ""
                  : inquiry.followUpDate,
            }
          : inquiry,
      ),
    );

    setTimeout(() => {
      setChangingStatusInquiryId(null);
    }, 500);

    showToast(
      `Inquiry status changed to ${nextStatus}.`,
    );
  };

  const handlePriorityChange = (
    inquiryId: string,
    priority: InquiryPriority,
  ) => {
    setChangingPriorityInquiryId(inquiryId);

    setInquiries((current) =>
      current.map((inquiry) =>
        inquiry.id === inquiryId
          ? {
              ...inquiry,
              priority,
            }
          : inquiry,
      ),
    );

    setTimeout(() => {
      setChangingPriorityInquiryId(null);
    }, 500);

    showToast(`Lead priority changed to ${priority}.`);
  };

  const openFollowUp = (inquiryId: string) => {
    const inquiry = inquiries.find(
      (item) => item.id === inquiryId,
    );

    setFollowUpInquiryId(inquiryId);
    setShowFollowUpForm(false);
    setFollowUpFormError("");
    setFollowUpNotes("");
    setFollowUpOutcome("Interested");
    setFollowUpNextDate(
      inquiry?.followUpDate || "",
    );
    setFollowUpAssignedTo(
      inquiry?.assignedTo || "Admin",
    );
    setOpenActionMenu(null);
  };

  const closeFollowUp = () => {
    setFollowUpInquiryId(null);
    setShowFollowUpForm(false);
    setFollowUpFormError("");
  };

  const handleSaveFollowUp = () => {
    if (!followUpInquiryId) return;

    if (!followUpNotes.trim()) {
      setFollowUpFormError(
        "Conversation notes are required.",
      );
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
              Number(
                followUp.id.replace("FU-", ""),
              ),
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
      assignedTo: followUpAssignedTo,
    };

    setFollowUps((current) => [
      newFollowUp,
      ...current,
    ]);

    setInquiries((current) =>
      current.map((inquiry) =>
        inquiry.id === followUpInquiryId
          ? {
              ...inquiry,
              followUpDate:
                followUpOutcome === "Converted" ||
                followUpOutcome === "Not Interested"
                  ? ""
                  : followUpNextDate,
              lastFollowUpDate: today,
              assignedTo: followUpAssignedTo,
              status:
                followUpOutcome === "Converted"
                  ? "Converted"
                  : followUpOutcome ===
                      "Not Interested"
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

    showToast("Follow-up saved successfully.");
  };

  const getInquiryFollowUps = (inquiryId: string) =>
    followUps
      .filter(
        (followUp) =>
          followUp.inquiryId === inquiryId,
      )
      .sort((a, b) =>
        b.date.localeCompare(a.date),
      );

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSourceFilter("All");
    setCourseFilter("All");
    setFollowUpFilter("All");
    setInquiryPage(1);
  };

  const handleFollowUpFilter = (filter: string) => {
    setFollowUpFilter(filter);
    setStatusFilter("All");
    setPriorityFilter("All");
    setSearchQuery("");
    setInquiryPage(1);
  };

  const handleExportCsv = () => {
    const headers = [
      "Inquiry ID",
      "Name",
      "Phone",
      "Email",
      "Course",
      "Batch",
      "Source",
      "Inquiry Date",
      "Next Follow-up",
      "Last Follow-up",
      "Status",
      "Priority",
      "Assigned To",
      "Expected Fee",
      "Lost Reason",
      "Notes",
    ];

    const rows = filteredInquiries.map((inquiry) => [
      inquiry.id,
      inquiry.name,
      inquiry.phone,
      inquiry.email,
      inquiry.course,
      inquiry.batch,
      inquiry.source,
      inquiry.inquiryDate,
      inquiry.followUpDate,
      inquiry.lastFollowUpDate,
      inquiry.status,
      inquiry.priority,
      inquiry.assignedTo,
      inquiry.expectedFee,
      inquiry.lostReason,
      inquiry.notes,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""',
            )}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "inquiries.csv";
    link.click();

    URL.revokeObjectURL(url);

    showToast("Inquiry CSV exported.");
  };

  const handleRefresh = () => {
    showToast(
      "Inquiry data refreshed. Backend sync will be connected later.",
    );
  };

  const callInquiry = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const whatsappInquiry = (phone: string) => {
    const phoneNumber = phone.replace(/\D/g, "");

    window.open(
      `https://wa.me/91${phoneNumber}`,
      "_blank",
    );
  };

  return (
    <div
      className="min-h-screen bg-slate-50"
      onClick={() => setOpenActionMenu(null)}
    >
      <Slidebar />

      <main className="ml-64 min-h-screen p-8">
        <div className="mx-auto max-w-[1700px]">
          {/* HEADER */}

          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <UserRoundSearch size={23} />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900">
                      Inquiries & CRM
                    </h1>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      AI-Ready
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage leads, admissions, conversations
                    and follow-ups from one place.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRefresh();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <RefreshCw size={17} />
                Refresh
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleExportCsv();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Download size={17} />
                Export
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowAiCenter(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Sparkles size={17} />
                AI Insights
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openAddInquiry();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Inquiry
              </button>
            </div>
          </div>

          {/* KPI CARDS */}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Total Leads
                </p>

                <Users
                  size={19}
                  className="text-slate-400"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalInquiries}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                All captured inquiries
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  New
                </p>

                <UserPlus
                  size={19}
                  className="text-blue-500"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                {newInquiries}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Need first contact
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Follow-ups
                </p>

                <Clock3
                  size={19}
                  className="text-amber-500"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-amber-600">
                {followUpInquiries}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Active conversations
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Converted
                </p>

                <UserCheck
                  size={19}
                  className="text-emerald-500"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {convertedInquiries}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Registered students
              </p>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Conversion
                </p>

                <Target
                  size={19}
                  className="text-violet-500"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-violet-600">
                {conversionRate}%
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Lead-to-admission rate
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Pipeline
                </p>

                <IndianRupee
                  size={19}
                  className="text-indigo-500"
                />
              </div>

              <p className="mt-2 text-xl font-bold text-indigo-600">
                {formatCurrency(
                  totalPipelineValue,
                )}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Potential fee value
              </p>
            </div>
          </div>

          {/* AI COMMAND CENTER */}

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
            <div className="flex flex-col gap-5 p-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Brain size={24} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">
                      AI CRM Command Center
                    </h2>

                    <Sparkles
                      size={16}
                      className="text-blue-300"
                    />
                  </div>

                  <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-300">
                    Your CRM is structured for AI lead scoring,
                    conversion prediction, follow-up prioritization,
                    risk detection and automated sales recommendations.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowAiCenter(true);
                }}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              >
                <Sparkles size={17} />
                Open AI Center
              </button>
            </div>

            <div className="grid grid-cols-1 border-t border-white/10 md:grid-cols-4">
              <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Hot opportunities
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  {hotLeads}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  High intent leads
                </p>
              </div>

              <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  At risk
                </p>

                <p className="mt-2 text-2xl font-bold text-red-300">
                  {overdueFollowUps}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Overdue follow-ups
                </p>
              </div>

              <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Pipeline value
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {formatCurrency(
                    totalPipelineValue,
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Open opportunities
                </p>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  AI opportunity
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-300">
                  {hotLeads > 0
                    ? "High"
                    : "Medium"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Based on current lead mix
                </p>
              </div>
            </div>
          </div>

          {/* PIPELINE */}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3
                    size={19}
                    className="text-slate-500"
                  />

                  <h2 className="text-lg font-bold text-slate-900">
                    Lead Pipeline
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Understand where your admission leads are in the journey.
                </p>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowPipeline(!showPipeline);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {showPipeline
                  ? "Hide Details"
                  : "View Details"}

                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">
              {[
                {
                  label: "New",
                  count: newInquiries,
                  color: "bg-blue-500",
                  text: "text-blue-700",
                  bg: "bg-blue-50",
                },
                {
                  label: "Contacted",
                  count: contactedInquiries,
                  color: "bg-slate-500",
                  text: "text-slate-700",
                  bg: "bg-slate-100",
                },
                {
                  label: "Follow-up",
                  count: followUpInquiries,
                  color: "bg-amber-500",
                  text: "text-amber-700",
                  bg: "bg-amber-50",
                },
                {
                  label: "Converted",
                  count: convertedInquiries,
                  color: "bg-emerald-500",
                  text: "text-emerald-700",
                  bg: "bg-emerald-50",
                },
                {
                  label: "Lost",
                  count: lostInquiries,
                  color: "bg-red-500",
                  text: "text-red-700",
                  bg: "bg-red-50",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setStatusFilter(item.label);
                    setFollowUpFilter("All");
                  }}
                  className={`rounded-xl border border-slate-100 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                    statusFilter === item.label
                      ? "ring-2 ring-blue-100"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.bg} ${item.text}`}
                    >
                      {item.label}
                    </span>

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                    />
                  </div>

                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    {item.count}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {totalInquiries === 0
                      ? 0
                      : Math.round(
                          (item.count /
                            totalInquiries) *
                            100,
                        )}
                    % of leads
                  </p>
                </button>
              ))}
            </div>

            {showPipeline && (
              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Open Pipeline
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {formatCurrency(
                      totalPipelineValue,
                    )}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Excludes lost opportunities.
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    Converted Value
                  </p>

                  <p className="mt-2 text-xl font-bold text-emerald-700">
                    {formatCurrency(
                      convertedRevenue,
                    )}
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    Expected value from converted leads.
                  </p>
                </div>

                <div className="rounded-xl bg-violet-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
                    Average Lead Value
                  </p>

                  <p className="mt-2 text-xl font-bold text-violet-700">
                    {formatCurrency(
                      totalInquiries === 0
                        ? 0
                        : Math.round(
                            totalPipelineValue /
                              totalInquiries,
                          ),
                    )}
                  </p>

                  <p className="mt-1 text-xs text-violet-600">
                    Average expected fee per lead.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* FOLLOW-UP ACTION CENTER */}

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays
                size={18}
                className="text-slate-500"
              />

              <h2 className="text-base font-bold text-slate-900">
                Follow-up Action Center
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={() =>
                  handleFollowUpFilter("Overdue")
                }
                className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
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

                  <AlertCircle
                    className="text-red-500"
                    size={22}
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Leads that need immediate attention.
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleFollowUpFilter("Due Today")
                }
                className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
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

                  <Clock3
                    className="text-amber-500"
                    size={22}
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Follow-ups scheduled for today.
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleFollowUpFilter("Upcoming")
                }
                className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
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

                  <ArrowRight
                    className="text-blue-500"
                    size={22}
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Future scheduled conversations.
                </p>
              </button>
            </div>
          </div>

          {/* LEAD TEMPERATURE */}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() =>
                setPriorityFilter("Hot")
              }
              className={`rounded-2xl border border-red-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                priorityFilter === "Hot"
                  ? "ring-2 ring-red-100"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Hot Leads
                  </p>

                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {hotLeads}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Flame size={21} />
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Highest conversion opportunity.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                setPriorityFilter("Warm")
              }
              className={`rounded-2xl border border-amber-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                priorityFilter === "Warm"
                  ? "ring-2 ring-amber-100"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Warm Leads
                  </p>

                  <p className="mt-2 text-2xl font-bold text-amber-600">
                    {warmLeads}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Thermometer size={21} />
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Interested but needs nurturing.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                setPriorityFilter("Cold")
              }
              className={`rounded-2xl border border-sky-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                priorityFilter === "Cold"
                  ? "ring-2 ring-sky-100"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Cold Leads
                  </p>

                  <p className="mt-2 text-2xl font-bold text-sky-600">
                    {coldLeads}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Snowflake size={21} />
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Low immediate purchase intent.
              </p>
            </button>
          </div>

          {/* MAIN TABLE */}

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  All Inquiries
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search, qualify and manage every admission lead.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target.value,
                      )
                    }
                    placeholder="Name, ID, phone, email..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-64"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Statuses
                  </option>
                  <option value="New">New</option>
                  <option value="Contacted">
                    Contacted
                  </option>
                  <option value="Follow-up">
                    Follow-up
                  </option>
                  <option value="Converted">
                    Converted
                  </option>
                  <option value="Lost">Lost</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Priorities
                  </option>
                  <option value="Hot">Hot</option>
                  <option value="Warm">Warm</option>
                  <option value="Cold">Cold</option>
                </select>

                <select
                  value={courseFilter}
                  onChange={(event) =>
                    setCourseFilter(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  value={sourceFilter}
                  onChange={(event) =>
                    setSourceFilter(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Sources
                  </option>

                  {sources.map((source) => (
                    <option
                      key={source}
                      value={source}
                    >
                      {source}
                    </option>
                  ))}
                </select>

                <select
                  value={followUpFilter}
                  onChange={(event) =>
                    setFollowUpFilter(
                      event.target.value,
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Follow-ups
                  </option>
                  <option value="Overdue">
                    Overdue
                  </option>
                  <option value="Due Today">
                    Due Today
                  </option>
                  <option value="Upcoming">
                    Upcoming
                  </option>
                  <option value="No Follow-up">
                    No Follow-up
                  </option>
                </select>

                {(searchQuery ||
                  statusFilter !== "All" ||
                  priorityFilter !== "All" ||
                  sourceFilter !== "All" ||
                  courseFilter !== "All" ||
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

            {/* TABLE */}

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[1550px]">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Inquiry
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Course / Batch
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Source
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Expected Fee
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Follow-up
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Priority
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Assigned
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedInquiries.map(
                    (inquiry) => {
                      const followUpStatus =
                        getFollowUpStatus(
                          inquiry.followUpDate,
                        );

                      return (
                        <tr
                          key={inquiry.id}
                          className="border-b border-slate-100 transition hover:bg-blue-50/40"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                                {inquiry.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <p className="text-sm font-bold text-slate-900">
                                  {inquiry.name}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  {inquiry.id}
                                </p>

                                <p className="mt-1 text-xs font-medium text-slate-400">
                                  {inquiry.phone}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <p className="text-sm font-semibold text-slate-700">
                              {inquiry.course}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {inquiry.batch}
                            </p>
                          </td>

                          <td className="px-4 py-4">
                            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                              {inquiry.source}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <p className="text-sm font-bold text-slate-800">
                              {formatCurrency(
                                inquiry.expectedFee,
                              )}
                            </p>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold text-slate-700">
                                {inquiry.followUpDate ||
                                  "—"}
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

                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              <select
                                value={
                                  inquiry.priority
                                }
                                onChange={(event) =>
                                  handlePriorityChange(
                                    inquiry.id,
                                    event.target
                                      .value as InquiryPriority,
                                  )
                                }
                                className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold outline-none ${getPriorityClasses(
                                  inquiry.priority,
                                )}`}
                              >
                                <option value="Hot">
                                  Hot
                                </option>
                                <option value="Warm">
                                  Warm
                                </option>
                                <option value="Cold">
                                  Cold
                                </option>
                              </select>

                              {changingPriorityInquiryId ===
                                inquiry.id && (
                                <span className="text-[11px] font-semibold text-emerald-600">
                                  Saved
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              <select
                                value={
                                  inquiry.status
                                }
                                onChange={(event) =>
                                  handleStatusChange(
                                    inquiry.id,
                                    event.target
                                      .value as InquiryStatus,
                                  )
                                }
                                className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold outline-none ${getStatusClasses(
                                  inquiry.status,
                                )}`}
                              >
                                <option value="New">
                                  New
                                </option>

                                <option value="Contacted">
                                  Contacted
                                </option>

                                <option value="Follow-up">
                                  Follow-up
                                </option>

                                <option value="Converted">
                                  Converted
                                </option>

                                <option value="Lost">
                                  Lost
                                </option>
                              </select>

                              {changingStatusInquiryId ===
                                inquiry.id && (
                                <span className="text-[11px] font-semibold text-emerald-600">
                                  Saved
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                <UserCheck
                                  size={15}
                                />
                              </div>

                              <span className="text-xs font-semibold text-slate-600">
                                {inquiry.assignedTo}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="relative flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setViewingInquiryId(
                                    inquiry.id,
                                  )
                                }
                                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                                title="View"
                              >
                                <Eye size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openEditInquiry(
                                    inquiry,
                                  )
                                }
                                className="rounded-lg border border-slate-200 p-2 text-blue-600 transition hover:bg-blue-50"
                                title="Edit"
                              >
                                <Pencil
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  callInquiry(
                                    inquiry.phone,
                                  )
                                }
                                className="rounded-lg border border-slate-200 p-2 text-emerald-600 transition hover:bg-emerald-50"
                                title="Call"
                              >
                                <Phone
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  whatsappInquiry(
                                    inquiry.phone,
                                  )
                                }
                                className="rounded-lg border border-slate-200 p-2 text-green-600 transition hover:bg-green-50"
                                title="WhatsApp"
                              >
                                <MessageCircle
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openFollowUp(
                                    inquiry.id,
                                  )
                                }
                                className="rounded-lg border border-slate-200 p-2 text-violet-600 transition hover:bg-violet-50"
                                title="Follow-up"
                              >
                                <CalendarDays
                                  size={16}
                                />
                              </button>

                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();

                                    setOpenActionMenu(
                                      openActionMenu ===
                                        inquiry.id
                                        ? null
                                        : inquiry.id,
                                    );
                                  }}
                                  className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
                                >
                                  <MoreHorizontal
                                    size={16}
                                  />
                                </button>

                                {openActionMenu ===
                                  inquiry.id && (
                                  <div
                                    className="absolute right-0 top-11 z-30 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                                    onClick={(event) =>
                                      event.stopPropagation()
                                    }
                                  >
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setViewingInquiryId(
                                          inquiry.id,
                                        );
                                        setOpenActionMenu(
                                          null,
                                        );
                                      }}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                      <Eye
                                        size={15}
                                      />
                                      View Profile
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        openEditInquiry(
                                          inquiry,
                                        )
                                      }
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                      <Pencil
                                        size={15}
                                      />
                                      Edit Inquiry
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        openFollowUp(
                                          inquiry.id,
                                        )
                                      }
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                      <CalendarDays
                                        size={15}
                                      />
                                      Follow-up
                                    </button>

                                    <div className="my-1 border-t border-slate-100" />

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowDeleteConfirm(
                                          inquiry.id,
                                        );
                                        setOpenActionMenu(
                                          null,
                                        );
                                      }}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2
                                        size={15}
                                      />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    },
                  )}

                  {paginatedInquiries.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={9}
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

            {/* PAGINATION */}

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
                    inquiryStartIndex +
                      rowsPerPage,
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
                    setInquiryPage((page) =>
                      Math.max(1, page - 1),
                    )
                  }
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from(
                  {
                    length: inquiryTotalPages,
                  },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      setInquiryPage(page)
                    }
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
                  disabled={
                    safeInquiryPage ===
                    inquiryTotalPages
                  }
                  onClick={() =>
                    setInquiryPage((page) =>
                      Math.min(
                        inquiryTotalPages,
                        page + 1,
                      ),
                    )
                  }
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* SOURCE + COURSE ANALYTICS */}

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <TrendingUp
                  size={19}
                  className="text-emerald-500"
                />

                <h2 className="text-lg font-bold text-slate-900">
                  Lead Source Performance
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Understand which channels generate the strongest opportunities.
              </p>

              <div className="mt-5 space-y-3">
                {sourcePerformance
                  .slice(0, 6)
                  .map((item) => (
                    <div
                      key={item.source}
                      className="rounded-xl border border-slate-100 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">
                          {item.source}
                        </span>

                        <span className="text-xs font-bold text-slate-500">
                          {item.total} leads
                        </span>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                8,
                                item.total *
                                  12,
                              ),
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          Conversion
                        </span>

                        <span className="font-bold text-emerald-600">
                          {item.rate}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <GraduationCap
                  size={19}
                  className="text-blue-500"
                />

                <h2 className="text-lg font-bold text-slate-900">
                  Course Demand
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Courses generating the most admission interest.
              </p>

              <div className="mt-5 space-y-4">
                {courseDemand
                  .slice(0, 6)
                  .map((item, index) => {
                    const maxCount =
                      courseDemand[0]?.count || 1;

                    return (
                      <div key={item.course}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">
                              {index + 1}
                            </div>

                            <span className="text-sm font-semibold text-slate-700">
                              {item.course}
                            </span>
                          </div>

                          <span className="text-sm font-bold text-slate-900">
                            {item.count}
                          </span>
                        </div>

                        <div className="ml-11 mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${Math.max(
                                10,
                                (item.count /
                                  maxCount) *
                                  100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ADD / EDIT INQUIRY MODAL */}

      {showAddInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => {
            resetInquiryForm();
            setShowAddInquiry(false);
          }}
        >
          <div
            className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingInquiryId
                      ? "Edit Inquiry"
                      : "Add New Inquiry"}
                  </h2>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                    CRM
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Capture complete lead information for better conversion tracking.
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

            <div className="max-h-[72vh] overflow-y-auto p-6">
              {formError && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {formError}
                </div>
              )}

              <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles
                    size={18}
                    className="mt-0.5 text-blue-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      AI-ready lead profile
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      The information below will later be used by the AI engine to predict lead quality, recommend follow-ups and identify conversion opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(event) =>
                      setInquiryName(
                        event.target.value,
                      )
                    }
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
                    onChange={(event) =>
                      setInquiryPhone(
                        event.target.value,
                      )
                    }
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
                    onChange={(event) =>
                      setInquiryEmail(
                        event.target.value,
                      )
                    }
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Lead Source
                  </label>

                  <select
                    value={inquirySource}
                    onChange={(event) =>
                      setInquirySource(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {sources.map((source) => (
                      <option
                        key={source}
                        value={source}
                      >
                        {source}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interested Course *
                  </label>

                  <select
                    value={inquiryCourse}
                    onChange={(event) =>
                      setInquiryCourse(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select course
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
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interested Batch *
                  </label>

                  <select
                    value={inquiryBatch}
                    onChange={(event) =>
                      setInquiryBatch(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select batch
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
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Expected Fee *
                  </label>

                  <div className="relative">
                    <IndianRupee
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="number"
                      min="0"
                      value={inquiryExpectedFee}
                      onChange={(event) =>
                        setInquiryExpectedFee(
                          event.target.value,
                        )
                      }
                      placeholder="Expected admission fee"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 pl-10 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Lead Priority
                  </label>

                  <select
                    value={inquiryPriority}
                    onChange={(event) =>
                      setInquiryPriority(
                        event.target
                          .value as InquiryPriority,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Hot">
                      🔥 Hot
                    </option>

                    <option value="Warm">
                      🌡️ Warm
                    </option>

                    <option value="Cold">
                      ❄️ Cold
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Next Follow-up
                  </label>

                  <input
                    type="date"
                    value={inquiryFollowUpDate}
                    onChange={(event) =>
                      setInquiryFollowUpDate(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Assigned To
                  </label>

                  <select
                    value={inquiryAssignedTo}
                    onChange={(event) =>
                      setInquiryAssignedTo(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {staffMembers.map((member) => (
                      <option
                        key={member}
                        value={member}
                      >
                        {member}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Lost Reason
                  </label>

                  <input
                    type="text"
                    value={inquiryLostReason}
                    onChange={(event) =>
                      setInquiryLostReason(
                        event.target.value,
                      )
                    }
                    placeholder="Only required when lead is lost"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Notes
                  </label>

                  <textarea
                    value={inquiryNotes}
                    onChange={(event) =>
                      setInquiryNotes(
                        event.target.value,
                      )
                    }
                    rows={5}
                    placeholder="Add detailed notes about the student, parent, requirements, objections or conversations..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                onClick={handleSaveInquiry}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Save size={16} />

                {editingInquiryId
                  ? "Save Changes"
                  : "Add Inquiry"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW PROFILE MODAL */}

      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() =>
            setViewingInquiryId(null)
          }
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Inquiry Profile
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getPriorityClasses(
                      selectedInquiry.priority,
                    )}`}
                  >
                    {selectedInquiry.priority}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedInquiry.name} ·{" "}
                  {selectedInquiry.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setViewingInquiryId(null)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto p-6">
              <div className="rounded-2xl bg-slate-900 p-5 text-white">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-bold">
                      {selectedInquiry.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">
                        {selectedInquiry.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-300">
                        {selectedInquiry.course}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                          {selectedInquiry.status}
                        </span>

                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                          {selectedInquiry.source}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Expected Value
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {formatCurrency(
                        selectedInquiry.expectedFee,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone size={16} />
                    <p className="text-xs font-bold uppercase tracking-wide">
                      Phone
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-800">
                    {selectedInquiry.phone}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail size={16} />
                    <p className="text-xs font-bold uppercase tracking-wide">
                      Email
                    </p>
                  </div>

                  <p className="mt-2 break-all text-sm font-bold text-slate-800">
                    {selectedInquiry.email ||
                      "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <GraduationCap
                      size={16}
                    />

                    <p className="text-xs font-bold uppercase tracking-wide">
                      Course
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-800">
                    {selectedInquiry.course}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CalendarDays
                      size={16}
                    />

                    <p className="text-xs font-bold uppercase tracking-wide">
                      Batch
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-800">
                    {selectedInquiry.batch}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Inquiry Date
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-800">
                    {selectedInquiry.inquiryDate}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Assigned To
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-800">
                    {selectedInquiry.assignedTo}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-2">
                  <Brain
                    size={18}
                    className="text-blue-600"
                  />

                  <h3 className="text-sm font-bold text-slate-900">
                    AI Lead Assessment
                  </h3>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="text-xs font-semibold text-red-600">
                      Intent
                    </p>

                    <p className="mt-1 text-lg font-bold text-red-700">
                      {selectedInquiry.priority ===
                      "Hot"
                        ? "High"
                        : selectedInquiry.priority ===
                            "Warm"
                          ? "Medium"
                          : "Low"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-4">
                    <p className="text-xs font-semibold text-blue-600">
                      AI Action
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-700">
                      {selectedInquiry.status ===
                      "New"
                        ? "Contact immediately"
                        : selectedInquiry.status ===
                            "Follow-up"
                          ? "Continue nurturing"
                          : selectedInquiry.status ===
                              "Contacted"
                            ? "Schedule next step"
                            : "Monitor"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="text-xs font-semibold text-emerald-600">
                      Opportunity
                    </p>

                    <p className="mt-1 text-lg font-bold text-emerald-700">
                      {formatCurrency(
                        selectedInquiry.expectedFee,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Notes
                </p>

                <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selectedInquiry.notes ||
                    "No notes added."}
                </div>
              </div>

              {selectedInquiry.lostReason && (
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-500">
                    Lost Reason
                  </p>

                  <p className="mt-1 text-sm font-semibold text-red-700">
                    {selectedInquiry.lostReason}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    callInquiry(
                      selectedInquiry.phone,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <PhoneCall size={16} />
                  Call
                </button>

                <button
                  type="button"
                  onClick={() =>
                    whatsappInquiry(
                      selectedInquiry.phone,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setViewingInquiryId(null);
                    openFollowUp(
                      selectedInquiry.id,
                    );
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <CalendarDays size={16} />
                  Follow-up
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  setViewingInquiryId(null);
                  openEditInquiry(
                    selectedInquiry,
                  );
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewingInquiryId(null)
                }
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOLLOW-UP HISTORY MODAL */}

      {followUpInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={closeFollowUp}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Follow-up Timeline
                  </h2>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {getInquiryFollowUps(
                      followUpInquiry.id,
                    ).length}{" "}
                    activities
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {followUpInquiry.name} ·{" "}
                  {followUpInquiry.id}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFollowUpForm(true);
                    setFollowUpFormError("");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Add Follow-up
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

            <div className="max-h-[70vh] overflow-y-auto p-6">
              {showFollowUpForm && (
                <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      <MessageCircle
                        size={17}
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Record Conversation
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Capture the conversation and next action.
                      </p>
                    </div>
                  </div>

                  {followUpFormError && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
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
                          setFollowUpOutcome(
                            event.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="Interested">
                          Interested
                        </option>

                        <option value="Call Back">
                          Call Back
                        </option>

                        <option value="Requested Details">
                          Requested Details
                        </option>

                        <option value="No Response">
                          No Response
                        </option>

                        <option value="Converted">
                          Converted
                        </option>

                        <option value="Not Interested">
                          Not Interested
                        </option>
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
                          setFollowUpNextDate(
                            event.target.value,
                          )
                        }
                        disabled={
                          followUpOutcome ===
                            "Converted" ||
                          followUpOutcome ===
                            "Not Interested"
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none disabled:bg-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Assigned To
                      </label>

                      <select
                        value={followUpAssignedTo}
                        onChange={(event) =>
                          setFollowUpAssignedTo(
                            event.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        {staffMembers.map(
                          (member) => (
                            <option
                              key={member}
                              value={member}
                            >
                              {member}
                            </option>
                          ),
                        )}
                      </select>
                    </div>

                    <div className="rounded-xl border border-blue-100 bg-white p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        AI suggestion
                      </p>

                      <p className="mt-1 text-xs font-semibold text-blue-700">
                        {followUpInquiry.priority ===
                        "Hot"
                          ? "High-priority lead: follow up quickly."
                          : followUpInquiry.priority ===
                              "Warm"
                            ? "Continue nurturing with useful information."
                            : "Use educational content to increase interest."}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Conversation Notes *
                      </label>

                      <textarea
                        value={followUpNotes}
                        onChange={(event) =>
                          setFollowUpNotes(
                            event.target.value,
                          )
                        }
                        rows={4}
                        placeholder="What was discussed? What did the student/parent ask? What should happen next?"
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                      <CheckCircle2
                        size={16}
                      />
                      Save Follow-up
                    </button>
                  </div>
                </div>
              )}

              {getInquiryFollowUps(
                followUpInquiry.id,
              ).length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
                  <CalendarDays
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-bold text-slate-700">
                    No follow-ups recorded yet.
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Add the first conversation activity.
                  </p>
                </div>
              ) : (
                <div className="relative space-y-4">
                  <div className="absolute bottom-5 left-5 top-5 w-px bg-slate-200" />

                  {getInquiryFollowUps(
                    followUpInquiry.id,
                  ).map((followUp) => (
                    <div
                      key={followUp.id}
                      className="relative pl-12"
                    >
                      <div className="absolute left-2 top-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-blue-600 shadow-sm">
                        <MessageCircle
                          size={12}
                          className="text-white"
                        />
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="text-sm font-bold text-slate-900">
                                {followUp.date}
                              </p>

                              <span className="text-xs font-medium text-slate-400">
                                {followUp.id}
                              </span>
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                              Assigned to{" "}
                              <span className="font-semibold text-slate-700">
                                {
                                  followUp.assignedTo
                                }
                              </span>
                            </p>
                          </div>

                          <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                            {followUp.outcome}
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-slate-600">
                          {followUp.notes}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                          <span>
                            Next action:{" "}
                            <span className="font-bold text-slate-700">
                              {followUp.nextFollowUpDate ||
                                "No next follow-up"}
                            </span>
                          </span>
                        </div>
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

      {/* AI CENTER MODAL */}

      {showAiCenter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={() => setShowAiCenter(false)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Sparkles size={19} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      AI CRM Command Center
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      AI-ready insights based on current CRM data
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAiCenter(false)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[78vh] overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <Brain size={20} />

                  <p className="mt-4 text-xs font-semibold text-slate-400">
                    AI LEAD SIGNAL
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    {hotLeads > 2
                      ? "Strong"
                      : "Moderate"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    High-intent lead volume.
                  </p>
                </div>

                <div className="rounded-2xl bg-red-50 p-5">
                  <ShieldAlert
                    size={20}
                    className="text-red-600"
                  />

                  <p className="mt-4 text-xs font-semibold text-red-500">
                    AI RISK
                  </p>

                  <p className="mt-2 text-xl font-bold text-red-700">
                    {overdueFollowUps} leads
                  </p>

                  <p className="mt-1 text-xs text-red-600">
                    Require immediate action.
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-5">
                  <TrendingUp
                    size={20}
                    className="text-emerald-600"
                  />

                  <p className="mt-4 text-xs font-semibold text-emerald-600">
                    AI OPPORTUNITY
                  </p>

                  <p className="mt-2 text-xl font-bold text-emerald-700">
                    {formatCurrency(
                      totalPipelineValue,
                    )}
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    Open revenue opportunity.
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <Target
                    size={20}
                    className="text-blue-600"
                  />

                  <p className="mt-4 text-xs font-semibold text-blue-600">
                    AI CONVERSION
                  </p>

                  <p className="mt-2 text-xl font-bold text-blue-700">
                    {conversionRate}%
                  </p>

                  <p className="mt-1 text-xs text-blue-600">
                    Current conversion rate.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* HOT OPPORTUNITIES */}

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2">
                    <Lightbulb
                      size={19}
                      className="text-amber-500"
                    />

                    <h3 className="text-base font-bold text-slate-900">
                      AI Priority Opportunities
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Leads the system would prioritize for human follow-up.
                  </p>

                  <div className="mt-4 space-y-3">
                    {aiHotOpportunities.length ===
                    0 ? (
                      <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                        No high-priority opportunities detected.
                      </div>
                    ) : (
                      aiHotOpportunities.map(
                        (inquiry) => (
                          <button
                            key={inquiry.id}
                            type="button"
                            onClick={() => {
                              setShowAiCenter(
                                false,
                              );
                              setViewingInquiryId(
                                inquiry.id,
                              );
                            }}
                            className="flex w-full items-center justify-between rounded-xl border border-slate-100 p-4 text-left transition hover:bg-slate-50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-700">
                                {inquiry.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <p className="text-sm font-bold text-slate-800">
                                  {inquiry.name}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  {inquiry.course}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-sm font-bold text-slate-800">
                                {formatCurrency(
                                  inquiry.expectedFee,
                                )}
                              </p>

                              <p className="mt-1 text-xs font-semibold text-red-600">
                                High intent
                              </p>
                            </div>
                          </button>
                        ),
                      )
                    )}
                  </div>
                </div>

                {/* RISKS */}

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2">
                    <ShieldAlert
                      size={19}
                      className="text-red-500"
                    />

                    <h3 className="text-base font-bold text-slate-900">
                      AI Risk Detection
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Leads where delayed action could reduce conversion chances.
                  </p>

                  <div className="mt-4 space-y-3">
                    {aiRiskLeads.length === 0 ? (
                      <div className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                        No overdue leads detected.
                      </div>
                    ) : (
                      aiRiskLeads.map(
                        (inquiry) => (
                          <button
                            key={inquiry.id}
                            type="button"
                            onClick={() => {
                              setShowAiCenter(
                                false,
                              );
                              openFollowUp(
                                inquiry.id,
                              );
                            }}
                            className="flex w-full items-center justify-between rounded-xl border border-red-100 bg-red-50/40 p-4 text-left transition hover:bg-red-50"
                          >
                            <div>
                              <p className="text-sm font-bold text-slate-800">
                                {inquiry.name}
                              </p>

                              <p className="mt-1 text-xs text-red-600">
                                Follow-up overdue
                              </p>
                            </div>

                            <ArrowRight
                              size={17}
                              className="text-red-500"
                            />
                          </button>
                        ),
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* AI RECOMMENDATIONS */}

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={19}
                    className="text-blue-600"
                  />

                  <h3 className="text-base font-bold text-blue-900">
                    AI Recommendations
                  </h3>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm font-bold text-slate-800">
                      1. Prioritize hot leads
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Contact high-intent leads first, especially those with high expected fee value.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm font-bold text-slate-800">
                      2. Reduce overdue follow-ups
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Overdue conversations represent potential lost admissions.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm font-bold text-slate-800">
                      3. Focus on high-demand courses
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Use course demand data to improve counselling capacity and batch planning.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm font-bold text-slate-800">
                      4. Improve source conversion
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Compare lead volume against conversion rate before increasing marketing spend.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  AI integration status
                </p>

                <p className="mt-1 text-sm font-bold text-slate-700">
                  Frontend AI simulation active
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Real AI scoring, predictive conversion models, natural-language CRM queries and automated recommendations will be connected to the backend AI service later.
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowAiCenter(false)
                }
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={() =>
            setShowDeleteConfirm(null)
          }
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Delete inquiry?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This will remove the inquiry and its follow-up history from the current demo state. This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirm(null)
                }
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDeleteInquiry(
                    showDeleteConfirm,
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] max-w-sm rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <CheckCircle2
              size={18}
              className="text-emerald-400"
            />

            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
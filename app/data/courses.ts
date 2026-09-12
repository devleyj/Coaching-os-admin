export interface Course {
  id: string;
  name: string;
  category: string;
  duration: string;
  fees: number;
  status: "Active" | "Inactive";
  subjects: string[];
  capacity: number;
  startDate: string;
  description: string;
}

export const courses: Course[] = [
  {
    id: "CRS-1001",
    name: "JEE Advanced",
    category: "Engineering",
    duration: "2 Years",
    fees: 45000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    capacity: 300,
    startDate: "2026-04-01",
    description: "Complete JEE Advanced preparation program.",
  },
  {
    id: "CRS-1002",
    name: "NEET",
    category: "Medical",
    duration: "2 Years",
    fees: 52000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Biology"],
    capacity: 300,
    startDate: "2026-04-01",
    description: "Complete NEET preparation program.",
  },
  {
    id: "CRS-1003",
    name: "Foundation",
    category: "Foundation",
    duration: "2 Years",
    fees: 35000,
    status: "Active",
    subjects: ["Mathematics", "Science", "English"],
    capacity: 200,
    startDate: "2026-04-01",
    description: "Foundation program for school students.",
  },
  {
    id: "CRS-1004",
    name: "JEE Main",
    category: "Engineering",
    duration: "1 Year",
    fees: 38000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    capacity: 250,
    startDate: "2026-04-01",
    description: "Focused JEE Main preparation program.",
  },
  {
    id: "CRS-1005",
    name: "NEET Crash Course",
    category: "Medical",
    duration: "6 Months",
    fees: 30000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Biology"],
    capacity: 150,
    startDate: "2026-06-01",
    description: "Intensive NEET crash preparation program.",
  },
  {
    id: "CRS-1006",
    name: "Class 10 Foundation",
    category: "Foundation",
    duration: "1 Year",
    fees: 28000,
    status: "Active",
    subjects: ["Mathematics", "Science", "English"],
    capacity: 150,
    startDate: "2026-04-01",
    description: "Academic foundation program for Class 10 students.",
  },
  {
    id: "CRS-1007",
    name: "Class 12 Science",
    category: "School",
    duration: "1 Year",
    fees: 32000,
    status: "Active",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    capacity: 150,
    startDate: "2026-04-01",
    description: "Class 12 science academic preparation program.",
  },
  {
    id: "CRS-1008",
    name: "Olympiad Preparation",
    category: "Competitive",
    duration: "1 Year",
    fees: 25000,
    status: "Active",
    subjects: ["Mathematics", "Science", "Logical Reasoning"],
    capacity: 100,
    startDate: "2026-04-01",
    description: "Specialized preparation for academic Olympiads.",
  },
  {
    id: "CRS-1009",
    name: "Commerce Foundation",
    category: "Commerce",
    duration: "1 Year",
    fees: 30000,
    status: "Active",
    subjects: ["Accountancy", "Business Studies", "Economics"],
    capacity: 120,
    startDate: "2026-04-01",
    description: "Foundation program for commerce students.",
  },
];
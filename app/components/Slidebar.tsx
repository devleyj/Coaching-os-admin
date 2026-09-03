"use clinet";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  CalendarDays,
  ClipboardCheck,
  IndianRupee,
  UserPlus,
  FileText,
} from "lucide-react";

export default function Slidebar(){
  return(
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5">

      {/* Logo */}
      <div className= "mb-8">
        <h1 className= "text-2xl font-boald text-salte-900">
          Coaching OS
        </h1>
        <p className= "mt-1 text-xs text-slate-400">
          Institute Management
        </p>
      </div>

      {/* Navigation */}
      <nav className= "flex-1">
        <p className= "mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        <div className= "space-y-1">
          <NavItem
            icon= {<LayoutDashboard size={19} />}
            label= "Dashboard"
            active
            />

            <NavItem
            icon= {<Users size={19} />}
            label= "Students"
            />
            <NavItem
            icon= {<GraduationCap size={19} />}
            label= "Teachers"
            />
            <NavItem
            icon= {<Layers size={19} />}
            label= "Batches"
            />

            <NavItem
            icon= {<BookOpen size={19} />}
            label= "Courses"
            />

            <NavItem
            icon= {<CalendarDays size={19} />}
            label= "Schedule"
            />

            <NavItem
            icon= {<ClipboardCheck size={19} />}
            label= "Attendence"
            />

            <NavItem
            icon= {<IndianRupee size={19} />}
            label= "Fees"
            />

            <NavItem
            icon= {<UserPlus size={19} />}
            label= "Inquiries"
            />

            <NavItem
            icon= {<FileText size={19} />}
            label= "Exams"
            />

        </div>
      </nav>

      {/* Bottom */}
      <div className= "border-t border-slate-100 pt-5">
        <p className= "px-3 text-xs text-slate-400">
          Coaching OS v1.0
        </p>
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return(
    <button
      className= {`flex w-full items-center gap-3 rounded-x1 px-3 py-2.5 text-left text-sm font-medium transition ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
      >
      {icon}
      <span>{label}</span>
    </button>
  );
}
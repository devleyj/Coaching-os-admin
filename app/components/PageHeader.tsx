"use client";

import { ReactNode } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  actions?: ReactNode;
  showDate?: boolean;
  dateLabel?: string;
}

export default function PageHeader({
  title,
  description,
  icon,
  actions,
  showDate = false,
  dateLabel = "Today",
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {icon}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-2">
        {showDate && (
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <CalendarDays size={16} className="text-slate-500" />
            <span>{dateLabel}</span>
            <ChevronDown size={15} className="text-slate-400" />
          </button>
        )}

        {actions}
      </div>
    </div>
  );
}
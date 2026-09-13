"use client";

import { ReactNode } from "react";
import {
  CalendarDays,
  ChevronDown,
} from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  actions?: ReactNode;
  showDate?: boolean;
  dateLabel?: string;
  onDateClick?: () => void;
}

export default function PageHeader({
  title,
  description,
  icon,
  actions,
  showDate = false,
  dateLabel = "Today",
  onDateClick,
}: PageHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT SIDE */}
        <div className="flex min-w-0 items-start gap-3">
          {/* ICON */}
          {icon && (
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}

          {/* TITLE + DESCRIPTION */}
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        {(showDate || actions) && (
          <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
            {/* DATE BUTTON */}
            {showDate && (
              <button
                type="button"
                onClick={onDateClick}
                className="flex h-10 min-w-[110px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/40 hover:text-blue-700 focus:ring-2 focus:ring-blue-100 active:scale-[0.98]"
                aria-label={`Select date: ${dateLabel}`}
              >
                <CalendarDays
                  size={16}
                  className="shrink-0 text-slate-500"
                />

                <span className="truncate">
                  {dateLabel}
                </span>

                <ChevronDown
                  size={15}
                  className="shrink-0 text-slate-400"
                />
              </button>
            )}

            {/* ACTIONS */}
            {actions && (
              <div className="flex flex-wrap items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
"use clinet";

import { CheckCircle2,
  XCircle,
 } from "lucide-react";

const attendanceData = {
  percentage : 92,
  present : 1148,
  absent : 100,
};

export default function AttendanceOverview() {
  return(
    <div className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex item-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Today student attendance
          </p>
        </div>

        <div className="flex h-12 w-12 item-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 size={24} />
        </div>
      </div>

      <div className="mt-6 flex item-center gap-8">
        <div>
          <p className="text-4xl font-bold text-slate-900">
            {attendanceData.percentage}%
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Overall attendance
          </p>
        </div>
        
        <div className="h-16 w-px bg-slate-200" />

        <div className="space-y-3">
          <div className="flex item-center gap-2 text-sm">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-slate-600">
              Present
            </span>
            <span className="font-semibold text-slate-900">
              {attendanceData.present}
            </span>
          </div>

          <div className="flex item-center gap-2 text-sm">
            <XCircle size={16} className="text-red-500" />
            <span className="text-slate-600">
              Absent
            </span>
            <span className="font-semibold text-slate-900">
              {attendanceData.absent}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
           className="h-full rounded-full bg-green-500"
           style={{
            width : `${attendanceData.percentage}%`,
           }}
          />
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Updated a few minutes ago
        </p>
      </div>
    </div>
  );
}
"use client";

import {
  UserPlus,
  CreditCard,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react";

const activities = [
  {
    icon: UserPlus,
    title: "New student registered",
    description: "Aarav Mehta joined JEE Advanced",
    time: "10 minutes ago",
  },
  {
    icon: CreditCard,
    title: "Fee payment received",
    description: "₹12,000 received from Riya Sharma",
    time: "32 minutes ago",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance completed",
    description: "Physics batch attendance marked",
    time: "1 hour ago",
  },
  {
    icon: MessageSquare,
    title: "New inquiry received",
    description: "Parent inquiry for NEET 2027",
    time: "2 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest activity across your institute
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={`${activity.title}-${activity.time}`}
              className="flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
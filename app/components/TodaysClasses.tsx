"use client";

import { Clock, MapPin, User } from "lucide-react";

const classes = [
  {
    time: "09:00 AM",
    subject: "Mathematics",
    batch: "JEE Advanced",
    teacher: "Rahul Sharma",
    room: "Room 101",
  },
  {
    time: "11:00 AM",
    subject: "Physics",
    batch: "NEET 2027",
    teacher: "Amit Verma",
    room: "Room 203",
  },
  {
    time: "02:00 PM",
    subject: "Chemistry",
    batch: "JEE Main",
    teacher: "Priya Singh",
    room: "Room 105",
  },
  {
    time: "05:00 PM",
    subject: "Biology",
    batch: "NEET 2027",
    teacher: "Neha Patel",
    room: "Room 202",
  },
];

export default function TodaysClasses() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Todays Classes
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Scheduled classes for today
        </p>
      </div>

      <div className="space-y-4">
        {classes.map((item) => (
          <div
            key={`${item.time}-${item.subject}`}
            className="rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-4">
              
              <div>
                <h3 className="font-semibold text-slate-900">
                  {item.subject}
                </h3>

                <p className="mt-1 text-sm text-blue-600">
                  {item.batch}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Clock size={16} />
                {item.time}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {item.teacher}
              </span>

              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {item.room}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
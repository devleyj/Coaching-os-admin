import Slidebar from "./components/Slidebar";
import StudentGrowthChart from "./components/StudentGrowthCharts";
import RevenueChart from "./components/RevenueChart";

import{  Bell,
  Search,
  Users,
  GraduationCap,
  Layers,
  IndianRupee,
 } from "lucide-react";

export default function Home(){
  return(
    <div className= "flex min-h-screen bg-slate-50">
      {/*Slidebar*/}
      <Slidebar/>

      {/* Main Content */}
      <main className= "flex-1">

        {/* Header */}
        <header className= "flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          
          {/* Left sidev */}
          <div>
            <h1 className= "text-2xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className= "mt-1 text-sm text-slate-500">
              Welcome back to Coaching OS
            </p>
          </div>

          {/* Right side */}
          <div  className= "flex items-center gap-5">

            {/* Search */}
            <div className= "relative">
              <Search
                size={18}
                className= "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder= "Search..."
                className= "w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            {/* Notification */}
            <button className= "relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
              <Bell size={20} />

              <span className= "absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"/>
            </button>

            {/* User Profile */}
            <div className= "flex items-center gap-3 border-l border-slate-200 pl-5">

              <div className= "flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                JD
              </div>

              <div>
                <p className= "text-sm font-semibold text-slate-900">
                  Admin
                </p>

                <p className= "text-xs text-slate-400">
                  Administrator
                </p>
              </div>

            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <section className= "p-8">

          {/* KPI Cards*/}
          <div className= "grid grid-cols1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            {/* Students */}
            <div className= "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className= "flex items-center justify-between">
                <div className= "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users size={24} />
                </div>

                <span className= "text-sm font-medium text-green-600">
                  +12.5%
                </span>
              </div>

              <p className= "mt-5 text-sm text-slate-500">
                Total Students
              </p>

              <h2 className= "mt-1 text-3xl font-bold text-slate-900">
                1,248
              </h2>
            </div>

            {/* Teachers */}
            <div className= "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className= "flex items-center justify-between">
                <div className= "flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <GraduationCap size={24} />
                </div>

                <span className= "text-sm font-medium text-green-600">
                  +4.2%
                </span>
              </div>

              <p className= "mt-5 text-sm text-slate-500">
                Teachers
              </p>

              <h2 className= "mt-1 text-3xl font-bold text-slate-900">
                42
              </h2>
            </div>

            {/* Batches */}
            <div className= "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className= "flex items-center justify-between">
                <div className= "flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                  <Layers size={24} />
                </div>

                <span className= "text-sm font-medium text-green-600">
                  +8.1%
                </span>
              </div>

              <p className= "mt-5 text-sm text-slate-500">
                Active Batches
              </p>

              <h2 className= "mt-1 text-3xl font-bold text-slate-900">
                28
              </h2>
            </div>

            {/* Revenue*/}
            <div className= "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className= "flex items-center justify-between">
                <div className= "flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <IndianRupee size= {24} />
                </div>

                <span className= "text-sm font-medium text-green-600">
                  +15.8%
                </span>
              </div>

              <p className= "mt-5 text-sm text-slate-500">
                Monthly Revenue
              </p>

              <h2 className= "mt-1 text-3xl font-bold text-slate-900">
                ₹8.4L
              </h2>
            </div>

          </div>

          {/* Analytics Growth Chart */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <StudentGrowthChart />
            <RevenueChart />
          </div>

            {/* Welcome Card */}
            <div className= "mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className= "text-xl font-semibold text-slate-900">
                Welcome to Coaching OS
              </h2>

              <p className= "mt-2 text-sm text-slate-500">
                Your coaching institute mangement dashboard starts here.
              </p>
            </div>

        </section>

      </main>
    </div>
  );
}
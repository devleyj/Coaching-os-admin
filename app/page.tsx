import Slidebar from "./components/Slidebar";
import{  Bell , Search } from "lucide-react";

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
          <div className= "rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className= "text-xl font-semibold text-slate-900">
              Welcome to Coaching OS
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              This is your dashboard where you can manage your courses, schedule, attendance, fees, and inquiries. use the navigation on the left to access different sections of the application.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
export default function Slidebar(){
  return(
    <aside className= "w-64 min-h-screen bg-white boder-r boder-slate-200 p-6">
      <h2 className = "text-2xl font-bold text-slate-900">
        Coaching OS
      </h2>

      <nav className= "mt-8">
        <p className= "text-sm font-medium text-slate-400 uppercase">
          Main Menu
        </p>

        <div className= "mt-4 space-y-2">
          <button className= "w-full roundedx1 px-4 py-3 text-left font-medium text-blue-600">
            Dashboard
          </button>

          <button className= "w-full rounded-x1 px-4 py-3 text-left text-slate-600 haver:bg-slate-50">
            Students
          </button>

          <button className= "w-full rounded-x1 px-4 py-3 text-left text-slate-600 haver:bg-slate-50">
            Teachers
          </button>

          <button className= "w-full rounded-x1 px-4 py-3 text-left text-slate-600 haver:bg-slate-50">
            Courses
          </button>

          <button className= "w-full rounded-x1 px-4 py-3 text-left text-slate-600 haver:bg-slate-50">
            Batches
          </button>

          <button className= "w-full rounded-x1 px-4 py-3 text-left text-slate-600 haver:bg-slate-50">
            Attendance
          </button>

          <button className= "w-full rounded-x1 px-4 py-3 text-left text-slate-600 haver:bg-slate-50">
            Fees
          </button>

          <button className= "w-full rounded-x1 px-4 py-3 text-left text-slate-600 haver:bg-slate-50">
            Inquiries
          </button>

        </div>

      </nav>

    </aside>
  )
}
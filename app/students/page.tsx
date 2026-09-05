import Slidebar from "../components/Slidebar";

const students = [
  {
    name: "Aarav Mehta",
    course: "JEE Preparation",
    id: "STU-1001",
    batch: "JEE Advanced",
    phone: "98XXXXXX21",
    fees: "₹45,000",
    status: "Active",
  },
  {
    name: "Riya Sharma",
    course: "NEET Preparation",
    id: "STU-1002",
    batch: "NEET 2027",
    phone: "97XXXXXX45",
    fees: "₹52,000",
    status: "Active",
  },
  {
    name: "Kabir Patel",
    course: "JEE Preparation",
    id: "STU-1003",
    batch: "JEE Main",
    phone: "96XXXXXX78",
    fees: "₹38,000",
    status: "Active",
  },
  {
    name: "Ananya Singh",
    course: "NEET Preparation",
    id: "STU-1004",
    batch: "NEET 2027",
    phone: "95XXXXXX12",
    fees: "₹10,000",
    status: "Pending",
  },
];

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Students
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage students across your coaching institute.
            </p>
          </div>

          <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            + Add Student
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Students
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              1,248
            </p>

            <p className="mt-1 text-xs font-medium text-green-600">
              +12.5% this month
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active Students
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              1,184
            </p>

            <p className="mt-1 text-xs font-medium text-green-600">
              94.9% of total students
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              New This Month
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              64
            </p>

            <p className="mt-1 text-xs font-medium text-blue-600">
              New registrations
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Search & Filters
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Find students quickly using search and filters.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Search students
              </label>

              <input
                type="text"
                placeholder="Name, ID or phone..."
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Batch
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>All Batches</option>
                <option>JEE Advanced</option>
                <option>JEE Main</option>
                <option>NEET 2027</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Course
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>All Courses</option>
                <option>JEE Preparation</option>
                <option>NEET Preparation</option>
                <option>Foundation</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Status
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                All Students
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your registered students.
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              1,248 Students
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student ID
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Course
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Batch
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Phone
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Fees
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {student.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {student.course}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.id}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.course}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.batch}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.phone}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {student.fees}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
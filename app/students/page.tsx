import Slidebar from "../components/Slidebar";

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Slidebar />

      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-red-600">
          STUDENTS PAGE
        </h1>

        <p className="mt-4 text-lg text-slate-700">
          This is a layout test.
        </p>
      </div>
    </div>
  );
}
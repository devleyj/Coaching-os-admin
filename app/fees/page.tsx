"use client";

import Slidebar from "../components/Slidebar";
import { useState } from "react";

export default function FeesPage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{
    id: string;
    studentId: string;
    studentName: string;
    amount: number;
    method: string;
    date: string;
    physicalReceiptNo: string;
  } | null>(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [physicalReceiptNo, setPhysicalReceiptNo] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentDate, setPaymentDate] = useState("");

  const [feeRecords, setFeeRecords] = useState([
    {
      name: "Aarav Sharma",
      id: "STU-1001",
      course: "JEE Advanced",
      total: 45000,
      paid: 30000,
    },
    {
      name: "Riya Patel",
      id: "STU-1002",
      course: "NEET",
      total: 52000,
      paid: 40000,
    },
    {
      name: "Ananya Singh",
      id: "STU-1004",
      course: "Foundation",
      total: 10000,
      paid: 5000,
    },
  ]);

  const filteredStudents = feeRecords.filter((student) => {
    const search = studentSearch.toLowerCase();

    return (
      student.name.toLowerCase().includes(search) ||
      student.id.toLowerCase().includes(search)
    );
  });

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: "PAY-1001",
      studentId: "STU-1001",
      studentName: "Aarav Sharma",
      amount: 10000,
      method: "UPI",
      date: "2026-09-01",
      physicalReceiptNo: "RCPT-1001",
    },
  ]);

  const totalFees = feeRecords.reduce((sum, record) => sum + record.total, 0);

  const collectedFees = feeRecords.reduce(
    (sum, record) => sum + record.paid,
    0,
  );

  const pendingFees = totalFees - collectedFees;

  const collectionRate =
    totalFees > 0 ? Math.round((collectedFees / totalFees) * 100) : 0;

  const handleRecordPayment = () => {
    if (
      !selectedStudent ||
      !paymentAmount ||
      !paymentDate ||
      !physicalReceiptNo
    ) {
      alert(
        "Please select a student, enter payment amount, physical receipt number, and payment date.",
      );
      return;
    }

    const amount = Number(paymentAmount);

    if (amount <= 0 || Number.isNaN(amount)) {
      alert("Payment amount must be greater than 0.");
      return;
    }

    const student = feeRecords.find((record) => record.id === selectedStudent);

    if (student && amount > student.total - student.paid) {
      alert(
        `Payment amount cannot be greater than the pending fee of ₹${(
          student.total - student.paid
        ).toLocaleString("en-IN")}.`,
      );
      return;
    }

    setFeeRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === selectedStudent
          ? {
              ...record,
              paid: Math.min(record.paid + amount, record.total),
            }
          : record,
      ),
    );

    

    if (student) {
      setPaymentHistory((currentHistory) => [
        {
          id: `PAY-${Date.now()}`,
          studentId: student.id,
          studentName: student.name,
          amount,
          method: paymentMethod,
          date: paymentDate,
          physicalReceiptNo,
        },
        ...currentHistory,
      ]);
    }

    setShowPaymentForm(false);
    setSelectedStudent("");
    setPaymentAmount("");
    setPaymentMethod("Cash");
    setPaymentDate("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="print:hidden">
        <Slidebar />
      </div>

      <main className="ml-64 min-h-screen p-8 print:hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Fee Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage student fees, payments, and pending balances.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPaymentForm(true)}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              + Record Payment
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Total Fees</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                ₹{totalFees.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Collected</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                ₹{collectedFees.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Pending</p>
              <p className="mt-2 text-2xl font-bold text-orange-600">
                ₹{pendingFees.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Collection Rate
              </p>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {collectionRate}%
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-bold text-slate-900">Fee Records</h2>

              <p className="mt-1 text-sm text-slate-500">
                Recent student fee records.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Course
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Total
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Paid
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Pending
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {feeRecords.map((record) => {
                    const pending = record.total - record.paid;
                    const progress = Math.round(
                      (record.paid / record.total) * 100,
                    );

                    return (
                      <tr
                        key={record.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {record.name}
                          </p>
                          <p className="text-xs text-slate-500">{record.id}</p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {record.course}
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                          ₹{record.total.toLocaleString("en-IN")}
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-green-600">
                            ₹{record.paid.toLocaleString("en-IN")}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {progress}% paid
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-orange-600">
                          ₹{pending.toLocaleString("en-IN")}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              pending === 0
                                ? "bg-green-50 text-green-600"
                                : "bg-orange-50 text-orange-600"
                            }`}
                          >
                            {pending === 0 ? "Paid" : "Partial"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Payment History
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recent payments recorded in the system.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-left">
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Payment ID
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Physical Receipt No.
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Student
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Method
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                          {payment.id}
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                          {payment.physicalReceiptNo}
                        </td>

                        <td className="px-4 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {payment.studentName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {payment.studentId}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-green-600">
                          ₹{payment.amount.toLocaleString("en-IN")}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {payment.method}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {payment.date}
                        </td>

                        <td className="px-4 py-4">
                          <button
                            type="button"
                            onClick={() => setSelectedPayment(payment)}
                            className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                          >
                            Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {showPaymentForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Record Payment
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Add a new student fee payment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Student
                  </label>

                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by student name or ID..."
                    className="mb-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />

                  <div className="mb-2 rounded-xl border border-slate-200 bg-white">
                    {studentSearch &&
                      filteredStudents.map((student) => (
                        <button
                          key={student.id}
                          type="button"
                          onClick={() => {
                            setSelectedStudent(student.id);
                            setStudentSearch("");
                          }}
                          className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                        >
                          <p className="text-sm font-semibold text-slate-900">
                            {student.name}
                          </p>
                          <p className="text-xs text-slate-500">{student.id}</p>
                        </button>
                      ))}
                  </div>

                  {selectedStudent && (
                    <div className="mb-4 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                      <div>
                        <p className="text-xs font-medium text-blue-600">
                          Selected Student
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {
                            feeRecords.find(
                              (student) => student.id === selectedStudent,
                            )?.name
                          }
                        </p>

                        <p className="text-xs text-slate-500">
                          {selectedStudent}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedStudent("")}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Payment Amount
                  </label>

                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Physical Receipt No.
                  </label>

                  <input
                    type="text"
                    value={physicalReceiptNo}
                    onChange={(e) => setPhysicalReceiptNo(e.target.value)}
                    placeholder="e.g. RCPT-2026-0042"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Payment Method
                  </label>

                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Card</option>
                    <option>Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Payment Date
                  </label>

                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPaymentForm(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleRecordPayment}
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Record Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 print:static print:block print:bg-white print:p-0">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl print:max-w-none print:rounded-none print:p-10 print:shadow-none">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  SAGAR CLASSES EduManage Coaching Institute
                </p>

                <h2 className="text-xl font-bold text-slate-900">
                  Payment Receipt
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedPayment.id}
                </p>

                <span className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  Payment Successful
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Print Receipt
            </button>

            <div className="space-y-4 rounded-xl bg-slate-50 p-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Student</span>
                <span className="text-sm font-semibold text-slate-900">
                  {selectedPayment.studentName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Student ID</span>
                <span className="text-sm font-semibold text-slate-900">
                  {selectedPayment.studentId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                  Physical Receipt No.
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {selectedPayment.physicalReceiptNo}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Amount</span>
                <span className="text-lg font-bold text-green-600">
                  ₹{selectedPayment.amount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Payment Method</span>
                <span className="text-sm font-semibold text-slate-900">
                  {selectedPayment.method}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Payment Date</span>
                <span className="text-sm font-semibold text-slate-900">
                  {selectedPayment.date}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Amount Received
                  </span>

                  <span className="text-lg font-bold text-green-600">
                    ₹{selectedPayment.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5 text-center">
            <p className="text-xs font-semibold text-slate-600">
              Thank you for your payment
            </p>

            <p className="mt-1 text-xs text-slate-400">
              This is a computer-generated receipt.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

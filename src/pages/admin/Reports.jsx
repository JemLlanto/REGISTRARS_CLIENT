import React, { useState } from "react";

const Reports = () => {
  const [search, setSearch] = useState("");

  // Sample registrar reports data
  const reports = [
    { id: 1, student: "Juan Dela Cruz", document: "Transcript of Records", date: "2025-03-08", status: "Approved" },
    { id: 2, student: "Maria Santos", document: "Good Moral Certificate", date: "2025-03-07", status: "Pending" },
    { id: 3, student: "Carlos Reyes", document: "Diploma", date: "2025-03-06", status: "Rejected" },
  ];

  // Filter reports based on search input
  const filteredReports = reports.filter(
    (report) =>
      report.student.toLowerCase().includes(search.toLowerCase()) ||
      report.document.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">📜 Registrar's Reports</h1>
      <p className="text-gray-600 mb-4">List of requested documents and their statuses.</p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search student or document..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Document Type</th>
              <th className="p-3 text-left">Request Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{report.student}</td>
                  <td className="p-3">{report.document}</td>
                  <td className="p-3">{report.date}</td>
                  <td
                    className={`p-3 font-semibold ${report.status === "Approved"
                        ? "text-green-600"
                        : report.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                  >
                    {report.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

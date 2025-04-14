import React from "react";
import * as XLSX from "xlsx";

const RequestedDocumentsDownload = ({
  filteredRequests,
  startDate,
  endDate,
}) => {
  const downloadExcel = () => {
    // Extract only the needed fields
    const dataToExport = filteredRequests.map((request) => ({
      RequestID: request.requestID || "",
      DataPrivacyConsent: request.agree || "",
      FirstName: request.firstName || "",
      MiddleName: request.middleName || "",
      LastName: request.lastName || "",
      BirthDate: request.dateOfBirth || "",
      Sex: request.sex || "",
      MobileNumber: request.mobileNum || "",
      Email: request.email || "",
      StudentID: request.studentID || "",
      RequestDate: request.created || "",
      Classification: request.classification || "",
      SchoolYearAttended: request.schoolYearAttended || "",
      YearLevel: request.yearLevel || "",
      YearGraduated: request.yearGraduated || "",
      Program: request.program || "",
      Purpose: request.purpose || "",
      Status: request.status || "",
      CancellationReason: request.reason || "",
    }));


    // Create a worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Set column widths
    worksheet["!cols"] = [
      { wch: 15 }, // RequestID
      { wch: 20 }, // DataPrivacyConsent
      { wch: 15 }, // FirstName
      { wch: 15 }, // MiddleName
      { wch: 15 }, // LastName
      { wch: 15 }, // BirthDate
      { wch: 10 }, // Sex
      { wch: 15 }, // MobileNumber
      { wch: 25 }, // Email
      { wch: 15 }, // StudentID
      { wch: 20 }, // RequestDate
      { wch: 15 }, // Classification
      { wch: 20 }, // SchoolYearAttended
      { wch: 10 }, // YearLevel
      { wch: 15 }, // YearGraduated
      { wch: 25 }, // Program
      { wch: 30 }, // Purpose
      { wch: 15 }, // Status
      { wch: 30 }, // CancellationReason
    ];

    worksheet["!rows"] = new Array(dataToExport.length + 1).fill({ hpx: 25 });
    // Create a workbook with the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");

    // Generate Excel file and trigger download
    XLSX.writeFile(
      workbook,
      `Requester_Documents_${startDate}_${endDate}.xlsx`
    );
  };
  return (
    <button className="btn btn-warning border-0">
      <p className="m-0" onClick={downloadExcel}>
        <p className="d-none d-sm-block m-0">Download</p>
        <i class='bx bx-download  d-block d-sm-none m-0' ></i>
      </p>
    </button>
  );
};

export default RequestedDocumentsDownload;

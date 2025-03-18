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
    <button className="btn btn-warning">
      <p className="m-0" onClick={downloadExcel}>
        Download
      </p>
    </button>
  );
};

export default RequestedDocumentsDownload;

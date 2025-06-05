import axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const RequestedDocumentsDownload = ({
  filteredRequests,
  startDate,
  endDate,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const getDocTypes = async (requestID) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/dashboard/fetchDocumentTypes`,
        {
          params: {
            requestID: requestID,
          },
        }
      );
      if (res.status === 200) {
        const docTypes = res.data.data;
        // // console.log(
        //   "Document Types",
        //   docTypes.map((doc) => doc.documentType).join(", ")
        // );

        return docTypes.map((doc) => doc.documentType).join(", ");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const downloadExcel = async () => {
    try {
      setIsDownloading(true);
      // First, fetch all document types for each request
      const requestsWithDocs = await Promise.all(
        filteredRequests.map(async (request) => {
          const documentTypes = await getDocTypes(request.requestID);
          return {
            ...request,
            documentTypes,
          };
        })
      );

      // Extract only the needed fields
      const dataToExport = requestsWithDocs.map((request) => ({
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
        DocumentTypes: request.documentTypes || "",
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
        { wch: 60 }, // Doctypes
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
        `Requested_Documents_${startDate}_${endDate}.xlsx`
      );
    } catch (err) {
      console.error("Error downloading Excel file:", err);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <button
      className="btn btn-warning border-0 d-flex justify-content-center align-items-center gap-1"
      onClick={downloadExcel}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <>
          <i className="bx bxs-analyse bx-spin"></i>
          <p className="d-none d-sm-block m-0">Preparing...</p>
        </>
      ) : (
        <>
          <p className="d-none d-sm-block m-0">Download</p>
          <i className="bx bx-download  d-block d-sm-none m-0"></i>
        </>
      )}
    </button>
  );
};

export default RequestedDocumentsDownload;

import React, { useState } from "react";
import jsPDF from "jspdf";
import cvsuLogo from "../../../public/cvsu-logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import InternalFeedbackTemplate from "../requestDetails/InternalFeedback/InternalFeedbackTemplate";
import ExternalFeedbackTemplate from "../requestDetails/ExternalFeedback/ExternalFeedbackTemplate";

const ScheduleSlipDownload = ({
  user,
  documentDetails,
  fetchDocumentDetails,
}) => {
  const [scheduleSlipDetails, setScheduleSlipDetails] = useState([]);
  const [scheduleSlipDocTypes, setScheduleSlipDocTypes] = useState([]);
  const [scheduleSlipRequirements, setScheduleSlipRequirements] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetails = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/scheduleSlip/fetchScheduleSlipDetails/${documentDetails.requestID}`
    );
    if (res.status === 200) {
      // console.log(res.data.result);
      // setScheduleSlipDetails(res.data.result);
      return res.data.result;
    }
    throw new Error("Error fetching schedule slip details");
  };
  const fetchDocTypes = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/scheduleSlip/fetchScheduleSlipDocTypes/${documentDetails.requestID}`
    );
    if (res.status === 200) {
      // console.log(res.data.result);
      // setScheduleSlipDocTypes(res.data.result);
      return res.data.result;
    }
    throw new Error("Error fetching schedule slip document types");
  };
  const fetchRequirements = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/scheduleSlip/fetchScheduleSlipRequirements/${
        documentDetails.requestID
      }`
    );
    if (res.status === 200) {
      // console.log(res.data.result);
      // setScheduleSlipRequirements(res.data.result);
      return res.data.result;
    }
    throw new Error("Error fetching schedule slip requirements");
  };

  // Format date to "June 4, 2025" format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return String(dateString); // fallback to original string if parsing fails
    }
  };
  const handleDownloadScheduleSlip = () => {
    // console.log("USER ADMIN: ", user.isAdmin);

    if (documentDetails.responded || user.isAdmin) {
      fetchScheduleSlipData();
    } else {
      if (documentDetails.feedbackType === "" || user.isAdmin) {
        fetchScheduleSlipData();
      } else {
        Swal.fire({
          icon: "info",
          title: "Feedback Required",
          text: `Kindly complete our feedback form to download the schedule slip.`,
          confirmButtonText: "OK",
        }).then(() => {
          setShowFeedbackModal(true);
        });
      }
    }
  };

  const fetchScheduleSlipData = async () => {
    try {
      setIsLoading(true);
      // console.log("Fetching data...");

      const [details, docTypes, requirements] = await Promise.all([
        fetchDetails(),
        fetchDocTypes(),
        fetchRequirements(),
      ]);

      setScheduleSlipDetails(details);
      setScheduleSlipDocTypes(docTypes);
      setScheduleSlipRequirements(requirements);

      generatePDF(details, docTypes, requirements);

      // console.log("Data fetched successfully");
    } catch (err) {
      console.error("Error generating pdf:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = (details, docTypes, requirements) => {
    try {
      if (!details || !docTypes || !requirements) {
        throw new Error("Missing required data for PDF generation.");
      }

      const doc = new jsPDF();
      const left = 15,
        top = 15,
        width = 180,
        pageWidth = 210;
      let y = top;

      // Header - Remove logo temporarily to fix the error
      doc.addImage(cvsuLogo, "PNG", left + 26, y, 20, 20);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Republic of the Philippines", pageWidth / 2, y + 5, {
        align: "center",
      });
      doc.setFontSize(12);
      doc.text("CAVITE STATE UNIVERSITY - CCAT", pageWidth / 2, y + 12, {
        align: "center",
      });
      doc.setFontSize(8);
      doc.text(
        "(Formerly Cavite College of Arts and Trades)",
        pageWidth / 2,
        y + 17,
        { align: "center" }
      );
      doc.text("Rosario, Cavite", pageWidth / 2, y + 21, { align: "center" });
      doc.setFontSize(10);
      doc.text("OFFICE OF THE CAMPUS REGISTRAR", pageWidth / 2, y + 27, {
        align: "center",
      });
      doc.setFontSize(11);
      doc.text("SCHEDULE SLIP", pageWidth / 2, y + 33, { align: "center" });

      y += 40;

      // NEW: Header table with student information
      const headerTableHeight = 10;
      doc.setLineWidth(0.3);
      doc.rect(left, y, width, headerTableHeight);

      // Draw vertical lines for header table
      doc.line(left + 70, y, left + 70, y + headerTableHeight); // after Control No
      doc.line(left + 120, y, left + 120, y + headerTableHeight); // after Student No

      // Draw horizontal line in middle of header table
      doc.line(left, y + 10, left + width, y + 10);

      // Header table labels and values
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("Control No:", left + 1, y + -2);
      doc.text("Student No:", left + 122, y + -2);
      doc.text("Name:", left + 1, y + 4);
      doc.text("Course & Major:", left + 72, y + 4);
      doc.text("Date requested:", left + 122, y + 4);

      doc.setFont("helvetica", "normal");
      doc.text(String(details.controlNum), left + 20, y + -2);
      doc.text(details.studentNum, left + 142, y + -2);
      doc.text(details.name, left + 5, y + 8);
      doc.text(details.program, left + 75, y + 8);
      doc.text(formatDate(details.dateRequested), left + 130, y + 8);

      y += headerTableHeight + -4;

      // Draw main table box
      const tableTop = y + 4;
      const tableHeight = 40 + docTypes.length * 4;
      doc.setLineWidth(0.2);
      doc.rect(left, tableTop, width, tableHeight);
      // Draw vertical lines for columns
      doc.line(left + 70, tableTop, left + 70, tableTop + tableHeight); // after doc types
      doc.line(left + 120, tableTop, left + 120, tableTop + tableHeight); // after pages
      // Draw horizontal lines for header and after doc rows
      doc.line(left, tableTop + 6, left + width, tableTop + 6); // header
      // Table headers
      doc.setFont("helvetica", "bold");
      doc.text("Types of documents requested:", left + 1, tableTop + 4);
      doc.text("Number of page/pages:", left + 72, tableTop + 4);
      doc.text("Amount to be paid:", left + 122, tableTop + 4);
      doc.setFont("helvetica", "normal");

      // Table rows
      let rowY = tableTop + 10;
      let total = 0;

      if (docTypes.length > 0) {
        docTypes.forEach((docType, idx) => {
          total += docType.price * docType.page || 0;

          doc.text(docType.documentName || "", left + 3, rowY);
          doc.text(String(docType.page), left + 110, rowY, { align: "right" });
          doc.text((docType.price || 0).toFixed(2), left + 175, rowY, {
            align: "right",
          });
          rowY += 4;
        });
      } else {
        doc.text("No documents requested", left + 3, rowY);
      }

      // Draw horizontal line before total
      // Total row (highlighted)
      doc.setFillColor(180, 238, 180);
      doc.rect(left + 120, rowY + 2, 60, 6, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Total amount:", left + 122, rowY + 6);
      doc.text(total.toFixed(2), left + 175, rowY + 6, { align: "right" });
      doc.setFont("helvetica", "normal");
      // to be paid at cashier
      doc.text("to be paid at the Cashier's Office", left + 125, rowY + 12);

      // Purpose, Date & Time, Processed by row (bottom box)
      let boxY = rowY + 18;
      doc.setLineWidth(0.2);
      doc.rect(left, boxY, width, 12);
      doc.setFont("helvetica", "bold");
      doc.text("Purpose:", left + 1, boxY + 4);
      doc.text("Date & Time of release:", left + 72, boxY + 4);
      doc.text("Processed by", left + 122, boxY + 4);
      doc.setFont("helvetica", "normal");
      doc.text(details.purpose, left + 1, boxY + 9);

      doc.text(formatDate(details.releaseDate), left + 75, boxY + 8);
      doc.text(`${details.releaseTime} only`, left + 75, boxY + 11);
      doc.text(details.processedBy, left + 125, boxY + 9);
      // Simulated signature
      doc.setFontSize(10);
      doc.setFontSize(8);

      // Green requirements box
      let reqY = boxY + 16;
      const reqBoxHeight = 8 + requirements.length * 3 + 4; // Calculate height based on number of requirements
      doc.setFillColor(180, 250, 180);
      doc.rect(left, reqY, width, reqBoxHeight, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Please bring the following Requirements:", left + 1, reqY + 4);
      doc.setFont("helvetica", "normal");
      requirements.forEach((req, i) => {
        doc.text(` ${req.description}`, left + 2, reqY + 8 + (i + 1) * 3);
      });
      reqY += reqBoxHeight + 2;

      // Notes
      doc.setFont("helvetica", "bold");
      doc.text("Note:", left, reqY + 4);
      doc.setFont("helvetica", "normal");
      const notes = [
        "As a proof of request the clients must have a copy of schedule slip either in printed copy or in an electronic copy (screenshot copy).",
        "Strictly follow the scheduled date & and time to avoid inconvenience. We will not entertain those who are not on their schedule.",
        "In the event that the client cannot claim personally, he/she must provide an AUTHORIZATION LETTER and a photocopy of I.D. to his/her authorized person, in pursuant to the Republic Act 10173 - Data Privacy Act of 2012 in addition on the above requirements.",
        "Please claim your request at the CVSU-CCAT Registrar's Office.",
        "If the scheduled date does not fit into your schedule due to valid reasons, kindly email us your preferred schedule.",
      ];

      let currentY = reqY + 10;
      notes.forEach((note, i) => {
        const lines = doc.splitTextToSize(`${i + 1}. ${note}`, width - 2);
        lines.forEach((line, lineIndex) => {
          doc.text(line, left + 1, currentY + lineIndex * 3);
        });
        currentY += lines.length * 3 + 1;
      });

      doc.save(`${details.name || "Schedule_Slip"}_Schedule_Slip.pdf`);
      // handleClose();
    } catch (error) {
      alert("PDF Generation Failed: " + error.message);
    }
  };
  return (
    <>
      <button
        className="btn btn-warning position-relative"
        onClick={handleDownloadScheduleSlip}
        disabled={isLoading || documentDetails.status != "ready to pickup"}
      >
        <p className={`m-0 ${isLoading ? "opacity-0" : ""}`}>
          Download Schedule Slip
        </p>
        {isLoading ? (
          <>
            <h5
              className="m-0 position-absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="d-flex align-items-center">
                <i className="bx bxs-analyse bx-spin"></i>
              </span>
            </h5>
          </>
        ) : null}
      </button>
      {documentDetails.feedbackType === "internal" ? (
        <InternalFeedbackTemplate
          fetchScheduleSlipData={fetchScheduleSlipData}
          fetchDocumentDetails={fetchDocumentDetails}
          documentDetails={documentDetails}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
        />
      ) : (
        <ExternalFeedbackTemplate
          fetchScheduleSlipData={fetchScheduleSlipData}
          fetchDocumentDetails={fetchDocumentDetails}
          documentDetails={documentDetails}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
        />
      )}
    </>
  );
};

export default ScheduleSlipDownload;

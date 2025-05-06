import axios from "axios";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import cvsuLogo from "/cvsu-logo.png";
import Swal from "sweetalert2";

const InternalFeedbackDownload = ({ user, documentDetails }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  const fetchData = async () => {
    if (documentDetails.requestID) {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/feedbackForm/fetchFeedbackInternalData?requestID=${
            documentDetails.requestID
          }`
        );

        if (res.status === 200) {
          // console.log(res.data.result);
          setFeedbackData(res.data.result);
          downloadPDF(res.data.result, documentDetails);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Oops!",
            text: res.data.message,
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `An error occurred: ${err.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  // useEffect(() => {
  //   setChecked(true);
  //   if (documentDetails.requestID && !checked) {
  //     fetchData();
  //   }
  // }, [documentDetails.requestID]);

  const name = `${feedbackData.firstName} ${feedbackData.middleName} ${feedbackData.lastName}`;
  const attendingStaff = `${user.firstName} ${user.middleName} ${user.lastName}`;
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  // PDF generation function
  const downloadPDF = (feedbackData, documentDetails) => {
    try {
      const doc = new jsPDF();

      // Add logo
      doc.addImage(cvsuLogo, "PNG", 50, 12, 18, 15);

      // Set initial font size and style
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text("Republic of the Philippines", 105, 13, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("CAVITE STATE UNIVERSITY", 105, 17, { align: "center" });

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("CCAT Campus", 105, 20, { align: "center" });

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Rosario, Cavite", 105, 23, { align: "center" });

      // Form title
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("STAKEHOLDERS' FEEDBACK FORM", 105, 30, { align: "center" });

      // Introduction text
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Please let us know how we can improve our service by giving your honest feedback. We value our stakeholders,",
        25,
        37
      );
      doc.text(
        "hence, your comments and suggestions will be highly appreciated.",
        25,
        42
      );

      // User information
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Name:", 25, 50);
      doc.setFont("helvetica", "normal");
      doc.text(name || "(Not provided)", 55, 50);

      doc.setFont("helvetica", "bold");
      doc.text("Agency:", 25, 55);
      doc.setFont("helvetica", "normal");
      doc.text("Registrar's Office" || "(Not provided)", 55, 55);

      doc.setFont("helvetica", "bold");
      doc.text("Email Address:", 25, 60);
      doc.setFont("helvetica", "normal");
      doc.text(feedbackData.email || "(Not provided)", 55, 60);

      doc.setFont("helvetica", "bold");
      doc.text("Purpose of Visit:", 25, 65);
      doc.setFont("helvetica", "normal");
      doc.text(`${documentDetails.purpose}` || "(Not provided)", 55, 65);

      doc.setFont("helvetica", "bold");
      doc.text("Attending Staff:", 110, 50);
      doc.setFont("helvetica", "normal");
      doc.text(attendingStaff || "(Not provided)", 140, 50);

      doc.setFont("helvetica", "bold");
      doc.text("Date of Visit:", 110, 55);
      doc.setFont("helvetica", "normal");
      doc.text(formatDate(new Date()) || "(Not provided)", 140, 55);

      // Areas of Concern header
      doc.setFontSize(9);
      doc.line(25, 70, 185, 70); // Horizontal line

      doc.setFont("helvetica", "bold");
      doc.text("Areas of Concern", 35, 75);

      // Rating scale header
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text("Highly Satisfied", 90, 75);
      doc.text("Very Satisfied", 113, 75);
      doc.text("Moderately Satisfied", 132, 75);
      doc.text("Barely Satisfied", 158, 75);
      doc.text("Not Satisfied", 178, 75);

      // Rating numbers
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("5", 98, 80);
      doc.text("4", 118, 80);
      doc.text("3", 138, 80);
      doc.text("2", 163, 80);
      doc.text("1", 181, 80);
      // Areas items
      doc.setFontSize(8);
      const areas = [
        { id: "courtesy", label: "A. Courtesy", indent: 0 },
        { id: "service", label: "B. Service", indent: 0 },
        { id: "service_quality", label: "1. Quality", indent: 1 },
        { id: "service_timeliness", label: "2. Timeliness", indent: 1 },
        { id: "service_efficiency", label: "3. Efficiency", indent: 1 },
        {
          id: "physical",
          label: "C. Physical condition of office/work space",
          indent: 0,
        },
        { id: "physical_cleanliness", label: "1. Cleanliness", indent: 1 },
        { id: "physical_comfort", label: "2. Comfort", indent: 1 },
      ];

      // Draw areas and checkboxes
      let startY = 85;
      areas.forEach((area, index) => {
        // Area text with proper indentation
        const indent = area.indent * 10;
        doc.text(area.label, 25 + indent, startY + index * 6);

        // Draw checkboxes for ratings only for items that should have ratings
        if (area.id !== "service" && area.id !== "physical") {
          const xPositions = [100, 120, 140, 165, 183];
          // Convert string ratings to numerical values for comparison
          let ratingValue = feedbackData[area.id];

          xPositions.forEach((x, ratingIndex) => {
            const checkboxValue = 5 - ratingIndex;
            // Draw checkbox
            doc.rect(x - 3, startY + index * 6 - 3, 4, 4);

            // Fill checkbox if selected
            if (ratingValue === checkboxValue) {
              doc.setFillColor(0, 0, 0);
              doc.rect(x - 2, startY + index * 6 - 2, 2, 2, "F");
              doc.setFillColor(0, 0, 0);
            }
          });
        }
      });

      // Comments section
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Comments/Suggestions:", 25, 140);
      doc.setFont("helvetica", "normal");

      // Handle comments that might need to be wrapped
      if (feedbackData.comments) {
        const textLines = doc.splitTextToSize(feedbackData.comments, 150);
        doc.text(textLines, 25, 145);
      } else {
        doc.text("(No comments provided)", 25, 145);
      }

      // Draw lines for comments section
      doc.line(25, 155, 185, 155);
      // doc.line(25, 165, 185, 165);
      // doc.line(25, 175, 185, 175);

      // Save PDF
      doc.save(`${feedbackData.lastName}'s_Feedback_Form.pdf`);

      // Close modal after download
      //   handleClose();
    } catch (error) {
      console.error("Error generating PDF:", error);

      Swal.fire({
        icon: "error",
        title: "PDF Generation Failed",
        text: `There was an error generating the PDF. Please try again. ${error.message}`,
      });
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-warning d-none d-md-block"
        onClick={fetchData}
        disabled={
          !documentDetails.responded || !documentDetails.requestID || isLoading
        }
      >
        <p className="m-0">
          {" "}
          {documentDetails.responded
            ? "Feedback(Internal)"
            : documentDetails.feedbackType === ""
            ? `Feedback(None)`
            : `Feedback`}
        </p>
      </button>

      <button
        type="button"
        className="w-100 btn btn-warning d-block d-md-none"
        onClick={fetchData}
        disabled={
          !documentDetails.responded || !documentDetails.requestID || isLoading
        }
      >
        <p className="m-0">
          {" "}
          {documentDetails.responded
            ? "Feedback (int.)"
            : documentDetails.feedbackType === ""
            ? `Feedback(None)`
            : `Feedback`}
        </p>
      </button>
    </>
  );
};

export default InternalFeedbackDownload;

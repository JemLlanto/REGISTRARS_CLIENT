import React, { useState } from "react";
import { Modal, Button, Form, Table, ProgressBar } from 'react-bootstrap';
import jsPDF from "jspdf";
import cvsuLogo from "/cvsu-logo.png";
import PersonalInfoStep from '/PersonalInfoStep';
import RatingStep from '/RatingStep';
import CommentsStep from '/CommentsStep';


const Feedbacks = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    agency: '',
    emailAddress: '',
    attendingStaff: '',
    dateVisit: '',
    purposeOfVisit: '',
    ratings: {
      courtesy: '',
      service_quality: '',
      service_timeliness: '',
      service_efficiency: '',
      physical_cleanliness: '',
      physical_comfort: ''
    },
    comments: ''
  });

  // Modal control functions
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('rating-')) {
      const ratingKey = name.replace('rating-', '');
      setFormData({
        ...formData,
        ratings: {
          ...formData.ratings,
          [ratingKey]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setCurrentStep(1);
  };

  // Render steps based on current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
      case 2:
        // return <RatingStep formData={formData} handleChange={handleChange} />;
        return <div>Rating Step (Create this component)</div>;
      case 3:
        // return <CommentsStep formData={formData} handleChange={handleChange} />;
        return <div>Comments Step (Create this component)</div>;
      default:
        return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
    }
  };

  // PDF generation function
  const downloadPDF = () => {
    try {
      const doc = new jsPDF();

      doc.addImage(cvsuLogo, "PNG", 53, 12, 18, 15);

      // Set initial font size and style
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");

      // Header with logo placeholder
      doc.text("CAVITE STATE UNIVERSITY", 105, 17, { align: "center" });
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text("Republic of the Philippines", 105, 13, { align: "center" });

      // Form title
      doc.setFontSize(11);
      doc.text("STAKEHOLDERS' FEEDBACK FORM", 105, 30, { align: "center" });

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("CCAT Campus", 105, 20, { align: "center" });
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Rosario, Cavite", 105, 23, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Please let us know how we can improve our service by giving your honest feedback. We value our stakeholders,", 25, 34);
      doc.text("hance, your comments and suggestions will be highly appreciated.", 25, 38);

      // User information
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Name:", 25, 42);
      doc.setFont("helvetica", "normal");
      doc.text(formData.name || "(Not provided)", 55, 42);

      doc.setFont("helvetica", "bold");
      doc.text("Agency:", 25, 46);
      doc.setFont("helvetica", "normal");
      doc.text(formData.agency || "(Not provided)", 55, 46);

      doc.setFont("helvetica", "bold");
      doc.text("Email Address:", 25, 50);
      doc.setFont("helvetica", "normal");
      doc.text(formData.emailAddress || "(Not provided)", 55, 50);

      doc.setFont("helvetica", "bold");
      doc.text("Purpose of Visit:", 25, 54);
      doc.setFont("helvetica", "normal");
      doc.text(formData.purposeOfVisit || "(Not provided)", 55, 54);

      doc.setFont("helvetica", "bold");
      doc.text("Attending Staff:", 110, 42);
      doc.setFont("helvetica", "normal");
      doc.text(formData.attendingStaff || "(Not provided)", 140, 42);

      doc.setFont("helvetica", "bold");
      doc.text("Date of Visit:", 110, 46);
      doc.setFont("helvetica", "normal");
      doc.text(formData.dateVisit || "(Not provided)", 140, 46);

      // Areas of Concern header
      doc.setFontSize(9);
      doc.line(25, 58, 200, 58); // Draws a horizontal line from (25,30) to (180,30)

      doc.setFont("helvetica", "bold");
      doc.text("Areas of Concern", 35, 62);

      // Ratings columns
      doc.text("5", 100, 65);
      doc.text("4", 120, 65);
      doc.text("3", 140, 65);
      doc.text("2", 165, 65);
      doc.text("1", 183, 65);

      // Rating legend
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text("Highly Satisfied", 90, 62);
      doc.text("Very Satisfied", 113, 62);
      doc.text("Moderately satisfied", 132, 62);
      doc.text("Barely Satisfied", 158, 62);
      doc.text("Not Satisfied", 178, 62);

      // Areas items based on new structure
      doc.setFontSize(8);
      const areas = [
        { id: "courtesy", label: "A. Courtesy", indent: 0 },
        { id: "service", label: "B. Service", indent: 0 },
        { id: "service_quality", label: "1. Quality", indent: 1 },
        { id: "service_timeliness", label: "2. Timeliness", indent: 1 },
        { id: "service_efficiency", label: "3. Efficiency", indent: 1 },
        { id: "physical", label: "C. Physical condition of office/work space", indent: 0 },
        { id: "physical_cleanliness", label: "1. Cleanliness", indent: 1 },
        { id: "physical_comfort", label: "2. Comfort", indent: 1 }
      ];

      // Draw areas and checkboxes
      let startY = 70;
      areas.forEach((area, index) => {
        // Area text with proper indentation
        const indent = area.indent * 10;
        doc.text(area.label, 25 + indent, startY + (index * 6));

        // Draw checkboxes for ratings only for items that should have ratings
        if (area.id !== "service" && area.id !== "physical") {
          const ratings = ["Highly Satisfied", "Very Satisfied", "Satisfied", "Barely Satisfied", "Not Satisfied"];
          const xPositions = [102, 122, 142, 167, 185];

          ratings.forEach((rating, ratingIndex) => {
            const x = xPositions[ratingIndex];
            doc.rect(x - 3, startY + (index * 6) - 3, 4, 4);

            // Fill checkbox if selected
            if (formData.ratings[area.id] === rating) {
              doc.setFillColor(0, 0, 0);
              doc.rect(x - 2, startY + (index * 6) - 2, 2, 2, 'F');
              doc.setFillColor(0, 0, 0);
            }
          });
        }
      });

      // Comments section
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Comments/Suggestions:", 25, 125);
      doc.setFont("helvetica", "normal");

      // Handle comments that might need to be wrapped
      if (formData.comments) {
        const textLines = doc.splitTextToSize(formData.comments, 170);
        doc.text(textLines, 25, 130);
      } else {
        doc.text("(No comments provided)", 25, 130);
      }

      // Draw lines for comments section
      doc.line(25, 135, 200, 135);

      // Save PDF
      doc.save("Stakeholders_Feedback_Form.pdf");

      // Close modal after download
      handleClose();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please check console for details.");
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        Open Feedback Form
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title text-center w-100">
                  <small>Republic of the Philippines</small>
                  <h4 className="fw-bold mb-0">CAVITE STATE UNIVERSITY</h4>
                </div>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>

              <div className="modal-body">
                <div className="text-center mb-4">
                  <h5 className="fw-semibold">STAKEHOLDERS' FEEDBACK FORM</h5>
                  <p className="small">
                    Please complete this form to help us improve our services. Thank you.
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                      aria-valuenow={(currentStep / 3) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <span className={`small ${currentStep === 1 ? 'fw-bold' : ''}`}>Step 1: Personal Information</span>
                    <span className={`small ${currentStep === 2 ? 'fw-bold' : ''}`}>Step 2: Service Ratings</span>
                    <span className={`small ${currentStep === 3 ? 'fw-bold' : ''}`}>Step 3: Comments</span>
                  </div>
                </div>

                <form>
                  {renderStep()}
                </form>
              </div>

              <div className="modal-footer">
                {currentStep > 1 && (
                  <button type="button" className="btn btn-secondary" onClick={prevStep}>
                    Previous
                  </button>
                )}

                {currentStep < 3 ? (
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    Next
                  </button>
                ) : (
                  <button type="button" className="btn btn-success" onClick={downloadPDF}>
                    Submit & Download PDF
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedbacks;
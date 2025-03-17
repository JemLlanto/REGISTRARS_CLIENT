import React, { useState } from "react";
import jsPDF from "jspdf";
import cvsuLogo from "/cvsu-logo.png";
import RatingStep from "./RatingStep";
import PersonalInfoStep from "./PersonalInfoStep";
import CommentsStep from "./CommentsStep";



const FeedbackInternal = () => {
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
        // Reset form data when closing modal
        setFormData({
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
    };

    // Render steps based on current step
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
            case 2:
                return <RatingStep formData={formData} handleChange={handleChange} />;
            case 3:
                return <CommentsStep formData={formData} handleChange={handleChange} />;
            default:
                return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
        }
    };

    // PDF generation function
    const downloadPDF = () => {
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
            doc.text("Please let us know how we can improve our service by giving your honest feedback. We value our stakeholders,", 25, 37);
            doc.text("hence, your comments and suggestions will be highly appreciated.", 25, 42);

            // User information
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.text("Name:", 25, 50);
            doc.setFont("helvetica", "normal");
            doc.text(formData.name || "(Not provided)", 55, 50);

            doc.setFont("helvetica", "bold");
            doc.text("Agency:", 25, 55);
            doc.setFont("helvetica", "normal");
            doc.text(formData.agency || "(Not provided)", 55, 55);

            doc.setFont("helvetica", "bold");
            doc.text("Email Address:", 25, 60);
            doc.setFont("helvetica", "normal");
            doc.text(formData.emailAddress || "(Not provided)", 55, 60);

            doc.setFont("helvetica", "bold");
            doc.text("Purpose of Visit:", 25, 65);
            doc.setFont("helvetica", "normal");
            doc.text(formData.purposeOfVisit || "(Not provided)", 55, 65);

            doc.setFont("helvetica", "bold");
            doc.text("Attending Staff:", 110, 50);
            doc.setFont("helvetica", "normal");
            doc.text(formData.attendingStaff || "(Not provided)", 140, 50);

            doc.setFont("helvetica", "bold");
            doc.text("Date of Visit:", 110, 55);
            doc.setFont("helvetica", "normal");
            doc.text(formData.dateVisit || "(Not provided)", 140, 55);

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
            doc.text("5", 100, 80);
            doc.text("4", 120, 80);
            doc.text("3", 140, 80);
            doc.text("2", 165, 80);
            doc.text("1", 183, 80);

            // Areas items
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
            let startY = 85;
            areas.forEach((area, index) => {
                // Area text with proper indentation
                const indent = area.indent * 10;
                doc.text(area.label, 25 + indent, startY + (index * 6));

                // Draw checkboxes for ratings only for items that should have ratings
                if (area.id !== "service" && area.id !== "physical") {
                    const xPositions = [100, 120, 140, 165, 183];
                    // Convert string ratings to numerical values for comparison
                    let ratingValue = 0;
                    switch (formData.ratings[area.id]) {
                        case "Highly Satisfied": ratingValue = 5; break;
                        case "Very Satisfied": ratingValue = 4; break;
                        case "Moderately Satisfied": ratingValue = 3; break;
                        case "Barely Satisfied": ratingValue = 2; break;
                        case "Not Satisfied": ratingValue = 1; break;
                    }

                    xPositions.forEach((x, ratingIndex) => {
                        const checkboxValue = 5 - ratingIndex;
                        // Draw checkbox
                        doc.rect(x - 3, startY + (index * 6) - 3, 4, 4);

                        // Fill checkbox if selected
                        if (ratingValue === checkboxValue) {
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
            doc.text("Comments/Suggestions:", 25, 140);
            doc.setFont("helvetica", "normal");

            // Handle comments that might need to be wrapped
            if (formData.comments) {
                const textLines = doc.splitTextToSize(formData.comments, 150);
                doc.text(textLines, 25, 145);
            } else {
                doc.text("(No comments provided)", 25, 145);
            }

            // Draw lines for comments section
            doc.line(25, 155, 185, 155);
            // doc.line(25, 165, 185, 165);
            // doc.line(25, 175, 185, 175);

            // Save PDF
            doc.save("Stakeholders_Feedback_Form.pdf");

            // Close modal after download
            handleClose();
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("There was an error generating the PDF. Please try again.");
        }
    };

    return (
        <>
            <button className="btn text-white" style={{ backgroundColor: "var(--main-color)" }} onClick={handleShow}>
                Internal
            </button>

            {showModal && (
                <>
                    {/* Backdrop Overlay */}
                    <div className="modal-backdrop fade show"></div>

                    {/* Modal */}
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header" style={{ backgroundColor: "var(--main-color)" }}>
                                    <div className="modal-title text-center w-100">
                                        <h4 className="fw-bold mb-0 text-white">STAKEHOLDERS' FEEDBACK FORM</h4>
                                    </div>
                                    <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                                </div>

                                <div className="modal-body">
                                    <form>
                                        {renderStep()} {/* Ensure renderStep() is correctly defined */}
                                    </form>
                                </div>

                                <div className="modal-footer" style={{ backgroundColor: "var(--main-color)" }}>
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
                </>
            )}
        </>
    );
};

export default FeedbackInternal;
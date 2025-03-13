import React, { useState } from "react";
import jsPDF from "jspdf";
import cvsuLogo from "/cvsu-logo.png";

const StakeholdersFeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        agency: "",
        emailAddress: "",
        purposeOfVisit: "",
        dateVisit: "",
        attendingStaff: "",
        comments: "",
        ratings: {
            courtesy: "",
            service_quality: "",
            service_timeliness: "",
            service_efficiency: "",
            physical_cleanliness: "",
            physical_comfort: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("rating-")) {
            const ratingType = name.replace("rating-", "");
            setFormData({
                ...formData,
                ratings: {
                    ...formData.ratings,
                    [ratingType]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

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

            // Bottom section
            const bottomY = startY + (areas.length * 6) + 10;
            doc.setFontSize(9);

            // Comments section
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

            // Draw lines for comments section even if there are comments
            // doc.line(25, bottomY + 30, 170, bottomY + 30);
            doc.line(25, 135, 200, 135);

            // Save PDF
            doc.save("Stakeholders_Feedback_Form.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("There was an error generating the PDF. Please check console for details.");
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded">
            <div className="text-center mb-4">
                <h3 className="text-sm">Republic of the Philippines</h3>
                <h2 className="text-xl font-bold">CAVITE STATE UNIVERSITY</h2>
                <h3 className="text-lg font-semibold">STAKEHOLDERS' FEEDBACK FORM</h3>
                <p className="text-xs mt-1">
                    Please tick your rating concerning our services (with corresponding time, date, place, person/s).
                    Your honest feedback will help us improve. Thank you.
                </p>
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">Agency:</label>
                <input
                    type="text"
                    name="agency"
                    value={formData.agency}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">Email Address:</label>
                <input
                    type="text"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">Purpose of Visit:</label>
                <input
                    type="text"
                    name="purposeOfVisit"
                    value={formData.purposeOfVisit}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">Date of Visit:</label>
                <input
                    type="text"
                    name="dateVisit"
                    value={formData.dateVisit}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">Attending Staff:</label>
                <input
                    type="text"
                    name="attendingStaff"
                    value={formData.attendingStaff}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-5">
                <h3 className="text-md font-semibold mb-2">Areas of Concern</h3>
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="border p-1 text-left" width="35%"></th>
                            <th className="border p-1 text-center" colSpan="5">Rating</th>
                        </tr>
                        <tr>
                            <th className="border p-1 text-left"></th>
                            <th className="border p-1 text-center">Highly Satisfied</th>
                            <th className="border p-1 text-center">Very Satisfied</th>
                            <th className="border p-1 text-center">Satisfied</th>
                            <th className="border p-1 text-center">Barely Satisfied</th>
                            <th className="border p-1 text-center">Not Satisfied</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Main Category A */}
                        <tr>
                            <td className="border p-1 font-semibold">A. Courtesy</td>
                            {["Highly Satisfied", "Very Satisfied", "Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                                <td key={rating} className="border p-1 text-center">
                                    <input
                                        type="radio"
                                        name="rating-courtesy"
                                        value={rating}
                                        onChange={handleChange}
                                        checked={formData.ratings.courtesy === rating}
                                    />
                                </td>
                            ))}
                        </tr>

                        {/* Main Category B - Header */}
                        <tr>
                            <td className="border p-1 font-semibold">B. Service</td>
                            <td className="border p-1" colSpan="5"></td>
                        </tr>

                        {/* Service subcategories */}
                        <tr>
                            <td className="border p-1 pl-6">1. Quality</td>
                            {["Highly Satisfied", "Very Satisfied", "Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                                <td key={rating} className="border p-1 text-center">
                                    <input
                                        type="radio"
                                        name="rating-service_quality"
                                        value={rating}
                                        onChange={handleChange}
                                        checked={formData.ratings.service_quality === rating}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border p-1 pl-6">2. Timeliness</td>
                            {["Highly Satisfied", "Very Satisfied", "Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                                <td key={rating} className="border p-1 text-center">
                                    <input
                                        type="radio"
                                        name="rating-service_timeliness"
                                        value={rating}
                                        onChange={handleChange}
                                        checked={formData.ratings.service_timeliness === rating}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border p-1 pl-6">3. Efficiency</td>
                            {["Highly Satisfied", "Very Satisfied", "Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                                <td key={rating} className="border p-1 text-center">
                                    <input
                                        type="radio"
                                        name="rating-service_efficiency"
                                        value={rating}
                                        onChange={handleChange}
                                        checked={formData.ratings.service_efficiency === rating}
                                    />
                                </td>
                            ))}
                        </tr>

                        {/* Main Category C - Header */}
                        <tr>
                            <td className="border p-1 font-semibold">C. Physical condition of office/work space</td>
                            <td className="border p-1" colSpan="5"></td>
                        </tr>

                        {/* Physical condition subcategories */}
                        <tr>
                            <td className="border p-1 pl-6">1. Cleanliness</td>
                            {["Highly Satisfied", "Very Satisfied", "Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                                <td key={rating} className="border p-1 text-center">
                                    <input
                                        type="radio"
                                        name="rating-physical_cleanliness"
                                        value={rating}
                                        onChange={handleChange}
                                        checked={formData.ratings.physical_cleanliness === rating}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border p-1 pl-6">2. Comfort</td>
                            {["Highly Satisfied", "Very Satisfied", "Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                                <td key={rating} className="border p-1 text-center">
                                    <input
                                        type="radio"
                                        name="rating-physical_comfort"
                                        value={rating}
                                        onChange={handleChange}
                                        checked={formData.ratings.physical_comfort === rating}
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Comments/Suggestions:</label>
                <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={(e) => {
                        // Limit to 500 characters (or your desired limit)
                        if (e.target.value.length <= 150) {
                            handleChange(e);
                        }
                    }}
                    maxLength={150} // HTML5 attribute to prevent typing beyond limit
                    className="w-full p-2 border rounded"
                    rows="4"
                    placeholder="Enter your comments or suggestions here (max 150 characters)..."
                ></textarea>
            </div>

            <div className="text-center">
                <buttons
                    onClick={downloadPDF}
                    className="p-2 bg-dark text-white rounded hover:bg-blue-700 transition"
                >
                    Download PDF
                </buttons>
            </div>
        </div>
    );
};

export default StakeholdersFeedbackForm;
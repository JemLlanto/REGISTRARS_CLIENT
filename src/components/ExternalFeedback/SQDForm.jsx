import React, { useState } from "react";
import jsPDF from "jspdf";
import cvsuLogo from "/cvsu-logo.png";

const FeedbackExternal = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        controlNo: '',
        clientType: '',
        date: '',
        sex: '',
        age: '',
        serviceAvailed: '',
        // Service Quality Dimensions (SQD) questions
        sqd0: '', // Satisfaction with service
        sqd1: '', // Time spent
        sqd2: '', // Office followed steps
        sqd3: '', // Steps were easy
        sqd4: '', // Information availability
        sqd5: '', // Fees reasonableness
        sqd6: '', // Office fairness
        sqd7: '', // Staff courtesy
        sqd8: '', // Got what was needed
        suggestions: '',
        email: ''
    });

    // Modal control functions
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        // Reset form data when closing modal
        setFormData({

            sqd0: '',
            sqd1: '',
            sqd2: '',
            sqd3: '',
            sqd4: '',
            sqd5: '',
            sqd6: '',
            sqd7: '',
            sqd8: '',
            suggestions: '',
            email: ''
        });
    };

    // PDF generation function
    const downloadPDF = () => {
        try {
            const doc = new jsPDF();

            // Add logo
            doc.addImage(cvsuLogo, "PNG", 50, 12, 18, 15);

            // Header section
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

            // Control number
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text("Control No. " + (formData.controlNo || "_______"), 170, 13, { align: "left" });

            // Form title
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("CLIENT SATISFACTION MEASUREMENT", 105, 30, { align: "center" });

            // Instructions
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.text("INSTRUCTIONS: For SQD 0-8, please put a check mark (✓) on the column that best corresponds to your answer.", 48, 40);

            doc.setFontSize(8);
            doc.setFont("helvetica", "italic");
            doc.text("PANUTO: Para sa SQD 0-8, lagyan ng tsek (✓) ang hanay na pinakaangkop sa iyong sagot.", 48, 45);

            // Draw SQD table
            const startY = 50;
            const rowHeight = 20;
            const colWidth = 25;

            // Table border
            doc.rect(25, startY, 160, rowHeight * 10); // Full table border

            // Draw header row
            doc.setFillColor(240, 240, 240);
            doc.rect(25, startY, 70, rowHeight, 'F'); // Question column header

            // Column dividers for header
            doc.line(95, startY, 95, startY + rowHeight * 10); // After question column
            doc.line(120, startY, 120, startY + rowHeight * 10); // After strongly disagree
            doc.line(145, startY, 145, startY + rowHeight * 10); // After disagree
            doc.line(160, startY, 160, startY + rowHeight * 10); // After neither
            doc.line(185, startY, 185, startY + rowHeight * 10); // After agree

            // Header row divider
            doc.line(25, startY + rowHeight, 185, startY + rowHeight);

            // Table headers text
            doc.setFontSize(7);
            doc.setFont("helvetica", "bold");

            doc.text("Strongly\nDisagree\n(Lubos na\nhindi\nsumasang-\nayon)", 107.5, startY + 7, { align: "center" });

            doc.text("Disagree\n(Hindi\nsumasang\n-ayon)", 132.5, startY + 7, { align: "center" });

            doc.text("Neither Agree\nnor Disagree\n(Walang\nkinikilingan)", 152.5, startY + 7, { align: "center" });

            doc.text("Agree\n(Sumasang\n-ayon)", 172.5, startY + 7, { align: "center" });

            doc.text("Strongly\nAgree\n(Lubos na\nsumasang\n-ayon)", 190, startY + 7, { align: "center" });

            doc.text("N/A (Not\napplicable)", 210, startY + 7, { align: "center" });

            // SQD questions
            const sqdQuestions = [
                {
                    id: "sqd0",
                    text: "I am satisfied with the service that I availed.",
                    italicText: "(Nasiyahan ako sa serbisyo na aking natanggap sa napuntahan na tanggapan.)"
                },
                {
                    id: "sqd1",
                    text: "I spent a reasonable amount of time for my transaction.",
                    italicText: "(Makatwiran ang oras na aking ginugol para sa pagproseso ng aking transaksyon.)"
                },
                {
                    id: "sqd2",
                    text: "The office followed the transaction's requirements and steps based on the information provided.",
                    italicText: "(Ang opisina ay sumunod sa mga kinakailangang dokumento at mga hakbang batay sa impormasyong ibinigay.)"
                },
                {
                    id: "sqd3",
                    text: "The steps (including payment) I needed to do for my transaction were easy and simple.",
                    italicText: "(Ang mga hakbang sa pagproseso, kasama na ang pagbabayad ay madali at simple lamang.)"
                },
                {
                    id: "sqd4",
                    text: "I easily found information about my transaction from the office or its website.",
                    italicText: "(Madali kong nahanap ang impormasyong tungkol sa aking transaksyon mula sa opisina o sa website nito.)"
                },
                {
                    id: "sqd5",
                    text: "I paid a reasonable amount of fees for my transaction. (If service was free, mark the "N/ A" column).",
                italicText: "(Nagbayad ako ng makatwiran halaga para sa aking transaksyon. (Kung ang serbisyo ay ibinigay ng libre, maglagay ng tsek sa hanay ng N/A.)"
                },
        {
            id: "sqd6",
                text: "I feel the office was fair to everyone, or "walang palakasan", during my transaction.",
                    italicText: "(Pakiramdam ko ay patas ang opisina sa lahat, o "walang palakasan", sa aking transaksyon.)"
        },
        {
            id: "sqd7",
                text: "I was treated courteously by the staff, and (if asked for help) the staff was helpful.",
                    italicText: "(Magalang akong tratuhin ng mga tauhan, at (kung sakali na ako ay humingi ng tulong) alam ko na sila ay handang tumulong sa akin.)"
        },
        {
            id: "sqd8",
                text: "I got what I needed from the government office, or (if denied) denial of request was sufficiently explained to me.",
                    italicText: "(Nakuha ko ang kailangan ko mula sa tanggapan ng gobyerno, kung tinanggihan man, ito ay sapat na ipinaliwanag sa akin.)"
        }
            ];

// Draw SQD question rows
sqdQuestions.forEach((question, index) => {
    const y = startY + rowHeight + (rowHeight * index);

    // Draw row dividers
    doc.line(25, y + rowHeight, 185, y + rowHeight);

    // Function to draw checkbox based on selection
    const drawCheckbox = (x, y, value, expectedValue) => {
        doc.rect(x - 3, y - 3, 6, 6);
        if (value === expectedValue) {
            doc.setFillColor(0, 0, 0);
            doc.rect(x - 2, y - 2, 4, 4, 'F');
        }
    };

    // Question text
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`SQD${index}.`, 27, y + 4);
    doc.setFont("helvetica", "normal");

    // Split text to fit
    const textLines = doc.splitTextToSize(question.text, 65);
    for (let i = 0; i < textLines.length; i++) {
        doc.text(textLines[i], 35, y + 3 + (i * 3));
    }

    // Italic text
    doc.setFont("helvetica", "italic");
    const italicLines = doc.splitTextToSize(question.italicText, 65);
    for (let i = 0; i < italicLines.length; i++) {
        doc.text(italicLines[i], 35, y + 9 + (i * 3));
    }

    // Draw checkboxes based on selection
    drawCheckbox(107.5, y + 10, formData[question.id], '1'); // Strongly Disagree
    drawCheckbox(132.5, y + 10, formData[question.id], '2'); // Disagree
    drawCheckbox(152.5, y + 10, formData[question.id], '3'); // Neither
    drawCheckbox(172.5, y + 10, formData[question.id], '4'); // Agree
    drawCheckbox(190, y + 10, formData[question.id], '5');   // Strongly Agree
    drawCheckbox(210, y + 10, formData[question.id], 'NA');  // N/A
});

// Suggestions section
const suggestionY = startY + (rowHeight * 10) + 10;
doc.setFontSize(8);
doc.setFont("helvetica", "normal");
doc.text("Suggestions on how we can further improve our services (optional):", 25, suggestionY);
doc.setFont("helvetica", "italic");
doc.text("(Mga suhestiyon kung paano pa mapapabuti ang aming mga serbisyo (opsyonal)):", 25, suggestionY + 4);

// Suggestion lines
doc.line(25, suggestionY + 10, 185, suggestionY + 10);
doc.line(25, suggestionY + 20, 185, suggestionY + 20);
doc.line(25, suggestionY + 30, 185, suggestionY + 30);

// Email section
doc.setFontSize(8);
doc.setFont("helvetica", "normal");
doc.text("Email address (optional):", 25, suggestionY + 40);
doc.line(85, suggestionY + 40, 185, suggestionY + 40);

// Thank you message
doc.setFontSize(10);
doc.setFont("helvetica", "bold");
doc.text("THANK YOU!", 105, suggestionY + 50, { align: "center" });
doc.setFontSize(8);
doc.setFont("helvetica", "italic");
doc.text("(Salamat po!)", 105, suggestionY + 55, { align: "center" });

// Save PDF
doc.save("Client_Satisfaction_Measurement_Form.pdf");

// Close modal after download
handleClose();
        } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the PDF. Please try again.");
}
    };

// Create SQD form component
const SQDFormComponent = () => {
    return (
        <div className="container">

            <div className="table-responsive mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr className="bg-light">
                            <th style={{ width: "40%" }}>Questions</th>
                            <th>Strongly Disagree (Lubos na hindi sumasang-ayon)</th>
                            <th>Disagree (Hindi sumasang-ayon)</th>
                            <th>Neither Agree nor Disagree (Walang kinikilingan)</th>
                            <th>Agree (Sumasang-ayon)</th>
                            <th>Strongly Agree (Lubos na sumasang-ayon)</th>
                            <th>N/A (Not applicable)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: "sqd0", label: "I am satisfied with the service that I availed.", italicLabel: "(Nasiyahan ako sa serbisyo na aking natanggap sa napuntahan na tanggapan.)" },
                            { id: "sqd1", label: "I spent a reasonable amount of time for my transaction.", italicLabel: "(Makatwiran ang oras na aking ginugol para sa pagproseso ng aking transaksyon.)" },
                            { id: "sqd2", label: "The office followed the transaction's requirements and steps based on the information provided.", italicLabel: "(Ang opisina ay sumunod sa mga kinakailangang dokumento at mga hakbang batay sa impormasyong ibinigay.)" },
                            { id: "sqd3", label: "The steps (including payment) I needed to do for my transaction were easy and simple.", italicLabel: "(Ang mga hakbang sa pagproseso, kasama na ang pagbabayad ay madali at simple lamang.)" },
                            { id: "sqd4", label: "I easily found information about my transaction from the office or its website.", italicLabel: "(Madali kong nahanap ang impormasyong tungkol sa aking transaksyon mula sa opisina o sa website nito.)" },
                            { id: "sqd5", label: "I paid a reasonable amount of fees for my transaction. (If service was free, mark the "N/ A" column).", italicLabel: "(Nagbayad ako ng makatwiran halaga para sa aking transaksyon. (Kung ang serbisyo ay ibinigay ng libre, maglagay ng tsek sa hanay ng N/A.)" },
                        {id: "sqd6", label: "I feel the office was fair to everyone, or "walang palakasan", during my transaction.", italicLabel: "(Pakiramdam ko ay patas ang opisina sa lahat, o "walang palakasan", sa aking transaksyon.)" },
                        {id: "sqd7", label: "I was treated courteously by the staff, and (if asked for help) the staff was helpful.", italicLabel: "(Magalang akong tratuhin ng mga tauhan, at (kung sakali na ako ay humingi ng tulong) alam ko na sila ay handang tumulong sa akin.)" },
                        {id: "sqd8", label: "I got what I needed from the government office, or (if denied) denial of request was sufficiently explained to me.", italicLabel: "(Nakuha ko ang kailangan ko mula sa tanggapan ng gobyerno, kung tinanggihan man, ito ay sapat na ipinaliwanag sa akin.)" },
                        ].map((question, index) => (
                        <tr key={question.id}>
                            <td>
                                <strong>{`SQD${index}.`}</strong> {question.label}
                                <div className="text-muted fst-italic small">{question.italicLabel}</div>
                            </td>
                            {['1', '2', '3', '4', '5', 'NA'].map((value) => (
                                <td key={value} className="text-center">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name={question.id}
                                        value={value}
                                        checked={formData[question.id] === value}
                                        onChange={handleChange}
                                    />
                                </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mb-3 mt-4">
                <label htmlFor="suggestions" className="form-label">Suggestions on how we can further improve our services (optional):</label>
                <textarea
                    className="form-control"
                    id="suggestions"
                    name="suggestions"
                    rows="3"
                    value={formData.suggestions}
                    onChange={handleChange}
                    placeholder="(Mga suhestiyon kung paano pa mapapabuti ang aming mga serbisyo (opsyonal))"
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address (optional):</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};


return (
    <>
        <button className="btn text-white" style={{ backgroundColor: "var(--main-color)" }} onClick={handleShow}>
            External
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
                                    <h4 className="fw-bold mb-0 text-white">CLIENT SATISFACTION MEASUREMENT</h4>
                                </div>
                                <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <SQDFormComponent />
                                </form>
                            </div>

                            <div className="modal-footer" style={{ backgroundColor: "var(--main-color)" }}>
                                <button type="button" className="btn btn-success" onClick={downloadPDF}>
                                    Submit & Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
);
};

export default FeedbackExternal;
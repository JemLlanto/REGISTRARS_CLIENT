import React, { useState } from "react";
import jsPDF from "jspdf";
import cvsuLogo from "/cvsu-logo.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const defaultDocumentTypes = [
    { label: "Transcript of Records (TOR)", amount: 50 },
    { label: "Certificate of Transfer (COT)", amount: 30 },
    { label: "Earned Units", amount: 30 },
    { label: "Certificate of Grades (COG)", amount: 30 },
    { label: "Grad. Cert.", amount: 30 },
    { label: "GWA Certificate", amount: 30 },
    { label: "English Proficiency Cert.", amount: 30 },
    { label: "OGM/RC", amount: 15 },
    { label: "Others", amount: 10 },
    { label: "CTC", amount: 30 },
    { label: "Documentary Stamp", amount: 30 },
];

const requirements = [
    "Original Form 137/SF10 with remark 'Copy for CVSU-CCAT Campus'.",
    "Return Slip Original Copy",
    "Please surrender the School ID",
    "Documentary Stamp (1 pc/s.) Available at registrar's office. 30/c pc.",
    "Balance of 2,725.00 pesos (1st Sem. 2009-2010)",
];

const InternalFeedbackPDFModal = () => {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        controlNo: "",
        name: "",
        courseMajor: "",
        studentNo: "",
        dateRequested: "",
        purpose: "",
        dateRelease: "",
        timeRelease: "",
        processedBy: "",
        selectedDocs: [],
    });
    const [documentTypes, setDocumentTypes] = useState(defaultDocumentTypes);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDocChange = (index) => {
        setForm((prev) => {
            const selected = prev.selectedDocs.includes(index)
                ? prev.selectedDocs.filter((i) => i !== index)
                : [...prev.selectedDocs, index];
            return { ...prev, selectedDocs: selected };
        });
    };

    // Editable document type handlers
    const handleDocTypeLabelChange = (idx, value) => {
        setDocumentTypes((prev) => prev.map((doc, i) => i === idx ? { ...doc, label: value } : doc));
    };
    const handleDocTypeAmountChange = (idx, value) => {
        setDocumentTypes((prev) => prev.map((doc, i) => i === idx ? { ...doc, amount: parseFloat(value) || 0 } : doc));
    };
    const handleAddDocType = () => {
        setDocumentTypes((prev) => [...prev, { label: "New Document", amount: 0 }]);
    };
    const handleRemoveDocType = (idx) => {
        setDocumentTypes((prev) => prev.filter((_, i) => i !== idx));
        setForm((prev) => ({
            ...prev,
            selectedDocs: prev.selectedDocs.filter((i) => i !== idx).map((i) => (i > idx ? i - 1 : i)),
        }));
    };
    const handleMoveDocType = (idx, direction) => {
        setDocumentTypes((prev) => {
            const newArr = [...prev];
            const targetIdx = idx + direction;
            if (targetIdx < 0 || targetIdx >= newArr.length) return prev;
            [newArr[idx], newArr[targetIdx]] = [newArr[targetIdx], newArr[idx]];
            return newArr;
        });
        setForm((prev) => ({
            ...prev,
            selectedDocs: prev.selectedDocs.map((i) => {
                if (i === idx) return idx + direction;
                if (i === idx + direction) return idx;
                return i;
            }),
        }));
    };

    const getTotal = () => {
        return form.selectedDocs.reduce((sum, idx) => sum + (documentTypes[idx]?.amount || 0), 0);
    };

    const generatePDF = () => {
        try {
            const doc = new jsPDF();
            const left = 15, top = 15, width = 180, pageWidth = 210;
            let y = top;

            // Header
            doc.addImage(cvsuLogo, "PNG", left, y, 20, 20);
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("Republic of the Philippines", pageWidth / 2, y + 5, { align: "center" });
            doc.setFontSize(12);
            doc.text("CAVITE STATE UNIVERSITY - CCAT", pageWidth / 2, y + 12, { align: "center" });
            doc.setFontSize(8);
            doc.text("(Formerly Cavite College of Arts and Trades)", pageWidth / 2, y + 17, { align: "center" });
            doc.text("Rosario, Cavite", pageWidth / 2, y + 21, { align: "center" });
            doc.setFontSize(10);
            doc.text("OFFICE OF THE CAMPUS REGISTRAR", pageWidth / 2, y + 27, { align: "center" });
            doc.setFontSize(11);
            doc.text("SCHEDULE SLIP", pageWidth / 2, y + 33, { align: "center" });

            y += 38;

            // Top info row
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text(`Control No: ${form.controlNo}`, left, y);
            doc.text(`Student No.:`, left + 120, y);
            doc.text(`${form.studentNo}`, left + 170, y);
            y += 5;
            doc.text(`Name:`, left, y);
            doc.text(`${form.name}`, left + 20, y);
            doc.text(`Date requested:`, left + 120, y);
            doc.text(`${form.dateRequested}`, left + 170, y);
            y += 5;
            doc.text(`Course & Major:`, left, y);
            doc.text(`${form.courseMajor}`, left + 30, y);
            y += 5;

            // Draw main table box
            const tableTop = y + 2;
            const tableHeight = 60 + documentTypes.length * 4;
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
            documentTypes.forEach((docType, idx) => {
                doc.text("(", left + 1, rowY);
                if (form.selectedDocs.includes(idx)) {
                    doc.text("/", left + 3, rowY);
                }
                doc.text(") " + docType.label, left + 6, rowY);
                doc.text("1", left + 110, rowY, { align: "right" });
                doc.text(docType.amount.toFixed(2), left + 175, rowY, { align: "right" });
                rowY += 4;
            });
            // Draw horizontal line before total
            doc.line(left, rowY + 1, left + width, rowY + 1);
            // Total row (highlighted)
            doc.setFillColor(180, 238, 180);
            doc.rect(left + 120, rowY + 2, 60, 6, "F");
            doc.setFont("helvetica", "bold");
            doc.text("Total amount:", left + 122, rowY + 6);
            doc.text(getTotal().toFixed(2), left + 175, rowY + 6, { align: "right" });
            doc.setFont("helvetica", "normal");
            // to be paid at cashier
            doc.text("to be paid at the Cashier's Office", left + 120, rowY + 12);

            // Purpose, Date & Time, Processed by row (bottom box)
            let boxY = rowY + 18;
            doc.setLineWidth(0.2);
            doc.rect(left, boxY, width, 12);
            doc.line(left + 90, boxY, left + 90, boxY + 12);
            doc.line(left + 140, boxY, left + 140, boxY + 12);
            doc.setFont("helvetica", "bold");
            doc.text("Purpose:", left + 1, boxY + 4);
            doc.text("Date & Time of release:", left + 92, boxY + 4);
            doc.text("Processed by", left + 142, boxY + 4);
            doc.setFont("helvetica", "normal");
            doc.text(form.purpose, left + 1, boxY + 9);
            doc.text(`${form.dateRelease} ${form.timeRelease}`, left + 92, boxY + 9);
            doc.text(form.processedBy, left + 142, boxY + 9);
            // Simulated signature
            doc.setFontSize(10);
            doc.text("/s/", left + 170, boxY + 9);
            doc.setFontSize(8);

            // Green requirements box
            let reqY = boxY + 16;
            doc.setFillColor(180, 238, 180);
            doc.rect(left, reqY, width, 18, "F");
            doc.setFont("helvetica", "bold");
            doc.text("Please bring the following Requirements:", left + 1, reqY + 4);
            doc.setFont("helvetica", "normal");
            requirements.forEach((req, i) => {
                doc.text(`(/) ${req}`, left + 2, reqY + 8 + (i + 1) * 3);
            });
            reqY += 8 + (requirements.length + 1) * 3;

            // Notes
            doc.setFont("helvetica", "bold");
            doc.text("Note:", left, reqY);
            doc.setFont("helvetica", "normal");
            const notes = [
                "As a proof of request the clients must have a copy of schedule slip either in printed copy or in an electronic copy (screenshot copy).",
                "Strictly follow the scheduled date & and time to avoid inconvenience. We will not entertain those who are not on their schedule.",
                "In the event that the client cannot claim personally, he/she must provide an AUTHORIZATION LETTER and a photocopy of I.D. to his/her authorized person, in pursuant to the Republic Act 10173 - Data Privacy Act of 2012 in addition to the above requirements.",
                "Please be calm yourself at the CVSU-CCAT Registrar's Office.",
                "If the scheduled date does not fit into your schedule due to valid reasons, kindly email us your preferred schedule.",
            ];
            notes.forEach((note, i) => {
                doc.text(`${i + 1}. ${note}`, left + 1, reqY + 4 + (i + 1) * 3);
            });

            doc.save(`${form.name || "Schedule_Slip"}_Schedule_Slip.pdf`);
            handleClose();
        } catch (error) {
            alert("PDF Generation Failed: " + error.message);
        }
    };

    return (
        <>
            <Button variant="warning" className="w-100 mb-2" onClick={handleShow}>
                <span>Open Schedule Slip Modal</span>
            </Button>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)" }}>
                    <Modal.Title className="text-white">Schedule Slip Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-2">
                            <label>Control No.:</label>
                            <input type="text" className="form-control" name="controlNo" value={form.controlNo} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label>Name:</label>
                            <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label>Course & Major:</label>
                            <input type="text" className="form-control" name="courseMajor" value={form.courseMajor} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label>Student No.:</label>
                            <input type="text" className="form-control" name="studentNo" value={form.studentNo} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label>Date requested:</label>
                            <input type="date" className="form-control" name="dateRequested" value={form.dateRequested} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label>Purpose:</label>
                            <input type="text" className="form-control" name="purpose" value={form.purpose} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label>Date of Release:</label>
                            <input type="date" className="form-control" name="dateRelease" value={form.dateRelease} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label>Time of Release:</label>
                            <input type="text" className="form-control" name="timeRelease" value={form.timeRelease} onChange={handleChange} placeholder="e.g. 02:00PM - 05:00PM" />
                        </div>
                        <div className="mb-2">
                            <label>Processed by:</label>
                            <input type="text" className="form-control" name="processedBy" value={form.processedBy} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label>Types of documents requested:</label>
                            {documentTypes.map((docType, idx) => (
                                <div key={idx} className="d-flex align-items-center mb-1">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        checked={form.selectedDocs.includes(idx)}
                                        onChange={() => handleDocChange(idx)}
                                        id={`docType${idx}`}
                                    />
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        style={{ width: "40%" }}
                                        value={docType.label}
                                        onChange={e => handleDocTypeLabelChange(idx, e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="form-control me-2"
                                        style={{ width: "20%" }}
                                        value={docType.amount}
                                        onChange={e => handleDocTypeAmountChange(idx, e.target.value)}
                                    />
                                    <Button variant="outline-secondary" size="sm" onClick={() => handleMoveDocType(idx, -1)} disabled={idx === 0}>&uarr;</Button>
                                    <Button variant="outline-secondary" size="sm" onClick={() => handleMoveDocType(idx, 1)} disabled={idx === documentTypes.length - 1}>&darr;</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleRemoveDocType(idx)} disabled={documentTypes.length === 1}>&times;</Button>
                                </div>
                            ))}
                            <Button variant="outline-primary" size="sm" className="mt-2" onClick={handleAddDocType}>
                                + Add Document Type
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={generatePDF}>
                        Download PDF
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InternalFeedbackPDFModal; 
import React, { useState } from "react";
import jsPDF from "jspdf";
import cvsuLogo from "/cvsu-logo.png";
import CitizensCharterStep from "./Citizen";
import PersonalInfoStep from "./Personal";

const FeedbackExternal = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        controlNo: '',
        clientType: '',
        date: '',
        sex: '',
        age: '',
        serviceAvailed: '',
        cc1: '',
        cc2: '',
        cc3: ''
    });

    // Modal control functions
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
            controlNo: '',
            clientType: '',
            date: '',
            sex: '',
            age: '',
            serviceAvailed: '',
            cc1: '',
            cc2: '',
            cc3: ''
        });
    };

    // Render steps based on current step
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <CitizensCharterStep formData={formData} handleChange={handleChange} />;
            case 2:
                return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
        }
    };

    // PDF generation function
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

            // Control number
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text("Control No. " + (formData.controlNo || "_______"), 170, 13, { align: "left" });

            // Form title
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("HELP US SERVE YOU BETTER!", 105, 30, { align: "center" });
            doc.setFontSize(8);
            doc.setFont("helvetica", "italic");
            doc.text("(TULUNGAN PO KAMI NA MAKAPAGSERBIYO SA IYO NANG TAMA!)", 105, 35, { align: "center" });

            // Introduction text
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text("This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. Your feedback on your recently", 25, 42);
            doc.text("concluded transaction will help this office provide a better service. Personal information shared will be kept confidential and you", 25, 46);
            doc.text("always have the option to not answer this form.", 25, 50);

            doc.setFont("helvetica", "italic");
            doc.text("(Ang Client Satisfaction Measurement (CSM) ay sumusubaybay sa mga karanasan ng mga mamamayan hinggil sa kanilang", 25, 55);
            doc.text("pakikipagkasundo/transaksiyon sa tanggapan ng pamahalaan/opisina. Ang inyong puna sa katatapus lamang na transaksyon upang", 25, 59);
            doc.text("tulang mapabuti namin ang aming serbisyo publiko. Ang personal na impormasyon iyong ibabahagi ay mananatiling", 25, 63);
            doc.text("kompidensyal at lagi kayong may kalayaan sa pagtugon sa surbey na ito.)", 25, 67);

            // Client type section
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text("Client type (Uri ng Kliyente):", 25, 75);

            // Function to draw checkbox (empty or filled)
            const drawCheckbox = (x, y, isChecked) => {
                // Draw the border (square outline)
                doc.rect(x, y, 4, 4);

                // If checked, fill the checkbox with black square
                if (isChecked) {
                    doc.setFillColor(0, 0, 0); // Black color
                    doc.rect(x + 0.7, y + 0.7, 2.6, 2.6, 'F'); // Fill smaller square inside
                }
            };

            // Draw checkboxes for client type
            // Citizen checkbox
            drawCheckbox(68, 72, formData.clientType === 'Citizen');
            doc.text("Citizen (Mamamayan)", 74, 75);

            // Business checkbox
            drawCheckbox(110, 72, formData.clientType === 'Business');
            doc.text("Business (Negosyo)", 115, 75);

            // Government checkbox
            drawCheckbox(68, 78, formData.clientType === 'Government');
            doc.text("Government: Employee or another agency (Gobyerno: Empleyado o ahensya)", 74, 81);

            // Date field
            doc.text("Date (Petsa): " + (formData.date || "_________________"), 25, 90);

            // Sex field
            doc.text("Sex (Kasarian):", 25, 97);

            // Male checkbox
            drawCheckbox(55, 94, formData.sex === 'Male');
            doc.text("Male (Lalaki)", 61, 97);

            // Female checkbox
            drawCheckbox(95, 94, formData.sex === 'Female');
            doc.text("Female (Babae)", 101, 97);

            // Age field
            doc.text("Age (Edad): " + (formData.age || "_________"), 145, 97);

            // Service Availed
            doc.text("Service Availed (Uri ng transaksyon o serbisyo): " + (formData.serviceAvailed || "_________________"), 25, 105);

            // Divider line
            doc.line(25, 110, 185, 110);

            // Instructions
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text("INSTRUCTIONS: Check mark (') your answer to the Citize's Charter (CC) question. The Citizen's Charter is an Official", 25, 118);
            doc.text("document that reflects the services of a government agency/office including its requirement, fees and processing times among others.", 25, 123);

            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text("PANUTO: UTO: Lagyan ng tsek (') ang tumutugon sa iyong sagot sa Citizen's Charter (CC). Ang Citizen's Charter (CC) ay opisyal na", 25, 128);
            doc.text("dokumento na nagsasaad ng mga serbisyo sa isang ahensya ng gobyerno, kasama ang mga kakailanganin na dokumento, bayarin,", 25, 132);
            doc.text("at panahong gagugulin sa pagpoproseso.", 25, 136);

            // CC1 Question
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.text("CC1", 25, 144);
            doc.setFont("helvetica", "normal");
            doc.text("Which of the following best describes your awareness of a CC?", 35, 144);

            doc.setFontSize(8);
            doc.setFont("helvetica", "italic");
            doc.text("(Alin sa mga sumusunod ang naglarawan sa iyong kaalaman sa CC?)", 35, 148);

            // CC1 options with check marks based on selection
            // Option 1
            drawCheckbox(35, 152, formData.cc1 === '1');
            doc.setFont("helvetica", "normal");
            doc.text("1. I know what a CC is and I saw this office's CC.", 42, 155);
            doc.setFont("helvetica", "italic");
            doc.text("(Alam ko ang CC at nakita ko ito sa napuntahang tanggapan.)", 45, 159);

            // Option 2
            drawCheckbox(35, 162, formData.cc1 === '2');
            doc.setFont("helvetica", "normal");
            doc.text("2. I know what a CC is but I did NOT see this office's CC.", 42, 165);
            doc.setFont("helvetica", "italic");
            doc.text("(Alam ko ang CC pero hindi ko ito nakita sa napuntahang tanggapan.)", 45, 169);

            // Option 3
            drawCheckbox(35, 172, formData.cc1 === '3');
            doc.setFont("helvetica", "normal");
            doc.text("3. I learned of the CC only when I saw this office's CC.", 42, 175);
            doc.setFont("helvetica", "italic");
            doc.text("(Nalaman ko ang CC noon lamang nakita ko ito sa napuntahang tanggapan.)", 45, 179);

            // Option 4
            drawCheckbox(35, 182, formData.cc1 === '4');
            doc.setFont("helvetica", "normal");
            doc.text("4. I do not know what a CC is and I did not see one of this office. (Answer 'N/A' on CC2 and CC3)", 42, 185);
            doc.setFont("helvetica", "italic");
            doc.text("(Hindi ko alam kung ano ang CC at wala akong nakita sa napuntahang tanggapan (Lagyan ng tsek at", 45, 189);
            doc.text("'N/A' sa CC2 at CC3))", 45, 193);
            // CC2 Question
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.text("CC2", 25, 197);
            doc.setFont("helvetica", "normal");
            doc.text("If aware of CC (answered 1-3 in CC1), would you say that the CC of this office was...?", 35, 197);

            doc.setFontSize(8);
            doc.setFont("helvetica", "italic");
            doc.text("(Kung alam ang CC (kung sinagutan ang 1-3 sa CC1), masasabi mo ba na ang CC ng napuntahang tanggapan", 35, 201);
            doc.text("ay...?)", 35, 205);

            // CC2 options with check marks based on selection
            // Option 1
            drawCheckbox(35, 209, formData.cc2 === '1');
            doc.setFont("helvetica", "normal");
            doc.text("1. Easy to see (Madaling makita)", 42, 212);

            // Option 4
            drawCheckbox(120, 209, formData.cc2 === '4');
            doc.setFont("helvetica", "normal");
            doc.text("4. Not visible at all (Hindi nakikita)", 127, 212);

            // Option 2
            drawCheckbox(35, 217, formData.cc2 === '2');
            doc.setFont("helvetica", "normal");
            doc.text("2. Somewhat easy to see (Medyo madaling makita)", 42, 220);

            // Option 5
            drawCheckbox(120, 217, formData.cc2 === '5' || (formData.cc1 === '4'));
            doc.setFont("helvetica", "normal");
            doc.text("5. N/A", 127, 220);

            // Option 3
            drawCheckbox(35, 225, formData.cc2 === '3');
            doc.setFont("helvetica", "normal");
            doc.text("3. Difficult to see (Mahirap makita)", 42, 228);

            // CC3 Question
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.text("CC3", 25, 236);
            doc.setFont("helvetica", "normal");
            doc.text("If aware of CC (answered codes 1-3 in CC1), how much did the CC help you in your transaction?", 35, 236);

            doc.setFontSize(8);
            doc.setFont("helvetica", "italic");
            doc.text("(Kung alam ang CC (kung sinagutan ang 1-3 sa CC1), gaano nakatulong ang CC sa transaksyon mo?)", 35, 240);

            // CC3 options with check marks based on selection
            // Option 1
            drawCheckbox(35, 244, formData.cc3 === '1');
            doc.setFont("helvetica", "normal");
            doc.text("1. Helped very much (Sobrang nakatulong)", 42, 247);

            // Option 3
            drawCheckbox(120, 244, formData.cc3 === '3');
            doc.setFont("helvetica", "normal");
            doc.text("3. Did not help (Hindi nakatulong)", 127, 247);

            // Option 2
            drawCheckbox(35, 252, formData.cc3 === '2');
            doc.setFont("helvetica", "normal");
            doc.text("2. Somewhat helped (Bahagyang nakatulong)", 42, 255);

            // Option 4
            drawCheckbox(120, 252, formData.cc3 === '4' || formData.cc1 === '4');
            doc.setFont("helvetica", "normal");
            doc.text("4. N/A", 127, 255);

            // Save PDF
            doc.save("Client_Satisfaction_Measurement_Form.pdf");

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
                                        {renderStep()}
                                    </form>
                                </div>

                                <div className="modal-footer" style={{ backgroundColor: "var(--main-color)" }}>
                                    {currentStep > 1 && (
                                        <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                            Previous
                                        </button>
                                    )}

                                    {currentStep < 2 ? (
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

export default FeedbackExternal;
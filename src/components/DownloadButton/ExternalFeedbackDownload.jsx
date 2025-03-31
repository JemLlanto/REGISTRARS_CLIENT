import axios from "axios";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import cvsuLogo from "/cvsu-logo.png";
import Swal from "sweetalert2";

const ExternalFeedbackDownload = ({ user, documentDetails }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (documentDetails.requestID) {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/feedbackForm/fetchFeedbackExternalData?requestID=${documentDetails.requestID}`
        );

        if (res.status === 200) {
          console.log(res.data.result);
          setFeedbackData(res.data.result);
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
  useEffect(() => {
    if (documentDetails.requestID) {
      fetchData();
    }
  }, [documentDetails.requestID]);
  // PDF generation function
  const downloadPDF = () => {
    try {
      const doc = new jsPDF();

      // First page - Steps 1 & 2 (Personal Info & Citizen's Charter)
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
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("HELP US SERVE YOU BETTER!", 105, 30, { align: "center" });
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text(
        "(TULUNGAN PO KAMI NA MAKAPAGSERBIYO SA IYO NANG TAMA!)",
        105,
        35,
        { align: "center" }
      );

      // Introduction text
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        "This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. Your feedback on your recently",
        25,
        42
      );
      doc.text(
        "concluded transaction will help this office provide a better service. Personal information shared will be kept confidential and you",
        25,
        46
      );
      doc.text("always have the option to not answer this form.", 25, 50);

      doc.setFont("helvetica", "italic");
      doc.text(
        "(Ang Client Satisfaction Measurement (CSM) ay sumusubaybay sa mga karanasan ng mga mamamayan hinggil sa kanilang",
        25,
        55
      );
      doc.text(
        "pakikipagkasundo/transaksiyon sa tanggapan ng pamahalaan/opisina. Ang inyong puna sa katatapus lamang na transaksyon upang",
        25,
        59
      );
      doc.text(
        "tulang mapabuti namin ang aming serbisyo publiko. Ang personal na impormasyon iyong ibabahagi ay mananatiling",
        25,
        63
      );
      doc.text(
        "kompidensyal at lagi kayong may kalayaan sa pagtugon sa surbey na ito.)",
        25,
        67
      );

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
          doc.rect(x + 0.7, y + 0.7, 2.6, 2.6, "F"); // Fill smaller square inside
        }
      };

      // Draw checkboxes for client type
      // Citizen checkbox
      drawCheckbox(68, 72, feedbackData.clientType === "Citizen");
      doc.text("Citizen (Mamamayan)", 74, 75);

      // Business checkbox
      drawCheckbox(110, 72, feedbackData.clientType === "Business");
      doc.text("Business (Negosyo)", 115, 75);

      // Government checkbox
      drawCheckbox(68, 78, feedbackData.clientType === "Government");
      doc.text(
        "Government: Employee or another agency (Gobyerno: Empleyado o ahensya)",
        74,
        81
      );

      // Date field
      doc.text(
        "Date (Petsa): " + (feedbackData.date || "_________________"),
        25,
        90
      );

      // Sex field
      doc.text("Sex (Kasarian):", 25, 97);

      // Male checkbox
      drawCheckbox(55, 94, feedbackData.sex === "Male");
      doc.text("Male (Lalaki)", 61, 97);

      // Female checkbox
      drawCheckbox(95, 94, feedbackData.sex === "Female");
      doc.text("Female (Babae)", 101, 97);

      // Age field
      doc.text("Age (Edad): " + (feedbackData.age || "_________"), 145, 97);

      // Service Availed
      doc.text(
        "Service Availed (Uri ng transaksyon o serbisyo): " +
          (feedbackData.serviceAvailed || "_________________"),
        25,
        105
      );

      // Divider line
      doc.line(25, 110, 185, 110);

      // Instructions
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        "INSTRUCTIONS: Check mark (') your answer to the Citize's Charter (CC) question. The Citizen's Charter is an Official",
        25,
        118
      );
      doc.text(
        "document that reflects the services of a government agency/office including its requirement, fees and processing times among others.",
        25,
        123
      );

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        "PANUTO: UTO: Lagyan ng tsek (') ang tumutugon sa iyong sagot sa Citizen's Charter (CC). Ang Citizen's Charter (CC) ay opisyal na",
        25,
        128
      );
      doc.text(
        "dokumento na nagsasaad ng mga serbisyo sa isang ahensya ng gobyerno, kasama ang mga kakailanganin na dokumento, bayarin,",
        25,
        132
      );
      doc.text("at panahong gagugulin sa pagpoproseso.", 25, 136);

      // CC1 Question
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("CC1", 25, 144);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Which of the following best describes your awareness of a CC?",
        35,
        144
      );

      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text(
        "(Alin sa mga sumusunod ang naglarawan sa iyong kaalaman sa CC?)",
        35,
        148
      );

      // CC1 options with check marks based on selection
      // Option 1
      drawCheckbox(35, 152, feedbackData.cc1 === 1);
      doc.setFont("helvetica", "normal");
      doc.text("1. I know what a CC is and I saw this office's CC.", 42, 155);
      doc.setFont("helvetica", "italic");
      doc.text(
        "(Alam ko ang CC at nakita ko ito sa napuntahang tanggapan.)",
        45,
        159
      );

      // Option 2
      drawCheckbox(35, 162, feedbackData.cc1 === 2);
      doc.setFont("helvetica", "normal");
      doc.text(
        "2. I know what a CC is but I did NOT see this office's CC.",
        42,
        165
      );
      doc.setFont("helvetica", "italic");
      doc.text(
        "(Alam ko ang CC pero hindi ko ito nakita sa napuntahang tanggapan.)",
        45,
        169
      );

      // Option 3
      drawCheckbox(35, 172, feedbackData.cc1 === 3);
      doc.setFont("helvetica", "normal");
      doc.text(
        "3. I learned of the CC only when I saw this office's CC.",
        42,
        175
      );
      doc.setFont("helvetica", "italic");
      doc.text(
        "(Nalaman ko ang CC noon lamang nakita ko ito sa napuntahang tanggapan.)",
        45,
        179
      );

      // Option 4
      drawCheckbox(35, 182, feedbackData.cc1 === 4);
      doc.setFont("helvetica", "normal");
      doc.text(
        "4. I do not know what a CC is and I did not see one of this office. (Answer 'N/A' on CC2 and CC3)",
        42,
        185
      );
      doc.setFont("helvetica", "italic");
      doc.text(
        "(Hindi ko alam kung ano ang CC at wala akong nakita sa napuntahang tanggapan (Lagyan ng tsek at",
        45,
        189
      );
      doc.text("'N/A' sa CC2 at CC3))", 45, 193);

      // CC2 Question
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("CC2", 25, 197);
      doc.setFont("helvetica", "normal");
      doc.text(
        "If aware of CC (answered 1-3 in CC1), would you say that the CC of this office was...?",
        35,
        197
      );

      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text(
        "(Kung alam ang CC (kung sinagutan ang 1-3 sa CC1), masasabi mo ba na ang CC ng napuntahang tanggapan",
        35,
        201
      );
      doc.text("ay...?)", 35, 205);

      // CC2 options with check marks based on selection
      // Option 1
      drawCheckbox(35, 209, feedbackData.cc2 === 1);
      doc.setFont("helvetica", "normal");
      doc.text("1. Easy to see (Madaling makita)", 42, 212);

      // Option 4
      drawCheckbox(120, 209, feedbackData.cc2 === 4);
      doc.setFont("helvetica", "normal");
      doc.text("4. Not visible at all (Hindi nakikita)", 127, 212);

      // Option 2
      drawCheckbox(35, 217, feedbackData.cc2 === 2);
      doc.setFont("helvetica", "normal");
      doc.text("2. Somewhat easy to see (Medyo madaling makita)", 42, 220);

      // Option 5
      drawCheckbox(120, 217, feedbackData.cc2 === 5 || feedbackData.cc1 === 4);
      doc.setFont("helvetica", "normal");
      doc.text("5. N/A", 127, 220);

      // Option 3
      drawCheckbox(35, 225, feedbackData.cc2 === 3);
      doc.setFont("helvetica", "normal");
      doc.text("3. Difficult to see (Mahirap makita)", 42, 228);

      // CC3 Question
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("CC3", 25, 236);
      doc.setFont("helvetica", "normal");
      doc.text(
        "If aware of CC (answered codes 1-3 in CC1), how much did the CC help you in your transaction?",
        35,
        236
      );

      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text(
        "(Kung alam ang CC (kung sinagutan ang 1-3 sa CC1), gaano nakatulong ang CC sa transaksyon mo?)",
        35,
        240
      );

      // CC3 options with check marks based on selection
      // Option 1
      drawCheckbox(35, 244, feedbackData.cc3 === 1);
      doc.setFont("helvetica", "normal");
      doc.text("1. Helped very much (Sobrang nakatulong)", 42, 247);

      // Option 3
      drawCheckbox(120, 244, feedbackData.cc3 === 3);
      doc.setFont("helvetica", "normal");
      doc.text("3. Did not help (Hindi nakatulong)", 127, 247);

      // Option 2
      drawCheckbox(35, 252, feedbackData.cc3 === 2);
      doc.setFont("helvetica", "normal");
      doc.text("2. Somewhat helped (Bahagyang nakatulong)", 42, 255);

      // Option 4
      drawCheckbox(120, 252, feedbackData.cc3 === 4 || feedbackData.cc1 === 4);
      doc.setFont("helvetica", "normal");
      doc.text("4. N/A", 127, 255);

      // ========== ADD NEW PAGE FOR SQD FORM (STEP 3) ==========
      doc.addPage();

      // Page 2 header - Add logo and header section again
      doc.addImage(cvsuLogo, "PNG", 50, 12, 18, 15);

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
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("CLIENT SATISFACTION MEASUREMENT", 105, 30, { align: "center" });

      // Instructions
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text(
        "INSTRUCTIONS: For SQD 0-8, please put a check mark ( / ) on the column that best corresponds to you answer",
        25,
        40
      );
      doc.setFontSize(7);
      doc.setFont("helvetica", "italic");
      doc.text(
        "Panuto: Para sa SQD 0-8, langyan ng tsek ( / ) ang hanay na pinakaangkop sa inyong sagot.",
        25,
        45
      );

      // Draw SQD table
      const startY = 50;
      const rowHeight = 20;

      // Table border
      doc.rect(25, startY, 160, rowHeight * 10); // Full table border

      // Draw header row
      doc.setFillColor(240, 240, 240);
      doc.rect(25, startY, 70, rowHeight, "F"); // Question column header

      // Column dividers for header
      doc.line(95, startY, 95, startY + rowHeight * 10); // After question column
      doc.line(110, startY, 110, startY + rowHeight * 10); // After strongly disagree
      doc.line(125, startY, 125, startY + rowHeight * 10); // After disagree
      doc.line(140, startY, 140, startY + rowHeight * 10); // After neither
      doc.line(155, startY, 155, startY + rowHeight * 10); // After agree
      doc.line(170, startY, 170, startY + rowHeight * 10); // After strongly agree
      doc.line(185, startY, 185, startY + rowHeight * 10); // After N/A

      // Header row divider
      doc.line(25, startY + rowHeight, 185, startY + rowHeight);

      // Table headers text
      doc.setFontSize(6);
      doc.setFont("helvetica", "bold");

      doc.text(
        "Strongly\nDisagree\n(Lubos na\nhindi\nsumasang-\nayon)",
        102.5,
        startY + 7,
        { align: "center" }
      );
      doc.text("Disagree\n(Hindi\nsumasang\n-ayon)", 117.5, startY + 7, {
        align: "center",
      });
      doc.text(
        "Neither Agree\nnor Disagree\n(Walang\nkinikilingan)",
        132.5,
        startY + 7,
        { align: "center" }
      );
      doc.text("Agree\n(Sumasang\n-ayon)", 147.5, startY + 7, {
        align: "center",
      });
      doc.text(
        "Strongly\nAgree\n(Lubos na\nsumasang\n-ayon)",
        162.5,
        startY + 7,
        { align: "center" }
      );
      doc.text("N/A\n(Not\napplicable)", 177.5, startY + 7, {
        align: "center",
      });

      // SQD questions
      const sqdQuestions = [
        {
          id: "sqd0",
          text: "I am satisfied with the service that I availed.",
          italicText:
            "(Nasiyahan ako sa serbisyo na aking natanggap sa napuntahan na tanggapan.)",
        },
        {
          id: "sqd1",
          text: "I spent a reasonable amount of time for my transaction.",
          italicText:
            "(Makatwiran ang oras na aking ginugol para sa pagproseso ng aking transaksyon.)",
        },
        {
          id: "sqd2",
          text: "The office followed the transaction's requirements and steps based on the information provided.",
          italicText:
            "(Ang opisina ay sumunod sa mga kinakailangang dokumento at mga hakbang batay sa impormasyong ibinigay.)",
        },
        {
          id: "sqd3",
          text: "The steps (including payment) I needed to do for my transaction were easy and simple.",
          italicText:
            "(Ang mga hakbang sa pagproseso, kasama na ang pagbabayad ay madali at simple lamang.)",
        },
        {
          id: "sqd4",
          text: "I easily found information about my transaction from the office or its website.",
          italicText:
            "(Madali kong nahanap ang impormasyong tungkol sa aking transaksyon mula sa opisina o sa website nito.)",
        },
        {
          id: "sqd5",
          text: "I paid a reasonable amount of fees for my transaction. (If service was free, mark the column).",
          italicText:
            "(Nagbayad ako ng makatwiran halaga para sa aking transaksyon. (Kung ang serbisyo ay ibinigay ng libre, maglagay ng tsek sa hanay ng N/A.)",
        },
        {
          id: "sqd6",
          text: "I feel the office was fair to everyone, or, during my transaction.",
          italicText:
            "(Pakiramdam ko ay patas ang opisina sa lahat, o sa aking transaksyon.)",
        },
        {
          id: "sqd7",
          text: "I was treated courteously by the staff, and (if asked for help) the staff was helpful.",
          italicText:
            "(Magalang akong tratuhin ng mga tauhan, at (kung sakali na ako ay humingi ng tulong) alam ko na sila ay handang tumulong sa akin.)",
        },
        {
          id: "sqd8",
          text: "I got what I needed from the government office, or (if denied) denial of request was sufficiently explained to me.",
          italicText:
            "(Nakuha ko ang kailangan ko mula sa tanggapan ng gobyerno, kung tinanggihan man, ito ay sapat na ipinaliwanag sa akin.)",
        },
      ];

      // Draw SQD question rows
      sqdQuestions.forEach((question, index) => {
        const y = startY + rowHeight + rowHeight * index;

        // Draw row dividers
        doc.line(25, y + rowHeight, 185, y + rowHeight);

        // Question text
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text(`SQD${index}.`, 27, y + 3);
        doc.setFont("helvetica", "normal");

        // Split text to fit
        const textLines = doc.splitTextToSize(question.text, 65);
        for (let i = 0; i < textLines.length; i++) {
          doc.text(textLines[i], 28, y + 6 + i * 3);
        }

        // Italic text
        doc.setFont("helvetica", "italic");
        const italicLines = doc.splitTextToSize(question.italicText, 65);
        for (let i = 0; i < italicLines.length; i++) {
          doc.text(italicLines[i], 28, y + 12 + i * 3);
        }

        // Draw checkboxes based on selection
        drawCheckbox(100.5, y + 10, feedbackData[question.id] === 1); // Strongly Disagree
        drawCheckbox(115.5, y + 10, feedbackData[question.id] === 2); // Disagree
        drawCheckbox(130.5, y + 10, feedbackData[question.id] === 3); // Neither
        drawCheckbox(145.5, y + 10, feedbackData[question.id] === 4); // Agree
        drawCheckbox(160.5, y + 10, feedbackData[question.id] === 5); // Strongly Agree
        drawCheckbox(175.5, y + 10, feedbackData[question.id] === 6); // N/A
      });

      // Email section
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Email address (optional):", 25, 255);
      if (feedbackData.email) {
        doc.text(feedbackData.email, 60, 255);
      }

      // Suggestions section
      const suggestionY = startY + rowHeight * 10 + 10;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Suggestions on how we can further improve our services (optional):",
        25,
        258
      );
      doc.setFont("helvetica", "italic");
      doc.text(
        "(Mga suhestiyon kung paano pa mapapabuti ang aming mga serbisyo (opsyonal)):",
        25,
        261
      );

      // Display suggestions text if provided
      if (feedbackData.suggestions) {
        doc.setFont("helvetica", "normal");
        const suggestionLines = doc.splitTextToSize(
          feedbackData.suggestions,
          160
        );

        let startY = 265; // Initial Y position
        const lineHeight = 3; // Adjust line height for spacing

        suggestionLines.forEach((line, index) => {
          if (index < 3) {
            // Limit to 3 lines
            doc.text(line, 25, startY);
            startY += lineHeight; // Move to next line
          }
        });
      }

      // Thank you message
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("THANK YOU!", 105, 280, { align: "center" });
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text("(Salamat po!)", 105, 283, { align: "center" });

      // Save PDF
      doc.save(`${user.lastName}'s_Feedback_Form.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      Swal.fire({
        icon: "error",
        title: "PDF Generation Failed",
        text: "There was an error generating the PDF. Please try again.",
      });
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        onClick={downloadPDF}
        disabled={!documentDetails.responded}
      >
        <p className="m-0">
          {documentDetails.responded
            ? "Download feedback(External)"
            : "Download feedback"}
        </p>
      </button>
    </>
  );
};

export default ExternalFeedbackDownload;

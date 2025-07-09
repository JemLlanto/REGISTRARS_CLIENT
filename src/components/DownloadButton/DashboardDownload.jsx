import { useState, useEffect } from "react";
import axios from "axios";

const DashboardDownload = ({ startDate, endDate, requestedDocuments }) => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentTypeCounts, setDocumentTypeCounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    // console.log("Documents data in download: ", requestedDocuments);
  }, [requestedDocuments]);

  const fetchDataToDownload = () => {
    const filteredDocs = requestedDocuments.filter(
      (doc) =>
        doc.status === "ready to pickup" ||
        doc.status === "completed" ||
        doc.status === "unclaimed"
    );

    // console.log(`Filtered Documents: `, filteredDocs);

    const fetchAllDocTypes = async () => {
      try {
        // Reset document types before fetching new ones
        setIsLoading(true);
        setDocumentTypes([]);

        const docTypePromises = filteredDocs.map((doc) =>
          axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/dashboard/fetchDocumentTypes`,
            {
              params: { requestID: doc.requestID },
            }
          )
        );

        // Wait for all promises to resolve
        const responses = await Promise.all(docTypePromises);

        // Process all responses and collect document types
        responses.forEach((res, index) => {
          if (res.status === 200) {
            res.data.data?.map((d) =>
              setDocumentTypes((prev) => [...prev, d.documentType])
            );
          }
        });
      } catch (err) {
        console.error("Error fetching document types:", err);
        setDocumentTypes([]); // Reset on error
      } finally {
        // setIsLoading(false); // Ensure loading state is reset
        setFetchDone(true);
      }
    };

    if (filteredDocs.length > 0) {
      fetchAllDocTypes();
    } else {
      setDocumentTypes([]); // Reset if no docs
    }
  };

  useEffect(() => {
    if (documentTypes.length > 0) {
      setIsLoading(true);
      // console.log("Document Types:", documentTypes);

      const typeCounts = documentTypes.reduce((counts, item) => {
        if (item.documentType) {
          // Alternative: If your items have a documentType property instead
          const type = item.documentType;
          counts[type] = (counts[type] || 0) + 1;
        } else if (typeof item === "string") {
          // Alternative: If your items are directly strings
          counts[item] = (counts[item] || 0) + 1;
        }

        return counts; // This return was inside the forEach, which is wrong
      }, {});

      // // console.log("Type counts:", typeCounts);

      const pieChartData = Object.entries(typeCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

      // // console.log("Pie chart data:", pieChartData);
      setDocumentTypeCounts(pieChartData);
      // setIsLoading(false);
    } else {
      setDocumentTypeCounts([]);
    }
  }, [documentTypes]);

  const generatePDF = async () => {
    if (documentTypeCounts.length === 0) {
      alert("No data available to generate PDF");
      return;
    }

    try {
      setIsLoading(true);

      // Dynamic imports for PDF generation libraries
      const jsPDF = (await import("jspdf")).default;
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      // Create a temporary canvas for the chart
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");

      // Prepare data for the chart
      const labels = documentTypeCounts.map((item) => {
        // Truncate long labels for better display
        return item.name.length > 40
          ? item.name.substring(0, 40) + "..."
          : item.name;
      });
      const data = documentTypeCounts.map((item) => item.value);

      // Create the chart
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Document Count",
              data: data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
                "#C9CBCF",
                "#4BC0C0",
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
              ],
              borderColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
                "#C9CBCF",
                "#4BC0C0",
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            title: {
              display: true,
              text: "Document Type Distribution",
              font: {
                size: 16,
              },
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Count",
              },
            },
            x: {
              title: {
                display: true,
                // text: "Document Types",
              },
              ticks: {
                maxRotation: 45,
                minRotation: 45,
              },
            },
          },
        },
      });

      // Wait for chart to render
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Convert canvas to image
      const chartImage = canvas.toDataURL("image/png");

      // Create PDF
      const pdf = new jsPDF("l", "mm", "a4"); // landscape orientation
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add title
      pdf.setFontSize(20);
      pdf.text("Document Type Distribution Report", pageWidth / 2, 20, {
        align: "center",
      });

      // Add date
      pdf.setFontSize(12);
      const currentDate = new Date().toLocaleDateString();
      pdf.text(`Generated on: ${currentDate}`, pageWidth / 2, 30, {
        align: "center",
      });

      // Add chart image
      const imgWidth = 250;
      const imgHeight = 125;
      const xPosition = (pageWidth - imgWidth) / 2;
      const yPosition = 40;

      pdf.addImage(
        chartImage,
        "PNG",
        xPosition,
        yPosition,
        imgWidth,
        imgHeight
      );

      pdf.addPage();

      // Add data table
      pdf.setFontSize(14);
      pdf.text("Document Type Summary:", 20, yPosition - 20);

      // Table headers
      pdf.setFontSize(10);
      let tableY = yPosition - 12;
      pdf.text("Rank", 20, tableY);
      pdf.text("Document Type", 40, tableY);
      pdf.text("Count", pageWidth - 44, tableY);

      // Add line under headers
      pdf.line(20, tableY + 2, pageWidth - 20, tableY + 2);

      // Table data
      tableY += 8;
      documentTypeCounts.forEach((item, index) => {
        if (tableY > pageHeight - 20) {
          pdf.addPage();
          tableY = 20;
        }

        pdf.text(`${index + 1}`, 20, tableY);
        // Handle long document names
        const docName =
          item.name.length > 70
            ? item.name.substring(0, 70) + "..."
            : item.name;
        pdf.text(docName, 40, tableY);
        pdf.text(item.value.toString(), pageWidth - 40, tableY);
        tableY += 6;
      });

      // Add summary statistics
      const totalDocuments = documentTypeCounts.reduce(
        (sum, item) => sum + item.value,
        0
      );

      if (tableY > pageHeight - 40) {
        pdf.addPage();
        tableY = 20;
      }

      tableY += 10;
      pdf.setFontSize(12);
      pdf.text("Summary Statistics:", 20, tableY);
      tableY += 8;
      pdf.setFontSize(10);
      pdf.text(`Total Documents: ${totalDocuments}`, 20, tableY);
      tableY += 6;
      pdf.text(
        `Most Requested: ${documentTypeCounts[0]?.name} (${documentTypeCounts[0]?.value} requests)`,
        20,
        tableY
      );

      // Save the PDF
      pdf.save(`${startDate}_${endDate}_document-type-distribution.pdf`);

      // Clean up
      chart.destroy();
      canvas.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchDone && documentTypeCounts.length > 0) {
      generatePDF();
      setFetchDone(false);
    }
  }, [documentTypeCounts, fetchDone]);

  return (
    <>
      <button
        className="btn btn-warning me-1"
        onClick={fetchDataToDownload}
        disabled={isLoading || requestedDocuments.length === 0}
      >
        <p className="m-0 d-none d-md-block">
          {isLoading ? "Downloading" : "Download"}
        </p>
        <h5 className="m-0 d-md-none">
          {isLoading ? (
            <span className="d-flex align-items-center justify-content-center">
              <i className="bx bx-loader-circle bx-spin"></i>
            </span>
          ) : (
            <span className="d-flex align-items-center justify-content-center">
              <i className="bx bx-download"></i>
            </span>
          )}
        </h5>
      </button>
    </>
  );
};

export default DashboardDownload;

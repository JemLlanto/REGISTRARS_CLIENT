import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DocumentTypeStats = ({
  requestedDocuments,
  currentPurpose,
  showDocumentTypeStats,
  setShowDocumentTypeStats,
  handleClose,
}) => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentTypeCounts, setDocumentTypeCounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filteredDocs = requestedDocuments.filter(
      (doc) => doc.purpose === currentPurpose
    );

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
            // // console.log(
            //   `Document Types for requestID ${filteredDocs[index].requestID}:`,
            //   res.data.data?.map((d) => d.documentType).join(", ")
            // );
            res.data.data?.map((d) =>
              setDocumentTypes((prev) => [...prev, d.documentType])
            );
          }
        });
      } catch (err) {
        console.error("Error fetching document types:", err);
        setDocumentTypes([]); // Reset on error
      } finally {
        setIsLoading(false); // Ensure loading state is reset
      }
    };

    if (filteredDocs.length > 0) {
      fetchAllDocTypes();
    } else {
      setDocumentTypes([]); // Reset if no docs
    }
  }, [requestedDocuments, currentPurpose]);

  useEffect(() => {
    if (documentTypes.length > 0) {
      setIsLoading(true);
      // // console.log("Document Types:", documentTypes);

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
      setIsLoading(false);
    } else {
      setDocumentTypeCounts([]);
    }
  }, [documentTypes]);

  //   const COLORS = Array.from({ length: 20 }, (_, i) => {
  //     const lightness = 40 - i * 4; // decrease lightness for darker shades
  //     return `hsl(210, 100%, ${lightness}%)`;
  //   });

  const COLORS = [
    "#001957f7",
    "#002fa7f7",
    "#072777f7",
    "#003acef7",
    "#001e66f7",
    "#132e7ff7",
    "#001344f7",
    "#394e9ff7",
    "#465fb0f7",
    "#002266f7",
    "#001a55f7",
    "#243d8ff7",
    "#1a3577f7",
    "#27488ff7",
    "#123388f7",
    "#3f5a9ff7",
    "#2a458af7",
    "#1b2b6af7",
    "#081f50f7",
    "#355ba7f7",
  ];

  return (
    <>
      <Modal
        show={showDocumentTypeStats}
        onHide={handleClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">{currentPurpose}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div
            className="w-full d-flex flex-column justify-content-center align-items-center"
            style={{ height: "clamp(22rem, 25dvw, 30rem)" }}
          >
            {isLoading ? (
              <>
                <h5 className="m-0 d-flex flex-column justify-content-center align-items-center gap-2">
                  <span style={{ fontSize: "clamp(2rem, 5dvw, 3rem)" }}>
                    <i className="bx bx-loader-circle bx-spin"></i>
                  </span>{" "}
                  <span>Fetching document types</span>
                </h5>
              </>
            ) : (
              <>
                {documentTypeCounts.length > 0 ? (
                  <>
                    <ResponsiveContainer className="" width="100%" height="85%">
                      <BarChart
                        data={documentTypeCounts}
                        margin={{
                          top: 10,
                          right: 35,
                          left: 0,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" hide={true} />
                        <YAxis />
                        <Tooltip
                          dataKey="name"
                          formatter={(value, name) => [
                            <>
                              <p className="m-0">
                                Count: {value} (
                                {((value / documentTypes.length) * 100).toFixed(
                                  0
                                )}
                                %)
                              </p>
                            </>,
                          ]}
                          labelFormatter={(name) => `Document: ${name}`}
                        />
                        <Bar
                          dataKey="value"
                          fill="#001957f7"
                          radius={[8, 8, 0, 0]}
                        >
                          {documentTypeCounts.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    {/* <div className="mx-3">
                      <p className="m-0 text-center text-secondary">
                        {documentTypeCounts.map((entry, index) => (
                          <span className="me-3">
                            <span
                              style={{ color: COLORS[index % COLORS.length] }}
                            >
                              <i className="bx bxs-circle"></i>
                            </span>{" "}
                            {entry.value}
                          </span>
                        ))}
                      </p>
                    </div> */}
                  </>
                ) : (
                  <>
                    <h5 className="m-0">No document types found</h5>
                  </>
                )}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            <p className="m-0">Close</p>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentTypeStats;

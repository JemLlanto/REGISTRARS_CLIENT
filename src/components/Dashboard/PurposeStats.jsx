import React from "react";
import { Card, Spinner } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  Cell,
} from "recharts";

function PurposeStats({ requestedDocuments, isLoading }) {
  // Count documents by purpose
  const purposeCounts = requestedDocuments.reduce((counts, doc) => {
    const purpose = doc.purpose || "Unspecified";
    counts[purpose] = (counts[purpose] || 0) + 1;
    return counts;
  }, {});

  // Convert to array for charts
  const data = Object.entries(purposeCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Sort by count (highest first)
  data.sort((a, b) => b.value - a.value);

  // Colors for chart elements
  const COLORS = [
    "#001957f7",
    "#001344f7",
    "#3f5a9ff7",
    "#123388f7",
    "#072777f7",
    "##002fa7f7",
    "##003acef7",
    "#2a458af7",
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip p-3 shadow border"
          style={{
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #ddd",
            color: "#333",
            minWidth: "120px",
            textAlign: "center",
          }}
        >
          <p
            className="mb-1 fw-bold"
            style={{ fontSize: "14px", color: "#555" }}
          >
            {label}
          </p>
          <p
            className="mb-0"
            style={{
              fontSize: "13px",
              color: "var(--main-color)",
              fontWeight: "600",
            }}
          >
            Documents: <span style={{ color: "#333" }}>{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="bg-white  rounded mt-2 mb-5 w-100" style={{ height: "45dvh" }}>
        {isLoading ? (
          <>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100%" }}
            >
              <Spinner animation="border" variant="black" size="lg" />
            </div>
          </>
        ) : data.length > 0 ? (
          <div className="w-100" style={{ height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 60, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={0}
                  textAnchor="start"
                  height={0}
                  interval={0}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  name="Number of Documents"
                  radius={[8, 8, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div
            className="spinner-container d-flex justify-content-center align-items-center spinner-container"
            style={{ height: "100%" }}
          >
            <p className="text-muted m-0 p-3 mt-3">
              No document purposes to display for the selected period.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default PurposeStats;

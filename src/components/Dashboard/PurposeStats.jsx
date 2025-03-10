import React from "react";
import { Card } from "react-bootstrap";
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

function PurposeStats({ requestedDocuments }) {
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

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white p-2 shadow-sm border"
          style={{ borderRadius: "4px" }}
        >
          <p className="mb-0">
            <strong>{label}</strong>
          </p>
          <p className="mb-0">
            Documents: <strong>{payload[0].value}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="bg-white  rounded mt-2 w-100">
        {data.length > 0 ? (
          <div className="w-100" style={{ height: "200px" }}>
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
          <p className="text-muted m-0">
            No document purposes to display for the selected period.
          </p>
        )}
      </div>
    </>
  );
}

export default PurposeStats;

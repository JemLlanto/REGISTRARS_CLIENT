import React from "react";
import { Row, Col, FloatingLabel, Form } from "react-bootstrap";

const DateSelection = ({
  startDate,
  endDate,
  selectedPeriod,
  handlePeriodChange,
  setSelectedPeriod,
  setStartDate,
  setEndDate,
}) => {
  return (
    <div className="d-flex flex-wrap justify-content-between gap-2 w-100">
      <div className="flex-grow-1">
        <FloatingLabel controlId="floatingPeriod" label="Data report period">
          <Form.Select
            aria-label="Floating label select example"
            value={selectedPeriod}
            onChange={handlePeriodChange}
          >
            <option>Modified</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </Form.Select>
        </FloatingLabel>
      </div>

      <div className="flex-grow-1">
        <Form.Floating>
          <Form.Control
            id="startingPeriod"
            type="date"
            placeholder=""
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setSelectedPeriod("");
            }}
          />
          <label htmlFor="startingPeriod">Starting period:</label>
        </Form.Floating>
      </div>

      <div className="flex-grow-1">
        <Form.Floating>
          <Form.Control
            id="endingPeriod"
            type="date"
            placeholder=""
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setSelectedPeriod("");
            }}
          />
          <label htmlFor="endingPeriod">Ending period:</label>
        </Form.Floating>
      </div>
    </div>

  );
};

export default DateSelection;

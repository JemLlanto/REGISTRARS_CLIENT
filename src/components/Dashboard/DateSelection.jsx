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
    <Row className="w-100 mx-auto gap-2 ">
      <Col className="p-0">
        <FloatingLabel
          className="my-auto"
          controlId="floatingPeriod"
          label="Data report period"
        >
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
      </Col>
      <Col className="p-0">
        <Form.Floating className="mb-3">
          <Form.Control
            id="startingPeriod"
            type="date"
            placeholder=""
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value), setSelectedPeriod("");
            }}
          />
          <label htmlFor="startingPeriod">Starting period:</label>
        </Form.Floating>
      </Col>
      <Col className="p-0">
        <Form.Floating className="mb-3">
          <Form.Control
            id="endingPeriod"
            type="date"
            placeholder=""
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value), setSelectedPeriod("");
            }}
          />
          <label htmlFor="endingPeriod">Ending period:</label>
        </Form.Floating>
      </Col>
    </Row>
  );
};

export default DateSelection;

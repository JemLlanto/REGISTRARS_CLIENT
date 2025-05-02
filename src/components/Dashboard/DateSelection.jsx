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
      <div className="w-100 row mx-auto gap-2">
        <div className="col-md col-lg px-0">
          <FloatingLabel controlId="floatingPeriod" label="Data report period">
            <Form.Select
              aria-label="Floating label select example"
              value={selectedPeriod}
              onChange={(e) =>
                handlePeriodChange(
                  e,
                  setStartDate,
                  setEndDate,
                  setSelectedPeriod
                )
              }
            >
              <option value="">Modified</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </Form.Select>
          </FloatingLabel>
        </div>

        <div className="col-md-3 col-lg-3 px-0">
          <Form.Floating>
            <Form.Control
              id="startingPeriod"
              type="date"
              placeholder=""
              value={startDate}
              onChange={(e) => {
                const newStartDate = e.target.value;
                setStartDate(newStartDate);
                setSelectedPeriod("");
                // Get current timeFilters from localStorage
                const currentTimeFilters = localStorage.getItem("timeFilters")
                  ? JSON.parse(localStorage.getItem("timeFilters"))
                  : { period: "", start: "", end: "" };

                // Update the startDate in timeFilters
                const updatedTimeFilters = {
                  ...currentTimeFilters,
                  period: "",
                  start: newStartDate,
                };

                // Save back to localStorage
                localStorage.setItem(
                  "timeFilters",
                  JSON.stringify(updatedTimeFilters)
                );
              }}
            />
            <label htmlFor="startingPeriod">Starting period:</label>
          </Form.Floating>
        </div>

        <div className="col-md-3 col-lg-3 px-0">
          <Form.Floating>
            <Form.Control
              id="endingPeriod"
              type="date"
              placeholder=""
              value={endDate}
              onChange={(e) => {
                const newEndtDate = e.target.value;
                setEndDate(newEndtDate);
                setSelectedPeriod("");

                // Get current timeFilters from localStorage
                const currentTimeFilters = localStorage.getItem("timeFilters")
                  ? JSON.parse(localStorage.getItem("timeFilters"))
                  : { period: "", start: "", end: "" };

                // Update the startDate in timeFilters
                const updatedTimeFilters = {
                  ...currentTimeFilters,
                  period: "",
                  end: newEndtDate,
                };

                // Save back to localStorage
                localStorage.setItem(
                  "timeFilters",
                  JSON.stringify(updatedTimeFilters)
                );
              }}
            />
            <label htmlFor="endingPeriod">Ending period:</label>
          </Form.Floating>
        </div>
      </div>
    </div>
  );
};

export default DateSelection;

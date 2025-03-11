import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DateSelection from "../Dashboard/DateSelection";

function RequestDatepicker({
  startDate,
  endDate,
  selectedPeriod,
  setStartDate,
  setEndDate,
  setSelectedPeriod,
  handlePeriodChange
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle date changes from DateSelection component
  const handleDateChange = (newStartDate, newEndDate, newPeriod) => {
    // Update parent component state
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    if (newPeriod) {
      setSelectedPeriod(newPeriod);
    }

    // Close the modal automatically after date selection
    handleClose();
  };

  return (
    <>
      <Button style={{ backgroundColor: "var(--yellow-color)" }} onClick={handleShow} className="w-100 border-0">
        Set Date
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title className="text-white">Date Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <DateSelection
              startDate={startDate}
              endDate={endDate}
              selectedPeriod={selectedPeriod}
              handlePeriodChange={handlePeriodChange}
              setSelectedPeriod={setSelectedPeriod}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onDateChange={handleDateChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestDatepicker;
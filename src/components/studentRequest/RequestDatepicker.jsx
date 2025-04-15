import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DateSelection from "../Dashboard/DateSelection";

function RequestDatepicker({ startDate, endDate, selectedPeriod, handlePeriodChange, setSelectedPeriod, setStartDate, setEndDate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Add this handler to receive date from DateSelection
    const handleDateSelected = (selectedDate) => {
        // Pass the selected date up to parent component
        onDateChange(selectedDate);

        // Automatically close the modal after selection
        handleClose();
    };

    return (
        <>
            <Button onClick={handleShow} className="border-0 w-100 bg-warning">
                <p className="m-0">Set date</p>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)" }}>
                    <Modal.Title className="text-white">Date Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <DateSelection startDate={startDate}
                            endDate={endDate}
                            selectedPeriod={selectedPeriod}
                            handlePeriodChange={handlePeriodChange}
                            setSelectedPeriod={setSelectedPeriod}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate} />
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
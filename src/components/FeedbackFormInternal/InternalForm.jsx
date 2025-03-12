import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StepOne from "./Step1";
import StepTwo from "./Step2";
import StepThree from "./Step3";


function InternalFormModal() {
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(1); // Track form step

    const handleClose = () => {
        setShow(false);
        setStep(1); // Reset form step when closing
    };
    const handleShow = () => setShow(true);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <>
            <Button style={{ backgroundColor: "var(--yellow-color)" }} onClick={handleShow} className="border-0">
                Download Schedule Slip
            </Button>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)" }}>
                    <Modal.Title className="text-white">Feedback Form</Modal.Title>
                </Modal.Header>
                <Modal.Body className="w-100">
                    <form className="p-0 p-md-4 rounded-3 ">
                        {step === 1 && <StepOne />}
                        {step === 2 && <StepTwo />}
                        {step === 3 && <StepThree />}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {step > 1 && (
                        <Button variant="secondary" onClick={prevStep}>
                            Back
                        </Button>
                    )}
                    {step < 3 ? (
                        <Button variant="primary" onClick={nextStep}>
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" variant="success">
                            Submit
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InternalFormModal;
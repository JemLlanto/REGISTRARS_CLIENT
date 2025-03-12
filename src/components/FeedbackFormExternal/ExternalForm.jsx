import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ExternalFormModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button style={{ backgroundColor: "var(--yellow-color)" }} onClick={handleShow} className="w-100 border-0">
                Open Form
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)" }}>
                    <Modal.Title className="text-white">External Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add your form or external component here */}
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

export default ExternalFormModal;
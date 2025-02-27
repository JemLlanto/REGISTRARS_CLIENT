import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PurposeCollapse from "../accordion/PurposeCollapse";

function purposeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="w-100">
        View More
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>View More</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <PurposeCollapse></PurposeCollapse>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default purposeModal;

import { use, useEffect, useState } from "react";
import { Button, Accordion, Modal } from "react-bootstrap";
import axios from "axios";

function purposeModal() {
  const [show, setShow] = useState(false);
  const [purposes, setPurposes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fetchingDocuments/fetchPurposes")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setPurposes(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching purposes:", err);
      });
  }, []);

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
          <div
            className="d-flex flex-column gap-1 overflow-y-scroll p-2"
            style={{ height: "60dvh" }}
          >
            {purposes.map((purpose) => (
              <Accordion key={purpose.purposeID}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{purpose.purposeName}</Accordion.Header>
                  <Accordion.Body>
                    <div>this is for type of documents</div>

                    <div>this is for uploading file</div>

                    <div>this is for inputs</div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
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

import React from "react";
import { Modal, Button } from "react-bootstrap";

const PrivacyPolicyModal = ({
  showModal,
  handleCloseModal,
  handleAcceptCookie,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="overflow-x-hidden overflow-y-auto d-flex flex-column gap-1 justify-content-start align-items-center"
        style={{ height: "20rem" }}
      >
        <div>
          <h5 className="fw-bold m-0" style={{ color: "var(--main-color)" }}>
            Data Privacy Consent
          </h5>

          <p className="m-0">
            In compliance with the requirements of the Data Privacy Act of 2012,
            the Cavite State University – CCAT Campus Office of the Registrar
            commits to ensuring that all personal information obtained will be
            secured and remain confidential. Collected personal information will
            only be utilized for purposes of documentation and research, if
            applicable, and facilitation of future transactions. The personal
            information shall not be shared or disclosed with other parties
            without consent unless the disclosure is required by, or in
            compliance with, applicable laws and regulations.
          </p>
        </div>
        <div>
          <h5 className="fw-bold m-0" style={{ color: "var(--main-color)" }}>
            What Information We Collect
          </h5>

          <p className="m-0">
            Our website collect personal information from students including
            their email address, full name, gender, date of birth, mobile
            number, academic program or course, school ID number, purpose of the
            request, last school year attended, year of graduation, and current
            year level.
          </p>
        </div>
        <div>
          <h5 className="fw-bold m-0" style={{ color: "var(--main-color)" }}>
            Use of your personal information
          </h5>

          <p className="m-0">
            Our website use your personal information to facilitate document
            requests and to ensure that any data you provide is retained, even
            in the event of an unexpected page refresh or internet
            disconnection. This helps prevent data loss and enhances your user
            experience.
          </p>
        </div>
        <div>
          <h5 className="fw-bold m-0" style={{ color: "var(--main-color)" }}>
            Who Has Access
          </h5>

          <p className="m-0">
            Only authorized Registrar’s Office personnel can access the
            submitted data. No data is shared with third parties without your
            consent unless legally required.
          </p>
        </div>
        <div>
          <h5 className="fw-bold m-0" style={{ color: "var(--main-color)" }}>
            Contact Information
          </h5>

          <p className="m-0">
            If you have any concerns or questions about how your data is
            handled, contact us at{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&to=registrar@cvsu-rosario.edu.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-underline"
              style={{ color: "var(--main-color)" }}
            >
              registrar@cvsu-rosario.edu.ph
            </a>
            .
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          <p className="m-0">Close</p>
        </Button>
        <Button className="primaryButton border-0" onClick={handleAcceptCookie}>
          <p className="m-0">Accept</p>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrivacyPolicyModal;

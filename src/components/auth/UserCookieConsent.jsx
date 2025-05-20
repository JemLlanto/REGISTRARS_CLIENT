import React, { useState } from "react";
import { CloseButton, Offcanvas } from "react-bootstrap";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const CookieConsent = () => {
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="bottom"
        style={{ height: "auto", minHeight: 100, maxHeight: 240 }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <h5>Cookie Consent</h5>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          className="d-flex align-items-center"
          style={{ paddingTop: 0 }}
        >
          {/* Badge/Logo */}
          {/* <div className="me-3 d-flex align-items-center">
                    <img
                        src="/dpo-badge.png" // Replace with your badge path
                        alt="DPO/DPS Badge"
                        style={{ width: 70, height: 'auto' }}
                    />
                </div> */}
          {/* Message and Links */}
          <div style={{ flex: 1 }}>
            <div className="mb-2 d-flex align-items-center gap-2">
              <i className='bx bx-sm bx-error' style={{ color: 'orange' }}></i>
              <p className="m-0">
                Our website uses cookies to improve your experience. By
                continuing, you have read and agree to our{' '}
                <span
                  style={{ color: "var(--main-color)", textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
                >
                  Privacy Policy
                </span>.
              </p>
            </div>
          </div>
          {/* Buttons */}
          <div className="d-flex justify-content-center align-items-center gap-3">
            <button
              className="btn primaryButton"
              style={{
                minWidth: 100,
                backgroundColor: "var(--main-color)",
                color: "white",
              }}
              onClick={() => {
                setShow(false);
              }}
            >
              <p className="m-0">Accept</p>
            </button>
            <CloseButton className="m-0" onClick={() => setShow(false)} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <PrivacyPolicyModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default CookieConsent;

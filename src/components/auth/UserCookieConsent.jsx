import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";

const CookieConsent = () => {
  const [show, setShow] = useState(true);

  return (
    <Offcanvas
      show={show}
      onHide={() => setShow(false)}
      placement="bottom"
      style={{ height: "auto", minHeight: 100, maxHeight: 240 }}
    >
      <Offcanvas.Header closeButton>
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
          <div className="mb-2" style={{ fontSize: 15 }}>
            <p>
              our website uses cookies to improve your experience. By
              continuing, you have read and agree to our Privacy Policy.
            </p>
          </div>
        </div>
        {/* Buttons */}
        <div className="ms-3 d-flex flex-column gap-2 align-items-end">
          <button
            className="btn  w-100"
            style={{
              borderRadius: 20,
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
          <button
            className="btn  w-100"
            style={{
              borderRadius: 20,
              minWidth: 100,
              backgroundColor: "var(--main-color)",
              color: "white",
            }}
            onClick={() => {
              setShow(false);
            }}
          >
            <p className="m-0">Reject</p>
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CookieConsent;

import React, { useEffect, useState } from "react";
import { CloseButton, Offcanvas } from "react-bootstrap";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const closeOffCanvass = () => {
    setShow(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setShow(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShow(true);
  };

  const handleAcceptCookie = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
    setShowModal(false);
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={closeOffCanvass}
        placement="bottom"
        style={{ height: "auto", minHeight: 100, maxHeight: 240 }}
      >
        <Offcanvas.Body
          className="d-flex align-items-center py-2 px-3"
          style={{ paddingTop: 0 }}
        >
          {/* Message and Links */}
          <div className="d-none d-md-block" style={{ flex: 1 }}>
            <div className="d-flex align-items-center gap-2">
              <h2 className="m-0 me-1">
                <span className="d-flex align-items-center justify-content-center">
                  <i className="bx bx-info-circle"></i>
                </span>
              </h2>

              <div>
                <h5 className="m-0">Privacy Policy</h5>
                <p className="m-0">
                  Our website uses cookies to improve your experience. By
                  continuing, you have read and agree to our{" "}
                  <span
                    style={{
                      color: "var(--main-color)",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={handleShowModal}
                  >
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>



          <div className="d-block d-md-none" style={{ flex: 1 }}>
            <div className="d-flex justify-content-center text-center align-items-center gap-2 position-relative">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <i className="bx bx-info-circle"></i>
                <h5 className="m-0">Privacy Policy</h5>
              </div>
              <div className="position-absolute d-flex align-items-center" style={{ right: "0" }}>
                <CloseButton className="m-0" onClick={() => setShow(false)} />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 flex-column">
              <p className="m-0 text-center">
                Our website uses cookies to improve your experience. By
                continuing, you have read and agree to our{" "}
                <span
                  style={{
                    color: "var(--main-color)",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleShowModal}
                >
                  Privacy Policy
                </span>
                .
              </p>
              <button
                className="btn primaryButton"
                style={{
                  minWidth: 100,
                  backgroundColor: "var(--main-color)",
                  color: "white",
                }}
                onClick={handleAcceptCookie}
              >
                <p className="m-0">Accept</p>
              </button>
            </div>
          </div>
          {/* Buttons */}
          <div className="d-flex justify-content-center align-items-center gap-3 d-none d-md-block">
            <button
              className="btn primaryButton"
              style={{
                minWidth: 100,
                backgroundColor: "var(--main-color)",
                color: "white",
              }}
              onClick={handleAcceptCookie}
            >
              <p className="m-0">Accept</p>
            </button>
            <CloseButton className="m-0 mx-0" onClick={() => setShow(false)} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <PrivacyPolicyModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAcceptCookie={handleAcceptCookie}
      />
    </>
  );
};

export default CookieConsent;

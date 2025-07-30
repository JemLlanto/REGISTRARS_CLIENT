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
        style={{
          height: "auto", minHeight: 200, maxHeight: 280,
          width: 500,
        }}
        className="rounded-2 m-2 d-none d-md-block"
      >
        <Offcanvas.Body
          className="d-flex align-items-center justify-content-center py-2 px-3"
        >
          {/* Message and Links */}
          <div className=" " style={{ flex: 1 }}>
            <div className="d-flex">
              <h2 className="m-0 me-2">
                <span className="d-flex align-items-center justify-content-center">
                  {/* <i className="bx bx-info-circle"></i> */}
                  <img src="./DPO.jpg" alt="DPO/DPS" className="" style={{ height: "180px" }} />
                </span>
              </h2>

              <div className="">
                <div className="d-flex justify-content-between">
                  <h5 className="m-0">Privacy Policy</h5>
                  <CloseButton className="" onClick={() => setShow(false)} />
                </div>
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
              {/* Buttons */}
              <div className="d-flex justify-content-center  align-items-center gap-3 d-none d-md-block position-relative">
                <button
                  className="btn primaryButton position-absolute"
                  style={{
                    minWidth: 100,
                    backgroundColor: "var (--main-color)",
                    color: "white",
                    right: "0",
                    bottom: "0"
                  }}
                  onClick={handleAcceptCookie}
                >
                  <p className="m-0">Accept</p>
                </button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>





      <Offcanvas
        show={show}
        onHide={closeOffCanvass}
        placement="bottom"
        className="d-block d-md-none m-2 rounded-2"
        style={{
          height: "auto"
        }}
      >
        <Offcanvas.Body
          className="d-flex align-items-center justify-content-center "
        >
          <div className="d-block d-md-none " style={{ flex: 1 }}>
            <div className="d-flex justify-content-center text-center align-items-center gap-2 position-relative">
              <div className="d-flex align-items-center justify-content-center flex-column gap-2">
                <h2 className="m-0 me-2">
                  <span className="d-flex align-items-center justify-content-center">
                    {/* <i className="bx bx-info-circle"></i> */}
                    <img src="./DPO.jpg" alt="DPO/DPS" className="" style={{ height: "120px" }} />
                  </span>
                </h2>
                <h5 className="m-0">Privacy Policy</h5>
              </div>
              <div className="position-absolute d-flex align-items-center" style={{ right: "0", top: "0" }}>
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

import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import RequestTableTemplate from "../RequestTableTemplate";

const Processing = ({ totalRequest, processingRequests, CountUp }) => {
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (totalRequest === 0) {
      setPercentage(0);
    } else {
      const percent = (processingRequests.length / totalRequest) * 100;
      setPercentage(percent);
    }
  }, [processingRequests, totalRequest]);

  const handleShowModal = () => {
    setShowPendingModal(true);
  };
  const handleCloseModal = () => {
    setShowPendingModal(false);
  };
  return (
    <>
      <button
        className="border-0 bg-transparent w-100 p-1"
        onClick={handleShowModal}
      >
        <div className="card-hover shadow-sm rounded p-3 h-100 bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center justify-content-start">
              <p className="text-dark m-0">
                Processing(
                <span className="m-0">
                  <CountUp end={percentage.toFixed(0)} duration={1.5} />%
                </span>
                )
              </p>
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "clamp(2rem, 5dvh, 5rem)",
                height: "clamp(2rem, 5dvh, 5rem)",
                // backgroundColor: "var(--main-color)",
                color: "var(--main-color)",
              }}
            >
              <h4 className="m-0 d-flex justify-content-center align-items-center">
                <i className="bx bxs-analyse"></i>
              </h4>
            </div>
          </div>

          <div className="text-start mt-2">
            <h4 className="text-primary m-0">
              <CountUp end={processingRequests.length} duration={1.5} />
            </h4>
          </div>
        </div>
      </button>

      <Modal
        show={showPendingModal}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title>
            <h5 className="m-0 text-white">
              Processing ({processingRequests.length})
            </h5>
          </Modal.Title>
        </Modal.Header>
        <RequestTableTemplate Requests={processingRequests} />
        <Modal.Footer>
          <Button
            className="border-0"
            variant="secondary"
            onClick={handleCloseModal}
          >
            <p className="m-0">Close</p>
          </Button>
          <Button
            className="border-0"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            <Link
              className="text-decoration-none text-white"
              to="/admin/student-requests?status=processing"
            >
              <p className="m-0">View All</p>
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Processing;

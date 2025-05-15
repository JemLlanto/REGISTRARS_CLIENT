import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import RequestTableTemplate from "../RequestTableTemplate";

const Pending = ({ pendingRequests, CountUp }) => {
  const [showPendingModal, setShowPendingModal] = useState(false);

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
        <div
          className="card-hover shadow-sm rounded p-3 h-100"
          style={{
            backgroundColor: "var(--main-color)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-white m-0">Pending</p>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "clamp(2rem, 5dvh, 5rem)",
                height: "clamp(2rem, 5dvh, 5rem)",
                backgroundColor: "var(--secondMain-color)",
                color: "var(--main-color)",
              }}
            >
              <h4 className="m-0 d-flex justify-content-center align-items-center">
                <i className="bx bxs-timer rounded-circle"></i>
              </h4>
            </div>
          </div>

          <div className="text-start mt-2">
            <h4 className="text-warning m-0">
              <CountUp end={pendingRequests.length} duration={1.5} />
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
              Pending ({pendingRequests.length})
            </h5>
          </Modal.Title>
        </Modal.Header>
        {/* RequestTableTemplate */}
        <RequestTableTemplate Requests={pendingRequests} />

        <Modal.Footer>
          <Button
            className="border-0"
            variant="secondary"
            onClick={handleCloseModal}
          >
            <p className="m-0"> Close</p>
          </Button>
          <Button
            className="border-0"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            <Link
              className="text-decoration-none text-white"
              to="/admin/student-requests?status=pending"
            >
              <p className="m-0">View All</p>
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Pending;

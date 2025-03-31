import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import RequestTableTemplate from "../RequestTableTemplate";

const Completed = ({ completedRequests }) => {
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
        className="border-0 bg-transparent w-100 p-0"
        onClick={handleShowModal}
      >
        <div className="card-hover shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
          <div
            className=" text-white  d-flex justify-content-center align-items-center p-3"
            style={{ width: "60px", height: "60px" }}
          >
            <i
              className="bx bxs-user-check fs-3 rounded-circle p-3"
              style={{ backgroundColor: "var(--main-color)" }}
            ></i>
          </div>
          <div className="ms-3 text-start">
            <h5 className="text-success mb-1">{completedRequests.length}</h5>
            <h5 className="text-dark">Completed</h5>
          </div>
        </div>
      </button>

      <Modal
        show={showPendingModal}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title>
            <h5 className="m-0 text-white">
              Completed request ({completedRequests.length})
            </h5>
          </Modal.Title>
        </Modal.Header>
        <RequestTableTemplate Requests={completedRequests} />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">
            <Link
              className="text-decoration-none text-white"
              to="/admin/student-requests?status=completed"
            >
              View All
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Completed;

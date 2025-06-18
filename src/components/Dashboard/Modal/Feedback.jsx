import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Feedback = ({ feedbackData, type }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <button className="btn btn-sm primaryButton" onClick={handleShow}>
        <p className="m-0">View</p>
      </button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title>
            <h5 className="m-0 text-white">
              {type} Feedback ({feedbackData?.length})
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="overflow-x-hidden overflow-y-auto"
          style={{ height: "50dvh" }}
        >
          <Table striped bordered hover>
            <thead className="">
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.length > 0 ? (
                <>
                  {feedbackData.map((request, index) => (
                    <tr className="align-middle" key={index}>
                      <td>
                        <p className="m-0">
                          {request.firstName} {request.middleName}{" "}
                          {request.lastName}
                        </p>
                      </td>
                      <td>
                        <p
                          className={`m-0 ${
                            request.responded ? "text-success" : "text-danger"
                          }`}
                        >
                          {request.responded ? "Answered" : "Unanswered"}
                        </p>
                      </td>
                      <td>
                        <div className="text-center">
                          <Link
                            style={{ backgroundColor: "var(--main-color)" }}
                            className="btn text-decoration-none text-white"
                            to={`/request-details/${request.requestID}`}
                          >
                            <p className="m-0">View</p>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr className="align-middle">
                    <td colSpan={3}>
                      <p className="m-0">No data to display.</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        </Modal.Body>{" "}
        <Modal.Footer>
          <Button
            variant="secondary"
            className="border-0"
            onClick={handleClose}
          >
            <p className="m-0">Close</p>
          </Button>
          <Button
            className="border-0"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            <Link
              className="text-decoration-none text-white"
              to="/admin/student-requests?status=completed"
            >
              <p className="m-0">View All</p>
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Feedback;

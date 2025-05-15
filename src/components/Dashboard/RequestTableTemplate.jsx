import React from "react";
import { Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const RequestTableTemplate = ({ Requests }) => {
  return (
    <Modal.Body
      className="overflow-x-hidden overflow-y-auto"
      style={{ height: "50dvh" }}
    >
      <Table striped bordered hover>
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Requests.length > 0 ? (
            <>
              {Requests.map((request, index) => (
                <tr className="align-middle" key={index}>
                  <td>
                    <p className="m-0">
                      {request.firstName} {request.middleName}{" "}
                      {request.lastName}
                    </p>
                  </td>
                  <td>
                    <p className="m-0">{request.purpose}</p>
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
              <tr className="align-middle text-center">
                <td colSpan={3}>
                  <p className="m-0">No data to display.</p>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </Modal.Body>
  );
};

export default RequestTableTemplate;

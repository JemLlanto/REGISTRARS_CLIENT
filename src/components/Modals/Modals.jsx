import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function AdminModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="w-100">
        View More
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* <table className="">
              <div className="d-flex  justify-content-between gap-3">
                <div>
                  <p> Project/course</p>
                </div>
                <div>
                  <tr className="">BS Electrical Engineering</tr>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-success text-white ">Edit</button>
                  <button className="btn btn-danger text-white ">Delete</button>
                </div>
              </div>
            </table> */}
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th>Program/Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> BS Electrical Engineering</td>
                  <td className="d-flex justify-content-end gap-2">
                    {" "}
                    <button className="btn btn-success text-white ">
                      Edit
                    </button>
                    <button className="btn btn-danger text-white ">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>BS Computer Engineering</td>
                  <td className="d-flex justify-content-end gap-2">
                    {" "}
                    <button className="btn btn-success text-white ">
                      Edit
                    </button>
                    <button className="btn btn-danger text-white ">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>BS Computer Science</td>
                  <td className="d-flex justify-content-end gap-2">
                    {" "}
                    <button className="btn btn-success text-white ">
                      Edit
                    </button>
                    <button className="btn btn-danger text-white ">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminModal;

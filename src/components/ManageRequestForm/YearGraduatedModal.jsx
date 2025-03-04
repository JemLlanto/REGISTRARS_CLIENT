import { use, useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";

function YearGraduatedModal() {
  const [show, setShow] = useState(false);
  const [yearGraduated, setYearGraduated] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fetchingDocuments/fetchYearGraduated")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
          setYearGraduated(res.data.data);
        } else if (res.data.Message) {
          console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching yearGraduated:", err);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="w-100">
        View More
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>View More</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex flex-column gap-1 overflow-y-scroll p-2"
            style={{ height: "60dvh" }}
          >
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th className="">Program/Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {yearGraduated.map((year) => (
                  <tr key={year.year_graduatedID}>
                    <td>{year.yearOption}</td>
                    <td className="d-flex justify-content-end gap-2">
                      <button className="btn btn-success text-white ">
                        Edit
                      </button>
                      <button className="btn btn-danger text-white ">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
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

export default YearGraduatedModal;

import { use, useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";

function YearGraduatedModal() {
  const [showYear, setShowYear] = useState(false);
  const [yearGraduated, setYearGraduated] = useState([]);
  const [editYear, setEditYear] = useState(null);
  const [addYear, setAddYear] = useState(false);
  const [formData, setFormData] = useState({
    YearName: "",
  });

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

  const handleCloseYear = () => setShowYear(false);
  const handleShowYear = () => setShowYear(true);

  return (
    <>
      <Button
        className="shadow-sm p-3  d-flex justify-content-between align-items-center"
        variant="light"
        onClick={handleShowYear}
      >
        <h5 className="m-0">Year Graduated</h5>
        <h4 className="m-0 d-flex align-items-center">
          <i class="bx bxs-chevron-right"></i>
        </h4>
      </Button>

      <Modal size="lg" show={showYear} onHide={handleCloseYear} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Manage Year Graduated</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex flex-column gap-1 overflow-y-scroll p-2"
            style={{ height: "60dvh" }}
          >
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th className="">
                    <h5 className="m-0 fw-bold">Year Graduated</h5>
                  </th>
                  <th className="text-center align-middle">
                    <h5 className="m-0 fw-bold">Action</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {yearGraduated.map((year) => (
                  <tr key={year.year_graduatedID}>
                    <td className="align-middle">{year.yearOption}</td>
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
          <Button variant="secondary" onClick={handleCloseYear}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseYear}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default YearGraduatedModal;

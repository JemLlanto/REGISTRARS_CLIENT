import { use, useEffect, useState } from "react";
import { Button, Table, Modal, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";

function YearGraduatedModal() {
  const [showYear, setShowYear] = useState(false);
  const [yearGraduated, setYearGraduated] = useState([]);
  const [editYear, setEditYear] = useState(null);
  const [addYear, setAddYear] = useState(false);
  const [formData, setFormData] = useState({
    yearOption: "",
  });

  const handleAddYear = () => {
    setAddYear(true);
    setShowYear(false);
  };
  const handleCancelAddYear = () => {
    setAddYear(false);
    setShowYear(true);
  };

  const handleEditYear = (year) => {
    setEditYear(year.yearGraduatedID);
    setFormData({
      yearOption: year.yearOption,
      yearGraduatedID: year.yearGraduatedID,
    });
  };

  const fetchYearGraduated = () => {
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
  };

  useEffect(() => {
    fetchYearGraduated();
  }, []);

  const handleCloseYear = () => setShowYear(false);
  const handleShowYear = () => setShowYear(true);

  const handleSaveYear = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/documents/addYear", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          setAddYear(false);
          setShowYear(true);
          setFormData({ yearOption: "" });
          fetchYearGraduated();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
          setFormData({ yearOption: "" });
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding year:", err);
      });
  };
  const handleUpdateYear = () => {
    axios
      .post("http://localhost:5000/api/documents/updateYear", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          setEditYear(null);
          setFormData({ yearOption: "", yearGraduatedID: "" });
          fetchYearGraduated();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error updating year:", err);
      });
  };
  const handleDeleteYear = (yearGraduatedID, yearOption) => {
    if (!window.confirm(`Are you sure you want to delete ${yearOption}?`))
      return;

    axios
      .post("http://localhost:5000/api/documents/deleteYear", {
        yearGraduatedID,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          fetchYearGraduated();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding year:", err);
      });
  };

  return (
    <>
      <Button
        className="shadow-sm p-2 w-100  d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "var(--main-color)" }}
        onClick={handleShowYear}
      >
        <h5 className="m-0 ms-3">customize</h5>
        <h4 className="m-0 d-flex align-items-center">
          <i class="bx bxs-chevron-right me-2"></i>
        </h4>
      </Button>

      {/* MODAL FOR VIEWING YEAR */}
      <Modal show={showYear} onHide={handleCloseYear} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title>
            <h4 className="m-0 text-white">Manage Year Graduated</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex flex-column gap-1 overflow-y-scroll overflow-x-hidden"
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
                  <tr key={year.yearGraduatedID}>
                    <td className="align-middle">
                      {editYear === year.yearGraduatedID ? (
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Year Name"
                          className=""
                        >
                          <Form.Control
                            type="text"
                            name="yearOption"
                            value={formData.yearOption}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                yearOption: e.target.value,
                              })
                            }
                          />
                        </FloatingLabel>
                      ) : (
                        <p className="m-0">{year.yearOption}</p>
                      )}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center gap-1">
                        {editYear === year.yearGraduatedID ? (
                          <>
                            <button
                              className="btn btn-success text-white "
                              onClick={() => setEditYear(false)}
                            >
                              <p className="m-0">Cancel</p>
                            </button>
                            <button
                              className="btn btn-danger text-white "
                              onClick={() => handleUpdateYear()}
                            >
                              <p className="m-0">Save</p>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-success text-white "
                              onClick={() => handleEditYear(year)}
                            >
                              <p className="m-0">Edit</p>
                            </button>
                            <button
                              className="btn btn-danger text-white "
                              onClick={() =>
                                handleDeleteYear(
                                  year.yearGraduatedID,
                                  year.yearOption
                                )
                              }
                            >
                              <p className="m-0">Delete</p>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseYear}>
            <p className="m-0">Close</p>
          </Button>
          <Button style={{ backgroundColor: "var(--main-color)" }} onClick={handleAddYear}>
            <p className="m-0">Add Year</p>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL FOR ADDING YEAR */}
      <Modal show={addYear} onHide={handleCancelAddYear} centered size="">
        <Modal.Header style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title>
            <h4 className="m-0 text-white">Add Year</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Year Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="yearOption"
              value={formData.yearOption}
              onChange={(e) =>
                setFormData({ ...formData, yearOption: e.target.value })
              }
              placeholder="name@example.com"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelAddYear}>
            <p className="m-0">Cancel</p>
          </Button>
          <Button style={{ backgroundColor: "var(--main-color)" }} onClick={handleSaveYear}>
            <p className="m-0">Save</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default YearGraduatedModal;

import { use, useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  FloatingLabel,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function YearGraduatedModal() {
  const [showYear, setShowYear] = useState(false);
  const [yearGraduated, setYearGraduated] = useState([]);
  const [editYear, setEditYear] = useState(null);
  const [addYear, setAddYear] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [formData, setFormData] = useState({
    yearOption: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddYear = () => {
    setFormData({
      yearOption: "",
    });
    setEditYear(null);
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
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchYearGraduated`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // // console.log(res.data.data);
          setYearGraduated(res.data.data);
        } else if (res.data.Message) {
          // console.log("Error: ", res.data.Message);
        }
      })
      .catch((err) => {
        // console.log("Error fetching yearGraduated:", err);
      });
  };

  useEffect(() => {
    fetchYearGraduated();
  }, []);

  const handleCloseYear = () => setShowYear(false);
  const handleShowYear = () => setShowYear(true);

  const handleSaveYear = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/addYear`,
        formData
      );

      if (res.data.Status === "Success") {
        Swal.fire("Success!", res.data.Message, "success");
        setAddYear(false);
        setShowYear(true);
        setFormData({ yearOption: "" });
        fetchYearGraduated();
      } else {
        Swal.fire("Error!", res.data.Message, "error");
        setFormData({ yearOption: "" });
      }
    } catch (err) {
      // console.log("Error adding year:", err);
      Swal.fire("Error!", "Failed to add year.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateYear = async (yearOption) => {
    try {
      setIsLoading(true);
      setSelectedYear(yearOption);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/updateYear`,
        formData
      );

      if (res.data.Status === "Success") {
        Swal.fire("Updated!", res.data.Message, "success");
        setEditYear(null);
        setFormData({ yearOption: "", yearGraduatedID: "" });
        fetchYearGraduated();
      } else {
        Swal.fire("Error!", res.data.Message, "error");
      }
    } catch (err) {
      // console.log("Error updating year:", err);
      Swal.fire("Error!", "Failed to update year.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteYear = async (yearGraduatedID, yearOption) => {
    const confirmation = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to delete "${yearOption}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmation.isConfirmed) {
      try {
        setIsLoading(true);
        setSelectedYear(yearOption);
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/documents/deleteYear`,
          { yearGraduatedID }
        );

        if (res.data.Status === "Success") {
          Swal.fire("Deleted!", res.data.Message, "success");
          fetchYearGraduated();
        } else {
          Swal.fire("Error!", res.data.Message, "error");
        }
      } catch (err) {
        // console.log("Error deleting year:", err);
        Swal.fire("Error!", "Failed to delete year.", "error");
      } finally {
        setSelectedYear("");
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Button
        className="customize-section customize shadow-sm p-2 w-100 border-0 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "var(--main-color)" }}
        onClick={handleShowYear}
      >
        <h5 className="m-0 ms-3">customize</h5>
        <h4 className="m-0 d-flex align-items-center">
          <i className="bx bxs-chevron-right me-2"></i>
        </h4>
      </Button>

      {/* MODAL FOR VIEWING YEAR */}
      <Modal show={showYear} onHide={handleCloseYear} centered size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title>
            <h5 className="m-0 text-white">Manage Year Graduated</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1 p-md-3">
          <div
            className="custom-scrollbar d-flex flex-column gap-1 overflow-y-scroll overflow-x-hidden"
            style={{ height: "60dvh" }}
          >
            <Table striped bordered hover variant="white" className="m-0">
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
                              className="btn btn-sm btn-secondary text-white px-2 px-md-3"
                              onClick={() => setEditYear(false)}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">
                                  Cancel
                                </span>
                                <span className="d-md-none d-flex justify-content-center align-items-center">
                                  <i className="bx bx-x iconFont"></i>
                                </span>
                              </p>
                            </button>
                            <button
                              className="btn btn-sm btn-success text-white px-2 px-md-3 d-flex justify-content-center align-items-center gap-1"
                              onClick={() => handleUpdateYear(year.yearOption)}
                              disabled={year.yearOption === formData.yearOption}
                            >
                              {isLoading && year.yearOption === selectedYear ? (
                                <>
                                  <Spinner
                                    animation="border"
                                    variant="light"
                                    size="sm"
                                  />
                                  <p className="m-0">
                                    <span className="d-none d-md-block">
                                      Saving
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <p className="m-0">
                                  <span className="d-none d-md-block">
                                    Save
                                  </span>
                                  <span className="d-md-none d-flex justify-content-center align-items-center">
                                    <i className="bx bx-save iconFont"></i>
                                  </span>
                                </p>
                              )}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-success text-white px-2 px-md-3"
                              onClick={() => handleEditYear(year)}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">Edit</span>
                                <span className="d-md-none d-flex justify-content-center align-items-center">
                                  <i className="bx bx-edit-alt iconFont"></i>
                                </span>
                              </p>
                            </button>
                            <button
                              className="btn btn-sm btn-danger text-white  px-2 px-md-3 d-flex justify-content-center align-items-center gap-1"
                              onClick={() =>
                                handleDeleteYear(
                                  year.yearGraduatedID,
                                  year.yearOption
                                )
                              }
                            >
                              {isLoading && selectedYear === year.yearOption ? (
                                <>
                                  <Spinner
                                    animation="border"
                                    variant="light"
                                    size="sm"
                                  />
                                  <p className="m-0">
                                    <span className="d-none d-md-block">
                                      Deleting
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <p className="m-0">
                                  <span className="d-none d-md-block">
                                    Delete
                                  </span>
                                  <span className="d-md-none d-flex justify-content-center align-items-center">
                                    <i className="bx bx-trash iconFont"></i>
                                  </span>
                                </p>
                              )}
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
          <Button
            className="border-0"
            variant="secondary"
            onClick={handleCloseYear}
          >
            <p className="m-0">Close</p>
          </Button>
          <button className="btn primaryButton" onClick={handleAddYear}>
            <p className="m-0">Add Year</p>
          </button>
        </Modal.Footer>
      </Modal>

      {/* MODAL FOR ADDING YEAR */}
      <Modal show={addYear} onHide={handleCancelAddYear} centered size="">
        <Modal.Header style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title>
            <h5 className="m-0 text-white">Add Year</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Year Name">
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
          <button
            className="btn primaryButton d-flex justify-content-center align-items-center gap-1"
            disabled={formData.yearOption === "" || isLoading}
            onClick={handleSaveYear}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />
                <p className="m-0">Saving</p>
              </>
            ) : (
              <>
                <p className="m-0">Save</p>
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default YearGraduatedModal;

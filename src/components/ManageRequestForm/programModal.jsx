import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Form, FloatingLabel, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

function programModal() {
  const [showProgram, setShowProgram] = useState(false);
  const [editProgram, setEditProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [addProgram, setAddProgram] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [formData, setFormData] = useState({
    programName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrograms = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/fetchingDocuments/fetchPrograms`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setPrograms(res.data.data);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error fetching Programs: ", err);
      });
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleAddProgram = () => {
    setFormData({
      programName: "",
    });
    setAddProgram(true);
    setShowProgram(false);
    setEditProgram(null);
  };
  const handleCancelAddProgram = () => {
    setAddProgram(false);
    setShowProgram(true);
  };

  const handleEditProgram = (program) => {
    setEditProgram(program.programID);
    setFormData({
      programName: program.programName,
      programID: program.programID,
    });
  };

  const handleCloseProgram = () => setShowProgram(false);
  const handleShowProgram = () => setShowProgram(true);

  const handleSaveProgram = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/addProgram`,
        formData
      );
      if (res.data.Status === "Success") {
        Swal.fire("Success!", res.data.Message, "success");
        setAddProgram(false);
        setShowProgram(true);
        setFormData({ programName: "" });
        fetchPrograms();
      } else {
        Swal.fire("Error!", res.data.Message, "error");
        setFormData({ programName: "" });
      }
    } catch (err) {
      console.log("Error adding program:", err);
      Swal.fire("Error!", "Failed to add program.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProgram = async (programName) => {
    try {
      setIsLoading(true);
      setSelectedProgram(programName);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/documents/updateProgram`,
        formData
      );

      if (res.data.Status === "Success") {
        Swal.fire("Updated!", res.data.Message, "success");
        setEditProgram(null);
        setFormData({ programName: "", programID: "" });
        fetchPrograms();
      } else {
        Swal.fire("Error!", res.data.Message, "error");
      }
    } catch (err) {
      console.log("Error updating program:", err);
      Swal.fire("Error!", "Failed to update program.", "error");
    } finally {
      setSelectedProgram("");
      setIsLoading(false);
    }
  };

  const handleDeleteProgram = async (programID, programName) => {
    const confimation = Swal.fire({
      title: `Are you sure?`,
      text: `You are about to delete "${programName}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if ((await confimation).isConfirmed) {
      try {
        setIsLoading(true);
        setSelectedProgram(programName);
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/documents/deleteProgram`,
          { programID }
        );

        if (res.data.Status === "Success") {
          Swal.fire("Deleted!", res.data.Message, "success");
          fetchPrograms();
        } else {
          Swal.fire("Error!", res.data.Message, "error");
        }
      } catch (err) {
        console.log("Error deleting program:", err);
        Swal.fire("Error!", "Failed to delete program.", "error");
      } finally {
        setSelectedProgram("");
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="w-100 mx-0">
        <Button
          className="customize-section customize shadow-sm p-2 w-100 border-0 d-flex justify-content-between align-items-center "
          style={{ backgroundColor: "var(--main-color)" }}
          onClick={handleShowProgram}
        >
          <h5 className="m-0 ms-3">customize</h5>
          <h4 className="m-0 d-flex align-items-center">
            <i className="bx bxs-chevron-right me-2"></i>
          </h4>
        </Button>
      </div>

      {/* MODAL FOR VIEWING PROGRAMS */}
      <Modal show={showProgram} onHide={handleCloseProgram} centered size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title>
            <h5 className="m-0 text-white">Manage Program and Course</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1 p-md-3">
          <div
            className="custom-scrollbar d-flex flex-column gap-1 overflow-y-scroll overflow-x-hidden"
            style={{ height: "60dvh" }}
          >
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th className="">
                    <h5 className="m-0 fw-bold">Program/Course</h5>
                  </th>
                  <th className="text-center align-middle">
                    <h5 className="m-0 fw-bold">Action</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.programID}>
                    <td className="align-middle">
                      {editProgram === program.programID ? (
                        <FloatingLabel
                          controlId="floatingInput"
                          label=" New program name"
                          className=""
                        >
                          <Form.Control
                            type="text"
                            name="programName"
                            value={formData.programName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                programName: e.target.value,
                              })
                            }
                            placeholder="name@example.com"
                          />
                        </FloatingLabel>
                      ) : (
                        <p className="m-0">{program.programName}</p>
                      )}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center gap-1">
                        {editProgram === program.programID ? (
                          <>
                            <button
                              className="btn btn-secondary text-white px-2 px-md-3"
                              onClick={() => setEditProgram(false)}
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
                              className="btn btn-success text-white px-2 px-md-3 d-flex justify-content-center align-items-center gap-1"
                              onClick={() =>
                                handleUpdateProgram(program.programName)
                              }
                              disabled={
                                program.programName === formData.programName
                              }
                            >
                              {isLoading &&
                              program.programName === selectedProgram ? (
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
                              className="btn btn-success text-white px-2 px-md-3"
                              onClick={() => handleEditProgram(program)}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">Edit</span>
                                <span className="d-md-none d-flex justify-content-center align-items-center">
                                  <i className="bx bx-edit-alt iconFont"></i>
                                </span>
                              </p>
                            </button>
                            <button
                              className="btn btn-danger text-white  px-2 px-md-3 d-flex justify-content-center align-items-center gap-1"
                              onClick={() =>
                                handleDeleteProgram(
                                  program.programID,
                                  program.programName
                                )
                              }
                            >
                              {isLoading &&
                              selectedProgram === program.programName ? (
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
            onClick={handleCloseProgram}
          >
            <p className="m-0">Close</p>
          </Button>
          <Button
            className="border-0"
            style={{ backgroundColor: "var(--main-color)" }}
            onClick={handleAddProgram}
          >
            <p className="m-0">Add program</p>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL FOR ADDING PROGRAM */}
      <Modal show={addProgram} onHide={handleCancelAddProgram} centered size="">
        <Modal.Header style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title>
            <h5 className="m-0 text-white">Add Program/Course</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="programName" label="Program Name">
            <Form.Control
              type="text"
              name="programName"
              value={formData.programName}
              onChange={(e) =>
                setFormData({ ...formData, programName: e.target.value })
              }
              placeholder="name@example.com"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelAddProgram}>
            <p className="m-0">Cancel</p>
          </Button>
          <button
            className="btn primaryButton d-flex justify-content-center align-items-center gap-1"
            onClick={handleSaveProgram}
            disabled={formData.programName === "" || isLoading}
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

export default programModal;

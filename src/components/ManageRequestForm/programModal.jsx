import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Form, FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { motion, AnimatePresence } from "framer-motion";

function programModal() {
  const [showProgram, setShowProgram] = useState(false);
  const [editProgram, setEditProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [addProgram, setAddProgram] = useState(false);
  const [formData, setFormData] = useState({
    programName: "",
  });

  const fetchPrograms = () => {
    axios
      .get("http://localhost:5000/api/fetchingDocuments/fetchPrograms")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.data);
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
    setAddProgram(true);
    setShowProgram(false);
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

  const handleSaveProgram = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/documents/addProgram", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          setAddProgram(false);
          setShowProgram(true);
          setFormData({ programName: "" });
          fetchPrograms();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
          setFormData({ programName: "" });
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding program:", err);
      });
  };
  const handleUpdateProgram = () => {
    axios
      .post("http://localhost:5000/api/documents/updateProgram", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          setEditProgram(null);
          setFormData({ programName: "", programID: "" });
          fetchPrograms();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error updating program:", err);
      });
  };
  const handleDeleteProgram = (programID, programName) => {
    if (!window.confirm(`Are you sure you want to delete ${programName}?`))
      return;

    axios
      .post("http://localhost:5000/api/documents/deleteProgram", { programID })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          fetchPrograms();
        } else if (res.data.Status === "Failed") {
          alert(res.data.Message);
        } else if (res.data.Message) {
          console.log("Error:", res.data.Message);
        }
      })
      .catch((err) => {
        console.log("Error adding program:", err);
      });
  };

  return (
    <>
      <div className="w-100 mx-0">
        <Button
          className="shadow-sm p-2 w-100  d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "var(--main-color)" }}
          onClick={handleShowProgram}
        >
          <h5 className="m-0 ms-3">customize</h5>
          <h4 className="m-0 d-flex align-items-center">
            <i class="bx bxs-chevron-right me-2"></i>
          </h4>
        </Button>
      </div>


      {/* MODAL FOR VIEWING PROGRAMS */}
      <Modal show={showProgram} onHide={handleCloseProgram} centered size="lg" >
        <Modal.Header closeButton style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title >
            <h4 className="m-0 text-white">Manage Program and Course</h4>
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
                          label="Program Name"
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
                              className="btn btn-success text-white "
                              onClick={() => setEditProgram(false)}
                            >
                              <p className="m-0">Cancel</p>
                            </button>
                            <button
                              className="btn btn-danger text-white "
                              onClick={() => handleUpdateProgram()}
                            >
                              <p className="m-0">Save</p>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-success text-white "
                              onClick={() => handleEditProgram(program)}
                            >
                              <p className="m-0">Edit</p>
                            </button>
                            <button
                              className="btn btn-danger text-white "
                              onClick={() =>
                                handleDeleteProgram(
                                  program.programID,
                                  program.programName
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
          <Button variant="secondary" onClick={handleCloseProgram}>
            <p className="m-0">Close</p>
          </Button>
          <Button style={{ backgroundColor: "var(--main-color)" }} onClick={handleAddProgram}>
            <p className="m-0">Add new program</p>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL FOR ADDING PROGRAM */}
      <Modal show={addProgram} onHide={handleCancelAddProgram} centered size="">
        <Modal.Header style={{ backgroundColor: "var(--main-color)" }}>
          <Modal.Title>
            <h4 className="m-0 text-white">Add Program/Course</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Program Name"
            className="mb-3"
          >
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
          <Button style={{ backgroundColor: "var(--main-color)" }} onClick={handleSaveProgram}>
            <p className="m-0">Save</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default programModal;

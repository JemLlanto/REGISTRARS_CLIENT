import React, { useEffect, useState } from "react";
import { Table, Modal, Button, ToggleButton } from "react-bootstrap";
import AdminModal from "../../components/ManageAdmin/AdminModal";
import axios from "axios";

const ManageAdmin = () => {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programAdmins, setProgramAdmins] = useState([]);
  const [addingModal, setAddingModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if ((selectedProgram, selectedAdmin)) {
      setFormData({
        programID: selectedProgram,
        userID: selectedAdmin,
      });
    }
  }, [selectedProgram, selectedAdmin]);

  const handleShowModal = () => {
    setAddingModal(true);
  };
  const handleCloseModal = () => {
    setAddingModal(false);
    setSelectedAdmin("");
  };

  const handleAddProgramAdmin = () => {
    axios
      .post(`http://localhost:5000/api/manageAdmin/addProgramAdmin`, formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          setAddingModal(false);
          setSelectedAdmin("");
          setSelectedProgram("");
          fetchProgramAdmins();
          alert(res.data.Message);
        } else {
          alert(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveProgramAdmin = (program) => {
    const isConfirmed = window.confirm(
      `Remove ${program.firstName} as administrator for ${program.programName}`
    );
    if (!isConfirmed) return;

    axios
      .post(`http://localhost:5000/api/manageAdmin/removeProgramAdmin`, {
        programID: program.programID,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          fetchProgramAdmins();
          alert(res.data.Message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchProgramAdmins = () => {
    axios
      .get("http://localhost:5000/api/manageAdmin/fetchProgramAdmins")
      .then((res) => {
        if (res.data.Status === "Success") {
          setProgramAdmins(res.data.result);
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        console.log("Error fetching program admins: ", err);
      });
  };
  useEffect(() => {
    fetchProgramAdmins();
  }, []);

  const fetchAdmins = () => {
    axios
      .get("http://localhost:5000/api/manageAdmin/fetchAdmin")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAdmins(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching admins: ", err);
      });
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <>
      <div className="w-100 p-4">
        <div
          className="rounded-2 shadow-sm text-white p-2"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
            Admin Panel
          </h5>
          <AdminModal />
        </div>

        <div className="w-100 d-flex flex-column gap-2 p-3 mt-3 mx-0 bg-white shadow-sm rounded-2">
          <div className="p-2 overflow-y-scroll" style={{ height: "30rem" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Program/Courses</th>
                  <th>Administrator</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {programAdmins.map((program, index) => (
                  <tr key={index}>
                    <td> {program.programName} </td>
                    <td>
                      {program.firstName ? (
                        <>
                          <p className="m-0">
                            {program.firstName} {program.lastName}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-secondary m-0">No Administrator</p>
                        </>
                      )}
                    </td>
                    <td>
                      {program.firstName ? (
                        <>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveProgramAdmin(program)}
                          >
                            Remove admin
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectedProgram(program.programID);
                              handleShowModal();
                            }}
                          >
                            Add admin
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* ADDING PROGRAM ADMINISTRATOR */}
      <Modal show={addingModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Administrators</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-1">
            {admins.length === 0 ? (
              <>
                <p>No admins.</p>
              </>
            ) : (
              <>
                {admins.map((admin, index) => (
                  <>
                    <ToggleButton
                      key={index}
                      type="radio"
                      id={`radio-${admin.userID}`}
                      label={`${admin.firstName} ${admin.lastName}`}
                      checked={selectedAdmin === admin.userID}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAdmin(admin.userID);
                        }
                      }}
                    >
                      {admin.firstName} {admin.lastName}
                    </ToggleButton>
                  </>
                ))}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProgramAdmin}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageAdmin;

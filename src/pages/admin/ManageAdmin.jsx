import React, { useEffect, useState } from "react";
import { Table, Modal, Button, ToggleButton, Spinner } from "react-bootstrap";
import AdminModal from "../../components/ManageAdmin/AdminModal";
import axios from "axios";
import Swal from "sweetalert2";

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programAdmins, setProgramAdmins] = useState([]);
  const [addingModal, setAddingModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      .post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/manageAdmin/addProgramAdmin`,
        formData
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setAddingModal(false);
          setSelectedAdmin("");
          setSelectedProgram("");
          fetchAllAdmins();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.Message || "An error occurred. Please try again.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      });
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger me-2",
    },
    buttonsStyling: false,
  });

  const handleRemoveProgramAdmin = (program) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You won't be able to revert this! Remove ${program.firstName} as administrator for ${program.programName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/manageAdmin/removeProgramAdmin`,
              {
                programID: program.programID,
              }
            )
            .then((res) => {
              if (res.data.Status === "Success") {
                fetchAllAdmins();
                swalWithBootstrapButtons.fire({
                  title: "Removed!",
                  text: res.data.Message,
                  icon: "success",
                });
              }
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: err.message || "An error occurred.",
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "The administrator was not removed.",
            icon: "error",
          });
        }
      });
  };

  const fetchAllAdmins = () => {
    const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    const programAdminsRequest = axios.get(
      `${baseUrl}/api/manageAdmin/fetchProgramAdmins`
    );
    const adminsRequest = axios.get(`${baseUrl}/api/manageAdmin/fetchAdmin`);

    Promise.all([programAdminsRequest, adminsRequest])
      .then(([programAdminsRes, adminsRes]) => {
        if (programAdminsRes.data.Status === "Success") {
          setProgramAdmins(programAdminsRes.data.result);
          console.log("Program Admins: ", programAdminsRes.data.result);
        }
        if (adminsRes.data.Status === "Success") {
          setAdmins(adminsRes.data.data);
          console.log("Admins: ", adminsRes.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  return (
    <>
      <div className="w-100 p-1 p-sm-4 " style={{ height: "100%" }}>
        <div
          className="rounded-2 shadow-sm text-white p-2 d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <h5
            className="m-0 p-2 fade-in"
            style={{ color: "var(--secondMain-color)" }}
          >
            Admin Panel
          </h5>
          <div className="d-flex align-items-center">
            <AdminModal admins={admins} fetchAllAdmins={fetchAllAdmins} />
          </div>
        </div>

        <div className="w-100 d-flex flex-column gap-2 p-2  mt-3 mx-0 bg-white shadow-sm rounded-2">
          <div
            className="requestList custom-scrollbar p-2 overflow-y-scroll"
            style={{ height: "70dvh" }}
          >
            {isLoading ? (
              <>
                <div
                  className="d-flex align-items-center justify-content-center "
                  style={{ height: "100%" }}
                >
                  <Spinner animation="border" variant="black" size="lg" />
                </div>
              </>
            ) : (
              <>
                <Table striped bordered hover className="table-fade-in">
                  <thead>
                    <tr>
                      <th>
                        <h5 className="m-0">Program/Courses</h5>
                      </th>
                      <th>
                        <h5 className="m-0">Administrator</h5>
                      </th>
                      <th>
                        <h5 className="m-0">Action</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {programAdmins.map((program, index) => (
                      <tr key={index}>
                        <td className="align-middle">
                          <p className="m-0">{program.programName}</p>
                        </td>
                        <td className="align-middle">
                          {program.firstName ? (
                            <p className="m-0">
                              {program.firstName} {program.lastName}
                            </p>
                          ) : (
                            <p className="text-secondary m-0">
                              No Administrator
                            </p>
                          )}
                        </td>
                        <td className="align-middle">
                          {program.firstName ? (
                            <button
                              className="btn btn-danger w-100"
                              onClick={() => handleRemoveProgramAdmin(program)}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block">
                                  Remove admin
                                </span>
                                <span className="m-0 d-md-none">
                                  <i className="bx bx-trash iconFont"></i>
                                </span>
                              </p>
                            </button>
                          ) : (
                            <button
                              className="btn w-100"
                              style={{ backgroundColor: "var(--main-color)" }}
                              onClick={() => {
                                setSelectedProgram(program.programID);
                                handleShowModal();
                              }}
                            >
                              <p className="m-0">
                                <span className="d-none d-md-block text-white">
                                  Add admin
                                </span>
                                <span className="m-0 d-md-none text-white">
                                  <i className="m-0 bx bx-plus-circle iconFont"></i>
                                </span>
                              </p>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ADDING PROGRAM ADMINISTRATOR */}
      <Modal
        show={addingModal}
        onHide={handleCloseModal}
        centered
        className="text-white"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <Modal.Title>Administrators</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-1">
            {admins.length === 0 ? (
              <>
                <div
                  className="spinner-container d-flex justify-content-center align-items-center spinner-container"
                  style={{ height: "70%" }}
                >
                  <p>No admins.</p>
                </div>
              </>
            ) : (
              admins.map((admin) => (
                <ToggleButton
                  key={admin.userID}
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
              ))
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

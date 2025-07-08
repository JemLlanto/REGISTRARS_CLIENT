import { useState, useEffect } from "react";
import { Spinner, Modal, Button, Table, ToggleButton } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const ManageCourseAdmin = ({
  fetchAllAdmins,
  programAdmins,
  admins,
  isLoading,
  setIsLoading,
}) => {
  const [formData, setFormData] = useState({});
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [addingModal, setAddingModal] = useState(false);
  const handleShowModal = () => {
    setAddingModal(true);
  };
  const handleCloseModal = () => {
    setAddingModal(false);
    setSelectedAdmin("");
  };

  useEffect(() => {
    if ((selectedProgram, selectedAdmin)) {
      setFormData({
        programID: selectedProgram,
        userID: selectedAdmin,
      });
    }
  }, [selectedProgram, selectedAdmin]);

  const handleAddProgramAdmin = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/manageAdmin/addProgramAdmin`,
        formData
      );

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
    } catch (err) {
      // console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
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

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger me-2",
    },
    buttonsStyling: false,
  });

  return (
    <>
      <div className="w-100 d-flex flex-column gap-2 p-1 mx-0 bg-white shadow-sm rounded-2">
        <div
          className="requestList custom-scrollbar p-2 overflow-y-scroll"
          style={{ height: "max-content", minHeight: "30rem" }}
        >
          {isLoading ? (
            <>
              <div
                className="d-flex flex-column align-items-center justify-content-center "
                style={{ height: "100%" }}
              >
                <h5>Loading Course Admins</h5>
                <Spinner animation="border" variant="black" size="lg" />
              </div>
            </>
          ) : (
            <>
              <Table striped bordered hover className="table-fade-in m-0">
                <thead>
                  <tr>
                    <th className="w-50 align-middle">
                      <h5 className="m-0">Program/Courses</h5>
                    </th>
                    <th className="align-middle">
                      <h5 className="m-0">Assigned Admin</h5>
                    </th>
                    <th className="w-25 align-middle">
                      <h5 className="m-0 text-center">Action</h5>
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
                          <p className="text-secondary m-0">No Administrator</p>
                        )}
                      </td>
                      <td className="align-middle">
                        {program.firstName ? (
                          <button
                            className="btn btn-danger w-100 py-1"
                            onClick={() => handleRemoveProgramAdmin(program)}
                          >
                            <p className="m-0">
                              <span className="d-none d-lg-block">
                                Remove admin
                              </span>
                              <span className="m-0  d-flex align-items-center justify-content-center d-lg-none">
                                <i className="bx bx-trash iconFont"></i>
                              </span>
                            </p>
                          </button>
                        ) : (
                          <button
                            className="btn w-100 py-1"
                            style={{ backgroundColor: "var(--main-color)" }}
                            onClick={() => {
                              setSelectedProgram(program.programID);
                              handleShowModal();
                            }}
                          >
                            <p className="m-0">
                              <span className="d-none d-lg-block text-white">
                                Add admin
                              </span>
                              <span className="m-0 d-flex align-items-center justify-content-center d-lg-none text-white">
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
              <div className="customToggleButton d-flex flex-column gap-1">
                {admins.map((admin) => (
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
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            <p className="m-0">Close</p>
          </Button>
          <button
            className="btn primaryButton px-3 d-flex align-items-center justify-content-center gap-1"
            onClick={handleAddProgramAdmin}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" />{" "}
                <p className="m-0">Adding admin</p>
              </>
            ) : (
              <>
                <p className="m-0">Add</p>
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageCourseAdmin;

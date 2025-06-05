import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Table,
  ToggleButton,
  FloatingLabel,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import AddingNewAdmin from "./AddingNewAdmin";
import Swal from "sweetalert2";

const AdminModal = ({ admins, fetchAllAdmins }) => {
  const [adminModal, setAdminModal] = useState(false);
  const [addingModal, setAddingModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShow = () => {
    setAdminModal(true);
  };
  const handleClose = () => {
    setAdminModal(false);
  };
  const handleShowAddingModal = () => {
    setAdminModal(false);
    setAddingModal(true);
    setSearchName("");
  };
  const handleCloseAddingModal = () => {
    setAdminModal(true);
    setAddingModal(false);
  };

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleAddAdmin = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/manageAdmin/addAdmin/${selectedUser}`
      );

      if (res.data.Status === "Success") {
        fetchAllAdmins();
        fetchUsers();
        setSelectedUser("");
        handleCloseAddingModal();
        Swal.fire({
          title: "Success!",
          text: res.data.Message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: res.data.Message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "An error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAdmin = async (userID, firstName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove ${firstName} as Administrator. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        setSelectedUser(userID);
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/manageAdmin/removeAdmin/${userID}`
        );

        if (res.data.Status === "Success") {
          fetchAllAdmins();
          fetchUsers();
          setSelectedUser("");
          await Swal.fire({
            title: "Removed!",
            text: res.data.Message,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          await Swal.fire({
            title: "Failed",
            text: res.data.Message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (err) {
        await Swal.fire({
          title: "Error",
          text: err.message || "An error occurred.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await Swal.fire({
        title: "Cancelled",
        text: "The administrator was not removed.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const filteredUser = users.filter((user) => {
    const matchedUser = `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchName.toLowerCase());

    return matchedUser;
  });

  const fetchUsers = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/manageAdmin/fetchUser`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setUsers(res.data.data);
        }
      })
      .catch((err) => {
        // console.log("Error: ", err);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <button className="btn btn-warning" onClick={() => handleShow()}>
        <p className="m-0">View admins</p>
      </button>
      <Modal show={adminModal} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)", color: "white" }}
        >
          <Modal.Title>Administrators</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Admin Name</th>
                <th className="text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={index}>
                  <td>
                    <p className="m-0">
                      {admin.firstName} {admin.lastName}
                    </p>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-1"
                      onClick={() =>
                        handleRemoveAdmin(admin.userID, admin.firstName)
                      }
                    >
                      {isLoading && selectedUser === admin.userID ? (
                        <>
                          <Spinner
                            animation="border"
                            variant="light"
                            size="sm"
                          />
                          <p className="m-0 d-none d-md-block">
                            Removing admin
                          </p>
                          <p className="m-0 d-block d-md-none">Removing</p>
                        </>
                      ) : (
                        <>
                          <p className="m-0 d-none d-md-block">Remove admin</p>
                          <p className="m-0 d-block d-md-none">Remove</p>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="border-0"
            onClick={handleClose}
          >
            <p className="m-0">Close</p>
          </Button>
          <Button
            className="border-0"
            style={{ backgroundColor: "var(--main-color)", color: "white" }}
            onClick={() => handleShowAddingModal()}
          >
            <p className="m-0">Add admin</p>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* FOR ADDING ADMINS */}
      <Modal show={addingModal} onHide={handleCloseAddingModal} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "var(--main-color)", color: "white" }}
        >
          <Modal.Title>Add Administrator</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="custom-scrollbar"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <FloatingLabel
            controlId="floatingInput"
            label="Search user"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder=""
              value={searchName}
              onChange={handleChange}
            />
          </FloatingLabel>
          <div className="d-flex flex-column gap-1">
            {filteredUser.length === 0 ? (
              <div
                className="spinner-container d-flex justify-content-center align-items-center spinner-container"
                style={{ height: "70%" }}
              >
                <p>No matches.</p>
              </div>
            ) : (
              <div className="customToggleButton d-flex flex-column gap-1">
                {searchName === "" ? (
                  <div
                    className="spinner-container d-flex justify-content-center align-items-center spinner-container"
                    style={{ height: "70%" }}
                  >
                    <p>Search user.</p>
                  </div>
                ) : (
                  filteredUser.map((user, index) => (
                    <ToggleButton
                      key={index}
                      type="radio"
                      id={`radio-${user.userID}`}
                      name="user-radio"
                      value={user.userID}
                      checked={selectedUser === user.userID}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUser(user.userID);
                        }
                      }}
                      className={`border ${
                        selectedUser === user.userID
                          ? " text-white"
                          : "bg-transparent"
                      }`}
                    >
                      <p className="m-0">
                        {user.firstName} {user.middleName} {user.lastName}
                      </p>
                    </ToggleButton>
                  ))
                )}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="border-0"
            onClick={handleCloseAddingModal}
          >
            <p className="m-0">Close</p>
          </Button>
          <button
            className="btn primaryButton px-md-4 d-flex align-items-center justify-content-center gap-1"
            onClick={handleAddAdmin}
            disabled={isLoading || !selectedUser}
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

export default AdminModal;

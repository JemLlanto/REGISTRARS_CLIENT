import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Table,
  ToggleButton,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import axios from "axios";
import AddingNewAdmin from "./AddingNewAdmin";

const AdminModal = () => {
  const [adminModal, setAdminModal] = useState(false);
  const [addingModal, setAddingModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchName, setSearchName] = useState("");

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

  const filteredUser = users.filter((user) => {
    const matchedUser = `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchName.toLowerCase());

    return matchedUser;
  });

  useEffect(() => {
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
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/manageAdmin/fetchUser")
      .then((res) => {
        if (res.data.Status === "Success") {
          setUsers(res.data.data);
          setSearchUser(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });
  return (
    <>
      <button className="btn btn-primary" onClick={() => handleShow()}>
        View admins
      </button>
      <Modal show={adminModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Administrators</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Action</th>
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
                    <button className="btn btn-danger">Remove admin</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleShowAddingModal()}>
            Add admin
          </Button>
        </Modal.Footer>
      </Modal>

      {/* FOR ADDING ADMINS */}
      <Modal show={addingModal} onHide={handleCloseAddingModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Administrator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Search user"
            className="mb-3"
            value={searchName}
            onChange={handleChange}
          >
            <Form.Control type="text" placeholder="" />
          </FloatingLabel>
          <div className="d-flex flex-column gap-1">
            {filteredUser.length === 0 ? (
              <>
                <p>No matches.</p>
              </>
            ) : (
              <>
                {filteredUser.map((user, index) => (
                  <>
                    <ToggleButton
                      key={index}
                      type="radio"
                      id={`radio-${user.userID}`}
                      label={`${user.firstName} ${user.lastName}`}
                      checked={selectedUser === user.userID}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUser(user.userID);
                        }
                      }}
                    >
                      {user.firstName} {user.lastName}
                    </ToggleButton>
                  </>
                ))}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseAddingModal()}>
            Close
          </Button>
          <Button variant="primary">Add admin</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminModal;

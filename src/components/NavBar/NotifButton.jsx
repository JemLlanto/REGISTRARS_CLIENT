import axios from "axios";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

const NotifButton = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    axios
      .get(
        `http://localhost:5000/api/notification/fetchNotification/${user.userID}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setNotifications(res.data.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="border rounded-circle p-0 d-flex align-items-center justify-content-center"
        variant="light"
        id="dropdown-basic"
        bsPrefix="none"
        style={{ width: "2.5rem", height: "2.5rem" }}
      >
        <h5 className="m-0 d-flex align-items-center justify-content-center">
          <i class="bx bx-bell"></i>
        </h5>
        {notifications.length === 0 ? null : (
          <div
            className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: ".9rem",
              height: ".9rem",
              backgroundColor: "red",
              top: "0",
              left: "-.2rem",
            }}
          >
            <p
              className="m-0 text-white"
              style={{ fontSize: "clamp(.5rem, .9dvw, .7rem)" }}
            >
              {notifications.length}
            </p>
          </div>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {notifications.length === 0 ? (
          <>
            <div style={{ width: "20rem" }}>
              <p className="m-0 text-center">No notification</p>
            </div>
          </>
        ) : (
          <>
            {notifications.map((notif, index) => (
              <Dropdown.Item key={index}>{notif.message}</Dropdown.Item>
            ))}
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotifButton;

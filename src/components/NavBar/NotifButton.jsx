import axios from "axios";
import React, { useState, useEffect } from "react";
import { Dropdown, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// Initialize socket connection
const socket = io("http://localhost:5000"); // Match your server URL

const NotifButton = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNotif, setNewNotif] = useState(false);
  const userID = user.userID;
  const navigate = useNavigate();

  // Fetch initial notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/notifications/fetchNotification/${userID}`
      );
      if (response.data.Status === "Success") {
        setNotifications(response.data.data);
        // console.error(response.data.data);
      } else {
        console.error(response.data.Message);
      }
      setLoading(false);
      setNewNotif(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userID) {
      fetchNotifications();
    }
  }, [userID]);

  useEffect(() => {
    if (newNotif) {
      fetchNotifications();
    }
  }, [newNotif]);

  // Set up socket connection and event listeners
  useEffect(() => {
    // Join user's room
    socket.emit("join_user", userID);

    // Listen for new notifications
    socket.on("new_notification", (notification) => {
      console.log("New notification received:", notification);

      setNewNotif(true);

      // Add to toast stack with a unique id
      const toastNotification = {
        ...notification,
        toastId: `toast-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        show: true,
      };

      setToasts((prev) => [...prev, toastNotification]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("new_notification");
    };
  }, [userID]);

  // Remove toast from stack when closed
  const closeToast = (toastId) => {
    setToasts((prev) => prev.filter((toast) => toast.toastId !== toastId));
  };

  // Format created for display
  const formatTime = (created) => {
    const date = new Date(created);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format date for dropdown items
  const formatNotificationDate = (created) => {
    const date = new Date(created);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? "min" : "mins"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Handle marking notification as read
  const handleNotificationClick = async (notif) => {
    try {
      await axios.post(
        `http://localhost:5000/api/notifications/markAsRead/${notif.requestID}`
      );
      fetchNotifications();
      console.error("Navigating to:", `request-details/${notif.requestID}`);

      navigate(`request-details/${notif.requestID}`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllNotifAsRead = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/notifications/markAllAsRead/${user.userID}`
      );
      if (res.status === 200) {
        fetchNotifications();
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("An error occured: ", err.message);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-end"
        className=" p-3 mt-5"
        style={{ zIndex: 100 }}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.toastId}
            onClose={() => closeToast(toast.toastId)}
            show={toast.show}
            delay={5000}
            autohide
            animation={true}
          >
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
              <small>
                {toast.created ? formatTime(toast.created) : "Just now"}
              </small>
            </Toast.Header>
            <Toast.Body
              onClick={() => handleNotificationClick(toast)}
              style={{ cursor: toast.requestID ? "pointer" : "default" }}
            >
              <div>
                <p className="mb-1">{toast.message}</p>
                {toast.requestID && (
                  <small className="text-muted">
                    Click to view request #{toast.requestID}
                  </small>
                )}
              </div>
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
      <Dropdown>
        <Dropdown.Toggle
          className="border rounded-circle p-0 d-flex align-items-center justify-content-center border-0"
          id="dropdown-basic"
          bsPrefix="none"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            backgroundColor: "white",
          }}
        >
          <h5
            className="m-0 d-flex align-items-center justify-content-center "
            style={{ color: "var(--main-color)" }}
          >
            {notifications.filter((notif) => notif.isRead === 0).length ===
<<<<<<< Updated upstream
            0 ? (
              <i className="bx bx-bell bx-sm"></i>
=======
              0 ? (
              <i class="bx bx-bell bx-sm"></i>
>>>>>>> Stashed changes
            ) : (
              <i className="bx bxs-bell bx-tada bx-sm"></i>
            )}
          </h5>
          {notifications.filter((notif) => notif.isRead === 0).length ===
            0 ? null : (
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
                style={{ fontSize: "clamp(.5rem, .9dvw, .6rem)" }}
              >
                {notifications.filter((notif) => notif.isRead === 0).length >
                  9 ? (
                  <>9+</>
                ) : (
                  <>
                    {notifications.filter((notif) => notif.isRead === 0).length}
                  </>
                )}
              </p>
            </div>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu
          align="end"
          style={{
            width: "300px",
            maxHeight: "450px",
          }}
          className="custom-scrollbar"
        >
          {/* Fixed Header */}
          <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center bg-white sticky-top">
            <div className="d-flex align-items-center">
              <h6
                className="m-0 fw-bold"
                style={{ color: "var(--main-color)" }}
              >
                Notifications
              </h6>
            </div>
            {notifications.filter((notif) => notif.isRead === 0).length > 0 ? (
              <small
                className="fw-bold"
                style={{ cursor: "pointer", color: "var(--yellow-color)" }}
                onClick={handleMarkAllNotifAsRead}
              >
                Mark all as read
              </small>
            ) : (
              <small
                className="fw-bold"
                style={{
                  cursor: "not-allowed",
                  color: "var(--yellow-color-disabled)",
                }}
              // onClick={handleMarkAllNotifAsRead}
              >
                Mark all as read
              </small>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-3">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div
                  className="spinner-border"
                  role="status"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    color: "var(--yellow-color)",
                  }}
                ></div>
                <span
                  className="mt-2 fw-bold"
                  style={{ color: "var(--yellow-color)" }}
                >
                  Loading...
                </span>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-3 py-3 text-center text-muted">
              <p className="m-0">No notifications</p>
            </div>
          ) : (
            /* Scrollable Notification List */
            <div
              style={{ maxHeight: "380px", overflowY: "auto" }}
              className="custom-scrollbar"
            >
              {notifications.map((notif, index) => (
                <Dropdown.Item
                  key={notif.notificationID || index}
                  onClick={() => handleNotificationClick(notif)}
                  className={`border-bottom p-2 ${notif.isRead === 0 ? "unread-notif" : "bg-white"
                    }`}
                >
                  <div
                    className="d-flex flex-column text-wrap text-break"
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  >
                    <p className="mb-1" style={{ fontSize: "0.875rem" }}>
                      {notif.message}
                    </p>
                    <div className="d-flex justify-content-between gap-1">
                      {notif.requestID && (
                        <small
                          className=""
                          style={{ fontSize: "clamp(.6rem, .8dvw, .9rem)" }}
                        >
                          Request No.{notif.requestID}
                        </small>
                      )}
                      <small className=" ms-auto" style={{ fontSize: "10px" }}>
                        {formatNotificationDate(notif.created)}
                      </small>
                    </div>
                  </div>
                </Dropdown.Item>
              ))}
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default NotifButton;

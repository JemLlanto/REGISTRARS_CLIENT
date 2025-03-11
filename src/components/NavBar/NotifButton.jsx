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
  const [unreadCount, setUnreadCount] = useState(0);
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
        console.error(response.data.data);
      } else {
        console.error(response.data.Message);
      }
      setLoading(false);
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

  // Set up socket connection and event listeners
  useEffect(() => {
    // Join user's room
    socket.emit("join_user", userID);

    // Listen for new notifications
    socket.on("new_notification", (notification) => {
      console.log("New notification received:", notification);

      // Add to notification list
      setNotifications((prev) => [notification, ...prev]);

      // Increment unread count
      setUnreadCount((prev) => prev + 1);

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
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-end"
        className="p-3 mt-5"
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
              onClick={() =>
                toast.requestID &&
                handleNotificationClick(toast.id, toast.requestID)
              }
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
          className="border rounded-circle p-0 d-flex align-items-center justify-content-center"
          variant="light"
          id="dropdown-basic"
          bsPrefix="none"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <h5 className="m-0 d-flex align-items-center justify-content-center">
            <i className="bx bx-bell"></i>
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
                style={{ fontSize: "clamp(.5rem, .9dvw, .7rem)" }}
              >
                {notifications.filter((notif) => notif.isRead === 0).length}
              </p>
            </div>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu
          align="end"
          style={{ width: "300px", maxHeight: "400px", overflowY: "auto" }}
        >
          <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="m-0">Notifications</h6>
            {notifications.length > 0 && (
              <small
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  /* Add mark all as read functionality */
                }}
              >
                Mark all as read
              </small>
            )}
          </div>

          {loading ? (
            <div className="text-center py-3">
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-3 py-3 text-center text-muted">
              <p className="m-0">No notifications</p>
            </div>
          ) : (
            notifications.map((notif, index) => (
              <Dropdown.Item
                key={notif.notificationID || index}
                onClick={() => handleNotificationClick(notif)}
                className={`border-bottom ${
                  notif.isRead === 0 ? "bg-warning" : ""
                }`}
              >
                <div className="d-flex flex-column">
                  <p className="mb-1" style={{ fontSize: "0.875rem" }}>
                    {notif.notificationID}
                    {notif.message}
                  </p>
                  <div className="d-flex justify-content-between">
                    {notif.requestID && (
                      <small className="text-muted">
                        Request #{notif.requestID}
                      </small>
                    )}
                    <small className="text-muted ms-auto">
                      {formatNotificationDate(notif.created || notif.timestamp)}
                    </small>
                  </div>
                </div>
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default NotifButton;

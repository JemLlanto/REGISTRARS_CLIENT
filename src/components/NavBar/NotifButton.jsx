import axios from "axios";
import React, { useState, useEffect } from "react";
import { Dropdown, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

// Initialize socket connection
const socket = io(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`);

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
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/notifications/fetchNotification/${userID}`
      );
      if (response.data.Status === "Success") {
        setNotifications(response.data.data);
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
      setNewNotif(true);

      // Add to toast stack with a unique id
      const toastNotification = {
        ...notification,
        toastId: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/notifications/markAsRead/${notif.requestID}`
      );
      fetchNotifications();
      navigate(`request-details/${notif.requestID}`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllNotifAsRead = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/notifications/markAllAsRead/${user.userID}`
      );

      if (res.status === 200) {
        fetchNotifications();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Oops!",
          text: res.data.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred: ${err.message}`,
      });
    }
  };

  const unreadCount = notifications.filter((notif) => notif.isRead === 0).length;

  return (
    <>
      {/* Improved Toast Container */}
      <ToastContainer
        position="top-end"
        className="p-3 mt-5"
        style={{ zIndex: 1080 }}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.toastId}
            onClose={() => closeToast(toast.toastId)}
            show={toast.show}
            delay={5000}
            autohide
            animation={true}
            className="notification-toast"
          >
            <Toast.Header className="d-flex align-items-center" style={{ background: "var(--main-color)", color: "white" }}>
              <strong className="me-auto">New Notification</strong>
              <small className="text-white">
                {toast.created ? formatTime(toast.created) : "Just now"}
              </small>
            </Toast.Header>
            <Toast.Body
              onClick={() => toast.requestID && handleNotificationClick(toast)}
              style={{
                cursor: toast.requestID ? "pointer" : "default",
                transition: "background-color 0.2s ease",
                backgroundColor: "#fff"
              }}
              className="hover-highlight"
            >
              <div>
                <p className="mb-1">{toast.message}</p>
                {toast.requestID && (
                  <small className="text-muted d-block text-end mt-1">
                    Click to view request #{toast.requestID}
                  </small>
                )}
              </div>
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>

      {/* Improved Notification Button & Dropdown */}
      <Dropdown>
        <Dropdown.Toggle
          className="btn btn-light  rounded-circle p-0 d-flex align-items-center justify-content-center border-0"
          id="notification-dropdown"
          bsPrefix="none"
          style={{
            width: "2.75rem",
            height: "2.75rem",
            transition: "all 0.2s ease"
          }}
        >
          <div className="position-relative">
            <h5
              className="m-0 d-flex align-items-center justify-content-center"
              style={{ color: "var(--main-color)" }}
            >
              {unreadCount === 0 ? (
                <i className="bx bx-bell bx-sm"></i>
              ) : (
                <i className="btn-secondary bx bxs-bell bx-tada bx-sm"></i>
              )}
            </h5>

            {/* Improved notification badge */}
            {unreadCount > 0 && (
              <div
                className="position-absolute rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  backgroundColor: "#ff3b30",
                  top: "-0.6rem",
                  right: "-0.6rem",
                  border: "2px solid white"
                }}
              >
                <p
                  className="m-0 text-white fw-bold"
                  style={{ fontSize: "0.65rem", lineHeight: 1 }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </p>
              </div>
            )}
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu
          align="end"
          style={{
            width: "320px",
            maxHeight: "450px",
            padding: 0,
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "0.5rem",
            overflow: "hidden"
          }}
          className="custom-scrollbar"
        >
          {/* Fixed Header */}
          <div
            className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center bsticky-top"
            style={{
              background: "var(--main-color)",
              color: "white",
              borderBottom: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            <div className="d-flex align-items-center">
              <h6 className="m-0 fw-bold">
                Notifications
                {unreadCount > 0 && (
                  <span className="ms-2 badge rounded-pill bg-white text-dark">
                    {unreadCount}
                  </span>
                )}
              </h6>
            </div>

            {unreadCount > 0 ? (
              <small
                className="fw-bold"
                style={{
                  cursor: "pointer",
                  color: "var(--yellow-color)",
                  textDecoration: "none"
                }}
                onClick={handleMarkAllNotifAsRead}
              >
                Mark all as read
              </small>
            ) : (
              <small
                className="fw-bold"
                style={{
                  cursor: "not-allowed",
                  color: "rgba(255,255,255,0.5)"
                }}
              >
                Mark all as read
              </small>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-4">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div
                  className="spinner-border"
                  role="status"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "var(--yellow-color)",
                  }}
                ></div>
                <span
                  className="mt-2"
                  style={{ color: "var(--main-color)" }}
                >
                  Loading notifications...
                </span>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-3 py-4 text-center">
              <div className="py-4">
                <i className="bx bx-bell-off bx-lg" style={{ color: "#ccc" }}></i>
                <p className="m-0 mt-2 text-muted">No notifications yet</p>
              </div>
            </div>
          ) : (
            /* Improved Scrollable Notification List */
            <div
              style={{ maxHeight: "380px", overflowY: "auto" }}
              className="custom-scrollbar"
            >
              {notifications.map((notif, index) => (
                <Dropdown.Item
                  key={notif.notificationID || index}
                  onClick={() => handleNotificationClick(notif)}
                  className="p-0 notification-item"
                >
                  <div className={`px-3 py-3 border-bottom w-100 ${notif.isRead === 0 ? "unread-notif" : ""
                    }`}>
                    <div
                      className="d-flex flex-column text-wrap text-break"
                      style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                    >
                      {notif.isRead === 0 && (
                        <div className="position-absolute" style={{
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)"
                        }}>
                          <div className="bg-primary rounded-circle" style={{
                            width: "8px",
                            height: "8px"
                          }}></div>
                        </div>
                      )}

                      <p className={`mb-1 ${notif.isRead === 0 ? "ps-3 fw-medium" : ""}`}
                        style={{ fontSize: "0.875rem", color: notif.isRead === 0 ? "var(--main-color)" : "#333" }}>
                        {notif.message}
                      </p>

                      <div className="d-flex justify-content-between align-items-center mt-1">
                        {notif.requestID && (
                          <span className="badge bg-light text-dark">
                            Request #{notif.requestID}
                          </span>
                        )}
                        <small className="ms-auto text-muted" style={{ fontSize: "11px" }}>
                          {formatNotificationDate(notif.created)}
                        </small>
                      </div>
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
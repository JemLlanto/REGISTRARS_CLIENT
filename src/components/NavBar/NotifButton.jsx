import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Dropdown, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

// Initialize socket connection
const socket = io(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`);

const NotifButton = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [newNotif, setNewNotif] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const notifContainerRef = useRef(null);
  const LIMIT = 10; // Number of notifications to fetch at once

  const userID = user.userID;
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch notifications with pagination
  const fetchNotifications = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        if (pageNum === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/notifications/fetchNotification/${userID}`,
          {
            params: {
              page: pageNum,
              limit: LIMIT,
            },
          }
        );

        if (response.data.Status === "Success") {
          const newNotifications = response.data.data;

          // If there are fewer notifications than the limit, we've reached the end
          if (newNotifications.length < LIMIT) {
            setTimeout(() => {
              setHasMore(false);
            }, 0);
          } else {
            setTimeout(() => {
              setHasMore(true);
            }, 0);
          }

          // Either append to existing notifications or replace them
          if (append) {
            setNotifications((prev) => [...prev, ...newNotifications]);
          } else {
            setNotifications(newNotifications);
          }
        } else {
          console.log(response.data.Message);
        }
        setTimeout(() => {
          setLoading(false);
          setLoadingMore(false);
        }, 0);
        setNewNotif(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [userID]
  );

  useEffect(() => {
    if (userID) {
      fetchNotifications(1, false);
    }
  }, [userID, fetchNotifications]);

  useEffect(() => {
    if (newNotif) {
      // Reset to first page when there's a new notification
      setPage(1);
      fetchNotifications(1, false);
    }
  }, [newNotif, fetchNotifications]);

  // Handler for scrolling to bottom of notification container
  const handleScroll = useCallback(() => {
    if (!notifContainerRef.current || loadingMore || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = notifContainerRef.current;

    // More generous threshold - trigger when within 100px of bottom
    if (scrollHeight - scrollTop - clientHeight < 100) {
      // Prevent multiple calls while loading
      if (!loadingMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNotifications(nextPage, true);
      }
    }
  }, [loadingMore, hasMore, page, fetchNotifications]);

  // Check if initial content fills the container
  useEffect(() => {
    if (
      notifContainerRef.current &&
      !loading &&
      hasMore &&
      notifications.length > 0
    ) {
      const { scrollHeight, clientHeight } = notifContainerRef.current;

      // If the initial content doesn't fill the container, load more
      if (scrollHeight <= clientHeight && !loadingMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNotifications(nextPage, true);
      }
    }
  }, [notifications, loading, loadingMore, hasMore, page, fetchNotifications]);

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
    const targetPath = `/request-details/${notif.requestID}`;
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/notifications/markAsRead/${notif.requestID}`
      );
      fetchNotifications(1, false);
      console.log("Navigating to:", targetPath);

      if (location.pathname === targetPath) {
        window.location.reload(); // Reload if already on the same page
      } else {
        navigate(targetPath); // Navigate normally otherwise
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllNotifAsRead = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/notifications/markAllAsRead/${user.userID}`
      );

      if (res.status === 200) {
        fetchNotifications(1, false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
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

  return (
    <>
      {/* Toast container for new notifications */}
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
            <Toast.Header style={{ backgroundColor: "var(--main-color)" }}>
              <strong className="me-auto text-white">Notification</strong>
              <small className="text-white">
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

      {/* Notification Dropdown */}
      <div className="position-relative">
        <Dropdown>
          <Dropdown.Toggle
            className="btn btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm"
            id="dropdown-basic"
            bsPrefix="none"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              transition: "all 0.2s ease",
            }}
          >
            <h5
              className="m-0 d-flex align-items-center justify-content-center"
              style={{ color: "var(--main-color)" }}
            >
              {notifications.filter((notif) => notif.isRead === 0).length ===
                0 ? (
                <i className="bx bx-bell bx-sm"></i>
              ) : (
                <i className="bx bxs-bell bx-tada bx-sm"></i>
              )}
            </h5>
            {notifications.filter((notif) => notif.isRead === 0).length ===
              0 ? null : (
              <div
                className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  backgroundColor: "red",
                  top: "0",
                  right: "0",
                  transform: "translate(25%, -25%)",
                  border: "2px solid white",
                }}
              >
                <p className="m-0 text-white fw-bold d-flex align-items-center justify-content-center">
                  <span style={{ fontSize: "0.7rem" }}>
                    {notifications.filter((notif) => notif.isRead === 0)
                      .length > 9 ? (
                      <>9+</>
                    ) : (
                      <>
                        {
                          notifications.filter((notif) => notif.isRead === 0)
                            .length
                        }
                      </>
                    )}
                  </span>
                </p>
              </div>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu
            align="center"
            className="shadow-lg border-0 rounded-3 p-0 custom-scrollbar"
            style={{
              width: "320px",
              maxHeight: "500px",
              marginTop: "0.75rem",
              right: "50%",
              transform: "translateX(-50%)",
              animation: "fadeIn 0.2s ease-in-out",
            }}
          >
            {/* Header with title and mark all as read button */}
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center bg-white sticky-top shadow-sm ">
              <div className="d-flex align-items-center">
                <i
                  className="bx bx-bell me-2"
                  style={{ color: "var(--main-color)", fontSize: "1.25rem" }}
                ></i>
                <h6
                  className="m-0 fw-bold"
                  style={{ color: "var(--main-color)" }}
                >
                  Notifications
                </h6>
              </div>
              {notifications.filter((notif) => notif.isRead === 0).length >
                0 ? (
                <button
                  className="btn btn-sm text-nowrap"
                  style={{
                    color: "var(--yellow-color)",
                    backgroundColor: "rgba(var(--yellow-color-rgb), 0.1)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    transition: "all 0.2s ease",
                  }}
                  onClick={handleMarkAllNotifAsRead}
                >
                  Mark all as read
                </button>
              ) : (
                <button
                  className="btn btn-sm text-nowrap"
                  disabled
                  style={{
                    color: "var(--yellow-color-disabled)",
                    backgroundColor: "rgba(var(--yellow-color-rgb), 0.05)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    opacity: 0.5,
                  }}
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-5">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div
                    className="spinner-border"
                    role="status"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      color: "var(--yellow-color)",
                    }}
                  ></div>
                  <span
                    className="mt-3 fw-bold"
                    style={{ color: "var(--yellow-color)" }}
                  >
                    Loading notifications...
                  </span>
                </div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-3 py-5 text-center">
                <div className="mb-3">
                  <i
                    className="bx bx-bell-off"
                    style={{ fontSize: "3rem", color: "#ccc" }}
                  ></i>
                </div>
                <p className="text-muted">No notifications to display</p>
              </div>
            ) : (
              /* Scrollable Notification List */
              <div
                ref={notifContainerRef}
                onScroll={handleScroll}
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {notifications.map((notif, index) => (
                  <Dropdown.Item
                    key={notif.notificationID || index}
                    onClick={() => handleNotificationClick(notif)}
                    className="border-bottom p-3 d-flex align-items-start gap-3"
                    style={{
                      backgroundColor:
                        notif.isRead === 0
                          ? "rgba(var(--main-color-rgb), 0.05)"
                          : "white",
                      transition: "background-color 0.2s ease",
                    }}
                  >


                    {/* Notification content */}
                    <div
                      className="d-flex flex-column text-wrap text-break flex-grow-1"
                      style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                    >
                      <p
                        className={`mb-1 ${notif.isRead === 0 ? "fw-bold" : ""
                          }`}
                        style={{ fontSize: "0.9rem" }}
                      >
                        {notif.message}
                      </p>
                      <div className="d-flex flex-wrap justify-content-between align-items-center">
                        {notif.requestID && (
                          <span
                            className=""
                            style={{
                              backgroundColor:
                                "rgba(var(--main-color-rgb), 0.1)",
                              color: "var(--main-color)",
                              fontSize: "0.7rem",
                              fontWeight: "600",
                            }}
                          >
                            Request #{notif.requestID}
                          </span>
                        )}
                        <small
                          className="ms-auto mt-1"
                          style={{
                            fontSize: "0.7rem",
                            color: "#777",
                            fontWeight: notif.isRead === 0 ? "600" : "normal",
                          }}
                        >
                          {formatNotificationDate(notif.created)}
                        </small>
                      </div>
                    </div>

                    {/* Unread indicator */}
                    {notif.isRead === 0 && (
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "#ff4d4f",
                          marginTop: "10px",
                          flexShrink: "0",
                        }}
                      ></div>
                    )}
                  </Dropdown.Item>
                ))}

                {/* Loading more indicator */}
                {loadingMore && (
                  <div className="text-center bg-white py-3">
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      style={{ color: "var(--yellow-color)" }}
                    ></div>
                    <span
                      style={{
                        color: "var(--yellow-color)",
                        fontSize: "0.85rem",
                      }}
                    >
                      Loading more...
                    </span>
                  </div>
                )}
              </div>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default NotifButton;

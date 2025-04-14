import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Dropdown, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

// Initialize socket connection
const socket = io(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`); // Match your server URL

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
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
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
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
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
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
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
            <Toast.Header style={{ backgroundColor: "var(--main-color)" }}>
              <strong className="me-auto text-white">Notification</strong>
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
          className="btn btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center border-0"
          id="dropdown-basic"
          bsPrefix="none"
          style={{
            width: "2.5rem",
            height: "2.5rem",
          }}
        >
          <h5
            className="m-0 d-flex align-items-center justify-content-center "
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
                width: "1rem",
                height: "1rem",
                backgroundColor: "red",
                top: "0",
                right: "-.2rem",
              }}
            >
              <p
                className="m-0 text-white"
                style={{ fontSize: "clamp(.5rem, 1dvw, .7rem)" }}
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
              ref={notifContainerRef}
              style={{ maxHeight: "380px", overflowY: "auto" }}
              className="custom-scrollbar"
              onScroll={handleScroll}
            >
              {notifications.map((notif, index) => (
                <Dropdown.Item
                  key={notif.notificationID || index}
                  onClick={() => handleNotificationClick(notif)}
                  className={`border-bottom p-4 ${
                    notif.isRead === 0 ? "unread-notif fw-bold" : "bg-white"
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

              {/* Loading indicator for pagination */}
              {loadingMore && (
                <div className="text-center py-2">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    style={{ color: "var(--yellow-color)" }}
                  ></div>
                  <span
                    className="ms-2"
                    style={{ color: "var(--yellow-color)" }}
                  >
                    Loading more...
                  </span>
                </div>
              )}

              {/* End of list message */}
              {!hasMore && notifications.length > 0 && (
                <div className="text-center py-2 text-muted">
                  <small>No more notifications</small>
                </div>
              )}
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default NotifButton;

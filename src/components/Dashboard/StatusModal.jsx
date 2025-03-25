import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const StatusLabelsModal = ({ show, handleClose, notification, handleNotificationClick, formatNotificationDate }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>New Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {notification && (
                    <Dropdown.Item
                        key={notification.notificationID}
                        onClick={() => handleNotificationClick(notification)}
                        className={`border-bottom p-2 ${notification.isRead === 0 ? "unread-notif" : "bg-white"}`}
                    >
                        <div
                            className="d-flex flex-column text-wrap text-break"
                            style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                        >
                            <p className="mb-1" style={{ fontSize: "0.875rem" }}>
                                {notification.message}
                            </p>
                            <div className="d-flex justify-content-between gap-1">
                                {notification.requestID && (
                                    <small
                                        style={{ fontSize: "clamp(.6rem, .8dvw, .9rem)" }}
                                    >
                                        Request No.{notification.requestID}
                                    </small>
                                )}
                                <small className="ms-auto" style={{ fontSize: "10px" }}>
                                    {formatNotificationDate(notification.created)}
                                </small>
                            </div>
                        </div>
                    </Dropdown.Item>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const StatusModal = () => {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(null);
    const [newNotif, setNewNotif] = useState(false);
    const navigate = useNavigate();
    const userID = "USER_ID_HERE"; // Replace with actual userID logic

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/notifications/fetchNotification/${userID}`);
                if (response.data.Status === "Success" && response.data.data.length > 0) {
                    const sortedNotifications = response.data.data.sort((a, b) => new Date(b.created) - new Date(a.created));
                    setNotification(sortedNotifications[0]); // Always get the latest request
                } else {
                    setNotification(null);
                }
                setNewNotif(false);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        if (userID) {
            fetchNotifications();
        }
    }, [userID, newNotif]);

    useEffect(() => {
        socket.emit("join_user", userID);
        socket.on("new_notification", (newNotification) => {
            setNotification((prev) => (prev && new Date(prev.created) > new Date(newNotification.created) ? prev : newNotification));
            setNewNotif(true);
        });
        return () => {
            socket.off("new_notification");
        };
    }, [userID]);

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

    const handleNotificationClick = async (notif) => {
        try {
            await axios.post(`http://localhost:5000/api/notifications/markAsRead/${notif.requestID}`);
            navigate(`request-details/${notif.requestID}`);
            setNewNotif(true);
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Col className="m-0 p-0" onClick={handleShow} style={{ cursor: "pointer" }}>
                <div className="card-hover shadow-sm rounded p-3 h-100 d-flex align-items-center bg-white">
                    <div
                        className="text-white d-flex justify-content-center align-items-center p-3"
                        style={{ width: "60px", height: "60px" }}
                    >
                        <i
                            className="bx bx-user-plus fs-3 rounded-circle p-3"
                            style={{ backgroundColor: "var(--main-color)" }}
                        ></i>
                    </div>
                    <div className="ms-3">
                        <h5 className="text-success mb-1">{notification ? "1" : "0"}+</h5>
                        <h5 className="text-dark">New Request</h5>
                    </div>
                </div>
            </Col>
            <StatusLabelsModal
                show={show}
                handleClose={handleClose}
                notification={notification}
                handleNotificationClick={handleNotificationClick}
                formatNotificationDate={formatNotificationDate}
            />
        </>
    );
};

export default StatusModal;
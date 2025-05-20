import React from "react";
import { Modal, Button } from "react-bootstrap";

const PrivacyPolicyModal = ({ show, onHide, children }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Privacy Policy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children ? (
                    children
                ) : (
                    <>
                        <p>
                            This is where you can put your privacy policy details. You can add as much text or formatting as you need.
                        </p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button className="primaryButton border-0" onClick={onHide} style={{ minWidth: 100 }}>
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PrivacyPolicyModal; 
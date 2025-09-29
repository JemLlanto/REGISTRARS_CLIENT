import React, { useState } from "react";
import CancelButton from "../../components/requestDetails/CancelButton";
import ChangeStatusButton from "../../components/requestDetails/ChangeStatusButton";
import ViewScheduleSlip from "../../components/requestDetails/ViewScheduleSlip";
import InternalFeedbackDownload from "../../components/DownloadButton/InternalFeedbackDownload";
import ExternalFeedbackDownload from "../../components/DownloadButton/ExternalFeedbackDownload";
import { Dropdown } from "react-bootstrap";
import ChangeStatusButtonMobile from "./ChangeStatusButtonMobile";
import ScheduleSlipDownload from "../DownloadButton/ScheduleSlipDownload";

const RequestDetailsHeader = ({
  user,
  adminDetails,
  documentDetails,
  fetchDocumentDetails,
}) => {
  const [showChangeStatusPhoneModal, setShowChangeStatusPhoneModal] =
    useState(false);

  const handleShowChangeStatusPhoneModal = () => {
    setShowChangeStatusPhoneModal(true);
  };
  const handleCloseChangeStatusPhoneModal = () => {
    setShowChangeStatusPhoneModal(false);
  };

  return (
    <div
      className="rounded-2  p-2 d-flex align-items-center justify-content-between position-relative"
      style={{ backgroundColor: "var(--main-color)" }}
    >
      <h5
        className="fade-in m-0 p-2"
        style={{ color: "var(--secondMain-color)" }}
      >
        Request ID: {documentDetails.requestID}
      </h5>

      <ChangeStatusButtonMobile
        user={user}
        adminDetails={adminDetails}
        show={showChangeStatusPhoneModal}
        handleClose={handleCloseChangeStatusPhoneModal}
        documentDetails={documentDetails}
        fetchDocumentDetails={fetchDocumentDetails}
      />

      {user.isAdmin ? (
        <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
          <div className="d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
            {/* FOR DOWNLOAD BUTTONS */}
            {documentDetails.status === "ready to pickup" ||
            documentDetails.status === "completed" ? (
              <ScheduleSlipDownload
                documentDetails={documentDetails}
                fetchDocumentDetails={fetchDocumentDetails}
              />
            ) : null}
            {documentDetails.feedbackType === "internal" ? (
              <InternalFeedbackDownload
                user={user}
                documentDetails={documentDetails}
              />
            ) : (
              <ExternalFeedbackDownload
                user={user}
                documentDetails={documentDetails}
              />
            )}

            <CancelButton
              fetchDocumentDetails={fetchDocumentDetails}
              documentDetails={documentDetails}
              className="btn-sm btn-responsive"
            />
            <ChangeStatusButton
              user={user}
              adminDetails={adminDetails}
              fetchDocumentDetails={fetchDocumentDetails}
              documentDetails={documentDetails}
              className="btn-sm btn-responsive"
            />
          </div>
        </div>
      ) : (
        <>
          {documentDetails.status === "ready to pickup" ||
          documentDetails.status === "completed" ? (
            <div className="d-none d-md-flex d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
              <div className="col-12 col-md-auto d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
                <ScheduleSlipDownload
                  documentDetails={documentDetails}
                  fetchDocumentDetails={fetchDocumentDetails}
                />
              </div>
            </div>
          ) : null}
        </>
      )}

      <div className="d-block d-md-none rounded-3 mx-0">
        <div className="col-12 text-center">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              className="p-3 m-0 d-flex align-items-center justify-content-end gap-2 shadow-none border-0"
              id="dropdown-basic"
              style={{ backgroundColor: "var(--main-color)" }}
            ></Dropdown.Toggle>
            <Dropdown.Menu className="text-center ">
              {user.isAdmin ? (
                <>
                  <Dropdown.Item className="text-dark bg-white py-0 my-1">
                    <ScheduleSlipDownload
                      documentDetails={documentDetails}
                      fetchDocumentDetails={fetchDocumentDetails}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item className="text-dark bg-white py-0 my-1">
                    {documentDetails.feedbackType === "internal" ? (
                      <InternalFeedbackDownload
                        user={user}
                        documentDetails={documentDetails}
                      />
                    ) : (
                      <ExternalFeedbackDownload
                        user={user}
                        documentDetails={documentDetails}
                      />
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item className="text-dark bg-white py-0 mb-1">
                    <CancelButton
                      fetchDocumentDetails={fetchDocumentDetails}
                      documentDetails={documentDetails}
                      className="btn-sm btn-responsive w-100 px-5"
                    />
                  </Dropdown.Item>
                  <Dropdown.Item className="text-dark bg-white py-0 mb-1">
                    {/* FOR MOBILE STATUS UPDATE */}
                    <button
                      className="btn btn-success btn-sm btn-responsive w-100 d-md-none"
                      onClick={handleShowChangeStatusPhoneModal}
                      disabled={
                        documentDetails.status === "cancelled" ||
                        documentDetails.status === "completed" ||
                        documentDetails.status === "" ||
                        !documentDetails.status
                      }
                    >
                      <p className="m-0">
                        {documentDetails.status === "pending"
                          ? "Processing"
                          : documentDetails.status === "processing"
                          ? "Ready to Pickup"
                          : documentDetails.status === "ready to pickup"
                          ? "Completed"
                          : documentDetails.status === "cancelled"
                          ? "Cancelled"
                          : documentDetails.status === "unclaimed"
                          ? "Completed"
                          : "Claimed"}
                      </p>
                    </button>
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item className="text-dark bg-white py-0">
                    <ScheduleSlipDownload
                      documentDetails={documentDetails}
                      fetchDocumentDetails={fetchDocumentDetails}
                    />
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsHeader;

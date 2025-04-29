import React from "react";
import CancelButton from "../../components/requestDetails/CancelButton";
import ChangeStatusButton from "../../components/requestDetails/ChangeStatusButton";
import ViewScheduleSlip from "../../components/requestDetails/ViewScheduleSlip";
import InternalFeedbackDownload from "../../components/DownloadButton/InternalFeedbackDownload";
import ExternalFeedbackDownload from "../../components/DownloadButton/ExternalFeedbackDownload";
import { Dropdown } from "react-bootstrap";

const RequestDetailsHeader = ({
  user,
  documentDetails,
  fetchDocumentDetails,
}) => {
  return (
    <div
      className="rounded-2  p-2 d-flex align-items-center justify-content-between"
      style={{ backgroundColor: "var(--main-color)" }}
    >
      <h5
        className="fade-in m-0 p-2"
        style={{ color: "var(--secondMain-color)" }}
      >
        Request ID: {documentDetails.requestID}
      </h5>

      {user.isAdmin ? (
        <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
          <div className="d-flex flex-column flex-md-row gap-2 ms-md-auto text-center">
            {/* FOR DOWNLOAD BUTTONS */}
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
                <ViewScheduleSlip
                  fetchDocumentDetails={fetchDocumentDetails}
                  documentDetails={documentDetails}
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
                    <ChangeStatusButton
                      fetchDocumentDetails={fetchDocumentDetails}
                      documentDetails={documentDetails}
                      className="btn-sm btn-responsive w-100"
                    />
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item className="text-dark bg-white py-0 mb-1">
                    <ViewScheduleSlip
                      fetchDocumentDetails={fetchDocumentDetails}
                      documentDetails={documentDetails}
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

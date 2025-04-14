import React from "react";
import CancelButton from "../../components/requestDetails/CancelButton";
import ChangeStatusButton from "../../components/requestDetails/ChangeStatusButton";
import ViewScheduleSlip from "../../components/requestDetails/ViewScheduleSlip";
import InternalFeedbackDownload from "../../components/DownloadButton/InternalFeedbackDownload";
import ExternalFeedbackDownload from "../../components/DownloadButton/ExternalFeedbackDownload";

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
            <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
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

      {user.isAdmin ? (
        <div className="d-block d-md-none rounded-3 p-1 mx-0">
          <div className="col-12 text-center">
            <div className="dropdown">
              <button
                className="btn primaryButton text-white dropdown-toggle w-100"
                type="button"
                id="mobileActionsDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul
                className="dropdown-menu w-100  text-center"
                aria-labelledby="mobileActionsDropdown"
              >
                <li className="dropdown-item">
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
                </li>
                <li className="dropdown-item">
                  <CancelButton
                    fetchDocumentDetails={fetchDocumentDetails}
                    documentDetails={documentDetails}
                    className="btn-sm btn-responsive w-100 px-5"
                  />
                </li>
                <li className="dropdown-item">
                  <ChangeStatusButton
                    fetchDocumentDetails={fetchDocumentDetails}
                    documentDetails={documentDetails}
                    className="btn-sm btn-responsive w-100"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          {documentDetails.status === "ready to pickup" ||
          documentDetails.status === "completed" ? (
            <div className="d-none d-md-block d-flex align-items-center justify-content-between rounded-3 p-1 mx-0">
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
    </div>
  );
};

export default RequestDetailsHeader;

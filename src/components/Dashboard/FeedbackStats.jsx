import React, { useEffect, useState } from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import Feedback from "./Modal/Feedback";

const FeedbackStats = ({ currentDocuments, isLoading }) => {
  const [docCount, setDocCount] = useState(0);
  const [internalRespond, setInternalRespond] = useState([]);
  const [internalCount, setInternalCount] = useState([]);
  const [externalRespond, setExternalRespond] = useState([]);
  const [externalCount, setExternalCount] = useState([]);

  useEffect(() => {
    const docCount = currentDocuments.length;
    setDocCount(docCount);

    const internal = currentDocuments.filter(
      (doc) => doc.feedbackType === "internal"
    );
    const internalRespond = internal.filter((doc) => doc.responded === 1);
    setInternalRespond(internalRespond);
    setInternalCount(internal);

    const external = currentDocuments.filter(
      (doc) => doc.feedbackType === "external"
    );
    const externalRespond = internal.filter((doc) => doc.responded === 1);
    setExternalRespond(externalRespond);
    setExternalCount(external);
  }, [currentDocuments]);

  return (
    <div
      className="w-100 bg-white d-flex flex-column justify-content-center align-items-center rounded gap-2 position-relative"
      style={{ height: "25dvh" }}
    >
      {isLoading ? (
        <>
          <div
            className="position-absolute d-flex justify-content-center align-items-center"
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgb(255, 255, 255, 0.7)",
              zIndex: 1,
              borderRadius: "8px",
              backdropFilter: "blur(2px)",
            }}
          >
            <Spinner animation="border" variant="black" size="lg" />
          </div>
        </>
      ) : null}
      {internalCount.length > 0 || externalCount.length > 0 ? (
        <>
          <>
            <div className=" d-flex flex-column gap-3 w-100 px-2 px-sm-5 py-3 py-md-4">
              <div>
                <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                  <h5 className="m-0">Internal Feedbacks</h5>
                  <Feedback feedbackData={internalCount} type="Internal" />
                </div>
                {internalCount.length > 0 ? (
                  <>
                    <ProgressBar>
                      <ProgressBar
                        animated
                        now={
                          (internalRespond.length / internalCount.length) * 100
                        }
                        label={`${internalRespond.length} (${Math.round(
                          (internalRespond.length / internalCount.length) * 100
                        )}%)`}
                        style={{ backgroundColor: "var(--main-color)" }}
                      />
                      <ProgressBar
                        animated
                        now={Math.round(
                          101 -
                            (internalRespond.length / internalCount.length) *
                              100
                        )}
                        label={`${
                          internalCount.length - internalRespond.length
                        } (${Math.round(
                          100 -
                            (internalRespond.length / internalCount.length) *
                              100
                        )}%)`}
                        style={{ backgroundColor: "#b3b3b3" }}
                      />
                    </ProgressBar>
                  </>
                ) : (
                  <>
                    <ProgressBar>
                      <ProgressBar
                        now={100}
                        label={`No Internal Feedback`}
                        style={{ backgroundColor: "#b3b3b3" }}
                      />
                    </ProgressBar>
                  </>
                )}
              </div>
              <div>
                <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                  <h5 className="m-0">External Feedbacks</h5>
                  <Feedback feedbackData={externalCount} type="External" />
                </div>
                {externalCount.length > 0 ? (
                  <>
                    <ProgressBar>
                      <ProgressBar
                        animated
                        now={
                          (externalRespond.length / externalCount.length) * 100
                        }
                        label={`${externalRespond.length} (${Math.round(
                          (externalRespond.length / externalCount.length) * 100
                        )}%)`}
                        style={{ backgroundColor: "var(--main-color)" }}
                      />
                      <ProgressBar
                        animated
                        now={Math.round(
                          101 -
                            (externalRespond.length / externalCount.length) *
                              100
                        )}
                        label={`${
                          externalCount.length - externalRespond.length
                        } (${Math.round(
                          100 -
                            (externalRespond.length / externalCount.length) *
                              100
                        )}%)`}
                        style={{ backgroundColor: "#b3b3b3" }}
                      />
                    </ProgressBar>
                  </>
                ) : (
                  <>
                    <ProgressBar>
                      <ProgressBar
                        now={100}
                        label={`No External Feedback`}
                        style={{ backgroundColor: "#b3b3b3" }}
                      />
                    </ProgressBar>
                  </>
                )}
              </div>
            </div>
          </>
        </>
      ) : (
        <>
          <div
            className="spinner-container d-flex justify-content-center align-items-center spinner-container"
            style={{ height: "100%" }}
          >
            <p className="text-muted text-center m-0 p-3 mt-3">
              No feedback found.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackStats;

import React from "react";
import { Row, Col } from "react-bootstrap";
import Processing from "./Modal/Processing";
import Completed from "./Modal/Completed";
import ForRelease from "./Modal/ForRelease";
import CountUp from "react-countup";
import Unclaimed from "./Modal/Unclaimed";
import Cancelled from "./Modal/Cancelled";
import Preparing from "./Modal/Preparing";

const StatusLabels = ({ requestedDocuments }) => {
  const pendingRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "pending",
  );
  const processingRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "processing",
  );
  const readyToPickupRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "ready to pickup",
  );
  const completedRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "completed",
  );
  const unclaimedRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "unclaimed",
  );
  const cancelledRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "cancelled",
  );
  return (
    <Row className="w-100 mt-1 mx-0">
      <Col xs={6} md={4} className="m-0 p-0">
        <Processing
          totalRequest={requestedDocuments.length}
          pendingRequests={pendingRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col xs={6} md={4} className="m-0 p-0">
        <Preparing
          totalRequest={requestedDocuments.length}
          processingRequests={processingRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col xs={6} md={4} className="m-0 p-0">
        <ForRelease
          totalRequest={requestedDocuments.length}
          readyToPickupRequests={readyToPickupRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col xs={6} md={4} className="m-0 p-0">
        <Completed
          totalRequest={requestedDocuments.length}
          completedRequests={completedRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col xs={6} md={4} className="m-0 p-0">
        <Unclaimed
          totalRequest={requestedDocuments.length}
          unclaimedRequests={unclaimedRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col xs={6} md={4} className="m-0 p-0">
        <Cancelled
          totalRequest={requestedDocuments.length}
          cancelledRequests={cancelledRequests}
          CountUp={CountUp}
        />
      </Col>
    </Row>
  );
};

export default StatusLabels;

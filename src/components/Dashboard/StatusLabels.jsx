import React from "react";
import { Row, Col } from "react-bootstrap";
import Pending from "./Modal/Pending";
import Processing from "./Modal/Processing";
import Completed from "./Modal/Completed";
import ReadyToPickup from "./Modal/ReadyToPickup";
import CountUp from "react-countup";

const StatusLabels = ({ requestedDocuments }) => {
  const pendingRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "pending"
  );
  const processingRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "processing"
  );
  const readyToPickupRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "ready to pickup"
  );
  const completedRequests = requestedDocuments.filter(
    (request) => request.status.toLowerCase() === "completed"
  );

  return (
    <Row className="w-100 mt-1 mx-0">
      <Col xs={6} lg={3} className="m-0 p-0">
        <Pending
          totalRequest={requestedDocuments.length}
          pendingRequests={pendingRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col xs={6} lg={3} className="m-0 p-0">
        <Processing
          totalRequest={requestedDocuments.length}
          processingRequests={processingRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col xs={6} lg={3} className="m-0 p-0">
        <ReadyToPickup
          totalRequest={requestedDocuments.length}
          readyToPickupRequests={readyToPickupRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col xs={6} lg={3} className="m-0 p-0">
        <Completed
          totalRequest={requestedDocuments.length}
          completedRequests={completedRequests}
          CountUp={CountUp}
        />
      </Col>
    </Row>
  );
};

export default StatusLabels;

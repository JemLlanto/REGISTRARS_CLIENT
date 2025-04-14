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
    <Row className="w-100 mx-auto gap-2 mt-2">
      <Col className="m-0 p-0">
        <Pending pendingRequests={pendingRequests} CountUp={CountUp} />
      </Col>
      <Col className="m-0 p-0">
        <Processing processingRequests={processingRequests} CountUp={CountUp} />
      </Col>
      <Col className="m-0 p-0">
        <ReadyToPickup
          readyToPickupRequests={readyToPickupRequests}
          CountUp={CountUp}
        />
      </Col>
      <Col className="m-0 p-0">
        <Completed completedRequests={completedRequests} CountUp={CountUp} />
      </Col>
    </Row>
  );
};

export default StatusLabels;

import Accordion from "react-bootstrap/Accordion";

function PurposeCollapse() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Transcript of Records (For Employment Abroad)
        </Accordion.Header>
        <Accordion.Body>
          <div>this is for type of documents</div>

          <div>this is for uploading file</div>

          <div>this is for inputs</div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default PurposeCollapse;

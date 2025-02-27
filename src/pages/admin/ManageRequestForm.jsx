import { Modal } from "bootstrap";
import React from "react";
import ProgramModal from "../../components/Modals/programModal";
import PurposeModal from "../../components/Modals/purposeModal";
const ManageRequestForm = () => {
  return (
    <div className="w-100 p-4">
      <div
        className="rounded-2 shadow-sm text-white p-2"
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
          Manage Request Form
        </h5>
      </div>

      <div className="w-100 h-50 bg-light shadow-sm rounded-2 p-3 mt-5">
        <div className="d-flex align-items-start flex-column">
          <div className="">
            <h5>Program/Course</h5>
          </div>
          <div>
            <ProgramModal></ProgramModal>
          </div>
        </div>
        <div className="d-flex align-items-start flex-column">
          <div className="">
            <h5>Purpose</h5>
          </div>
          <div>
            <PurposeModal></PurposeModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequestForm;

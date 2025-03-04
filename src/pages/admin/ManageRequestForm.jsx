import { Modal } from "bootstrap";
import React from "react";
import ProgramModal from "../../components/ManageRequestForm/programModal";
import PurposeModal from "../../components/ManageRequestForm/purposeModal";
import YearGraduatedModal from "../../components/ManageRequestForm/yearGraduatedModal";
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

      <div className="w-100 d-flex flex-column gap-2 p-3 mt-5">
        <ProgramModal></ProgramModal>
        <YearGraduatedModal></YearGraduatedModal>
        <PurposeModal></PurposeModal>
      </div>
    </div>
  );
};

export default ManageRequestForm;

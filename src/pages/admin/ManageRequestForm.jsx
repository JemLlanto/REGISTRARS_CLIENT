import { Modal } from "bootstrap";
import React from "react";
import AdminModal from "../../components/Modals/Modals";

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
            <AdminModal></AdminModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequestForm;

import React, { useState } from "react";
import { Table } from "react-bootstrap";
import AdminModal from "../../components/ManageAdmin/AdminModal";

const ManageAdmin = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="w-100 p-4">
        <div
          className="rounded-2 shadow-sm text-white p-2"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
            Admin Panel
          </h5>
          <AdminModal />
        </div>

        <div className="w-100 d-flex flex-column gap-2 p-3 mt-3 mx-0 bg-white shadow-sm rounded-2">
          <div className="p-2">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Program/Courses</th>
                  <th>Administrator</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BS INFOTECH</td>
                  <td>BORCE</td>
                  <td>
                    <button className="btn btn-primary">Add admin</button>
                    <button className="btn btn-danger">Remove admin</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAdmin;

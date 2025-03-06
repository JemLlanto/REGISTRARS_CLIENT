import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

export default function StudentRequests() {
    const { user } = useOutletContext();
    const [requestedDocuments, setRequestedDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/fetchingDocuments/fetchRequestedDocuments`)
            .then((res) => {
                if (res.data.Status === "Success") {
                    console.log("requestedDocuments", res.data.data);
                    setRequestedDocuments(res.data.data);
                } else if (res.data.Message) {
                    console.log("Error:", res.data.Message);
                }
            })
            .catch((err) => {
                console.log("Error fetching Programs: ", err);
            });
    }, [user]);

    // Filter documents based on search input
    const filteredRequests = requestedDocuments.filter((request) =>
        `${request.firstName} ${request.lastName} ${request.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 w-100 overflow-auto" style={{ height: "90dvh" }}>
            <div
                className="rounded-2 shadow-sm text-white p-2 mb-3"
                style={{ backgroundColor: "var(--main-color)" }}
            >
                <h5 className="m-0 p-2" style={{ color: "var(--secondMain-color)" }}>
                    Student Request list
                </h5>
            </div>
            {/* Search Bar */}
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label className="text-muted" htmlFor="searchInput">Search by name or email</label>
            </div>

            <div className="mt-3 d-flex flex-column gap-3">
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                        <Link
                            key={request.requestID}
                            className="text-decoration-none text-dark"
                            to={`/request-details/${request.requestID}`}
                        >
                            <div className="row mx-auto g-2 bg-light rounded shadow-sm p-3">
                                <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">Purpose:</h5>
                                    <p className="m-0 me-1">{request.firstName}</p>
                                    <p className="m-0">{request.lastName}</p>
                                </div>

                                <div className="bg-dark w-100 d-block d-sm-none" style={{ height: "1px" }}></div>

                                <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">Student ID:</h5>
                                    <p className="m-0">{request.email}</p>
                                </div>

                                <div className="bg-dark w-100 d-block d-sm-none" style={{ height: "1px" }}></div>

                                <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">Date:</h5>
                                    <p className="m-0">{new Date(request.created).toLocaleDateString()}</p>
                                </div>

                                <div className="bg-dark w-100 d-block d-sm-none" style={{ height: "1px" }}></div>

                                <div className="col-12 col-sm d-flex align-items-center justify-content-center">
                                    <h5 className="m-0 fw-bold me-1 d-block d-sm-none">Status:</h5>
                                    <h5 className="m-0 text-warning">Pending</h5>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No pending request</p>
                )}
            </div>
        </div>
    );
}

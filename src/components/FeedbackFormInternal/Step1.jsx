import React from "react";

const StepOne = () => (
    <div className="row">
        <div className="col-12 col-md-6">
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="name" placeholder="Name" />
                <label htmlFor="name">Full Name</label>
            </div>
        </div>
        <div className="col-12 col-md-6">
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="agency" placeholder="Agency" />
                <label htmlFor="agency">Agency</label>
            </div>
        </div>
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" placeholder="Email Address" />
            <label htmlFor="email">Email Address</label>
        </div>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="visit" placeholder="Purpose of Visit" />
            <label htmlFor="visit">Purpose of Visit</label>
        </div>
        <div className="form-floating mb-3">
            <input type="date" className="form-control" id="date" placeholder="Date of Visit" />
            <label htmlFor="date">Date of Visit</label>
        </div>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="staff" placeholder="Attending Staff" />
            <label htmlFor="staff">Attending Staff</label>
        </div>
    </div>
);

export default StepOne;
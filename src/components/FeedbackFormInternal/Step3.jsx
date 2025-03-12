import React from "react";

const StepThree = () => (
    <>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="address" placeholder="Address" />
            <label htmlFor="address">Address</label>
        </div>
        <div className="form-floating mb-3">
            <input type="date" className="form-control" id="dob" placeholder="Date of Birth" />
            <label htmlFor="dob">Date of Birth</label>
        </div>
    </>
);

export default StepThree;
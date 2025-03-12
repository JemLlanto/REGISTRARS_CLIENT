import React from "react";


const StepTwo = () => (
    <>
        <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mb-3">
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
    </>
);
export default StepTwo;
import React from 'react';

const PersonalInfoStep = ({ formData, handleChange }) => {
    return (
        <>
            <h5 className="mb-3">Personal Information</h5>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Attending Staff:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="attendingStaff"
                            value={formData.attendingStaff}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Agency:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="agency"
                            value={formData.agency}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Date of Visit:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateVisit"
                            value={formData.dateVisit}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Email Address:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Purpose of Visit:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="purposeOfVisit"
                            value={formData.purposeOfVisit}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalInfoStep;
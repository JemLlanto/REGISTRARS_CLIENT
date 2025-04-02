import React from 'react';

const PersonalInfoStep = ({ formData, handleChange }) => {
    return (
        <div className="container p-4">
            <div className="mb-4">
                <p className="m-0">
                    This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices.
                    Your feedback on your recently concluded transaction will help this office provide a better service.
                    Personal information shared will be kept confidential and you always have the option to not answer this form.
                </p>
            </div>

            {/* Client Type */}
            <div className="row mb-3">
                <div className="col-12">
                    <label className="form-label">Client Type (Uri ng Kliyente):</label>
                    <div className="d-flex gap-4">
                        {["Citizen", "Business", "Government"].map((type) => (
                            <div className="form-check" key={type}>
                                <input
                                    className="form-check-input  border-black"
                                    type="radio"
                                    name="clientType"
                                    id={type.toLowerCase()}
                                    value={type}
                                    checked={formData?.clientType === type}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor={type.toLowerCase()}>
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Date, Sex, Age */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <label htmlFor="date" className="form-label">Date (Petsa):</label>
                        <input
                            type="date"
                            className="form-control  border-black"
                            id="date"
                            name="date"
                            value={formData?.date || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Sex (Kasarian):</label>
                    <div className="d-flex gap-4">
                        {["Male", "Female"].map((gender) => (
                            <div className="form-check" key={gender}>
                                <input
                                    className="form-check-input border-black"
                                    type="radio"
                                    name="sex"
                                    id={gender.toLowerCase()}
                                    value={gender}
                                    checked={formData?.sex === gender}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor={gender.toLowerCase()}>
                                    {gender}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <label htmlFor="age" className="form-label">Age (Edad):</label>
                        <input
                            type="number"
                            className="form-control border-black"
                            id="age"
                            name="age"
                            value={formData?.age || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Service Availed */}
            <div className="row mb-3">
                <div className="col-md-12">
                    <div className="form-group mb-3">
                        <label htmlFor="serviceAvailed" className="form-label">Service Availed (Uri ng transaksyon o serbisyo):</label>
                        <input
                            type="text"
                            className="form-control border-black"
                            id="serviceAvailed"
                            name="serviceAvailed"
                            value={formData?.serviceAvailed || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoStep;

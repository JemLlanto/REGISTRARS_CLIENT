import React from 'react';

const RatingStep = ({ formData, handleChange }) => {
    // For debugging purposes
    console.log("Current ratings:", formData.ratings);

    return (
        <>
            <h5 className="mb-3">Service Ratings</h5>
            <p className="small mb-3">Please tick your rating concerning our services.</p>

            <table className="table table-bordered small">
                <thead>
                    <tr>
                        <th style={{ width: "35%" }}></th>
                        <th colSpan="5" className="text-center">Rating</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th className="text-center">Highly Satisfied</th>
                        <th className="text-center">Very Satisfied</th>
                        <th className="text-center">Moderately Satisfied</th>
                        <th className="text-center">Barely Satisfied</th>
                        <th className="text-center">Not Satisfied</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Main Category A */}
                    <tr>
                        <td className="fw-semibold">A. Courtesy</td>
                        {["Highly Satisfied", "Very Satisfied", "Moderately Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                            <td key={rating} className="text-center">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="rating-courtesy"
                                    value={rating}
                                    onChange={handleChange}
                                    checked={formData.ratings.courtesy === rating}
                                />
                            </td>
                        ))}
                    </tr>

                    {/* Main Category B - Header */}
                    <tr>
                        <td className="fw-semibold">B. Service</td>
                        <td colSpan="5"></td>
                    </tr>

                    {/* Service subcategories */}
                    <tr>
                        <td className="ps-4">1. Quality</td>
                        {["Highly Satisfied", "Very Satisfied", "Moderately Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                            <td key={rating} className="text-center">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="rating-service_quality"
                                    value={rating}
                                    onChange={handleChange}
                                    checked={formData.ratings.service_quality === rating}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="ps-4">2. Timeliness</td>
                        {["Highly Satisfied", "Very Satisfied", "Moderately Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                            <td key={rating} className="text-center">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="rating-service_timeliness"
                                    value={rating}
                                    onChange={handleChange}
                                    checked={formData.ratings.service_timeliness === rating}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="ps-4">3. Efficiency</td>
                        {["Highly Satisfied", "Very Satisfied", "Moderately Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                            <td key={rating} className="text-center">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="rating-service_efficiency"
                                    value={rating}
                                    onChange={handleChange}
                                    checked={formData.ratings.service_efficiency === rating}
                                />
                            </td>
                        ))}
                    </tr>

                    {/* Main Category C - Header */}
                    <tr>
                        <td className="fw-semibold">C. Physical condition of office/work space</td>
                        <td colSpan="5"></td>
                    </tr>

                    {/* Physical condition subcategories */}
                    <tr>
                        <td className="ps-4">1. Cleanliness</td>
                        {["Highly Satisfied", "Very Satisfied", "Moderately Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                            <td key={rating} className="text-center">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="rating-physical_cleanliness"
                                    value={rating}
                                    onChange={handleChange}
                                    checked={formData.ratings.physical_cleanliness === rating}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="ps-4">2. Comfort</td>
                        {["Highly Satisfied", "Very Satisfied", "Moderately Satisfied", "Barely Satisfied", "Not Satisfied"].map((rating) => (
                            <td key={rating} className="text-center">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="rating-physical_comfort"
                                    value={rating}
                                    onChange={handleChange}
                                    checked={formData.ratings.physical_comfort === rating}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default RatingStep;
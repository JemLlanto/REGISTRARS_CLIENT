import React from "react";

const RatingStep = ({ formData, handleChange }) => {
  const ratings = [
    "Highly Satisfied",
    "Very Satisfied",
    "Moderately Satisfied",
    "Barely Satisfied",
    "Not Satisfied",
  ];
  return (
    <div className="table-responsive">
      <h5 className="mb-3 fw-bold text-dark">Service Ratings</h5>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-light text-center">
          <tr>
            <th style={{ width: "35%" }}></th>
            <th colSpan="5">Rating</th>
          </tr>
          <tr>
            <th></th>
            {ratings.map((rating, index) => (
              <th key={index} className="text-center small">
                {rating}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Courtesy */}
          <tr className="fw-semibold bg-light">
            <td>A. Courtesy</td>
            {ratings.map((rating) => (
              <td key={rating} className="text-center">
                <input
                  type="radio"
                  className="form-check-input border border-dark"
                  name="rating-courtesy"
                  value={rating}
                  onChange={handleChange}
                  checked={formData.ratings.courtesy === rating}
                />
              </td>
            ))}
          </tr>

          {/* Service Category */}
          <tr className="fw-semibold bg-light">
            <td>B. Service</td>
            <td colSpan="5"></td>
          </tr>

          {["Quality", "Timeliness", "Efficiency"].map((subCategory, index) => (
            <tr key={index}>
              <td className="ps-4">
                {index + 1}. {subCategory}
              </td>
              {[
                "Highly Satisfied",
                "Very Satisfied",
                "Moderately Satisfied",
                "Barely Satisfied",
                "Not Satisfied",
              ].map((rating) => (
                <td key={rating} className="text-center">
                  <input
                    type="radio"
                    className="form-check-input border border-dark"
                    name={`rating-service_${subCategory.toLowerCase()}`}
                    value={rating}
                    onChange={handleChange}
                    checked={
                      formData.ratings[
                        `service_${subCategory.toLowerCase()}`
                      ] === rating
                    }
                  />
                </td>
              ))}
            </tr>
          ))}

          {/* Physical Condition */}
          <tr className="fw-semibold bg-light">
            <td>C. Physical condition of office/work space</td>
            <td colSpan="5"></td>
          </tr>

          {["Cleanliness", "Comfort"].map((subCategory, index) => (
            <tr key={index}>
              <td className="ps-4">
                {index + 1}. {subCategory}
              </td>
              {[
                "Highly Satisfied",
                "Very Satisfied",
                "Moderately Satisfied",
                "Barely Satisfied",
                "Not Satisfied",
              ].map((rating) => (
                <td key={rating} className="text-center">
                  <input
                    type="radio"
                    className="form-check-input border border-dark"
                    name={`rating-physical_${subCategory.toLowerCase()}`}
                    value={rating}
                    onChange={handleChange}
                    checked={
                      formData.ratings[
                        `physical_${subCategory.toLowerCase()}`
                      ] === rating
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingStep;

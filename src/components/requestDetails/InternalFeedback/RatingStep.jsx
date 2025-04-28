import React from "react";

const RatingStep = ({ formData, handleChange }) => {
  const ratings = [
    "Highly Satisfied",
    "Very Satisfied",
    "Moderately Satisfied",
    "Barely Satisfied",
    "Not Satisfied",
  ];

  // Add this function to handle clicks on the entire cell
  const handleCellClick = (name, value) => {
    handleChange({
      target: {
        name: name,
        value: value,
      },
    });
  };

  return (
    <div className="table-responsive">
      <h5 className="m-0 mb-2 fw-bold text-dark">Service Ratings</h5>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-light text-center">
          <tr>
            <th style={{ width: "60%" }}></th>
            <th colSpan="5">
              <h5 className="m-0 fw-bold">Rating</h5>
            </th>
          </tr>
          <tr>
            <th></th>
            {ratings.map((rating, index) => (
              <th key={index} className="text-center small">
                <p className="m-0 fw-bold">{rating}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Courtesy */}
          <tr className="fw-semibold bg-light">
            <td>
              <p className="m-0 fw-bold">A. Courtesy</p>
            </td>
            {ratings.map((rating) => (
              <td
                key={rating}
                className="text-center"
                onClick={() => handleCellClick("rating-courtesy", rating)}
                style={{ cursor: "pointer" }}
              >
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
            <td>
              <p className="m-0 fw-bold">B. Service</p>
            </td>
            <td colSpan="5"></td>
          </tr>

          {["Quality", "Timeliness", "Efficiency"].map((subCategory, index) => (
            <tr key={index}>
              <td className="ps-3">
                <p className="m-0">{subCategory}</p>
              </td>
              {[
                "Highly Satisfied",
                "Very Satisfied",
                "Moderately Satisfied",
                "Barely Satisfied",
                "Not Satisfied",
              ].map((rating) => (
                <td
                  key={rating}
                  className="text-center"
                  onClick={() =>
                    handleCellClick(
                      `rating-service_${subCategory.toLowerCase()}`,
                      rating
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
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
            <td>
              <p className="m-0 fw-bold">
                C. Physical condition of office/work space
              </p>
            </td>
            <td colSpan="5"></td>
          </tr>

          {["Cleanliness", "Comfort"].map((subCategory, index) => (
            <tr key={index}>
              <td className="ps-3">
                <p className="m-0">{subCategory}</p>
              </td>
              {[
                "Highly Satisfied",
                "Very Satisfied",
                "Moderately Satisfied",
                "Barely Satisfied",
                "Not Satisfied",
              ].map((rating) => (
                <td
                  key={rating}
                  className="text-center"
                  onClick={() =>
                    handleCellClick(
                      `rating-physical_${subCategory.toLowerCase()}`,
                      rating
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
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

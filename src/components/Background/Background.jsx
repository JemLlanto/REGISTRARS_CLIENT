import React from 'react'

export const Background = () => {
  return (
    <div>
      <div className="position-absolute top-0 start-0 w-100 h-100">
        {/* statue */}
        <img
          src="/1.png"
          alt="Background 1"
          className="img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          style={{ zIndex: "1" }}
        />
      </div>
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <img
          src="/2.png"
          alt="Background 2"
          className="img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        />
      </div>
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <img
          src="/3.png"
          alt="Background 3"
          className="img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        />
      </div>
    </div>
  )
}

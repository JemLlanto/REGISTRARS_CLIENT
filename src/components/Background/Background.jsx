import React from "react";

export const Background = () => {
  return (
    <div
      className="position-absolute overflow-hidden"
      style={{ height: "100dvh", width: "100dvw", top: "0", left: "0" }}
    >
      {/* background image */}
      <div className="backgroundContainer" style={{ top: "0", left: "0" }}>
        <img
          src="/2.png"
          alt="Background 2"
          className=""
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      {/* left border */}
      <div className="backgroundContainer" style={{ top: "0", left: "0" }}>
        <img
          src="/3.png"
          alt="Background 3"
          className=""
          style={{
            height: "100%",
            // width: "100%",
            objectFit: "cover",
            bottom: "0",
          }}
        />
      </div>
      <div
        className="backgroundContainer d-flex justify-content-end"
        style={{ bottom: "0", right: "0" }}
      >
        {/* statue */}
        <img
          src="/1.png"
          alt="Background 1"
          className=""
          style={{
            zIndex: "1",
            height: "100%",
            // width: "100%",
            objectFit: "cover",
            // bottom: "0",
          }}
        />
      </div>
    </div>
  );
};

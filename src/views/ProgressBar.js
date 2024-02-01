
// ProgressBar.js
import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div>
      <p>Progress: {progress}%</p>
      <div
        style={{ width: "100%", backgroundColor: "#e0e0e0", height: "10px" }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: "#4caf50",
            height: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
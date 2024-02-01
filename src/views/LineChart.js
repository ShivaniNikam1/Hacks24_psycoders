import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

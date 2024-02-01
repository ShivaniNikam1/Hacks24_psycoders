import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
  const data = {
    labels: chartData.map((data) => data.category),
    datasets: [
      {
        data: chartData.map((data) => data.progress),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;

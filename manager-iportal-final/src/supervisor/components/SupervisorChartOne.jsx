import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export const SupervisorChartOne = ({ chartData }) => {
  return (
    <>
      <Line data={chartData} />
    </>
  );
};

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ positive, negative, neutral }) => {
  const [state, setState] = useState({
    series: [
      Number(positive),
      Number(negative),
      100.0 - (Number(positive) + Number(negative)),
    ],
    options: {
      chart: {
        width: 480,
        type: "pie",
      },
      labels: ["Positive", "Negative", "Neutral"],
      colors: ["#8ADE80", "#FF4C72", "#4B5563"],
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div className="flex justify-center md:block">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
        width={480}
      />
    </div>
  );
};

export default Chart;

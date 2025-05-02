import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PolarChart = ({positive, negative}) => {
  const [chartData] = useState({
    series: [
      positive.toFixed(2)*5,
      negative.toFixed(2)*5,
      (100 - (positive + negative)).toFixed(2),
    ],
    options: {
      chart: {
        type: "polarArea",
        width: 200,
      },
      labels: [
        `${positive.toFixed(2)}% Positive`, `${negative.toFixed(2)}% Negative`, `${(100-(positive+negative)).toFixed(2)}% Neutral`
      ],
      colors: ["green", "red", "gray"],
      tooltip: {
        y: {
          formatter: function (value, { seriesIndex }) {
            if (seriesIndex === 0) return `${positive.toFixed(2)}% Positive`;
            if (seriesIndex === 1) return `${negative.toFixed(2)}% Negative`;
            return `${(100 - (positive + negative)).toFixed(2)}% Neutral`;
          }
        }
      },
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.85,
      },
      responsive: [
        {
          breakpoint: 400,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      legend: {
        position: "right",
        labels: {
          colors: "white",
        },
      },
    },
  });

  return (
    <div className="">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="polarArea"
        height={600}
      />
    </div>
  );
};

export default PolarChart;

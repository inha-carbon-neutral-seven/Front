import React from "react";
import ReactApexChart from "react-apexcharts";
import ChartWrapperBox from "./ChartWrapperBox";
import { generateOptions, generatePieOptions } from "./ChartOptions";

export const ChartComponent = ({ chartData }) => {
  let options;
  let labels;
  let series;
  switch (chartData.type) {
    case "bar":
    case "line":
      series = chartData.series;
      labels = { categories: chartData.labels };
      options = generateOptions(chartData.type, chartData.title, series, labels);
      break;
    case "pie":
      series = chartData.series[0].data;
      labels = chartData.labels;
      options = generatePieOptions(chartData.type, chartData.title, series, labels);
      break;
  }

  return <ReactApexChart options={options} type={chartData.type} series={chartData.series} height={"100%"} />;
  // return <ChartWrapperBox>{<ReactApexChart options={options} type={chartData.type} series={chartData.series} height={"100%"} />}</ChartWrapperBox>;
};

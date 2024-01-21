import React from "react";
import ReactApexChart from "react-apexcharts";
import ChartWrapperBox from "./ChartWrapperBox";
import { generateOptions, generatePieOptions } from "./ChartOptions";

export const ChartComponent = ({ jsonData }) => {
  if (!jsonData) {
    return <p>Invalid chart data</p>;
  }

  let options;

  if (jsonData.type === "pie" || jsonData.type === "donut") {
    options = generatePieOptions(jsonData.type, jsonData.title, jsonData.series[0].data, jsonData.labels);
  } else {
    options = generateOptions(jsonData.type, jsonData.title, jsonData.series, jsonData.xaxis);
  }

  return (
    <ChartWrapperBox>
      <ReactApexChart options={options} type={jsonData.type} series={jsonData.series} height={"100%"} />
    </ChartWrapperBox>
  );
};

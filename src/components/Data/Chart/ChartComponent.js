import React from "react";
import ReactApexChart from "react-apexcharts";
import ChartWrapperBox from "./ChartWrapperBox";
import { generateOptions } from "./ChartOptions";

export const ChartComponent = ({ jsonData }) => {
  if (!jsonData) {
    return <p>Invalid chart data</p>;
  }
  let options = generateOptions(jsonData.type, jsonData.seriesConfig, jsonData.xaxisConfig);

  return (
    <ChartWrapperBox>
      <ReactApexChart options={options} type={jsonData.type} series={jsonData.series} width={"100%"} />
    </ChartWrapperBox>
  );
};

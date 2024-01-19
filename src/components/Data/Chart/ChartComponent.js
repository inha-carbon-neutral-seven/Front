import React from "react";
import ReactApexChart from "react-apexcharts";
import ChartWrapperBox from "./ChartWrapperBox";
import { ChartOptions } from "./ChartOptions";

export const ChartComponent = ({ type, jsonData, option }) => {
  if (!jsonData) {
    return <p>No chart data</p>;
  }

  const series = [
    {
      name: option.title,
      data: jsonData.map((item) => item[option.column1]),
    },
  ];

  const options = {
    xaxis: {
      categories: jsonData.map((item) => item[option.column2]),
    },
  };

  const chartOptions = ChartOptions[`${type}ChartOptions`];
  if (!chartOptions) return <p>Invalid chart options</p>;

  const mergedOptions = {
    ...chartOptions,
    series,
    xaxis: options.xaxis,
  };

  return (
    <ChartWrapperBox>
      <ReactApexChart options={mergedOptions} series={series} type={type} height={350} />
    </ChartWrapperBox>
  );
};

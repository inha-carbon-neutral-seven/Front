import React from "react";
import ChartWrapperBox from "./ChartWrapperBox";
import ApexCharts from "apexcharts";

export const ChartComponent = ({ type, jsonData, option }) => {
  const generateSeries = (jsonData, option) => {
    if (jsonData && jsonData.length > 0 && option && option.column1) {
      if (["pie", "donut", "radialBar"].includes(type)) {
        return {
          series: jsonData.map((item) => item[option.column1]),
        };
      } else {
        return {
          series: [
            {
              name: option.title || "Sample Chart",
              type: option.type || "bar",
              data: jsonData.map((item) => ({
                x: item[option.column2] || "",
                y: item[option.column1],
              })),
            },
          ],
        };
      }
    } else {
      return {
        series: [
          {
            name: option ? option.title : "No Data",
            type: option ? option.type : "bar",
            data: [0],
          },
        ],
      };
    }
  };
  const options = {
    annotations: option.annotations || {},
    chart: option.chart || {},
    colors: option.colors || [],
    dataLabels: option.dataLabels || {},
    fill: option.fill || {},
    forecastDataPoints: option.forecastDataPoints || {},
    grid: option.grid || {},
    labels: option.labels || [],
    legend: option.legend || {},
    markers: option.markers || {},
    noData: option.noData || {},
    plotOptions: option.plotOptions || {},
    responsive: option.responsive || [],
    series: generateSeries(jsonData, option),
    states: option.states || {},
    stroke: option.stroke || {},
    subtitle: option.subtitle || {},
    theme: option.theme || {},
    title: option.title || {},
    tooltip: option.tooltip || {},
    xaxis: option.xaxis || {},
    yaxis: option.yaxis || {},
  };
  return (
    <ChartWrapperBox>
      <ApexCharts options={options} series={options.series} type={type} />
    </ChartWrapperBox>
  );
};

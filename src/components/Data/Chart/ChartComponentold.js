import React, { Component } from "react";
import Chart from "react-apexcharts";
import ChartWrapperBox from "./ChartWrapperBox";
import { Pie, Line, Doughnut, PolarArea, Scatter, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js/auto";
import autocolors from "chartjs-plugin-autocolors";
import * as ChartOptions from "./ChartOptions";

// Register all components needed for all chart types

// JSON 데이터를 받아 카테고리와 데이터 컬럼을 기반으로 집계된 데이터를 반환
export function ChartData(jsonData, categoryColumn, dataColumn) {
  const aggregatedData = jsonData.reduce((acc, item) => {
    const category = item[categoryColumn];
    const value = parseFloat(item[dataColumn]) || 0;
    acc[category] = (acc[category] || 0) + value;
    return acc;
  }, {});

  const sortedCategories = Object.keys(aggregatedData).sort();

  const dataValues = sortedCategories.map((category) => aggregatedData[category]);

  return { sortedCategories, dataValues };
}

// 막대 그래프를 위한 데이터 반환
export function BarChartData(jsonData, categoryColumn, dataColumn, index, colorArray) {
  const { sortedCategories, dataValues } = ChartData(jsonData, categoryColumn, dataColumn);

  const selectedColor = colorArray[index % colorArray.length];

  return {
    labels: sortedCategories,
    datasets: [
      {
        label: dataColumn,
        data: dataValues,
        backgroundColor: selectedColor,
        borderColor: selectedColor.replace("0.5", "1"),
        borderWidth: 1,
      },
    ],
  };
}

// 원그래프를 위한 데이터 반환
export function PieChartData(jsonData, categoryColumn, num, colorArray) {
  const uniqueValuesCount = {};

  jsonData.forEach((item) => {
    const category = item[categoryColumn];
    uniqueValuesCount[category] = (uniqueValuesCount[category] || 0) + 1;
  });

  // Convert to array and sort by count
  const sortedCategories = Object.entries(uniqueValuesCount).sort((a, b) => b[1] - a[1]);

  // Slice to get top 'num' items
  const topCategories = sortedCategories.slice(0, num);

  // Calculate the sum of the remaining items
  const othersCount = sortedCategories.slice(num).reduce((acc, curr) => acc + curr[1], 0);

  // Create new labels and data arrays
  const labels = topCategories.map((item) => item[0]);
  if (othersCount > 0) {
    labels.push("Others");
  }

  const data = topCategories.map((item) => item[1]);
  if (othersCount > 0) {
    data.push(othersCount);
  }

  // Map colors
  const backgroundColor = labels.map((_, i) => colorArray[i % colorArray.length]);

  return {
    labels: labels,
    datasets: [
      {
        label: categoryColumn,
        data: data,
        backgroundColor: backgroundColor,
      },
    ],
  };
}

// 라인 그래프(점들이 선으로 연결된 그래프)를 위한 데이터 반환
export function LineChartData(jsonData, categoryColumn, dataColumn, index, colorArray) {
  const { sortedCategories, dataValues } = ChartData(jsonData, categoryColumn, dataColumn);
  const selectedColor = colorArray[index % colorArray.length];

  return {
    labels: sortedCategories,
    datasets: [
      {
        label: dataColumn,
        data: dataValues,
        backgroundColor: selectedColor,
        borderColor: selectedColor.replace("0.5", "1"),
        fill: false,
        tension: 0.1, // Adjust this for line smoothness
      },
    ],
  };
}

// 도넛 차트를 위한 데이터 반환.
export function DoughnutChartData(jsonData, categoryColumn, num, colorArray) {
  const uniqueValuesCount = {};

  jsonData.forEach((item) => {
    const category = item[categoryColumn];
    uniqueValuesCount[category] = (uniqueValuesCount[category] || 0) + 1;
  });

  // Convert to array and sort by count
  const sortedCategories = Object.entries(uniqueValuesCount).sort((a, b) => b[1] - a[1]);

  // Slice to get top 'num' items
  const topCategories = sortedCategories.slice(0, num);

  // Calculate the sum of the remaining items
  const othersCount = sortedCategories.slice(num).reduce((acc, curr) => acc + curr[1], 0);

  // Create new labels and data arrays
  const labels = topCategories.map((item) => item[0]);
  if (othersCount > 0) {
    labels.push("Others");
  }

  const data = topCategories.map((item) => item[1]);
  if (othersCount > 0) {
    data.push(othersCount);
  }

  // Map colors
  const backgroundColor = labels.map((_, i) => colorArray[i % colorArray.length]);

  return {
    labels: labels,
    datasets: [
      {
        label: categoryColumn,
        data: data,
        backgroundColor: backgroundColor,
      },
    ],
  };
}

// 극지역 차트(데이터를 극좌표계를 사용하여 나타냄)를 위한 데이터 반환.
export function PolarAreaChartData(jsonData, categoryColumn, dataColumn, num, colorArray) {
  const { sortedCategories, dataValues } = ChartData(jsonData, categoryColumn, dataColumn);

  // Assuming sortedCategories and dataValues are arrays of equal length and in corresponding order

  // Slice to get top 'num' categories and their data
  const topCategories = sortedCategories.slice(0, num);
  const topData = dataValues.slice(0, num);

  // Calculate the sum of the data of the remaining categories
  const othersDataSum = dataValues.slice(num).reduce((acc, curr) => acc + curr, 0);

  // Update labels and data arrays
  const labels = [...topCategories];
  const data = [...topData];
  if (othersDataSum > 0) {
    labels.push("Others"); // Add 'Others' category
    data.push(othersDataSum); // Add sum of remaining data
  }

  // Map colors
  const backgroundColor = labels.map((_, i) => colorArray[i % colorArray.length]);

  return {
    labels: labels,
    datasets: [
      {
        label: dataColumn,
        data: data,
        backgroundColor: backgroundColor,
      },
    ],
  };
}

// 산점도를 위한 데이터 반환.
export function ScatterChartData(jsonData, xColumn, yColumn, index, colorArray) {
  const dataPoints = jsonData.map((item) => ({
    x: parseFloat(item[xColumn]) || 0,
    y: parseFloat(item[yColumn]) || 0,
  }));

  return {
    datasets: [
      {
        label: "Scatter Chart",
        data: dataPoints,
        backgroundColor: colorArray[0], // Adjust color as needed
        pointRadius: 5, // Adjust radius as needed
      },
    ],
  };
}

// 빈 도넛 차트를 위한 emptyDoughnut 객체 등록.
const emptyDoughnut = {
  id: "emptyDoughnut",
  afterDraw(chart, args, options) {
    const { datasets } = chart.data;
    const { color, width, radiusDecrease } = options;
    let hasData = false;

    for (let i = 0; i < datasets.length; i += 1) {
      const dataset = datasets[i];
      hasData |= dataset.data.length > 0;
    }

    if (!hasData) {
      const {
        chartArea: { left, top, right, bottom },
        ctx,
      } = chart;
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      const r = Math.min(right - left, bottom - top) / 2;

      ctx.beginPath();
      ctx.lineWidth = width || 2;
      ctx.strokeStyle = color || "rgba(255, 128, 0, 0.5)";
      ctx.arc(centerX, centerY, r - radiusDecrease || 0, 0, 2 * Math.PI);
      ctx.stroke();
    }
  },
};

// 차트 컴포넌트를 위한 차트JS 객체 등록.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, autocolors, emptyDoughnut);

// 차트 컴포넌트 객체.
const chartComponents = {
  Bar,
  HorizontalBar: Bar,
  StackedBar: Bar,
  VerticalBar: Bar,
  Combo: Bar,
  Line,
  MultiAxisLine: Line,
  PointStyleLine: Line,
  StackedBarLine: Line,
  Doughnut,
  Pie,
  PolarArea,
  PolarAreaCentered: PolarArea,
  Scatter,
};

// 차트 컴포넌트.
export const ChartComponent = ({ type, data, options }) => {
  if (!data) {
    return <p>No chart data</p>;
  }
  const Chart = chartComponents[type];
  if (!Chart) return <p>Invalid chart type</p>;

  const chartOptions = ChartOptions[`${type}ChartOptions`];
  if (!chartOptions) return <p>Invalid chart options</p>;

  return (
    <ChartWrapperBox>
      <Chart data={data} options={chartOptions(options.title, options.yColumn, options.xColumn)} />
    </ChartWrapperBox>
  );
};

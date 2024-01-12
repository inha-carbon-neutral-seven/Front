import React from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import ChartWrapperBox from "./ChartWrapperBox";
import { Pie, Line, Doughnut, PolarArea, Scatter, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js/auto";
import autocolors from "chartjs-plugin-autocolors";
import * as ChartOptions from "./ChartOptions";
import { data } from "@tensorflow/tfjs";

// Register all components needed for all chart types

export const colorArray = [
  "rgba(82, 144, 109, 0.65)",
  "rgba(241, 197, 231, 0.36)",
  "rgba(105, 225, 231, 0.95)",
  "rgba(135, 217, 246, 0.86)",
  "rgba(124, 73, 97, 0.46)",
  "rgba(99, 215, 229, 0.21)",
  "rgba(118, 167, 14, 0.91)",
  "rgba(94, 2, 153, 0.57)",
  "rgba(14, 70, 17, 0.98)",
  "rgba(185, 59, 254, 0.94)",
  "rgba(130, 54, 142, 0.74)",
  "rgba(175, 201, 216, 0.43)",
  "rgba(138, 209, 116, 0.31)",
  "rgba(241, 180, 43, 0.57)",
  "rgba(168, 79, 171, 0.11)",
  "rgba(135, 215, 92, 0.99)",
  "rgba(58, 208, 213, 0.49)",
  "rgba(195, 165, 118, 0.11)",
  "rgba(101, 145, 162, 0.32)",
  "rgba(153, 132, 12, 0.24)",
  "rgba(87, 2, 5, 0.18)",
  "rgba(134, 181, 241, 0.17)",
  "rgba(10, 186, 191, 0.72)",
  "rgba(237, 213, 138, 0.69)",
  "rgba(97, 89, 93, 0.17)",
  "rgba(212, 142, 75, 0.19)",
  "rgba(139, 92, 22, 0.81)",
  "rgba(125, 223, 234, 0.29)",
  "rgba(239, 175, 180, 0.37)",
  "rgba(245, 1, 42, 0.35)",
  "rgba(253, 109, 64, 0.7)",
  "rgba(204, 250, 98, 0.6)",
  "rgba(131, 125, 58, 0.34)",
  "rgba(151, 132, 11, 0.69)",
  "rgba(117, 220, 137, 0.78)",
  "rgba(60, 248, 36, 0.38)",
  "rgba(39, 27, 152, 0.45)",
  "rgba(94, 187, 116, 0.68)",
  "rgba(109, 101, 24, 0.68)",
  "rgba(225, 209, 87, 0.82)",
  "rgba(184, 136, 100, 0.46)",
  "rgba(177, 48, 62, 0.86)",
  "rgba(124, 116, 252, 0.46)",
  "rgba(172, 15, 115, 0.53)",
  "rgba(8, 42, 130, 0.36)",
  "rgba(218, 153, 215, 0.19)",
  "rgba(95, 190, 40, 0.6)",
  "rgba(99, 230, 225, 0.45)",
  "rgba(185, 40, 151, 0.67)",
  "rgba(206, 196, 67, 0.97)",
  "rgba(14, 171, 101, 0.53)",
  "rgba(241, 1, 39, 0.82)",
  "rgba(80, 138, 223, 0.47)",
  "rgba(213, 14, 156, 0.26)",
  "rgba(40, 178, 216, 0.94)",
  "rgba(199, 143, 104, 0.36)",
  "rgba(97, 120, 15, 0.72)",
  "rgba(228, 181, 82, 0.98)",
  "rgba(233, 7, 226, 0.85)",
  "rgba(254, 172, 254, 0.99)",
  "rgba(35, 84, 163, 0.19)",
  "rgba(135, 112, 204, 0.24)",
  "rgba(52, 66, 243, 0.85)",
  "rgba(30, 111, 27, 0.26)",
  "rgba(178, 25, 60, 0.81)",
  "rgba(192, 157, 13, 0.82)",
  "rgba(227, 51, 66, 0.98)",
  "rgba(139, 212, 195, 0.19)",
  "rgba(145, 131, 63, 0.39)",
  "rgba(26, 247, 118, 0.49)",
  "rgba(113, 8, 161, 0.75)",
  "rgba(229, 209, 243, 0.63)",
  "rgba(76, 217, 87, 0.53)",
  "rgba(148, 45, 62, 0.8)",
  "rgba(99, 16, 148, 0.3)",
  "rgba(105, 25, 82, 0.73)",
  "rgba(223, 73, 66, 0.44)",
  "rgba(104, 112, 183, 0.86)",
  "rgba(174, 54, 7, 0.2)",
  "rgba(11, 246, 155, 0.28)",
  "rgba(88, 109, 9, 0.96)",
  "rgba(194, 94, 117, 0.11)",
  "rgba(170, 155, 141, 0.29)",
  "rgba(53, 27, 80, 0.76)",
  "rgba(81, 146, 23, 0.22)",
  "rgba(149, 174, 223, 0.44)",
  "rgba(142, 5, 99, 0.81)",
  "rgba(98, 160, 50, 0.99)",
  "rgba(104, 62, 228, 0.98)",
  "rgba(166, 93, 59, 0.37)",
  "rgba(41, 200, 204, 0.95)",
  "rgba(159, 102, 165, 0.65)",
  "rgba(248, 96, 23, 0.16)",
  "rgba(34, 126, 236, 0.65)",
  "rgba(93, 168, 129, 0.62)",
  "rgba(168, 115, 57, 0.65)",
  "rgba(174, 20, 153, 0.5)",
  "rgba(117, 117, 131, 0.33)",
  "rgba(209, 5, 126, 0.66)",
  "rgba(223, 228, 190, 0.33)",
];

// JSON 데이터를 받아 카테고리와 데이터 컬럼을 기반으로 집계된 데이터를 반환
export function ChartData(jsonData, categoryColumn, dataColumn) {
  const aggregatedData = jsonData.reduce((acc, item) => {
    const category = item[categoryColumn];
    const value = parseFloat(item[dataColumn]) || 0;
    acc[category] = (acc[category] || 0) + value;
    return acc;
  }, {});

  const sortedCategories = Object.keys(aggregatedData).sort();

  const dataValues = sortedCategories.map(
    (category) => aggregatedData[category]
  );

  return { sortedCategories, dataValues };
}

// 막대 그래프를 위한 데이터 반환
export function BarChartData(
  jsonData,
  categoryColumn,
  dataColumn,
  index,
  colorArray
) {
  const { sortedCategories, dataValues } = ChartData(
    jsonData,
    categoryColumn,
    dataColumn
  );

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
  const sortedCategories = Object.entries(uniqueValuesCount).sort(
    (a, b) => b[1] - a[1]
  );

  // Slice to get top 'num' items
  const topCategories = sortedCategories.slice(0, num);

  // Calculate the sum of the remaining items
  const othersCount = sortedCategories
    .slice(num)
    .reduce((acc, curr) => acc + curr[1], 0);

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
  const backgroundColor = labels.map(
    (_, i) => colorArray[i % colorArray.length]
  );

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
export function LineChartData(
  jsonData,
  categoryColumn,
  dataColumn,
  index,
  colorArray
) {
  const { sortedCategories, dataValues } = ChartData(
    jsonData,
    categoryColumn,
    dataColumn
  );
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
  const sortedCategories = Object.entries(uniqueValuesCount).sort(
    (a, b) => b[1] - a[1]
  );

  // Slice to get top 'num' items
  const topCategories = sortedCategories.slice(0, num);

  // Calculate the sum of the remaining items
  const othersCount = sortedCategories
    .slice(num)
    .reduce((acc, curr) => acc + curr[1], 0);

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
  const backgroundColor = labels.map(
    (_, i) => colorArray[i % colorArray.length]
  );

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
export function PolarAreaChartData(
  jsonData,
  categoryColumn,
  dataColumn,
  num,
  colorArray
) {
  const { sortedCategories, dataValues } = ChartData(
    jsonData,
    categoryColumn,
    dataColumn
  );

  // Assuming sortedCategories and dataValues are arrays of equal length and in corresponding order

  // Slice to get top 'num' categories and their data
  const topCategories = sortedCategories.slice(0, num);
  const topData = dataValues.slice(0, num);

  // Calculate the sum of the data of the remaining categories
  const othersDataSum = dataValues
    .slice(num)
    .reduce((acc, curr) => acc + curr, 0);

  // Update labels and data arrays
  const labels = [...topCategories];
  const data = [...topData];
  if (othersDataSum > 0) {
    labels.push("Others"); // Add 'Others' category
    data.push(othersDataSum); // Add sum of remaining data
  }

  // Map colors
  const backgroundColor = labels.map(
    (_, i) => colorArray[i % colorArray.length]
  );

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
export function ScatterChartData(
  jsonData,
  xColumn,
  yColumn,
  index,
  colorArray
) {
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  autocolors,
  emptyDoughnut
);

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
      <Chart
        data={data}
        options={chartOptions(options.title, options.yColumn, options.xColumn)}
      />
    </ChartWrapperBox>
  );
};

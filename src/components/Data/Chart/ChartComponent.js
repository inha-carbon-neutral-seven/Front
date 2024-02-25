import React, { useRef, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { generateOptions, generatePieOptions } from "./ChartOptions";

export const ChartComponent = ({ chartData, width }) => {
  const chartRef = useRef(null); // 차트 컨테이너 참조 생성
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [resizeKey, setResizeKey] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        setChartSize({ width, height });
        setResizeKey((prevKey) => prevKey + 1);
      }
    });
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current); // 차트 컨테이너에 ResizeObserver 연결
    }

    return () => resizeObserver.disconnect(); // 컴포넌트 언마운트 시 연결 해제
  }, []);

  let options;
  let labels;
  let series;
  console.log(chartData);
  switch (chartData.type) {
    case "bar":
    case "line":
    case "area":
    case "radar":
      series = chartData.series;
      labels = chartData.labels;
      options = generateOptions(chartData.type, series, labels);
      break;
    case "pie":
    case "donut":
      series = chartData.series[0].data;
      labels = chartData.labels;
      options = generatePieOptions(chartData.type, series, labels);
      break;
  }

  return (
    <div ref={chartRef} className="w-full h-full max-w-[100%]">
      <h1 className="text-center font-suit mb-5">{chartData.title}</h1>
      <ReactApexChart key={resizeKey} options={options} type={chartData.type} series={series} width={width} height={chartSize.height} />
    </div>
  );
};

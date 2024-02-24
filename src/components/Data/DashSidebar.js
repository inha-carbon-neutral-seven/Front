import React, { useEffect, useState } from "react";
import { ChartComponent } from "./Chart/ChartComponent";
import ChartExample from "../../sampledata/Examplechart.json";

import { useSelector } from "react-redux";

function DashSidebar() {
  const ChartsfromStore = useSelector((state) => state.dataVar.charts);
  const [currentChart, setCurrentChart] = useState();
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);

  useEffect(() => {
    if (ChartsfromStore && ChartsfromStore.length > 0) {
      console.log(ChartsfromStore);
      let index = Math.max(ChartsfromStore.length - 1, 0);
      setCurrentChart(ChartsfromStore[index]);
      setSelectedChartIndex(index);
    } else {
      setCurrentChart();
      setSelectedChartIndex(0);
    }
  }, [ChartsfromStore]);

  const nextChart = () => {
    const nextIndex = selectedChartIndex + 1;
    if (nextIndex < ChartsfromStore.length) {
      setSelectedChartIndex(nextIndex);
      setCurrentChart(ChartsfromStore[nextIndex]);
    }
  };

  const prevChart = () => {
    const prevIndex = selectedChartIndex - 1;
    if (prevIndex >= 0) {
      setSelectedChartIndex(prevIndex);
      setCurrentChart(ChartsfromStore[prevIndex]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      {currentChart ? (
        <div className="w-full rounded-md bg-white">
          <div className="pt-5 button-container flex justify-center mb-4 font-bold text-2xl">
            <button onClick={prevChart} className="mx-2 text-xs">
              ◄
            </button>
            <div className="mx-2">
              {`${1 + selectedChartIndex} of ${ChartsfromStore.length} `}
            </div>
            <button onClick={nextChart} className="mx-2 text-xs">
              ►
            </button>
          </div>
          <div className="chart-container p-2 w-full dark:bg-[rgb(232,240,240)]">
            <ChartComponent chartData={currentChart} />
          </div>
        </div>
      ) : (
        <div className=" text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            비버 대시보드
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            파일을 먼저 업로드해주세요.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            유용한 정보를 제공해드려요 !
          </p>
        </div>
      )}
    </div>
  );
}

export default DashSidebar;

import React, { useEffect, useState } from "react";
import { ChartComponent } from "./Chart/ChartComponent";

import { useSelector } from "react-redux";
import { Nexticon, Previcon } from "../../icons";

function DashSidebar({ width }) {
  const ChartsfromStore = useSelector((state) => state.dataVar.charts);
  const [currentChart, setCurrentChart] = useState();
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);

  useEffect(() => {
    if (ChartsfromStore && ChartsfromStore.length > 0) {
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
    <div className="flex flex-col justify-center items-center w-full h-full font-suit">
      {currentChart ? (
        <div className="w-full flex justify-between items-center px-2 h-[70%] flex-col">
          <div className="flex flex-row justify-center w-full h-full font-bold">
            <div className="flex grow">
              <div className="flex flex-col chart-container dark:bg-[rgb(232,240,240)] flex-grow">
                <ChartComponent chartData={currentChart} width={width} />
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 px-5 flex justify-end items-center">
            <button onClick={prevChart} className="text-[25px]">
              <Previcon />
            </button>

            <div className="mx-2 my-2 dark:text-[rgb(232,240,240)]">{`${1 + selectedChartIndex} of ${ChartsfromStore.length} `}</div>
            <button onClick={nextChart} className="text-[25px]">
              <Nexticon />
            </button>
          </div>
        </div>
      ) : (
        <div className=" text-center w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">비버 대시보드</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">파일을 먼저 업로드해주세요.</p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">유용한 정보를 제공해드려요 !</p>
        </div>
      )}
    </div>
  );
}

export default DashSidebar;

import React, { useEffect, useState } from "react";
import { ChartComponent } from "./Chart/ChartComponent";
import ChartExample from "../../sampledata/Examplechart.json";

import { useSelector } from "react-redux";

function DashSidebar() {
  const ChartsfromStore = useSelector((state) => state.dataVar.charts);
  const [Chartlist, setChartlist] = useState([]);
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(ChartsfromStore) && ChartsfromStore.length > 0) {
      setChartlist(ChartsfromStore);
      setSelectedChartIndex(ChartsfromStore.length - 1);
    } else if (ChartsfromStore && Object.keys(ChartsfromStore).length > 0) {
      setChartlist([ChartsfromStore]);
      setSelectedChartIndex(0);
    } else {
      setChartlist([]);
      setSelectedChartIndex(0);
    }
  }, [ChartsfromStore]);

  const nextChart = () => {
    if (selectedChartIndex < Chartlist.length - 1) {
      setSelectedChartIndex(selectedChartIndex + 1);
    }
  };

  const prevChart = () => {
    if (selectedChartIndex > 0) {
      setSelectedChartIndex(selectedChartIndex - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {Chartlist.length === 0 ? (
        <div className=" dark:bg-gray-800">
          <div className=" text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">분석할 파일이 존재하지 않습니다 :(</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">분석할 파일을 업로드해주세요.</p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="button-container flex justify-center mb-4">
            <button onClick={prevChart} className="mx-2">
              ← 왼쪽
            </button>
            <button onClick={nextChart} className="mx-2">
              오른쪽 →
            </button>
          </div>
          {Chartlist.map((chartConfig, index) => (
            <div key={index} className="chart-container p-10 w-full">
              <ChartComponent chartData={chartConfig} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashSidebar;

import React, { useEffect, useState } from "react";
import { ChartComponent } from "./Chart/ChartComponent";
import ChartExample from "../../sampledata/Examplechart.json";

import { useSelector } from "react-redux";

function DashSidebar() {
  // 이 컴포넌트에서 사용할 data 변수.
  const ChartsfromStore = useSelector((state) => state.dataVar.charts);
  const [Chartlist, setChartlist] = useState([]);

  useEffect(() => {
    console.log("ChartsfromStore", ChartsfromStore);

    if (Array.isArray(ChartsfromStore) && ChartsfromStore.length > 0) {
      setChartlist(ChartsfromStore);
    } else if (ChartsfromStore && Object.keys(ChartsfromStore).length > 0) {
      setChartlist([ChartsfromStore]);
    } else {
      setChartlist([]);
    }
  }, [ChartsfromStore]);
  useEffect(() => {
    console.log("Chartlist", Chartlist);
  }, [Chartlist]);
  return (
    <div className="container mx-auto mt-5 flex flex-wrap gap-6 max-w-full max-h-[85vh] justify-center items-center">
      {Chartlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center dark:bg-gray-800 p-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">분석할 파일이 존재하지 않습니다 :(</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">분석할 파일을 업로드해주세요.</p>
          </div>
        </div>
      ) : (
        Chartlist.map((chartConfig, index) => (
          <div key={index} className="chart-container">
            <ChartComponent chartData={chartConfig} />
          </div>
        ))
      )}
    </div>
  );
}

export default DashSidebar;

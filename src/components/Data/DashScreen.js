import React from "react";
import { ChartComponent } from "./Chart/ChartComponent";
import ChartExample from "../../sampledata/Examplechart.json";

import { useSelector } from "react-redux";

function DashScreen() {
  // 이 컴포넌트에서 사용할 data 변수.
  const jsonDataFromStore = useSelector((state) => state.dataVar.jsonData);

  const jsonData =
    jsonDataFromStore && jsonDataFromStore.length > 0
      ? jsonDataFromStore
      : ChartExample;

  if (
    !jsonData ||
    !jsonData[0].title ||
    !jsonData[0].series ||
    !jsonData[0].xaxis ||
    !jsonData[0].labels
  ) {
    return <p>Invalid chart data</p>;
  }

  return (
    <div className="container mx-auto mt-5 flex flex-wrap gap-6 max-w-full max-h-[85vh]">
      {jsonData.map((chartConfig, index) => (
        <div key={index} className="chart-container">
          <ChartComponent jsonData={chartConfig} />
        </div>
      ))}
    </div>
  );
}

export default DashScreen;

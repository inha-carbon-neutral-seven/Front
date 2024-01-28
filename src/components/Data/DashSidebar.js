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
    <div className="container mx-auto mt-5 flex flex-wrap gap-6 max-w-full max-h-[85vh]">
      {Chartlist.length === 0 ? (
        <p>No chart data available</p>
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

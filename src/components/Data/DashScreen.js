import { React, useEffect, useState } from "react";
import { ChartComponent } from "./Chart/ChartComponent";
import ChartExample from "../../sampledata/Examplechart.json";

import { useSelector } from "react-redux";

function DashScreen() {
  // 이 컴포넌트에서 사용할 data 변수.
  const ChartfromStore = useSelector((state) => state.dataVar.chart);
  const [Chartlist, setChartlist] = useState(ChartExample);

  // useEffect(() => {
  //   if (ChartfromStore && !Chartlist.includes(ChartfromStore)) {
  //     setChartlist((prevChartlist) => [...prevChartlist, ChartfromStore]);
  //   }
  // }, [ChartfromStore, Chartlist]);

  const currentChart = ChartfromStore ? Chartlist[Chartlist.length - 1] : ChartExample;

  return (
    <div className="container mx-auto py-5 gap-6 max-w-full max-h-[85vh]">
      {Chartlist.map((chartConfig, index) => (
        <div key={index} className="chart-container pt-3 pb-8">
          <ChartComponent chartData={chartConfig} />
        </div>
      ))}
    </div>
  );
}

export default DashScreen;

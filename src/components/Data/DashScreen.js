import React, { useState, useEffect } from "react";
import { ChartComponent, ChartData } from "./Chart/ChartComponent";
import ChartExample from "./Chart/ChartExample";
import { useSelector } from "react-redux";

function DashScreen() {
  // 이 컴포넌트에서 사용할 상태변수들.
  const [colorIndex, setColorIndex] = useState(0);

  // 이 컴포넌트에서 사용할 data 변수.
  const jsonData = useSelector((state) => state.dataVar.jsonData);

  useEffect(() => {
    if (jsonData.length > 0) {
    }
  }, [jsonData]);

  return (
    <div className="container mx-auto mt-5 mr-4 flex flex-wrap gap-6 overflow-auto max-w-full max-h-[85vh]">
      {jsonData.length === 0 ? <ChartExample /> : <div>Data is available</div>}
    </div>
  );
}

export default DashScreen;

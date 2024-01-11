import React, { useState } from "react";
import PrintFileCards from "../left-side/PrintFileCards";
import { useSelector } from "react-redux";

function DataSelect() {
  // 이 컴포넌트에서 사용할 상태변수들.
  const [error, setError] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);

  // 이 컴포넌트에서 사용할 data 변수.
  const jsonData = useSelector((state) => state.dataVar.jsonData);

  // 컬럼 선택 옵션
  const columnOptions =
    !jsonData || jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

  // 컬럼 선택 이벤트 핸들러
  const handleColumnChange = (event) => {
    const column = event.target.value;
    if (event.target.checked) {
      setSelectedColumns([...selectedColumns, column]);
    } else {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    }
  };

  return (
    <div className="pb-6 border-solid max-h-[85vh] border-gray-300">
      <div className="flex flex-col overflow-auto">
        <PrintFileCards processAll={false} />
        <div>
          {columnOptions.map((column) => (
            <div key={column}>
              <input
                type="checkbox"
                id={column}
                name={column}
                value={column}
                onChange={handleColumnChange}
              />
              <label htmlFor={column}>{column}</label>
            </div>
          ))}
        </div>
        {error && <div className="text-red-500"></div>}
      </div>
    </div>
  );
}

export default DataSelect;

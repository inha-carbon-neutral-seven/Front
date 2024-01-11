import React from "react";
import { Downloadicon } from "../../icons";
import { useSelector } from "react-redux";

function Download() {
  // 이 컴포넌트에서 사용할 data 변수.
  const jsonData = useSelector((state) => state.dataVar.jsonData);

  // 다운로드 이벤트 핸들러.
  const handleDownload = async () => {
    const fileName = "data.json";
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <button
      className="cursor-pointer select-none"
      title="다운로드"
      onClick={handleDownload}
    >
      <Downloadicon />
    </button>
  );
}

export default Download;

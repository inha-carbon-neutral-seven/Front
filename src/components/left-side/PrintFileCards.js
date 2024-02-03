import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Download from "../Utility/Download";

import CSV_icon from "../../image/icons/CSV_icon.svg";
import PDF_icon from "../../image/icons/PDF_icon.svg";
import DOCX_icon from "../../image/icons/DOCX_icon.svg";
import TXT_icon from "../../image/icons/TXT_icon.svg";
import UNKNOWN_icon from "../../image/icons/UNKNOWN_icon.svg";

function PrintFileCards({ processAll = false }) {
  // 이 컴포넌트에서 사용할 data 변수
  const analyzedFileDataList = useSelector(
    (state) => state.dataVar.analyzedFileDataList
  );

  // dispatch func.
  const dispatch = useDispatch();

  // 현재 클릭된 카드의 인덱스
  const [clickedIndex, setClickedIndex] = useState(null);

  // 카드 클릭 이벤트 핸들러
  const handleCardClick = (index) => {
    setClickedIndex(index);
  };

  // 카드 삭제 이벤트 핸들러
  const handleDelete = (event, index) => {
    event.stopPropagation();
    const updatedList = analyzedFileDataList.filter((_, i) => i !== index);
    dispatch({ type: "UPDATE_ANALYZED_FILE_DATA_LIST", payload: updatedList });
  };

  const loadImageFromExt = (ext_keyword = "unknown") => {
    const extensionMap = new Map([
      ["text/csv", CSV_icon],
      ["pdf", PDF_icon],
      ["officedocument", DOCX_icon],
      ["text/plain", TXT_icon],
    ]);

    const matchedExt = [...extensionMap.keys()].find((keyword) =>
      ext_keyword.includes(keyword)
    );

    const iconImage = matchedExt ? extensionMap.get(matchedExt) : UNKNOWN_icon;

    return (
      <div style={{ textAlign: "-webkit-center" }}>
        <img className="h-24" src={iconImage} alt={ext_keyword} />
      </div>
    );
  };

  const formatBytes = (bytes = 0) => {
    let i;
    for (i = 0; bytes >= 1024; i++) bytes /= 1024;
    return `${bytes.toFixed(1)}${["B", "KB", "MB", "GB"][i]}`;
  };
  // 모든 데이터를 처리할지, 마지막 데이터만 처리할지 결정
  const dataListToProcess = processAll
    ? analyzedFileDataList
    : [analyzedFileDataList[analyzedFileDataList.length - 1]];

  return (
    <div>
      {dataListToProcess.map((analyzedFileData, index) => (
        <div
          key={index}
          className={`max-w-full p-3 border border-gray-200 rounded-lg shadow cursor-pointer ${
            clickedIndex === index ? "bg-blue-500 text-white" : "bg-white"
          } break-words flex flex-col `}
          onClick={() => handleCardClick(index)}
        >
          <div className="ml-auto space-x-2">
            <Download />
          </div>
          <p className="text-center">
            {formatBytes(analyzedFileData?.analyzedFileData_size)}
          </p>
          {loadImageFromExt(analyzedFileData?.analyzedFileData_type)}
          <p className="text-center mb-4 font-bold">
            파일 설명: {analyzedFileData?.userCustomName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PrintFileCards;

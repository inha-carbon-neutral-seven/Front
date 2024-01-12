import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Download from "../Utility/Download";
import { Closeicon } from "../../icons";

function PrintFileCards({ processAll = true }) {
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

  // 모든 데이터를 처리할지, 마지막 데이터만 처리할지 결정
  const dataListToProcess = processAll
    ? analyzedFileDataList
    : [analyzedFileDataList[analyzedFileDataList.length - 1]];

  return (
    <div>
      {dataListToProcess.map((analyzedFileData, index) => (
        <div
          key={index}
          className={`max-w-full p-3 border border-gray-200 rounded-lg shadow cursor-pointer mb-3 ${
            clickedIndex === index ? "bg-blue-500 text-white" : "bg-white"
          } break-words flex flex-col `}
          onClick={() => handleCardClick(index)}
        >
          <div className="ml-auto space-x-2">
            <Download />
            <Closeicon onClick={(event) => handleDelete(event, index)} />
          </div>
          <p>파일명: {analyzedFileData?.analyzedFileData_name}</p>
          <p>파일크기: {`${analyzedFileData?.analyzedFileData_size}byte`}</p>
          <p>파일 타입: {analyzedFileData?.analyzedFileData_type}</p>
          <p>사용자 지정 데이터 이름 : {analyzedFileData?.userCustomName}</p>
        </div>
      ))}
    </div>
  );
}

export default PrintFileCards;

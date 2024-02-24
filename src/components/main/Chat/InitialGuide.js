import beaver from "../../../image/logo.jpg";
import { useState, useEffect } from "react";
import { MagnifyingGlass, ChartPie } from "../../../icons";
function ExpandableDiv({ icon, title, additionalItems }) {
  const [isHovered, setIsHovered] = useState(false);
  const [items, setItems] = useState([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setItems([]);
  };

  useEffect(() => {
    if (isHovered) {
      setItems((currentItems) => [...new Set([...currentItems, ...additionalItems])]);
    } else {
      setItems([]);
    }
  }, [isHovered]);
  return (
    <div
      className={`max-w-[500px] flex-col flex items-center p-4 transition-all duration-300 ease-in-out ${
        isHovered ? "max-w-full max-h-screen" : "w-[300px] h-[300px]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`p-2bg-[#EFEFEE] min-h-[100px] flex items-center rounded-[35px] w-full bg-[rgb(242,242,242)] dark:bg-[rgb(45,47,51)] transition-all duration-300 ease-in-out ${
          isHovered ? "scale-110" : "scale-100"
        }`}
      >
        <div className="mx-auto my-5">
          <div className={`font-bold flex items-center ${isHovered ? "flex-col" : "flex-row"}`}>
            <div className="p-2 text-[15px] mx-auto">{icon === 0 ? <MagnifyingGlass /> : <ChartPie />}</div>

            <div className="px-2 text-[25px] whitespace-normal text-center">{title}</div>
          </div>
        </div>

        <ul className={`list-disc list-outside transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          {items.map((item, index) => (
            <li key={index} className="mx-5 my-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InitialGuide() {
  return (
    <div className="w-full h-full mx-10 my-4 px-10 py-4 text-[rgb(66,66,66)] dark:text-[rgb(196,196,196)] overflow-auto">
      <div className="font-suit">
        <p className="font-bold font-suit flex justify-center items-center text-[45px]">
          <img src={beaver} className="h-20 w-20 rounded-full mr-4" />
          비버.ai 사용법
        </p>
        <div className="h-[30px]"></div>
        <p className="text-lg font-bold text-center text-[rgb(66,66,66)] dark:text-[rgb(230,230,230)]">
          비버.ai는 소매업 파일을 첨부하면 맞춤형 정보를 제공해드려요.
        </p>
        <p className="text-lg font-bold text-center text-[rgb(66,66,66)] dark:text-[rgb(230,230,230)]">
          쉽고 간단하게 데이터를 분석하면서 유용한 통찰을 얻어보세요.
        </p>
      </div>

      <div className=" flex justify-center h-3/5 mt-2 text-[rgb(115,114,111)] dark:text-[rgb(240,240,240)]">
        <ExpandableDiv
          icon={0}
          title="파일 분석 및 시각화"
          additionalItems={[
            "엑셀과 같은 파일을 제공하면 원하는 부분에 대한 질문을 해보세요.",
            "문서 파일을 첨부하면 해당 문서에 대한 질문응답도 가능합니다.",
            "오른쪽 패널에서 시각화 결과가 즉시 표시됩니다.",
            "예시: '2023년 가장 높은 판매량을 기록한 달은 몇 월인가요?'",
          ]}
        />

        <ExpandableDiv
          icon={1}
          title="데이터 분석"
          additionalItems={[
            "데이터에 대한 분석을 요청하면 비버가 분석 결과와 함께 인사이트를 제공합니다.",
            "제공된 파이썬 코드를 통해 직접 검증이 가능합니다.",
          ]}
        />
      </div>
    </div>
  );
}
export default InitialGuide;

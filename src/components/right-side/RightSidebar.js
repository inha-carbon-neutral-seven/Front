import React, { useState, useEffect, useRef } from "react";
import PrintFileCards from "../left-side/PrintFileCards";
import DashSidebar from "../Data/DashSidebar";
import { ChartAnalysis, CaretDown, Fileicon, Question } from "../../icons";

function RightSidebar({ page, setSidebarWidth }) {
  // 이 컴포넌트에서 사용할 상태변수들.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(0); // RightSidebar width
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentStage, setCurrentStage] = useState(0); //0: min, 1: default, 2: max, 3: closed
  const vwToPx = (vw) => (parseFloat(vw) * window.innerWidth) / 100;
  const [minPxWidth, setMinPxWidth] = useState(vwToPx("20vw"));
  const [defaultPxWidth, setDefaultPxWidth] = useState(vwToPx("30vw"));
  const [maxPxWidth, setMaxPxWidth] = useState(vwToPx("40vw"));
  const [activeButton, setActiveButton] = useState(null);

  const adjustWidthForStage = (stage) => {
    const stageWidths = [0, vwToPx("20vw"), vwToPx("30vw"), vwToPx("40vw")];
    setWidth(stageWidths[stage]);
  };
  // 사이드바 너비 조절.
  useEffect(() => {
    if (!isVisible) {
      setWidth(0);
    }
  }, [isVisible]);
  useEffect(() => {
    const handleResize = () => {
      // 브라우저 창 너비 업데이트
      setWindowWidth(window.innerWidth);

      // 브라우저 창 크기에 따른 사이드바 너비 조정
      setMinPxWidth(vwToPx("20vw"));
      setDefaultPxWidth(vwToPx("30vw"));
      setMaxPxWidth(vwToPx("40vw"));

      adjustWidthForStage(currentStage);
    };

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentStage]);

  const toggleSidebar = () => {
    const nextStage = (currentStage + 1) % 4;
    setCurrentStage(nextStage);
    adjustWidthForStage(nextStage);
    setIsMinimized(nextStage === 0);
    setIsVisible(nextStage !== 0);
    if (nextStage && activeButton === null) {
      setActiveButton("chartAnalysis");
    } else if (nextStage === 0) {
      setActiveButton(null);
    }
  };
  const toggleButton = (buttonId) => {
    if (activeButton === buttonId) {
      // 이미 활성화된 버튼을 다시 클릭하면 비활성화
      setActiveButton(null);
      adjustWidthForStage(0);
      setIsMinimized(true);
      setIsVisible(false);
    } else {
      // 다른 버튼을 클릭하면 활성화
      setActiveButton(buttonId);
      if (width === 0) {
        setWidth(defaultPxWidth);
        setIsMinimized(false);
        setIsVisible(true);
        setCurrentStage(1);
      }
    }
  };
  return (
    <div className="flex h-full">
      <div
        style={{
          width: "10px",
        }}
      ></div>
      <aside
        className={`${isVisible ? "visible " : "hidden "}${
          isMinimized ? "custom-minimized-classes " : "max-w-64 max-h-[90vh] p-1 mr-1 backdrop-blur-xl bg-white/80 space-y-2 flex-shrink-0 drop-shadow-lg "
        }rounded-[12px] rounded-tl-[12px] overflow-hidden transform transition-all duration-100 ease-in-out`}
        style={{ width: width, transition: "width 500ms ease-in-out" }}
      >
        <div className="px-1 max-h-[90vh] overflow-auto">
          <DashSidebar />
        </div>
      </aside>

      <aside className="max-h-[90vh] backdrop-blur-xl bg-white/80 flex-shrink-0 drop-shadow-lg rounded-[12px] overflow-hidden flex flex-col items-center w-12">
        <button
          onClick={() => toggleSidebar(0)}
          className="toggle-sidebar-btn h-12 w-12 hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-110 transition duration-200"
          title="Collapse/Expand"
        >
          <CaretDown width={width} />
        </button>
        <button
          onClick={() => toggleButton("chartAnalysis")}
          className={`toggle-sidebar-btn h-12 w-12 ${
            activeButton === "chartAnalysis" ? "bg-blue-500 text-white shadow-lg scale-110" : "hover:bg-blue-500 hover:text-white hover:shadow-lg"
          } transform transition duration-200`}
          title="Chart Analysis"
        >
          <ChartAnalysis />
        </button>
        <button
          onClick={() => toggleButton("fileIcon")}
          className={`toggle-sidebar-btn h-12 w-12 ${
            activeButton === "fileIcon" ? "bg-blue-500 text-white shadow-lg scale-110" : "hover:bg-blue-500 hover:text-white hover:shadow-lg"
          } transform transition duration-200`}
          title="File Icon"
        >
          <Fileicon />
        </button>
        <button
          onClick={() => toggleButton("question")}
          className="toggle-sidebar-btn h-12 w-12 hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-110 transition duration-200 absolute bottom-0"
          title="Help/Info"
        >
          <Question />
        </button>
      </aside>
    </div>
  );
}
export default RightSidebar;

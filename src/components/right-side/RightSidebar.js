import React, { useState, useEffect, useRef } from "react";
import DashSidebar from "../Data/DashSidebar";
import DOCViewer from "../Data/DOCViewer";
import RecapViewer from "../Data/RecapViewer";
import { ChartAnalysis, CaretDown, BinocularIcon, Question, RecapIcon, DarkModeIcon } from "../../icons";
import { useSelector } from "react-redux";

function RightSidebar() {
  // 이 컴포넌트에서 사용할 상태변수들.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(0); // RightSidebar width
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentStage, setCurrentStage] = useState(0); //0: min, 1: default, 2: max, 3: closed
  const vwToPx = (vw) => (parseFloat(vw) * window.innerWidth) / 100;
  const [minPxWidth, setMinPxWidth] = useState(vwToPx("20vw"));
  const [defaultPxWidth, setDefaultPxWidth] = useState(vwToPx("30vw"));
  const [activeButton, setActiveButton] = useState(null);

  // appState에 따라 버튼을 하나씩 활성화
  const appState = useSelector((state) => state.appState.currentState);
  const [showFileBtn, setShowFileBtn] = useState(false);
  const [showRecapBtn, setShowRecapBtn] = useState(false);
  const [showChartBtn, setShowChartBtn] = useState(false);

  // 방금 만들어진 새로운 btn을 감지하기 위한 state
  const [newBtn, setNewBtn] = useState("");

  // appState에 따라 버튼을 하나씩 활성화
  useEffect(() => {
    switch (appState) {
      case "analyzing":
        setShowFileBtn(true);
        setNewBtn("file");
        break;
      case "recap_finish":
        setShowRecapBtn(true);
        setNewBtn("recap");
        break;
      case "chart_finish":
        setShowChartBtn(true);
        setNewBtn("chart");
        break;
      default:
        setNewBtn("");
    }
  }, [appState]);

  const adjustWidthForStage = (stage) => {
    const stageWidths = [0, vwToPx("20vw"), vwToPx("30vw")];
    setWidth(stageWidths[stage]);
    setCurrentStage(stage);
  };

  useEffect(() => {
    const handleResize = () => {
      // 브라우저 창 너비 업데이트
      setWindowWidth(window.innerWidth);

      // 브라우저 창 크기에 따른 사이드바 너비 조정
      setMinPxWidth(vwToPx("20vw"));
      setDefaultPxWidth(vwToPx("30vw"));
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
    const nextStage = (currentStage + 1) % 3;
    adjustWidthForStage(nextStage);
    setIsMinimized(nextStage === 0);
    if (nextStage && activeButton === null) {
      setActiveButton("chartAnalysis");
    } else if (nextStage === 0) {
      setActiveButton(null);
    }
  };

  const toggleButton = (buttonId) => {
    setActiveButton(activeButton === buttonId ? null : buttonId);
    adjustWidthForStage(activeButton === buttonId ? 0 : 2);
    setIsMinimized(activeButton === buttonId);
  };

  const renderContent = () => {
    switch (activeButton) {
      case "fileIcon":
        return <DOCViewer width={width} />;
      case "recap":
        return <RecapViewer />;
      case "chartAnalysis":
        return <DashSidebar width={width} />;

      default:
    }
  };
  const [darkMode, setDarkMode] = useState(false);

  // 다크 모드 상태가 변경될 때마다 로컬 스토리지에 상태 저장
  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkMode);
    document.documentElement.classList.toggle("dark", prefersDarkMode);

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      const isDarkMode = savedMode === "true";
      setDarkMode(isDarkMode);
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex flex-row max-w-[40vw] h-[100vh] justify-between">
      <aside
        className={`max-w-64 h-[100vh] backdrop-blur-xl space-y-2 
        flex-shrink-0 drop-shadow-lg overflow-hidden
         transform transition-all duration-100 ease-in-out 
         flex flex-col justify-center items-center 
          shadow-md rounded-l-lg`}
        style={{ width: width, transition: "width 500ms ease-in-out" }}
      >
        {width > 0 && (
          <div className="w-full h-full overflow-auto ">
            <div className="h-full flex flex-col">
              <div className="h-[50px] bg-[rgb(204,153,146)] dark:bg-[rgb(30,30,35)]"></div>
              <div className="px-1 flex-grow bg-[rgb(240,232,232)] dark:bg-[rgb(80,80,80)]">{renderContent()}</div>
            </div>
          </div>
        )}
      </aside>

      <aside
        className={`flex-initial h-full w-[45px] backdrop-blur-xl 
      bg-[rgb(191,115,115)] dark:bg-[rgb(20,20,20)]
      overflow-hidden flex flex-col justify-between`}
      >
        <div className="flex flex-col items-center text-[rgb(232,240,240)] dark:text-[rgb(115,114,111)]">
          <button
            onClick={() => toggleSidebar(0)}
            className={`toggle-sidebar-btn h-12 w-12 hover:dark:text-beaver-2
            dark:hover:text-[rgb(191,115,115)] hover:shadow-lg 
            transform hover:scale-110 transition duration-200`}
            title="확장/축소"
          >
            <CaretDown width={width} />
          </button>

          <button
            onClick={() => toggleButton("fileIcon")}
            className={`${
              showFileBtn
                ? `toggle-sidebar-btn h-12 w-12 ${
                    activeButton === "fileIcon"
                      ? "dark:bg-[rgb(191,115,115)]   shadow-lg scale-110"
                      : "hover:dark:text-beaver-2 dark:hover:text-[rgb(191,115,115)] hover:shadow-lg"
                  } ${newBtn === "file" ? "blink" : ""}`
                : "scale-0 opacity-0"
            } transform transition duration-200`}
            title="파일 보기"
          >
            <BinocularIcon />
          </button>

          <button
            onClick={() => toggleButton("recap")}
            className={`${
              showRecapBtn
                ? `toggle-sidebar-btn h-12 w-12 ${
                    activeButton === "recap"
                      ? "dark:bg-[rgb(191,115,115)]   shadow-lg scale-110"
                      : "hover:dark:text-beaver-2 dark:hover:text-[rgb(191,115,115)] hover:shadow-lg"
                  } ${newBtn === "recap" ? "blink" : ""}`
                : "scale-0 opacity-0"
            } transform transition duration-200`}
            title="요약"
          >
            <RecapIcon />
          </button>

          <button
            onClick={() => toggleButton("chartAnalysis")}
            className={`${
              showChartBtn
                ? `toggle-sidebar-btn h-12 w-12 ${
                    activeButton === "chartAnalysis"
                      ? "dark:bg-[rgb(191,115,115)]   shadow-lg scale-110"
                      : "hover:dark:text-[rgb(191,115,115)] dark:hover:text-[rgb(191,115,115)] hover:shadow-lg"
                  } ${newBtn === "chart" ? "blink" : ""}`
                : "scale-0 opacity-0"
            } transform transition duration-200`}
            title="Chart Analysis"
          >
            <ChartAnalysis />
          </button>
        </div>
        <div className="flex flex-col items-center text-[rgb(232,240,240)] dark:text-[rgb(115,114,111)] text-[16px]">
          <button className="toggle-sidebar-btn h-12 w-12 hover:dark:text-beaver-2 dark:hover:text-[rgb(191,115,115)] hover:shadow-lg transform hover:scale-110 transition duration-200 ">
            <DarkModeIcon darkMode={darkMode} setDarkMode={setDarkMode} />
          </button>
          <button
            className="toggle-sidebar-btn h-12 w-12 hover:dark:text-beaver-2 dark:hover:text-[rgb(191,115,115)] hover:shadow-lg transform hover:scale-110 transition duration-200 "
            onClick={() => window.open("https://github.com/inha-carbon-neutral-seven", "_blank")}
            title="Help/Info"
          >
            <Question />
          </button>
        </div>
      </aside>
    </div>
  );
}
export default RightSidebar;

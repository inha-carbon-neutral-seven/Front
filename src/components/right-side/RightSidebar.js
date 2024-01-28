import React, { useState, useEffect, useRef } from "react";
import PrintFileCards from "../left-side/PrintFileCards";
import DashSidebar from "../Data/DashSidebar";
import { ChartAnalysis, CaretDown, Fileicon, Question } from "../../icons";
import { click } from "@testing-library/user-event/dist/click";

function RightSidebar({ page, setSidebarWidth }) {
  // 이 컴포넌트에서 사용할 상태변수들.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(0); // RightSidebar width
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentStage, setCurrentStage] = useState(0); //0: min, 1: default, 2: max, 3: closed
  const minWidth = "20vw"; // 최소 너비 설정
  const defaultWidth = "30vw"; // 기본 너비 설정
  const maxWidth = "40vw"; // 최대 너비 설정
  // 사이드바 너비 조절.
  useEffect(() => {
    // resize 이벤트 핸들러
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 디바운스 적용하여 성능 최적화
    const debounce = (fn, ms) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn(...args);
        }, ms);
      };
    };

    const debouncedHandleResize = debounce(handleResize, minWidth);

    // 이벤트 리스너 등록
    window.addEventListener("resize", debouncedHandleResize);

    //
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  const sidebarRef = useRef(null); // 사이드바 DOM 참조

  // 사이드바 드래그 이벤트 핸들러.
  // 사용자가 사이드바의 크기를 조절하기 위해 마우스를 누른 경우를 처리
  const handleMouseDown = (e) => {
    e.preventDefault(); // 드래그 시 브라우저 기본 동작 방지
    const startWidth = width;
    const startPosition = e.clientX;

    const doDrag = (e) => {
      const delta = e.clientX - startPosition;
      const newWidth = Math.max(startWidth - delta, minWidth);
      if (sidebarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`;
        setIsVisible(newWidth > minWidth);
      }
    };

    const stopDrag = () => {
      const finalWidth = parseInt(sidebarRef.current.style.width, 10);
      setWidth(finalWidth);
      setSidebarWidth(finalWidth);
      document.removeEventListener("mousemove", doDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag, { once: true });
  };
  const [clickCount, setClickCount] = useState(0);
  const toggleSidebar = () => {
    const nextStage = (currentStage + 1) % 4;
    setCurrentStage(nextStage);

    let newWidth;
    switch (nextStage) {
      case 0: // Closed
        newWidth = "0vw";
        break;
      case 1: // Minimized
        newWidth = minWidth;
        break;
      case 2: // Default
        newWidth = defaultWidth;
        break;
      case 3: // Maximized
        newWidth = maxWidth;
        break;
    }
    setWidth(newWidth);
    setIsMinimized(nextStage === 0);
    setIsVisible(nextStage !== 0);
  };

  return (
    <div className="flex h-full">
      <div className="cursor-col-resize" style={{ width: "10px", cursor: "col-resize" }} onMouseDown={handleMouseDown}></div>

      <aside
        ref={sidebarRef}
        className={`${isVisible ? "visible " : "hidden "}${
          isMinimized ? "custom-minimized-classes " : "max-w-64 max-h-[90vh] p-1 mr-1 backdrop-blur-xl bg-white/80 space-y-2 flex-shrink-0 drop-shadow-lg "
        }rounded-[12px] rounded-tl-[12px] overflow-hidden transform transition-all duration-300 ease-in-out`}
        style={{ width: width, transition: "width 300ms ease-in-out" }}
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
          <CaretDown clickCount={clickCount} setClickCount={setClickCount} />
        </button>
        <button
          onClick={() => toggleSidebar(0)}
          className="toggle-sidebar-btn h-12 w-12 hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-110 transition duration-200"
          title="Chart Analysis"
        >
          <ChartAnalysis />
        </button>
        <button
          onClick={() => toggleSidebar(0)}
          className="toggle-sidebar-btn h-12 w-12 hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-110 transition duration-200"
          title="File Icon"
        >
          <Fileicon />
        </button>
        <button
          onClick={() => toggleSidebar(0)}
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

import React, { useState, useEffect } from "react";
import PrintFileCards from "../left-side/PrintFileCards";
import DashScreen from "../Data/DashScreen";
import { ChartAnalysis, CaretDown, Fileicon } from "../../icons";

function RightSidebar({ page, setSidebarWidth }) {
  // 이 컴포넌트에서 사용할 상태변수들.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(0); // RightSidebar width
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);

  // 사이드바 너비 조절.
  useEffect(() => {
    // resize 이벤트 핸들러
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 디바운스 적용하여 성능 최적화
    const debounce = (fn, ms) => {
      let timer;
      return (_) => {
        clearTimeout(timer);
        timer = setTimeout((_) => {
          timer = null;
          fn.apply(this, arguments);
        }, ms);
      };
    };

    const debouncedHandleResize = debounce(handleResize, 250);

    // 이벤트 리스너 등록
    window.addEventListener("resize", debouncedHandleResize);

    //
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  const minWidth = 0; // 최소 너비 설정
  const maxWidth = 1000; // 최대 너비 설정

  // 사이드바 드래그 이벤트 핸들러.
  // 사용자가 사이드바의 크기를 조절하기 위해 마우스를 누른 경우를 처리
  const handleMouseDown = (e) => {
    const startWidth = width;
    const startPosition = e.clientX;

    const doDrag = (e) => {
      const delta = e.clientX - startPosition;
      const newWidth = Math.min(
        Math.max(startWidth - delta, minWidth),
        maxWidth
      );
      setWidth(newWidth);
      setSidebarWidth(newWidth);

      if (newWidth <= minWidth) {
        setIsVisible(false); // 너비가 최소값 이하면 사이드바 숨김
      } else {
        setIsVisible(true); // 그렇지 않으면 표시
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag, { once: true });
  };

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
    setWidth(isMinimized ? 500 : 0);
  };

  return (
    <div className="flex h-full">
      <div
        className="cursor-col-resize"
        style={{ width: "10px", cursor: "col-resize" }}
        onMouseDown={handleMouseDown}
      ></div>

      <aside
        className={`${
          isMinimized
            ? ""
            : "max-w-64 max-h-[90vh] p-1 mr-1 backdrop-blur-xl bg-white/80 space-y-2 flex-shrink-0 drop-shadow-lg"
        } rounded-[12px] rounded-tl-[12px] overflow-hidden transform transition-all duration-300 ease-in-out
             `}
        style={{ width: `${width}px` }}
      >
        <div className="px-1 max-h-[90vh] overflow-auto">
          <DashScreen />
        </div>
      </aside>

      <aside className="max-h-[90vh] p-2 backdrop-blur-xl bg-white/80 space-y-2 flex-shrink-0 drop-shadow-lg rounded-[12px] overflow-hidden flex flex-col items-center">
        <button onClick={toggleSidebar} className="toggle-sidebar-btn">
          <CaretDown />
        </button>
        <button onClick={toggleSidebar} className="toggle-sidebar-btn">
          <ChartAnalysis />
        </button>
        <button onClick={toggleSidebar} className="toggle-sidebar-btn">
          <Fileicon />
        </button>
      </aside>
    </div>
  );
}
export default RightSidebar;

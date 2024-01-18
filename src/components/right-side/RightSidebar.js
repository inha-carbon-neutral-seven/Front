import React, { useState, useEffect } from "react";
import PrintFileCards from "../left-side/PrintFileCards";
import DashScreen from "../Data/DashScreen";

function RightSidebar({ page, setSidebarWidth }) {
  // 이 컴포넌트에서 사용할 상태변수들.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(300);
  const [isVisible, setIsVisible] = useState(true);

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

  const minWidth = 200; // 최소 너비 설정
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

  return (
    <div className="flex h-full">
      <div
        className="cursor-col-resize"
        style={{ width: "10px", cursor: "col-resize" }}
        onMouseDown={handleMouseDown}
      ></div>
      {isVisible && (
        <aside
          className="max-w-64 max-h-[90vh] p-1 backdrop-blur-xl bg-white/80 space-y-2 flex-shrink-0 drop-shadow-lg rounded-[12px] overflow-hidden"
          style={{ width: `${width}px` }}
        >
          <div className="px-1 max-h-[90vh] overflow-auto">
            {/* {isConnected && <FileUploadToServer />} */}
            <DashScreen />
          </div>
        </aside>
      )}
    </div>
  );
}
export default RightSidebar;

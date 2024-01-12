import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const ChartWrapperBox = ({ children, ...props }) => {
  const aspectRatio = 450 / 300; // initial width / height
  const [dimensions, setDimensions] = useState({ width: 450, height: 300 });

  // 크기 조절 이벤트 핸들러
  const handleResize = (event, { size }) => {
    const newHeight = size.width / aspectRatio;
    setDimensions({ width: size.width, height: newHeight });
  };

  return (
    <ResizableBox
      width={dimensions.width}
      height={dimensions.height}
      minConstraints={[400, 200]}
      maxConstraints={[800, 600]}
      onResize={handleResize}
      resizeHandles={["se"]}
      className="bg-white rounded-lg shadow-lg p-4 flex flex-col m-2"
    >
      {children}
    </ResizableBox>
  );
};

export default ChartWrapperBox;

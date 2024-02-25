import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import CSVViewer from "./CSVViewer";

const DOCViewer = ({ width }) => {
  const file = useSelector((state) => state.dataVar.fileData);
  const fileType = useSelector((state) => state.dataVar.fileType);
  const [fileURL, setFileURL] = useState(null);
  const DocRef = useRef(null);
  const [Size, SetSize] = useState({ width: 0, height: 0 });
  const [resizeKey, setResizeKey] = useState(0);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        SetSize({ width, height });
        setResizeKey((prevKey) => prevKey + 1);
      }
    });
    if (DocRef.current) {
      resizeObserver.observe(DocRef.current); // 차트 컨테이너에 ResizeObserver 연결
    }

    return () => resizeObserver.disconnect(); // 컴포넌트 언마운트 시 연결 해제
  }, []);
  useEffect(() => {
    if (file && fileType) {
      const blob = new Blob([file], { type: fileType });
      const url = URL.createObjectURL(blob);
      setFileURL(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [file, fileType]);

  if (!fileURL) return null;

  if (fileType === "text/csv") {
    return <div className="bg-[rgb(232,240,240)] h-full overflow-x-auto">{<CSVViewer />}</div>;
  }
  const documentConfig = {
    uri: fileURL,
    fileName: `${file.name.slice(0, Math.min(file.name.length, 50))} ...`,
    fileType: fileType,
  };

  return (
    <div className="bg-[rgb(232,240,240)] rounded-md p-2 h-full flex justify-center items-center" ref={DocRef}>
      <DocViewer pluginRenderers={DocViewerRenderers} documents={[documentConfig]} />
    </div>
  );
};

export default DOCViewer;

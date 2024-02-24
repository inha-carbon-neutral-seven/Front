import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import CSVViewer from "./CSVViewer";

const DOCViewer = () => {
  const file = useSelector((state) => state.dataVar.fileData);
  const fileType = useSelector((state) => state.dataVar.fileType);
  const [fileURL, setFileURL] = useState(null);

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
    return (
      <div className="bg-[rgb(232,240,240)]">
        <CSVViewer />
      </div>
    );
  }

  const documentConfig = {
    uri: fileURL,
    fileName: `${file.name.slice(0, Math.min(file.name.length, 50))} ...`,
    fileType: fileType,
  };

  return (
    <div className="bg-white rounded-md p-2">
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={[documentConfig]}
      />
    </div>
  );
};

export default DOCViewer;

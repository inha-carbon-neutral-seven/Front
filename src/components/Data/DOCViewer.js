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
    return <CSVViewer />;
  }
  const documentConfig = { uri: fileURL, fileType: fileType };

  return <DocViewer pluginRenderers={DocViewerRenderers} documents={[documentConfig]} />;
};

export default DOCViewer;

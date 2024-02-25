import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import CSVViewer from "./CSVViewer";

const DOCViewer = ({ document, fileType }) => {
  console.log(document.fileType);
  if (fileType === "text/csv") {
    return <div className="bg-[rgb(232,240,240)] h-full overflow-x-auto">{<CSVViewer />}</div>;
  }

  return (
    <div className="flex flex-col bg-[rgb(232,240,240)] rounded-md p-2 h-full w-full justify-center items-center overflow-auto">
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={document}
        className="h-[90%] max-h-[90vh] max-w-[28vw]"
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
          pdfZoom: {
            defaultZoom: 3.0,
            zoomJump: 0.7,
          },
          pdfVerticalScroll: {
            enableVerticalScroll: true,
          },
        }}
      />
    </div>
  );
};

export default DOCViewer;

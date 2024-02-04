import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs, Outline } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function highlightPattern(text, pattern) {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [singlePage, setSinglePage] = useState(false);
  const [searchText, setSearchText] = useState("");
  const file = useSelector((state) => state.dataVar.fileData);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  function toggleSinglePage() {
    setSinglePage(!singlePage);
  }
  const textRenderer = useCallback((textItem) => highlightPattern(textItem.str, searchText), [searchText]);
  function onChange(event) {
    setSearchText(event.target.value);
  }
  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }
  function loading() {
    return <p>페이지를 로딩 중입니다. 잠시만 기다려 주세요.</p>;
  }
  return (
    <>
      <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
        Previous
      </button>
      <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
        Next
      </button>
      <button type="button" onClick={toggleSinglePage}>
        Single Page
      </button>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Outline onItemClick={onItemClick} />

        {singlePage ? (
          Array.from({ length: numPages }, (el, index) => <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} loading={loading} />)
        ) : (
          <Page pageNumber={pageNumber} renderTextLayer={false} loading={loading} />
        )}
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
      </div>
    </>
  );
};

export default PDFViewer;

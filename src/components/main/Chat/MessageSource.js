import React, { useEffect, useRef } from "react";
function MessageSource({ message }) {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  useEffect(() => {
    // input 메시지가 있을 때 해당 스크롤 위치를 아래로 조정
    if (inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
    // output 메시지가 있을 때 해당 스크롤 위치를 아래로 조정
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [message]);
  return (
    <div className="bg-white/70 text-black/80 rounded w-11/12 mt-2 overflow-x-scroll">
      {message.input && (
        <div className="border pb-6 rounded overflow-auto" ref={inputRef}>
          <div className="bg-gray-50/50 pl-1 my-2 text-green-600">Input</div>
          <pre className="ml-4 font-nanum text-xs">{message.input}</pre>
        </div>
      )}
      {message.output && (
        <div className="border pb-6 rounded overflow-auto" ref={outputRef}>
          <div className="bg-gray-50/50 pl-1 my-2 text-blue-600">{message.input ? "Output" : "Document"}</div>
          <pre className="ml-4 font-nanum text-xs">{message.output}</pre>
        </div>
      )}
    </div>
  );
}
export default MessageSource;

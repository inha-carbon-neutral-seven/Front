import { useSelector } from "react-redux";
import TypingAnimation from "./TypingAnimation";
import { CodeIcon, Spinnericon } from "../../../icons";
import beaver from "../../../image/logo.jpg";
import client from "../../../image/client.png";
import React, { useState, useRef, useEffect } from "react";
import MessageSource from "./MessageSource";

// 채팅 log 컴포넌트
function ChatLogs() {
  // 이 컴포넌트에서 사용할 상태변수들
  const loading = useSelector((state) => state.chatVar.loading);
  const chatlog = useSelector((state) => state.chatVar.chatlog);
  const [showSourceList, setShowSourceList] = useState(
    Array(chatlog.length).fill(false)
  );
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleBtnClick = (index) => {
    const newShowSourceList = [...showSourceList];
    newShowSourceList[index] = !newShowSourceList[index];
    setShowSourceList(newShowSourceList);
  };

  useEffect(() => {
    if (containerRef.current) {
      const isAtBottom = messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      setIsAtBottom(true);
    }
  }, [chatlog.length]);

  useEffect(() => {
    if (isAtBottom && containerRef.current) {
      const isAtBottom =
        containerRef.current.scrollHeight - containerRef.current.scrollTop ===
        containerRef.current.clientHeight;

      setIsAtBottom(isAtBottom);
    }
  }, [chatlog.length, isAtBottom]);

  return (
    /* 채팅 메시지 출력 */
    <div className="flex-grow max-h-[100%]" ref={containerRef}>
      <ul className="list-none p-0 m-0">
        {chatlog.map((message, index) => (
          <div
            className={`flex ${
              message.user === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.user === "ai" && (
              <img src={beaver} className="h-12 rounded-full my-5 ml-5" />
            )}
            <li
              key={message.message[0] + index}
              className={`relative p-3 m-5 rounded-md max-w-2/3 h-auto overflow-hidden ${
                message.user === "user"
                  ? "bg-blue-200 ml-auto mr-1"
                  : "bg-gray-200 ml-1 pr-10"
              }`}
            >
              {message.user === "user" ? (
                <div>
                  <TypingAnimation
                    text={message.message}
                    isNew={message.isNew}
                  />
                </div>
              ) : (
                <TypingAnimation
                  text={message.message[0]}
                  isNew={message.isNew}
                />
              )}
              {message.user === "ai" && (
                <div className="flex justify-center items-center">
                  <div
                    className={`w-full transition-all ease-in-out duration-1000 ${
                      showSourceList[index] ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <MessageSource message={message.message[1][0]} />
                  </div>
                  <button
                    className="border absolute right-1 bottom-1"
                    onClick={() => handleBtnClick(index)}
                    title="Show Code"
                  >
                    <CodeIcon />
                  </button>
                </div>
              )}
            </li>
            {message.user === "user" && (
              <img src={client} className="h-12 w-12 rounded-full my-5 mr-5" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
        {loading && (
          <div className="flex">
            <img src={beaver} className="h-12 rounded-full my-5 ml-5" />
            <li className="p-3 m-5 rounded-md max-w-2/3 overflow-hidden bg-gray-200 ml-1 flex items-center">
              <TypingAnimation text={"메시지를 생성 중입니다..."} />
              <Spinnericon />
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default ChatLogs;

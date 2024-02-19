import { useSelector } from "react-redux";
import TypingAnimation from "./TypingAnimation";
import { CodeIcon, Spinnericon } from "../../../icons";
import beaver from "../../../image/logo.jpg";
import { useState } from "react";
import MessageSource from "./MessageSource";

// 채팅 log 컴포넌트
function ChatLogs() {
  // 이 컴포넌트에서 사용할 상태변수들
  const loading = useSelector((state) => state.chatVar.loading);
  const chatlog = useSelector((state) => state.chatVar.chatlog);

  const [showSourceList, setShowSourceList] = useState(
    Array(chatlog.length).fill(false)
  );

  const handleBtnClick = (index) => {
    const newShowSourceList = [...showSourceList];
    newShowSourceList[index] = !newShowSourceList[index];
    setShowSourceList(newShowSourceList);
  };

  return (
    /* 채팅 메시지 출력 */
    <div className="flex-grow">
      <ul className="list-none p-0 m-0">
        {chatlog.map((message, index) => (
          <div className="flex">
            {message.user === "ai" && (
              <img src={beaver} className="h-12 rounded-full my-5 ml-5" />
            )}
            {/* message.message
              1. user의 경우 : string
              2. ai의 경우 : [string, [source]]. 
              2-1. source : { input: string, output: string }. message.message[1][0] 으로 접근 가능
            */}
            <li
              key={index + message.message[0]}
              className={`relative p-3 m-5 rounded-md max-w-2/3 h-auto overflow-hidden ${
                message.user === "user"
                  ? "bg-blue-200 ml-auto mr-1"
                  : "bg-gray-200 ml-1 pr-10"
              }`}
            >
              {message.user === "user" ? (
                <TypingAnimation text={message.message} isNew={message.isNew} />
              ) : (
                <TypingAnimation
                  text={message.message[0]}
                  isNew={message.isNew}
                />
              )}
              {/* ai message인 경우에만, source 보기 기능을 지원한다 */}
              {message.user === "ai" && (
                <div className="flex justify-center items-center">
                  {showSourceList[index] && (
                    <MessageSource message={message.message[1][0]} />
                  )}

                  {/* source a.k.a. message.message[1] 가 빈 list 이면, source보기 버튼을 표시하지 않는다. */}
                  {/* source의 output이 빈 문자열이여도, source보기 버튼을 표시하지 않는다. */}
                  {message.message[1].length !== 0 &&
                    message.message[1][0].output !== "" && (
                      <button
                        className="border absolute right-1 bottom-1"
                        onClick={() => handleBtnClick(index)}
                        title="Show Code"
                      >
                        <CodeIcon />
                      </button>
                    )}
                </div>
              )}
            </li>
          </div>
        ))}
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

import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import ChatLogs from "./ChatLogs";
import UserInput from "../Input/UserInput";
import { addToChatLog, setMessage } from "../../../reducers/chatReducers";
import { clearSentMessage, clearAIAnswer, markMessagesOld } from "../../../reducers/chatReducers";
import InitialGuide from "./InitialGuide";
import Recommendations from "./Recommendations";

function ChatScreen() {
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);

  // 이 컴포넌트에서 사용할 상태변수들
  const sentMessage = useSelector((state) => state.chatVar.sentMessage);
  const aiAnswer = useSelector((state) => state.chatVar.aiAnswer);
  const chatlog = useSelector((state) => state.chatVar.chatlog);

  // dispatch func
  const dispatch = useDispatch();
  const [isChat, setisChatlog] = useState(false);
  // 채팅 메시지가 1초 후에 old로 상태변경
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(markMessagesOld());
    }, 1000);
    return () => clearTimeout(timer);
  }, [chatlog, dispatch]);

  // 사용자 메시지를 chatlog에 추가
  useEffect(() => {
    if (sentMessage) {
      dispatch(addToChatLog("user", sentMessage));
      dispatch(clearSentMessage());
    }
  }, [sentMessage, dispatch]);

  // ai 메시지를 chatlog에 추가
  useEffect(() => {
    if (aiAnswer) {
      dispatch(addToChatLog("ai", aiAnswer));
      dispatch(clearAIAnswer());
    }
  }, [aiAnswer, dispatch]);

  // 전송 버튼 ref
  const submitButtonRef = useRef(null);

  // Recommendations에서 선택한 내용을 UserInput으로 전달하는 함수
  const handleRecommendationClick = (recommendation) => {
    // 추천 내용을 UserInput으로 전달
    dispatch(setMessage(recommendation));
    setisChatlog(true);
    setTimeout(() => {
      // 0.01초 후에 UserInput.js의 전송 버튼 클릭
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    }, 10);
  };

  return (
    <div className="flex w-full drop-shadow-lg h-[90vh] rounded-[12px]">
      <div className="overflow-auto w-full flex flex-col max-h-[100%]">
        <div className="flex-grow max-h-[100%] overflow-y-auto">
          <div className="flex-grow">
            <div className="h-full flex items-center justify-center">
              {!isChat ? (
                <>
                  {currentState === "init" && (
                    <div className="flex items-center ">
                      <InitialGuide />
                    </div>
                  )}
                  {currentState === "show_recommendations" && (
                    <div className="w-full flex items-center justify-start">
                      <Recommendations onRecommendationClick={handleRecommendationClick} />
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full w-full">
                  <div className="overflow-y-auto pb-14">
                    <ChatLogs />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-initial w-full">
          <UserInput submitButtonRef={submitButtonRef} setisChatlog={setisChatlog} />
        </div>
      </div>
    </div>
  );
}
export default ChatScreen;

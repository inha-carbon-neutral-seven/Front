import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import ChatLogs from "./ChatLogs";
import UserInput from "../Input/UserInput";
import { addToChatLog } from "../../../reducers/chatReducers";
import beaver from "../../../image/logo.jpg";
import {
  clearSentMessage,
  clearAIAnswer,
  markMessagesOld,
} from "../../../reducers/chatReducers";

function ChatScreen() {
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);

  // 이 컴포넌트에서 사용할 상태변수들
  const sentMessage = useSelector((state) => state.chatVar.sentMessage);
  const aiAnswer = useSelector((state) => state.chatVar.aiAnswer);

  // dispatch func
  const dispatch = useDispatch();
  const chatlog = useSelector((state) => state.chatVar.chatlog);

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

  return (
    // overflow-auto
    <div className="flex-grow flex flex-col bg-white w-full h-full drop-shadow-lg max-h-[90vh] rounded-[12px] overflow-hidden">
      <div className="overflow-y-auto">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {
            // 초기 대기화면
            currentState === "init" && (
              <div className="bg-gray-200 shadow-xl w-auto h-auto rounded-[74px] p-10 font-['BMHANNAPro']">
                <p className="font-bold text-2xl">
                  <img
                    src={beaver}
                    className="h-20 w-20 rounded-full mx-auto"
                  />
                  비버.ai 사용법
                </p>
                <p className="">
                  비버는 일반적인 챗봇🤖 기능을 제공하며, 파일을 첨부하면 파일
                  종류에 따라 질문응답이 가능합니다.
                </p>
                <p>
                  📄 파일 분석 및 시각화 엑셀과 같은 파일을 제공하면 원하는
                  부분에 대한 질문을 해보세요. 문서 파일을 첨부하면 해당 문서에
                  대한 질문응답도 가능합니다. 오른쪽 패널에서 시각화 결과가 즉시
                  표시됩니다. 예시: "2023년 가장 높은 판매량을 기록한 달은 몇
                  월인가요?"
                </p>
                <p>
                  📊 데이터 분석 및 인사이트: 데이터에 대한 분석을 요청하면
                  비버가 분석 결과와 함께 인사이트를 제공합니다. 제공된 파이썬
                  코드를 통해 직접 검증이 가능합니다.
                </p>
                <p>
                  비버를 통해 문서 파일에 대한 질문응답과 데이터 시각화, 분석을
                  통한 풍부한 정보를 얻어보세요!
                </p>
              </div>
            )
          }
        </div>
        {/* 채팅 메시지 출력 */}
        <ChatLogs />
        {/* 사용자 메시지 input */}
        <UserInput />
      </div>
    </div>
  );
}
export default ChatScreen;

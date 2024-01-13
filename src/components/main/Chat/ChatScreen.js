import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import ChatLogs from './ChatLogs';
import UserInput from '../Input/UserInput';
import { addToChatLog } from '../../../reducers/chatReducers';
import beaver from '../../../image/logo.jpg';
import { clearSentMessage, clearAIAnswer, markMessagesOld } from '../../../reducers/chatReducers';

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
      dispatch(addToChatLog('user', sentMessage));
      dispatch(clearSentMessage());
    }
  }, [sentMessage, dispatch]);

  // ai 메시지를 chatlog에 추가
  useEffect(() => {
    if (aiAnswer) {
      dispatch(addToChatLog('ai', aiAnswer));
      dispatch(clearAIAnswer());
    }
  }, [aiAnswer, dispatch]);

  return (
    // overflow-auto
    <div className="flex-grow flex flex-col bg-white w-full h-full drop-shadow-lg max-h-[90vh] rounded-[12px] overflow-hidden">
      <div className="overflow-y-auto mb-14">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {
            // 초기 대기화면
            currentState === 'init' && (
              <div className="text-center">
                <img src={beaver} className="h-40 w-40 rounded-full mx-auto" />
                <div className="text-center font-bold text-2xl">How can I help you?</div>
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

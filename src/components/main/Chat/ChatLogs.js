import { useSelector } from 'react-redux';
import TypingAnimation from './TypingAnimation';
import { Loadicon } from '../../../icons';

// 채팅 log 컴포넌트
function ChatLogs() {
  // 이 컴포넌트에서 사용할 상태변수들
  const loading = useSelector((state) => state.chatVar.loading);
  const chatlog = useSelector((state) => state.chatVar.chatlog);

  return (
    /* 채팅 메시지 출력 */
    <div className="flex-grow">
      <ul className="list-none p-0 m-0">
        {chatlog.map((message, index) => (
          <li
            key={index}
            className={`p-3 m-5 rounded-md max-w-2/3 max-h-200 overflow-hidden ${message.user === 'user' ? 'bg-blue-200 ml-auto mr-1' : 'bg-gray-200 ml-1'}`}
          >
            {<TypingAnimation text={message.message} isNew={message.isNew} />}
          </li>
        ))}
        {loading && (
          <li className="p-3 m-5 rounded-md max-w-2/3 overflow-hidden bg-gray-200 ml-1 flex">
            <TypingAnimation text={'메시지를 생성 중입니다...'} />
            <Loadicon />
          </li>
        )}
      </ul>
    </div>
  );
}

export default ChatLogs;

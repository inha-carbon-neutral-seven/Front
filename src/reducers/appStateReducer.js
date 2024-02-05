// 이 app은 여러개의 상태를 갖는다.

// init : 초기상태
// message_waiting : 메시지 입력 대기
// message_sent : 메시지 전송함
// file_uploading : 파일이 클라이언트에 올라감.
// file_sent : 파일을 전송함
// response_waiting : 전송 후 응답 대기
// response_received : 응답 받음
// anaylizing : 파일 분석 중
// analyzed : 파일 분석 완료
// analyzed error : 파일 분석 오류

// show_recommendations : 추천 메시지 보여줌. 그걸 빼면 message_waiting과 같은 역할이다.

// 사용자의 입력을 기다리는 상태 : 초기화면 init, 메시지 전송후 message_waiting, 파일전송후(analyzed->3초후->show_recommendations)

// 시나리오 2. 파일 없이 메시지만 전송
// init -> (사용자가 바로 메시지를 입력) -> message_sent -> response_waiting -> response_received -> message_waiting -> (메시지를 보내면) -> message_sent ... 반복

// 시나리오 3. 파일 업로드 후 메시지 전송
// init -> (사용자가 파일을 업로드함) -> file_uploading -> file_sent -> response_waiting
// -> analyzing -> analyzed -> 3초후 show_recommendations(FileInputButton.js의 useEffect에서) -> message_sent ... 반복

// embed 단계가 세부화 됨에 따라
// analyzing -> analyzed 사이 state를 세분화 한다.

// 파일 첨부 후  리캡완료         차트완료        분석 완료
// analyzing -> recap_finish -> chart_finish -> analyzed 로 한다.

// action type
const UPDATE_APP_STATE = "UPDATE_APP_STATE";

// action creator
export function updateAppState(currentState) {
  return {
    type: UPDATE_APP_STATE,
    payload: currentState,
  };
}

// 초기 state 정의
const initialState = {
  currentState: "init",
};

// reducer
function appStateReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_APP_STATE:
      return {
        ...state,
        currentState: action.payload,
      };
    default:
      return state;
  }
}

export default appStateReducer;

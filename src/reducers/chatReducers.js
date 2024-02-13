// 저장할 변수가 필요해서 만듬
// 주로 chatscreen.js에서 사용됨
// 다른데서 사용할수도 있고

// actionType 정의
const SET_LOADING = "SET_LOADING";
const SET_MESSAGE = "SET_MESSAGE";
const SET_SENT_MESSAGE = "SET_SENT_MESSAGE";
const SET_AIANSWER = "SET_AIANSWER";
const ADD_TO_CHATLOG = "ADD_TO_CHATLOG";
const CLEAR_SENT_MESSAGE = "CLEAR_SENT_MESSAGE";
const CLEAR_AI_ANSWER = "CLEAR_AI_ANSWER";
const MARK_MESSAGES_OLD = "MARK_MESSAGES_OLD";

// action creator 정의
export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: loading,
  };
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

export function setSentMessage(sentMessage) {
  return {
    type: SET_SENT_MESSAGE,
    payload: sentMessage,
  };
}

export function setAIAnswer(aiAnswer, ai_source) {
  return {
    type: SET_AIANSWER,
    payload: { aiAnswer, ai_source },
  };
}

export function addToChatLog(user, message, isNew = true) {
  return {
    type: ADD_TO_CHATLOG,
    payload: { user, message, isNew },
  };
}

export function clearSentMessage() {
  return { type: CLEAR_SENT_MESSAGE };
}

export function clearAIAnswer() {
  return { type: CLEAR_AI_ANSWER };
}

export function markMessagesOld() {
  return { type: MARK_MESSAGES_OLD };
}

// 초기 state 정의
const initialState = {
  loading: false,
  message: "",
  sentMessage: "",
  aiAnswer: "",
  ai_source: [],
  chatlog: [],
};

// reducer
function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_SENT_MESSAGE:
      return {
        ...state,
        sentMessage: action.payload,
      };
    case SET_AIANSWER:
      return {
        ...state,
        aiAnswer: [action.payload.aiAnswer, action.payload.ai_source],
      };
    case ADD_TO_CHATLOG:
      return {
        ...state,
        chatlog: [
          ...state.chatlog,
          {
            user: action.payload.user,
            message: action.payload.message,
            isNew: action.payload.isNew,
          },
        ],
      };
    case CLEAR_SENT_MESSAGE:
      return {
        ...state,
        sentMessage: "",
      };
    case CLEAR_AI_ANSWER:
      return {
        ...state,
        aiAnswer: "",
      };
    case MARK_MESSAGES_OLD:
      return {
        ...state,
        chatlog: state.chatlog.map((message) => ({ ...message, isNew: false })),
      };
    default:
      return state;
  }
}
export default chatReducer;

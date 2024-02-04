// 파일 리듀서

// actionType 정의
const SET_SHOWFILECARDS = "SET_SHOWFILECARDS";
const SET_FILEDATA = "SET_FILEDATA";
const SET_JSONDATA = "SET_JSONDATA";
const ADD_ANALYZED_FILE_DATA = "ADD_ANALYZED_FILE_DATA";
const ADD_RECOMMENDATIONS = "ADD_RECOMMENDATIONS";
const CLEAR_RECOMMENDATIONS = "CLEAR_RECOMMENDATIONS";
const SET_CHART_DATA = "SET_CHART_DATA";
const SET_FILE_TYPE = "SET_FILE_TYPE";

// action creator 정의
export function setShowFileCards(showFileCards) {
  return {
    type: SET_SHOWFILECARDS,
    payload: showFileCards,
  };
}

export function setFileData(fileData) {
  return {
    type: SET_FILEDATA,
    payload: fileData,
  };
}

export function setJsonData(jsonData) {
  return {
    type: SET_JSONDATA,
    payload: jsonData,
  };
}

export function addAnalyzedFileData(analyzedFileData) {
  return {
    type: ADD_ANALYZED_FILE_DATA,
    payload: { analyzedFileData },
  };
}

export function addRecommendations(recommendation) {
  return {
    type: ADD_RECOMMENDATIONS,
    payload: { recommendation },
  };
}

export function clearRecommendations() {
  return { type: CLEAR_RECOMMENDATIONS };
}

export function setChartdata(charts) {
  return {
    type: SET_CHART_DATA,
    payload: charts,
  };
}

export function setFileType(fileType) {
  return {
    type: SET_FILE_TYPE,
    payload: fileType,
  };
}

// 초기 state 정의
const initialState = {
  showFileCards: false, // FileInputButton.js 에서 사용
  fileData: null,
  jsonData: [],
  analyzedFileDataList: [],
  recommendations: [],
  charts: [],
};

// reducer
function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHOWFILECARDS:
      return {
        ...state,
        showFileCards: action.payload,
      };
    case SET_FILEDATA:
      return {
        ...state,
        fileData: action.payload,
      };
    case SET_FILE_TYPE:
      return {
        ...state,
        fileType: action.payload,
      };
    case SET_JSONDATA:
      return {
        ...state,
        jsonData: action.payload,
      };
    case ADD_ANALYZED_FILE_DATA:
      return {
        ...state,
        analyzedFileDataList: [...state.analyzedFileDataList, action.payload.analyzedFileData],
      };
    case ADD_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: [...state.recommendations, action.payload.recommendation],
      };
    case CLEAR_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: [],
      };
    case SET_CHART_DATA:
      return {
        ...state,
        charts: action.payload,
      };
    default:
      return state;
  }
}
export default dataReducer;

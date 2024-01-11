// 파일 리듀서

// actionType 정의
const SET_FILEDATA = "SET_FILEDATA";
const SET_JSONDATA = "SET_JSONDATA";
const ADD_ANALYZED_FILE_DATA = "ADD_ANALYZED_FILE_DATA";

// action creator 정의
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

// 초기 state 정의
const initialState = {
  fileData: null,
  jsonData: [],
  analyzedFileDataList: [],
};

// reducer
function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILEDATA:
      return {
        ...state,
        fileData: action.payload,
      };
    case SET_JSONDATA:
      return {
        ...state,
        jsonData: action.payload,
      };
    case ADD_ANALYZED_FILE_DATA:
      return {
        ...state,
        analyzedFileDataList: [
          ...state.analyzedFileDataList,
          action.payload.analyzedFileData,
        ],
      };
    default:
      return state;
  }
}
export default dataReducer;

import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import serverConnectReducer from "./serverConnectReducer";
import dataReducer from "./dataReducers";
import chatReducer from "./chatReducers";

const rootReducer = combineReducers({
  appState: appStateReducer,
  chatVar: chatReducer,
  dataVar: dataReducer,
  connected: serverConnectReducer,
});

export default rootReducer;

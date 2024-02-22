import React, { useState, useEffect } from "react";
import ChatScreen from "./components/main/Chat/ChatScreen";
import Header from "./components/top-side/Header";
import { useDispatch, useSelector } from "react-redux";
import RightSidebar from "./components/right-side/RightSidebar";

function App() {
  return (
    <div className="flex flex-col max-h-screen bg-gradient-to-br from-[rgb(247,247,247)] to-[rgb(230,230,230)] dark:from-[rgb(60,63,68)] dark:to-[rgb(45,47,51)] ">
      <div className="flex flex-grow h-[100vh] overflow-auto">
        <div className="flex flex-grow max-w-[60%] mx-auto">
          <div className="flex-col space-y-2 rounded-[12px] mx-auto w-full">
            <Header />
            <ChatScreen />
          </div>
        </div>
        <div className="flex-initial">
          <div className="">{<RightSidebar />}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
// overflow-hidden

import React, { useState, useEffect } from "react";
import ChatScreen from "./components/main/Chat/ChatScreen";
import Header from "./components/top-side/Header";
import { useDispatch, useSelector } from "react-redux";
import RightSidebar from "./components/right-side/RightSidebar";

function App() {
  const dispatch = useDispatch();

  const [showComponent, setShowComponent] = useState(0);
  const [error, setError] = useState("");

  // 페이지 이동 함수
  const handlePage = (p) => {
    setShowComponent(p);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gradient-to-br from-[rgb(247,247,247)] to-[rgb(230,230,230)] dark:from-[rgb(60,63,68)] dark:to-[rgb(45,47,51)] overflow-y-auto">
      <Header param={handlePage} />
      <div className="flex justify-center items-start pt-[5rem] max-w-[80%]">
        <div className="flex flex-grow mb-2 py-1 w-4/5 overflow-y-auto">
          <div className=" h-screen pl-0 space-y-2 rounded-[12px]">
            <ChatScreen />
          </div>
        </div>
        <div className="h-full flex-grow">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;

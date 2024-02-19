import React, { useState } from "react";
import ChatScreen from "./components/main/Chat/ChatScreen";
import Header from "./components/top-side/Header";
import DashBoard from "./components/Data/DashBoard";
import RightSidebar from "./components/right-side/RightSidebar";

function App() {
  const [showComponent, setShowComponent] = useState(0);
  const [error, setError] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(300);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[rgb(247,247,247)] to-[rgb(230,230,230)] dark:from-[rgb(60,63,68)] dark:to-[rgb(45,47,51)] flex flex-col overflow-y-auto">
      <Header />

      <div className="flex flex-grow mt-20 mb-2 py-1 w-4/5 place-self-center overflow-y-auto">
        <div className="flex-grow" style={{ maxWidth: "100%" }}>
          <div className="w-full h-full pl-0 space-y-2 rounded-[12px]">
            {showComponent === 0 && <ChatScreen />}
            {showComponent === 1 && <DashBoard />}
          </div>
        </div>

        <div className="fixed-left h-full">
          <RightSidebar
            page={showComponent}
            setSidebarWidth={setSidebarWidth}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

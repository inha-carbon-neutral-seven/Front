import React, { useState, useEffect } from "react";
import csvtojson from "csvtojson";
import ChatScreen from "./components/main/Chat/ChatScreen";
import Header from "./components/top-side/Header";
import DashScreen from "./components/Data/DashScreen";
import DashBoard from "./components/Data/DashBoard";
import CSVViewer from "./components/Data/CSVViewer";
import { useDispatch, useSelector } from "react-redux";
import { setJsonData } from "./reducers/dataReducers";
import RightSidebar from "./components/right-side/RightSidebar";

function App() {
  const dispatch = useDispatch();

  const [showComponent, setShowComponent] = useState(0);
  const [error, setError] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(300);

  const fileData = useSelector((state) => state.dataVar.fileData);

  // csv파일이 업데이트되면 csv를 json으로 변환하는 useEffect
  useEffect(() => {
    if (!fileData) {
      console.log("No file provided");
      return;
    }

    const reader = new FileReader();

    // 파일을 읽는데 성공하면 csv를 json으로 변환한다.
    reader.onload = async (e) => {
      console.log("FileReader onload triggered");
      const csvText = e.target.result;

      try {
        const jsonArray = await csvtojson().fromString(csvText);
        console.log("CSV to JSON conversion successful:", jsonArray);
        dispatch(setJsonData(jsonArray));
      } catch (error) {
        console.error("Error converting CSV to JSON", error);
        setError("Error converting CSV to JSON");
      }
    };

    reader.readAsText(fileData);
  }, [fileData]);

  // 페이지 이동 함수
  const handlePage = (p) => {
    setShowComponent(p);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-beaver-3 to-beaver-lightbrown flex flex-col overflow-y-auto">
      <Header param={handlePage} />

      <div className="flex flex-grow mt-20 mb-2 py-1 w-4/5 place-self-center overflow-y-auto">
        <div className="flex-grow" style={{ maxWidth: "100%" }}>
          <div className="w-full h-full pl-0 space-y-2 rounded-[12px]">
            {showComponent === 0 && <ChatScreen />}
            {showComponent === 1 && <DashBoard />}
          </div>
        </div>

        <div className="fixed-left h-full">
          <RightSidebar page={showComponent} setSidebarWidth={setSidebarWidth} />
        </div>
      </div>
    </div>
  );
}

export default App;

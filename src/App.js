import React, { useState, useEffect } from "react";
import csvtojson from "csvtojson";
import Sidebar from "./components/left-side/Sidebar";
import ChatScreen from "./components/main/ChatScreen";
import Header from "./components/top-side/Header";
import DashScreen from "./components/Data/DashScreen";
import DataToTable from "./components/Data/DataToTable";
import { Bellicon, Exclamicon } from "./icons";
import Loader from "./components/main/Loader";
import { useSelector } from "react-redux";

function App() {
  const [showComponent, setShowComponent] = useState(0);
  const [fileData, setFileData] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [error, setError] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [showAlert, setShowAlert] = useState(false);
  const currentState = useSelector((state) => state.appState.currentState);

  // csv파일이 업데이트되면 csv를 json으로 변환하는 useEffect
  useEffect(() => {
    if (!fileData) {
      console.log("No file provided");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      console.log("FileReader onload triggered");
      const csvText = e.target.result;

      try {
        const jsonArray = await csvtojson().fromString(csvText);
        console.log("CSV to JSON conversion successful:", jsonArray);
        setJsonData(jsonArray);
      } catch (error) {
        console.error("Error converting CSV to JSON", error);
        setError("Error converting CSV to JSON");
      }
    };

    reader.readAsText(fileData);
  }, [fileData]);

  // appState의 변화에 따라 알림을 처리하는 useEffect
  useEffect(() => {
    // response_waiting, analyzing, analyzed 상태일 때 알림창을 띄움
    if (["response_waiting", "analyzing", "analyzed"].includes(currentState)) {
      setShowAlert(true);
    }

    // analyzed 상태일 때 1초 후 알림창을 닫음
    // ToDo : 현재 analyzed error 상태로 상태변화하는 경우가 없음. 만약 필요하면 dispatch로 상태변화 필요
    if (currentState === "analyzed" || currentState === "analyzed error") {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentState]);

  // 알림창 컴포넌트
  const Alert = () => (
    <div
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 text-blue-100 bg-blue-800 shadow-xl p-4 rounded-lg z-50 transition duration-300 ease-in-out ${
        showAlert ? "opacity-100" : "opacity-0 hidden"
      }`}
    >
      <div className="right-0">
        {currentState === "analyzed error" ? <Exclamicon /> : <Bellicon />}
        <Loader currentState={currentState} />
      </div>
    </div>
  );

  const handleFileChange = (file) => {
    console.log("File selected:", file); // Log the selected file
    setFileData(file);
  };

  const handlePage = (p) => {
    setShowComponent(p);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-beaver-3 to-beaver-lightbrown flex flex-col overflow-y-auto">
      <Header param={handlePage} />
      {showAlert && <Alert />}

      <div className="flex flex-grow mt-20 mb-2 pt-1 pb-1 w-4/5 place-self-center">
        <div className="fixed-left h-full">
          <Sidebar
            page={showComponent}
            jsonData={jsonData}
            setSidebarWidth={setSidebarWidth}
          />
        </div>

        <div className="flex-grow" style={{ maxWidth: "100%" }}>
          <div className="w-full h-full pl-0 space y-2 rounded-[12px]">
            {showComponent === 0 && (
              <ChatScreen fileData={fileData} onFileChange={handleFileChange} />
            )}
            {showComponent === 1 && <DashScreen jsonData={jsonData} />}
            {showComponent === 2 && <DataToTable jsonData={jsonData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

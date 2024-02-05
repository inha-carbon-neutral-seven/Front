import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFileData, setFileType } from "../../../reducers/dataReducers";
import { updateAppState } from "../../../reducers/appStateReducer";
import PrintFileCards from "../../left-side/PrintFileCards";
import { Bellicon, DownArrowicon, Exclamicon, Fileicon, Minimizeicon } from "../../../icons";
import FileUploadToServer from "./FileUploadToServer";
import Loader from "../Chat/Loader";

// file upload 버튼 컴포넌트 return.
// 파일 업로드 버튼 클릭 시, file input 창을 띄운다.
function FileInput() {
  const fileInput = useRef(null);

  // 연결 상태변수
  const isConnected = useSelector((state) => state.connected.isConnected);
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);

  // 이 컴포넌트에서 사용할 상태변수들.
  const showFileCards = useSelector((state) => state.dataVar.showFileCards); // 파일 업로드 후, 업로드된 파일들 보여주는 버튼의 visibility 상태 변수
  const [isPrintFileCards, setIsPrintFileCards] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // dispatch func
  const dispatch = useDispatch();

  // 파일 업로드 버튼 클릭 시
  const openFileInput = () => {
    fileInput.current.click();
  };

  // 파일 업로드 시
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file); // Log the selected file
      dispatch(setFileData(file));
      dispatch(setFileType(file.type));
      dispatch(updateAppState("file_uploading"));
    }
  };

  // appState의 변화에 따라 알림을 처리하는 useEffect
  useEffect(() => {
    // response_waiting, analyzing, analyzed 상태일 때 알림창을 띄움
    if (["response_waiting", "analyzing", "analyzed"].includes(currentState)) {
      setShowAlert(true);
    }

    // analyzed or analyzed error 상태일 때 3초 후 알림창을 숨김
    if (currentState === "analyzed" || currentState === "analyzed error") {
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(updateAppState("show_recommendations"));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentState]);

  // 알림창 컴포넌트
  const Alert = () => (
    <div className={`absolute bottom-14 text-white bg-[#F6A683] shadow-xl p-4 rounded-lg z-50 w-52 ${showAlert ? "opacity-100" : "opacity-0 hidden"}`}>
      <div className="right-0">
        {currentState === "analyzed error" ? <Exclamicon /> : <Bellicon />}
        <Loader />
      </div>
    </div>
  );

  return (
    <div className="relative">
      {showAlert && <Alert />}

      <input type="file" onChange={handleFileChange} ref={fileInput} style={{ display: "none" }} accept=".csv, .pdf, .docx, .doc, .txt" />
      <button
        className="bg-transparent text-black/80 font-semibold hover:text-black/80 hover:bg-[#F6A683] py-2 px-4 border border-black/80 hover:border-transparent rounded-lg"
        onClick={openFileInput}
      >
        Upload
      </button>

      {/* 파일 업로드 안내 문구 */}
      {currentState === "init" && (
        <div className="flex flex-col justify-center items-center absolute bottom-14 right-[-16px] select-none">
          <div className="w-[105px] text-black/80">파일 업로드하기</div>
          <DownArrowicon />
        </div>
      )}

      {/* 업로드된 파일들 (FileCards) 보기 버튼 */}
      <button
        className={
          showFileCards
            ? `absolute bottom-14 right-5 w-10 h-10 shadow-md bg-[#F6A683] hover:bg-[#F38453] text-white hover:text-gray-200 rounded-full transform transition-transform ease-in-out duration-300 ${
                isPrintFileCards ? "scale-0 opacity-0" : "scale-100"
              }`
            : "hidden"
        }
        onClick={() => setIsPrintFileCards(true)}
      >
        <Fileicon />
      </button>

      {/* 업로드한 파일들 보여주는 컴포넌트 */}
      <div
        className={`absolute bottom-14 bg-[#F9C8B3] p-2 border rounded shadow w-[300px] transition-transform transform ease-in-out duration-300 opacity-100 origin-[15%_90%] ${
          isPrintFileCards ? "scale-100" : "scale-0 opacity-0"
        }`}
      >
        <span onClick={() => setIsPrintFileCards(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
          <Minimizeicon />
        </span>
        <PrintFileCards />
      </div>

      {/* 파일 업로드 버튼 클릭 시, 파일 업로드 컴포넌트 */}
      <div className="absolute bottom-14 bg-white rounded w-[300px]">{isConnected && <FileUploadToServer />}</div>
    </div>
  );
}

export default FileInput;

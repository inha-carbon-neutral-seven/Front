import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFileData } from "../../../reducers/dataReducers";
import { updateAppState } from "../../../reducers/appStateReducer";
import PrintFileCards from "../../left-side/PrintFileCards";
import { Closeicon, Fileicon } from "../../../icons";
import { Transition } from "@headlessui/react";

// file upload 버튼 컴포넌트 return.
// 파일 업로드 버튼 클릭 시, file input 창을 띄운다.
function FileInput() {
  const fileInput = useRef(null);

  // 이 컴포넌트에서 사용할 상태변수들.
  const showFileCards = useSelector((state) => state.dataVar.showFileCards); // 파일 업로드 후, 업로드된 파일들 보여주는 버튼의 visibility 상태 변수
  const [isPrintFileCards, setIsPrintFileCards] = useState(false);

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
      dispatch(updateAppState("file_uploading"));
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInput}
        style={{ display: "none" }}
      />
      <button
        className="bg-transparent text-black font-semibold hover:text-white hover:bg-blue-500 py-2 px-4 border border-black hover:border-transparent rounded-full"
        onClick={openFileInput}
      >
        업로드
      </button>

      {/* 업로드된 파일들 (FileCards) 보기 버튼 */}
      <button
        className={
          showFileCards
            ? `absolute bottom-14 right-5 w-10 h-10 shadow-md bg-blue-500 hover:bg-blue-700 text-white hover:text-gray-200 rounded-full transform transition-transform ease-in-out duration-300 ${
                isPrintFileCards ? "hidden" : ""
              }`
            : "hidden"
        }
        onClick={() => setIsPrintFileCards(true)}
      >
        <Fileicon />
      </button>

      {/* 업로드한 파일들 보여주는 컴포넌트 */}
      <Transition
        show={isPrintFileCards}
        enter="transition-transform transform ease-in-out duration-300"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="transition-transform transform ease-in-out duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-0"
      >
        <div className="absolute bottom-14 bg-blue-200 p-2 border rounded shadow w-[300px]">
          <span
            onClick={() => setIsPrintFileCards(false)}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <Closeicon />
          </span>
          <PrintFileCards />
        </div>
      </Transition>
    </div>
  );
}

export default FileInput;

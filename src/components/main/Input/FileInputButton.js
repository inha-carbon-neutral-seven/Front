import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setFileData } from "../../../reducers/dataReducers";
import { updateAppState } from "../../../reducers/appStateReducer";

// file upload 버튼 컴포넌트 return.
// 파일 업로드 버튼 클릭 시, file input 창을 띄운다.
function FileInput() {
  const fileInput = useRef(null);

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
    <div>
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
    </div>
  );
}

export default FileInput;

import { useSelector } from "react-redux";
import { Spinnericon } from "../../../icons";

function Loader() {
  const currentState = useSelector((state) => state.appState.currentState);
  const messages = [
    "파일을 전송 중입니다...",
    "파일을 분석중입니다...",
    "파일 분석 완료!",
    "파일을 업로드 또는 분석하는데 실패했습니다.",
  ];

  return (
    <div className="flex items-center justify-center pt-5">
      <div className="text-sm text-center">
        {currentState === "response_waiting" && (
          <div className="flex items-center space-x-2">
            <p className="text-sm text-center">{messages[0]}</p>
            <Spinnericon />
          </div>
        )}
        {currentState === "analyzing" && (
          <div className="flex items-center space-x-2">
            <p className="text-sm text-center">{messages[1]}</p>
            <Spinnericon />
          </div>
        )}
        {currentState === "analyzed" && (
          <p className="text-sm text-center">{messages[2]}</p>
        )}
        {currentState === "analyzed error" && (
          <p className="text-sm text-center">{messages[3]}</p>
        )}
      </div>
    </div>
  );
}

export default Loader;

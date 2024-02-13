import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAppState } from "../../../reducers/appStateReducer";
import { addAnalyzedFileData, addRecommendations, clearRecommendations, setShowFileCards, setChartdata, setRecap } from "../../../reducers/dataReducers";
import { Checkicon } from "../../../icons";

import CSV_icon from "../../../image/icons/CSV_icon.svg";
import PDF_icon from "../../../image/icons/PDF_icon.svg";
import DOCX_icon from "../../../image/icons/DOCX_icon.svg";
import TXT_icon from "../../../image/icons/TXT_icon.svg";
import UNKNOWN_icon from "../../../image/icons/UNKNOWN_icon.svg";

// 파일 업로드 후(아직 서버로 전송은 안한 상황), 사용자지정 이름 input 입력받기
// 이름을 입력 받은 후, server로 전송한다.
function FileUploadToServer() {
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);

  // 이 컴포넌트에서 사용할 상태변수들
  const selectedFile = useSelector((state) => state.dataVar.fileData);

  // 파일 정보
  const [dataInfo, setDataInfo] = useState("");

  // dispatch func
  const dispatch = useDispatch();

  // 파일 업로드 시, 전송
  const handleFileUpload = async () => {
    const finalDataInfo = dataInfo || selectedFile.name;
    setDataInfo(finalDataInfo);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("description", finalDataInfo);

      dispatch(updateAppState("response_waiting"));

      // 1. 서버로 FormData 전송, 응답 요청
      let response = await fetch("http://165.246.75.159:10100/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) throw new Error("서버 응답 오류");
          console.log("파일 업로드 성공", res.body);

          // appState 업데이트
          dispatch(updateAppState("analyzing"));
        })
        .catch((error) => {
          console.error("파일 업로드 서버 통신 오류:", error);
          throw error;
        });

      // 2. recap processing
      // "파일을 분석하고 있습니다 ..." 문구 표시
      response = await fetch("http://165.246.75.159:10100/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "recap",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // appState 업데이트
          dispatch(updateAppState("recap_finish"));

          const mydata = res;
          const status = mydata.status; // (사용 안 해도 됨, 서버 내부 작업이 성공했는지 여부)
          const recap = mydata.output;
          if (recap) {
            dispatch(setRecap(recap));
          }

          // 대시보드 'recap' 부분이 생성되었다는 효과(flash)와 함께 펼쳐졌으면 좋겠음!
        })
        .catch((error) => {
          console.error("recap process 서버 통신 오류:", error);

          throw error;
        });

      // 3. chart processing
      // "데이터를 시각화하고 있습니다 ..." 문구 표시
      response = await fetch("http://165.246.75.159:10100/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chart",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const mydata = res;
          const status = mydata.status; // (사용 안 해도 됨, 서버 내부 작업이 성공했는지 여부)
          const charts = mydata.output;

          // 대시보드 'chart' 부분이 생성되었다는 효과(flash)와 있으면 좋겠음! (펼칠 지는 자유)
          // 문서 데이터는 'chart' 대시보드가 존재하지 않는데, 이걸 어떻게 사용자에게 전달할 지 고민해봐야 할듯?
          if (charts && charts.length > 0) {
            // appState 업데이트
            dispatch(updateAppState("chart_finish"));
            charts.forEach((chart) => {
              if (chart.type && chart.title && chart.labels && chart.series) {
                // 차트 데이터 저장
                dispatch(setChartdata(chart));
              } else {
                console.log("Invalid chart data");
              }
            });
          }
        })
        .catch((error) => {
          console.error("chart process 서버 통신 오류:", error);
          throw error;
        });

      // 4. recommendation processing
      // "파일 분석을 마무리하는 중입니다 ..." 문구 표시
      response = await fetch("http://165.246.75.159:10100/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "recommendation",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // appState 업데이트
          dispatch(updateAppState("analyzed"));

          const mydata = res;
          const status = mydata.status; // (사용 안 해도 됨, 서버 내부 작업이 성공했는지 여부)
          const recommendations = mydata.output;

          // recommendations을 이용한 질문 추천
          console.log(recommendations);

          // 추천 문구 clear
          dispatch(clearRecommendations());

          // 추천 문구 add
          recommendations.forEach((recommendation) => {
            dispatch(addRecommendations(recommendation));
          });
        })
        .catch((error) => {
          console.error("recommendation process 서버 통신 오류:", error);
          throw error;
        });

      // 5. 웹 통신 이후 작업

      // 분석 데이터 정보를 저장한다. (지금은 임시로 이름이나 크기같은 분석안해도 알수 있는거만 저장함.)
      const newAnalyzedFileData = {
        analyzedFileData_name: selectedFile.name,
        analyzedFileData_size: selectedFile.size, // Size in bytes
        analyzedFileData_type: selectedFile.type, // 타입 유형 : text/plain, text/csv , ...
        userCustomName: finalDataInfo, // 사용자가 지정한 데이터 이름도 같이 저장한다.
      };

      // 파일 업로드 후, 업로드된 파일들 보여주는 버튼의 visibility 상태 변수
      dispatch(setShowFileCards(true));

      // 분석 데이터를 리스트에 저장한다.
      dispatch(addAnalyzedFileData(newAnalyzedFileData));

      // 서버 응답 처리
      console.log("파일 처리 성공:", response);
    } catch (error) {
      dispatch(updateAppState("analyzed error"));
      dispatch(setShowFileCards(false));

      console.error("파일 업로드 오류:", error);
    }
  };
  const loadImageToExt = (ext_keyword = "unknown") => {
    const extensionMap = new Map([
      ["text/csv", CSV_icon],
      ["pdf", PDF_icon],
      ["officedocument", DOCX_icon],
      ["text/plain", TXT_icon],
    ]);
    const matchedExt = [...extensionMap.keys()].find((keyword) => ext_keyword.includes(keyword));

    const iconImage = matchedExt ? extensionMap.get(matchedExt) : UNKNOWN_icon;

    return (
      <div style={{ textAlign: "-webkit-center" }}>
        <img className="h-20" src={iconImage} alt={ext_keyword} />
      </div>
    );
  };

  // 파일 크기를 B, KB, MB, GB 단위로 변환
  const formatBytes = (bytes = 0) => {
    let i;
    for (i = 0; bytes >= 1024; i++) bytes /= 1024;
    return `${bytes.toFixed(1)}${["B", "KB", "MB", "GB"][i]}`;
  };

  /* 파일 업로드 후(아직 서버로 전송은 안한 상황), 사용자지정 이름 input 입력받기*/
  /* 이후에 파일과 사용자 지정 이름을 같이 서버로 보낸다 */
  return currentState === "file_uploading" ? (
    <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow ">
      <p className="text-center">{formatBytes(selectedFile.size)}</p>
      {loadImageToExt(selectedFile.type)}
      <p className="text-center mb-4 font-bold">{selectedFile.name}</p>
      <p>무슨 데이터인가요?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateAppState("file_sent"));
          handleFileUpload();
        }}
      >
        <input className="border border-gray-300 rounded" type="text" onChange={(e) => setDataInfo(e.target.value)} placeholder={selectedFile.name}></input>

        <button
          className="bg-transparent hover:bg-[#F6A683] text-black/80 font-semibold hover:text-white py-0.5 px-0.5 border border-black/80 hover:border-transparent ml-1 rounded"
          type="submit"
        >
          <Checkicon />
        </button>
      </form>
    </div>
  ) : null;
}

export default FileUploadToServer;

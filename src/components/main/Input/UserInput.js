import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sendicon, Loadicon } from "../../../icons";
import { useDispatch, useSelector } from "react-redux";
import FileInput from "./FileInputButton";
import { updateAppState } from "../../../reducers/appStateReducer";
import { setAIAnswer, setLoading, setMessage, setSentMessage } from "../../../reducers/chatReducers";
import { setChartdata } from "../../../reducers/dataReducers";

// 사용자 메시지 input 컴포넌트
// 파일 input(FileInputButton.js), 메시지 input, 전송 버튼을 포함한다.
// 전송 버튼은 메시지 input만 전송한다.
function UserInput({ submitButtonRef, setisChatlog }) {
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);
  const isConnected = useSelector((state) => state.connected.isConnected);

  // 이 컴포넌트에서 사용할 상태변수들
  const loading = useSelector((state) => state.chatVar.loading);
  const message = useSelector((state) => state.chatVar.message);
  const [isButtonActive, setIsButtonActive] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // 메시지 input이 비어있는지 확인
  useEffect(() => {
    setIsButtonActive(message.trim().length > 0);
  }, [message]);

  // 채팅 메시지 전송 시
  const messageHandler = async (e) => {
    e.preventDefault();
    dispatch(updateAppState("message_sent"));

    if (!loading) {
      dispatch(setLoading(true));
      dispatch(setMessage(""));
      dispatch(setSentMessage(message));
      setisChatlog(true);

      try {
        await fetch("http://165.246.75.159:10100/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);

            // const sources = res.sources;

            // for (const source of sources) {
            //   const input = source.input;
            //   const output = source.output;
            //   console.log(input, output);
            // }

            if (res.type === "chart") {
              const chart = res.chart;
              if (chart.type && chart.title && chart.labels && chart.series) {
                dispatch(setChartdata(chart));
              } else {
                console.log("Invalid chart data");

                // TODO 1: 대시보드에 차트 아이콘이 반짝여야 함
                // TODO 2: const chart로 페이징과 함께 "새 차트"를 확인할 수 있어야 함
                // TODO 3: 대시보드 차트 아이콘을 클릭하면 가장 최신 차트가 먼저 보여야 함
              }
            }

            dispatch(setAIAnswer(res.message, res.sources));
            dispatch(updateAppState("response_received"));
            dispatch(updateAppState("message_waiting"));
            return res;
          });
      } catch (error) {
        console.log("에러 발생", error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="h-[50px] shadow-xl bg-[rgb(217,148,132)] dark:bg-[rgb(45,47,51)] border-gray-200 rounded-[12px]">
      <div className="flex flex-row items-center h-full space-x-2 px-4">
        <FileInput />
        <form className="flex flex-grow" onSubmit={messageHandler} disabled={loading}>
          <input
            className="flex-grow rounded-lg w-full px-3 bg-white dark:bg-[rgb(232,240,240)] py-2 my-auto border border-gray-300"
            placeholder="Type your message"
            type="text"
            value={message}
            disabled={!isConnected || ["response_waiting", "analyzing"].includes(currentState)}
            onChange={(e) => dispatch(setMessage(e.target.value))}
          />
          <div
            className={`bg-[rgb(217,148,132)] dark:bg-transparent dark:text-[rgb(232,240,240)] text-[rgb(242,242,242)] font-semibold ${
              isButtonActive ? "hover:dark:text-[rgb(217,148,132)]" : ""
            } hover:text-white hover:border-transparent mx-2 rounded-lg flex justify-center transition-colors duration-150 ease-in-out`}
          >
            <Button
              ref={submitButtonRef}
              type="submit"
              variant="outline"
              className={`ml-2 text-[rgb(191,115,115)] ${isButtonActive ? "active-button-class" : "disabled-button-class"}`}
              disabled={!isButtonActive || loading}
            >
              {loading ? <Loadicon /> : <Sendicon />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserInput;

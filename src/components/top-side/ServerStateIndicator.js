import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { updateServerState } from "../../reducers/serverConnectReducer";
import { CircleIcon } from "../../icons";

const ServerStatusIndicator = () => {
  const isConnected = useSelector((state) => state.connected.isConnected);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        // 서버에 핑 보내기
        const response = await fetch("http://165.246.75.159:10100/ping");
        // console.log("현재 상태", response.status);
        // response.status === true : 웹, 모델 살아있음
        // response.status === false : 웹은 살고, 모델 죽음
        // 에러 404 : 웹 서버도 죽음.

        if (response.status) {
          // 서버로부터 응답이 오면 server state를 full-connected로 변경
          dispatch(updateServerState("full-connected"));
        } else {
          // 서버로부터 응답이 오지 않으면 server state를 half-connected로 변경
          dispatch(updateServerState("half-connected"));
        }
      } catch (error) {
        // 에러가 발생하면 server state를 disconneted로 변경
        dispatch(updateServerState("disconnected"));
      }
    };

    // 컴포넌트가 마운트되면 초기에 한 번 서버 상태를 확인
    checkServerConnection();

    // 일정 간격으로 서버 상태를 주기적으로 확인
    const intervalId = setInterval(checkServerConnection, 20000);

    // 컴포넌트가 언마운트되면 인터벌 클리어
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex mx-3 items-center space-x-4 drop-shadow-lg">
      <div className="inline bg-white rounded-lg p-2">
        {isConnected === "full-connected" && (
          <>
            <div className="group relative inline-flex items-center overflow-hidden text-[rgb(22,163,74)]">
              <CircleIcon />
              <span className="transition-all duration-500 group-hover:max-w-xs max-w-0 overflow-hidden whitespace-nowrap font-bold ">
                Beaver is Connected :)
              </span>
            </div>
          </>
        )}

        {isConnected === "half-connected" && (
          <>
            <div className="group relative inline-flex items-center overflow-hidden text-[rgb(251,140,0)]">
              <CircleIcon />
              <span className="transition-all duration-500 group-hover:max-w-xs max-w-0 overflow-hidden whitespace-nowrap font-bold">
                Beaver is not Connected :(
              </span>
            </div>
          </>
        )}

        {isConnected === "disconnected" && (
          <>
            <div className="group relative inline-flex items-center overflow-hidden text-[rgb(229,57,53)]">
              <CircleIcon />
              <span className="transition-all duration-500 group-hover:max-w-xs max-w-0 overflow-hidden whitespace-nowrap font-bold">SERVER DEAD</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServerStatusIndicator;

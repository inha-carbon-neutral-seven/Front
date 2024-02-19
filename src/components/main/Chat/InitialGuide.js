import beaver from "../../../image/logo.jpg";

function InitialGuide() {
  return (
    <div className="w-full h-full mx-10 my-4 px-10 py-4 text-[rgb(66,66,66)] dark:text-[rgb(196,196,196)] overflow-auto">
      <div className="font-['BMJUA']">
        <p className="font-bold flex justify-center items-center text-[50px]">
          <img src={beaver} className="h-20 w-20 rounded-full mr-4" />
          비버.ai 사용법
        </p>
        <p className="text-lg font-bold text-center text-[rgb(66,66,66)] dark:text-[rgb(230,230,230)]">
          비버는 일반적인 챗봇🤖 기능을 제공하며, 파일을 첨부하면 파일 종류에 따라 질문응답이 가능합니다.
        </p>
        <p className="text-lg font-bold text-center text-[rgb(66,66,66)] dark:text-[rgb(230,230,230)]">
          비버를 통해 문서 파일에 대한 질문응답과 데이터 시각화, 분석을 통한 풍부한 정보를 얻어보세요!
        </p>
      </div>

      <div className="flex justify-center items-center h-3/5 mt-2 text-blue-200 dark:text-[rgb(240,240,240)]">
        <div className="m-4 p-3 bg-[#EFEFEE] rounded-[50px] w-1/2 h-full bg-beaver-lightbrown dark:bg-[rgb(45,47,51)]">
          <ul className="list-disc list-outside w-full h-full">
            <div className="font-bold flex justify-center items-center">
              <div className="text-[30px]">📄</div>
              파일 분석 및 시각화
            </div>
            <hr className="border-gray-500 m-1" />
            <li className="mx-10 my-2">엑셀과 같은 파일을 제공하면 원하는 부분에 대한 질문을 해보세요.</li>
            <li className="mx-10 mb-2">문서 파일을 첨부하면 해당 문서에 대한 질문응답도 가능합니다.</li>
            <li className="mx-10 mb-2">오른쪽 패널에서 시각화 결과가 즉시 표시됩니다.</li>
            <li className="italic mx-10">예시: "2023년 가장 높은 판매량을 기록한 달은 몇 월인가요?"</li>
          </ul>
        </div>

        <div className="m-4 p-3 bg-[#EFEFEE] rounded-[50px] w-1/2 h-full dark:bg-[rgb(45,47,51)]">
          <ul className="list-disc list-outside w-full h-full">
            <div className="font-bold flex justify-center items-center ">
              <div className="text-[30px]">📊</div>
              데이터 분석 및 인사이트
            </div>
            <hr className="border-gray-500 m-1" />
            <li className="mx-10 my-2">데이터에 대한 분석을 요청하면 비버가 분석 결과와 함께 인사이트를 제공합니다.</li>
            <li className="mx-10">제공된 파이썬 코드를 통해 직접 검증이 가능합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default InitialGuide;

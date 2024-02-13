import { useSelector } from "react-redux";
import beaver from "../../../image/logo.jpg";

function Recommendations({ onRecommendationClick }) {
  const recommendations = useSelector((state) => state.dataVar.recommendations);
  // const recommendations = [
  //   "testesetsetaefasdfaesfasfdaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaa  ",
  //   "asdf",
  //   "qqqq",
  // ];

  return (
    <div className="flex-grow">
      <ul className="list-none p-0 m-0">
        <div className="flex-col">
          <div className="flex">
            <img src={beaver} className="h-12 rounded-full my-5 ml-5" />
            <div className="p-3 m-5 rounded-md max-w-2/3 h-auto bg-gray-200 ml-1 break-words">
              <p>파일 업로드가 성공적으로 완료되었습니다!</p>
              <p>
                분석 결과에 기반하여 여러가지 흥미로운 정보와 함께 귀하에게
                맞춤형 추천을 제공해드릴 수 있습니다.
              </p>
              <p>아래 세 가지 질문 중 하나를 선택하여 답변해 주세요.</p>
              <p>
                귀하의 답변을 토대로 더 정확하고 개인화된 정보를
                제공해드리겠습니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            {recommendations.map((recommendation, index) => (
              <li
                key={index}
                className="w-[40%] h-auto rounded-[15px] border-[3px] border-[#D1D4DA] break-words hover:border-gray-500 ml-[70px] mb-2 p-3 cursor-pointer"
                onClick={() => onRecommendationClick(recommendation)}
              >
                {recommendation}
              </li>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Recommendations;

import { useSelector } from "react-redux";

function Recommendations({ onRecommendationClick }) {
  const recommendations = useSelector((state) => state.dataVar.recommendations);

  return (
    <div className="w-[80%] flex-col">
      <ul className="w-full flex justify-center items-center">
        {recommendations.map((recommendation, index) => (
          <li
            key={index}
            className="w-[40%] h-[100px] rounded-[15px] border-[3px] border-[#D1D4DA] hover:border-gray-500 m-1 p-3 cursor-pointer"
            onClick={() => onRecommendationClick(recommendation)}
          >
            {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;

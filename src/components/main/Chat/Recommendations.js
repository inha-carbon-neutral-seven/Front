import { useSelector } from "react-redux";

function Recommendations({ onRecommendationClick }) {
  const recommendations = useSelector((state) => state.dataVar.recommendations);

  return (
    <div className="w-full flex justify-center">
      <ul className="w-full flex-col justify-center items-center">
        {recommendations.map((recommendation, index) => (
          <li
            key={index}
            className="w-[40%] h-[50px] rounded-[15px] border-[3px] border-[#D1D4DA] m-1 cursor-pointer"
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

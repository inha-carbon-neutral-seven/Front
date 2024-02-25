import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RecapViewer() {
  const recap = useSelector((state) => state.dataVar.recaps);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (recap.title && recap.subtitle && recap.summary && recap.keywords) {
      setTitle(recap.title);
      setSubtitle(recap.subtitle);
      const formattedSummary = recap.summary.replace(/\. /g, ".\n");
      setSummary(formattedSummary);
      const modifiedKeywords = recap.keywords.map((keyword) => `#${keyword}`);
      setKeywords(modifiedKeywords);
    }
  }, [recap]);
  return (
    <div className="font-suit p-4 h-full flex-row text-[rgb(20,20,20)] horizon">
      <div className="bg-[rgb(240,232,232)] rounded-md p-3">
        <h1 className="text-[30px] font-bold text-center mb-2">{title}</h1>
        <h3 className="text-xl font-semibold text-center">{subtitle}</h3>
        <div className="h-[40px]"></div>
        <div className="mb-4 w-[85%] mx-auto text-[20px]">
          {summary.split("\n").map((line, index, array) => (
            <React.Fragment key={index}>
              <p>{line}</p>
              {(index === 0 || index === array.length - 2) && <br />}
            </React.Fragment>
          ))}
        </div>{" "}
        <div className="h-[40px]"></div>
        <div className="w-[85%] mx-auto">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-block bg-[rgb(204,153,146)] dark:bg-[rgb(30,30,35)] text-[rgb(232,240,240)] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecapViewer;

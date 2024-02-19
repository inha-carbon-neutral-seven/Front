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
      console.log(recap.summary);
      const formattedSummary = recap.summary.replace(/\. /g, ".\n");
      setSummary(formattedSummary);
      const modifiedKeywords = recap.keywords.map((keyword) => `#${keyword}`);
      setKeywords(modifiedKeywords);
    }
  }, [recap]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">{title}</h1>
      <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">{subtitle}</h3>
      <div className="text-gray-600 mb-4">
        {summary.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>{" "}
      <div>
        {keywords.map((keyword, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

export default RecapViewer;

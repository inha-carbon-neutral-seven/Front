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
      setSummary(recap.summary);
      const modifiedKeywords = recap.keywords.map((keyword) => `#${keyword}`);
      setKeywords(modifiedKeywords);
    }
  }, [recap]);
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">{subtitle}</h3>
      <p className="text-gray-600 mb-4">{summary}</p>
      <div>
        <strong className="font-semibold text-gray-900">Keywords: </strong>
        <span className="text-gray-600">{keywords.join(", ")}</span>
      </div>
    </div>
  );
}

export default RecapViewer;

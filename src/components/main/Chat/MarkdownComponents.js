import React from "react";

// Custom CodeBlock 컴포넌트
export const CodeBlock = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || "");
  const style =
    !inline && match
      ? {
          border: "0.5px solid #ddd",
          padding: "2px",
          borderRadius: "5px",
          background: "#333", // 어두운 배경색으로 변경
          color: "#fff", // 글자색을 흰색으로 변경
          overflowX: "auto",
        }
      : {
          border: "0.5px solid #ddd",
          padding: "2px",
          borderRadius: "5px",
          background: "#333", // 어두운 배경색으로 변경
          color: "#fff", // 글자색을 흰색으로 변경
          overflowX: "auto",
          marginBottom: "-4px",
          display: "inline-block",
        };

  return (
    <div style={style}>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

// Custom Table 컴포넌트
export const TableComponent = ({ children }) => {
  return (
    <div className="table-auto">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  );
};

// Custom tr 컴포넌트
export const TableRowComponent = ({ children }) => {
  return React.createElement(
    "tr",
    {
      className: "bg-gray-100",
    },
    children
  );
};

// Custom th, td 컴포넌트
export const TableCellComponent = ({ node, children }) => {
  const { tagName } = node;

  const isHeader = tagName === "th";
  const align = node.align || (node.properties && node.properties.align);

  const cellType = isHeader ? "th" : "td";

  return React.createElement(
    cellType,
    {
      className: `py-2 px-4 border ${align ? `text-${align}` : ""}`,
    },
    children
  );
};

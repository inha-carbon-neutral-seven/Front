import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock, TableCellComponent, TableComponent, TableRowComponent } from './MarkdownComponents';

const components = {
  code: CodeBlock,
  table: TableComponent,
  tr: TableRowComponent,
  td: TableCellComponent,
  th: TableCellComponent,
};

function TypingAnimation({ text, isNew }) {
  const [visibleText, setVisibleText] = useState('');
  const typingDelay = 10; // 타이핑 딜레이 시간(ms)
  const trimmedText = text.replace(/<(<\/?)SYS>>/g, '').trim();

  useEffect(() => {
    if (isNew) {
      // text에 <<SYS>>, <</SYS>> input이 있으면 제거하고 white space를 trim 함

      const typeText = (currentIndex) => {
        if (currentIndex < trimmedText.length) {
          const currentChar = trimmedText[currentIndex];
          if (currentChar === '\n') {
            // 만약 현재 문자가 줄바꿈 문자라면 바로 적용
            setVisibleText((prevText) => prevText + '\n');
          } else {
            setVisibleText((prevText) => prevText + currentChar);
          }
          setTimeout(() => typeText(currentIndex + 1), typingDelay);
        }
      };

      typeText(0);
    } else {
      setVisibleText(trimmedText);
    }
  }, [text]);

  return (
    <div className="overflow-x-auto">
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {visibleText}
      </ReactMarkdown>
    </div>
  );
}

export default TypingAnimation;

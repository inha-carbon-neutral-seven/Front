import React, { useState, useEffect } from "react";
import {
  faExpand,
  faDownload,
  faChevronRight,
  faHourglass1,
  faHourglass2,
  faHourglass3,
  faCheck,
  faSpinner,
  faExclamation,
  faChevronLeft,
  faXmark,
  faFile,
  faSquareMinus,
  faChartLine,
  faCaretDown,
  faArrowDownLong,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { faPaperPlane, faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Expandicon() {
  return <FontAwesomeIcon icon={faExpand} size="2xs" />;
}

export function Downloadicon() {
  return <FontAwesomeIcon icon={faDownload} size="1x" />;
}

export function Nexticon() {
  return <FontAwesomeIcon icon={faChevronRight} size="2xs" />;
}

export function Sendicon() {
  return <FontAwesomeIcon icon={faPaperPlane} size="lg" />;
}

export function Loadicon() {
  const [currentIcon, setCurrentIcon] = useState(faHourglass1);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIcon((prevIcon) => {
        if (prevIcon === faHourglass1) return faHourglass2;
        if (prevIcon === faHourglass2) {
          setRotate(true);
          return faHourglass3;
        }
        setRotate(false);
        return faHourglass1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const rotatingStyle = {
    transition: rotate ? "transform 1s linear" : "none",
    transform: rotate ? "rotate(180deg)" : "none",
  };
  return <FontAwesomeIcon icon={currentIcon} size="lg" style={rotatingStyle} />;
}

export function Checkicon() {
  return <FontAwesomeIcon icon={faCheck} size="lg" />;
}

export function Bellicon() {
  return <FontAwesomeIcon icon={faBell} size="lg" style={{ color: "#ffffff" }} shake />;
}

export function Spinnericon() {
  return <FontAwesomeIcon icon={faSpinner} size="sm" spin />;
}

export function Exclamicon() {
  return <FontAwesomeIcon icon={faExclamation} size="lg" beat />;
}

export function Lefticon() {
  return <FontAwesomeIcon icon={faChevronLeft} size="2xs" />;
}

export function Closeicon() {
  return <FontAwesomeIcon icon={faXmark} size="xl" />;
}

export function Fileicon() {
  return <FontAwesomeIcon icon={faFile} size="xl" />;
}

export function DownArrowicon() {
  return <FontAwesomeIcon icon={faArrowDownLong} size="xl" beat />;
}

export function Minimizeicon() {
  return <FontAwesomeIcon icon={faSquareMinus} size="xl" />;
}
export function ChartAnalysis() {
  return <FontAwesomeIcon icon={faChartLine} size="2xl" />;
}
export function CaretDown({ setClickCount, clickCount }) {
  const [rotation, setRotation] = useState(90);

  const handleClick = () => {
    setClickCount((prevClickCount) => prevClickCount + 1);

    if (clickCount === 2) {
      // 세 번째 클릭일 때 회전
      setRotation((prevRotation) => (prevRotation + 180) % 360);
    }
    if (clickCount === 3) {
      setRotation(90); // 회전 각도 초기화
      setClickCount(0); // 클릭 횟수 초기화
    }
  };

  return <FontAwesomeIcon icon={faCaretDown} size="2x" rotation={rotation} style={{ transition: "transform 0.5s" }} onClick={handleClick} />;
}
export function Question() {
  return <FontAwesomeIcon icon={faQuestion} size="2x" />;
}

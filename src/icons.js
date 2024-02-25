import React, { useState, useEffect } from "react";
import {
  faExpand,
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
  faListCheck,
  faBinoculars,
  faCode,
  faCircleHalfStroke,
  faMoon,
  faMagnifyingGlass,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

import { faPaperPlane, faBell, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Expandicon() {
  return <FontAwesomeIcon icon={faExpand} size="2xs" />;
}

export function Nexticon() {
  return <FontAwesomeIcon icon={faChevronRight} size="2xs" />;
}
export function Previcon() {
  return <FontAwesomeIcon icon={faChevronRight} size="2xs" rotation={180} />;
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
  return <FontAwesomeIcon icon={faArrowDownLong} size="xl" beatFade />;
}

export function Minimizeicon() {
  return <FontAwesomeIcon icon={faSquareMinus} size="xl" />;
}
export function ChartAnalysis() {
  return <FontAwesomeIcon icon={faChartLine} size="xl" />;
}
export function CaretDown({ width }) {
  const [rotation, setRotation] = useState(270);
  const vwToPx = (vw) => {
    return (parseFloat(vw) * window.innerWidth) / 100;
  };
  useEffect(() => {
    if (width < vwToPx(30)) {
      setRotation(90);
    } else if (width == vwToPx(30)) {
      setRotation(270);
    }
  }, [width]);

  return <FontAwesomeIcon icon={faCaretDown} size="2x" rotation={rotation} style={{ transition: "transform 0.5s" }} />;
}
export function Question() {
  return <FontAwesomeIcon icon={faQuestion} size="xl" />;
}

export function RecapIcon() {
  return <FontAwesomeIcon icon={faListCheck} size="xl" />;
}

export function BinocularIcon() {
  return <FontAwesomeIcon icon={faBinoculars} size="xl" />;
}

export function CodeIcon() {
  return <FontAwesomeIcon icon={faCode} size="1x" />;
}

export function DarkModeIcon({ darkMode, setDarkMode }) {
  const [icon, setIcon] = useState(faMoon);

  const handleMouseEnter = () => {
    setIcon(faCircleHalfStroke);
  };

  const handleMouseLeave = () => {
    setIcon(darkMode ? faMoon : faSun);
  };

  const handleClick = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setIcon(newDarkMode ? faMoon : faSun);
  };

  return <FontAwesomeIcon icon={icon} size="xl" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} />;
}
export function MagnifyingGlass() {
  return <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />;
}
export function ChartPie() {
  return <FontAwesomeIcon icon={faChartPie} size="2x" />;
}

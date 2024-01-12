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
  return (
    <FontAwesomeIcon
      icon={faBell}
      size="lg"
      style={{ color: "#ffffff" }}
      shake
    />
  );
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

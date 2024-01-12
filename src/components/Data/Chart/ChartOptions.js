// 차트 유형에 대한 구성 옵션

// 일반적인 차트 옵션
export function commonOptions(titleText) {
  return {
    responsive: true,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: titleText,
        font: {
          size: 18,
          weight: "bold",
        },
      },
      autocolors: {
        mode: "label",
      },
      colors: {
        enabled: true,
      },
      zoom: {
        limits: {
          y: { min: 0, max: 100 },
          y2: { min: -5, max: 5 },
        },
      },
    },
  };
}

// 막대그래프 옵션
export function BarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

// 수평 막대그래프 옵션
export function HorizontalBarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.indexAxis = "y";
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

// 누적 막대그래프 옵션
export function StackedBarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      stacked: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      stacked: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

// 수직 막대그래프 옵션
export function VerticalBarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

// 복합 막대그래프 옵션
export function ComboBarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

// 라인 차트 옵션
export function LineChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  options.elements = {
    line: {
      tension: 0.4, // Smoothening line
    },
    point: {
      radius: 5, // Point size
    },
  };
  return options;
}

// 다축 라인 차트 옵션
export function MultiAxisLineChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

// 포인트 스타일 라인 차트 옵션
export function PointStyleLineChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

// 누적 라인 차트 옵션
export function StackedBarLineChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

// 도넛 차트 옵션
export function DoughnutChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.cutout = "50%";
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  options.plugins.legend.position = "right";
  return options;
}

// 파이 차트 (원그래프) 옵션
export function PieChartOptions(titleText, xColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
  };
  options.plugins.legend.position = "right";
  return options;
}

// 극좌표 차트 옵션
export function PolarAreaChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  options.plugins.legend.position = "right";
  return options;
}

// 중심 정렬된 극좌표 차트 옵션
export function PolarAreaCenteredChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  options.plugins.legend.position = "right";
  return options;
}

// 산점도 차트 옵션
export function ScatterChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };

  return options;
}

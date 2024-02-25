import { generateplotOptions } from "./plotOptions";
const commonOptions = {
  chart: {},
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  zoom: {
    enabled: false,
  },

  tooltip: {
    enabled: true,
  },
};

const areaChartOptions = {
  ...commonOptions,
  // Add or override options specific to area charts
  chart: {
    ...commonOptions.chart,
    type: "area",
  },
  stroke: {
    curve: "smooth",
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.3,
      opacityTo: 0.7,
    },
  },
  plotOptions: generateplotOptions("area"),
};

const columnChartOptions = {
  ...commonOptions,
  // Add or override options specific to column charts
  chart: {
    ...commonOptions.chart,
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
    },
  },
  plotOptions: generateplotOptions("bar"),
};

const boxPlotChartOptions = {
  ...commonOptions,
  // Add or override options specific to box plot charts
  chart: {
    ...commonOptions.chart,
    type: "boxPlot",
  },
  plotOptions: {
    boxPlot: {
      colors: {
        upper: "#5C4742",
        lower: "#A5978B",
      },
    },
  },
  plotOptions: generateplotOptions("boxPlot"),
};

const rangeBarChartOptions = {
  ...commonOptions,
  // Add or override options specific to range bar charts
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      rangeBarGroupRows: true,
    },
  },
  xaxis: {
    type: "datetime", // Assuming x-axis represents dates
  },
  plotOptions: generateplotOptions("bar"),
};

const rangeAreaChartOptions = {
  ...commonOptions,
  // Add or override options specific to range area charts
  stroke: {
    curve: "smooth",
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
  plotOptions: generateplotOptions("area"),
};

const heatmapChartOptions = {
  ...commonOptions,
  // Add or override options specific to heatmap charts
  chart: {
    type: "heatmap",
  },
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    heatmap: {
      radius: 0,
      enableShades: true,
    },
  },
  plotOptions: generateplotOptions("heatmap"),
};

const treemapChartOptions = {
  ...commonOptions,
  // Add or override options specific to treemap charts
  chart: {
    type: "treemap",
  },
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: true,
    },
  },
  plotOptions: generateplotOptions("treemap"),
};

const radarChartOptions = {
  ...commonOptions,
  // Add or override options specific to radar charts
  chart: {
    ...commonOptions.chart,
    type: "radar",
  },
  plotOptions: generateplotOptions("radar"),
};

const radialBarChartOptions = {
  ...commonOptions,
  // Add or override options specific to radial bar charts
  chart: {
    ...commonOptions.chart,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: "70%",
        background: "#fff",
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: "front",
      },
      track: {
        background: "#fff",
        strokeWidth: "67%",
        margin: 0, // margin is in pixels
      },
    },
  },
};

const lineChartOptions = {
  ...commonOptions,
  chart: {
    ...commonOptions.chart,
    type: "line",
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 4,
  },
};

const barChartOptions = {
  ...commonOptions,
  chart: {
    ...commonOptions.chart,
    type: "bar",
  },
  theme: {
    monochrome: {
      enabled: true,
      color: "#255aee",
      shadeTo: "light",
      shadeIntensity: 0.65,
    },
  },
};

const pieChartOptions = {
  ...commonOptions,
  // Add or override options specific to pie charts
  chart: {
    ...commonOptions.chart,
    type: "pie",
  },
  legend: {
    position: "bottom",
  },
};
const donutChartOptions = {
  ...commonOptions,
  // Add or override options specific to pie charts
  chart: {
    ...commonOptions.chart,
    type: "donut",
  },
  labels: [], // Add labels if required
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

export const generateOptions = (type, title, seriesConfig, xaxisConfig) => {
  let options = {
    series: seriesConfig,
    chart: {
      width: "100%",
      type: type,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: title,
      align: "center",
      style: {
        fontWeight: "bold",
        fontSize: "30px",
      },
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },

    xaxis: { categories: xaxisConfig },
  };
  switch (type) {
    case "line":
      options = { ...options, ...lineChartOptions };
      break;
    case "bar":
      options = { ...options, ...barChartOptions };
      break;
    case "area":
      options = { ...options, ...areaChartOptions };
      break;

    case "column":
      options = { ...options, ...columnChartOptions };
      break;
    case "boxPlot":
      options = { ...options, ...boxPlotChartOptions };
      break;
    case "rangeBar":
      options = { ...options, ...rangeBarChartOptions };
      break;
    case "rangeArea":
      options = { ...options, ...rangeAreaChartOptions };
      break;
    case "heatmap":
      options = { ...options, ...heatmapChartOptions };
      break;
    case "treemap":
      options = { ...options, ...treemapChartOptions };
      break;
    case "radar":
      options = { ...options, ...radarChartOptions };
      break;
    case "radialBar":
      options = { ...options, ...radialBarChartOptions };
      break;

    default:
      break;
  }
  return options;
};
export const generatePieOptions = (type, title, seriesConfig, labelsConfig) => {
  let options = {
    series: seriesConfig,
    chart: {
      width: "100%",
      type: type,
    },
    dataLabels: {
      enabled: false,
    },

    title: {
      text: title,
      align: "center",
      style: {
        fontWeight: "bold",
        fontSize: "30px",
      },
    },
    labels: labelsConfig,
  };
  switch (type) {
    case "pie":
      options = { ...options, ...pieChartOptions };
      break;
    case "donut":
      options = { ...options, ...donutChartOptions };
      break;
  }
  return options;
};

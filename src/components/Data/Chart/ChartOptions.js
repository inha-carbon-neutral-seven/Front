const commonOptions = {
  chart: {
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "category",
  },
  yaxis: {
    title: {
      text: "Values",
    },
  },
  tooltip: {
    enabled: true,
  },
};
export const ChartOptions = {};

// Assuming commonOptions is defined as shown in previous examples

ChartOptions.lineChartOptions = {
  ...commonOptions,
  // Add or override options specific to line charts
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

ChartOptions.areaChartOptions = {
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
};

ChartOptions.columnChartOptions = {
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
};

ChartOptions.boxPlotChartOptions = {
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
};

ChartOptions.rangeBarChartOptions = {
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
};

ChartOptions.rangeAreaChartOptions = {
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
};

ChartOptions.heatmapChartOptions = {
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
};

ChartOptions.treemapChartOptions = {
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
};

ChartOptions.radarChartOptions = {
  ...commonOptions,
  // Add or override options specific to radar charts
  chart: {
    ...commonOptions.chart,
    type: "radar",
  },
  markers: {
    size: 4,
    colors: ["#fff"],
    strokeColor: "#FF4560",
    strokeWidth: 2,
  },
  plotOptions: {
    radar: {
      polygons: {
        strokeColor: "#e9e9e9",
        fill: {
          colors: ["#f8f8f8", "#fff"],
        },
      },
    },
  },
};

ChartOptions.radialBarChartOptions = {
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

ChartOptions.barChartOptions = {
  ...commonOptions,
  chart: {
    ...commonOptions.chart,
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
};

ChartOptions.pieChartOptions = {
  ...commonOptions,
  // Add or override options specific to pie charts
  chart: {
    ...commonOptions.chart,
    type: "pie",
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

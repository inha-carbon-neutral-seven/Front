export function plotOptions(chartType) {
  switch (chartType) {
    case "area":
      return {
        plotOptions: {
          area: {
            fillTo: "origin",
          },
        },
      };
    case "bar":
      return {
        plotOptions: {
          bar: {
            // horizontal: false,
            // borderRadius: 0,
            // borderRadiusApplication: "around",
            // borderRadiusWhenStacked: "last",
            // columnWidth: "70%",
            // barHeight: "70%",
            // distributed: false,
            // rangeBarOverlap: true,
            // rangeBarGroupRows: false,
            // hideZeroBarsWhenGrouped: false,
            // isDumbbell: false,
            // dumbbellColors: undefined,
            // isFunnel: false,
            // isFunnel3d: true,
            // colors: {
            //   ranges: [
            //     {
            //       from: 0,
            //       to: 0,
            //       color: undefined,
            //     },
            //   ],
            //   backgroundBarColors: [],
            //   backgroundBarOpacity: 1,
            //   backgroundBarRadius: 0,
            // },
            // dataLabels: {
            //   position: "top",
            //   maxItems: 100,
            //   hideOverflowingLabels: true,
            //   orientation: horizontal,
            //   total: {
            //     enabled: false,
            //     formatter: undefined,
            //     offsetX: 0,
            //     offsetY: 0,
            //     style: {
            //       color: "#373d3f",
            //       fontSize: "12px",
            //       fontFamily: undefined,
            //       fontWeight: 600,
            //     },
            //   },
            // },
          },
        },
      };
    case "bubble":
      return {
        plotOptions: {
          bubble: {
            zScaling: true,
            minBubbleRadius: undefined,
            maxBubbleRadius: undefined,
          },
        },
      };
    case "candlestick":
      return {
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#00B746",
              downward: "#EF403C",
            },
            wick: {
              useFillColor: true,
            },
          },
        },
      };
    case "boxPlot":
      return {
        plotOptions: {
          boxPlot: {
            colors: {
              upper: "#00E396",
              lower: "#008FFB",
            },
          },
        },
      };
    case "heatmap":
      return {
        plotOptions: {
          heatmap: {
            radius: 2,
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
            distributed: false,
            useFillColorAsStroke: false,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: undefined,
                  foreColor: undefined,
                  name: undefined,
                },
              ],
              inverse: false,
              min: undefined,
              max: undefined,
            },
          },
        },
      };
    case "treemap":
      return {
        plotOptions: {
          treemap: {
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
            distributed: false,
            useFillColorAsStroke: false,
            dataLabels: {
              format: "scale",
            },
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: undefined,
                  foreColor: undefined,
                  name: undefined,
                },
              ],
              inverse: false,
              min: undefined,
              max: undefined,
            },
          },
        },
      };
    case "pie":
      return {
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10,
            },
            donut: {
              size: "65%",
              background: "transparent",
              labels: {
                show: false,
                name: {
                  show: true,
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: undefined,
                  offsetY: -10,
                  formatter: function (val) {
                    return val;
                  },
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (val) {
                    return val;
                  },
                },
                total: {
                  show: false,
                  showAlways: false,
                  label: "Total",
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#373d3f",
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0);
                  },
                },
              },
            },
          },
        },
      };
    case "polarArea":
      return {
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 1,
              strokeColor: "#e8e8e8",
            },
            spokes: {
              strokeWidth: 1,
              connectorColors: "#e8e8e8",
            },
          },
        },
      };
    case "radar":
      return {
        plotOptions: {
          radar: {
            size: undefined,
            offsetX: 0,
            offsetY: 0,
            polygons: {
              strokeColors: "#e8e8e8",
              strokeWidth: 1,
              connectorColors: "#e8e8e8",
              fill: {
                colors: undefined,
              },
            },
          },
        },
      };
    case "radialBar":
      return {
        plotOptions: {
          radialBar: {
            inverseOrder: false,
            startAngle: 0,
            endAngle: 360,
            offsetX: 0,
            offsetY: 0,
            hollow: {
              margin: 5,
              size: "50%",
              background: "transparent",
              image: undefined,
              imageWidth: 150,
              imageHeight: 150,
              imageOffsetX: 0,
              imageOffsetY: 0,
              imageClipped: true,
              position: "front",
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5,
              },
            },
            track: {
              show: true,
              startAngle: undefined,
              endAngle: undefined,
              background: "#f2f2f2",
              strokeWidth: "97%",
              opacity: 1,
              margin: 5,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5,
              },
            },
            dataLabels: {
              show: true,
              name: {
                show: true,
                fontSize: "16px",
                fontFamily: undefined,
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "14px",
                fontFamily: undefined,
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val + "%";
                },
              },
              total: {
                show: false,
                label: "Total",
                color: "#373d3f",
                fontSize: "16px",
                fontFamily: undefined,
                fontWeight: 600,
                formatter: function (w) {
                  return (
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0) /
                      w.globals.series.length +
                    "%"
                  );
                },
              },
            },
          },
        },
      };
  }
}

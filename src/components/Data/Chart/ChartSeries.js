export function ChartSeries({ type, name, jsonData, option }) {
  let series;
  switch (type) {
    // 1. Single Values for Category Charts (Column/Bar)

    case "line":

    // 2.1 Numeric Paired Values (two-dimensional array)

    // 2.2 Numeric Paired Values (XY properties)

    // 2.3 Category Paired Values

    // 3.1 Timestamps

    // 3.2 Date Strings

    // Data for Pie/Donuts/RadialBars {
        default:
        series = [
            {
            name: option.title,
            data: jsonData.map((item) => item[option.column1]),
            },
  }
}

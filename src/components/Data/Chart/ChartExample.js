import { ChartComponent } from "./ChartComponent";

export const ExampleData = [
  {
    type: "line",
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    title: "Product Trends by Month",
  },
  {
    type: "bar",
    series: [
      {
        name: "Desktops",
        data: [210425, 219489, 260130, 276096, 254470, 282511, 247228, 242759, 169051, 225617, 164517, 207687],
      },
    ],
    xaxis: {
      categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    },
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    title: "Monthly Product Sales Across All Years",
  },
  {
    type: "pie",
    series: [35107, 42876, 41030, 45862, 41442, 4108],
    xaxis: {
      categories: ["2012", "2013", "2014", "2015", "2016", "2017"],
    },
    labels: ["2012", "2013", "2014", "2015", "2016", "2017"],
    title: "Sales Trends Over Time",
  },
];

function ChartExample() {
  return (
    <>
      {ExampleData.map((chartConfig, index) => (
        <div key={index} className="chart-container">
          <ChartComponent jsonData={chartConfig} />
        </div>
      ))}
    </>
  );
}

export default ChartExample;

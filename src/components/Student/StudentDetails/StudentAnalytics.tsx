import React from "react";
import Chart from "react-apexcharts";

type Props = {};

const StudentAnalytics = (props: Props) => {
  const options = {
    labels: ["Javascript", "c++", "C"],
  };
  const series = [44, 55, 41];
  const labels = ["A", "B", "C"];

  // area chart
  const series2 = [
    {
      name: "Spending Time",
      data: [234, 44, 55, 33, 555, 333, 543],
    },
  ];
  const options2 = {
    chart: {
      type: "area",
      height: 350,
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
      text: "Total Spending Times",
      align: "left",
    },
    subtitle: {
      text: "Time Movements",
      align: "left",
    },
    labels: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  };
  return (
    <div>
      <div className="title flex items-center justify-between my-2 bg-slate-50 p-2 rounded">
        <h3 className="text-lg">
          <span className="text-primary">Student 1</span> Course Analytics
        </h3>
        <select name="" className="select select-bordered" id="">
          <option value="">Select Course</option>
          <option value="">Course 1</option>
          <option value="">Course 2</option>
          <option value="">Course 3</option>
        </select>
      </div>
      <div className="my-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="donut">
            <Chart
              options={options}
              series={series}
              labels={labels}
              type="donut"
              width="100%"
            />
          </div>
          <div id="chart">
            <Chart
              options={options2 as any}
              series={series2}
              type="area"
              width={"100%"}
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;

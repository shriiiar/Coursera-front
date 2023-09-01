import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import Stats from "./Stats";
import { useAppContext } from "../../../../context/AppContext";
import { useGetEnrolledCoursesForStudentQuery } from "../../../../features/coursesSlice/courseApi";
import { useGetQuizMarkByStudentQuery } from "../../../../features/coursesSlice/teacherApi";
import ComponentLoader from "../../../../components/ComponentLoader";

type Props = {};

const Overview = (props: Props) => {
  const { currentUser } = useAppContext();

  const {
    data: studentQuizMarks,
    isLoading: quizMarkLoading,
    isError: quizMarkError,
  } = useGetQuizMarkByStudentQuery(currentUser?._id);

  const {
    data: enrolledCourses,
    isLoading: enrollCourseLoading,
    isError: enrollCourseError,
  } = useGetEnrolledCoursesForStudentQuery({});
  const { data } = enrolledCourses || {};

  let quizzesSubmitted = 0;
  if (Array.isArray(data)) {
    for (const course of data) {
      if (course && Array.isArray(course.videos)) {
        for (const video of course.videos) {
          if (
            video &&
            Array.isArray(video.quizzes) &&
            video.quizzes.length > 0
          ) {
            quizzesSubmitted++;
          }
        }
      }
    }
  }
  let assignmentsSubmitted = 0;

  if (Array.isArray(data)) {
    for (const course of data) {
      if (course && Array.isArray(course.videos)) {
        for (const video of course.videos) {
          if (
            video &&
            Array.isArray(video.assignments) &&
            video.assignments.length > 0
          ) {
            assignmentsSubmitted++;
          }
        }
      }
    }
  }

  // Data for the donut chart
  const chartOptions = {
    labels: ["Assignments", "Quizzes"],
    colors: ["#23C55D", "#5177F6"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  const chartData = [assignmentsSubmitted, quizzesSubmitted];
  const marks = [];
  const names = [];
  const idToNameMap = new Map();
  if (Array.isArray(studentQuizMarks?.data)) {
    for (const item of studentQuizMarks?.data) {
      const { _id, marks: markValue } = item;

      if (!idToNameMap.has(_id)) {
        idToNameMap.set(_id, `quiz ${idToNameMap.size + 1}`);
      }
      names.push(idToNameMap.get(_id));
      marks.push(markValue);
    }
  }

  const barChartData = {
    series: [
      {
        name: "Marks Obtained",
        data: marks,
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: names,
      },
    },
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 ">Student Dashboard</h1>

      <Stats
        enrolledCourses={enrolledCourses}
        enrollCourseLoading={enrollCourseLoading}
        enrollCourseError={enrollCourseError}
        studentQuizMarks={studentQuizMarks}
        quizMarkLoading={quizMarkLoading}
        quizMarkError={quizMarkError}
      />

      <div className="mx-auto grid grid-cols-2 gap-10">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Progress Overview</h2>
          <div className="flex justify-center">
            {enrollCourseLoading && <ComponentLoader />}
            {!enrollCourseLoading && !enrollCourseError && (
              <ReactApexChart
                options={chartOptions as ApexOptions}
                series={chartData}
                type="donut"
                width="170%"
              />
            )}
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Recent Quiz Marks</h2>
          <div className="">
            {quizMarkLoading && <ComponentLoader />}
            {!quizMarkLoading && !quizMarkError && (
              <ReactApexChart
                options={barChartData.options as ApexOptions}
                series={barChartData.series}
                type="bar"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

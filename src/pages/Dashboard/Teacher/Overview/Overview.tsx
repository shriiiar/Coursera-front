import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import Stats from "./Stats";
import {
  useGetAllEnrolledStudentsQuery,
  useGetCoursesForTeacherQuery,
} from "../../../../features/coursesSlice/courseApi";
import ComponentLoader from "../../../../components/ComponentLoader";
import { useAppContext } from "../../../../context/AppContext";
import {
  useGetAllAssignmentsQuery,
  useGetAllQuizQuery,
  useGetAllSubmittedAssignmentQuery,
  useGetAllSubmittedQuizQuery,
} from "../../../../features/coursesSlice/teacherApi";

type Props = {};

const Overview = (props: Props) => {
  const { currentUser } = useAppContext();
  // get all the course
  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useGetCoursesForTeacherQuery(currentUser?._id, { skip: !currentUser });
  const {
    data: allQuizzes,
    isLoading: allQuizLoading,
    isError: allQuizError,
  } = useGetAllQuizQuery(currentUser?._id);
  const {
    data: allSubmittedQuizzes,
    isLoading: allSubmittedQuizLoading,
    isError: allSubmittedQuizError,
  } = useGetAllSubmittedQuizQuery(currentUser?._id);
  const {
    data: allSubmittedAssignment,
    isLoading: allSubmittedAssignmentLoading,
    isError: allSubmittedAssignmentError,
  } = useGetAllSubmittedAssignmentQuery(undefined);

  const {
    data: allAssignments,
    isLoading: allAssignmentLoading,
    isError: allAssignmentError,
  } = useGetAllAssignmentsQuery(currentUser?._id);

  const {
    data: students,
    isLoading: studentsLoading,
    error: studentsError,
  } = useGetAllEnrolledStudentsQuery({
    courseId: "",
    sectionName: "",
    batchName: "",
    keyword: "",
  });
  let sectionAStudent = 0;
  let sectionBStudent = 0;
  let sectionCStudent = 0;
  let sectionDStudent = 0;
  let sectionEStudent = 0;

  students?.data?.forEach((student: any) => {
    switch (student.section) {
      case "Section A":
        sectionAStudent++;
        break;
      case "Section B":
        sectionBStudent++;
        break;
      case "Section C":
        sectionCStudent++;
        break;
      case "Section D":
        sectionDStudent++;
        break;
      case "Section E":
        sectionEStudent++;
        break;
      default:
        break;
    }
  });
  const totalStudentsData = {
    series: [
      {
        data: [
          sectionAStudent,
          sectionBStudent,
          sectionCStudent,
          sectionDStudent,
          sectionEStudent,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "Section A",
          "Section B",
          "Section C",
          "Section D",
          "Section E",
        ],
      },
      legend: {
        position: "bottom",
      },
    },
  };

  let sectionAAssignment = 0;
  let sectionBAssignment = 0;
  let sectionCAssignment = 0;
  let sectionDAssignment = 0;
  let sectionEAssignment = 0;

  allSubmittedAssignment?.data?.forEach((student: any) => {
    switch (student?.userId?.section) {
      case "Section A":
        sectionAAssignment++;
        break;
      case "Section B":
        sectionBAssignment++;
        break;
      case "Section C":
        sectionCAssignment++;
        break;
      case "Section D":
        sectionDAssignment++;
        break;
      case "Section E":
        sectionEAssignment++;
        break;
      default:
        break;
    }
  });

  const totalAssignmentsData = {
    series: [
      {
        data: [
          sectionAAssignment,
          sectionBAssignment,
          sectionCAssignment,
          sectionDAssignment,
          sectionEAssignment,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "Section A",
          "Section B",
          "Section C",
          "Section D",
          "Section E",
        ],
      },
      legend: {
        position: "bottom",
      },
    },
  };

  let sectionAQuizSubmit = 0;
  let sectionBQuizSubmit = 0;
  let sectionCQuizSubmit = 0;
  let sectionDQuizSubmit = 0;
  let sectionEQuizSubmit = 0;

  allSubmittedQuizzes?.data?.forEach((student: any) => {
    switch (student?.studentId?.section) {
      case "Section A":
        sectionAQuizSubmit++;
        break;
      case "Section B":
        sectionBQuizSubmit++;
        break;
      case "Section C":
        sectionCQuizSubmit++;
        break;
      case "Section D":
        sectionDQuizSubmit++;
        break;
      case "Section E":
        sectionEQuizSubmit++;
        break;
      default:
        break;
    }
  });
  const totalQuizzesData = {
    series: [
      {
        data: [
          sectionAQuizSubmit,
          sectionBQuizSubmit,
          sectionCQuizSubmit,
          sectionDQuizSubmit,
          sectionEQuizSubmit,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "Section A",
          "Section B",
          "Section C",
          "Section D",
          "Section E",
        ],
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const assignmentMonthsData = new Array(12).fill(0);
  allSubmittedAssignment?.data?.forEach((item: any) => {
    const createdAtDate = new Date(item.createdAt);
    const month = createdAtDate.getMonth();
    assignmentMonthsData[month] += 1;
  });

  const quizMonthsData = new Array(12).fill(0);
  allSubmittedQuizzes?.data?.forEach((item: any) => {
    const createdAtDate = new Date(item?.studentId?.createdAt);
    const month = createdAtDate.getMonth();
    quizMonthsData[month] += 1;
  });

  const submissionChartData = {
    series: [
      {
        name: "Assignments",
        data: assignmentMonthsData,
      },
      {
        name: "Quizzes",
        data: quizMonthsData,
      },
    ],
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const totalWatchedTimeData = {
    series: [
      {
        name: "Total Watched Time",
        data: [120, 90, 110, 80],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Batch A", "Batch B", "Batch C", "Batch D"],
      },
      legend: {
        position: "bottom",
      },
    },
  };
  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Teacher Dashboard</h1>

      <Stats
        students={students}
        studentsLoading={studentsLoading}
        studentsError={studentsError}
        courses={courses}
        coursesLoading={coursesLoading}
        coursesError={coursesError}
        allQuizzes={allQuizzes}
        allQuizLoading={allQuizLoading}
        allQuizError={allQuizError}
        allAssignments={allAssignments}
        allAssignmentLoading={allAssignmentLoading}
        allAssignmentError={allAssignmentError}
        allSubmittedQuizzes={allSubmittedQuizzes}
        allSubmittedQuizLoading={allSubmittedQuizLoading}
        allSubmittedQuizError={allSubmittedQuizError}
        allSubmittedAssignment={allSubmittedAssignment}
        allSubmittedAssignmentLoading={allSubmittedAssignmentLoading}
        allSubmittedAssignmentError={allSubmittedAssignmentError}
      />

      <div className="gap-10 grid grid-cols-2">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Students</h2>
          <div className="">
            {studentsLoading && <ComponentLoader />}
            {!studentsLoading && !studentsError && (
              <ReactApexChart
                options={totalStudentsData.options as ApexOptions}
                series={totalStudentsData.series}
                type="bar"
              />
            )}
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Total Assignment Submissions
          </h2>
          <div className="">
            {allSubmittedAssignmentLoading && <ComponentLoader />}
            {!allSubmittedAssignmentLoading && !allSubmittedAssignmentError && (
              <ReactApexChart
                options={totalAssignmentsData.options as ApexOptions}
                series={totalAssignmentsData.series}
                type="bar"
              />
            )}
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Quiz Submissions</h2>
          <div className="h-48">
            {allSubmittedQuizLoading && <ComponentLoader />}
            {!allSubmittedQuizLoading && !allSubmittedQuizError && (
              <ReactApexChart
                options={totalQuizzesData.options as ApexOptions}
                series={totalQuizzesData.series}
                type="bar"
              />
            )}
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Assignment and Quiz Submissions Over Time
          </h2>
          <div className="">
            <ReactApexChart
              options={submissionChartData.options as ApexOptions}
              series={submissionChartData.series}
              type="line"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

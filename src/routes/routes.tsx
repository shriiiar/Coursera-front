import { createBrowserRouter, Link } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home";
// import Courses from "../pages/courses/Classes";
// import CoursePlayer from "../pages/courses/CoursePlayer/CoursePlayer";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import StudentOverview from "../pages/Dashboard/Student/Overview/Overview";
import EditCourses from "../pages/Dashboard/Teacher/EditCourses/EditCourses";
import CourseDetails from "../pages/Dashboard/Teacher/Courses/course-details/CourseDetails";
import TeacherCourses from "../pages/Dashboard/Teacher/Courses/Courses";
import AuthGuard from "../guard/AuthGuard";
import Assignments from "../pages/Dashboard/Teacher/Assignments/Assignments";
import Quizzes from "../pages/Dashboard/Teacher/Quizzes/Quizzes";
import Students from "../pages/Dashboard/Teacher/Students/Students";
import Profile from "../pages/Dashboard/Profile/Profile";
import Settings from "../pages/Dashboard/Settings/Settings";
import Messages from "../pages/Dashboard/Teacher/Messages/Messages";
import EnrolledCourses from "../pages/Dashboard/Student/EnrolledCourses/EnrolledCourses";
import Notifications from "../pages/Dashboard/Student/Notifications/Notifications";
import TeacherGuard from "../guard/TeacherGuard";
import StudentGuard from "../guard/StudentGuard";
import StudentDetails from "../components/Student/StudentDetails/StudentDetails";
import TeacherOverview from "../pages/Dashboard/Teacher/Overview/Overview";
import Notification from "../pages/Dashboard/Teacher/Notification/Notification";
import HelpPage from "../pages/Dashboard/Student/Help/HelpPage";
import Classes from "../pages/classes/Classes";
import ClassPlayer from "../pages/classes/ClassPlayer/ClassPlayer";
import Courses from "../pages/courses/Courses";
import AdminLogin from "../pages/Authentication/AdminLogin";
import TeacherControl from "../pages/Dashboard/Admin/TeacherControl";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "classes",
    element: (
      <AuthGuard>
        <Classes />
      </AuthGuard>
    ),
  },
  {
    path: "courses",
    element: (
      <AuthGuard>
        <Courses />
      </AuthGuard>
    ),
  },
  {
    path: "classes/:classId",
    element: (
      <AuthGuard>
        <ClassPlayer />
      </AuthGuard>
    ),
  },
  // {
  //   path: "courses",
  //   element: <TeacherCourses />,
  // },
  // {
  //   path: "courses/:courseId",
  //   element: <CourseDetails />,
  // },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin/login",
    element: <AdminLogin />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "about",
    element: (
      <AuthGuard>
        <HelpPage></HelpPage>
      </AuthGuard>
    ),
  },
  // dashboard layout routes
  {
    path: "teacher/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: "", element: <TeacherOverview /> },
      {
        path: "courses",
        element: <TeacherCourses />,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "submitted-assignment",
        element: <Assignments />,
      },

      // {
      //   path: "quizzes",
      //   element: <Quizzes />,
      // },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "students/:studentId",
        element: <StudentDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
    ],
  },
  // for student
  {
    path: "student/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: "", element: <StudentOverview /> },
      {
        path: "enrolled-courses",
        element: <EnrolledCourses />,
      },
      {
        path: "submitted-assignment",
        element: <Assignments />,
      },
      {
        path: "quizzes",
        element: <Quizzes />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  // for student
  {
    path: "admin/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: "", element: <TeacherControl /> },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;

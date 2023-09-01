import React from "react";
import { BsBell, BsThermometer } from "react-icons/bs";
import { GiNewspaper, GiTeacher } from "react-icons/gi";
import { MdOutlineAssignment, MdOutlineQuiz } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiFillDashboard, AiOutlineDashboard } from "react-icons/ai";
import {
  BiChalkboard,
  BiMessageAltDetail,
  BiMessageRoundedDots,
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ComponentLoader from "./ComponentLoader";
import { FaCogs } from "react-icons/fa";

type Props = {};

// student dashboard menu
const StudentDashboardMenu = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: <AiFillDashboard />,
  },
  {
    title: "Enrolled Courses",
    path: "enrolled-courses",
    icon: <BiChalkboard />,
  },
  {
    title: "Submitted Assignment",
    path: "submitted-assignment",
    icon: <MdOutlineAssignment />,
  },
  {
    title: "Notifications",
    path: "notifications",
    icon: <BsBell />,
  },
  // {
  //   title: "Quizzes",
  //   path: "quizzes",
  //   icon: <MdOutlineQuiz />,
  // },
  {
    title: "Messages",
    path: "messages",
    icon: <BiMessageAltDetail />,
  },
  {
    title: "Profile",
    path: "profile",
    icon: <CgProfile />,
  },
  // {
  //   title: "Settings",
  //   path: "settings",
  //   icon: <FaCogs />,
  // },
];

// teacher dashboard menu
const TeacherDashboardMenu = [
  {
    title: "Dashboard",
    path: "/teacher/dashboard",
    icon: <AiOutlineDashboard />,
  },
  {
    title: "Courses",
    path: "courses",
    icon: <GiTeacher />,
  },
  {
    title: "Enrolled Students",
    path: "students",
    icon: <IoIosPeople />,
  },
  {
    title: "Submitted Assignment",
    path: "submitted-assignment",
    icon: <MdOutlineAssignment />,
  },
  {
    title: "Notification",
    path: "notification",
    icon: <GiNewspaper />,
  },
  // {
  //   title: "Quizzes",
  //   path: "quizzes",
  //   icon: <MdOutlineQuiz />,
  // },
  {
    title: "Messages",
    path: "messages",
    icon: <BiMessageRoundedDots />,
  },

  {
    title: "Profile",
    path: "profile",

    icon: <CgProfile />,
  },
];

const AdminDashboardMenu = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <AiOutlineDashboard />,
  },
  {
    title: "Profile",
    path: "profile",
    icon: <CgProfile />,
  },
];

const DashboardMenus = (props: Props) => {
  const { role, isLoading } = useAppContext();

  if (isLoading) {
    return <div>loading...</div>;
  }

  let menus =
    (role === "student" && StudentDashboardMenu) ||
    (role === "teacher" && TeacherDashboardMenu) ||
    (role === "admin" && AdminDashboardMenu) ||
    [];

  // active function
  const location = useLocation();

  return (
    <ul className="menu p-2 w-80  text-base-200 bg-gradient-to-bl from-violet-500 to-blue-500">
      {/*  Sidebar content here  */}
      <li className="p-2">
        <Link className="text-4xl font-bold font-montserrat" to={"/"}>
          ProPlatform
        </Link>
      </li>
      {menus.map((item, index) => {
        return (
          <li key={index}>
            <Link
              to={item.path}
              className={`menu-item active:bg-[#496ee9] ${
                location.pathname.split("/")[3] === item.path
                  ? "bg-[#3e61d4]"
                  : ""
              }`}
            >
              {item.icon}
              <span className="title">{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardMenus;

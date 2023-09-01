import { BsGrid, BsThermometer } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ComponentLoader from "../../components/ComponentLoader";
import DashboardMenus from "../../components/DashboardMenus";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import ScreenLoader from "../../components/ScreenLoader";
import { useCookies } from "react-cookie";
import { FaUserGraduate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { io } from "socket.io-client";
import { useGetNotificationQuery } from "../../features/coursesSlice/teacherApi";
import { IoNotificationsSharp } from "react-icons/io5";
import { SERVER_URL_FOR_SOCKET } from "../../config/config";
type Props = {};

const DashboardLayout = (props: Props) => {
  const socket = io(SERVER_URL_FOR_SOCKET);

  // from app context api
  const {
    role,
    isLoading,
    token,
    currentUser,
    setToken,
    setCurrentUser,
    setRole,
  } = useAppContext();
  const navigate = useNavigate();

  // to get cookie
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  // for get dynamically profile link
  const profileLink =
    (currentUser?.role === "student"
      ? "/student/dashboard/profile"
      : "/teacher/dashboard/profile") ||
    (currentUser.role === "admin" && "/admin/dashboard/profile");

  if (isLoading) {
    return <ScreenLoader />;
  }

  /* handle logout */
  const handleLogout = () => {
    removeCookies("token", {
      path: "/",
    });
    setToken(null);
    setCurrentUser(null);
    setRole(null);
    navigate("/login");
  };

  const [allNotification, setAllNotification] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState<any[]>([]);

  const {
    data: allNotificationData,
    isLoading: allNotificationLoading,
    isError,
    refetch,
  } = useGetNotificationQuery({
    teacher: "",
    student: "",
  });

  useEffect(() => {
    const filterData = allNotificationData?.data?.filter((notification: any) =>
      currentUser?.courses?.includes(notification.course._id)
    );
    setAllNotification(
      filterData?.filter(
        (notification: any) =>
          notification.student === currentUser?._id ||
          notification.student === ""
      )
    );
  }, [allNotificationData]);

  useEffect(() => {
    socket.emit("join-notification", currentUser?._id);
    currentUser?.courses?.map((courseId: any) =>
      socket.emit("join-notification", courseId)
    );
  }, [currentUser]);

  useEffect(() => {
    let isMounted = true;
    const handleNewNotification = (data: any) => {
      if (isMounted) {
        setNotificationCount((prevMessages: any) => [...prevMessages, data]);
        setAllNotification((prevMessages: any) => [...prevMessages, data]);
      }
    };
    socket.on("received-notification", handleNewNotification);
    // return () => {
    //   isMounted = false;
    // };
  });

  const handleNotification = () => {
    setNotificationCount([]);
  };

  useEffect(() => {
    refetch();
  }, [notificationCount]);

  const uniqueNotificationCount = notificationCount.filter(
    (obj, index, self) => index === self.findIndex((t) => t._id === obj._id)
  );
  const finalFilter = uniqueNotificationCount.filter((obj) => {
    return !obj.student || obj.student === currentUser?._id;
  });

  return (
    <main>
      {/* dashboard menus */}
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-1 bg-slate-200">
          {/* page header */}
          <div className="flex flex-row items-center justify-between bg-gradient-to-bl from-violet-500 to-blue-500 px-6 p-2 rounded sticky top-1 z-30 text-white">
            <div>
              <label
                htmlFor="my-drawer-2"
                className="btn btn-ghost drawer-button lg:hidden"
              >
                <BsGrid size={20} />
              </label>
              <span className="text-2xl">
                <Link to="/" className="flex items-center gap-2">
                  <span className="capitalize font-bold flex items-center gap-1 text-white ">
                    {role === "student" ? <FaUserGraduate /> : <GiTeacher />}
                    {role}
                  </span>{" "}
                </Link>
              </span>
            </div>

            <div className="flex items-center gap-10">
              {role === "student" && (
                <div className="relative dropdown dropdown-left">
                  <label onClick={handleNotification} tabIndex={0}>
                    <IoMdNotificationsOutline
                      size={27}
                      className="cursor-pointer"
                    />
                  </label>
                  <span className="badge bg-orange-600 border-0 text-white  cursor-pointer absolute -top-2 -right-3">
                    {finalFilter?.length}
                  </span>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-violet-600 ring-1 ring-violet-600 backdrop-blur-md  rounded-md w-72 max-h-96 overflow-y-auto"
                  >
                    {allNotification?.length > 0 ? (
                      <div className="">
                        {allNotification?.map((item: any) => (
                          <div
                          onClick={() => navigate("notifications")}
                            className={`p-2 ${
                              item?.notification_type === "Assignment"
                                ? "bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b]"
                                : "bg-white"
                            }  my-2 rounded-md cursor-pointer flex items-center gap-3`}
                          >
                            <div>
                              <IoMdNotificationsOutline
                                size={30}
                                className="bg-orange-600 text-white p-0.5 rounded-md"
                              />
                            </div>
                            <div>
                              <p
                                className={`font-semibold ${
                                  item?.notification_type === "Assignment"
                                    ? "text-white/90"
                                    : "text-slate-700"
                                } capitalize`}
                              >
                                {item?.title}
                              </p>
                              <p
                                className={` ${
                                  item?.notification_type === "Assignment"
                                    ? "text-white/80"
                                    : "text-slate-600"
                                } text-sm font-bold `}
                              >
                                {item?.notification_type}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-2 bg-white my-2 rounded-md cursor-pointer flex items-center gap-3">
                        <div>
                          <IoMdNotificationsOutline
                            size={30}
                            className="bg-orange-600 text-white p-0.5 rounded-md"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700 capitalize">
                            No notification found
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar bg-gray-300"
                >
                  <div
                    style={{ display: "grid" }}
                    className="w-10 h-10  place-items-center "
                    title={currentUser?.name}
                  >
                    {/* <img src="https://i.pravatar.cc/300" /> */}
                    <span className="text-2xl font-bold">
                      {currentUser?.name[0]}
                    </span>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black"
                >
                  <li>
                    <Link to={profileLink} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li onClick={handleLogout} className="cursor-pointer">
                    <a href="#"> Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Page content here  */}
          <div className="main-content p-4 bg-slate-200">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <DashboardMenus />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;

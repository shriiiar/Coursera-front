import React, { useEffect, useState } from "react";

import { SERVER_URL } from "../../../../config/config";
import Cookies from "universal-cookie";
import { useAppContext } from "../../../../context/AppContext";
import { useCookies } from "react-cookie";
import { useGetProfileQuery } from "../../../../features/api/userApi";
import { useGetNotificationQuery } from "../../../../features/coursesSlice/teacherApi";
import { Link } from "react-router-dom";

type Props = {};

const Notifications = (props: Props) => {
  const { token, currentUser } = useAppContext();
  const {
    data: allNotification,
    isLoading,
    isError,
  } = useGetNotificationQuery({
    teacher: "",
    student: "",
  });

  const filteredNotifications = allNotification?.data?.filter(
    (notification: any) => currentUser.courses.includes(notification.course._id)
  );

  const finalFilter = filteredNotifications?.filter(
    (notification: any) =>
      notification.student === currentUser?._id || notification.student === ""
  );

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mx-auto mt-4 ">
        {finalFilter?.map((data: any) => (
          <div
            key={data.id}
            className={` p-4 ${
              data?.notification_type === "Assignment"
                ? "bg-gradient-to-tr from-[#ff7e5f] to-[#feb47b]"
                : "bg-gradient-to-bl from-[#82e1f2] to-[#0052D4]"
            }  rounded-lg hover:bg-violet-500 text-white transition duration-300 shadow-md`}
          >
            <h2 className="text-lg font-semibold mb-2">{data?.title}</h2>

            <h2 className="font-medium mb-2">{data?.notification_type}</h2>
            <p>{data?.description}</p>
            {data?.link && (
              <div className="mt-10">
                <Link
                  to={data?.link}
                  target="blank"
                  className=" btn ml-3 btn-sm border-none text-black bg-white hover:bg-slate-200"
                >
                  Link
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

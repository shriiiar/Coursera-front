import React, { useEffect, useState } from "react";
import NotificationModal from "./NotificationModal";
import { SERVER_URL } from "../../../../config/config";
import Cookies from "universal-cookie";
import { useAppContext } from "../../../../context/AppContext";
import { useGetProfileQuery } from "../../../../features/api/userApi";
import { useCookies } from "react-cookie";
import {
  useCreateNotificationMutation,
  useGetNotificationQuery,
} from "../../../../features/coursesSlice/teacherApi";
import { Link } from "react-router-dom";
import ComponentLoader from "../../../../components/ComponentLoader";

type Props = {};

const Notification = (props: Props) => {
  const { currentUser } = useAppContext();

  const [
    createNotification,
    { data: notificationData, isLoading, isSuccess, error },
  ] = useCreateNotificationMutation();

  const {
    data: allNotification,
    isError: allNotificationError,
    isLoading: allNotificationLoading,
    refetch,
  } = useGetNotificationQuery({
    teacher: currentUser?._id,
    student: "",
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <div className="">
      <div className="container mx-auto p-4"></div>
      <NotificationModal
        createNotification={createNotification}
        notificationData={notificationData}
        isLoading={isLoading}
        isSuccess={isSuccess}
      ></NotificationModal>
      <div className="title flex items-center justify-between py-1 my-1">
        <label
          htmlFor="add-notification-modal"
          className="bg-violet-500 text-white py-2 px-3 rounded-md font-medium mb-5 cursor-pointer"
        >
          Add New Notification
        </label>
      </div>
      {allNotificationLoading && <ComponentLoader />}
      {!allNotificationLoading && !allNotificationError && (
        <div className="grid gap-4 grid-cols-4   ">
          {allNotification?.data?.map((data: any) => (
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
                <div className="mt-10 flex items-center justify-between">
                  <div>
                    <Link
                      to={data?.link}
                      target="blank"
                      className=" btn ml-3 btn-sm border-none text-black bg-white hover:bg-slate-200"
                    >
                      Link
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;

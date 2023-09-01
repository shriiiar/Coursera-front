import React, { useEffect, useState } from "react";
import {
  useCreateCourseMutation,
  useGetAllEnrolledStudentsQuery,
  useGetCoursesForTeacherQuery,
} from "../../../../features/coursesSlice/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { GiCoinsPile } from "react-icons/gi";
import { SERVER_URL, SERVER_URL_FOR_SOCKET } from "../../../../config/config";
import Cookies from "universal-cookie";
import { useAppContext } from "../../../../context/AppContext";
import { io } from "socket.io-client";

const cookie = new Cookies();

type Props = {
  createNotification: any;
  notificationData: any;
  isLoading: any;
  isSuccess: any;
};

const NotificationModal = ({
  createNotification,
  notificationData,
  isLoading,
  isSuccess,
}: Props) => {
  const socket = io(SERVER_URL_FOR_SOCKET);

  // keyword state
  const [keyword, setKeyword] = useState("");
  // by course
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  // get api for add course
  const { currentUser } = useAppContext();
  const token = cookie.get("token") as string | undefined;
  const { data: students } = useGetAllEnrolledStudentsQuery({
    courseId: course,
    sectionName: "",
    batchName: "",
    keyword,
  });

  const {
    data: courses,
    isLoading: courseLoading,
    isError: courseError,
  } = useGetCoursesForTeacherQuery(currentUser?._id, { skip: !currentUser });
  const { courses: allCourses } = courses || {};

  // get hook form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // handle submit form
  const handleAddNotification = handleSubmit(async (data: any) => {
    const finalData = { ...data, teacher: currentUser?._id };
    createNotification(finalData);
  });

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success("New notification created successfully", {
        id: "new-notification",
      });
      socket.emit("send-notification", notificationData?.data);
      setStudent("");
      setCourse("");
      reset();
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleAddNotification}>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="add-notification-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-notification-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Notification</span>
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Course</span>
            </label>
            <select
              required
              className="select select-bordered w-full"
              {...register("course", { required: true })}
            >
              <option value="" selected>
                Default
              </option>
              {allCourses?.map((course: any) => (
                <option value={course?._id}>{course?.courseName}</option>
              ))}
            </select>
            {errors.notification_type && (
              <span className="text-red-500 text-sm ">
                Notification type is required
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Notification type</span>
            </label>
            <select
              className="select select-bordered w-full "
              {...register("notification_type", { required: true })}
            >
              <option>Announcement</option>
              <option>Assignment</option>
            </select>
            {errors.notification_type && (
              <span className="text-red-500 text-sm ">
                Notification type is required
              </span>
            )}
          </div>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Notification Title </span>
              </label>
              <input
                required
                type="text"
                className="input input-bordered"
                {...register("title", {
                  required: true,
                })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm ">
                  Notification Title is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Notification Description.</span>
              </label>
              <textarea
                required
                className="textarea h-24 textarea-bordered"
                {...register("description")}
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Announcement or Assignment Link
                </span>
              </label>
              <input
                type="url"
                {...register("link")}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="section">Select Student</label>
              <select
                id="section"
                {...register("student")}
                className="select select-bordered w-full border-primary focus:border-primary"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              >
                <option value="">All Student </option>

                {students?.data?.map((student: any) => (
                  <option key={student?._id} value={student?._id}>
                    {student?.name} - id :{student?.studentId}
                  </option>
                ))}
              </select>
              {errors.section && (
                <span className="text-red-500 text-sm ">
                  Section is required
                </span>
              )}
            </div>

            <div className="form-control mt-3">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : " Add Notification"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NotificationModal;

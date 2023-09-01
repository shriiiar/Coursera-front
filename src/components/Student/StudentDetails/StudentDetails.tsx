import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../features/api/userApi";
import ComponentLoader from "../../ComponentLoader";
import { BsBack, BsCreditCard, BsSend, BsTrash } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CourseCard from "../../Teacher/Courses/CourseCard";
import StudentAnalytics from "./StudentAnalytics";

type Props = {};

const StudentDetails = (props: Props) => {
  // for navigate
  const navigate = useNavigate();

  const { studentId } = useParams<{ studentId: string }>();

  const {
    data: student,
    isLoading,
    isError,
  } = useGetUserByIdQuery(studentId, {
    skip: !studentId,
  });

  if (isLoading) return <ComponentLoader />;
  return (
    <div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span
            className="back-btn cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <BiArrowBack size={30} />
          </span>
          <h3 className="text-xl">Student Details</h3>
        </div>
        {/* user profile */}
        <div className="flex items-center gap-3 mt-5 bg-slate-50 p-3  justify-between">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 grid place-items-center border bg-white text-xl font-bold">
              <span>{student?.data?.name?.at(0)}</span>
            </div>
            <div>
              <div className="font-bold">{student?.data?.name}</div>
              <div className="text-sm opacity-50">{student?.data?.email}</div>
              <div className="text-sm opacity-50">
                {student?.data?.phone ? student?.data?.phone : "n/a"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className=" items-center gap-1 grid grid-cols-2">
              <button className="btn flex gap-2 items-center btn-sm btn-info rounded-sm ">
                <BsBack />
              </button>
              <button className="btn flex gap-2 items-center btn-sm btn-primary rounded-sm ">
                <BsSend />
              </button>

              <button className="btn flex gap-2 items-center btn-sm btn-success rounded-sm ">
                <BsCreditCard />
              </button>
              <button className="btn flex gap-2 items-center btn-sm btn-error rounded-sm ">
                <BsTrash />
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="my-3">
          <Tabs>
            <TabList>
              <Tab>
                Enrolled Courses{" "}
                <span className="badge badge-ghost">
                  {student?.data?.courses?.length}
                </span>
              </Tab>
              <Tab>Student Analytics</Tab>
            </TabList>

            <TabPanel>
              {/* Enrolled Course */}
              <div className="grid grid-cols-3 gap-2">
                {student?.data?.courses?.length === 0 && (
                  <>
                    <div>No Course Enrolled</div>
                  </>
                )}
                {student?.data?.courses?.map((course: any) => (
                  <div key={course._id} className="bg-gray-50 rounded">
                    <div className=" p-2">
                      <div className="">
                        <div className="">
                          <div className="mb-3 w-full">
                            <img
                              src={course?.image}
                              alt=""
                              className="w-full h-56 object-cover rounded"
                            />
                          </div>
                          {/*  <div className="w-12 h-12 rounded-full bg-gray-200"></div> */}
                          <div className="w-full p-2">
                            <p className="text-sm text-gray-600 bg-slate-200 p-1 px-3 w-fit rounded-lg">
                              {course?.level}
                            </p>
                            <p className="text-lg font-medium text-gray-700 mt-2">
                              {course?.courseName}
                            </p>
                            <p className="mt-2">{course?.duration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <StudentAnalytics />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;

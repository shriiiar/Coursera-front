import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

type Props = {
  item: any;
  className: any;
};

const CourseCard = ({ item, className }: Props) => {
  // from react router dom
  const { currentUser } = useAppContext();

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (currentUser.role === "student") {
      navigate(`/classes/${item?._id}`);
    }
    if (currentUser.role === "teacher") {
      navigate(`${item?._id}`);
    }
  };

  return (
    <div
      className=" bg-[#F2F7FF] cursor-pointer  rounded-2xl shadow-lg shadow-gray-300"
      onClick={handleNavigate}
    >
      <div
        className={`text-2xl text-center font-medium  rounded-2xl text-white pt-10 pb-8 ${className}`}
      >
        {item?.courseName}

        {/* <div className="w-12 h-12 rounded-full bg-gray-200"></div> */}
        <div className="p-3">
          {currentUser.role === "student" ? (
            <div className="text-sm font-medium text-black grid grid-cols-2 items-center gap-2 mt-10  ">
              <div className="flex flex-col gap-1 bg-white p-2 px-4 h-10 rounded">
                Milestones: {item?.milestones?.length}
              </div>
              <div className="flex flex-col gap-1 bg-white p-2 px-4 h-10 rounded">
                Modules: {item?.modules?.length}
              </div>
              <div className="flex flex-col gap-1 bg-white p-2 px-4 rounded">
                Videos: {item?.videos?.length}
              </div>
            </div>
          ) : (
            <div className="text-sm font-medium  text-gray-500 grid grid-cols-2 items-center gap-2 my-2  mt-3">
              <div className="flex flex-col gap-1 bg-white p-2 px-4 rounded">
                Milestones: {item?.milestones?.length}
              </div>
              <div className="flex flex-col gap-1 bg-white p-2 px-4 rounded">
                Modules: {item?.modules?.length}
              </div>
              <div className="flex flex-col gap-1 bg-white p-2 px-4   rounded">
                Videos: {item?.videos?.length}
              </div>
              <div className="flex flex-col gap-1 bg-white px-4 py-2 rounded">
                <span className="text-xs">
                  Enrolled Students: {item?.students?.length}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

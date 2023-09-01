import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  course: any;
};

const EnrolledCourseCard = ({ course: item }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className=" bg-slate-50 cursor-pointer rounded border"
      onClick={() => navigate(`/course/player/${item?._id}`)}
    >
      <div className=" p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-col">
            <div className="mb-3 w-full">
              <img
                src={item?.image}
                alt=""
                className="w-full h-56 object-cover rounded"
              />
            </div>
            {/*  <div className="w-12 h-12 rounded-full bg-gray-200"></div> */}
            <div className="ml-4">
              <div className="text-lg font-medium text-gray-700">
                {item?.courseName}
              </div>
              <div>
                <p className="text-xs text-gray-500">
                  {item?.description?.slice(0, 120)}
                </p>
              </div>
              <div className="text-sm font-medium text-gray-500 flex items-center gap-2 my-2  mt-3">
                <div className="flex flex-col gap-1 bg-white p-2 px-4 rounded">
                  Milestones: <span className="badge badge-ghost">0</span>
                </div>
                <div className="flex flex-col gap-1 bg-white p-2 px-4 rounded">
                  Modules: <span className="badge badge-ghost">0</span>
                </div>
                <div className="flex flex-col gap-1 bg-white p-2 px-4 rounded">
                  Lectures: <span className="badge badge-ghost">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;

import React, { useState } from "react";
import ModuleList from "./components/ModuleItem";
import AddMilestoneModal from "./modals/AddMilestoneModal";
import AddModuleModal from "./modals/AddModuleModal";
import AddVideoModal from "./modals/AddVideoModal";
import { useGetMilestoneByCourseQuery } from "../../../../../features/coursesSlice/courseApi";
import ScreenLoader from "../../../../../components/ScreenLoader";
import NoDataFound from "../../../../../components/ui/NoDataFound";
import MilestoneItem from "./components/MilestoneItem";

type Props = {
  courseId: String | undefined;
  course: any;
 
};

const ContentList = ({ courseId, course }: Props) => {

  // get milestone by this course
  const {
    data: milestones,
    isLoading,
    isError,
  } = useGetMilestoneByCourseQuery(courseId);


  if (isLoading) return <ScreenLoader />;
  if (isError) {
    return <div>something went wrong.</div>;
  }
  return (
    <div>
      {/* add milestone modal */}
      <AddMilestoneModal course={course} />

      <div className="title my-2">
        <h3 className="text-xl">
        <h3 className="text-xl font-bold">Course Content</h3>
        </h3>
      </div>
      <div   className="mt-4 py-4 bg-base-300 p-4 rounded-xl flex flex-col gap-4">
        {milestones?.milestones?.length > 0 ? (
          <div className="">
            {milestones?.milestones?.map((milestone: any, ind: number) => (
              <MilestoneItem
                key={milestone?._id}
                serial={ind}
                milestone={milestone}
              />
            ))}
          </div>
        ) : (
          <NoDataFound title={"Milestone not created yet."} />
        )}
      </div>
    </div>
  );
};

export default ContentList;

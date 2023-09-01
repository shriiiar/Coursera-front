import React from "react";
import ModuleList from "./ModuleItem";
import { useGetModuleByMilestoneQuery } from "../../../../../../features/coursesSlice/courseApi";

type Props = {
  milestone: any;
  serial?: number | undefined | any;
};

const MilestoneItem = ({ milestone, serial }: Props) => {

  
  const { data: modules } = useGetModuleByMilestoneQuery(milestone?._id);
  return (
    <div
      tabIndex={serial}
      className="collapse collapse-plus rounded-2xl bg-blue-200 my-2"
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-md font-medium  bg-indigo-300 flex flex-col border-2 border-white rounded-2xl items-start gap-1">
        <span>
          Milestone {serial + 1}: {milestone?.name}
        </span>
        <span className="text-xs">{milestone?.totalTimes}</span>
      </div>
      <div className="collapse-content">
        {modules?.modules?.length > 0 ? (
          <>
            {modules?.modules?.map((item: any, ind: number) => (
              <ModuleList key={item?._id} item={item} ind={ind} serial={serial} />
            ))}
          </>
        ) : (
          <div>No Modules cooked yet.</div>
        )}
      </div>
    </div>
  );
};

export default MilestoneItem;

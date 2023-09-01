import React from "react";
import { BiEditAlt, BiTrash, BiVideo } from "react-icons/bi";
import VideoItem from "./VideoItem";
import { useGetVideosByModuleQuery } from "../../../../../../features/coursesSlice/courseApi";

type Props = {
  item: any;
  serial?: number | undefined | any;
  ind: number;
  key: any;
};

const ModuleList = ({ item, ind, serial }: Props) => {
  // get videos by module
  const { data: videos } = useGetVideosByModuleQuery(item?._id);
  return (
    <div
      tabIndex={serial}
      className="collapse collapse-plus rounded-2xl bg-slate-400 mt-2"
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-md font-medium text-white  bg-slate-600">
        Module {ind + 1}: {item?.name}
      </div>
      <div className="collapse-content text-sm">
        <ul className="flex flex-col  rounded-2xl gap-1 mt-2">
          {videos?.videos?.map((item: any, ind: number, key: any) => (
            <VideoItem key={item?._id} serial={serial} item={item} ind={ind} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModuleList;

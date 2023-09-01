import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
type Props = {_id: any, name: any, text: any, position: any};

const TestimonialCard = ({ _id, name, text, position }: Props) => {
  return (
    <div className="max-w-sm m-10 mx-auto">
      <div className="shadow-lg hover:scale-105 transition-all duration-200 bg-white flex flex-col justify-between h-72 p-5 rounded-lg ring-1 ring-[#a2c1cc3f] mx-3">
        <div>
          <p className=" text-[#a2c1cc] ">
            <RiDoubleQuotesL size={40} />
          </p>
          <p className="mt-5">
            {text?.length > 150 ? text.slice(0, 150) + "..." : text}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-11 rounded-full shadow-lg shadow-gray-400">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
            </div>
          </div>

          <div>
            <p className="font-bold text-slate-500"> {name}</p>
            <p className="text-sm text-slate-400"> {position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

import React from "react";

type Props = { name: string; bio: string; expertise: string };

const InstructorCard = ({ name, bio, expertise }: Props) => {
  return (
    <div className="mx-auto m-10">
      <div className="shadow-lg h-52 bg-white hover:scale-105 transition-all duration-200 rounded-lg ring-1 ring-[#a2c1cc3f] p-5 mx-5">
        <p className="font-bold text-xl text-slate-500">{name}</p>
        <p className="text-slate-400 font-medium text-sm mt-1">{expertise}</p>
        <p className="mt-4">{bio}</p>
      </div>
    </div>
  );
};

export default InstructorCard;

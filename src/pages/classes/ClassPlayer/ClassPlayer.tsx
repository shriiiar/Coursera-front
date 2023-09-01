import React, { useState } from "react";
import Navbar from "../../../shared/Navbar";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import {
  useGetCourseByIdQuery,
  useGetMilestoneByCourseQuery,
} from "../../../features/coursesSlice/courseApi";
import { Link, useParams } from "react-router-dom";
import MilestoneItems from "./MilestoneItems";
import { BsFillChatDotsFill } from "react-icons/bs";
import moment from "moment";
type Props = {};

const ClassPlayer = (props: Props) => {
  const { classId } = useParams<{ classId: string }>();
  const { data: milestone } = useGetMilestoneByCourseQuery(classId);
  const [openTab, setOpenTab] = useState({
    url: "https://www.youtube.com/embed/vLnPwxZdW4Y",
    name: "C++ ",
    description: "This a C++ Crash course",
    updatedAt: "",
  });
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="bg-[#7594fc]">
        <Navbar></Navbar>
      </div>
      <section className="py-6 pb-24">
        <div className="mx-auto max-w-screen-xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8 m-12">
            <div className="col-span-full w-full space-y-8 p-4 bg-gradient-to-br from-violet-500 to-blue-500 text-white rounded-md  lg:col-span-2">
              <div>
                <iframe
                  width="100%"
                  src={openTab?.url}
                  title="YouTube video player"
                  className="aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight mt-5">
                    {openTab?.name}
                  </h1>
                  <h1 className="text-lg font-medium tracking-tight mt-2">
                    Description : {openTab?.description}
                  </h1>
                  <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-300 mt-2">
                    Uploaded on : {moment(openTab?.updatedAt).format("lll")}
                  </h2>

                  {/* <p className="mt-4 text-sm text-slate-400 leading-6">
                    আপনারা যারা বিগিনার হিসেবে রিয়্যাক্ট জেস নিয়ে কাজ করা শুরু
                    করেছেন, তারা রিয়্যাক্ট এর বেশ কিছু কনসেপ্ট ঠিক মতো আয়ত্ত
                    না করতে পারার কারণে বিচিত্র কিছু সমস্যার সম্মুখীন হন
                  </p> */}
                </div>
              </div>
            </div>
            <div className="col-span-full lg:col-auto h-[590px] overflow-y-auto  p-5 rounded-md bg-gradient-to-tr from-violet-500 to-blue-500 text-black divide-y ">
              {milestone?.milestones?.map((item: any) => (
                <MilestoneItems
                  item={item}
                  key={item?._id}
                  setOpenTab={setOpenTab}
                  openTab={openTab}
                />
              ))}
            </div>
          </div>
        </div>

        <Link
          to="/about"
          className="flex gap-4 items-center mx-auto justify-center text-center"
        >
          {" "}
          <BsFillChatDotsFill size={40} />{" "}
          <h1 className="text-2xl font-bold">Ask A question</h1>
        </Link>
      </section>

      {/* <div className="mt-20"></div> */}
    </>
  );
};

export default ClassPlayer;

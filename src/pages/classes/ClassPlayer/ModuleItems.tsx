import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import {
  useGetModuleByMilestoneQuery,
  useGetModulesByCourseQuery,
} from "../../../features/coursesSlice/courseApi";
import {
  useGetAssignmentByVideoIdQuery,
  useGetVideosByModuleQuery,
} from "../../../features/coursesSlice/studentApi";
import AssignmentItems from "./AssignmentItems";
import QuizForm from "./QuizForm";

type Props = {
  item: any;
  setOpenTab: any;
  openTab: any;
};

const ModuleItems = ({ item, setOpenTab, openTab }: Props) => {
  const { data } = useGetVideosByModuleQuery(item._id);

  const [active, inActive] = useState(false);
  const [videoId, setVideoId] = useState();

  const { data: assignmentData } = useGetAssignmentByVideoIdQuery(videoId);

  return (
    <Accordion className="accordion-body bg-indigo-800/60 m-3 rounded-md ">
      <ul role="tablist">
        <AccordionItem key={item._id}>
          {({ open }: any) => (
            <>
              <AccordionHeader
                className={`w-full flex justify-between items-center  rounded-md p-3 text-white ${
                  !open
                    ? "bg-indigo-800/60"
                    : "bg-indigo-800/60 text-lg text-black font-bold"
                }`}
              >
                <span>{item.name}</span>
                <svg
                  className={`w-6 h-6 ${!open ? "" : "rotate-90"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </AccordionHeader>

              <AccordionBody>
                {data?.data?.map((i: any, index: number) => (
                  <>
                    {" "}
                    <div
                      key={i._id}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(i);
                      }}
                      data-toggle="tab"
                      role="tablist"
                      className=" m-4  p-2 rounded-md bg-white  text-blacks"
                    >
                      <div
                        className={`w-full flex flex-row gap-2 cursor-pointer `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                          />
                        </svg>

                        <div
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className="flex flex-col w-full"
                        >
                          <a href="#">
                            <p className=" text-sm font-medium">{i.name}</p>
                          </a>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <QuizForm key={i._id} vId={i._id} />
                    <AssignmentItems key={i._id} i={i._id} />
                  </>
                ))}
              </AccordionBody>
            </>
          )}
        </AccordionItem>
      </ul>
    </Accordion>
  );
};

export default ModuleItems;

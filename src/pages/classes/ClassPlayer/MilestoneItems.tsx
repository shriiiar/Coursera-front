import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import ModuleItems from "./ModuleItems";
import { useGetModuleByMilestoneQuery } from "../../../features/coursesSlice/studentApi";

type Props = {
  item: any;
  setOpenTab: any;
  openTab: any;
};

const MilestoneItems = ({ item, setOpenTab, openTab }: Props) => {
  const { data: module } = useGetModuleByMilestoneQuery(item._id);

  return (
    <Accordion
      className=" rounded-md bg-indigo-800/20 mb-4"
      transition={{
        duration: "300ms",
        timingFunction: "cubic-bezier(0, 0, 0.2, 1)",
      }}
    >
      <AccordionItem key={item._id}>
        {({ open }: any) => (
          <>
            <AccordionHeader className="w-full flex justify-between items-center rounded-md p-3 ">
              <span className="font-bold text-xl text-white">{item.name}</span>
              <svg
                className={`w-6 h-6 ${!open ? "" : "rotate-90 text-white"}`}
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
              {module?.data?.map((ite: any) => (
                <ModuleItems
                  openTab={openTab}
                  item={ite}
                  key={ite._id}
                  setOpenTab={setOpenTab}
                />
              ))}
            </AccordionBody>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default MilestoneItems;

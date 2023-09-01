import React, { useState } from "react";
import Navbar from "../../shared/Navbar";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { BiChevronDown, BiCross, BiPlus, BiX } from "react-icons/bi";
import { set, useForm } from "react-hook-form";
import { useGetEnrolledCoursesForStudentQuery } from "../../features/coursesSlice/courseApi";
import ComponentLoader from "../../components/ComponentLoader";
import CourseCard from "../../components/Teacher/Courses/CourseCard";
import NoDataFound from "../../components/ui/NoDataFound";
import { useNavigate } from "react-router";
import { useAppContext } from "../../context/AppContext";

const filtersData = [
  {
    id: 1,
    name: "Course Name",
    slug: "courseName",
    type: "text",
  },
  {
    id: 2,
    name: "Course Code",
    slug: "courseCode",
    type: "text",
  },
  {
    id: 3,
    name: "Course Type",
    slug: "courseType",
    type: "select",
    options: [
      {
        id: 1,
        name: "Type 1",
      },
      {
        id: 2,
        name: "Type 2",
      },
    ],
  },
];
type Props = {};

const Classes = (Props: any) => {
  // form
  const { handleSubmit, register, setValue, reset } = useForm();

  const [filtersItem, setFiltersItem] = useState<any[]>(filtersData);

  const [filters, setFilters] = useState<any[]>([]);

  // on selected filter
  const onSelectedFilter = (id: number) => {
    // remove the items from filtersItem
    const newFiltersItem = filtersItem.filter((item) => item.id !== id);
    setFiltersItem(newFiltersItem);

    // add the items to filters
    const newFilters = filtersItem.filter((item) => item.id === id);
    setFilters([...filters, ...newFilters]);
  };

  // clear all filters
  const clearAll = () => {
    setFiltersItem(filtersData);
    setFilters([]);
    reset();
  };

  // remove filter
  const removeFilter = (id: number) => () => {
    // remove the items from filters
    const removedItem = filters.find((item) => item.id === id);
    setFiltersItem([...filtersItem, removedItem].sort((a, b) => a.id - b.id));
    const newFilters = filters.filter((item) => item.id !== id);
    setFilters(newFilters);
    setValue(removedItem.slug, "");
  };

  // on submit
  const onSubmit = (data: any) => {};
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetEnrolledCoursesForStudentQuery({});


  const { currentUser } = useAppContext();

  const colorClasses = ["card-color-1", "card-color-2", "card-color-3"]; // Add more class names as needed
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5 ">
        <div className="title py-3 my-1"></div>
        <div className="">
          {isLoading ? (
            <ComponentLoader />
          ) : isError ? (
            <div className="text-center">
              Something went wrong Or This route is for student
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                Welcome Back{" "}
                <span className="text-violet-600">{currentUser?.name},</span>{" "}
                Ready For Your Next Lesson?
              </h1>
              {courses?.data?.length > 0 ? (
                <div className="mt-6 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                  {courses?.data?.map((item: any, index: number) => (
                    <CourseCard
                      key={item._id}
                      item={item}
                      className={colorClasses[index % colorClasses.length]}
                    />
                  ))}
                </div>
              ) : (
                <NoDataFound title={"No Courses Found."} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Classes;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthDecision from "../../components/AuthDecision";
import { useAppContext } from "../../context/AppContext";
import Navbar from "../../shared/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import CourseCard from "../../components/Teacher/Courses/CourseCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NoDataFound from "../../components/ui/NoDataFound";
import { useGetEnrolledCoursesForStudentQuery } from "../../features/coursesSlice/courseApi";
import ComponentLoader from "../../components/ComponentLoader";
import TestimonialCard from "../../components/TestimonialCard";
import InstructorCard from "../../components/InstructorCard";

const responsiveTestimonial = {
  // the naming can be any, depends on you.
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const responsiveInstructor = {
  // the naming can be any, depends on you.
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Props = {};

const HeroSection = (props: Props) => {
  const colorClasses = ["card-color-1", "card-color-2", "card-color-3"]; // Add more class names as needed

  const { currentUser } = useAppContext();

  // get all the course
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetEnrolledCoursesForStudentQuery({});

  const categories = [
    "Programming",
    "Design",
    "Business",
    "Data Structures",
    "Others",
  ];
  const testimonials = [
    {
      _id: 1,
      name: "John Doe",
      text: "I really enjoyed the courses on ProPlateform. The instructors were knowledgeable, and the content was well-organized.",
      position: "Jr Mern Developer",
    },
    {
      _id: 2,
      name: "Jane Smith",
      text: "ProPlateform helped me improve my programming skills. The hands-on projects were particularly useful for my learning.",
      position: "React Native Developer",
    },
    {
      _id: 3,
      name: "Shakil Ahmed",
      text: "ProPlateform helped me improve my programming skills. The hands-on projects were particularly useful for my learning.",
      position: "Data Analytics",
    },
    {
      _id: 4,
      name: "Tanvir Rahman",
      text: "ProPlateform helped me improve my programming skills.",
      position: "MEAN Developer",
    },
    // Add more testimonials as needed
  ];
  const instructors = [
    {
      _id: 1,
      name: "Dr. Alice Johnson",
      expertise: "Computer Science",
      bio: "Dr. Johnson is a renowned computer scientist with years of experience in teaching programming and data structures.",
    },
    {
      _id: 2,
      name: "John Smith",
      expertise: "Software Engineering",
      bio: "John is a software engineer with expertise in Java and software design. He is passionate about helping students succeed in their careers.",
    },
    {
      _id: 3,
      name: "Shakil Ahmed",
      expertise: "Software Engineering",
      bio: "John is a software engineer with expertise in Java and software design. He is passionate about helping students succeed in their careers.",
    },
    // Add more instructors as needed
  ];
  return (
    <>
      {currentUser?.role === "student" && (
        <section className="py-12 container">
          <div className=" mx-auto">
            <h2 className="text-3xl font-bold mb-12 pl-3">
              Enrolled Courses
            </h2>

            {isLoading ? (
              <ComponentLoader />
            ) : isError ? (
              <div className="text-center">Something went wrong Sir.</div>
            ) : (
              <>
                {courses?.data?.length > 0 ? (
                  <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
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
        </section>
      )}

      <section className="py-14 h-96">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-5 pl-3">Course Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="py-3 px-6 rounded-lg bg-white text-gray-800 border border-gray-300 font-semibold hover:bg-gray-200 focus:outline-none transition-colors duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 bg-[#a2c1ccb0]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-5 pl-3">Student Testimonials</h2>

          <Carousel
            responsive={responsiveTestimonial}
            draggable={false}
            swipeable={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            arrows={false}
            slidesToSlide={2}
          >
            {testimonials?.map((testimonial) => (
              <TestimonialCard key={testimonial._id} {...testimonial} />
            ))}
          </Carousel>
        </div>
      </section>
      <section className="py-14 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-5 pl-3">Instructor Highlights</h2>

          <Carousel
            responsive={responsiveInstructor}
            draggable={false}
            swipeable={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            arrows={false}
            slidesToSlide={2}
          >
            {instructors?.map((instructor) => (
              <InstructorCard key={instructor._id} {...instructor} />
            ))}
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

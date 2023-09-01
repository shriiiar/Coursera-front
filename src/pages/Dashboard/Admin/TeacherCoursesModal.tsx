import React from "react";

type Props = { selectedCourse: any; setSelectedCourse: any };

export default function TeacherCoursesModal({
  setSelectedCourse,
  selectedCourse,
}: Props) {

  return (
    <>
      <div className="fixed w-full h-full inset-0 z-50 bg-black/50 poppins">
        <div className="rounded-lg w-full max-w-lg space-y-5 bg-[#F2F3F8] p-7 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <span
            onClick={() => setSelectedCourse(null)}
            className="absolute -right-4 -top-4 cursor-pointer font-semibold text-lg bg-violet-600 h-9 w-9 text-white rounded-full flex items-center justify-center"
          >
            X
          </span>
          <div className="">
            {selectedCourse?.map((course: any) => (
              <div className="my-5 bg-white rounded-md">
                <div className="flex gap-2">
                  <div>
                    <img
                      src={course.image}
                      alt=""
                      className="w-24 h-20 object-cover rounded-l-md"
                    />
                  </div>
                  <div className="p-1 px-2 w-full">
                    <p className="font-medium">{course.courseName}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{course.duration}</p>
                        <p className="text-sm font-medium">{course.level}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Students: {course?.students?.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

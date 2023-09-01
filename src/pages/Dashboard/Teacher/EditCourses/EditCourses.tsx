import React from "react";

type Props = {};

const EditCourses = (props: Props) => {
  return (
    <div>
      <div>
        <h1>All Courses</h1>
        <div className="mt-6">
          <div className="card w-96 bg-base-100 shadow-xl image-full col-start-1 col-end-2 ">
            <figure>
              <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">C</h2>
              {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourses;

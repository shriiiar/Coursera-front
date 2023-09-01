import React, { useState } from "react";
import { useGetUsersQuery } from "../../../features/api/userApi";
import TeacherRow from "./TeacherRow";
import ComponentLoader from "../../../components/ComponentLoader";
import TeacherCoursesModal from "./TeacherCoursesModal";
import AddTeacherModal from "./AddTeacherModal";
import EditTeacherModal from "./EditTeacherModal";
import DeleteTeacherModal from "./DeleteTeacherModal";

type Props = {};

const TeacherControl = (props: Props) => {
  const { data, isLoading, isError } = useGetUsersQuery("teacher");
  const { data: teachersData } = data || {};

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isTeacherAddModalOpen, setTeacherModalOpen] = useState(false);
  const [editTeacherData, setEditTeacherData] = useState(null) 
  const [deleteTeacherId, setDeleteTeacherId] = useState(null)

  let content = null;

  if (isLoading) {
    content = <ComponentLoader />;
  } else if (!isLoading && isError) {
    content = (
      <p className="text-center mt-5 text-red-500">Something went wrong!</p>
    );
  } else if (!isLoading && !isError && teachersData?.length === 0) {
    content = (
      <div className="text-center mt-5 text-red-500 text-xl font-medium">
        No teacher found!
      </div>
    );
  } else if (!isLoading && !isError && teachersData?.length > 0) {
    content = (
      <div>
        {teachersData?.length > 0 ? (
          <div className="mt-5">
            <div className="overflow-x-auto  pb-20">
              <table className="table w-full">
                {/* head */}
                <thead className="">
                  <tr>
                    <th className="py-5 text-sm">SL</th>
                    <th className="py-5 text-sm">Name</th>
                    <th className="py-5 text-sm">Email</th>
                    <th className="py-5 text-sm">Phone</th>
                    <th className="py-5 text-sm">Specialist</th>
                    <th className="py-5 text-sm">Courses</th>
                    <th className="py-5 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachersData?.map((teacher: any, index: number) => (
                    <TeacherRow
                      teacher={teacher}
                      index={index}
                      setSelectedCourse={setSelectedCourse}
                      setEditTeacherData={setEditTeacherData}
                      setDeleteTeacherId={setDeleteTeacherId}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center font-medium text-lg mt-20">
            No Teacher Found
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="my-3 flex justify-end">
        <button
          onClick={() => setTeacherModalOpen(true)}
          className="bg-gradient-to-tr from-violet-500 to-blue-500 px-3 py-1 text-white rounded-md font-medium"
        >
          Add Teacher
        </button>
      </div>
      <div>{content}</div>
      {selectedCourse && (
        <TeacherCoursesModal
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      )}
      {isTeacherAddModalOpen && <AddTeacherModal setTeacherModalOpen={setTeacherModalOpen} />}
      {editTeacherData && <EditTeacherModal editTeacherData={editTeacherData} setEditTeacherData={setEditTeacherData} />}
      {deleteTeacherId && <DeleteTeacherModal deleteTeacherId={deleteTeacherId} setDeleteTeacherId={setDeleteTeacherId} />}
    </div>
  );
};

export default TeacherControl;

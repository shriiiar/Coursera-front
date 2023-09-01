import React, { useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useGetAllSubmittedAssignmentQuery } from "../../../../features/coursesSlice/teacherApi";
import ComponentLoader from "../../../../components/ComponentLoader";
import SubmittedAssignmentRow from "./SubmittedAssignmentRow";
import AssignmentMarkUpdateModal from "./AssignmentMarkUpdateModal";

type Props = {};

const Assignments = (props: Props) => {
  const { currentUser } = useAppContext();
  const [assignmentUpdate, setAssignmentUpdate] = useState(null);
  const {
    data: allAssignment,
    isLoading: allSubmittedAssignmentLoading,
    isError: allSubmittedAssignmentError,
  } = useGetAllSubmittedAssignmentQuery(undefined);
  const { data: allSubmittedAssignment } = allAssignment || {};

  let content = null;

  if (allSubmittedAssignmentLoading) {
    content = <ComponentLoader />;
  } else if (!allSubmittedAssignmentLoading && allSubmittedAssignmentError) {
    content = (
      <p className="text-center mt-5 text-red-500">Something went wrong!</p>
    );
  } else if (
    !allSubmittedAssignmentLoading &&
    !allSubmittedAssignmentError &&
    allSubmittedAssignment?.length === 0
  ) {
    content = (
      <div className="text-center mt-5 text-xl font-medium">
        No assignment found!
      </div>
    );
  } else if (
    !allSubmittedAssignmentLoading &&
    !allSubmittedAssignmentError &&
    allSubmittedAssignment?.length > 0
  ) {
    content = (
      <div>
        <div className="mt-5">
          <div className="overflow-x-auto  pb-20">
            <table className="table w-full">
              <thead className="">
                <tr>
                  <th className="py-5 text-sm">SL</th>
                  {currentUser?.role !== "student" && (
                    <th className="py-5 text-sm">Name</th>
                  )}
                  <th className="py-5 text-sm">Course</th>
                  <th className="py-5 text-sm">Module</th>
                  <th className="py-5 text-sm">Video</th>
                  <th className="py-5 text-sm">Assignment</th>
                  <th className="py-5 text-sm">Full Marks</th>
                  <th className="py-5 text-sm">Marks</th>
                  <th className="py-5 text-sm">Details</th>
                  {currentUser?.role !== "student" && (
                    <th className="py-5 text-sm">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {allSubmittedAssignment?.map(
                  (assignment: any, index: number) => (
                    <SubmittedAssignmentRow
                    key={assignment._id}
                      assignment={assignment}
                      index={index}
                      setAssignmentUpdate={setAssignmentUpdate}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        {assignmentUpdate && (
          <AssignmentMarkUpdateModal
            assignmentUpdate={assignmentUpdate}
            setAssignmentUpdate={setAssignmentUpdate}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <h3 className="m-5 text-lg font-medium">Submitted Assignment</h3>

      <div>{content}</div>
    </div>
  );
};

export default Assignments;

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { BsEye } from "react-icons/bs";
import { BiDetail, BiDownload } from "react-icons/bi";
import {
  useDeleteSubmittedAssignmentMutation,
  useGetAssignmentMarkByIdQuery,
} from "../../../../features/coursesSlice/teacherApi";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDownloadFileQuery } from "../../../../features/coursesSlice/googleDriveApi";
import { SERVER_URL } from "../../../../config/config";
import { MdDownload } from "react-icons/md";
import { Link } from "react-router-dom";

type Props = { assignment: any; index: number; setAssignmentUpdate: any };

export default function SubmittedAssignmentRow({
  assignment,
  index,
  setAssignmentUpdate,
}: Props) {
  const { currentUser, token } = useAppContext();

  const [deleteSubmittedAssignment, { isSuccess, isLoading }] =
    useDeleteSubmittedAssignmentMutation();
  const deleteCourse = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this submitted assignment ?"
      )
    ) {
      await deleteSubmittedAssignment(assignment?._id);
    }
  };

  const { data: assignmentMark, refetch } = useGetAssignmentMarkByIdQuery(
    assignment?.assignmentId?._id
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted", { id: "submittedAssignment" });
    }
  }, [isSuccess]);

  const handleDownloadClick = () => {
    const downloadUrl = `${SERVER_URL}/google-drive/download/${assignment?.pdf?.id}`;
    fetch(downloadUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          console.error("Error downloading file");
        }
      })
      .then((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "downloaded_file.pdf";
          document.body.appendChild(a);
          a.click();
          // Clean up
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };
  const handleViewClick = () => {
    const downloadUrl = `${SERVER_URL}/google-drive/download/${assignment?.pdf?.id}`;
    fetch(downloadUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          console.error("Error downloading file");
        }
      })
      .then((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.target = "blank";
          // a.download = "downloaded_file.pdf";
          document.body.appendChild(a);
          a.click();
          // Clean up
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  return (
    <tr key={assignment?._id} className="hover">
      <td>{index + 1}</td>
      {currentUser?.role !== "student" && (
        <td className="capitalize">tanvir</td>
      )}
      <td>{assignment?.courseId?.courseName}</td>
      <td>
        {assignment?.moduleId?.name?.length > 20
          ? assignment?.moduleId?.name?.slice(0, 20) + "..."
          : assignment?.moduleId?.name?.length}
      </td>
      <td>{assignment?.videoId?.name}</td>
      <td className="capitalize">{assignment?.assignmentId?.name}</td>
      <td className="capitalize">
        {assignmentMark?.data ? assignmentMark?.data?.fullMark : "N/A"}
      </td>
      <td className="capitalize">
        {assignmentMark?.data ? assignmentMark?.data?.mark : "N/A"}
      </td>
      <td>
        <span className="text-violet-500 flex items-center gap-4">
          <MdDownload
            size={27}
            onClick={handleDownloadClick}
            className="cursor-pointer"
          />
          <BiDetail
            size={25}
            onClick={handleViewClick}
            className="cursor-pointer"
          />
        </span>
      </td>
      {currentUser?.role !== "student" && (
        <td>
          <div className="dropdown dropdown-left">
            <button
              tabIndex={0}
              className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded-md text-sm"
            >
              Action
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32"
            >
              <li className="my-1 text-center">
                <span
                  onClick={() => setAssignmentUpdate(assignment)}
                  className="p-1.5 text-white bg-violet-500 text-center block text-sm font-medium"
                >
                  {" "}
                  Update
                </span>
              </li>
              <li className="my-1">
                <span
                  onClick={() => deleteCourse()}
                  className="bg-red-500 p-1.5 text-white text-center block text-sm font-medium"
                >
                  Delete
                </span>
              </li>
            </ul>
          </div>
        </td>
      )}
    </tr>
  );
}

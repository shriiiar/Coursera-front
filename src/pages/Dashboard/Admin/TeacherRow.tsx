import React from "react";
import { BsEye } from "react-icons/bs";

type Props = {
  teacher: any;
  index: number;
  setSelectedCourse: any;
  setEditTeacherData: any;
  setDeleteTeacherId: any;
};

export default function TeacherRow({
  teacher,
  index,
  setSelectedCourse,
  setEditTeacherData,
  setDeleteTeacherId,
}: Props) {
  return (
    <tr key={teacher?._id} className="hover">
      <th>{index}</th>
      <td className="capitalize">{teacher?.name}</td>
      <td>{teacher?.email}</td>
      <td>{teacher?.phone}</td>
      <td>{teacher?.specialist}</td>
      {teacher?.courses?.length > 0 ? (
        <td>
          <span
            onClick={() => setSelectedCourse(teacher?.courses)}
            className="text-violet-500"
          >
            <BsEye size={25} className="cursor-pointer" />
          </span>
        </td>
      ) : (
        <td>N/A</td>
      )}
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
                onClick={() => setEditTeacherData(teacher)}
                className="p-1.5 text-white bg-violet-500 text-center block text-sm font-medium"
              >
                {" "}
                Edit
              </span>
            </li>
            <li className="my-1">
              <span
                onClick={() => setDeleteTeacherId(teacher._id)}
                className="bg-red-500 p-1.5 text-white text-center block text-sm font-medium"
              >
                Delete
              </span>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}

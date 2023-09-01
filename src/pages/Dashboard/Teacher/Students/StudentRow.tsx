import React from "react";
import { BiTrashAlt, BiVolumeMute } from "react-icons/bi";
import { BsCreditCard, BsEye, BsSend } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {
  student: any;
  setPasswordChangeModalOpen: any;
  ind: number;
  setEmailChangeModalOpen: any;
};

const StudentRow = ({
  student,
  ind,
  setPasswordChangeModalOpen,
  setEmailChangeModalOpen,
}: Props) => {
  return (
    <tr>
      <td>{ind + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="">
            <div className=" w-12 h-12 grid place-items-center border bg-gray-50 text-xl font-bold">
              <span>{student?.name.at(0)}</span>
            </div>
          </div>
          <div>
            <div className="font-bold">{student?.name}</div>
            <div className="text-sm opacity-50">{student?.email}</div>
          </div>
        </div>
      </td>
      <td>{student?.studentId}</td>
      <td>{student?.batch}</td>
      <td>{student?.section}</td>
      <td className="text-center">
        <div className="badge badge-ghost text-center">
          {student?.courses?.length}
        </div>
      </td>
      <td>
        Course Progress <span className="badge badge-ghost">70%</span>
        <br />
        <progress
          className="progress progress-primary w-56"
          value="70"
          max="100"
        ></progress>
      </td>
      <td>
        <div className="flex items-center gap-1">
          <Link
            to={`/teacher/dashboard/students/${student?._id}`}
            data-tip="View"
            className="btn btn-primary btn-outline btn-sm btn-circle tooltip grid place-items-center tooltip-primary"
          >
            <BsEye />
          </Link>
        </div>
      </td>
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
            className="dropdown-content z-[1] menu p-2 shadow bg-slate-200 rounded-box w-44"
          >
            <li className="my-1 text-center">
              <span
                onClick={() => setEmailChangeModalOpen(student.email)}
                className="p-1.5 text-white bg-violet-500 text-center block text-sm font-medium"
              >
                Email Change
              </span>
            </li>
            <li className="my-1">
              <span
                onClick={() => setPasswordChangeModalOpen(student._id)}
                className="bg-violet-500 p-1.5 text-white text-center block text-sm font-medium"
              >
                Password Change
              </span>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;

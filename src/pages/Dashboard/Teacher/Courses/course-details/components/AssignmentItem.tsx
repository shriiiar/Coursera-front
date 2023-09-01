import React, { useEffect, useState } from "react";
import { BiDetail, BiEditAlt, BiTrash, BiVideo } from "react-icons/bi";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  useGetAssignmentByIdQuery,
  useUpdateAssignmentMutation,
} from "../../../../../../features/coursesSlice/teacherApi";

import { google } from "googleapis";
import { useDownloadFileQuery } from "../../../../../../features/coursesSlice/googleDriveApi";
import { SERVER_URL } from "../../../../../../config/config";
import { useAppContext } from "../../../../../../context/AppContext";
import { MdDownload } from "react-icons/md";

type Props = {
  item: any;
  ind: any;
  serial: any;
};

const AssignmentItem = ({ item, ind, serial }: Props) => {
  const { handleSubmit, register, reset, watch } = useForm();
  const { token } = useAppContext();
  const { data: assignment } = useGetAssignmentByIdQuery(item);

  const [updateVideo, { isLoading, error, data }] =
    useUpdateAssignmentMutation();

  const handleAssignmentUpdate = handleSubmit(async (data) => {
    // const newData={...data,courseId: course._id}
    // await data(data);
    reset();
    updateVideo({
      ...data,
      _id: item,
      pdf: { name: "tajbid", mimetype: "hoa" },
    });
    setOpenEdit(false);
  });
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [vlink, setVlink] = useState("");

  const [assignmentViewLoading, setAssignmentViewLoading] = useState(false);
  const handleDownloadClick = () => {
    setAssignmentViewLoading(true);
    const downloadUrl = `${SERVER_URL}/google-drive/download/${assignment?.assignment?.pdf?.id}`;
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
          console.log(url);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // a.target = "blank";
          a.download = "downloaded_file.pdf";
          document.body.appendChild(a);
          a.click();
          // Clean up
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      })
      .finally(() => {
        setAssignmentViewLoading(false);
      });
  };

  const handleViewClick = () => {
    setAssignmentViewLoading(true);
    const downloadUrl = `${SERVER_URL}/google-drive/download/${assignment?.assignment?.pdf?.id}`;
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
          console.log(url);
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
      })
      .finally(() => {
        setAssignmentViewLoading(false);
      });
  };

  return (
    <>
      <div
        className=" text-md font-medium w-full mt-1 bg-[#4e7adf] rounded-xl cursor-pointer"
        onClick={() => {
          setOpen(true);
          setVlink(item?.url);
        }}
      >
        <li className="flex p-3 bg-slate-2000  cursor-pointer  rounded-sm">
          <h1 className="text-white">
            Assignment : {assignment?.assignment?.name}
          </h1>
        </li>
      </div>

      {open && (
        <div className="fixed z-10 inset-0   ">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="bg-white rounded-lg p-10 shadow-xl transform transition-all sm:w-full sm:max-w-lg relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="absolute top-3 right-3 flex gap-5">
                <span
                  title="Download Task"
                  onClick={handleDownloadClick}
                  className="bg-violet-400 hover:bg-violet-600 h-7 w-7 flex items-center justify-center p-1 rounded-full text-white cursor-pointer"
                >
                  <MdDownload size={30} />
                </span>
                <span
                  title="View Task"
                  onClick={handleViewClick}
                  className="bg-violet-400 hover:bg-violet-600 h-7 w-7 flex items-center justify-center p-1 rounded-full text-white cursor-pointer"
                >
                  <BiDetail size={25} />
                </span>
              </div>
              <div className="overflow-hidden ">
                <h1 className="text-lg font-medium capitalize">
                  {" "}
                  {assignment?.assignment?.name}
                </h1>
                <p className="my-3">{assignment?.assignment?.description}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setOpen(false);
                    setOpenEdit(true);
                  }}
                  type="button"
                  className="bg-gradient-to-tr from-violet-500 to-blue-500 text-white px-6 py-2 rounded-md font-medium mx-2 w-24"
                >
                  Update
                </button>
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="bg-slate-600 text-white px-6 py-2 rounded-md font-medium w-24 ml-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openEdit && (
        <div className="fixed z-10 inset-0  ">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="bg-white rounded-lg  shadow-xl transform transition-all sm:w-full sm:max-w-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white overflow-hidden pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleAssignmentUpdate}>
                  {" "}
                  <div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Assignment Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        {...register("name", { required: true })}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Assignment Description.
                        </span>
                      </label>
                      <textarea
                        className="textarea h-24 textarea-bordered"
                        {...register("description", { required: true })}
                      ></textarea>
                    </div>

                    <div className="form-control mt-3">
                      <button className="btn btn-primary">update</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setOpenEdit(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentItem;

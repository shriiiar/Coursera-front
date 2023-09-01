import React, { useState } from "react";
import { BiEditAlt, BiTrash, BiVideo } from "react-icons/bi";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import AssignmentItem from "./AssignmentItem";
import { useUpdateVideosByIdMutation } from "../../../../../../features/coursesSlice/teacherApi";
import QuizItem from "./QuizItem";

type Props = {
  item: any;
  ind: any;
  serial: any;
};

const VideoItem = ({ item, ind, serial }: Props) => {
  const { handleSubmit, register, reset } = useForm();

  const [updateVideo, { isLoading, error, data }] =
    useUpdateVideosByIdMutation();

  const handleUpdateVideo = handleSubmit(async (data) => {
    const d = { ...data, _id: item?._id };
    await updateVideo({ ...data, _id: item?._id });
    reset();
    setOpenEdit(false);
  });

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [vlink, setVlink] = useState("");

  return (
    <>
      <div
        className=" text-md font-medium bg-white rounded-xl cursor-pointer flex flex-col items-start gap-1"
        onClick={() => {
          setOpen(true), setVlink(item?.url);
        }}
      >
        <li className="flex items-center justify-between p-3  cursor-pointer  rounded-sm">
          <div>
            <div className="flex items-center gap-1">
              <BiVideo />
              {item?.name}
            </div>
            <small className="duration">{item?.duration}</small>
          </div>
        </li>
      </div>
      <div>
        {item?.quizzes?.length > 0 && (
          <QuizItem serial={serial} quizItems={item?.quizzes} />
        )}
      </div>

      {item?.assignments?.length > 0 && (
        <div
          tabIndex={serial}
          className="collapse collapse-plus rounded-2xl bg-slate-400 mt-2"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-md font-medium text-white bg-blue-500">
            Assignments
          </div>
          <div className="collapse-content text-sm bg-blue-300">
            <div className="flex flex-col lg:flex-row justify-center lg:gap-6 gap-2 mt-3">
              {item?.assignments?.map((ite: any, ind: number, key: any) => (
                <AssignmentItem
                  key={ite}
                  item={ite}
                  serial={serial}
                  ind={ind}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed z-10 inset-0   ">
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
                <iframe
                  title="YouTube Video"
                  width="470"
                  height="315"
                  src={vlink}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
                <div className="flex items-center gap-4 w- cursor-pointer ">
                  <BiEditAlt
                    size={25}
                    className=""
                    onClick={() => {
                      setOpen(false);
                      setOpenEdit(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openEdit && (
        <div className="fixed z-10 inset-0     ">
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
                <form onSubmit={handleUpdateVideo}>
                  {" "}
                  <div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Videos Title</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        {...register("name", { required: true })}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Video URL</span>
                      </label>
                      <input
                        type="url"
                        className="input input-bordered"
                        {...register("url", { required: true })}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Video Description.</span>
                      </label>
                      <textarea
                        className="textarea h-24 textarea-bordered"
                        {...register("description", { required: true })}
                      ></textarea>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text"> Total Duration.</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        {...register("totalTimes", { required: true })}
                      />
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

export default VideoItem;

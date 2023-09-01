import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../../../../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";
import { useGetUsersQuery } from "../../../../features/api/userApi";
import {
  useAccessChatMutation,
  useCreateMessageMutation,
} from "../../../../features/api/chatApi";
import { toast } from "react-hot-toast";

interface Teacher {
  id: number;
  name: string;
}

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const [isConfirmationVisible, setIsConfirmationVisible] =
    useState<boolean>(false);
  const [teacherId, setTeacherId] = useState("");
  const [content, setContent] = useState("");
  const [accessChat, { data: chat, isLoading: chatLoading, isSuccess }] =
    useAccessChatMutation();
  const [createMessage, { data: newMessage, isSuccess: isMessageSuccess }] =
    useCreateMessageMutation();

  const { data, isLoading, isError } = useGetUsersQuery("teacher");
  const { data: teachersData } = data || {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmationVisible(true);
  };

  const handleConfirm = () => {
    setIsConfirmationVisible(false);
    // You can handle the submission logic here (e.g., sending the question to the teacher)
    // Reset form fields
    accessChat({ userId: teacherId });
  };

  const handleCancel = () => {
    setIsConfirmationVisible(false);
  };

  useEffect(() => {
    if (isSuccess) {
      const data = {
        content,
        chatId: chat?.data?._id,
      };
      createMessage(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isMessageSuccess) {
      toast.success("Successfully created chat");
      navigate("/student/dashboard/messages");
    }
  }, [isMessageSuccess]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center h-[calc(100vh-84px)]">
        <div className="relative overflow-hidden flex-1 md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <Link to="/" className="text-white font-bold text-6xl font-sans">
              <span className="text-black">Pro</span>Help
            </Link>
            <p className="text-white mt-1 ml-1">Feel Free To Ask</p>
            {/* <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button> */}
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>

        <div className="flex flex-1 justify-center items-center h-[calc(100vh-84px)] bg-white">
          {currentUser?.role === "student" ? (
            <div className="bg-[#F2F7FF] rounded-lg border w-full max-w-md shadow-xl shadow-slate-300 p-10 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-semibold mb-4 ">
                Submit a Question
              </h2>
              <form onSubmit={handleSubmit} className="">
                <div className="mb-4 w-[390px]">
                  <label htmlFor="teacher" className="block font-medium mb-1">
                    Select Teacher
                  </label>
                  <select
                    onChange={(e) => setTeacherId(e.target.value)}
                    required
                    id="teacher"
                    className="w-full border rounded px-3 py-2 outline-blue-500 capitalize"
                  >
                    <option selected disabled value="">
                      Default
                    </option>
                    {teachersData?.map((teacher: any) => (
                      <option
                        className=""
                        key={teacher._id}
                        value={teacher._id}
                      >
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="question" className="block font-medium mb-1">
                    Question
                  </label>
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    required
                    id="question"
                    placeholder="Write your question"
                    className="w-full border rounded px-3 py-4 resize-none outline-blue-500"
                    rows={5}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-medium py-3 rounded-full shadow-lg shadow-gray-300"
                >
                  Submit
                </button>
              </form>
              {isConfirmationVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded shadow-md w-96">
                    <p className="mb-10 font-medium">
                      Are you sure you want to submit this question?
                    </p>
                    <div className="flex justify-end items-center gap-5">
                      <button
                        className="px-4 py-2 text-white bg-violet-500 rounded hover:bg-violet-600"
                        onClick={handleConfirm}
                      >
                        Confirm
                      </button>
                      <button
                        className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="font-medium text-xl uppercase">
                <span className="text-5xl font-bold mr-3 text-violet-600">
                  Pro Help
                </span>{" "}
                only for our students
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HelpPage;

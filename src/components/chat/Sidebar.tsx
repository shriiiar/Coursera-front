import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import {
  useAccessChatMutation,
  useGetAllUsersQuery,
  useGetChatQuery,
} from "../../features/api/chatApi";
import { toast } from "react-hot-toast";
import ChatLoader from "../ChatLoader";
import { useAppContext } from "../../context/AppContext";
import { getSender } from "../../utils/ChatLogics";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleSelectChat } from "../../features/coursesSlice/chatSlice";

type Props = {};

export default function Sidebar({}: Props) {
  const { selectedChat } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const { currentUser } = useAppContext();
  const [inputText, setInputText] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const { data, isLoading } = useGetAllUsersQuery(inputText);
  const { data: allUsers } = data || {};
  const [accessChat, { data: chat, isLoading: chatLoading, isSuccess }] =
    useAccessChatMutation();
  const { data: allChat, isLoading: allChatLoading } =
    useGetChatQuery(undefined);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (!userId) {
      return;
    }
    accessChat({ userId: userId });
  }, [userId]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully accessed", { id: "accessChat" });
      setInputText("");
      setUserId("");
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(handleSelectChat(allChat?.data[0]));
  }, [allChat]);

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 relative">
        <select
          name=""
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full py-2 cursor-pointer px-2"
          id=""
        >
          <option value="">Default</option>
          {allUsers?.map((user: any, index: number) => (
            <option value={user._id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        {allChatLoading ? (
          <ChatLoader />
        ) : (
          <div>
            {allChat?.data?.map((chat: any) => (
              <div
                onClick={() => dispatch(handleSelectChat(chat))}
                key={chat._id}
                className={`my-3 bg-gradient-to-tr ${
                  selectedChat === chat
                    ? "from-blue-500 to-purple-500 text-white"
                    : "bg-white text-black"
                } p-1.5 flex items-center gap-3 rounded-md cursor-pointer`}
              >
                <div className="avatar">
                  <div className="w-10 rounded-full shadow-md shadow-gray-500">
                    <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" />
                  </div>
                </div>
                <div>
                  <p className="font-medium capitalize">
                    {getSender(currentUser, chat.users)}
                  </p>
                  <p className="text-sm ">
                    {chat?.latestMessage?.content
                      ? chat?.latestMessage?.content
                      : "..."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

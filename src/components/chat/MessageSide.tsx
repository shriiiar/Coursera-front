import React, { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useAppSelector } from "../../app/hooks";
import {
  useCreateMessageMutation,
  useGetAllMessageQuery,
} from "../../features/api/chatApi";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { useAppContext } from "../../context/AppContext";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../utils/ChatLogics";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { SERVER_URL_FOR_SOCKET } from "../../config/config";
type Props = {};
const socket = io(SERVER_URL_FOR_SOCKET);

export default function MessageSide({}: Props) {
  interface Message {
    text: any;
    createdAt: any;
    _id: any;
    sender: {
      _id: any;
    };
    content: any;
  }
  const { currentUser: user } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const { selectedChat } = useAppSelector((state) => state.chat) as {
    selectedChat: { _id: string } | null;
  };
  const { data: allMessages, refetch } = useGetAllMessageQuery(
    selectedChat ? selectedChat._id : ""
  );
  const { data } = allMessages || {};

  const [createMessage, { data: newMessage, isLoading, isSuccess }] =
    useCreateMessageMutation();
  const [value, setValue] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!value) {
      return toast.error("Type something", { id: "chat" });
    }
    if (!selectedChat) {
      return toast.error("Select a person first", { id: "chat" });
    }
    const data = {
      content: value,
      chatId: selectedChat._id,
    };
    createMessage(data);
    setValue("");
  };

  useEffect(() => {
    if (isSuccess) {
      socket.emit("new-message", newMessage?.data);
      setMessages([...messages, newMessage?.data]);
    }
  }, [isSuccess]);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  useEffect(() => {
    socket.emit("setup", user);
    socket.emit("join-chat", selectedChat?._id);
  }, [user, selectedChat]);

  useEffect(() => {
    let isMounted = true;
    const handleNewMessage = (newMessageReceived: any) => {
      if (isMounted) {
        setMessages((prevMessages: any) => [
          ...prevMessages,
          newMessageReceived,
        ]);
      }
    };
    socket.on("message-received", handleNewMessage);
    return () => {
      isMounted = false;
    };
  });

  useEffect(() => {
    refetch();
  }, [selectedChat]);

  return (
    selectedChat && (
      <div className="flex flex-col justify-end h-[100%]">
        <ScrollToBottom className="overflow-y-auto">
          {messages &&
            messages
              ?.slice()
              ?.sort((a, b) => a.createdAt - b.createdAt)
              ?.map((m, i) => (
                // <ScrollToBottom className="message-container">
                <div className="flex relative pb-5" key={m._id}>
                  {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                    <div className="avatar mr-2 flex items-center">
                      <div className="w-10 rounded-full">
                        <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`chat w-full max-w-xl ${
                      m.sender._id === user._id ? "chat-end" : "chat-start"
                    }`}
                    style={{
                      marginLeft: isSameSenderMargin(messages, m, i, user._id),
                      marginTop: isSameUser(messages, m, i) ? 3 : 10,
                    }}
                  >
                    <div
                      className={`chat-bubble text-white ${
                        m.sender._id === user._id
                          ? "bg-blue-500"
                          : "bg-violet-500"
                      }`}
                    >
                      {m.content}
                    </div>
                    <span className="text-xs mt-1 font-medium mx-4 absolute bottom-0">
                      {moment(m.createdAt).format("LLL")}
                    </span>
                  </div>
                </div>
              ))}
        </ScrollToBottom>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 mt-10 p-1">
            <input
              type="text"
              placeholder="Type message"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name="content"
              className="w-full outline-none py-2.5 px-4 rounded-md ring-1 "
            />
            <button type="submit">
              <IoSendSharp size={40} className="text-violet-700" />
            </button>
          </div>
        </form>
      </div>
    )
  );
}

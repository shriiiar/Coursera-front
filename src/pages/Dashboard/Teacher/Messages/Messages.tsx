import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/chat/Sidebar";
import MessageSide from "../../../../components/chat/MessageSide";
import { io } from "socket.io-client";
import { useAppContext } from "../../../../context/AppContext";
type Props = {};
const Messages = (props: Props) => {
  return (
    <div>
      <div className="flex gap-5 h-[calc(100vh-105px)]">
        <section className="bg-slate-200 w-full max-w-xs p-5 rounded-md  overflow-auto">
          <p className="font-semibold text-2xl">Chat</p>
          <Sidebar />
        </section>
        <section className="bg-[#F2F7FF] w-full p-5 rounded-md">
          <MessageSide />
        </section>
      </div>
    </div>
  );
};

export default Messages;

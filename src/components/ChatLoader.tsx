import React from "react";

type Props = {};

export default function ChatLoader({}: Props) {
  return (
    <div>
      <div className="bg-gradient-to-tr bg-white p-1.5 rounded-md my-3">
        <div className="flex items-center animate-pulse">
          <div className="flex-shrink-0">
            <span className="w-11 h-11 block bg-gray-400 rounded-full"></span>
          </div>

          <div className="ml-4 w-full">
            <ul className=" space-y-3">
              <li className="w-full h-3 bg-gray-400 rounded-md"></li>
              <li className="w-full h-3 bg-gray-400 rounded-md"></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-tr bg-white p-1.5 rounded-md my-3">
        <div className="flex items-center animate-pulse">
          <div className="flex-shrink-0">
            <span className="w-11 h-11 block bg-gray-400 rounded-full"></span>
          </div>

          <div className="ml-4 w-full">
            <ul className=" space-y-3">
              <li className="w-full h-3 bg-gray-400 rounded-md"></li>
              <li className="w-full h-3 bg-gray-400 rounded-md"></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-tr bg-white p-1.5 rounded-md my-3">
        <div className="flex items-center animate-pulse">
          <div className="flex-shrink-0">
            <span className="w-11 h-11 block bg-gray-400 rounded-full"></span>
          </div>

          <div className="ml-4 w-full">
            <ul className=" space-y-3">
              <li className="w-full h-3 bg-gray-400 rounded-md"></li>
              <li className="w-full h-3 bg-gray-400 rounded-md"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

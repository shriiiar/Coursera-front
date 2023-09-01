import React from "react";

type Props = {};

const ComponentLoader = (props: Props) => {
  return (
    <div>
      {/* component loader in tailwind */}
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
};

export default ComponentLoader;

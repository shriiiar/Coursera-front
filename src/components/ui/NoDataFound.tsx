import React from "react";

type Props = {
  title?: String;
};

const NoDataFound = ({ title }: Props) => {
  return (
    <div className="text-center py-10 text-xl">{title || "No Data Found."}</div>
  );
};

export default NoDataFound;

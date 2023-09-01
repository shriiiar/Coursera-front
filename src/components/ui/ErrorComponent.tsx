import React from "react";

type Props = {};

const ErrorComponent = (props: Props) => {
  return (
    <div className="text-red-400">
      Such a error in your api/code please check it could be your server,
      client, internet.
    </div>
  );
};

export default ErrorComponent;

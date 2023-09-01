import React from "react";

type Props = {};

const Settings = (props: Props) => {
  const notifications = [
    {
      id: 1,
      title: "Midterm Exam",
      content: "The midterm exam will be held on August 10th, 2023.",
    },
    {
      id: 2,
      title: "Assignment Submission",
      content:
        "The deadline for the assignment submission is August 15th, 2023.",
    },
    // Add more notifications here
  ];
  return (
    <div>
      {" "}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Student Notifications</h1>
        <div className="grid gap-4 ">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white hover:bg-slate-200 p-4 shadow rounded-lg"
            >
              <h2 className="text-lg font-semibold mb-2">
                {notification.title}
              </h2>
              <p>{notification.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;

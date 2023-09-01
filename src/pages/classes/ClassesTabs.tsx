import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
type Props = {};

const CoursesTabs = (props: Props) => {
  return (
    <div className="   w-1/2   mx-auto ">
      {" "}
      <Tabs className=" ">
        <TabList>
          <Tab>Hints</Tab>
          <Tab>Support</Tab>
        </TabList>

        <TabPanel>
          <p>1st hint!!!</p>
        </TabPanel>
        <TabPanel>
          <p>Click to get support</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};
export default CoursesTabs;

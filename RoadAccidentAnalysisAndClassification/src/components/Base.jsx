import React from "react";
import CustomNavbar from "./CustomNavbar";

const Base = ({ children }) => {
  return (
    <div className="base">
      <CustomNavbar />
      {children}
    </div>
  );
};

export default Base;

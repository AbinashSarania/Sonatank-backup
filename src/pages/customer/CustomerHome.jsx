import React from "react";
import CustomerNavbar from "./CustomerNavbar";
import JewelleryTypes from "./JewelleryTypes";

const CustomerHome = () => {
  return (
    <div className="flex flex-col h-screen">
      <CustomerNavbar />
      <div className="flex-1 overflow-y-auto">
        <JewelleryTypes />
      </div>
    </div>
  );
};

export default CustomerHome;

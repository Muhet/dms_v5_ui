import React from "react";
import Header from "../components/distHeader";
import TellerTopups from "../components/DistTopups";

const NewDash = () => {
  return (
    <div className="mt-6">
      <Header />
      <div className=""></div>
      <div className="grid grid-rows-6">
        <div className="row-span-4 mx-16  ">
          <div className="bg-white shadow-sm p-5 ">
            <TellerTopups />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDash;

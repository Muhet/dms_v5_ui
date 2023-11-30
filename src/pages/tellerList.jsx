import React from "react";
import Header from "../components/distHeader";
import DistCard from "../components/Cards/distCardSummary";
import Teller from "../components/Teller";

const NewDash = () => {
  return (
    <div className="mt-6">
      <Header />
      <div className="">
        {" "}
        <DistCard />
      </div>
      <div className="grid grid-rows-6">
        <div className="row-span-4 mx-16  ">
          <div className="bg-white shadow-sm p-5 ">
            <Teller />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDash;

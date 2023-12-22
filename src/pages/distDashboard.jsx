import React, { useState } from "react";
import Header from "../components/distHeader";
import Distributor from "../components/Distributor";
import Topup from "../components/DistTopups";

const NewDash = () => {
  const [activeTable, setActiveTable] = useState("distributors");

  return (
    <div className="">
      <Header />
      <div className="grid grid-rows-6">
        <div className="row-span-4 mx-5 mt-56">
          <div className="mx-auto">
            <div className=" bg-white pb-5 ">
              {" "}
              <div className="-mt-10 bg-white rounded-lg py-2 w-fit mb-3">
                <ul className="flex space-x-3 text-black">
                  <li className="px-20 cursor-pointer hover:text-red-500 duration-500">
                    <a
                      href="home"
                      className={`px-3 ${
                        activeTable === "distributors" ? "active" : ""
                      }`}
                      onClick={() => setActiveTable("distributors")}
                    >
                      All Teller
                    </a>
                  </li>
                  <li className="px-20 cursor-pointer hover:hover:text-red-500 duration-500">
                    <a
                      href="home"
                      className={`px-3 ${
                        activeTable === "topup" ? "active" : ""
                      }`}
                      onClick={() => setActiveTable("topup")}
                    >
                      Topup
                    </a>
                  </li>
                </ul>
              </div>
              {activeTable === "distributors" && <Distributor />}
              {activeTable === "topup" && <Topup />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDash;

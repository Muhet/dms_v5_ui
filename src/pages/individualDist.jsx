import React, { useState } from "react";
import Profile from "./../assets/images/DSM.png";
import DistNavBar from "../components/DistNavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineNavigateNext } from 'react-icons/md';
import { AiOutlineDown } from 'react-icons/ai';
import { Outlet, useNavigate } from "react-router-dom";
const Individual = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate();
  const [isDistributorsHovered, setIsDistributorsHovered] = useState(false);

  const handleDistributorsHover = () => {
    setIsDistributorsHovered(true);
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleDistributorsLeave = () => {
    setIsDistributorsHovered(false);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-1 bg-gray-800 text-white">
        <div className="grid grid-rows-9 h-screen">
          <div className="row-span-3 font-bold text-2xl pt-4 flex justify-center">
            <h2 className="">DSM</h2>
          </div>
          <div className="row-span-6 relative mt-20">
            <ul className="menu space-y-10 lg:text-lg">
              <li
                className="border-b border-transparent relative"
                onClick={() => handleTableSelect("distributors")}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:border-transparent transition duration-300 hover:text-black"
                  >
                    Distributors
                  </a>
                  {selectedTable === "distributors" && (
                    <label className="ml-2">
                      <AiOutlineDown size={15} />
                    </label>
                  )}
                  {selectedTable !== "distributors" && (
                    <label className="ml-2">
                      <MdOutlineNavigateNext />
                    </label>
                  )}
                </div>
              </li>
              <li
                className="border-b border-transparent relative"
                onClick={() => handleTableSelect("topups")}
              >
                <a
                  href="#"
                  className="block py-2 px-4 hover:border-transparent transition duration-300 hover:text-black"
                >
                  TopUps
                </a>
              </li>
              <li
                className="border-b border-transparent relative"
                onClick={() => handleTableSelect("sellers")}
              >
                <a
                  href="#"
                  className="block py-2 px-4 hover:border-transparent transition duration-300 hover:text-black"
                >
                  Sellers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-9">
        <div className="grid grid-rows-5">
          <div className="row-span-1 bg-slate-100 h-fit py-2">
            <div className="grid grid-cols-9">
              <div className="col-span-1"></div>
              <div className="col-span-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 w-full border border-gray-300 rounded-md pr-10"
                  />
                  <div className="absolute top-0 right-0 h-full flex items-center pr-3 text-gray-400">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
              </div>
              <div className="col-span-4"></div>
            </div>
          </div>
          <div className="row-span-4">
            <div className="flex justify-center items-center h-full">
              <DistNavBar/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;

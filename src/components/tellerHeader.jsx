import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "typeface-inter";
import { Drawer } from "antd";
import Table from "./Table";
import UserPopup from "./../components/userInfoPopup";
const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdownVisible2, setDropdownVisible2] = useState(false);
  const [, setDropdownVisible3] = useState(false);
  const [, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);

  const showUserPopup = () => {
    setUserPopupVisible(true);
  };

  const hideUserPopup = () => {
    setUserPopupVisible(false);
  };
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  console.log(showDrawer);

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  console.log(showModal);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log(handleCancel);
  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };
  const showDropdown2 = () => {
    setDropdownVisible2(true);
  };

  const hideDropdown2 = () => {
    setDropdownVisible2(false);
  };
  const showDropdown3 = () => {
    setDropdownVisible3(true);
  };
  console.log(showDropdown3);

  const hideDropdown3 = () => {
    setDropdownVisible3(false);
  };
  console.log(hideDropdown3);
  return (
    <div>
      <header className="flex montserrat top-0 items-center justify-between px-4 text-center  bg-gradient-to-r from-blue-800 to-blue-500 fixed w-full z-50">
        <div className="flex items-center">
          <span className="text-2xl font-bold montserrat text-white">DSM</span>
        </div>
        <div className="text-white">
          <ul className="flex gap-12 font-semibold">
            <li
              className="relative group hover:bg-blue-900 hover:text-white py-4 px-4 border-b "
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <NavLink to="/teller_dashboard">Subscriptions</NavLink>
              {isDropdownVisible && (
                <div className="absolute -ml-10  mt-3  font-light text-black w-52 bg-white items-center rounded-b-lg shadow-lg">
                  <ul>
                    <li
                      className="py-2 border-b w-fit px-4 hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white"
                      /*  onClick={showDrawer} */
                    >
                      <a href="home">Renew Subscription</a>
                    </li>
                    <li className="py-2 border-b hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white">
                      <a href="home">
                        <NavLink to="/teller_dashboard">
                          Sale Accessories
                        </NavLink>
                      </a>
                    </li>
                    <li
                      className="py-2 border-b px-4 hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white"
                      /*   onClick={showtTellerTopup} */
                    >
                      <a href="home">New Subscriber</a>
                    </li>
                    <li className="py-2 border-b px-4 hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white">
                      <a href="home">Sales Summary</a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li
              className="hover:bg-blue-900 hover:text-white duration-1000 py-4 px-4"
              onMouseEnter={showDropdown2}
              onMouseLeave={hideDropdown2}
            >
              <a href="home">Teller Sales</a>
              {isDropdownVisible2 && (
                <div className="absolute -ml-10 w-fit mt-3  font-light text-black bg-white items-center rounded-b-lg shadow-lg">
                  <ul>
                    <li className="py-2 border-b px-4 hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white">
                      <a href="home">Daily Sales Report</a>
                    </li>
                    <li className="py-2 border-b px-4 hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white">
                      <a href="home">Active Batch</a>
                    </li>
                  </ul>
                </div>
              )}
            </li>{" "}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-1.5 pl-10 pr-3 text-gray-700 bg-white bg- rounded-full focus:outline-none focus:shadow-outline focus:bg-gray-100"
            />
            <span className="absolute left-3 top-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 16l4 4m0 0l-4-4m4 4l-4-4M12 6a6 6 0 100 12 6 6 0 000-12z"
                />
              </svg>
            </span>
          </div>
          <AiFillSetting size={24} className="text-white cursor-pointer" />
          <IoIosNotifications size={24} className="text-white cursor-pointer" />
          {/* <FaUserCircle size={24} className="text-white cursor-pointer" /> */}
          <div
            className="relative group"
            onMouseEnter={showUserPopup}
            onMouseLeave={hideUserPopup}
          >
            <FaUserCircle size={24} className="text-white cursor-pointer" />
            {isUserPopupVisible && <UserPopup />}
          </div>
        </div>
      </header>
      <Drawer
        title="Create New Teller"
        placement="right"
        closable={false}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        width={400}
      >
        <Table />
      </Drawer>
    </div>
  );
};

export default Header;

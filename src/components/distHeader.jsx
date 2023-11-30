import React, { useState, useEffect } from "react";
import { login } from "../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { AiFillSetting } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "typeface-inter";
import { Drawer } from "antd"; // Import necessary Ant Design components
import { getData } from "./../utils/authToken";
import Table from "./Table";
import DistTable from "./distTable";

import UserPopup from "./../components/userInfoPopup";
import WebSettings from "./../components/SettingPopup";
const Header = () => {
  const dispatch = useDispatch();
  const [setIsModalVisible] = useState(false);
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLoading] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDrawerDisVisible, setIsDrawerDisVisible] = useState(false);
  const [isDrawerMegaVisible, setIsDrawerMegaVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const [isWebSettingsVisible, setIsWebSettingsVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const userData = getData().data?.menu_list;

  const showUserPopup = () => {
    setUserPopupVisible(true);
  };

  const hideUserPopup = () => {
    setUserPopupVisible(false);
  };
  const showWebSettings = () => {
    setIsWebSettingsVisible(true);
  };

  const hideWebSettings = () => {
    setIsWebSettingsVisible(false);
  };
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setIsDrawerDisVisible(false);
    setIsDrawerMegaVisible(false);
  };
  const showDrawerDis = () => {
    setIsDrawerDisVisible(true);
  };
  const showDrawerMega = () => {
    setIsDrawerMegaVisible(true);
  };

  const authState = useSelector((state) => state.user);
  console.log("Auth State >>>", authState);

  useEffect(() => {
    dispatch(login({ user_name, password }))
      .then((response) => {
        setUser_name("");
        setPassword("");
        setIsLoading(false);
        console.log("Response from login action:", response);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setIsLoading(false);
      });
  }, [dispatch, user_name, password]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  console.log(toggleDarkMode);
  const showModal = () => {
    setIsModalVisible(true);
  };
  console.log(showModal);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log(handleCancel);

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div>
      <header className="flex montserrat top-0 items-center shadow-sm bg-white justify-between px-4 fixed w-full z-50">
        <div className="flex items-center">
          <span className="text-2xl font-bold montserrat text-blue-500">
            DSM
          </span>
        </div>

        <div className="text-white">
          {userData && Array.isArray(userData) && (
            <ul className="flex gap-16 font-semibold">
              {userData.map((parentOption, index) => (
                <li
                  key={index}
                  className="relative group hover:bg-gray-100 hover:text-white py-4 px-10 border-b"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to={
                      parentOption.menu_title === "Teller Management"
                        ? "/dist_dashboard"
                        : "#"
                    }
                  >
                    {parentOption.menu_title}
                  </NavLink>

                  {activeDropdown === index && parentOption.children && (
                    <div className="absolute -ml-10  mt-4 font-light text-black w-96 bg-white items-center rounded-b-lg shadow-lg">
                      <ul className="flex">
                        {parentOption.children
                          .filter(
                            (childOption) => childOption.on_menu === "yes"
                          )
                          .map((childOption, childIndex) => (
                            <li
                              key={childIndex}
                              className=" py-2 border-b px-4 hover:bg-gray-50  hover:text-black text-sm"
                            >
                              <NavLink
                                to={childOption.load_page}
                                onClick={
                                  childOption.menu_title === "new Teller"
                                    ? showDrawer
                                    : childOption.menu_title ===
                                      "New Distributor"
                                    ? showDrawerDis
                                    : childOption.menu_title ===
                                      "New Super Dealer"
                                    ? showDrawerMega
                                    : undefined
                                }
                              >
                                {childOption.menu_title}
                              </NavLink>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-1.5 pl-10 pr-3 text-blue-500 bg-white border border-blue-500 border-opacity-60 rounded-full focus:outline-none focus:shadow-outline focus:bg-gray-100"
            />
            <span className="absolute left-3 top-2 text-blue-500">
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
          <div
            className="relative group"
            onMouseEnter={showWebSettings}
            onMouseLeave={hideWebSettings}
          >
            <AiFillSetting size={24} className="text-blue-500 cursor-pointer" />
            {isWebSettingsVisible && <WebSettings />}
          </div>

          <IoIosNotifications
            size={24}
            className="text-blue-500 cursor-pointer"
          />

          <div
            className="relative group"
            onMouseEnter={showUserPopup}
            onMouseLeave={hideUserPopup}
          >
            <FaUserCircle size={24} className="text-blue-500 cursor-pointer" />
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
      <Drawer
        title="Create New Distributor"
        placement="right"
        closable={false}
        onClose={closeDrawer}
        visible={isDrawerDisVisible}
        width={400}
      >
        <DistTable />
      </Drawer>
      <Drawer
        title="Create Mega Dealer"
        placement="right"
        closable={false}
        onClose={closeDrawer}
        visible={isDrawerMegaVisible}
        width={400}
      >
        <DistTable />
      </Drawer>
    </div>
  );
};

export default Header;

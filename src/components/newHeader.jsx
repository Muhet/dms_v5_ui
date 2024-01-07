import React, { useState, useRef, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Profile from "./../assets/images/icons/profile.png";
import { getToken, deleteToken } from "./../utils/authToken";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosLogIn } from "react-icons/io";
import { LiaUserEditSolid } from "react-icons/lia";
import jwtDecode from "jwt-decode";
const Newheader = () => {
  const token = getToken();
  const decode = jwtDecode(token);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);
  const handleArrowClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleLogout = () => {
    deleteToken();
    window.location.href = "/";
  };

  return (
    <div className="fixed bg-white bg-opacity-40 rounded-lg top-2 right-0 bg-custom-blue px-4 py-2">
      <div className="flex justify-between font-poppins ">
        <div className="flex">
          <div className="mt-2">
            <IoIosNotificationsOutline
              className="text-custom-gray "
              size={35}
            />
          </div>
          <div className="mx-2">
            <img
              src={Profile}
              alt=""
              className="border border-custom-white rounded-full w-fit"
            />
          </div>
          <div>
            <label className="text-md"> {decode.full_name}</label>
            <br />
            <span className="text-custom-gray text-sm">
              jane.uwineza@dsm.rw
            </span>
          </div>
          <div className="mx-4 mt-2 text-custom-gray">
            <MdOutlineKeyboardArrowDown
              size={25}
              className="cursor-pointer"
              onClick={handleArrowClick}
            />
            {isModalVisible && (
              <div
                ref={modalRef}
                className="modal-container absolute text-xs duration-700"
              >
                <form className="bg-custom-white rounded-md shadow-md w-max p-4 -ml-24 mt-4">
                  <div className="flex flex-col">
                    <span className="flex cursor-pointer  hover:bg-custom-gray hover:bg-opacity-20 px-4 py-2 rounded-md">
                      <label className="mr-2 cursor-pointer">
                        <LiaUserEditSolid className="text-xl cursor-pointer" />
                      </label>
                      <label className="mt-1 cursor-pointer">
                        Edit profile
                      </label>
                    </span>
                    <span className="flex cursor-pointer  hover:bg-custom-gray hover:bg-opacity-20 px-4 py-2 rounded-md">
                      <label className="mr-2 cursor-pointer">
                        <CiSettings className="text-xl cursor-pointer" />
                      </label>
                      <label className="mt-1 cursor-pointer">Settings</label>
                    </span>
                    <span
                      className="flex cursor-pointer font-semibold text-custom-yellow hover:bg-custom-gray hover:bg-opacity-20 px-4 py-2 rounded-md"
                      onClick={handleLogout}
                    >
                      <label
                        className="mr-2 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <IoIosLogIn
                          className="text-xl cursor-pointer"
                          onClick={handleLogout}
                        />
                      </label>
                      <label
                        className="mt-1 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </label>
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Newheader;

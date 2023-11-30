import React from "react";
import { getToken, deleteToken } from "./../utils/authToken";

import jwtDecode from "jwt-decode";
const UserPopup = () => {
  const token = getToken();
  const decode = jwtDecode(token);
  const handleLogout = () => {
    deleteToken();
    window.location.href = "/";
  };

  return (
    <div className="w-48 bg-white shadow-lg rounded-lg absolute right-0 rounded-b-lg">
      <div className="mb-4 text-sm font-semibold ml-5 pt-2">
        {decode.full_name}
      </div>
      <div className="flex rounded-t-lg rounded-b-lg justify-center py-2 cursor-pointer hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white duration-1000">
        <label
          className="text-lg font-bold cursor-pointer "
          onClick={handleLogout}
        >
          Logout
        </label>
      </div>
    </div>
  );
};

export default UserPopup;

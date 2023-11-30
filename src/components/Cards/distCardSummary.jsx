/* import React, { useState, useEffect } from "react";
import { getToken } from "../../utils/authToken";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

const token = getToken();
const decode = jwtDecode(token);
console.log("UserInformation", decode);

const HeaderCard = () => {
  const { tellers } = useSelector((state) => state.tellers);
  const userTellers = tellers.filter(
    (teller) => teller.distributor_id === decode.user_id
  );

  console.log("TellerId", userTellers);
  return (
    <div>
      <div className="p-4 lg:mt-20 mx-11 mb-16">
        <div className=" flex gap-4">
          <div className="w-full bg-white col-span-1 rounded-lg px-4 pt-4 shadow-md  opacity-90">
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="col-span-1">
                <div className="flex justify-between">
                  <label className="space-x-4">
                    <span className="text-gray-500">Distributor name:</span>
                    <span className="text-sm">{decode.full_name}</span>
                  </label>

                  <br />
                  <hr className="mb-4 text-black" />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex justify-between">
                  <label className="space-x-4">
                    <span className="text-gray-500">Distributor ID:</span>
                    <span className="text-sm">{decode.user_id}</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex justify-between">
                  <label className="space-x-4">
                    <span className="text-gray-500">Account Status:</span>
                    <span className="text-sm">{decode.account_status}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="col-span-1">
                <div className="flex justify-between">
                  <label className="space-x-4">
                    <span className="text-gray-500">Tellers:</span>
                    <span className="text-sm">{userTellers.length}</span>
                  </label>

                  <br />
                  <hr className="mb-4 text-black" />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex justify-between">
                  <label className="space-x-4">
                    <span className="text-gray-500">Distributor name:</span>
                    <span className="text-sm">Distributor name:</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard; */

import React, { useState, useEffect } from "react";

import { NavLink, useParams } from "react-router-dom";
import {
  getDistributor
} from "../redux/reducer/distributorSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Drawer, Button, Modal, Popover, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Table = () => {
  const params = useParams();
  const memberLink = Number(params.distributorId);
  const {distbydistId, loading} = useSelector((state) => state.distributors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBillPay(memberLink));
  }, [dispatch, memberLink]);

  const imageMap = {
    gwizaWallet: GwizaWallet,
    mtnMomo: MtnMomo,
    airtel: AirtelRed,
    visa: Visa,
    masterCard: MasterCard,
    wasac: Wasac,
    reg: Reg,
    dstv: DSTV,
  };
  const getImageSource = (imageName) => {
    return imageMap[imageName] || GwizaWallet;
  };
  console.log("Bill payment:", billPay);
  return (
    <div className="w-full">
      <div className="container mx-auto flex justify-between">
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <button
            className="py-1 px-6 bg-green-400 rounded-md hover:bg-green-700 duration-500"
            onClick={showModal}
          >
            Add
          </button>
        </div>
      </div>
      <div className="container mx-auto flex flex-col shadow-md pb-5 rounded-md">
        {loading ? (
          <div className="text-center">
            <Spin size="large" />
          </div>
        ) : (
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-y-auto h-96">
                <div className="table-header">
                  <table className="min-w-full text-left text-sm font-light border">
                    <thead className="border-b font-medium dark:border-neutral-500 bg-slate-100">
                      <tr>
                        <th scope="col" className="px-1 py-4">
                          ID
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Company Name
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Dist. Full Name
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Email Address
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Phone Number
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Available Bal.
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Status
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="table-body">
                  <table className="min-w-full text-left text-sm font-light border">
                    <tbody>
                      {distributors.map((distributor, index) => (
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.distributor_id}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.dist_company_name}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.dist_full_name}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.email_address}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.telephone_number}
                          </td>

                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.distributor_available_balance}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.distributor_status}
                          </td>

                          <td className="whitespace-nowrap px-1 py-2">
                            <Popover
                              content={
                                <div className="space-x-2">
                                  <label
                                    className="cursor-pointer  hover:text-blue-400"
                                    onClick={() => showDetailModal(distributor)}
                                  >
                                    View
                                  </label>
                                  <label
                                    className="cursor-pointer px-3 hover:text-green-400"
                                    onClick={() =>
                                      openUpdateDrawer(
                                        distributor?.distributor_id
                                      )
                                    }
                                  >
                                    Update
                                  </label>
                                  <label
                                    className="cursor-pointer px-3 hover:text-green-400"
                                  
                                  >
                                   <NavLink to={`/dashboard/${distributor?.distributor_id}`}>More</NavLink>
                                  </label>
                                </div>
                              }
                              trigger="click"
                            >
                              <BiDotsHorizontalRounded />
                            </Popover>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-center mt-5">
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={pageSize}
          total={distributor.length}
          current={page}
          showQuickJumper
          onShowSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 30, 50, 100]}
        />
      </div>
     
    </div>
  );
};

export default Table;

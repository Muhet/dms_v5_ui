import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Pagination, Drawer, Button, Modal, Popover } from "antd";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getDistributors,
  getProvinces,
  getDistrict,
  getSector,
  getCell,
  getDistProvince,
  addDistributor,
  updateDistributor,
  updateTopup,
  addTopup,
} from "../../redux/reducer/distributorSlice";
import { getToken } from "../../utils/authToken";
import jwtDecode from "jwt-decode";
const distributorTable = ({ setSearchTerm }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [destributorData, setdestributorData] = useState({});
  const {
    distributors,
    distributor,
    provinces,
    distProvince,
    district,
    sector,
    cell,
  } = useSelector((state) => state.distributors);
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  useEffect(() => {
    dispatch(getDistributors(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);
  const userDistributors = distributors.filter(
    (distributor) => distributor.last_update_by === decode.user_id
  );

  return (
    <div className="">
      <div className="flex justify-between">
        <label className="font-normal">All Distributors</label>
        <button
          className="text-xs bg-custom-light-blue font-light
         text-custom-white px-2 rounded-md "
        >
          New Distributor
        </button>
      </div>
      <div className="bg-custom-white w-full p-5 my-5 rounded-md">
        <div className="flex items-center border rounded-md mb-4 pb-2 w-[20%] px-2">
          <FaSearch className="text-gray-500 mr-2 mt-1" />
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none text-gray-800 pt-1"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <table className="min-w-full text-left text-xs text-custom-light-gray font-Poppins">
            <thead className="-top-2 border-b">
              <tr className="">
                <th scope="col" className="px-1 py-4">
                  ID
                </th>

                <th scope="col" className="px-1 py-4">
                  Company name
                </th>
                <th scope="col" className="px-1 py-4">
                  Distributor Full Name
                </th>
                <th scope="col" className="px-1 py-4">
                  Email Address
                </th>
                <th scope="col" className="px-1 py-4">
                  Phone Number
                </th>
                <th scope="col" className="px-1 py-4">
                  Available Bal.
                </th>
                <th scope="col" className="px-1 py-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {distributors.map((distributor) => (
                <tr className="border-b dark:border-neutral-100 text-black font-extralight text-xs">
                  <td className="whitespace-nowrap px-1 py-4">
                    {distributor.distributor_id}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    {distributor.dist_company_name}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    {distributor.dist_full_name}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    {distributor.email_address}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    {distributor.telephone_number}
                  </td>

                  <td className="whitespace-nowrap px-1 py-4">
                    {distributor.distributor_available_balance}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    {" "}
                    <label
                      className={`rounded-f py-1  rounded-full ${
                        distributor.distributor_status === "active"
                          ? "text-custom-green bg-custom-light-green  px-4"
                          : distributor.distributor_status === "inactive"
                          ? "bg-custom-light-orange text-custom-orange px-6"
                          : ""
                      }`}
                    >
                      {distributor.distributor_status}
                    </label>
                  </td>

                  <td className="whitespace-nowrap px-1 py-4">
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
                              openUpdateDrawer(distributor?.distributor_id)
                            }
                          >
                            Update
                          </label>
                          <label
                            className="cursor-pointer px-3 hover:text-green-400"
                            onClick={() =>
                              openTopupDrawer(distributor?.distributor_id)
                            }
                          >
                            Topup
                          </label>
                        </div>
                      }
                      trigger="click"
                    >
                      <BiDotsHorizontalRounded className="text-custom-gra" />
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default distributorTable;

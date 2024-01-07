import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { CiWallet } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popover, Drawer } from "antd";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDistributorTopUps,
  addTopup,
  getDistByDistId,
  approveDistributor,
} from "../../redux/reducer/distributorSlice";
import { getToken } from "../../utils/authToken";
import jwtDecode from "jwt-decode";
const DistributorTable = ({ setSearchTerm }) => {
  const dispatch = useDispatch();
  const [currentPage] = useState(1);
  const [pageSize] = useState(5);
  const params = useParams();
  const memberLink = Number(params.distributorId);
  const [, updatedData] = useState({});
  const [, setPartnerIdFilled] = useState(true);
  const [formData, setFormData] = useState({});
  const [isApproveDrawerVisible, setIsApproveDrawerVisible] = useState(false);
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const [, setIsModalVisible] = useState(false);
  const [showNewDistributorForm, setShowNewDistributorForm] = useState(false);
  const [selectedDistributorForEdit] = useState({});
  const { DistTopup, distributor, distributors, distbydistId } = useSelector(
    (state) => state.distributors
  );
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  let selectedDistributors = null;
  useEffect(() => {
    dispatch(getDistributorTopUps(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handleNewDistributorClick = () => {
    setShowNewDistributorForm(true);
  };

  useEffect(() => {
    if (updatedData[0]) {
      setFormData(updatedData[0]);
    }
  }, [distributor, updatedData]);
  useEffect(() => {
    dispatch(getDistByDistId(memberLink));
  }, [dispatch, memberLink]);

  const handleOnChange = (key, value) => {
    setFormData((e) => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  const handleCancel = () => {
    setIsApproveDrawerVisible(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
      distributor_id: decode.user_id,
      created_by: decode.user_id,
    };
    dispatch(addTopup(combinedData));
    setTimeout(() => {
      setShowNewDistributorForm(false);
    }, 5000);
  };
  const showModal = (pdt_id) => {
    setSelectedDistributorId(pdt_id);
    const foundDistributor = DistTopup.find(
      (distrib) => distrib.request_id === pdt_id
    );
    console.log("Request ID,", pdt_id);

    if (foundDistributor) {
      selectedDistributors = { ...foundDistributor };
      delete selectedDistributors.request_id;
      delete selectedDistributors.approved_at;
      delete selectedDistributors.approved_by;
      delete selectedDistributors.created_at;
      delete selectedDistributors.date_of_purchase;
      delete selectedDistributors.last_update_to;
      delete selectedDistributors.last_updated_at;
      delete selectedDistributors.last_updated_by;
    }

    setIsApproveDrawerVisible(true);
    setFormData({ ...selectedDistributors });
  };

  const handleTopUpDistributor = (pdt_id) => {
    setSelectedDistributorId(pdt_id);
    const foundDistributor = distributors.find(
      (distrib) => distrib.distributor_id === pdt_id
    );

    if (foundDistributor) {
      selectedDistributors = { ...foundDistributor };
      delete selectedDistributors.distributor_id;
      delete selectedDistributors.distributor_status;
      delete selectedDistributors.dist_full_name;
      delete selectedDistributors.email_address;
      delete selectedDistributors.distributor_type;
      delete selectedDistributors.telephone_number;
      delete selectedDistributors.dist_company_name;
      delete selectedDistributors.village_id;
      delete selectedDistributors.cheque_no;
      delete selectedDistributors.distributor_account_balance;
      delete selectedDistributors.distributor_available_balance;
      delete selectedDistributors.last_update_at;
      delete selectedDistributors.last_update_by;
      delete selectedDistributors.last_update_to;
    }

    setIsModalVisible(true);
    setFormData({ ...selectedDistributors });
  };

  const handleNewDistributorCancel = () => {
    setShowNewDistributorForm(false);
  };

  const handleDistApprove = (e) => {
    e.preventDefault();
    const {
      amount_paid,
      distributor_id,
      created_by,
      drawers_bank,
      cheque_no,
      mode_of_payment,
      ...filteredData
    } = formData;
    const combinedData = {
      ...filteredData,
      approved_by: decode.user_id,
    };

    console.log("Data to be dispatched", combinedData);
    dispatch(
      approveDistributor({
        updatedData: combinedData,
        request_id: selectedDistributorId,
      })
    );
  };

  return (
    <div className="text-xs">
      <div className="flex justify-between">
        <label className="font-normal">All Requests</label>
        <button
          className="text-xs bg-custom-light-blue font-light
         text-custom-white px-4 py-3 rounded-md "
          onClick={handleNewDistributorClick}
        >
          Add New Request
        </button>
      </div>
      {isApproveDrawerVisible && (
        <Drawer
          title="Approve Top Up Request"
          placement="right"
          closable={true}
          onClose={handleCancel}
          open={isApproveDrawerVisible}
          width={450}
        >
          <form className="space-y-6" action="#" method="PUT">
            <ToastContainer position="top-right" autoClose={5000} />

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="request_status"
                  className="block text-xs font-medium leading-6 text-gray-900"
                >
                  Request Status
                </label>
              </div>
              <div className="mt-1">
                <br />
                <select
                  type="text"
                  value={formData?.request_status}
                  onChange={(e) =>
                    handleOnChange("request_status", e.target.value)
                  }
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select----</option>
                  <option value="approved">Appoved</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleDistApprove}
                >
                  {selectedDistributorForEdit.distributor_id
                    ? "Update"
                    : "Register"}
                </button>
              </div>
            </div>
          </form>
        </Drawer>
      )}
      {showNewDistributorForm && (
        <div>
          <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="grid grid-cols-3 text-custom-gray gap-6">
              <div className="col-span-1">
                <label>Amount Paid</label>
                <br />
                <input
                  type="text"
                  value={formData.amount_paid}
                  onChange={(e) =>
                    handleOnChange("amount_paid", e.target.value)
                  }
                  required
                  placeholder="E.g: 500000"
                  className="block w-full outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Payment Mode</label>
                <br />
                <input
                  type="text"
                  value={formData.mode_of_payment}
                  onChange={(e) =>
                    handleOnChange("mode_of_payment", e.target.value)
                  }
                  required
                  placeholder="E.g: Bank"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Drawers Bank</label>
                <br />
                <input
                  type="text"
                  value={formData.drawers_bank}
                  onChange={(e) =>
                    handleOnChange("drawers_bank", e.target.value)
                  }
                  required
                  placeholder="E.g: 404"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 text-custom-gray gap-6">
              <div className="col-span-1">
                <label>Cheque Number</label>
                <br />
                <input
                  type="text"
                  value={formData.cheque_no}
                  onChange={(e) => handleOnChange("cheque_no", e.target.value)}
                  required
                  placeholder="E.g: 4576 **** **** ****"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1">
                <div className="flex justify-between">
                  <div></div>
                  <div className="space-x-5 flex mt-3">
                    <button
                      type="button"
                      className="text-custom-red mt-4"
                      onClick={handleNewDistributorCancel}
                    >
                      cancel
                    </button>
                    <button
                      type="button"
                      className="bg-custom-light-blue text-custom-white px-2 py-2 mt-4 rounded-md"
                      onClick={handleSubmit}
                    >
                      Add Requet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="bg-custom-white w-full p-5 my-5 rounded-md">
        <div className="flex items-center border rounded-md mb-4 pb-2 w-[20%] px-2">
          <FaSearch className="text-gray-500 mr-2 mt-1.5" />
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none text-gray-800 pt-1.5"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <div className="overflow-y-auto h-96">
            <table className="min-w-full text-left text-xs text-custom-light-gray font-Poppins">
              <thead className="-top-2 border-b">
                <tr className="">
                  <th scope="col" className="px-1 py-4">
                    Request ID
                  </th>

                  <th scope="col" className="px-1 py-4">
                    Purchase Date
                  </th>
                  <th scope="col" className="px-1 py-4">
                    Drawers Bank
                  </th>
                  <th scope="col" className="px-1 py-4">
                    Cheque No
                  </th>
                  <th scope="col" className="px-1 py-4">
                    Payment Mode
                  </th>
                  <th scope="col" className="px-1 py-4">
                    Amount Paid
                  </th>
                  <th scope="col" className="px-1 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {distbydistId.map((topup) => (
                  <tr className="border-b dark:border-neutral-100 text-black font-extralight text-xs">
                    <td className="whitespace-nowrap px-1 py-4">
                      {topup.request_id}
                    </td>
                    <td className="whitespace-nowrap px-1 py-4">
                      {topup.date_of_purchase}
                    </td>
                    <td className="whitespace-nowrap px-1 py-4">
                      {topup.drawers_bank}
                    </td>
                    <td className="whitespace-nowrap px-1 py-4">
                      {topup.cheque_no}
                    </td>
                    <td className="whitespace-nowrap px-1 py-4">
                      {topup.mode_of_payment}
                    </td>

                    <td className="whitespace-nowrap px-1 py-4">
                      {topup.amount_paid}
                    </td>
                    <td className="whitespace-nowrap px-1 py-4">
                      {" "}
                      <label
                        className={`rounded-f py-1  rounded-full ${
                          topup.request_status === "approved"
                            ? "text-custom-green bg-custom-light-green  px-4"
                            : topup.request_status === "rejected"
                            ? "bg-custom-red text-white px-6"
                            : topup.request_status === "pending"
                            ? "bg-custom-light-orange text-custom-orange px-6"
                            : ""
                        }`}
                      >
                        {topup.request_status}
                      </label>
                    </td>
                    <td className="whitespace-nowrap px-1 py-4">
                      <Popover
                        content={
                          <div className="text-xs">
                            {decode.access_level === "3" ? (
                              <>
                                <span className="flex">
                                  <label className="mt-1">
                                    <CiWallet />
                                  </label>
                                  <label
                                    className="cursor-pointer px-3 hover:text-custom-light-blue"
                                    onClick={() => showModal(topup?.request_id)}
                                  >
                                    Approve Topup
                                  </label>
                                </span>{" "}
                                <span className="flex">
                                  <label className="mt-1">
                                    <CiWallet />
                                  </label>
                                  <label
                                    className="cursor-pointer px-3 hover:text-custom-light-blue"
                                    onClick={() =>
                                      handleNewDistributorClick(
                                        distributor?.distributor_id
                                      )
                                    }
                                  >
                                    Top up Acc.
                                  </label>
                                </span>
                              </>
                            ) : null}
                            <hr className="mb-1 mt-2 -mx-2" />
                            <span className="flex text-custom-red">
                              <label className="-mr-2">
                                <MdOutlineDeleteSweep size={20} />
                              </label>
                              <label
                                className="cursor-pointer px-3 hover:text-green-400 "
                                onClick={() =>
                                  openTopupDrawer(distributor?.distributor_id)
                                }
                              >
                                Remove User
                              </label>
                            </span>
                          </div>
                        }
                        trigger="click"
                      >
                        <BiDotsVerticalRounded className="text-custom-gray cursor-pointer" />
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
  );
};
export default DistributorTable;

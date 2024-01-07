import React, { useState, useEffect } from "react";
import {
  getDistributorTopUps,
  getDistributors,
  addTopup,
  updateTopup,
  approveDistributor,
} from "../redux/reducer/distributorSlice";

import { useDispatch, useSelector } from "react-redux";
import { Pagination, Drawer, Button, Modal, Popover, Spin } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { getToken } from "../utils/authToken";
import jwtDecode from "jwt-decode";
import { MdOutlinePersonAddAlt } from "react-icons/md";
const Table = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  const [formData, setFormData] = useState({});
  const { DistTopup, distributor, loading } = useSelector(
    (state) => state.distributors
  );
  const [, setPartnerIdFilled] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [, updatedData] = useState({});
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState({});
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);
  const [isApproveDrawerVisible, setIsApproveDrawerVisible] = useState(false);
  const [selectedDistributorForEdit, setSelectedDistributorForEdit] = useState(
    {}
  );
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);

  let selectedDistributors = null;
  const openUpdateDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);

    const foundDistributor = DistTopup.find(
      (distrib) => distrib.request_id === pdt_id
    );

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

    setIsUpdateDrawerVisible(true);
    setFormData({ ...selectedDistributors });
  };
  const openApproveDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);

    const foundDistributor = DistTopup.find(
      (distrib) => distrib.request_id === pdt_id
    );

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
  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
  const closeApproveDrawer = () => {
    setIsApproveDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
  console.log(closeApproveDrawer);

  const handleUpdate = () => {
    dispatch(
      updateTopup({
        distributorId: selectedDistributorId,
        updatedData: formData,
      })
    );
  };
  const handleApprove = (e) => {
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
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };
  const filteredDistTopup = DistTopup.filter((distributor) => {
    if (filterStatus === "") {
      return true;
    } else {
      // Filter by request_status
      return distributor.request_status === filterStatus;
    }
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showDetailModal = (distributor) => {
    setSelectedDistributor(distributor);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
  };

  useEffect(() => {
    if (updatedData[0]) {
      setFormData(updatedData[0]);
    }
  }, [distributor, updatedData]);
  const handleOnChange = (key, value) => {
    setFormData((e) => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  useEffect(() => {
    dispatch(getDistributorTopUps(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);
  useEffect(() => {
    dispatch(getDistributors(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
      distributor_id: decode.user_id,
      created_by: decode.user_id,
    };
    dispatch(addTopup(combinedData));
  };
  const tellerTopById = filteredDistTopup.filter(
    (topups) => topups.created_by === decode.user_id
  );
  console.log("This is Data", filteredDistTopup);
  console.log(decode.user_id, "This is user ID");
  return (
    <div className="w-full">
      <div className=" flex justify-between">
        <div className="flex space-x-2 mx-10 bg-transparent font-sans text-sky-600 font-semibold">
          <label className="mt-2">Request Filter:</label>
          <select onChange={handleFilterChange} value={filterStatus}>
            <option value="">All</option>
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        <div className=" relative -mt-14 mr-8">
          <button
            className="py-1 text-white font-bold px-3 mt-1 bg-blue-800 rounded-md hover:bg-blue-400 duration-500"
            onClick={showModal}
          >
            <MdOutlinePersonAddAlt size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col pb-5 rounded-md">
        {loading ? (
          <div className="text-center">
            <Spin size="large" />
          </div>
        ) : (
          <div className="">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-y-auto">
                <div className="table-container max-h-[500px] ">
                  <table className="min-w-full text-left text-xs border bg-white">
                    <thead className="sticky -top-2 border-b dark:border-neutral-100 bg-blue-400 ">
                      <tr className="text-white text-center w-full">
                        <th scope="col" className="px-1 py-4">
                          Request Id
                        </th>
                        <th scope="col" className="px-1 py-4">
                          Purchase Date
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Drawers Bank
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Chaque No
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Payment mode
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Amount paid
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Request Status
                        </th>
                        <th scope="col" className="px-1 py-2 text-left">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="font-sans text-gray-600 text-center">
                      {tellerTopById.length > 0 ? (
                        tellerTopById.map((distributor, index) => (
                          <tr className="border-b dark:border-neutral-100">
                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.request_id}
                            </td>
                            <td className="whitespace-nowrap px-1 py-2">
                              {new Date(
                                distributor.date_of_purchase
                              ).toLocaleString()}
                            </td>

                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.drawers_bank}
                            </td>
                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.cheque_no}
                            </td>

                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.mode_of_payment}
                            </td>
                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.amount_paid}
                            </td>
                            <td className="whitespace-nowrap px-1 py-2">
                              <label
                                className={`rounded-f py-1  rounded-full ${
                                  distributor.request_status === "pending"
                                    ? "text-yellow-500"
                                    : distributor.request_status === "cancelled"
                                    ? "text-red-500"
                                    : distributor.request_status === "approved"
                                    ? "text-green-500"
                                    : ""
                                }`}
                              >
                                {distributor?.request_status}
                              </label>
                            </td>

                            <td className="whitespace-nowrap px-1 py-2">
                              <Popover
                                content={
                                  <div className="space-x-2">
                                    <label
                                      className="cursor-pointer  hover:text-blue-400"
                                      onClick={() =>
                                        showDetailModal(distributor)
                                      }
                                    >
                                      View
                                    </label>
                                    <label
                                      className="cursor-pointer px-3 hover:text-green-400"
                                      onClick={() =>
                                        openUpdateDrawer(
                                          distributor?.request_id
                                        )
                                      }
                                    >
                                      Update
                                    </label>
                                    {/*   {distributors?.distributor_type ===
                                      "mega_dealer" && ( */}
                                    <label
                                      className="cursor-pointer px-3 hover:text-green-400"
                                      onClick={() =>
                                        openApproveDrawer(
                                          distributor?.request_id
                                        )
                                      }
                                    >
                                      Approve
                                    </label>
                                  </div>
                                }
                                trigger="click"
                              >
                                <label className="mx-auto">
                                  <BiDotsHorizontalRounded />
                                </label>
                              </Popover>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="flex justify-center text-red-500 font-semibold">
                          <td colSpan="8">No records found</td>
                        </tr>
                      )}
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
          total={DistTopup.length}
          current={page}
          showQuickJumper
          onShowSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 30, 50, 100]}
        />
      </div>
      <Modal
        title="Topup Details"
        visible={isDetailModalVisible}
        onOk={handleDetailModalCancel}
        onCancel={handleDetailModalCancel}
        footer={[
          <Button key="back" onClick={handleDetailModalCancel}>
            Close
          </Button>,
        ]}
      >
        <div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Distributor ID</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.distributor_id}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Purchase Date</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.date_of_purchase}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Request Id</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.request_id}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Payment Mode</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.mode_of_payment}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Drawers Bank</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.drawers_bank}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">cheque Number</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.cheque_no}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">created By</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.created_by}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Created At</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.created_at}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Approved By</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.approved_by}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Approved At</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.approved_at}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Last Update To</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.last_update_to}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Last Update By</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.last_updated_by}
            </label>
          </div>

          <div className="grid grid-cols-3">
            <label className="col-span-1">Last Update At</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.last_updated_at}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Request Status</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.request_status}
            </label>
          </div>
        </div>
      </Modal>
      <Drawer
        title="Add Request Topup"
        placement="right"
        closable={true}
        onClose={handleCancel}
        visible={isModalVisible}
        width={450}
      >
        <form className="space-y-6" action="#" method="POST">
          <ToastContainer position="top-right" autoClose={5000} />
          {/*   <div>
            <label className="block text-xs font-medium leading-6 text-gray-900">
              Distributor Id
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={formData.distributor_id}
                onChange={(e) =>
                  handleOnChange("distributor_id", e.target.value)
                }
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div> */}
          <div>
            <label
              htmlFor="amount_paid"
              className="block text-xs font-medium leading-6 text-gray-900"
            >
              Amount paid
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={formData.amount_paid}
                onChange={(e) => handleOnChange("amount_paid", e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium leading-6 text-gray-900">
              Payment Mode
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={formData.mode_of_payment}
                onChange={(e) =>
                  handleOnChange("mode_of_payment", e.target.value)
                }
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium leading-6 text-gray-900">
              Drawers Bank
            </label>
            <div className="mt-1">
              <input
                value={formData.drawers_bank}
                onChange={(e) => handleOnChange("drawers_bank", e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium leading-6 text-gray-900">
                Checque Number
              </label>
            </div>
            <div className="mt-1">
              <input
                value={formData.cheque_no}
                onChange={(e) => handleOnChange("cheque_no", e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </Drawer>
      {isApproveDrawerVisible && (
        <Drawer
          title="Approve Top Up Request"
          placement="right"
          closable={true}
          onClose={handleCancel}
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
                  <option value="cancelled">concelled</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleApprove}
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
      <Drawer
        title="Add Request Topup"
        placement="right"
        closable={true}
        onClose={handleCancel}
        visible={isModalVisible}
        width={450}
      >
        <form className="space-y-6" action="#" method="POST">
          <ToastContainer position="top-right" autoClose={5000} />

          <div>
            <label
              htmlFor="amount_paid"
              className="block text-xs font-medium leading-6 text-gray-900"
            >
              Amount paid
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={formData.amount_paid}
                onChange={(e) => handleOnChange("amount_paid", e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium leading-6 text-gray-900">
              Payment Mode
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={formData.mode_of_payment}
                onChange={(e) =>
                  handleOnChange("mode_of_payment", e.target.value)
                }
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium leading-6 text-gray-900">
              Drawers Bank
            </label>
            <div className="mt-1">
              <input
                value={formData.drawers_bank}
                onChange={(e) => handleOnChange("drawers_bank", e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium leading-6 text-gray-900">
                Checque Number
              </label>
            </div>
            <div className="mt-1">
              <input
                value={formData.cheque_no}
                onChange={(e) => handleOnChange("cheque_no", e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </Drawer>
      {isUpdateDrawerVisible && (
        <Drawer
          title="Update Distributor Topup"
          placement="right"
          closable={true}
          onClose={closeUpdateDrawer}
          visible={isUpdateDrawerVisible}
          width={450}
        >
          <form className="space-y-6" action="#" method="PUT">
            <ToastContainer position="top-right" autoClose={5000} />

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  Amount Paid
                </label>
              </div>
              <div className="mt-1">
                <input
                  value={formData.amount_paid}
                  onChange={(e) =>
                    handleOnChange("amount_paid", e.target.value)
                  }
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  Payment Mode
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.mode_of_payment}
                  onChange={(e) =>
                    handleOnChange("mode_of_payment", e.target.value)
                  }
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  Drawers Bank
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.drawers_bank}
                  onChange={(e) =>
                    handleOnChange("drawers_bank", e.target.value)
                  }
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="cheque_no"
                  className="block text-xs font-medium leading-6 text-gray-900"
                >
                  Cheque Number
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.cheque_no}
                  onChange={(e) => handleOnChange("cheque_no", e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>

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
                  <option value="pending">pending</option>
                  <option value="cancelled">concelled</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleUpdate}
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
    </div>
  );
};

export default Table;

import React, { useState, useEffect } from "react";
import { getToken } from "./../utils/authToken";
import jwtDecode from "jwt-decode";
import { NavLink } from "react-router-dom";
import {
  getTellers,
  addTeller,
  updateTeller,
} from "../redux/reducer/tellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Drawer, Button, Modal, Popover, Spin } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Table = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [setFilteredDistributors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const { tellers, teller, loading } = useSelector((state) => state.tellers);
  const [, setPartnerIdFilled] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [updatedData] = useState({});
  const [, setTableHeight] = useState("");
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState({});
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);
  const [selectedDistributorForEdit, setSelectedDistributorForEdit] = useState(
    {}
  );
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);

  let selectedDistributors = null;

  const openUpdateDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);
    console.log("TellerId", tellers);
    const foundDistributor = tellers.find(
      (distrib) => distrib.teller_id === pdt_id
    );

    console.log("foundDistributor::", pdt_id);
    if (foundDistributor) {
      selectedDistributors = { ...foundDistributor };
      delete selectedDistributors.teller_id;
      delete selectedDistributors.teller_account_balance;
      delete selectedDistributors.teller_available_balance;
      delete selectedDistributors.last_updated_at;
      delete selectedDistributors.last_update_to;
      delete selectedDistributors.last_updated_by;
    } else {
      // Handle the case where no distributor is found
    }

    setIsUpdateDrawerVisible(true);
    setFormData({ ...selectedDistributors, created_by: decode.user_id });
  };

  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
  const handleUpdate = (e) => {
    dispatch(
      updateTeller({
        created_by: decode.user_id,
        tellerId: selectedDistributorId,
        updatedData: formData,
      })
    )
      .then(() => {
        // If the request is successful, close the update drawer
        setIsUpdateDrawerVisible(false);
        setSelectedDistributorForEdit({});
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

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
  }, [teller, updatedData]);
  const handleOnChange = (key, value) => {
    setFormData(() => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  useEffect(() => {
    dispatch(getTellers(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    console.log("Search Value:", searchValue);
    setSearchTerm(searchValue);

    const filtered = tellers.filter((distributor) =>
      distributor.dist_company_name
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    setFilteredDistributors(filtered);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
      created_by: decode.user_id,
      distributor_id: decode.user_id,
    };
    try {
      dispatch(addTeller(combinedData));
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const token = getToken();
  const decode = jwtDecode(token);
  const userTellers = tellers.filter(
    (teller) => teller.distributor_id === decode.user_id
  );

  useEffect(() => {
    const calculatedHeight = `${Math.min(userTellers.length * 50, 200)}px`;
    setTableHeight(calculatedHeight);
  }, [userTellers, setTableHeight]);

  return (
    <div className="max-w-full">
      <div className="flex justify-between mx-16">
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
            className="py-1 px-6 bg-cyan-500 text-white rounded-md hover:bg-green-700 duration-500"
            onClick={showModal}
          >
            Add
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
                <div className={`table-container`}>
                  <table className="min-w-full text-left text-xs font-light border bg-white">
                    <thead className="sticky -top-2 border-b dark:border-neutral-100 bg-slate-100">
                      <tr>
                        <th scope="col" className="px-1 py-4">
                          - ID
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Full Name
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Phone Number
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Email Address
                        </th>
                        <th scope="col" className="px-1 py-2">
                          Acc. Balance
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
                    <tbody>
                      {userTellers.map((distributor) => (
                        <tr className="border-b dark:border-neutral-100">
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.teller_id}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.full_name}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.telephone_number}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.email_address}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.teller_account_balance}
                          </td>

                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.teller_available_balance}
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            {distributor.teller_status}
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
                                      openUpdateDrawer(distributor?.teller_id)
                                    }
                                  >
                                    Update
                                  </label>
                                  <label className="cursor-pointer px-3 hover:text-green-400">
                                    <label className="cursor-pointer px-3 hover:text-green-400">
                                      <NavLink
                                        to={`/distributors/bydist/${distributor?.distributor_id}`}
                                      >
                                        More
                                      </NavLink>
                                    </label>
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
          total={userTellers.length}
          current={page}
          showQuickJumper
          onShowSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 30, 50, 100]}
        />
      </div>
      <Modal
        title="Teller Details"
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
            <label className="col-span-1">Teller ID</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.teller_id}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Distributor ID</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.distributor_id}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Full Name</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.full_name}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Phone Number</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.telephone_number}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Email Address</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.email_address}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Account Balance</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.teller_account_balance}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Available Balance</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.teller_available_balance}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Last Update</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.last_updated_at}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Updated By</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.last_updated_by}
            </label>
          </div>
          <div className="grid grid-cols-3">
            <label className="col-span-1">Distributor Status</label>
            <label className="col-span-1">:</label>
            <label className="col-span-1">
              {selectedDistributor.teller_status}
            </label>
          </div>
        </div>
      </Modal>
      <Drawer
        title="Add New Teller"
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
              htmlFor="user_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={formData.user_name}
                onChange={(e) => handleOnChange("user_name", e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => handleOnChange("full_name", e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                value={formData.telephone_number}
                onChange={(e) =>
                  handleOnChange("telephone_number", e.target.value)
                }
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email Address
              </label>
            </div>
            <div className="mt-1">
              <input
                value={formData.email_address}
                onChange={(e) =>
                  handleOnChange("email_address", e.target.value)
                }
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </Drawer>
      {isUpdateDrawerVisible && (
        <Drawer
          title="Update teller"
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
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  User Name
                </label>
              </div>
              <div className="mt-1">
                <input
                  value={formData.user_name}
                  onChange={(e) => handleOnChange("user_name", e.target.value)}
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleOnChange("full_name", e.target.value)}
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.telephone_number}
                  onChange={(e) =>
                    handleOnChange("telephone_number", e.target.value)
                  }
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email_address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.email_address}
                  onChange={(e) =>
                    handleOnChange("email_address", e.target.value)
                  }
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="teller_status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Teller Status
                </label>
              </div>
              <div className="mt-1">
                <br />
                <select
                  type="text"
                  value={formData?.teller_status}
                  onChange={(e) =>
                    handleOnChange("teller_status", e.target.value)
                  }
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">---Select----</option>
                  <option value="Active">active</option>
                  <option value="Inactive">inactive</option>
                </select>
              </div>
            </div>

            <div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleUpdate}
                >
                  {selectedDistributorForEdit.distributor_id
                    ? "Register"
                    : "Update"}
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

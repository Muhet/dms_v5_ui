import React, { useState, useEffect } from "react";
import {
  getTellers,
  topupTeller,
  updateTeller,
} from "../redux/reducer/tellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Drawer, Button, Modal, Popover, Spin } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { getToken } from "./../utils/authToken";
import jwtDecode from "jwt-decode";
const Table = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({});
  const { tellers, loading, teller } = useSelector((state) => state.tellers);
  const [, setPartnerIdFilled] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [updatedData] = useState({});
  const token = getToken();
  const decode = jwtDecode(token);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState({});
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);
  const [isTellerTopupVisible, setIsTellerTopupVisible] = useState(false);
  const [selectedDistributorForEdit, setSelectedDistributorForEdit] = useState(
    {}
  );
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const [selectedDTellerId, setSelectedTellerId] = useState(null);
  let selectedDistributors = null;
  let selectedTellers = null;

  const closeTellerTopup = () => {
    setIsTellerTopupVisible(false);
  };

  const openTellerDrower = (tlr_id) => {
    setSelectedTellerId(tlr_id);
    const foundTeller = tellers.find((distrib) => distrib.teller_id === tlr_id);
    if (foundTeller) {
      selectedTellers = { ...foundTeller };
      delete selectedTellers.teller_id;
      delete selectedTellers.teller_account_balance;
      delete selectedTellers.teller_available_balance;
      delete selectedTellers.last_updated_at;
      delete selectedTellers.last_update_to;
      delete selectedTellers.last_updated_by;
      delete selectedTellers.distributor_id;
      delete selectedTellers.teller_status;
      delete selectedTellers.full_name;
      delete selectedTellers.telephone_number;
      delete selectedTellers.email_address;
    } else {
    }
    setIsTellerTopupVisible(true);
    setFormData({ ...selectedTellers });
  };

  const openUpdateDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);

    const foundDistributor = tellers.find(
      (distrib) => distrib.teller_id === pdt_id
    );

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
    setFormData({ ...selectedDistributors });
  };

  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
  const handleUpdate = () => {
    formData.created_by = decode.user_id;
    dispatch(
      updateTeller(
        {
          tellerId: selectedDistributorId,
          updatedData: formData,
        },
        [teller, loading]
      )
    );
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
    setFormData((e) => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  useEffect(() => {
    dispatch(getTellers(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
      created_by: decode.user_id,
      teller_id: selectedDTellerId,
    };

    dispatch(topupTeller(combinedData));
  };
  const userTellers = tellers.filter(
    (teller) => teller.distributor_id === decode.user_id
  );

  return (
    <div className="mx-auto">
      <div className="flex justify-between mx-16"></div>
      <div className="flex flex-col pb-5 rounded-md">
        {loading ? (
          <div className="text-center">
            <Spin size="large" />
          </div>
        ) : (
          <div className="-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-y-auto border border-gray-100 rounded-md">
                <div className="table-container max-h-[500px] ">
                  <table className="min-w-full text-left text-xs bg-white">
                    <thead className="sticky -top-2 border-b dark:border-neutral-100 bg-slate-50">
                      <tr className=" text-center">
                        <th scope="col" className="px-1 py-4">
                          #
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
                        <tr
                          className="border-b font-semibold opacity-70 dark:border-neutral-100 text-center cursor-pointer hover:bg-slate-100"
                          key={distributor.teller_id}
                        >
                          <td className="whitespace-nowrap px-1 py-2">
                            <a
                              href={`/individualPage/${distributor.teller_id}`}
                            >
                              {distributor.teller_id}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            <a
                              href={`/individualPage/${distributor.teller_id}`}
                            >
                              {distributor.full_name}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            <a
                              href={`/individualPage/${distributor.teller_id}`}
                            >
                              {distributor.telephone_number}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            <a
                              href={`/individualPage/${distributor.teller_id}`}
                            >
                              {distributor.email_address}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            <a
                              href={`/individualPage/${distributor.teller_id}`}
                            >
                              {distributor.teller_available_balance}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-1 py-2">
                            <a
                              href={`/individualPage/${distributor.teller_id}`}
                            >
                              <label
                                className={`rounded-f py-1  rounded-full ${
                                  distributor?.teller_status === "active"
                                    ? "text-blue-600 uppercase px-6"
                                    : distributor?.teller_status === "inactive"
                                    ? "text-red-500 uppercase px-6"
                                    : ""
                                }`}
                              >
                                {distributor.teller_status}
                              </label>
                            </a>
                          </td>

                          <td className="whitespace-nowrap flex justify-center">
                            <Popover
                              content={
                                <div className="space-x-2">
                                  <label
                                    className="cursor-pointer rounded-xl px-3 py-1 hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white"
                                    onClick={() => showDetailModal(distributor)}
                                  >
                                    View
                                  </label>
                                  <label
                                    className="cursor-pointer rounded-xl px-3 py-1 hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white"
                                    onClick={() =>
                                      openUpdateDrawer(distributor?.teller_id)
                                    }
                                  >
                                    Update
                                  </label>
                                  <label
                                    className="cursor-pointer rounded-xl px-3 py-1 hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white"
                                    onClick={() =>
                                      openTellerDrower(distributor?.teller_id)
                                    }
                                  >
                                    Topup
                                  </label>
                                </div>
                              }
                              trigger="click"
                            >
                              <label className="cursor-pointer text-center">
                                <BiDotsHorizontalRounded className="text-center" />
                              </label>
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
          <hr className="mb-4" />
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
            <label
              className={
                selectedDistributor.teller_status === "inactive"
                  ? "col-span-1 text-red-500 uppercase"
                  : "col-span-1 text-green-500 uppercase"
              }
            >
              {selectedDistributor.teller_status}
            </label>
          </div>
        </div>
      </Modal>
      <Drawer
        title="Topup Teller"
        placement="right"
        closable={false}
        onClose={closeTellerTopup}
        visible={isTellerTopupVisible}
        width={400}
      >
        <form className="space-y-6" action="#" method="POST">
          <ToastContainer position="top-right" autoClose={5000} />
          <div>
            <label
              htmlFor="teller_id"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Teller ID
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={selectedDTellerId}
                onChange={(e) => handleOnChange("teller_id", e.target.value)}
                readOnly
                className="block w-full rounded-md border-0 px-4 py-1.5 bg-slate-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Topup Amount
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={formData.topup_amount}
                onChange={(e) => handleOnChange("topup_amount", e.target.value)}
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
              Top Up
            </button>
          </div>
        </form>
      </Drawer>
      {isUpdateDrawerVisible && (
        <Drawer
          title="Update Teller"
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
                  className="block w-full rounded-md border-0 px-4 py-1.5
                   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                     focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center
                   rounded-md bg-green-400 px-3 py-1.5
                    text-sm font-semibold 
                    leading-6 text-white 
                    shadow-sm hover:bg-indigo-500 
                    focus-visible:outline
                     focus-visible:outline-2
                      focus-visible:outline-offset-2 
                      focus-visible:outline-indigo-600"
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

import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Header from "../components/distHeader";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "../components/Cards/headerCard";
import {
  getDistByDistId,
  addDistributor,
  updateDistributor,
} from "../redux/reducer/distributorSlice";
import { Pagination, Drawer, Button, Modal, Popover, Spin } from "antd";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserSummaryPage = () => {
  const params = useParams();
  const memberLink = Number(params.distributorId);
  const dispatch = useDispatch();
  const [, setPartnerIdFilled] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState({});
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);
  const [selectedDistributorForEdit, setSelectedDistributorForEdit] = useState(
    {}
  );
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const { distbydistId, distributor, loading } = useSelector(
    (state) => state.distributors
  );
  const memberProfile = distributor.find(
    (uniqueMember) => uniqueMember.distributor_id === memberLink
  );
  const showModal = () => {
    setIsModalVisible(true);
  };
  console.log(showModal);

  let selectedDistributors = null;
  const openUpdateDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);

    const foundDistributor = distbydistId.find(
      (distrib) => distrib.request_id === pdt_id
    );
    if (foundDistributor) {
      selectedDistributors = { ...foundDistributor };
      delete selectedDistributors.distributor_id;
      delete selectedDistributors.dist_company_name;
      delete selectedDistributors.dist_full_name;
      delete selectedDistributors.distributor_account_balance;
      delete selectedDistributors.distributor_available_balance;
      delete selectedDistributors.last_update_at;
    }

    setIsUpdateDrawerVisible(true);
    setFormData({ ...selectedDistributors });
  };

  const handleOnChange = (key, value) => {
    setFormData((e) => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
  const showDetailModal = (distributor) => {
    setSelectedDistributor(distributor);
    setIsDetailModalVisible(true);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Dispatched Data:", formData);
    dispatch(
      updateDistributor({
        distributorId: selectedDistributorId,
        updatedData: formData,
      })
    );
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
    };
    dispatch(addDistributor(combinedData));
  };
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  useEffect(() => {
    dispatch(getDistByDistId(memberLink));
  }, [dispatch, memberLink]);

  return (
    <div className="grid grid-rows-3">
      <Header />
      <div className="container mx-auto -mt-56">
        <div className="relative -mt-3">
          {" "}
          <HeaderCard />
        </div>
        <div className="row-span-2">
          {loading ? (
            <Spin size="large" tip="Loading..." />
          ) : (
            <div className="bg-white mx-5 rounded-md shadow-sm">
              <div className="mx-5">
                <label>Distributor Id:</label>
                <label className="mx-2">{memberProfile?.distributor_id}</label>
              </div>
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-y-auto h-96">
                  <div className="table-container max-h-[500px] font-sans">
                    <table className="min-w-full text-left text-xs border bg-white">
                      <thead className="sticky -top-1 text-gray-700 border-b dark:border-neutral-50 bg-slate-100">
                        <tr>
                          <th scope="col" className="px-1 py-4">
                            Request Id
                          </th>
                          <th scope="col" className="px-1 py-2">
                            Purchase Date
                          </th>
                          <th scope="col" className="px-1 py-2">
                            Payment Mode
                          </th>
                          <th scope="col" className="px-1 py-2">
                            Amount Paid
                          </th>
                          <th scope="col" className="px-1 py-2">
                            Request Status
                          </th>

                          <th scope="col" className="px-1 py-2">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {distbydistId.map((distributor) => (
                          <tr className="border-b dark:border-neutral-100">
                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.request_id}
                            </td>
                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.date_of_purchase}
                            </td>
                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.mode_of_payment}
                            </td>
                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.amount_paid}
                            </td>
                            <td className="whitespace-nowrap px-1 py-2">
                              {distributor.request_status}
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
                                    <label className="cursor-pointer px-3 hover:text-green-400">
                                      <NavLink
                                        to={`/dashboard/${distributor?.request_id}`}
                                      >
                                        More
                                      </NavLink>
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
            total={distbydistId.length}
            current={page}
            showQuickJumper
            onShowSizeChange={handlePageSizeChange}
            pageSizeOptions={[5, 10, 20, 30, 50, 100]}
          />
        </div>
        <Modal
          title="Distributor Details"
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
              <label className="col-span-1">Distributor Name</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.dist_full_name}
              </label>
            </div>
            <div className="grid grid-cols-3">
              <label className="col-span-1">Company Name</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.dist_company_name}
              </label>
            </div>
            <div className="grid grid-cols-3">
              <label className="col-span-1">TIN Number</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.dist_tin_no}
              </label>
            </div>
            <div className="grid grid-cols-3">
              <label className="col-span-1">Vilage ID</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.village_id}
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
              <label className="col-span-1">Phone Number</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.telephone_number}
              </label>
            </div>
            <div className="grid grid-cols-3">
              <label className="col-span-1">Address</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.address}
              </label>
            </div>
            <div className="grid grid-cols-3">
              <label className="col-span-1">Account Balance</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.distributor_account_balance}
              </label>
            </div>
            <div className="grid grid-cols-3">
              <label className="col-span-1">Available Balance</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.distributor_available_balance}
              </label>
            </div>
            <div className="grid grid-cols-3">
              <label className="col-span-1">Distributor Status</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.distributor_status}
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
              <label className="col-span-1">Updated To</label>
              <label className="col-span-1">:</label>
              <label className="col-span-1">
                {selectedDistributor.last_updated_to}
              </label>
            </div>
          </div>
        </Modal>
        <Drawer
          title="Add New Distributor"
          placement="right"
          closable={true}
          onClose={handleCancel}
          visible={isModalVisible}
          width={450}
        >
          <form className="space-y-6" action="#" method="POST">
            <ToastContainer position="top-right" autoClose={5000} />
            <div>
              <label className="block text-xs font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="user_name"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.user_name}
                  onChange={(e) => handleOnChange("user_name", e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium leading-6 text-gray-900">
                Company Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.dist_company_name}
                  onChange={(e) =>
                    handleOnChange("dist_company_name", e.target.value)
                  }
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium leading-6 text-gray-900">
                TIN Number
              </label>
              <div className="mt-1">
                <input
                  value={formData.dist_tin_no}
                  onChange={(e) =>
                    handleOnChange("dist_tin_no", e.target.value)
                  }
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  Village ID
                </label>
              </div>
              <div className="mt-1">
                <input
                  value={formData.village_id}
                  onChange={(e) => handleOnChange("village_id", e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  E-mail Address
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
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
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
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="address"
                  className="block text-xs font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleOnChange("address", e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="last_updated_by"
                  className="block text-xs font-medium leading-6 text-gray-900"
                >
                  Last Update By
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  value={formData.last_updated_by}
                  onChange={(e) =>
                    handleOnChange("last_updated_by", e.target.value)
                  }
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
            title="Update Distributor"
            placement="right"
            closable={true}
            onClose={closeUpdateDrawer}
            visible={isUpdateDrawerVisible}
            width={450}
          >
            <form className="space-y-6" action="#" method="PUT">
              <ToastContainer position="top-right" autoClose={5000} />

              <div>
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  TIN Number
                </label>
                <div className="mt-1">
                  <input
                    value={formData.dist_tin_no}
                    onChange={(e) =>
                      handleOnChange("dist_tin_no", e.target.value)
                    }
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium leading-6 text-gray-900">
                    Village ID
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    value={formData.village_id}
                    onChange={(e) =>
                      handleOnChange("village_id", e.target.value)
                    }
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium leading-6 text-gray-900">
                    E-mail Address
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
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium leading-6 text-gray-900">
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
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="address"
                    className="block text-xs font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleOnChange("address", e.target.value)}
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="address"
                    className="block text-xs font-medium leading-6 text-gray-900"
                  >
                    Status
                  </label>
                </div>
                <div className="mt-1">
                  <br />
                  <select
                    type="text"
                    value={formData?.distributor_status}
                    onChange={(e) =>
                      handleOnChange("distributor_status", e.target.value)
                    }
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">---Select----</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="address"
                    className="block text-xs font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleOnChange("address", e.target.value)}
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="last_updated_by"
                    className="block text-xs font-medium leading-6 text-gray-900"
                  >
                    Last Update By
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.last_updated_by}
                    onChange={(e) =>
                      handleOnChange("last_updated_by", e.target.value)
                    }
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
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
    </div>
  );
};

export default UserSummaryPage;

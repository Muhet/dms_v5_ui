import React, { useState, useEffect } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import Header from "../components/distHeader";
import {
  getDistributors,
  getProvinces,
  getDistrict,
  getSector,
  getCell,
  getDistProvince,
  addDistributor,
  updateDistributor,
} from "../redux/reducer/distributorSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Drawer, Button, Modal, Popover } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { getToken } from "../utils/authToken";
import jwtDecode from "jwt-decode";
const Table = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const {
    distributors,
    distributor,
    provinces,
    distProvince,
    district,
    sector,
    cell,
  } = useSelector((state) => state.distributors);

  const [, setPartnerIdFilled] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [updatedData] = useState({});
  const [setSelectedProvinceId] = useState("");
  const [setSelectedDistrictId] = useState("");
  const [setSelectedSectorId] = useState("");
  const [setSelectedCellId] = useState("");
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState({});
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);
  const [setIsTopupDrawerVisible] = useState(false);
  const [selectedDistributorForEdit, setSelectedDistributorForEdit] = useState(
    {}
  );
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const handleProvinceChange = (provinceId) => {
    setSelectedProvinceId(provinceId);
    dispatch(getDistProvince({ province_id: provinceId }));

    handleOnChange("province", provinceId);
  };
  const handleDistrictChange = (districtId) => {
    setSelectedDistrictId(districtId);
    dispatch(getDistrict({ sector_id: districtId }));

    handleOnChange("district", districtId);
  };
  const handleSectorChange = (sectorId) => {
    setSelectedDistrictId(sectorId);
    dispatch(getSector({ sector_id: sectorId }));

    handleOnChange("sector", sectorId);
  };
  const handleCellChange = (cellId) => {
    setSelectedCellId(cellId);
    dispatch(getCell({ cell_id: cellId }));

    handleOnChange("cell", cellId);
  };
  let selectedDistributors = null;
  const openUpdateDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);

    const foundDistributor = distributors.find(
      (distrib) => distrib.distributor_id === pdt_id
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
  const openTopupDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);

    const foundDistributor = distributors.find(
      (distrib) => distrib.distributor_id === pdt_id
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

    setIsTopupDrawerVisible(true);
    setFormData({ ...selectedDistributors });
  };

  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const {
      cell,
      district,
      province,
      sector,
      last_update_by,
      last_update_to,
      distributor_type,

      ...filteredData
    } = formData;
    const combinedData = {
      ...filteredData,
      last_updated_by: decode.user_id,
    };

    console.log("Dispatched Data", combinedData);
    dispatch(
      updateDistributor({
        distributorId: selectedDistributorId,
        updatedData: combinedData,
      })
    );
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
  }, [distributor, updatedData]);
  const handleOnChange = (key, value) => {
    setFormData((e) => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  useEffect(() => {
    dispatch(getDistributors(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    dispatch(getProvinces(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  console.log("Provinces", distProvince);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { cell, district, province, sector, ...filteredData } = formData;
    const combinedData = {
      ...filteredData,
      user_id: decode.user_id,
    };

    console.log("Dispatched Data", combinedData);

    dispatch(addDistributor(combinedData));
  };
  const userDistributors = distributors.filter(
    (distributor) => distributor.last_update_by === decode.user_id
  );
  console.log("GET :: Distributor>>>> ID", distributor.distributor_id);
  console.log("GET ::User ID >>>", distributors.distributor_id);
  console.log("GET :: Distributor>>>>", distributors);
  console.log("GET :: Single Distributor>>>>", userDistributors);
  return (
    <div className="">
      <Header />
      <div className="max-w-full mx-auto ">
        <div className="flex justify-between mx-16">
          <div className="mt-3 pt-44">
            <label className="font-sans text-sky-600 font-semibold">
              All Distributors
            </label>
          </div>
          <div className="">
            <button
              className="py-1 text-white font-bold px-3 mt-1 bg-blue-800 rounded-md hover:bg-blue-400 duration-500"
              onClick={showModal}
            >
              <MdOutlinePersonAddAlt size={24} />
            </button>
          </div>
        </div>
        <div className="container mx-auto flex flex-col  pb-5 rounded-md">
          <div className="">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-y-auto h-96 ">
                <div className="table-container max-h-[500px] font-sans">
                  <table className="min-w-full text-left text-xs border bg-white ">
                    <thead className="sticky -top-1 text-gray-700 border-b dark:border-neutral-50 bg-slate-100 px-6">
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

                    <tbody className="font-sans text-gray-600">
                      {userDistributors.map((distributor, index) => (
                        <tr className="border-b dark:border-neutral-100">
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
                                    Topup
                                  </label>
                                  <label
                                    className="cursor-pointer px-3 hover:text-green-400"
                                    onClick={() =>
                                      openTopupDrawer(
                                        distributor?.distributor_id
                                      )
                                    }
                                  >
                                    Update
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
        </div>
        <div className="text-center mt-5 pb-5">
          <Pagination
            onChange={(value) => setPage(value)}
            pageSize={pageSize}
            total={distributors.length}
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
                  Province
                </label>
              </div>
              <div className="mt-1">
                <select
                  type="text"
                  value={formData?.province}
                  onChange={(e) => {
                    setSelectedProvinceId(e.target.value);
                    console.log("Selected Province ID:", e.target.value);
                    handleOnChange("province", e.target.value);
                    handleProvinceChange(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {provinces &&
                    provinces.map((province) => (
                      <option
                        key={province.province_id}
                        value={province.province_id}
                      >
                        {province.province_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div></div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  District
                </label>
              </div>
              <div className="mt-1">
                <select
                  type="text"
                  value={formData?.district}
                  onChange={(e) => {
                    setSelectedDistrictId(e.target.value);
                    console.log("Selected District ID:", e.target.value);
                    handleOnChange("district", e.target.value);
                    handleDistrictChange(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {distProvince &&
                    distProvince.map((district) => (
                      <option
                        key={district.district_id}
                        value={district.district_id}
                      >
                        {district.district_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  Sector
                </label>
              </div>
              <div className="mt-1">
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    console.log("Selected sector ID:", e.target.value);
                    handleOnChange("sector", e.target.value);
                    handleSectorChange(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {district &&
                    district.map((district) => (
                      <option
                        key={district.sector_id}
                        value={district.sector_id}
                      >
                        {district.sector_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  Cell
                </label>
              </div>
              <div className="mt-1">
                <select
                  type="text"
                  value={formData?.cell}
                  onChange={(e) => {
                    setSelectedCellId(e.target.value);
                    console.log("Selected cell ID:", e.target.value);
                    handleOnChange("cell", e.target.value);
                    handleCellChange(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {sector &&
                    sector.map((cell) => (
                      <option key={cell.cell_id} value={cell.cell_id}>
                        {cell.cell_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-6 text-gray-900">
                  Village
                </label>
              </div>
              <div className="mt-1">
                <select
                  type="text"
                  value={formData?.village_id}
                  onChange={(e) => handleOnChange("village_id", e.target.value)}
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {cell &&
                    cell.map((village) => (
                      <option
                        key={village.village_id}
                        value={village.village_id}
                      >
                        {village.village_name}
                      </option>
                    ))}
                </select>
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
                    Province
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    type="text"
                    value={formData?.province}
                    onChange={(e) => {
                      setSelectedProvinceId(e.target.value);
                      console.log("Selected Province ID:", e.target.value);
                      handleOnChange("province", e.target.value);
                      handleProvinceChange(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">---Select---</option>
                    {provinces &&
                      provinces.map((province) => (
                        <option
                          key={province.province_id}
                          value={province.province_id}
                        >
                          {province.province_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div></div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium leading-6 text-gray-900">
                    District
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    type="text"
                    value={formData?.district}
                    onChange={(e) => {
                      setSelectedDistrictId(e.target.value);
                      console.log("Selected District ID:", e.target.value);
                      handleOnChange("district", e.target.value);
                      handleDistrictChange(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">---Select---</option>
                    {distProvince &&
                      distProvince.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.district_id}
                        >
                          {district.district_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium leading-6 text-gray-900">
                    Sector
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    type="text"
                    value={formData?.sector}
                    onChange={(e) => {
                      setSelectedSectorId(e.target.value);
                      console.log("Selected sector ID:", e.target.value);
                      handleOnChange("sector", e.target.value);
                      handleSectorChange(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">---Select---</option>
                    {district &&
                      district.map((district) => (
                        <option
                          key={district.sector_id}
                          value={district.sector_id}
                        >
                          {district.sector_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium leading-6 text-gray-900">
                    Cell
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    type="text"
                    value={formData?.cell}
                    onChange={(e) => {
                      setSelectedCellId(e.target.value);
                      console.log("Selected cell ID:", e.target.value);
                      handleOnChange("cell", e.target.value);
                      handleCellChange(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">---Select---</option>
                    {sector &&
                      sector.map((cell) => (
                        <option key={cell.cell_id} value={cell.cell_id}>
                          {cell.cell_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium leading-6 text-gray-900">
                    Village
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    type="text"
                    value={formData?.village_id}
                    onChange={(e) =>
                      handleOnChange("village_id", e.target.value)
                    }
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">---Select---</option>
                    {cell &&
                      cell.map((village) => (
                        <option
                          key={village.village_id}
                          value={village.village_id}
                        >
                          {village.village_name}
                        </option>
                      ))}
                  </select>
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
                    <option value="Yes">active</option>
                    <option value="No">inactive</option>
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
    </div>
  );
};

export default Table;

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Pagination, Popover } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiWallet } from "react-icons/ci";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdOutlineModeEdit, MdOutlineDeleteSweep } from "react-icons/md";
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
} from "../../redux/reducer/distributorSlice";
import { getToken } from "../../utils/authToken";
import jwtDecode from "jwt-decode";
const DistributorTable = ({ setSearchTerm }) => {
  const dispatch = useDispatch();
  const [currentPage] = useState(1);
  const [pageSize] = useState(5);
  const [, setPartnerIdFilled] = useState(true);
  const [, updatedData] = useState({});
  const [, setSelectedProvinceId] = useState("");
  const [, setSelectedDistrictId] = useState("");
  const [, setSelectedSectorId] = useState("");
  const [, setSelectedCellId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [destributorData, setdestributorData] = useState({});
  const [showNewDistributorForm, setShowNewDistributorForm] = useState(false);
  const [showUpdateDistributorForm, setShowUpdateDistributorForm] =
    useState(false);

  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  let selectedDistributors = null;
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
    dispatch(getProvinces(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handleNewDistributorClick = () => {
    setShowNewDistributorForm(true);
  };
  const handleUpdateDistributor = (pdt_id) => {
    setSelectedDistributorId(pdt_id);
    const foundDistributor = distributors.find(
      (distrib) => distrib.distributor_id === pdt_id
    );

    if (foundDistributor) {
      selectedDistributors = { ...foundDistributor };
      delete selectedDistributors.distributor_id;
      delete selectedDistributors.distributor_status;
      delete selectedDistributors.dist_full_name;
      delete selectedDistributors.distributor_type;
      delete selectedDistributors.dist_company_name;
      delete selectedDistributors.distributor_account_balance;
      delete selectedDistributors.distributor_available_balance;
      delete selectedDistributors.last_update_at;
      delete selectedDistributors.last_update_by;
      delete selectedDistributors.last_update_to;
    }

    setShowUpdateDistributorForm(true);
    setFormData({ ...selectedDistributors });
  };
  const openTopupDrawer = () => {};
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
      delete selectedDistributors.distributor_type;
      delete selectedDistributors.dist_company_name;
      delete selectedDistributors.distributor_account_balance;
      delete selectedDistributors.distributor_available_balance;
      delete selectedDistributors.last_update_at;
      delete selectedDistributors.last_update_by;
      delete selectedDistributors.last_update_to;
    }

    setIsModalVisible(true);
    setFormData({ ...selectedDistributors });
  };
  useEffect(() => {
    if (updatedData[0]) {
      setFormData(updatedData[0]);
    }
  }, [distributor, updatedData]);
  const handleOnDestChange = (key, value) => {
    setdestributorData((e) => ({
      ...destributorData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };
  const handleOnChange = (key, value) => {
    setFormData((e) => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cell, district, province, sector, ...filteredData } = formData;
    const combinedData = {
      ...filteredData,
      user_id: decode.user_id,
    };

    dispatch(addDistributor(combinedData));
    setTimeout(() => {
      setShowNewDistributorForm(false);
    }, 5000);
  };
  const handleNewDistributorCancel = () => {
    setShowNewDistributorForm(false);
    setIsModalVisible(false);
  };
  const handleUpdateDistributorCancel = () => {
    setShowUpdateDistributorForm(false);
    setIsModalVisible(false);
  };
  const handleDistUpdate = (e) => {
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
  const userDistributors = distributors.filter(
    (distributor) => distributor.last_update_by === decode.user_id
  );
  return (
    <div className="text-xs">
      <div className="flex justify-between">
        <label className="font-normal">All Distributors</label>
        <button
          className="text-xs bg-custom-light-blue font-light
         text-custom-white px-4 py-3 rounded-md hover:bg-custom-dark-blue duration-400"
          onClick={handleNewDistributorClick}
        >
          New Distributor
        </button>
      </div>
      {showNewDistributorForm && (
        <div>
          <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="grid grid-cols-5 text-custom-gray gap-6">
              <div className="col-span-1">
                <label>Full Name</label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="E.g: Muheto Darius"
                  className="block w-full outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Phone Number</label>
                <br />
                <input
                  type="text"
                  value={formData.telephone_number}
                  onChange={(e) =>
                    handleOnChange("telephone_number", e.target.value)
                  }
                  required
                  placeholder="E.g: 0789944660"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Email Address</label>
                <br />
                <input
                  type="text"
                  value={formData.email_address}
                  onChange={(e) =>
                    handleOnChange("email_address", e.target.value)
                  }
                  required
                  placeholder="E.g: muhdarius@gmail.com"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>TIN Number</label>
                <br />
                <input
                  type="text"
                  value={formData.dist_tin_no}
                  onChange={(e) =>
                    handleOnChange("dist_tin_no", e.target.value)
                  }
                  required
                  placeholder="-----------"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Company Name</label>
                <br />
                <input
                  type="text"
                  value={formData.dist_company_name}
                  onChange={(e) =>
                    handleOnChange("dist_company_name", e.target.value)
                  }
                  required
                  placeholder="E.g: Africa XYZ"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 text-custom-gray gap-6">
              <div className="col-span-1">
                <label>Province</label>
                <br />
                <select
                  type="text"
                  value={formData?.province}
                  onChange={(e) => {
                    setSelectedProvinceId(e.target.value);
                    console.log("Selected Province ID:", e.target.value);
                    handleOnChange("province", e.target.value);
                    handleProvinceChange(e.target.value);
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="" className="text-custom-gray">
                    ---Select---
                  </option>
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

              <div className="col-span-1">
                <label>District</label>
                <br />
                <select
                  type="text"
                  value={formData?.district}
                  onChange={(e) => {
                    setSelectedProvinceId(e.target.value);
                    handleOnChange("district", e.target.value);
                    handleDistrictChange(e.target.value);
                  }}
                  className="block w-full outline-none rounded-md px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
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
              <div className="col-span-1">
                <label>Sector</label>
                <br />
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    handleOnChange("sector", e.target.value);
                    handleSectorChange(e.target.value);
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
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
              <div className="col-span-1">
                <label>Cell</label>
                <br />
                <select
                  type="text"
                  value={formData?.cell}
                  onChange={(e) => {
                    setSelectedCellId(e.target.value);
                    handleOnChange("cell", e.target.value);
                    handleCellChange(e.target.value);
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
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
              <div className="col-span-1">
                <label>village</label>
                <br />
                <select
                  type="text"
                  value={formData?.village_id}
                  onChange={(e) => handleOnChange("village_id", e.target.value)}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
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
              <div className="col-span-1">
                <label>Address</label>
                <br />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleOnChange("address", e.target.value)}
                  required
                  placeholder="E.g: KK 444 st"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div className="flex justify-between mt-7">
              <div></div>
              <div className="space-x-8 ">
                <button
                  type="button"
                  className="text-custom-red"
                  onClick={handleNewDistributorCancel}
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="bg-custom-light-blue text-custom-white px-4 py-3 hover:bg-custom-dark-blue duration-400 rounded-md"
                  onClick={handleSubmit}
                >
                  Registor
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {isModalVisible && (
        <div>
          <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="text-custom-light-blue text-md font-semibold">
              Topup Account
            </div>

            <div className="grid grid-cols-4 text-custom-gray gap-6">
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
                  placeholder="300000"
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
                  placeholder="Bank"
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
              <div className="col-span-1">
                <label>Cheque Number</label>
                <br />
                <input
                  type="text"
                  value={formData.cheque_no}
                  onChange={(e) => handleOnChange("cheque_no,", e.target.value)}
                  required
                  placeholder="111 111 111 1111"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>

            <div className="flex justify-between mt-7">
              <div></div>
              <div className="space-x-8 ">
                <button
                  type="button"
                  className="text-custom-red"
                  onClick={handleNewDistributorCancel}
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="bg-custom-light-blue hover:bg-custom-dark-blue duration-400 text-custom-white px-4 py-3  rounded-md"
                  onClick={handleSubmit}
                >
                  Top Up
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <>
        {showUpdateDistributorForm && (
          <div>
            <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
              <div>
                <label className="text-custom-light-blue mb-4">
                  Distributor Update Form
                </label>
              </div>
              <ToastContainer position="top-right" autoClose={5000} />
              <div className="grid grid-cols-5 text-custom-gray gap-6">
                <div className="col-span-1">
                  <label>Phone Number</label>
                  <br />
                  <input
                    type="text"
                    value={formData.telephone_number}
                    onChange={(e) =>
                      handleOnDestChange("telephone_number", e.target.value)
                    }
                    required
                    placeholder="E.g: 0789944660"
                    className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
                <div className="col-span-1">
                  <label>Email Address</label>
                  <br />
                  <input
                    type="text"
                    value={formData.email_address}
                    onChange={(e) =>
                      handleOnDestChange("email_address", e.target.value)
                    }
                    required
                    placeholder="E.g: muhdarius@gmail.com"
                    className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
                <div className="col-span-1">
                  <label>TIN Number</label>
                  <br />
                  <input
                    type="text"
                    value={formData.dist_tin_no}
                    onChange={(e) =>
                      handleOnDestChange("dist_tin_no", e.target.value)
                    }
                    required
                    placeholder="-----------"
                    className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
                <div className="col-span-1">
                  <label>Address</label>
                  <br />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      handleOnDestChange("address", e.target.value)
                    }
                    required
                    placeholder="E.g: KK 444 st"
                    className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
                <div className="col-span-1">
                  <label>Status</label>
                  <br />
                  <select
                    type="text"
                    value={formData?.distributor_status}
                    onChange={(e) =>
                      handleOnChange("distributor_status", e.target.value)
                    }
                    className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">---Select----</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-5 text-custom-gray gap-6">
                <div className="col-span-1">
                  <label>Province</label>
                  <br />
                  <select
                    type="text"
                    value={formData?.province}
                    onChange={(e) => {
                      setSelectedProvinceId(e.target.value);
                      console.log("Selected Province ID:", e.target.value);
                      handleOnDestChange("province", e.target.value);
                      handleProvinceChange(e.target.value);
                    }}
                    className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="" className="text-custom-gray">
                      ---Select---
                    </option>
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
                <div className="col-span-1">
                  <label>District</label>
                  <br />
                  <select
                    type="text"
                    value={formData?.district}
                    onChange={(e) => {
                      setSelectedProvinceId(e.target.value);
                      handleOnDestChange("district", e.target.value);
                      handleDistrictChange(e.target.value);
                    }}
                    className="block w-full outline-none rounded-md px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
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
                <div className="col-span-1">
                  <label>Sector</label>
                  <br />
                  <select
                    type="text"
                    value={formData?.sector}
                    onChange={(e) => {
                      setSelectedSectorId(e.target.value);
                      handleOnDestChange("sector", e.target.value);
                      handleSectorChange(e.target.value);
                    }}
                    className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
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
                <div className="col-span-1">
                  <label>Cell</label>
                  <br />
                  <select
                    type="text"
                    value={formData?.cell}
                    onChange={(e) => {
                      setSelectedCellId(e.target.value);
                      handleOnDestChange("cell", e.target.value);
                      handleCellChange(e.target.value);
                    }}
                    className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
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
                <div className="col-span-1">
                  <label>village</label>
                  <br />
                  <select
                    type="text"
                    value={formData?.village_id}
                    onChange={(e) =>
                      handleOnChange("village_id", e.target.value)
                    }
                    className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
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
              <div className="flex justify-between mt-7">
                <div></div>
                <div className="space-x-8 ">
                  <button
                    type="button"
                    className="text-custom-red"
                    onClick={handleUpdateDistributorCancel}
                  >
                    cancel
                  </button>
                  <button
                    type="button"
                    className="bg-custom-light-blue hover:bg-custom-dark-blue duration-400  text-custom-white px-4 py-3  rounded-md"
                    onClick={handleDistUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </>
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
              {userDistributors.map((distributor) => (
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
                      className={`rounded-f py-1  rounded-md ${
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
                        <div className="text-xs">
                          <span className="flex -mb-2">
                            <label className="mt-1">
                              <MdOutlineModeEdit />
                            </label>
                            <label
                              className="cursor-pointer px-3 hover:text-green-400"
                              onClick={() =>
                                handleUpdateDistributor(
                                  distributor.distributor_id
                                )
                              }
                            >
                              Edit Distributor
                            </label>
                          </span>
                          <br />
                          <span className="flex">
                            <label className="mt-1">
                              <CiWallet />
                            </label>
                            <label
                              className="cursor-pointer px-3 hover:text-custom-light-blue"
                              onClick={() =>
                                handleTopUpDistributor(
                                  distributor?.distributor_id
                                )
                              }
                            >
                              Top up Acc.
                            </label>
                          </span>
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
        <div className="flex justify-between mt-10">
          <div></div>
          <div>
            <Pagination defaultCurrent={6} total={userDistributors.length} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DistributorTable;

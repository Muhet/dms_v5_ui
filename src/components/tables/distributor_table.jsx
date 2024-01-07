import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Pagination, Popover, Spin } from "antd";
import { FcApproval } from "react-icons/fc";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiWallet } from "react-icons/ci";
import dist from "../../assets/images/icons/photo_auto_merge.png";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdOutlineModeEdit, MdOutlineDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import {
  getDistributors,
  getProvinces,
  getDistributorTopUps,
  getDistrict,
  getSector,
  getCell,
  addTopup,
  approveDistributor,
  getDistProvince,
  getBanks,
  addDistributor,
  updateDistributor,
} from "../../redux/reducer/distributorSlice";
import { getTellerTopups } from "../../redux/reducer/tellerSlice";
import { getToken } from "../../utils/authToken";
import jwtDecode from "jwt-decode";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "white",
    }}
    spin
  />
);
const DistributorTable = ({ setSearchTerm }) => {
  const dispatch = useDispatch();
  const [currentPage] = useState(1);
  const [pageSize] = useState(5);
  const [, setPartnerIdFilled] = useState(true);
  const [isApproveDrawerVisible, setIsApproveDrawerVisible] = useState(false);
  const [, updatedData] = useState({});
  const [, setSelectedProvinceId] = useState("");
  const [, setSelectedDistrictId] = useState("");
  const [, setSelectedSectorId] = useState("");
  const [, setSelectedCellId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [showNewDistributorForm, setShowNewDistributorForm] = useState(false);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [showUpdateDistributorForm, setShowUpdateDistributorForm] =
    useState(false);
  const [selectedDistributorForEdit, setSelectedDistributorForEdit] = useState(
    {}
  );
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  let selectedDistributors = null;

  const closeApproveDrawer = () => {
    setIsApproveDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
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
    DistTopup,
    sector,
    cell,
    banks,
    loading,
  } = useSelector((state) => state.distributors);
  const { tellertopups } = useSelector((state) => state.tellers);
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  useEffect(() => {
    dispatch(getDistributors(currentPage, pageSize));
    dispatch(getDistributorTopUps(currentPage, pageSize));
    dispatch(getProvinces(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handleNewDistributorClick = () => {
    setShowNewDistributorForm(true);
  };
  useEffect(() => {
    dispatch(getTellerTopups());
    dispatch(getBanks());
  }, [dispatch]);
  const handleNewRequestClick = () => {
    setShowNewRequestForm(true);
  };
  const handleUpdateDistributor = (pdt_id) => {
    setSelectedDistributorId(pdt_id);
    const foundDistributor = distributors.find(
      (distrib) => distrib.distributor_id === pdt_id
    );

    if (foundDistributor) {
      selectedDistributors = { ...foundDistributor };
      delete selectedDistributors.distributor_id;
      delete selectedDistributors.dist_full_name;
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
  const openApproveDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);

    setIsApproveDrawerVisible(true);
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
  const handleRequestSubmit = (e) => {
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
    setShowNewRequestForm(false);
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
    setTimeout(() => {
      setShowUpdateDistributorForm(false);
    }, 5000);
  };
  const handleDistTopup = (e) => {
    e.preventDefault();
    const {
      dist_tin_no,
      address,
      last_update_by,
      last_update_to,
      distributor_type,

      ...filteredData
    } = formData;
    const combinedData = {
      ...filteredData,
      distributor_id: selectedDistributorId,
      created_by: decode.user_id,
    };

    dispatch(addTopup(combinedData));
    setTimeout(() => {
      setIsModalVisible(false);
    }, 5000);
  };

  const userDistributors = distributors.filter(
    (distributor) => distributor.last_update_by === decode.user_id
  );
  const userDistTopUps = DistTopup.filter(
    (topup) => topup.created_by == decode.user_id
  );
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

  const accessLevel = decode.access_level;

  return (
    <div className="text-xs ">
      <div>
        {accessLevel === "7" ? (
          <div className="flex justify-between">
            <label className="font-normal">All Requests</label>
            <button
              className="text-xs bg-custom-light-blue font-light flex gap-2
            text-custom-white px-4 py-3 rounded-md "
              onClick={handleNewRequestClick}
            >
              <img src={dist} alt="" className="" />
              <label>Add Request</label>
            </button>
          </div>
        ) : accessLevel === "8" ? (
          <div className="flex flex-col">
            <label className="font-bold text-lg text-custom-deep">
              Renew Subscription
            </label>
            <label className="text-xs text-custom-gray font-light">
              You may also renew a subscription
            </label>
          </div>
        ) : (
          <div className="flex justify-between">
            <label className="font-normal">All Distributors</label>
            {accessLevel !== "3" && accessLevel !== "4" && (
              <button
                className="text-xs bg-custom-light-blue font-light flex gap-2
      text-custom-white px-4 py-3 rounded-md hover:bg-custom-dark-blue duration-400"
                onClick={handleNewDistributorClick}
              >
                <img src={dist} alt="" className="" />
                <label> New Distributor</label>
              </button>
            )}
          </div>
        )}
      </div>
      {showNewRequestForm && (
        <div>
          <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
            <ToastContainer position="top-right" autoClose={5000} />
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
            </div>
            <div className="grid grid-cols-3 text-custom-gray gap-6">
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
                      onClick={handleRequestSubmit}
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

      {isApproveDrawerVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50
        "
        >
          <div className="bg-white px-4 rounded-md">
            <div>
              <form className="space-y-6" action="#" method="PUT">
                <ToastContainer position="top-right" autoClose={5000} />

                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="request_status"
                      className="block text-xs font-medium leading-6 text-gray-900"
                    >
                      Request Status
                    </label>
                    <label
                      htmlFor="request_status"
                      className="text-custom-red cursor-pointer h-fit px-1 hover:bg-custom-red hover:text-white diration-500 rounded-full"
                      onClick={closeApproveDrawer}
                    >
                      x
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
                  <div className="mb-10">
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
            </div>
          </div>
        </div>
      )}
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
              <div className="flex gap-4">
                <button
                  type="button"
                  className="text-custom-red"
                  onClick={handleNewDistributorCancel}
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="bg-custom-light-blue text-custom-white px-2 mt-1 rounded-md py-2 w-full"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <Spin indicator={antIcon} /> : "Register"}
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
                  placeholder="300000"
                  className="block w-full outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Payment Mode</label>
                <br />
                <select
                  value={formData?.mode_of_payment}
                  onChange={(e) =>
                    handleOnChange("mode_of_payment", e.target.value)
                  }
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select----</option>
                  <option value="bank">Bank</option>
                  <option value="Mopay">Mopay</option>
                </select>
              </div>
              {formData.mode_of_payment === "bank" && (
                <div className="col-span-1">
                  <label>Drawers Bank</label>
                  <br />
                  <select
                    type="text"
                    value={formData?.drawers_bank}
                    onChange={(e) =>
                      handleOnChange("drawers_bank", e.target.value)
                    }
                    className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">{formData?.bank_id}</option>
                    {banks &&
                      banks.map((bank) => (
                        <option key={bank.bank_id} value={bank.bank_id}>
                          {bank.bank_name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              {formData.mode_of_payment === "Mopay" && (
                <div className="col-span-1">
                  <label>Transaction Id</label>
                  {/* <br />
                  <select
                    type="text"
                    value={formData?.tranaction_id}
                    onChange={(e) =>
                      handleOnChange("tranaction_id", e.target.value)
                    }
                    className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">{formData?.transaction_id}</option>
                    {banks &&
                      banks.map((bank) => (
                        <option key={bank.bank_id} value={bank.tranaction_id}>
                          {bank.tranaction_id}
                        </option>
                      ))}
                  </select> */}{" "}
                  <br />
                  <input
                    type="text"
                    value={formData.transaction_id}
                    onChange={(e) =>
                      handleOnChange("transaction_id", e.target.value)
                    }
                    required
                    placeholder="300000"
                    className="block w-full outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-7">
              <div></div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="text-custom-red"
                  onClick={handleNewDistributorCancel}
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="bg-custom-light-blue text-custom-white px-2 mt-1 rounded-md py-2 w-full"
                  onClick={handleDistTopup}
                  disabled={loading}
                >
                  {loading ? <Spin indicator={antIcon} /> : " Top Up"}
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
                      handleOnChange("telephone_number", e.target.value)
                    }
                    required
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
                    placeholder="E.g: 0789944660"
                    className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
                <div className="col-span-1">
                  <label>Email Address</label>
                  <br />
                  <input
                    type="text"
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
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
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
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
                  <label>Address</label>
                  <br />
                  <input
                    type="text"
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
                    value={formData.address}
                    onChange={(e) => handleOnChange("address", e.target.value)}
                    required
                    placeholder="E.g: KK 444 st"
                    className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  />
                </div>
                {accessLevel !== "4" ? (
                  <div className="col-span-1">
                    <label>Status</label>
                    <br />
                    <input
                      type="text"
                      readOnly
                      value={formData.distributor_status}
                      className="block w-full bg-gray-200 outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                    />
                  </div>
                ) : (
                  <div className="">
                    <br />
                    <select
                      type="text"
                      value={formData?.distributor_status}
                      onChange={(e) =>
                        handleOnChange("distributor_status", e.target.value)
                      }
                      className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                      disabled={accessLevel !== "4"}
                    >
                      <option value="">---Select----</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-5 text-custom-gray gap-6">
                <div className="col-span-1">
                  <label>Province</label>
                  <br />
                  <select
                    type="text"
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
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
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
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
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
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
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
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
                    disabled={
                      accessLevel === "4" &&
                      formData?.distributor_type !== "mega_dealer"
                    }
                    value={formData?.village_name}
                    onChange={(e) =>
                      handleOnChange("village_id", e.target.value)
                    }
                    className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  >
                    <option value="">{formData?.village_id}</option>
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
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="text-custom-red"
                    onClick={handleUpdateDistributorCancel}
                  >
                    cancel
                  </button>{" "}
                  <button
                    type="button"
                    className="bg-custom-light-blue text-custom-white px-2 mt-1 rounded-md py-2 w-full"
                    onClick={handleDistUpdate}
                    disabled={loading}
                  >
                    {loading ? <Spin indicator={antIcon} /> : "Update"}
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
          {decode.access_level === "7" ? (
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
                  {userDistTopUps.map((distributor) => (
                    <tr className="border-b dark:border-neutral-100 text-black font-extralight text-xs">
                      <td className="whitespace-nowrap px-1 py-4">
                        {distributor.request_id}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {distributor.date_of_purchase && (
                          <span>
                            {new Date(distributor.date_of_purchase)
                              .toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })
                              .replace(/\//g, "-")}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {distributor.drawers_bank}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {distributor.cheque_no}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {distributor.mode_of_payment}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {distributor.amount_paid}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        <label
                          className={`rounded-f py-1  rounded-md ${
                            distributor.request_status === "approved"
                              ? "text-custom-green bg-custom-light-green  px-4"
                              : distributor.request_status === "cancelled"
                              ? "bg-custom-red text-white px-6"
                              : distributor.request_status === "pending"
                              ? "bg-custom-light-orange text-custom-orange px-6"
                              : ""
                          }`}
                        >
                          {distributor.request_status}
                        </label>
                      </td>
                      <td className="whitespace-nowrap px-1 py-4 ">
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
                              {decode.access_level === "4" ? (
                                <span className="flex mt-4 -mb-2">
                                  <label className="mt-1">
                                    <FcApproval />
                                  </label>
                                  <label
                                    className="cursor-pointer px-3 hover:text-green-400"
                                    onClick={() =>
                                      openApproveDrawer(distributor?.request_id)
                                    }
                                  >
                                    Approve
                                  </label>
                                </span>
                              ) : null}

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
          ) : decode.access_level === "8" ? (
            <div className="overflow-y-auto h-96">
              <table className="min-w-full text-left text-xs text-custom-light-gray font-Poppins">
                <thead className="-top-2 border-b">
                  <tr className="">
                    <th scope="col" className="px-1 py-4">
                      Batch Number
                    </th>{" "}
                    <th scope="col" className="px-1 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-1 py-4">
                      New Teller Balance
                    </th>
                    <th scope="col" className="px-1 py-4">
                      Topup Amount
                    </th>
                    <th scope="col" className="px-1 py-4">
                      Dist.Initial Bal.
                    </th>
                    <th scope="col" className="px-1 py-4">
                      Teller Initial Bal.
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {tellertopups.map((teller) => (
                    <tr className="border-b dark:border-neutral-100 text-black font-extralight text-xs">
                      <td className="whitespace-nowrap px-1 py-4">
                        {teller.batch_number}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {format(
                          new Date(teller.date_time_started),
                          "dd-MM-yyyy HH:mm"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {teller.new_teller_balance}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {teller.topup_amount}
                      </td>

                      <td className="whitespace-nowrap px-1 py-4">
                        {teller.distributor_initial_balance}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        {teller.inital_teller_balance}
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
                                    handleOpenTellerUpdateForm(teller.teller_id)
                                  }
                                >
                                  Edit Topup
                                </label>
                              </span>
                              <br />

                              <hr className="mb-1 mt-2 -mx-2" />
                              <span className="flex text-custom-red justify-center">
                                <label className="-mr-2">
                                  <MdOutlineDeleteSweep size={20} />
                                </label>
                                <label
                                  className="cursor-pointer px-3 hover:text-green-400 "
                                  onClick={() =>
                                    openTopupDrawer(teller?.teller_id)
                                  }
                                >
                                  Delete
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
          ) : (
            <div className="overflow-y-auto h-96">
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
                  {accessLevel === "3" || accessLevel === "4"
                    ? distributors.map((distributor) => (
                        <tr
                          key={distributor.distributor_id}
                          className="border-b dark:border-neutral-100 text-black font-extralight text-xs"
                        >
                          <td className="whitespace-nowrap px-1 py-4">
                            {distributor.distributor_id}
                          </td>

                          <NavLink
                            to={`/distributors/topup/bydist/${distributor?.distributor_id}`}
                          >
                            <td className="whitespace-nowrap px-1 py-4">
                              {distributor.dist_company_name}
                            </td>{" "}
                          </NavLink>
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
                                  : distributor.distributor_status ===
                                    "inactive"
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
                                  {accessLevel !== "3" ? (
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
                                  ) : null}
                                  <br />
                                  {accessLevel !== "4" ? (
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
                                  ) : null}

                                  <hr className="mb-1 mt-2 -mx-2" />
                                  <span className="flex text-custom-red">
                                    <label className="-mr-2">
                                      <MdOutlineDeleteSweep size={20} />
                                    </label>
                                    <label
                                      className="cursor-pointer px-3 hover:text-green-400 "
                                      onClick={() =>
                                        openTopupDrawer(
                                          distributor?.distributor_id
                                        )
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
                      ))
                    : userDistributors.map((distributor) => (
                        <tr
                          key={distributor.distributor_id}
                          className="border-b dark:border-neutral-100 text-black font-extralight text-xs"
                        >
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
                                  : distributor.distributor_status ===
                                    "inactive"
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
                                    {decode.access_level === "4" &&
                                      distributor?.distributor_type ===
                                        "mega_dealer" && (
                                        <>
                                          <label className="mt-1">
                                            <MdOutlineModeEdit />
                                          </label>
                                          <label
                                            className="cursor-pointer px-3 hover:text-green-400"
                                            onClick={() => {
                                              handleUpdateDistributor(
                                                distributor.distributor_id
                                              );
                                            }}
                                          >
                                            Edit Distributor
                                          </label>
                                        </>
                                      )}
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
                                        openTopupDrawer(
                                          distributor?.distributor_id
                                        )
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
          )}
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

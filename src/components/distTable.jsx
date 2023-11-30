import React, { useState, useEffect } from "react";

import {
  getDistributors,
  addDistributor,
  addMegaDealer,
  updateDistributor,
  getProvinces,
  getDistrict,
  getSector,
  getCell,
  getDistProvince,
} from "../redux/reducer/distributorSlice";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../utils/authToken";
import jwtDecode from "jwt-decode";

const Table = ({ closeDrawer }) => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    closeDrawer();
  };
  console.log("Form values:", onFinish);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [setSearchTerm] = useState("");
  const [, setFilteredDistributors] = useState([]);
  const [, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const { distributor, provinces, distProvince, district, sector, cell } =
    useSelector((state) => state.distributors);
  const [, setPartnerIdFilled] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [updatedData] = useState({});
  const token = getToken();
  const decode = jwtDecode(token);
  const [, setIsDetailModalVisible] = useState(false);
  const [, setSelectedDistributor] = useState({});
  const [, setIsUpdateDrawerVisible] = useState(false);
  const [, setSelectedDistributorForEdit] = useState({});
  const [selectedDistributorId] = useState(null);

  const [, setSelectedProvinceId] = useState("");
  const [, setSelectedDistrictId] = useState("");
  const [, setSelectedSectorId] = useState("");
  const [, setSelectedCellId] = useState("");
  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
  console.log(closeUpdateDrawer);
  const handleUpdate = () => {
    dispatch(
      updateDistributor({
        tellerId: selectedDistributorId,
        updatedData: formData,
      })
    );
  };
  console.log(handleUpdate);
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
  const showModal = () => {
    setIsModalVisible(true);
  };
  console.log(showModal);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log(handleCancel);
  const showDetailModal = (distributor) => {
    setSelectedDistributor(distributor);
    setIsDetailModalVisible(true);
  };
  console.log(showDetailModal);
  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
  };
  console.log(handleDetailModalCancel);

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
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    console.log("Search Value:", searchValue);
    setSearchTerm(searchValue);

    const filtered = distributor.filter((distributor) =>
      distributor.dist_company_name
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    setFilteredDistributors(filtered);
  };
  console.log("Search Value:", handleSearch);
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  console.log("Search Value:", handlePageSizeChange);
  useEffect(() => {
    dispatch(getDistributors(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    dispatch(getProvinces(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { cell, district, province, sector, ...filteredData } = formData;
    const combinedData = {
      ...filteredData,
      user_id: decode.user_id,
    };
    console.log(typeof decode.access_level); // Check the data type

    if (decode.access_level === "4") {
      console.log("Dispatched Data 4");
      dispatch(addMegaDealer(combinedData));
    } else if (decode.access_level === "5") {
      console.log("Dispatched Data 5");
      dispatch(addDistributor(combinedData));
    } else {
      console.error("Invalid access level:", decode.access_level);
    }
  };

  return (
    <form className="space-y-6" action="#" method="POST">
      <ToastContainer position="top-right" autoClose={5000} />
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Full Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={formData.dist_full_name}
            onChange={(e) => handleOnChange("dist_full_name", e.target.value)}
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
            onChange={(e) => handleOnChange("telephone_number", e.target.value)}
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
            onChange={(e) => handleOnChange("email_address", e.target.value)}
            required
            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            TIN number
          </label>
        </div>
        <div className="mt-1">
          <input
            value={formData.dist_tin_no}
            onChange={(e) => handleOnChange("dist_tin_no", e.target.value)}
            required
            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Company Name
          </label>
        </div>
        <div className="mt-1">
          <input
            value={formData.dist_company_name}
            onChange={(e) =>
              handleOnChange("dist_company_name", e.target.value)
            }
            required
            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <option key={province.province_id} value={province.province_id}>
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
                <option key={district.district_id} value={district.district_id}>
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
                <option key={district.sector_id} value={district.sector_id}>
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
                <option key={village.village_id} value={village.village_id}>
                  {village.village_name}
                </option>
              ))}
          </select>
        </div>
      </div>{" "}
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
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </form>
  );
};
export default Table;

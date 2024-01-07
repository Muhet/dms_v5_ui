import React, { useState, useEffect } from "react";
import { login } from "../../redux/action/userAction";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  addMegaDealer,
  addDistributor,
  getDistrict,
  getSector,
  getCell,
  getDistProvince,
} from "../../redux/reducer/distributorSlice";
import subs from "../../assets/images/icons/add_notes.png";
import renewal from "../../assets/images/icons/source_notes.png";
import { getToken, getData } from "../../utils/authToken";
import jwtDecode from "jwt-decode";
import UsageAn from "../../assets/images/icons/usageAnalysis.png";
import Dist from "../../assets/images/icons/distributors.png";
import Trans from "../../assets/images/icons/transactions.png";
import Overview from "../../assets/images/icons/airplay.png";
import Subsc from "../../assets/images/icons/subscriptions.png";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "white",
    }}
    spin
  />
);
const Navbar = () => {
  const location = useLocation();
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [, setPartnerIdFilled] = useState(true);
  const [showMegaDealerAddModel, setShowMegaDealerAddModel] = useState(false);
  const [, setShowRenewModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeParentOption] = useState(null);
  const userData = getData().data?.menu_list;
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  const { provinces, distProvince, district, sector, cell, loading } =
    useSelector((state) => state.distributors);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [, setSelectedProvinceId] = useState("");
  const [, setSelectedDistrictId] = useState("");
  const [, setSelectedSectorId] = useState("");
  const [, setSelectedCellId] = useState("");

  const handleOpenMegaModel = () => {
    setShowMegaDealerAddModel(true);
  };
  const handleCloseMegaModel = () => {
    setShowMegaDealerAddModel(false);
  };
  const handleSubscriptionHoverEnter = () => {
    setShowSubscriptionModal(true);
  };

  const handleSubscriptionHoverLeave = () => {
    setShowSubscriptionModal(false);
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
  const handleOnChange = (key, value) => {
    setFormData((e) => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  useEffect(() => {
    dispatch(login({ user_name, password }))
      .then((response) => {
        setUser_name("");
        setPassword("");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch, user_name, password]);
  const handleRenewModalOpen = () => {
    setShowRenewModal(true);
  };

  const handleRenewModalClose = () => {
    setShowRenewModal(false);
  };

  const handleMegaDealerSubmit = (e) => {
    e.preventDefault();
    const { cell, district, province, sector, ...filteredData } = formData;
    const combinedData = {
      ...filteredData,
      user_id: decode.user_id,
    };
    if (decode.access_level === "5") {
      console.log("Dispatched distributor", combinedData);
      dispatch(addDistributor(combinedData));
    } else {
      console.log("Dispatched MegaDealerData", combinedData);
      dispatch(addMegaDealer(combinedData));
    }

    setTimeout(() => {
      setShowMegaDealerAddModel(false);
    }, 5000);
  };

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="fixed left-0">
      <label>
        <span className="text-white font-semibold text-4xl flex mt-10 mx-7">
          D<p className="text-custom-yellow">s</p>M
        </span>
      </label>
      <div className="text-custom-gray mx-3 mt-20">
        <ul className="my-4">
          <li
            className={`my-7 px-3 ${
              location.pathname === "/" ? "activeLink" : ""
            }`}
          >
            <a href="/" className="flex gap-2">
              <img src={Overview} alt="trans" className="h-fit" />
              <p>Overview</p>
            </a>
          </li>
          <li
            className={`my-7 px-3 ${
              location.pathname === "/transactions" ? "activeLink" : ""
            }`}
          >
            <a href="/transactions" className="flex gap-2">
              <img src={Trans} alt="trans" className="h-fit" />
              <p>Transactions</p>
            </a>
          </li>
          {decode.access_level === "8" && (
            <li
              className={`my-7 px-3 ${
                location.pathname.includes("/subscriber") ||
                location.pathname.includes("/new_subs")
                  ? "activeLink"
                  : ""
              }`}
              onMouseEnter={handleSubscriptionHoverEnter}
            >
              <a href="/subscriber" className="flex gap-2">
                <img src={Subsc} alt="trans" className="h-fit" />
                <p>Subscriptions</p>
              </a>
            </li>
          )}
          {decode.access_level === "8" && showSubscriptionModal && (
            <div className="popup-model bg-custom-main-gray -mt-5 text-custom-white rounded-md p-3">
              <ul onMouseLeave={handleSubscriptionHoverLeave}>
                <span
                  className={`flex gap-2 -mx-1 px-2  ${
                    location.pathname === "/new_subs" ? "activeSubLink" : ""
                  }`}
                >
                  <img src={subs} alt="trans" className="h-fit mt-1" />
                  <li className="py-2 cursor-pointer">
                    <a href="/new_subs" className="flex gap-2">
                      <p>New Subscriber</p>
                    </a>
                  </li>
                </span>
                <span
                  onClick={handleRenewModalOpen}
                  className={`flex gap-2 -mx-1 px-2 cursor-pointer ${
                    location.pathname === "/subscriber" ? "activeSubLink" : ""
                  }`}
                >
                  <img src={renewal} alt="trans" className="h-fit mt-1" />
                  <li className="py-2">
                    <a href="/subscriber" className="flex gap-2">
                      <p>Renew</p>
                    </a>
                  </li>
                </span>
              </ul>
            </div>
          )}
          <li
            className={`my-7 px-3 ${
              location.pathname === "/usage-analysis" ? "activeLink" : ""
            }`}
          >
            <a href="/usage-analysis" className="flex gap-2 my-3">
              <img src={UsageAn} alt="trans" className="h-fit" />
              <p>Usage Analysis</p>
            </a>
          </li>
        </ul>
      </div>
      <div className="text-custom-gray mx-2 ">
        <label>Users</label>

        {userData && Array.isArray(userData) && (
          <ul className="my-4 text-custom-gray">
            {userData.map((parentOption, index) => (
              <li
                key={index}
                className={`relative ml-3 group hover:bg-custom-dark-blue hover:text-white py-4 px-5`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  className={`mt-0 ${
                    activeParentOption === index ? "active" : ""
                  }`}
                  to={
                    parentOption.menu_title === "Distributors"
                      ? "/distributors"
                      : parentOption.menu_title === "Tellers"
                      ? "/teller_list"
                      : parentOption.menu_title === "Sales"
                      ? "/distributors"
                      : "#"
                  }
                >
                  {parentOption.menu_title}
                </NavLink>

                <img
                  src={Dist}
                  alt="trans"
                  className="h-fit absolute left-0 top-0 mt-3 -ml-2"
                />

                {activeDropdown === index && parentOption.children && (
                  <div className="absolute bg-custom-dark-blue ml-20 -mt-6 w-max rounded-md shadow-md bg-opacity-90">
                    <ul className="flex-col text-custom-gray">
                      {parentOption.children
                        .filter((childOption) => childOption.on_menu === "yes")
                        .map((childOption, childIndex) => (
                          <li
                            key={childIndex}
                            className="text-white py-2 px-4 hover:text-black text-sm"
                          >
                            <NavLink
                              to={childOption.load_page}
                              onClick={() => {
                                if (
                                  childOption.menu_title ===
                                    "New Super Dealer" ||
                                  childOption.menu_title === "New Distributor"
                                ) {
                                  handleOpenMegaModel();
                                } else if (
                                  childOption.menu_title === "All Tellers"
                                ) {
                                  window.location.href = "/teller_list";
                                } else if (
                                  childOption.menu_title === "All Distributors"
                                ) {
                                  window.location.href = "/distributors";
                                } else if (
                                  childOption.menu_title === "All Tellers"
                                ) {
                                  window.location.href = "/teller_list";
                                } else if (
                                  childOption.menu_title ===
                                  "Renew Subscription"
                                ) {
                                  window.location.href = "/subscriber";
                                } else if (
                                  childOption.menu_title === "New Customer Sale"
                                ) {
                                  window.location.href = "/new_subs";
                                } else if (
                                  childOption.menu_title ===
                                  "Distributor Top Up Statement"
                                ) {
                                  window.location.href = "/request_list";
                                } else if (
                                  childOption.menu_title ===
                                  "Approve Distributor Top Up"
                                ) {
                                  window.location.href =
                                    "/pending_request_list";
                                }
                              }}
                            >
                              {childOption.menu_title}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {showMegaDealerAddModel && (
          <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center  justify-center bg-black bg-opacity-40">
            <div className="w-max ml-32 flex justify-center bg-white px-4 rounded-md">
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
                        onChange={(e) =>
                          handleOnChange("village_id", e.target.value)
                        }
                        className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                      >
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
                        onChange={(e) =>
                          handleOnChange("address", e.target.value)
                        }
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
                        onClick={handleCloseMegaModel}
                      >
                        cancel
                      </button>
                      <button
                        type="button"
                        className="bg-custom-light-blue text-custom-white px-2 mt-4 rounded-md py-2 w-full"
                        onClick={handleMegaDealerSubmit}
                        disabled={loading}
                      >
                        {loading ? <Spin indicator={antIcon} /> : "Registor"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;

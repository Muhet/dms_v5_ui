import React, { useState, useEffect } from "react";
import Trans from "./../assets/images/icons/transactions.png";
import Subsc from "./../assets/images/icons/subscriptions.png";
import { login } from "../redux/action/userAction";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import UsageAn from "./../assets/images/icons/usageAnalysis.png";
import Dist from "./../assets/images/icons/distributors.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, getToken } from "./../utils/authToken";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/newHeader";
import { NavLink, useLocation } from "react-router-dom";
import TellerList from "../components/tables/teller_table";
import jwtDecode from "jwt-decode";
import { addTeller } from "./../redux/reducer/tellerSlice";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "white",
    }}
    spin
  />
);
const NewTellerDashboard = () => {
  const [setIsModalVisible] = useState(false);
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.tellers);
  const location = useLocation();
  const [, setPartnerIdFilled] = useState(true);
  const [, setIsDrawerMegaVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const userData = getData().data?.menu_list;
  const [showPopModal, setShowPopModal] = useState(false);
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  const handleModalOpen = () => {
    setShowPopModal(true);
  };

  const handleModalClose = () => {
    setShowPopModal(false);
  };

  const handleOnChange = (key, value) => {
    setFormData(() => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  const showDrawerMega = () => {
    setIsDrawerMegaVisible(true);
  };

  const authState = useSelector((state) => state.user);
  console.log("Auth State >>>", authState);

  useEffect(() => {
    dispatch(login({ user_name, password }))
      .then((response) => {
        setUser_name("");
        setPassword("");
        setIsLoading(false);
        console.log("Response from login action:", response);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setIsLoading(false);
      });
  }, [dispatch, user_name, password]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  console.log(toggleDarkMode);
  const showModal = () => {
    setIsModalVisible(true);
  };
  console.log(showModal);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log(handleCancel);

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const combinedData = {
      ...formData,
      created_by: decode.user_id,
      distributor_id: decode.user_id,
    };
    try {
      dispatch(addTeller(combinedData));
      setTimeout(() => {
        setShowPopModal(false);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-custom-dark-blue h-full font-poppins">
      <div className="flex gap-1">
        <div
          className="flex-1 lg:text-xs  md:text-xs h-screen"
          style={{ flexBasis: "12%" }}
        >
          <label>
            <span className="text-white font-semibold text-4xl flex mt-10 mx-7">
              D<p className="text-custom-yellow">s</p>M
            </span>
          </label>
          <div className="text-custom-gray mx-3 mt-20">
            <ul className="my-4">
              <li
                className={`my-7 ${location.pathname === "/" ? "active" : ""}`}
              >
                <a href="/" className="flex gap-2">
                  <img src={Trans} alt="trans" className="h-fit" />
                  <p>Overview</p>
                </a>
              </li>
              <li
                className={`my-7 ${
                  location.pathname === "/transactions" ? "active" : ""
                }`}
              >
                <a href="/transactions" className="flex gap-2">
                  <img src={Trans} alt="trans" className="h-fit" />
                  <p>Transactions</p>
                </a>
              </li>
              <li
                className={`my-7 ${
                  location.pathname === "/subscriber" ? "active" : ""
                }`}
              >
                <a href="/subscribers" className="flex gap-2">
                  <img src={Subsc} alt="trans" className="h-fit" />
                  <p>Subscriptions</p>
                </a>
              </li>
              <li
                className={`my-7 ${
                  location.pathname === "/usage-analysis" ? "active" : ""
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
                    className="relative ml-3 group hover:bg-custom-dark-blue hover:text-white py-4 px-5"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink
                      to={
                        parentOption.menu_title === "Distributors"
                          ? "/distributors"
                          : parentOption.menu_title === "Tellers"
                          ? "/teller_list"
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
                            .filter(
                              (childOption) => childOption.on_menu === "yes"
                            )
                            .map((childOption, childIndex) => (
                              <li
                                key={childIndex}
                                className="text-white py-2 px-4 hover:text-black text-sm"
                              >
                                <NavLink
                                  to={
                                    childOption.menu_title === "All Tellers"
                                      ? "/teller_list"
                                      : childOption.menu_title === "New Teller"
                                      ? showPopModal
                                      : childOption.menu_title ===
                                        "New Super Dealer"
                                      ? showDrawerMega
                                      : childOption.menu_title ===
                                        "Teller Top Ups"
                                      ? "/teller_topup"
                                      : undefined
                                  }
                                  onClick={
                                    childOption.menu_title === "New Teller"
                                      ? handleModalOpen
                                      : undefined
                                  }
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
            {showPopModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white px-4 rounded-md">
                  <div>
                    <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
                      <ToastContainer position="top-right" autoClose={5000} />
                      <div className="flex justify-between">
                        <label className="text-lg text-custom-light-blue">
                          Create New Teller
                        </label>
                        <label
                          className="text-lg text-red-500 cursor-pointer hover:bg-custom-red hover:text-white px-2 rounded-full"
                          onClick={handleModalClose}
                        >
                          X
                        </label>
                      </div>

                      <div className="grid grid-cols-2 text-custom-gray gap-6">
                        <div className="col-span-1">
                          <label>User Name</label>
                          <br />
                          <input
                            type="text"
                            value={formData.user_name}
                            onChange={(e) =>
                              handleOnChange("user_name", e.target.value)
                            }
                            placeholder="E.g: muhDar"
                            className="block w-full outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                          />
                        </div>
                        <div className="col-span-1">
                          <label>Full Name</label>
                          <br />
                          <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) =>
                              handleOnChange("full_name", e.target.value)
                            }
                            required
                            placeholder="E.g: Muheto Darius"
                            className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 text-custom-gray gap-6">
                        {" "}
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
                      </div>
                      <div className="w-full">
                        <button
                          type="button"
                          className="bg-custom-light-blue text-custom-white px-2 mt-4 rounded-md py-2 w-full"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spin indicator={antIcon} />
                          ) : (
                            "Create Teller"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex-1 bg-custom-light-white h-screen my-1 rounded-lg pt-5 px-5"
          style={{ flexBasis: "90%" }}
        >
          <Header />
          <div className="mt-16">
            <TellerList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewTellerDashboard;

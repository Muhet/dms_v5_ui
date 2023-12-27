import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { CiWallet } from "react-icons/ci";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Modal, Popover } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdOutlineModeEdit, MdOutlineDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getTellers,
  addTeller,
  topupTeller,
  updateTeller,
} from "../../redux/reducer/tellerSlice";
import { getDistributors } from "../../redux/reducer/distributorSlice";
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

const DistributorTable = () => {
  const dispatch = useDispatch();
  const [currentPage] = useState(1);
  const [, setSearchTerm] = useState("");
  const { tellers, tellertopup, loading } = useSelector(
    (state) => state.tellers
  );
  const [, setIsLoading] = useState(false);
  const { distributors } = useSelector((state) => state.distributors);
  const [, setPartnerIdFilled] = useState(true);
  const [pageSize] = useState(5);
  const [, updatedData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(false);
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const [showNewDistributorForm, setShowNewDistributorForm] = useState(false);
  const [showTellerUpdateForm, setShowTellerUpdateForm] = useState(false);
  const [selectedTellerId, setSelectedTellerId] = useState(null);
  let selectedDistributors = null;
  let selectedTellers = null;
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  useEffect(() => {
    dispatch(getTellers(currentPage, pageSize));
    dispatch(getDistributors(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handleNewDistributorClick = () => {
    setShowNewDistributorForm(true);
  };
  const handleOpenTellerUpdateForm = (pdt_id) => {
    setSelectedTellerId(pdt_id);
    const foundTeller = tellers.find((distrib) => distrib.teller_id === pdt_id);
    if (foundTeller) {
      selectedTellers = { ...foundTeller };
      delete selectedTellers.teller_id;
      delete selectedTellers.teller_account_balance;
      delete selectedTellers.teller_available_balance;
      delete selectedTellers.last_updated_at;
      delete selectedTellers.last_update_to;
      delete selectedTellers.last_updated_by;
    } else {
      // Handle the case where no distributor is found
    }
    setShowTellerUpdateForm(true);
    setFormData({ ...selectedTellers, created_by: decode.user_id });
  };
  useEffect(() => {
    if (updatedData[0]) {
      setFormData(updatedData[0]);
    }
  }, [tellertopup, updatedData]);
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
        setShowNewDistributorForm(false);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };
  const handleTellerUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      updateTeller({
        created_by: decode.user_id,
        tellerId: selectedTellerId,
        updatedData: formData,
      })
    )
      .then(() => {
        setShowTellerUpdateForm(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsLoading(false);
  };
  const handleNewDistributorCancel = () => {
    setShowNewDistributorForm(false);
  };
  const handleTellerUpdateCancel = () => {
    setShowTellerUpdateForm(false);
  };
  const handleRadioChange = (e) => {
    const status = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      teller_status: status,
    }));
  };
  const handleOnChange = (key, value) => {
    setFormData(() => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  const getDistributorFullName = (distributorId) => {
    const distributor = distributors.find(
      (d) => d.distributor_id === distributorId
    );
    return distributor ? distributor.dist_full_name : "";
  };
  const showModal = (pdt_id) => {
    setSelectedDistributorId(pdt_id);
    console.log("TellerId", tellers);
    const foundDistributor = tellers.find(
      (distrib) => distrib.teller_id === pdt_id
    );
    if (foundDistributor) {
      selectedDistributors = { ...foundDistributor };
      delete selectedDistributors.teller_id;
      delete selectedDistributors.teller_status;
      delete selectedDistributors.full_name;
      delete selectedDistributors.user_name;
      delete selectedDistributors.telephone_number;
      delete selectedDistributors.email_address;
      delete selectedDistributors.teller_account_balance;
      delete selectedDistributors.teller_available_balance;
      delete selectedDistributors.last_updated_at;
      delete selectedDistributors.last_update_to;
      delete selectedDistributors.last_updated_by;
      delete selectedDistributors.distributor_id;
    } else {
      // Handle the case where no distributor is found
    }

    setIsModalOpen(true);
    setFormData({ ...selectedDistributors });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmitTopup = (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
      created_by: decode.user_id,
      teller_id: selectedDistributorId,
    };
    dispatch(topupTeller(combinedData));
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  };
  const userTellers = tellers.filter(
    (teller) => teller && teller.distributor_id === decode.user_id
  );
  const openTopupDrawer = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="text-xs">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="flex justify-between">
        <label className="font-normal">All Tellers</label>
        <button
          className="text-xs bg-custom-light-blue font-light
         text-custom-white px-4 py-3 rounded-md "
          onClick={handleNewDistributorClick}
        >
          Add New Teller
        </button>
      </div>
      <Modal
        title={
          <div
            style={{
              fontSize: "20px",
              color: "#0095DA",
              marginBottom: "50px",
            }}
          >
            Top Up Account
          </div>
        }
        visible={isModalOpen}
        onOk={handleSubmitTopup}
        onCancel={handleCancel}
      >
        <form>
          <ToastContainer position="top-right" autoClose={5000} />
          <div className="mb-5">
            <label className="text-gray-500">
              Account Name / Teller ID{" "}
              <span className="text-custom-red">*</span>
            </label>

            <input
              type="text"
              value={selectedDistributorId}
              onChange={(e) => handleOnChange("user_name", e.target.value)}
              placeholder="E.g: 12345"
              className="block w-full mt-2 outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
            />
          </div>
          <div className="mb-5">
            <label className="text-gray-500">
              Top Up Amount <span className="text-custom-red">*</span>
            </label>

            <input
              type="text"
              value={formData.topup_amount}
              onChange={(e) => handleOnChange("topup_amount", e.target.value)}
              required
              placeholder="E.g: 50000"
              className="block w-full mt-2 outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
            />
          </div>
        </form>
      </Modal>
      {showNewDistributorForm && (
        <div>
          <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="grid grid-cols-3 text-custom-gray gap-6">
              <div className="col-span-1">
                <label>User Name</label>
                <br />
                <input
                  type="text"
                  value={formData.user_name}
                  onChange={(e) => handleOnChange("user_name", e.target.value)}
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
                  onChange={(e) => handleOnChange("full_name", e.target.value)}
                  required
                  placeholder="E.g: Muheto Darius"
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
            </div>
            <div className="grid grid-cols-6 text-custom-gray gap-6">
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

              <di></di>
              <di></di>
              <di></di>
              <div className="space-x-5 flex">
                <button
                  type="button"
                  className="text-custom-red mt-4"
                  onClick={handleNewDistributorCancel}
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="bg-custom-light-blue text-custom-white px-2 mt-4 rounded-md"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <Spin indicator={antIcon} /> : "Create Teller"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <>
        {showTellerUpdateForm && (
          <div className="my-5">
            <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
              <div>
                <label className="text-custom-light-blue mb-4">
                  Teller Update Form
                </label>
              </div>
              <ToastContainer position="top-right" autoClose={5000} />
              <div className="grid grid-cols-3 text-custom-gray gap-6">
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
              </div>
              <div className="grid grid-cols-6 text-custom-gray gap-6">
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
                  <label>Teller Availability</label>
                  <br />
                  <span className="flex gap-4 mt-1 text-black">
                    <span className="flex gap-1">
                      <input
                        type="radio"
                        name="verificationStatus"
                        value="active"
                        onChange={handleRadioChange}
                        checked={formData.teller_status === "active"}
                        className="form-radio h-5 w-5 mr-1  mt-2 text-custom-green"
                      />
                      <label className="mt-1.5">Active</label>
                    </span>
                    <span className="flex gap-1">
                      <input
                        type="radio"
                        name="verificationStatus"
                        value="inactive"
                        onChange={handleRadioChange}
                        checked={formData.teller_status === "inactive"}
                        className="form-radio h-5 w-5 mr-1  mt-2 text-custom-green"
                      />
                      <label className="mt-1.5">InActive</label>
                    </span>
                  </span>
                </div>
                <di></di>
                <di></di>
                <di></di>
                <div className="space-x-5 flex">
                  <button
                    type="button"
                    className="text-custom-red mt-4"
                    onClick={handleTellerUpdateCancel}
                  >
                    cancel
                  </button>
                  <button
                    type="button"
                    className="bg-custom-light-blue text-custom-white px-2 mt-4 rounded-md"
                    onClick={handleTellerUpdate}
                    disabled={loading}
                  >
                    {loading ? <Spin indicator={antIcon} /> : "Update Teller"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </>
      <div className="bg-custom-white w-full p-5 my-5 rounded-md">
        <div className="flex items-center border rounded-md mb-4 pb-2 w-[20%] px-2">
          <FaSearch className="text-gray-500 mr-2 mt-1.5" />
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none text-gray-800 pt-1.5"
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
                  Report To
                </th>
                <th scope="col" className="px-1 py-4">
                  Full Name
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
            <tbody className="">
              {userTellers.map((teller) => (
                <tr className="border-b dark:border-neutral-100 text-black font-extralight text-xs">
                  <td className="whitespace-nowrap px-1 py-4">
                    {teller.teller_id}
                  </td>
                  <td key={teller.id} className="whitespace-nowrap px-1 py-4">
                    {getDistributorFullName(teller.distributor_id)}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    {teller.full_name}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    {teller.email_address}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    {teller.telephone_number}
                  </td>

                  <td className="whitespace-nowrap px-1 py-4">
                    {teller.teller_available_balance}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4">
                    <label
                      className={`rounded-md py-1  rounded-md ${
                        teller.teller_status === "active"
                          ? "text-custom-light-blue bg-custom-sky px-4"
                          : teller.teller_status === "inactive"
                          ? "bg-custom-light-orange text-custom-orange px-4"
                          : ""
                      }`}
                    >
                      {teller.teller_status}
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
                                handleOpenTellerUpdateForm(teller.teller_id)
                              }
                            >
                              Edit Teller
                            </label>
                          </span>
                          <br />
                          <span className="flex">
                            <label className="mt-1">
                              <CiWallet />
                            </label>
                            <label
                              className="cursor-pointer px-3 hover:text-custom-light-blue"
                              onClick={() => showModal(teller?.teller_id)}
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
                              onClick={() => openTopupDrawer(teller?.teller_id)}
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
      </div>
    </div>
  );
};
export default DistributorTable;

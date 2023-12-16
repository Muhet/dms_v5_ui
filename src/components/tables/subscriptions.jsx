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
import { getTellerTopups } from "../../redux/reducer/tellerSlice";
import { getDistributors } from "../../redux/reducer/distributorSlice";
import { format } from "date-fns";
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

const distributorTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [setFilteredDistributors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const { tellers, teller, tellertopups, loading } = useSelector(
    (state) => state.tellers
  );
  const [isLoading, setIsLoading] = useState(false);

  const [, setPartnerIdFilled] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [, updatedData] = useState({});
  const [, setTableHeight] = useState("");
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState({});
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);
  const [selectedDistributorForEdit, setSelectedDistributorForEdit] = useState(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const [verificationRequest, setVerificationRequest] = useState({});
  const [selectedRadio, setSelectedRadio] = useState("");
  const [showNewDistributorForm, setShowNewDistributorForm] = useState(false);
  const [showTellerUpdateForm, setShowTellerUpdateForm] = useState(false);
  const [newDistributorFormData, setNewDistributorFormData] = useState({});
  const [selectedTellerId, setSelectedTellerId] = useState(null);
  let selectedDistributors = null;
  let selectedTellers = null;
  const access_token = getToken();
  const decode = jwtDecode(access_token);

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
  }, [tellertopups, updatedData]);
  /*   const handleSubmit = (e) => {
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
  }; */
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
  useEffect(() => {
    dispatch(getTellerTopups());
  }, [dispatch]);
  const userTellers = tellers.filter(
    (teller) => teller && teller.distributor_id === decode.user_id
  );

  return (
    <div className="text-xs">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="flex flex-col">
        <label className="font-bold text-lg text-custom-deep">
          Renew Subscription
        </label>
        <label className="text-xs text-custom-gray font-light">
          You may also renew a subscription
        </label>
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
      ></Modal>
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
          <div className="max-h-[40rem] overflow-y-auto">
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
                            {/* <span className="flex">
                              <label className="mt-1">
                                <CiWallet />
                              </label>
                              <label
                                className="cursor-pointer px-3 hover:text-custom-light-blue"
                                onClick={() => showModal(teller?.teller_id)}
                              >
                                Top up Acc.
                              </label>
                            </span> */}
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
        </div>
      </div>
    </div>
  );
};
export default distributorTable;

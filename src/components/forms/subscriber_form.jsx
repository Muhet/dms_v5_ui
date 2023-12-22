import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";

import { FaCircleExclamation } from "react-icons/fa6";
import { GoCheckCircleFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getDistributors } from "../../redux/reducer/distributorSlice";
import StepTwo from "../../assets/images/icons/Rectangle 2113.png";
import { getToken } from "../../utils/authToken";
import jwtDecode from "jwt-decode";
const DistributorTable = () => {
  const dispatch = useDispatch();
  const [currentPage] = useState(1);
  const [pageSize] = useState(5);
  const [step, setStep] = useState(1);
  const [, setSelectedSectorId] = useState("");
  const [formData, setFormData] = useState({});
  const { district } = useSelector((state) => state.distributors);
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  useEffect(() => {
    dispatch(getDistributors(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handleNextButtonClick = () => {
    if (step === 1) {
      setStep(2);
    }
  };
  const handlePrevButtonClick = () => {
    if (step === 2) {
      setStep(1);
    }
  };
  console.log(decode);
  const handleOnChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="">
      <div className="flex flex-col md:-mt-10">
        <label className="font-bold text-lg text-custom-deep">
          New Subscriber
        </label>
        <label className="text-xs text-custom-gray font-normal">
          You may also edit your profile
        </label>
      </div>
      <div className="bg-custom-white w-full p-5 my-5 rounded-md">
        {step === 1 && (
          <div className="grid grid-cols-2 mb-10">
            <div className="col-span-1">
              <span className="flex gap-3 mx-5">
                <GoCheckCircleFill className="text-custom-yellow" size={25} />
                <label className="mt-1 text-sm">Create a User</label>
                <img src={StepTwo} alt="" className="h-0.5 mt-3.5 w-max" />
              </span>
            </div>
            <div className="col-span-1">
              <span className="flex gap-3 mx-5">
                <FaCircleExclamation
                  className="text-custom-light-gray"
                  size={25}
                />

                <label className="mt-1 text-sm">Choose package</label>
                <img src={StepTwo} alt="" className="h-0.5 mt-3.5 w-max" />
              </span>
            </div>
          </div>
        )}
        {step === 1 && (
          <form className="border rounded-md p-5">
            <span className="grid grid-cols-5 gap-6">
              <span className="col-span-2">
                <label className="text-custom-gray text-sm">
                  Client Device ID
                </label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="E.g: 134 - 959 - 693"
                  className="block w-full outline-none rounded-md px-4 py-2 text-gray-900 mb-4 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
                <label className="text-custom-gray text-sm">Device No:</label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="E.g: 1039 - 7263 - 9281 - 3452"
                  className="block w-full outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </span>
              <span className="col-span-3">
                <label className="text-custom-gray text-sm">
                  Client Full Name
                </label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="E.g: E.g NDAHIRO Jean Aimee"
                  className="block w-full outline-none rounded-md px-4 mb-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
                <label className="text-custom-gray text-sm">
                  Client Email Address
                </label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="E.g: jean.aime.ndahiro@dsm.rw"
                  className="block w-full outline-none mb-4 rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </span>
            </span>
            <span className="grid grid-cols-9 gap-6">
              <span className="col-span-5">
                <label className="text-custom-gray text-sm">
                  Client Phone Number
                </label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="E.g: 0783 748 728"
                  className="block w-full outline-none mb-4 rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </span>
              <span className="col-span-4">
                <label className="text-custom-gray text-sm">
                  Client Address
                </label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="jean.aime.ndahiro@dsm.rw"
                  className="block w-full outline-none mb-4 rounded-md px-4 md:py-6 2xl:py-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </span>
            </span>
            <button
              className="text-xs bg-custom-light-blue font-light text-custom-white px-4 py-3 rounded-md mt-5 md:-mt-10"
              onClick={handleNextButtonClick}
            >
              Proceed
            </button>
          </form>
        )}
        {step === 2 && (
          <div className="grid grid-cols-2 mb-10">
            <div className="col-span-1">
              <span className="flex gap-3 mx-5">
                <GoCheckCircleFill
                  className="text-custom-light-blue"
                  size={25}
                />
                <label className="mt-1 text-sm">Create a User</label>
                <img src={StepTwo} alt="" className="h-0.5 mt-3.5 w-max" />
              </span>
            </div>
            <div className="col-span-1">
              <span className="flex gap-3 mx-5">
                <FaCircleExclamation className="text-custom-yellow" size={25} />

                <label className="mt-1 text-sm">Choose package</label>
                <img src={StepTwo} alt="" className="h-0.5 mt-3.5 w-max" />
              </span>
            </div>
          </div>
        )}
        {step === 2 && (
          <form className="border rounded-md p-5">
            <span className="grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <label className="text-custom-gray text-sm">
                  Select Broadcast
                </label>
                <br />
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    /*    handleOnDestChange("sector", e.target.value);
                    handleSectorChange(e.target.value); */
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">Choose a broadcast</option>
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
                <label className="text-custom-gray text-sm">
                  Select Equipment
                </label>
                <br />
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    /*    handleOnDestChange("sector", e.target.value);
                    handleSectorChange(e.target.value); */
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">Choose Equipment</option>
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
                <label className="text-custom-gray text-sm">
                  Select Bouquet
                </label>
                <br />
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    /*    handleOnDestChange("sector", e.target.value);
                    handleSectorChange(e.target.value); */
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">Choose a bouquet</option>
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
            </span>
            <span className="grid grid-cols-4 gap-6 md:mt-5">
              <div className="col-span-1 text-custom-gray text-sm">
                <Checkbox
                  onChange={onChange}
                  className="text-custom-gray text-sm"
                >
                  Add on DSTV French
                </Checkbox>
              </div>
              <div className="col-span-1 text-custom-gray text-sm">
                <Checkbox
                  onChange={onChange}
                  className="text-custom-gray text-sm"
                >
                  Add on French Touch
                </Checkbox>
              </div>
              <div className="col-span-1">
                <Checkbox
                  onChange={onChange}
                  className="text-custom-gray text-sm"
                >
                  Cable Coax able PG11
                </Checkbox>
              </div>
              <div className="col-span-1 ">
                <Checkbox
                  onChange={onChange}
                  className="text-custom-gray text-sm"
                >
                  Add on DSTV French Plus
                </Checkbox>
              </div>
            </span>
            <span className="grid grid-cols-3 gap-6 mt-5">
              <div className="col-span-1">
                <label className="text-custom- text-sm">Select Duration</label>
                <br />
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    /*    handleOnDestChange("sector", e.target.value);
                    handleSectorChange(e.target.value); */
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">Choose duration</option>
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
                <label className="text-custom-gray text-sm">
                  Select Currency
                </label>
                <br />
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    /*    handleOnDestChange("sector", e.target.value);
                    handleSectorChange(e.target.value); */
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">Rwf</option>
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
                <label className="text-custom-gray text-sm">
                  Select Payment Method
                </label>
                <br />
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    /*    handleOnDestChange("sector", e.target.value);
                    handleSectorChange(e.target.value); */
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">Choose payment method</option>
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
            </span>
            <span className="grid grid-cols-9 gap-6 mt-5">
              <span className="col-span-5">
                <label className="text-custom-gray text-sm">Amount Due</label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="E.g: 30,000"
                  className="block w-full outline-none mb-4 rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </span>
              <span className="col-span-4 ">
                <label className="text-custom-gray text-sm">
                  Payment Details
                </label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder=""
                  className="block w-full outline-none mb-4 rounded-md px-4 2xl:py-10 md:py-5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </span>
            </span>
            <div className="flex justify-between mt-10">
              <button
                className="text-xs bg-custom-green font-light
         text-custom-white px-4 py-3 rounded-md mt-5 md:-mt-10"
                onClick={handlePrevButtonClick}
              >
                Back
              </button>
              <button
                className="text-xs bg-custom-light-blue font-light
         text-custom-white px-4 py-3 rounded-md mt-5 md:-mt-10"
                onClick=""
              >
                Complete
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default DistributorTable;

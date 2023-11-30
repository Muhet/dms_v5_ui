import React, { useState, useEffect } from "react";
import { getTellers, addTeller } from "../redux/reducer/tellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../utils/authToken";
import jwtDecode from "jwt-decode";

const Table = ({ closeDrawer }) => {
  const dispatch = useDispatch();
  const [currentPage] = useState(1);
  const [formData, setFormData] = useState({});
  const { teller } = useSelector((state) => state.tellers);
  const [, setPartnerIdFilled] = useState(true);
  const [pageSize] = useState(5);

  const [updatedData] = useState({});
  const token = getToken();
  const decode = jwtDecode(token);
  useEffect(() => {
    if (updatedData[0]) {
      setFormData(updatedData[0]);
    }
  }, [teller, updatedData]);
  const handleOnChange = (key, value) => {
    setFormData((e) => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };

  useEffect(() => {
    dispatch(getTellers(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
      created_by: decode.user_id,
      distributor_id: decode.user_id,
    };
    dispatch(addTeller(combinedData));
  };

  return (
    <form className="space-y-6" action="#" method="POST">
      <ToastContainer position="top-right" autoClose={5000} />

      <div>
        <label
          htmlFor="user_name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          User Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={formData.user_name}
            onChange={(e) => handleOnChange("user_name", e.target.value)}
            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Full Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => handleOnChange("full_name", e.target.value)}
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

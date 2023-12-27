import React, { useState, useEffect } from "react";

import { NavLink, useParams } from "react-router-dom";
import {
  getTellers,
  topupTeller,
  updateTeller,
} from "../redux/reducer/tellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../utils/authToken";
import jwtDecode from "jwt-decode";

const Table = ({ closeDrawer }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const { tellers, tellertopup } = useSelector((state) => state.tellers);
  const [, setPartnerIdFilled] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page] = useState(1);
  const [, updatedData] = useState({});
  const token = getToken();
  const decode = jwtDecode(token);
  const [setIsDetailModalVisible] = useState(false);
  const [setSelectedDistributor] = useState({});
  const [setIsUpdateDrawerVisible] = useState(false);
  const [setSelectedDistributorForEdit] = useState({});
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  let selectedDistributors = null;

  const openUpdateDrawer = (pdt_id) => {
    setSelectedDistributorId(pdt_id);
    console.log("TellerId", tellers);
    const foundDistributor = tellers.find(
      (distrib) => distrib.teller_id === pdt_id
    );
    console.log(openUpdateDrawer);

    if (foundDistributor) {
      selectedDistributors = { ...foundDistributor };
      delete selectedDistributors.teller_id;
      delete selectedDistributors.teller_account_balance;
      delete selectedDistributors.teller_available_balance;
      delete selectedDistributors.last_updated_at;
      delete selectedDistributors.last_update_to;
      delete selectedDistributors.last_updated_by;
    } else {
      // Handle the case where no distributor is found
    }

    setIsUpdateDrawerVisible(true);
    setFormData({ ...selectedDistributors });
  };

  const closeUpdateDrawer = () => {
    setIsUpdateDrawerVisible(false);
    setSelectedDistributorForEdit({});
  };
  console.log(closeUpdateDrawer);
  /* const handleUpdate = () => {
    console.log("Dispatched Data:", formData);
    console.log("Dispatched TellerID:", selectedDistributorId);
    dispatch(
      updateTeller({
        tellerId: selectedDistributorId,
        updatedData: formData,
      })
    );
  }; */

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
  }, [tellertopup, updatedData]);
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

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  console.log(handlePageSizeChange);
  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
      created_by: decode.user_id,
    };
    dispatch(topupTeller(combinedData));
  };

  console.log("Teller Response>>>", tellertopup);
  return (
    <form className="space-y-6" action="#" method="POST">
      <ToastContainer position="top-right" autoClose={5000} />

      <div>
        <label
          htmlFor="teller_id"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Teller ID
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={selectedDistributorId}
            onChange={(e) => handleOnChange("teller_id", e.target.value)}
            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Topup Amount
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={formData.topup_amount}
            onChange={(e) => handleOnChange("topup_amount", e.target.value)}
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
          Top Up
        </button>
      </div>
    </form>
  );
};
export default Table;

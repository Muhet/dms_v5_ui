import React, { useState, useEffect } from "react";
import Trans from "./../assets/images/icons/transactions.png";
import Subsc from "./../assets/images/icons/subscriptions.png";
import { login } from "../redux/action/userAction";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import UsageAn from "./../assets/images/icons/usageAnalysis.png";
import Dist from "./../assets/images/icons/distributors.png";
import subs from "./../assets/images/icons/add_notes.png";
import renewal from "./../assets/images/icons/source_notes.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, getToken } from "../utils/authToken";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/newHeader";
import { NavLink, Outlet } from "react-router-dom";
import { addTeller } from "../redux/reducer/tellerSlice";

import SubscriberList from "../components/tables/subscriptions";
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
const newTellerDashboard = () => {
  const [setIsModalVisible] = useState(false);
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const { tellers, teller, tellertopups, loading } = useSelector(
    (state) => state.tellers
  );
  const [, setPartnerIdFilled] = useState(true);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDrawerDisVisible, setIsDrawerDisVisible] = useState(false);
  const [isDrawerMegaVisible, setIsDrawerMegaVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const [isWebSettingsVisible, setIsWebSettingsVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const userData = getData().data?.menu_list;
  const [showPopModal, setShowPopModal] = useState(false);
  const access_token = getToken();
  const decode = jwtDecode(access_token);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleSubscriptionHoverEnter = () => {
    setShowSubscriptionModal(true);
  };

  const handleSubscriptionHoverLeave = () => {
    setShowSubscriptionModal(false);
  };
  const handleModalOpen = () => {
    setShowPopModal(true);
  };

  const handleModalClose = () => {
    setShowPopModal(false);
  };
  const showUserPopup = () => {
    setUserPopupVisible(true);
  };

  const hideUserPopup = () => {
    setUserPopupVisible(false);
  };
  const showWebSettings = () => {
    setIsWebSettingsVisible(true);
  };

  const hideWebSettings = () => {
    setIsWebSettingsVisible(false);
  };
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const handleOnChange = (key, value) => {
    setFormData(() => ({
      ...formData,
      [key]: value,
    }));

    setPartnerIdFilled(!!value);
  };
  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setIsDrawerDisVisible(false);
    setIsDrawerMegaVisible(false);
  };
  const showDrawerDis = () => {
    setIsDrawerDisVisible(true);
  };
  const showDrawerMega = () => {
    setIsDrawerMegaVisible(true);
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

  return (
    <div className="">
      <Outlet />
      {/*  <SubscriberList /> */}
    </div>
  );
};
export default newTellerDashboard;

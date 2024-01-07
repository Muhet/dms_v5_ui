import React, { useState, useEffect } from "react";
import { login } from "../redux/action/userAction";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const NewTellerDashboard = () => {
  const [setIsModalVisible] = useState(false);
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const authState = useSelector((state) => state.user);
  console.log("Auth State >>>", authState);

  useEffect(() => {
    dispatch(login({ user_name, password }))
      .then((response) => {
        setUser_name("");
        setPassword("");
        setIsLoading(false);
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

  return (
    <div className="">
      <Outlet />
      {/*  <SubscriberList /> */}
    </div>
  );
};
export default NewTellerDashboard;

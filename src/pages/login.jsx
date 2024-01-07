import React, { useState, useEffect } from "react";
import ImageOne from "../assets/images/DSM.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action/userAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
import { selectStatus, selectError, reset } from "../redux/reducer/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  useEffect(() => {
    if (status === "succeeded") {
      setIsLoading(false);
    } else if (status === "failed") {
      setIsLoading(false);
    } else if (status === "loading") {
      setIsLoading(true);
    }
    dispatch(reset());
  }, [status, error, dispatch]);

  const handleLogin = () => {
    if (!user_name || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (user_name === "") {
        toast.error("Username field should not be empty.");
      } else if (password === "") {
        toast.error("password field should not be empty.");
      }
      dispatch(login({ user_name, password }))
        .then(() => {
          setUser_name("");
          setPassword("");
          setIsLoading(false);
        })
        .catch((error) => {});
      setIsLoading(false);
    }, 1000);
  };
  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem(
        "rememberedCredentials",
        JSON.stringify({
          /* your data */
        })
      );
    } else {
      localStorage.removeItem("rememberedCredentials");
    }
  }, [rememberMe]);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <>
      <div className="grid grid-cols-7 h-screen">
        <div className="col-span-4">
          <form className="min-h-screen font-poppins flex items-center justify-center w-full h-full">
            <div className="animate__animated animate__fadeIn w-96">
              <label className="text-3xl font-bold text-left text-custom-dark-blue">
                Welcome Back
              </label>
              <h5 className="text-s font-light text-custom-gray mb-8 text-left">
                Enter your username and password to sign in
              </h5>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 text-xs mb-1"
                >
                  User Name
                </label>

                <input
                  type="email"
                  id="email"
                  className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:custom-dark-blue transition duration-300 ease-in-out transform hover:scale-105"
                  value={user_name}
                  onChange={(e) => setUser_name(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-gray-600 text-xs mb-1"
                >
                  Password
                </label>
                <input
                  className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:custom-dark-blue transition duration-300 ease-in-out transform hover:scale-105 mb-2"
                  autoComplete="off"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="eye-icon absolute right-3 top-2/4 transform -translate-y-2/4"
                >
                  <FontAwesomeIcon
                    className="mt-7 text-custom-dark-bue"
                    icon={passwordVisible ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              <div className="mb-8">
                <label className="text-xs text-custom-gray gap-3">
                  <label className="mr-1">Remember Me</label>
                  <input
                    type="checkbox"
                    className="mt-2"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                </label>
              </div>
              <div className="text-center">
                <Spin spinning={isLoading} tip="Sign in...">
                  <button
                    className="bg-custom-dark-blue w-full text-white font-semibold py-2 px-4 rounded-md"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    LOG IN
                  </button>
                </Spin>
              </div>
              <div className="flex gap-1 mt-4">
                <label className="text-custom-gray text-sm">
                  If you do not have an account
                </label>
                <a href="#" className="text-custom-dark-blue text-sm">
                  Sign In
                </a>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-3">
          <div className="bg-custom-dark-blue p-4 w-90 rounded-bl-3xl text-center">
            <label className="relative">
              <img
                src={ImageOne}
                alt=""
                className="h-full -ml-5 -mr-20 -my-5"
              />
            </label>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <div className="flex items-center justify-center -mt-10 text-custom-gray font-poppins">
        <label className="text-center ">
          @ 2024, Made by <span className="text-custom-dark-blue">Mvend </span>
          Team for a better web
        </label>
      </div>
    </>
  );
};

export default Login;

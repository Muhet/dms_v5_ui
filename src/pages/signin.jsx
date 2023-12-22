import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action/userAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiLockedDoor } from "react-icons/gi";
import { Spin } from "antd";
import { selectStatus, selectError, reset } from "../redux/reducer/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible] = useState(false);
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
    // Basic form validation
    if (!user_name || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Simulate an API call for authentication
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

  return (
    <div className="min-h-screen flex items-center rounded-md font-sans justify-center bg-gradient-to-b from-blue-200 to-slate-100 w-full h-full">
      <div className="bg-white p-8 rounded border-t border-gray-400 shadow-md w-96 animate__animated animate__fadeIn">
        <div className="flex justify-center items-start mb-4">
          <div className="shadow-md rounded-full border-t border-gray-600 p-4 relative -mt-14 bg-white">
            <label className="text-center text-sky-600">
              <GiLockedDoor size={25} />
            </label>
          </div>
        </div>

        <h2 className="text-2xl font-medium mb-4">
          <span className="text-sky-600 font-semibold">DSM</span> Login
        </h2>
        <h5 className="text-gl font-light mb-4 text-center">
          Welcome again!. We missed you
        </h5>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-xs mb-1">
            User Name
          </label>

          <input
            type="email"
            id="email"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 text-xs mb-1"
          >
            Password
          </label>
          <input
            type={passwordVisible}
            id="password"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <a
            href="/forgetpwd"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <div className="mb-4 text-center">
          <Spin spinning={isLoading} tip="Logging in...">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleLogin}
              disabled={isLoading}
            >
              Login
            </button>
          </Spin>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;

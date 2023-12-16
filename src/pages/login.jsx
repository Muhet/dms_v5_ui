import React from "react";
import ImageOne from "../assets/images/image1.png";

const Login = () => {
  return (
    <div className="grid grid-cols-7 h-screen">
      <div className="col-span-4"></div>
      <div className="col-span-3">
        <div className="bg-custom-dark-blue p-4 w-90 rounded-bl-3xl text-center">
          <label className="relative">
            <img src={ImageOne} alt="" className="h-full" />
          </label>
          <label className="text-white">DSM</label>
          <label className="absolute -mt-80">
            <img src={ImageOne} alt="" className="h-full" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;

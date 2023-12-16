import React from "react";
import Header from "../components/newHeader";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/Navbar/nav_bar";
import DistList from "../components/tables/distributor_table";
const newDashboard = () => {
  return (
    <div className="bg-custom-dark-blue h-screen font-poppins">
      <div className="flex gap-1">
        <div
          className="flex-1 lg:text-xs  md:text-xs h-screen"
          style={{ flexBasis: "15%" }}
        >
          <NavBar />
        </div>
        <div
          className="flex-1 bg-custom-light-white h-screen my-1 rounded-lg pt-5 px-5"
          style={{ flexBasis: "85%" }}
        >
          <Header />
          <div className="mt-16">
            <DistList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default newDashboard;

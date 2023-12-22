import React from "react";
import Trans from "./../assets/images/icons/transactions.png";
import Subsc from "./../assets/images/icons/subscriptions.png";
import UsageAn from "./../assets/images/icons/usageAnalysis.png";
import Dist from "./../assets/images/icons/distributors.png";
import Tellers from "./../assets/images/icons/tellers.png";
import Header from "../components/newHeader";
import RequestList from "../components/tables/request_table";
const NewTellerDashboard = () => {
  return (
    <div className="bg-custom-dark-blue h-screen font-poppins">
      <div className="flex gap-1">
        <div
          className="flex-1 lg:text-xs  md:text-xs h-screen"
          style={{ flexBasis: "12%" }}
        >
          <label>
            <span className="text-white font-semibold text-4xl flex mt-10 mx-7">
              D<p className="text-custom-yellow">s</p>M
            </span>
          </label>
          <div className="text-custom-gray mx-3 mt-20">
            <ul className="my-4">
              <li className="my-7">
                <a href="/home" className="flex gap-2">
                  <img src={Trans} alt="trans" className="h-fit" />
                  <p>Overview</p>
                </a>
              </li>
              <li className="my-7">
                <a href="/transaction" className="flex gap-2">
                  <img src={Trans} alt="trans" className="h-fit" />
                  <p>Transactions</p>
                </a>
              </li>
              <li className="my-7">
                <a href="/requests" className="flex gap-2">
                  <img src={Subsc} alt="trans" className="h-fit" />
                  <p>Requests</p>
                </a>
              </li>
              <li className="my-7">
                <a href="/analyse" className="flex gap-2 my-3">
                  <img src={UsageAn} alt="trans" className="h-fit" />
                  <p>Usage Analysis</p>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-custom-gray mx-2 ">
            <label>Users</label>
            <ul className="my-4 ">
              <li className="my-2">
                <a
                  href="/home"
                  className="flex gap-2 hover:bg-custom-white duration-700 hover:bg-opacity-30 p-3 rounded-lg"
                >
                  <img src={Dist} alt="trans" className="h-fit" />
                  <p>Distributors</p>
                </a>
              </li>
              <li className="my-2">
                <a
                  href="/distributors"
                  className="flex gap-2 hover:bg-custom-white duration-700 hover:bg-opacity-30 p-3 rounded-lg"
                >
                  <img src={Tellers} alt="trans" className="h-fit" />
                  <p>Tellers</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="flex-1 bg-custom-light-white h-screen my-1 rounded-lg pt-5 px-5"
          style={{ flexBasis: "90%" }}
        >
          <Header />
          <div className="mt-16">
            <RequestList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewTellerDashboard;

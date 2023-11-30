import React from "react";

const SettingPopup = () => {
    
  return (
    <div className="w-fit bg-white shadow-lg rounded-lg absolute right-0 left-0 rounded-b-lg">
     <div className="flex rounded-t-lg rounded-b-lg justify-center py-2 px-4  cursor-pointer hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white duration-1000">
       <label className="text-lg font-bold cursor-pointer">light</label> 
       </div>
      <div className="flex rounded-t-lg rounded-b-lg justify-center py-2 px-4  cursor-pointer hover:bg-gradient-to-r from-blue-800 to-blue-500 hover:text-white duration-1000">
        <label className="text-lg font-bold cursor-pointer">Dark</label>
      </div>
    </div>
  );
};

export default SettingPopup;

import React from "react";

const DistributorFormComponent = ({
  formData,
  provinces,
  distProvince,
  district,
  sector,
  cell,
  handleOnChange,
  handleProvinceChange,
  handleDistrictChange,
  handleSectorChange,
  handleCellChange,
  handleSubmit,
  onHideNewDistributorForm,
  showNewDistributorForm,
}) => {
  return (
    <>
      {showNewDistributorForm && (
        <div>
          <form className="bg-custom-white p-4 mt-5 rounded-md text-sm space-y-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="grid grid-cols-5 text-custom-gray gap-6">
              <div className="col-span-1">
                <label>Full Name</label>
                <br />
                <input
                  type="text"
                  value={formData.dist_full_name}
                  onChange={(e) =>
                    handleOnChange("dist_full_name", e.target.value)
                  }
                  required
                  placeholder="E.g: Muheto Darius"
                  className="block w-full outline-none rounded-md px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Phone Number</label>
                <br />
                <input
                  type="text"
                  value={formData.telephone_number}
                  onChange={(e) =>
                    handleOnChange("telephone_number", e.target.value)
                  }
                  required
                  placeholder="E.g: 0789944660"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Email Address</label>
                <br />
                <input
                  type="text"
                  value={formData.email_address}
                  onChange={(e) =>
                    handleOnChange("email_address", e.target.value)
                  }
                  required
                  placeholder="E.g: muhdarius@gmail.com"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>TIN Number</label>
                <br />
                <input
                  type="text"
                  value={formData.dist_tin_no}
                  onChange={(e) =>
                    handleOnChange("dist_tin_no", e.target.value)
                  }
                  required
                  placeholder="-----------"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
              <div className="col-span-1">
                <label>Company Name</label>
                <br />
                <input
                  type="text"
                  value={formData.dist_company_name}
                  onChange={(e) =>
                    handleOnChange("dist_company_name", e.target.value)
                  }
                  required
                  placeholder="E.g: Africa XYZ"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 text-custom-gray gap-6">
              <div className="col-span-1">
                <label>Province</label>
                <br />
                <select
                  type="text"
                  value={formData?.province}
                  onChange={(e) => {
                    setSelectedProvinceId(e.target.value);
                    console.log("Selected Province ID:", e.target.value);
                    handleOnChange("province", e.target.value);
                    handleProvinceChange(e.target.value);
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="" className="text-custom-gray">
                    ---Select---
                  </option>
                  {provinces &&
                    provinces.map((province) => (
                      <option
                        key={province.province_id}
                        value={province.province_id}
                      >
                        {province.province_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-span-1">
                <label>District</label>
                <br />
                <select
                  type="text"
                  value={formData?.district}
                  onChange={(e) => {
                    setSelectedProvinceId(e.target.value);
                    handleOnChange("district", e.target.value);
                    handleDistrictChange(e.target.value);
                  }}
                  className="block w-full outline-none rounded-md px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {distProvince &&
                    distProvince.map((district) => (
                      <option
                        key={district.district_id}
                        value={district.district_id}
                      >
                        {district.district_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-1">
                <label>Sector</label>
                <br />
                <select
                  type="text"
                  value={formData?.sector}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    handleOnChange("sector", e.target.value);
                    handleSectorChange(e.target.value);
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {district &&
                    district.map((district) => (
                      <option
                        key={district.sector_id}
                        value={district.sector_id}
                      >
                        {district.sector_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-1">
                <label>Cell</label>
                <br />
                <select
                  type="text"
                  value={formData?.cell}
                  onChange={(e) => {
                    setSelectedCellId(e.target.value);
                    handleOnChange("cell", e.target.value);
                    handleCellChange(e.target.value);
                  }}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {sector &&
                    sector.map((cell) => (
                      <option key={cell.cell_id} value={cell.cell_id}>
                        {cell.cell_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-1">
                <label>village</label>
                <br />
                <select
                  type="text"
                  value={formData?.village_id}
                  onChange={(e) => handleOnChange("village_id", e.target.value)}
                  className="block w-full outline-none rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                >
                  <option value="">---Select---</option>
                  {cell &&
                    cell.map((village) => (
                      <option
                        key={village.village_id}
                        value={village.village_id}
                      >
                        {village.village_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-1">
                <label>Address</label>
                <br />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleOnChange("address", e.target.value)}
                  required
                  placeholder="E.g: KK 444 st"
                  className="block w-full outline-none rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                />
              </div>
            </div>
            <div className="flex justify-between mt-7">
              <div></div>
              <div className="space-x-8 ">
                <button
                  type="button"
                  className="text-custom-red"
                  onClick={onHideNewDistributorForm}
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="bg-custom-light-blue text-custom-white px-4 py-3 rounded-md"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default DistributorFormComponent;

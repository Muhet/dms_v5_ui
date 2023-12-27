import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HttpRequest from "../../services/HttpRequest";
import { toast } from "react-toastify";

export const getDistributors = createAsyncThunk(
  "distributors/getDistributors",
  async (page) => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors");
    }
  }
);
export const getProvinces = createAsyncThunk(
  "distributors/getProvinces",
  async () => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/geolocation`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors");
    }
  }
);
export const getDistProvince = createAsyncThunk(
  "distributors/getDistProvince",
  async ({ province_id }) => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/geolocation/inprovince/${province_id}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors");
    }
  }
);
export const getDistrict = createAsyncThunk(
  "distributors/getDistrict",
  async ({ sector_id }) => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/geolocation/indistrict/${sector_id}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors");
    }
  }
);
export const getSector = createAsyncThunk(
  "distributors/getSector",
  async ({ sector_id }) => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/geolocation/insector/${sector_id}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors");
    }
  }
);
export const getCell = createAsyncThunk(
  "distributors/getCell",
  async ({ cell_id }) => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/geolocation/incell/${cell_id}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors");
    }
  }
);
export const getDistributorTopUps = createAsyncThunk(
  "distributors/getDistributorTopUps",
  async (page) => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors/topup?limit=100`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors top ups");
    }
  }
);
export const getDistributor = createAsyncThunk(
  "distributors/getDistributor",
  async (id) => {
    const distributorId = id;
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL}/distributors/${distributorId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch member");
    }
  }
);
export const getDistByDistId = createAsyncThunk(
  "distributors/getDistByDistId",
  async (id) => {
    const distributorId = id;
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors/topup/bydist/${distributorId}`
      );
      console.log("Data Distributor>>>", response);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch member");
    }
  }
);

export const addMegaDealer = createAsyncThunk(
  "distributors/addMegaDealer ",
  async (addMegaDealer) => {
    try {
      const response = await HttpRequest.post(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors/megadealer`,
        addMegaDealer
      );

      const {
        dist_full_name,
        user_id,
        dist_company_name,
        dist_tin_no,
        village_id,
        email_addres,
        telephone_number,
        address,
      } = response.data;
      if (response?.data) {
        toast.success(response?.resp_msg);
        return {
          dist_full_name,
          user_id,
          dist_company_name,
          dist_tin_no,
          village_id,
          email_addres,
          telephone_number,
          address,
        };
      }
    } catch (e) {
      if (e?.response?.data) {
        const errorMessage = e.response?.error_msg;
        toast.error(errorMessage);
      }
      throw new Error(e);
    }
  }
);
export const addDistributor = createAsyncThunk(
  "distributors/addDistributor ",
  async (addDistributor) => {
    try {
      const response = await HttpRequest.post(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors`,
        addDistributor
      );

      const {
        dist_full_name,
        user_id,
        dist_company_name,
        dist_tin_no,
        village_id,
        email_addres,
        telephone_number,
        address,
      } = response.data;
      if (response?.data) {
        toast.success(response?.resp_msg);
        return {
          dist_full_name,
          user_id,
          dist_company_name,
          dist_tin_no,
          village_id,
          email_addres,
          telephone_number,
          address,
        };
      }
    } catch (e) {
      if (e?.response?.data) {
        const errorMessage = e.response?.error_msg;
        toast.error(errorMessage);
      }
      throw new Error(e);
    }
  }
);
export const addTopup = createAsyncThunk(
  "distributors/addTopup",
  async (combinedData) => {
    try {
      const response = await HttpRequest.post(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors/topup`,
        combinedData
      );

      const {
        distributor_id,
        amount_paid,
        mode_of_payment,
        drawers_bank,
        cheque_no,
        created_by,
      } = response.data;
      if (response?.data) {
        toast.success(response?.resp_msg);
        return {
          distributor_id,
          amount_paid,
          mode_of_payment,
          drawers_bank,
          cheque_no,
          created_by,
        };
      }
    } catch (e) {
      if (e?.response?.data) {
        const errorMessage = e.response?.error_msg;
        toast.error(errorMessage);
      }
      throw new Error(e);
    }
  }
);
export const updateTopup = createAsyncThunk(
  "distributors/updateTopup",
  async ({ distributorId, updatedData }) => {
    try {
      const response = await HttpRequest.put(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors/topup/${distributorId}`,
        updatedData
      );

      const {
        distributor_id,
        amount_paid,
        mode_of_payment,
        drawers_bank,
        cheque_no,
        created_by,
        request_status,
      } = response.data || {};

      if (response?.data) {
        toast.success(response?.resp_msg);
        return {
          distributor_id,
          amount_paid,
          mode_of_payment,
          drawers_bank,
          cheque_no,
          created_by,
          request_status,
        };
      } else {
        toast.error(response?.resp_msg);
      }
    } catch (e) {
      if (e?.response?.data) {
        toast.error(e.response?.resp_msg);
      }
      throw new Error(e);
    }
  }
);
export const updateDistributor = createAsyncThunk(
  "distributors/updateDistributor",
  async ({ distributorId, updatedData }) => {
    try {
      const response = await HttpRequest.put(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors/${distributorId}`,
        updatedData
      );

      const {
        dist_tin_no,
        village_id,
        email_address,
        telephone_number,
        address,
        distributor_status,
        last_updated_by,
      } = response.data;

      if (response?.data) {
        toast.success(response.resp_msg);
        return {
          dist_tin_no,
          village_id,
          email_address,
          telephone_number,
          address,
          distributor_status,
          last_updated_by,
        };
      }
    } catch (e) {
      if (e?.response?.data) {
        toast.error(e.response?.resp_msg);
      }
      throw new Error(e);
    }
  }
);
export const approveDistributor = createAsyncThunk(
  "distributors/approveDistributor",
  async ({ request_id, updatedData }) => {
    try {
      const response = await HttpRequest.put(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/distributors/topup/approve/${request_id}`,
        updatedData
      );

      const { approved_by, request_status } = response.data;

      if (response?.data) {
        toast.success(response.resp_msg);
        return {
          approved_by,
          request_status,
        };
      }
    } catch (e) {
      if (e?.response?.data) {
        toast.error(e.response?.resp_msg);
      }
      throw new Error(e);
    }
  }
);

const distributorSlice = createSlice({
  name: "members",
  initialState: {
    distributors: [],
    distributor: [],
    megadealer: [],
    DistTopup: [],
    approvedealer: [],
    topup: [],
    distbydistId: [],
    loading: false,
    member: [],
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDistributors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDistributors.fulfilled, (state, action) => {
        state.loading = false;
        state.distributors = action.payload;
      })
      .addCase(getDistributors.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDistributorTopUps.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDistributorTopUps.fulfilled, (state, action) => {
        state.loading = false;
        state.DistTopup = action.payload;
      })
      .addCase(getDistributorTopUps.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDistributor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDistributor.fulfilled, (state, action) => {
        state.loading = false;
        state.distributor = action.payload;
        console.log("Actions", action.payload);
      })
      .addCase(getDistributor.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProvinces.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(getProvinces.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDistProvince.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDistProvince.fulfilled, (state, action) => {
        state.loading = false;
        state.distProvince = action.payload;
      })
      .addCase(getDistProvince.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDistrict.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.district = action.payload;
      })
      .addCase(getDistrict.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSector.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSector.fulfilled, (state, action) => {
        state.loading = false;
        state.sector = action.payload;
      })
      .addCase(getSector.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCell.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCell.fulfilled, (state, action) => {
        state.loading = false;
        state.cell = action.payload;
      })
      .addCase(getCell.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDistByDistId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDistByDistId.fulfilled, (state, action) => {
        state.loading = false;
        state.distbydistId = action.payload;
      })
      .addCase(getDistByDistId.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addDistributor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDistributor.fulfilled, (state, action) => {
        state.loading = false;
        state.distributor = action.payload;
      })
      .addCase(addDistributor.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addMegaDealer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMegaDealer.fulfilled, (state, action) => {
        state.loading = false;
        state.megadealer = action.payload;
      })
      .addCase(addMegaDealer.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDistributor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDistributor.fulfilled, (state, action) => {
        state.loading = false;
        state.distributor = action.payload;
      })
      .addCase(updateDistributor.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(approveDistributor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveDistributor.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedealer = action.payload;
      })
      .addCase(approveDistributor.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTopup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopup.fulfilled, (state, action) => {
        state.loading = false;
        state.distributor = action.payload;
      })
      .addCase(updateTopup.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addTopup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTopup.fulfilled, (state, action) => {
        state.loading = false;
        state.topup = action.payload;
      })
      .addCase(addTopup.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default distributorSlice.reducer;

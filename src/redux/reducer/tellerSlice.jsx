import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HttpRequest from "../../services/HttpRequest";
import { toast } from "react-toastify";
import io from "socket.io-client";

/* const socket = io(`${process.env.REACT_APP_BASE_URL_LOCAL}`); */
export const getTellers = createAsyncThunk(
  "tellers/getTellers",
  async (page) => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/tellers`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors");
    }
  }
);
export const getTellerTopups = createAsyncThunk(
  "tellers/getTellerTopups",
  async () => {
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/tellertopup`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch distributors");
    }
  }
);
export const getTelByDistId = createAsyncThunk(
  "tellers/getTelByDistId",
  async (id) => {
    const distributorId = id;
    try {
      const response = await HttpRequest.get(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/tellers/bydist/${distributorId}`
      );
      console.log("Data Distributor>>>", response);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch member");
    }
  }
);

export const addTeller = createAsyncThunk(
  "tellers/addTeller",
  async (addTeller) => {
    try {
      const response = await HttpRequest.post(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/tellers/`,
        addTeller
      );

      if (response?.data) {
        /*     socket.send(JSON.stringify({ type: "newTeller", data: response.data })); */
        toast.success(response?.resp_msg);
        return response.data;
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
export const topupTeller = createAsyncThunk(
  "tellers/topupTeller ",
  async (topupTeller) => {
    try {
      const response = await HttpRequest.post(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/tellertopup`,
        topupTeller
      );
      const { teller_id, topup_amount, created_by } = response?.data || {};

      if (response?.data) {
        toast.success(response?.resp_msg);
        return {
          teller_id,
          topup_amount,
          created_by,
        };
      } else {
        toast.error(response?.resp_msg);
      }
    } catch (e) {
      if (e?.response) {
        const errorMessage = e.response?.resp_msg || "An error occurred.";
        toast.error(errorMessage);
      }
      throw new Error(e);
    }
  }
);
export const updateTeller = createAsyncThunk(
  "tellers/updateTeller ",
  async ({ tellerId, updatedData }) => {
    try {
      const response = await HttpRequest.put(
        `${process.env.REACT_APP_BASE_URL_LOCAL}/tellers/${tellerId}`,
        updatedData
      );
      const {
        distributor_id,
        user_name,
        full_name,
        email_addres,
        telephone_number,
        created_by,
        teller_status,
      } = response.data;

      if (response?.data) {
        /*    socket.send(JSON.stringify({ type: "newTeller", data: response.data })); */
        toast.success(response.resp_msg);
        return {
          distributor_id,
          user_name,
          full_name,
          email_addres,
          telephone_number,
          created_by,
          teller_status,
        };
      }
    } catch (e) {
      if (e) {
        toast.error(e.response.resp_msg);
      } else {
        console.error("An error occurred:", e.error_msg);
        /* toast.error("Something went wrong");  */
      }
      throw new Error(e);
    }
  }
);

const tellerSlice = createSlice({
  name: "tellers",
  initialState: {
    tellers: [],
    tellerByDistId: [],
    teller: [],
    tellertopup: [],
    tellertopups: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTellers.fulfilled, (state, action) => {
        state.loading = false;
        state.tellers = action.payload;
      })
      .addCase(getTellers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTellerTopups.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTellerTopups.fulfilled, (state, action) => {
        state.loading = false;
        state.tellertopups = action.payload;
      })
      .addCase(getTellerTopups.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTeller.fulfilled, (state, action) => {
        state.loading = false;
        state.teller = action.payload;
        state.tellers.push(action.payload);
      })
      .addCase(addTeller.rejected, (state) => {
        state.loading = false;
      })
      .addCase(topupTeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(topupTeller.fulfilled, (state, action) => {
        state.loading = false;
        state.tellertopup = action.payload;
      })
      .addCase(topupTeller.rejected, (state, action) => {
        state.loading = false;
        toast.error("Error", action.payload);
      })
      .addCase(updateTeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeller.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTeller = action.payload;
        const distributorIdToUpdate = updatedTeller.distributor_id;
        const tellerIndex = state.tellers.findIndex(
          (teller) => teller.distributor_id === distributorIdToUpdate
        );
        if (tellerIndex !== -1) {
          state.tellers[tellerIndex] = updatedTeller;
        }
      })

      .addCase(updateTeller.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTelByDistId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTelByDistId.fulfilled, (state, action) => {
        state.loading = false;
        state.tellerByDistId = action.payload;
      })
      .addCase(getTelByDistId.rejected, (state, action) => {
        state.loading = false;
        state.tellerByDistId = action.payload;
      });
  },
});
export default tellerSlice.reducer;

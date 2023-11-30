import { createSlice } from "@reduxjs/toolkit";
import { login } from "../action/userAction";
import { setToken, setData } from "../../utils/authToken";
import jwtDecode from "jwt-decode";

const initialState = {
  status: "idle",
  error: null,
  role: null,
  access_level: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeded";
        state.error = null;
        state.access_token = action.payload.data.access_token;
        setToken(action.payload.data.access_token);
        setData(action.payload);

        // Decode the token
        const decodedToken = jwtDecode(action.payload.data.access_token);
        state.access_level = decodedToken.access_level;
        if (state.access_level === "D") {
          window.location.href = "/dist_dashboard";
        } else if (state.access_level === "T") {
          window.location.href = "/teller_dashboard";
        } else {
          window.location.href = "/dist_dashboard";
        }

        state.role = action.payload;
        console.log("News Niew One>>>", state.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Login failed.";
        console.log("Login rejected. Error:", action.error);
      });
  },
});

export const selectStatus = (state) => state.status;
export const selectError = (state) => state.error;
export const selectAccessLevel = (state) => state.access_level;
export const { reset } = authSlice.actions;
export default authSlice.reducer;

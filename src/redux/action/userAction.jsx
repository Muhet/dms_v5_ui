import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpRequest from "../../services/HttpRequest";
import { toast } from "react-toastify";
import { deleteToken } from "../../utils/authToken";

export const login = createAsyncThunk("auth/access", async (data) => {
  try {
    const response = await HttpRequest.post(`/access/login`, data);

    if (response.resp_code === 100) {
      toast.success(response.resp_msg);
    }

    return response;
  } catch (e) {
    if (e?.response?.data === 101) {
      toast.error(e.response.resp_msg);
    }
    throw new Error(e);
  }
});
export const logout = () => {
  return async (dispatch) => {
    try {
      deleteToken();
      dispatch({ type: "LOGOUT" });
    } catch (error) {}
  };
};

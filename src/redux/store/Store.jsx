import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/userSlice";
import distributorsReducer from "../reducer/distributorSlice";
import tellersReducer from "../reducer/tellerSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    distributors: distributorsReducer,
    tellers: tellersReducer,
    
  },
});
export default store;

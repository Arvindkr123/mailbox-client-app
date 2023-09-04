import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    userEmail: "",
  },
  reducers: {
    Login: (state, action) => {
      state.isAuth = true;
      state.userEmail = action.payload.email;
    },
    LogOut: (state, action) => {
      state.isAuth = false;
    },
  },
});

export const { Login, LogOut } = AuthSlice.actions;
export default AuthSlice.reducer;

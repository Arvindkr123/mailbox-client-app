import React, { useEffect } from "react";
import Navbar from "./components/LayOut/Header/Navbar";
import SignUpForm from "./components/Authentication/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./Store/AuthSlice";
import { Route, Routes } from "react-router";
import Home from "./components/Pages/Home";

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  console.log(isAuth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(Login({ email: localStorage.getItem("email") }));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<SignUpForm />} />
        <Route path="*" element={<SignUpForm />} />
      </Routes>
    </>
  );
};

export default App;

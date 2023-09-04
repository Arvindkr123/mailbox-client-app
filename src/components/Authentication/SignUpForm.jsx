import React, { useRef, useState } from "react";
import "./Signuppage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../Store/AuthSlice";

const SignUpForm = () => {
  const islogin = useSelector((state) => state.Auth.isAuth);
  console.log(islogin);
  const [login, setIslogin] = useState(islogin);
  const InputemailRef = useRef();
  const InputpasswordRef = useRef();
  const InputConfirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = InputemailRef.current.value;
    const password = InputpasswordRef.current.value;
    let cpassword;
    if (!login) {
      cpassword = InputConfirmPasswordRef.current.value;
    } else {
      cpassword = InputpasswordRef.current.value;
    }
    console.log(email);
    console.log(password);
    if (password === cpassword) {
      const apikey = process.env.REACT_APP_API_KEY;
      let url;
      if (login) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`;
      } else {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apikey}`;
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
     

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      const data = await response.json();
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", data.email);
      dispatch(Login({ email: data.email }));
      InputemailRef.current.value = "";
      InputpasswordRef.current.value = "";
      if (!login) {
        InputConfirmPasswordRef.current.value = "";
      }
      navigate("/")
    } else {
      alert("password does not match!!!!");
    }
  };
  return (
    <section className="custom-section">
      <div className="custom-container">
        <div className="custom-row justify-center">
          <div className="custom-signup-page">
            <div className="custom-form-container">
              <form className="custom-form" onSubmit={submitHandler}>
                {islogin ? (
                  <p className="text-white">Please Login To Your Account</p>
                ) : (
                  <p className="text-white">Please Create Your Account</p>
                )}
                <div className="custom-form-group">
                  <input
                    type="email"
                    id="custom-email"
                    className="custom-input"
                    placeholder="Email address.."
                    ref={InputemailRef}
                    required
                  />
                </div>
                <div className="custom-form-group">
                  <input
                    type="password"
                    id="custom-password"
                    className="custom-input"
                    placeholder="Password"
                    ref={InputpasswordRef}
                    required
                  />
                </div>
                {!login && (
                  <div className="custom-form-group">
                    <input
                      type="password"
                      id="custom-ConfirmPassword"
                      className="custom-input"
                      placeholder="Confirm Password"
                      ref={InputConfirmPasswordRef}
                      required
                    />
                  </div>
                )}
                <div className="custom-form-group custom-text-center">
                  <button className="custom-btn" type="submit">
                    {login ? "LogIn" : "SignUp"}
                  </button>
                  {login ? (
                    <Link className="custom-link" to="/forgotpassword">
                      Forgot password?
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </form>
              <div className="custom-flex-container">
                <p className="custom-flex-item text-white">
                  {login
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <Link
                  className="custom-btn custom-link-btn"
                  onClick={() => setIslogin(!login)}
                >
                  {login ? "Create new" : "Login"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;

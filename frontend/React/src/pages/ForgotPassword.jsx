import React, { useState } from 'react'
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";



const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleSendOtp = async () => {

    if (!email.trim()) {
      return toast.error(
        "Please enter your email"
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error(
        "Please enter a valid email"
      );
    }


    setLoading(true);

    try {

      const response = await api.post(
        "/forgot-password",
        { email }
      );

      toast.success(response.data.message);

      navigate("/verify-reset-otp", {
        state: { email }
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to Send OTP"
      );

    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-8 col-lg-5">

            <div className="card shadow-lg border-0 p-4 login-card">

              <h2 className="text-center text-white mb-4">
                Forgot Password
              </h2>

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <button
                className="btn btn-light fw-bold mb-3"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {setLoading ? "Sending OTP...." : "Send OTP"}
              </button>

              <button
                className="btn btn-outline-light"
                onClick={() =>
                  navigate("/login")
                }
              >
                Back To Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

const VerifyOtp = () => {


  const handleVerifyOtp = async () => {


    if (!otp.trim()) {
      return toast.error(
        "Please enter OTP"
      );
    }


    if (!/^\d+$/.test(otp)) {
      return toast.error(
        "OTP must contain only numbers"
      );
    }

    if (otp.length !== 6) {
      return toast.error(
        "OTP must be 6 digits"
      );
    }

    setLoading(true);
    try {

      const response = await api.post(
        "/verify-otp",
        {
          email,
          otp
        }
      );

      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "OTP Verification Failed"
      );

    }
    finally {
      setLoading(false);
    }
  };


  const handleResendOtp = async () => {


    if (!email) {
      return toast.error("Email not found");
    }
    setResendLoading(true);
    try {

      const response = await api.post(
        "/send-otp",
        { email }
      );

      toast.success(
        response.data.message
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to resend OTP"
      );

    }
    finally {

      setResendLoading(false);

    }

  };

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);



  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;


  return (
    <div className="signup-page">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-8 col-lg-5">

            <div className="card shadow-lg border-0 p-4 signup-card">

              <h2 className="text-center text-white mb-3">
                Verify OTP
              </h2>

              <p className="text-center text-white">
                OTP sent to
              </p>

              <p className="text-center text-warning">
                {email}
              </p>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                className="btn btn-warning w-100"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <p
                className="text-center mt-3 text-warning"
                style={{
                  cursor: resendLoading ? "not-allowed" : "pointer"
                }}
                onClick={
                  !resendLoading
                    ? handleResendOtp
                    : undefined
                }
              >
                {
                  resendLoading
                    ? "Sending OTP..."
                    : "Didn't receive OTP? Resend OTP"
                }
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

};

export default VerifyOtp;
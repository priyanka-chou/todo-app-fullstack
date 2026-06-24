import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleResetPassword = async () => {

    if (!password && !confirmPassword) {
      return toast.error(
        "Please fill all the details"
      );
    }

    if (!password) {
      return toast.error(
        "Please enter new password"
      );
    }

    if (password.length < 8) {
      return toast.error(
        "Password must be at least 8 characters"
      );
    }

    if (!confirmPassword) {
      return toast.error(
        "Please confirm your password"
      );
    }

    if (password !== confirmPassword) {
      return toast.error(
        "Passwords do not match"
      );
    }


      
    setLoading(true);

    try {

      const response = await api.post(
        "/reset-password",
        {
          email,
          password
        }
      );

      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Password Reset Failed"
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
                Reset Password
              </h2>

              <input
                type="password"
                className="form-control mb-3"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                className="btn btn-light fw-bold w-100"
                onClick={handleResetPassword}
                disabled={loading}
              >
                 {
        loading
            ? "Updating Password..."
            : "Reset Password"
    }
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;
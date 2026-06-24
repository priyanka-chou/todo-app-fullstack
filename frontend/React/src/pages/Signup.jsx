import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleSignup = async () => {

   console.log("Signup button clicked");
    
    if (!name.trim() && !email.trim() && !password.trim()) {
      return toast.error(
        "Please fill all the details"
      );
    }

    if (!name.trim()) {
      return toast.error("Please enter your name");
    }

    if (!email.trim()) {
      return toast.error("Please enter your email");
    }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }

    if (!password) {
      return toast.error("Please enter your password");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least at 8 characters");
    }


     setLoading(true);
     
    try {

      console.log("Calling signup API");
      const response = await api.post(
        "/signup",
        {
          name,
          email,
          password
        }
      );

      console.log("Signup response:", response.data);

    console.log("Calling send-otp API");

      await api.post(
        "/send-otp",
        {
          email
        }
      );
      toast.success(response.data.message);

      navigate("/verify-otp", {
        state: { email }
      });

    } catch (error) {
      console.log("FULL ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        "Signup Failed"
      );

    }
    finally{
      setLoading(false);
    }
  };



  return (
    <div className="signup-page">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-8 col-lg-5">

            <div className="card shadow-lg border-0 p-4 signup-card">

              <h2 className="text-center text-white mb-4">
                Sign Up
              </h2>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />






              <button
                className="btn btn-light fw-bold mb-3"
                onClick={handleSignup}
                disabled={loading}


              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              <p className="text-center text-white">
                Already have an account?
              </p>

              <button
                className="btn btn-outline-light"
                onClick={() =>
                  navigate("/login")
                }
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;
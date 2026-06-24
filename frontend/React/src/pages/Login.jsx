import React, { useState } from 'react'
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Login.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] =useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {

         

        if (!email.trim() && !password.trim()) {
            return toast.error(
                "Please fill all the details"
            );
        }

        if (!email.trim()) {
            return toast.error(
                "Please enter your email"
            );
        }

        if (!password) {
            return toast.error(
                "Please enter your password"
            );
        }

        setLoading(true);

        try {
            const response = await api.post(
                "/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );
            toast.success("Login Successful");
            navigate("/");
            console.log(response.data);
        }
        catch (err) {
            toast.error(
                err.response?.data?.message || "Login Failed"
            )

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
                            <h2 className='text-center text-white mb-4'>Login</h2>

                            <input
                                type="email"
                                className='form-control mb-3'
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                            <p
                                className="text-center text-warning"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot Password?
                            </p>

                            <button
                                className="btn btn-light fw-bold mb-3"
                                onClick={handleLogin}
                                disabled={loading}
                            >
                                {loading? "Logging In" : "Login"}
                            </button>

                            <p className="text-center text-white">
                                Don't have an account?
                            </p>

                            <button
                                className="btn btn-outline-light"
                                onClick={() =>
                                    navigate("/signup")
                                }
                            >
                                Signup
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login

import React from 'react'
import {BrowserRouter,Routes,Route} from  "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyOtp from "./pages/VerifyOtp";
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword';
import VerifyResetOtp from './pages/VerifyResetOtp';
import ResetPassword from './pages/ResetPassword';
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/verify-otp" element={<VerifyOtp />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/verify-reset-otp" element={<VerifyResetOtp />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
      <Route path="*" element={<NotFound />} />

    </Routes>
    <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

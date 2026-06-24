const express = require("express");
const router = express.Router();

const { signup, login, sendOtp,verifyOtp,forgotPassword,verifyResetOtp,resetPassword} = require("../controllers/authControllers");
const { addTodo, updateTodo } = require("../controllers/todoContrllers");

const auth = require("../middleware/auth");
const validateSignup =require("../middleware/validateSignup");
const validateLogin =require("../middleware/validateLogin");
const validateOtp =require("../middleware/validateOtp");
const validateSendOtp =require("../middleware/validateSendOtp");
const validateResetPassword =require("../middleware/validateResetPassword");
const validateTodo = require("../middleware/validateTodo");




router.post("/signup",validateSignup,signup);
router.post( "/login",validateLogin,login);
router.post( "/send-otp", validateSendOtp, sendOtp);
router.post("/verify-otp",validateOtp,verifyOtp);
router.post("/forgot-password", validateSendOtp, forgotPassword);
router.post("/verify-reset-otp",validateOtp,verifyResetOtp);
router.post( "/reset-password", validateResetPassword, resetPassword);
router.post("/todos",auth,validateTodo,addTodo);
router.put("/todos/:id",auth,validateTodo,updateTodo);


module.exports = router;




const validateOtp = (req, res, next) => {

    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            message: "Please enter email and OTP"
        });
    }

    if (!/^\d+$/.test(otp)) {
        return res.status(400).json({
            message: "OTP must contain only numbers"
        });
    }

    if (otp.length !== 6) {
        return res.status(400).json({
            message: "OTP must be 6 digits"
        });
    }

    next();
};

module.exports = validateOtp;
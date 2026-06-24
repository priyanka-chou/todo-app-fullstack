const validateSendOtp = (req, res, next) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Please enter email"
        });
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please enter a valid email"
        });
    }

    next();
};

module.exports = validateSendOtp;
const validateLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all the details"
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

module.exports = validateLogin;
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const JWT_SECRET = process.env.JWT_SECRET


// signup
const signup = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // Check registered users
        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],

            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already registered"
                    });
                }

                // Check pending users
                db.query(
                    "SELECT * FROM pending_users WHERE email=?",
                    [email],

                    async (err, pendingResult) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        if (pendingResult.length > 0) {
                            return res.status(400).json({
                                message:
                                    "OTP already sent. Please verify your email."
                            });
                        }

                        const hashedPassword =
                            await bcrypt.hash(password, 10);

                        db.query(
                            "INSERT INTO pending_users(name,email,password) VALUES(?,?,?)",
                            [name, email, hashedPassword],

                            (err, result) => {

                                if (err) {
                                    return res.status(500).json(err);
                                }

                                res.json({
                                    message: "User registered successfully"
                                });
                            }
                        );

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// login


const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],

            async (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }



                if (result.length === 0) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }


                const isMatch = await bcrypt.compare(password, result[0].password);

                if (!isMatch) {
                    return res.status(401).json({
                        message: "Invalid email or password"
                    });
                }

                const user = result[0];

                const token = jwt.sign(
                    {
                        id: user.id,
                        name: user.name
                    },
                    JWT_SECRET,
                    { expiresIn: "1d" }
                );

                res.json({
                    message: "Login Successfull",
                    token
                });
            }

        );
    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

}


const sendOtp = async (req, res) => {

    const { email } = req.body;

    console.log("EMAIL RECEIVED:", email);

    try {


         db.query(
            "SELECT * FROM otp_verifications WHERE email=? AND created_at >= NOW() - INTERVAL 30 SECOND",
            [email],

            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(429).json({
                        message: "Please wait 30 seconds before requesting a new OTP"
                    });
                }

        const otp =Math.floor(100000 + Math.random() * 900000);

        db.query(
            "DELETE FROM otp_verifications WHERE email=?",
            [email],

            (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                db.query(
                    "INSERT INTO otp_verifications(email,otp) VALUES(?,?)",
                    [email, otp],

                    async (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        await sendEmail(email, otp);

                        res.json({
                            message: "OTP sent successfully"
                        });

                    }
                );
            }
        );
    }
);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const verifyOtp = (req, res) => {

    const { email, otp } = req.body;

    db.query(
        "SELECT * FROM otp_verifications WHERE email=? AND otp=?",
        [email, otp],

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(400).json({
                    message: "Invalid OTP"
                });
            }

            db.query(
                "SELECT * FROM otp_verifications WHERE email=? AND otp=? AND created_at >= NOW() - INTERVAL 5 MINUTE",
                [email, otp],

                (err, validResult) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    if (validResult.length === 0) {
                        return res.status(400).json({
                            message: "OTP Expired. Please resend OTP."
                        });
                    }

                    db.query(
                        "SELECT * FROM pending_users WHERE email=?",
                        [email],

                        (err, userResult) => {

                            if (err) {
                                return res.status(500).json(err);
                            }

                            if (userResult.length === 0) {
                                return res.status(404).json({
                                    message: "Pending user not found"
                                });
                            }

                            const user = userResult[0];

                            db.query(
                                "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                                [user.name, user.email, user.password],

                                (err) => {

                                    if (err) {
                                        return res.status(500).json(err);
                                    }

                                    db.query(
                                        "DELETE FROM pending_users WHERE email=?",
                                        [email],

                                        (err) => {

                                            if (err) {
                                                return res.status(500).json(err);
                                            }

                                            db.query(
                                                "DELETE FROM otp_verifications WHERE email=?",
                                                [email],

                                                (err) => {

                                                    if (err) {
                                                        return res.status(500).json(err);
                                                    }

                                                    res.json({
                                                        message: "OTP Verified & Account Created"
                                                    });

                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};

const forgotPassword = (req, res) => {

    const { email } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const otp =
                Math.floor(100000 + Math.random() * 900000);

            db.query(
                "DELETE FROM otp_verifications WHERE email=?",
                [email],

                (err) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    db.query(
                        "INSERT INTO otp_verifications(email,otp) VALUES(?,?)",
                        [email, otp],

                        async (err) => {

                            if (err) {
                                return res.status(500).json(err);
                            }

                            await sendEmail(email, otp);

                            res.json({
                                message: "OTP sent successfully"
                            });
                        }
                    );
                }
            );
        }
    );
};

const verifyResetOtp = (req, res) => {

    const { email, otp } = req.body;

    db.query(
        "SELECT * FROM otp_verifications WHERE email=? AND otp=?",
        [email, otp],

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(400).json({
                    message: "Invalid OTP"
                });
            }

            db.query(
                "SELECT * FROM otp_verifications WHERE email=? AND otp=? AND created_at >= NOW() - INTERVAL 5 MINUTE",
                [email, otp],

                (err, validResult) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    if (validResult.length === 0) {
                        return res.status(400).json({
                            message: "OTP Expired. Please resend OTP."
                        });
                    }

                    res.json({
                        message: "OTP Verified"
                    });

                }
            );
        }
    );
};


const resetPassword = async (req, res) => {

    const { email, password } = req.body;

    try {

        const hashedPassword =
            await bcrypt.hash(password, 10);

        db.query(
            "UPDATE users SET password=? WHERE email=?",
            [hashedPassword, email],

            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                db.query(
                    "DELETE FROM otp_verifications WHERE email=?",
                    [email]
                );

                res.json({
                    message: "Password Updated Successfully"
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { signup, login, sendOtp, verifyOtp, forgotPassword, verifyResetOtp, resetPassword };


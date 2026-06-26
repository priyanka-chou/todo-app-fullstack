const nodemailer = require("nodemailer");

// console.log("USER:", process.env.BREVO_USER);
// console.log("PASS EXISTS:", !!process.env.BREVO_PASS);
// console.log("SENDER:", process.env.BREVO_SENDER);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log("SMTP Error:", err);
  } else {
    console.log("SMTP Ready");
  }
});

const sendEmail = async (email, otp) => {
  console.log("sendEmail called");
  console.log("Email:", email);
  console.log("OTP:", otp);

  try {
    const info = await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Todo App OTP Verification",
  html: `
    <h2>Your OTP is: ${otp}</h2>
    <p>Valid for 5 minutes.</p>
  `,
});

    console.log("Mail sent:", info.messageId);
    return true;

  } catch (error) {
    console.log("Mail Error:", error);
    throw error;
  }
};

module.exports = sendEmail;
const nodemailer = require("nodemailer");



console.log("USER:", process.env.BREVO_USER);
console.log("PASS EXISTS:", !!process.env.BREVO_PASS);
console.log("SENDER:", process.env.BREVO_SENDER);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS
  },
  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,
});

transporter.verify((err) => {
  if (err) {
    console.log("SMTP Error:", err);
  } else {
    console.log("SMTP Ready");
  }
});

const sendEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.BREVO_SENDER,
      to: email,
      subject: "Todo App OTP Verification",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>Valid for 5 minutes.</p>
      `,
    });

    console.log("Mail sent:", info.messageId);

  } catch (error) {
    console.log("Mail Error:", error.message);
  }
};

module.exports = sendEmail;
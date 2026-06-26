const { Brevo } = require("@getbrevo/brevo");

const sendEmail = async (email, otp) => {
  try {
    await Brevo.transactionalEmails.sendTransacEmail(
      {
        sender: {
          name: "Todo App",
          email: process.env.BREVO_SENDER,
        },
        to: [{ email }],
        subject: "Todo App OTP Verification",
        htmlContent: `
          <h2>Your OTP is: ${otp}</h2>
          <p>Valid for 5 minutes.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("Mail sent successfully");
    return true;
  } catch (error) {
    console.log("Mail Error:", error);
    throw error;
  }
};

module.exports = sendEmail;
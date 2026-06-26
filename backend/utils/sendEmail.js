const SibApiV3Sdk = require("@getbrevo/brevo");

console.log(SibApiV3Sdk);
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (email, otp) => {
  try {
    const sendSmtpEmail = {
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
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Mail sent:", data);
    return true;

  } catch (error) {
    console.log("Mail Error:", error);
    throw error;
  }
};

module.exports = sendEmail;
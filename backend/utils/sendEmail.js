const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async (email, otp) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      email: process.env.BREVO_SENDER,
      name: "Todo App",
    };

    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = "Todo App OTP Verification";
    sendSmtpEmail.htmlContent = `
      <h2>Your OTP is: ${otp}</h2>
      <p>Valid for 5 minutes.</p>
    `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Mail sent successfully");
  } catch (err) {
    console.log("Mail Error:", err);
    throw err;
  }
};

module.exports = sendEmail;
const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (email, otp) => {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Todo App OTP Verification";
  sendSmtpEmail.htmlContent = `
    <h2>Your OTP is: ${otp}</h2>
    <p>Valid for 5 minutes.</p>
  `;

  sendSmtpEmail.sender = {
    name: "Todo App",
    email: process.env.BREVO_SENDER,
  };

  sendSmtpEmail.to = [{ email }];

  await apiInstance.sendTransacEmail(sendSmtpEmail);

  console.log("Mail sent successfully");
};

module.exports = sendEmail;
const nodemailer =require("nodemailer");


console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS LENGTH:", process.env.EMAIL_PASS?.length);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});





const sendEmail =async (email,otp)=>{

    await transporter.sendMail({
        from : process.env.EMAIL_USER,
        to : email,
        subject :"Todo App OTP Verification",
        html :`

         <h2>Your OTP is: ${otp}</h2>
      <p>Valid for 5 minutes.</p>
        `
    });
};


module.exports = sendEmail;
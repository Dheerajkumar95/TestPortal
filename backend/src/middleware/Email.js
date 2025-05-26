const { transporter } = require("./Email.confiq.js");
const {
  Verification_Email_Template,
  Welcome_Email_Template,
  ResetPasswordEmail_Template,
} = require("./EmailTemplate.js");

const sendVerificationEamil = async (email, verificationCode, name) => {
  try {
    const htmlContent = Verification_Email_Template.replace(
      "{verificationCode}",
      verificationCode
    ).replace("{name}", name);
    const response = await transporter.sendMail({
      from: '"DheerajKumar"<dheerajk35973@gmail.com>',

      to: email,
      subject: "Verify your Email on TIT.TestPortal.in",
      text: "Verify your Email on TIT.TestPortal.in",
      html: htmlContent,
    });
    console.log("Email send Successfully", response);
  } catch (error) {
    console.log("Email error", error);
  }
};
const senWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"Dheeraj" <dheerajk35973@gmail.com>',

      to: email,
      subject: "Welcome Email on TIT.TestPortal.in",
      text: "Welcome Email on TIT.TestPortal.in",
      html: Welcome_Email_Template.replace("{name}", name),
    });
    console.log("Email send Successfully", response);
  } catch (error) {
    console.log("Email error", error);
  }
};
const ResetPasswordEmail = async (email, name, link) => {
  try {
    const htmlContent = ResetPasswordEmail_Template.replace("{email}", email)
      .replace("{name}", name)
      .replace("{link}", link);

    const response = await transporter.sendMail({
      from: '"Dheeraj" <dheerajk35973@gmail.com>',

      to: email,
      subject: "Password reset on TIT.TestPortal.in",
      text: "Password reset on TIT.TestPortal.in",
      html: htmlContent,
    });
    console.log("Email send Successfully", response);
  } catch (error) {
    console.log("Email error", error);
  }
};
module.exports = { sendVerificationEamil, senWelcomeEmail, ResetPasswordEmail };

const  { transporter } = require("./Email.confiq.js");
const { Verification_Email_Template, Welcome_Email_Template } = require("./EmailTemplate.js");


const sendVerificationEamil=async(email,verificationCode,name)=>{
    try {
     const htmlContent = Verification_Email_Template
      .replace("{verificationCode}", verificationCode)
      .replace("{name}", name);
     const response=await transporter.sendMail({
      from: '"DheerajKumar"<dheerajk35973@gmail.com>',

      to: email,  
      subject: "Verify your Email", 
      text: "Verify your Email",
      html: htmlContent

  })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
 const senWelcomeEmail=async(email,name)=>{
    try {
     const response= await transporter.sendMail({
            from: '"Dheeraj" <dheerajk35973@gmail.com>',

            to: email, 
            subject: "Welcome Email",
            text: "Welcome Email",
            html: Welcome_Email_Template.replace("{name}",name)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
module.exports ={sendVerificationEamil,senWelcomeEmail}
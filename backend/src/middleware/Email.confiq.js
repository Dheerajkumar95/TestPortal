const nodemailer=require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "dheerajk35973@gmail.com",
    pass: "yuma unch fwbn uyhh",
  },
});
module.exports={transporter}
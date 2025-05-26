const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid  rgb(24, 182, 74);
          }
          .header {
              background-color: rgb(24, 182, 74);
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }

          .name {
             color: #000000;         /* pure black */
             font-size: 18px;
             font-weight: 700;       /* bold */
             margin: 20px 0;
}


          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 22px;
              color:rgb(0, 0, 0);
              background: #e8f5e9;
              border: 1px dashed  rgb(24, 182, 74);
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
              font-size: 16px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p class="name">Dear {name}</p>
              <h3>Greetings from TIT.TestPortal.in</h3>
              <span class="verification-code">{verificationCode}</span>
              <p>This OTP is valid for the next 5 minutes. Please use this code to complete your verification process.</p>
              <p>For your security, never share this OTP with anyone, including company representatives. If you did not request this code, please contact our support team immediately.</p>
              <h2>Best Regards</h2>
              <h2>TIT.TestPortal.in</h2>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} DheerajKumar. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Community</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background:  #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid  rgb(24, 182, 74);
          }
          .header {
              background-color:  rgb(24, 182, 74);
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .welcome-message {
              font-size: 18px;
              margin: 20px 0;
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color:  rgb(24, 182, 74);
              color:#000000;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: linear-gradient(90deg, rgb(108, 47, 17),  rgb(24, 182, 74));
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Welcome to Our Community!</div>
          <div class="content">
              <p class="welcome-message">Hello {name},</p>
              <p>We’re thrilled to have you join us! Your registration was successful, and we’re committed to providing you with the best experience possible.</p>
              <p>Here’s how you can get started:</p>
              <ul>
                  <li>Explore our features and customize your experience.</li>
                  <li>Stay informed by checking out our blog for the latest updates and tips.</li>
                  <li>Reach out to our support team if you have any questions or need assistance.</li>
              </ul>
              <a href="#" class="button">Get Started</a>
              <p>If you need any help, don’t hesitate to contact us. We’re here to support you every step of the way.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()}DheerajKumar. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

const ResetPasswordEmail_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid rgb(24, 182, 74);
          }
          .header {
              background-color: rgb(24, 182, 74);
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .welcome-message {
              font-size: 18px;
              margin: 20px 0;
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color: rgb(24, 182, 74);
              color: #000000;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #189f50;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Password Reset Request</div>
          <div class="content">
              <p class="welcome-message">Dear {name},</p>
               <h3>Greetings from TIT.TestPortal.in</h3>
              <p>To initiate the password reset process for your CRTD Technologies' Exam Portal, please click the Reset Password button below:</p>
             <div style="text-align: center;">
            <a href="{link}" class="button">Reset Password</a>
           </div>
              <h2>Best Regards</h2>
              <h2>TIT.TestPortal.in</h2>
              <p>If you did not request this, you can safely ignore this email.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} DheerajKumar. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

module.exports = {
  Verification_Email_Template,
  Welcome_Email_Template,
  ResetPasswordEmail_Template,
};

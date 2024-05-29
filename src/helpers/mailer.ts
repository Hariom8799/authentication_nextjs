const nodemailer = require("nodemailer");
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {

    const hashedToken = await bcrypt.hash(userID,10);

    if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userID, 
        { verifyToken : hashedToken,
          verifyTokenExpire : Date.now() + 3600000
        })
    }
    else if(emailType === "RESET"){
      await User.findByIdAndUpdate(userID, 
        { forgotPasswordToken : hashedToken,
          forgotPasswordExpiry : Date.now() + 3600000
        })
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8e34e560f8510f",
        pass: "346c8e0aa3c3fc"
      }
    });

    const mailoptins = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: emailType == "VERIFY" ? "Verification email" : "Forgot password email" , // Subject line
      html: `<p>click me <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">to ${emailType === "VERIFY" ? "verify email" : "reset password"}</a>
      or copy paste the link in the browser ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`, // html body
    };

    const mailResp = await transporter.sendMail(mailoptins);

    return mailResp;
    
  } catch (error) {
    throw error;
  }
};

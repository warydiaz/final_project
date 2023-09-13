import nodemailer from "nodemailer";
import MailServices from "./mailsServices.js";

export class MailServicesImp implements MailServices {
  constructor() {}



  public sendEmail = ({ to, subject, text }: any): boolean => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port:465,
      secure:true,
      logger:true,
      debug:true,
      secureConnection:false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.PASS_MAIL,
      },
      tls:{
        rejectUnAuthorized:true
      }
    });

    let wasSend = true;
    const options = {
      to: to,
      subject: subject,
      text: text,
    };

    transporter.sendMail(options,  (error, info) => {
      if (error) {
        console.error("Error trying to send email: " + error);
        wasSend = false;
      }
    });
    return wasSend;
  };
}

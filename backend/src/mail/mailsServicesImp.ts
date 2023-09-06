import nodemailer from "nodemailer";
import MailServices from "./mailsServices.js";

export class MailServicesImp implements MailServices {
  constructor() {}

  private transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tucorreo@gmail.com",
      pass: "tucontraseña",
    },
  });

  public sendEmail = ({ to, subject, text }: any): boolean => {
    let wasSend = true;
    const options = {
      from: "tucorreo@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    this.transporter.sendMail(options, function (error, info) {
      if (error) {
        console.error("Error trying to send email: " + error);
        wasSend = false;
      }
    });
    return wasSend;
  };
}

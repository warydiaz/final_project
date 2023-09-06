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

  public sendEmail = ({ to, subject, text }: any) => {
    const mailOptions = {
      from: "tucorreo@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error al enviar el correo: " + error);
      } else {
        console.log("Correo enviado con éxito: " + info.response);
      }
    });
  }
}

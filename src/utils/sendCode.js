import nodemailer from "nodemailer";
import { AUTH_PASS, AUTH_USER } from "../config/config.js";

export const sendCode = async (email, codeGenerate) => {
  const content = `
        <b>Code: </b><span>${codeGenerate}</span>
    `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: AUTH_USER,
      pass: AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify(function (error) {
    if (error) {
      console.error(error);
    } else {
      console.log("📩 Server is ready to take our messages");
    }
  });

  const mailOptions = {
    from: `"AirClock - Verification Code" <${AUTH_USER}>`,
    to: email,
    subject: "Código de verificación",
    html: content,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
      return error;
    } else {
      console.log(`Código enviado a => ${email}`);
      return `Código enviado a => ${email}`;
    }
  });
};

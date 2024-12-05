import nodemailer from "nodemailer";
import { AUTH_PASS, AUTH_USER } from "../config/config.js";

export const sendPaySuccess = async (prefer_id, email) => {
  const content = `
        <div>
            <h1>🎉 Compra realizada correctamente 🎉</h1>
            <p>La última compra con el ID <b>${prefer_id}</b> se ha realizado correctamente.</p>
            <b>Gracias por la preferencia ✨</b>
            <a href="https://wa.me/+51918698741?text=Hola! Quiero consultar sobre mi pedido *${prefer_id}*" style="
                text-decoration: none;
                color: white;
                background: #07524B;
                padding: 15px;
                border-radius: 10px;
                font-weight: bold;
            ">Consultar mi pedido</a>
        </div>
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
    from: `"AirClock" <${AUTH_USER}>`,
    to: email,
    subject: `Payment Succesfull <${prefer_id}>`,
    html: content,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
      return error;
    } else {
      console.log(`Facturada Success a => ${email}`);
      return `Facturada Success a => ${email}`;
    }
  });
};

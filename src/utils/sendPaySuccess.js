import nodemailer from "nodemailer";
import { AUTH_PASS, AUTH_USER } from "../config/config.js";

export const sendPaySuccess = async (prefer_id, email) => {
  const content = `
    <div>
        <h1>🎉 Compra realizada correctamente 🎉</h1>
        <p>La última compra con el ID <b>${prefer_id}</b> se ha realizado correctamente.</p>
        <b style="margin-bottom: 50px">Gracias por la preferencia ✨</b>
        <br/>
        <p>
            <a href="https://wa.me/51918698741?text=Hola%21%20Quiero%20consultar%20sobre%20mi%20pedido%20*${prefer_id}*" style="
                text-decoration: none;
                color: white;
                background: #07524B;
                padding: 15px;
                border-radius: 10px;
                font-weight: bold;
                margin: 20px 0;
            ">Consultar mi pedido</a>
        </p>
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

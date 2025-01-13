import nodemailer from "nodemailer";
import { AUTH_PASS, AUTH_USER } from "../config/config.js";

export const sendPayPending = async (prefer_id, email, date_created, prods, url_factura) => {

    let productos = '';
    let total = 0;

    for (let index in prods) {
        let p = prods[index];

        total += parseInt(p.quantity) * parseInt(p.unit_price);
        productos += '<hr/>';
        productos += `<p><b>Nombre: </b><span>${p.title}</span></p>`;
        productos += `<p><b>Cantidad: </b><span>${p.quantity}</span></p>`;
        productos += `<p><b>Precio Unitario: </b><span>S/. ${p.unit_price}</span></p>`;
        productos += '<hr/>';
    }

  const content = `
        <div>
            <b>Resumen de facturación:</b>
            <p>
                <b>Pay_ID:</b>
                <span>${prefer_id}</span>
            </p>
            <p>
                <b>Date_Created:</b>
                <span>${date_created}</span>
            </p>
            <p>
                <b>Products:</b><br/>
                ${productos}
            </p>
            <p>
                <b>Total:</b>
                <span>S/. ${total}</span>
            </p>
            <p>
                <a href='${url_factura}'>Obtener factura</a>
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
    subject: `Payment Pending <${prefer_id}>`,
    html: content,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
      return error;
    } else {
      console.log(`Facturada enviada a => ${email}`);
      return `Facturada enviada a => ${email}`;
    }
  });
};

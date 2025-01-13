import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_API_KEY, HOST } from "../config/config.js";
import connection from "../config/db.js";
import { encryptPassword, matchPassword } from "../utils/bcrypt.js";
import { verify_email } from "../utils/verifyEmail.js";
import { sendCode } from "../utils/sendCode.js";
import { generateRandomCode } from "../utils/generateRandomCode.js";
import { newCodeVerify } from "../utils/newCodeVerify.js";
import { sendPayPending } from "../utils/sendPayPending.js";
import { sendPaySuccess } from "../utils/sendPaySuccess.js";
import { createFacture } from "../utils/createFacture.js";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_API_KEY });

export const getHome = (req, res) => {
  const preference = new Preference(client);
  const { relojes } = req.body;
  console.log(relojes);

  preference
    .create({
      body: {
        items: [
          {
            title: "Mi producto",
            quantity: 1,
            currency_id: "PEN",
            unit_price: 1.5,
          },
        ],
        back_urls: {
          success: `${HOST}/success`,
          failure: `${HOST}/failure`,
          pending: `${HOST}/pending`,
        },
      },
    })
    .then((response) => {
      const preferenceId = response.id;
      console.log(response);
      res.render("home", { preferenceId });
    })
    .catch((error) => {
      console.error("Error al crear la preferencia:", error);
      res.status(500).send("Error al crear la preferencia:" + error);
    });
};

export const create_preference = async (req, res) => {
  const preference = new Preference(client);
  const { correo, relojes } = req.body;
  console.log('📄 Preparando factura');

  preference
    .create({
      body: {
        items: relojes,
        back_urls: {
          success: `${HOST}/success`,
          failure: `${HOST}/failure`,
          pending: `${HOST}/pending`,
        },
        payer: {
          email: correo,
        },
      },
    })
    .then(async (response) => {
      const preferenceId = response.id;
      const factura = await createFacture(preferenceId, correo, relojes);
      // console.log(factura);
      // console.log(response);

      // connection.query(
      //   "INSERT INTO Payment (prefer_id,email,date_created,status)" +
      //   " VALUES (?,?,?,?)",
      //   [preferenceId, correo, response.date_created, 'pending'],

      //   async (error, results) => {
      //     if (error) {
      //       console.error(error);
      //       return res.status(500).json({ status: 500, message: error });
      //     }

      //     console.log(`Pending payment: ${preferenceId}`);
      //   }
      // );

      await sendPayPending(
        preferenceId,
        'carlossoncra@gmail.com',
        response.date_created,
        relojes,
        factura.qr
      );

      res.status(200).json({ preferenceId });
    })
    .catch((error) => {
      console.error("Error al crear la preferencia:", error);
      res.status(500).send("Error al crear la preferencia:" + error);
    });
};

export const create_user = async (req, res) => {
  const { nombre, apellidos, tlf, email, pssw } = req.body;
  const pssw_encrypt = await encryptPassword(pssw);

  connection.query(
    "INSERT INTO Usuarios (Nombre, Apellidos, Telefono, Correo, Password) VALUES (?,?,?,?,?)",
    [nombre, apellidos, tlf, email, pssw_encrypt],

    async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error });
      }

      const code = generateRandomCode(4);

      const isCode = await newCodeVerify(email, code);

      if (isCode) {
        await sendCode(email, code);
      } else {
        console.error("Error al agregar el code");
      }

      res.status(200).json({
        status: 200,
        message: "Usuario creado correctamente",
      });
    }
  );
};

export const login_user = async (req, res) => {
  const { email, pssw } = req.body;

  try {
    const response = await verify_email(email);

    if (!response) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    const pssw_decrypt = await matchPassword(pssw, response[0].Password);

    if (!pssw_decrypt) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Login exitoso", data: response });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno del servidor" }); // Respuesta en caso de error
  }
};

export const validate_email = async (req, res) => {
  const { email } = req.body;

  connection.query(
    "SELECT * FROM VerificationCodes WHERE email=?",
    [email],

    async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error });
      }

      if (results.length === 0) {
        return res
          .status(200)
          .json({ status: 200, message: "El correo ya ha sido verificado" });
      }

      res.status(400).json({
        status: 400,
        message: "El correo no ha sido verificado",
      });
    }
  );
};

export const validate_code = async (req, res) => {
  const { email, code } = req.body;

  connection.query(
    "SELECT * FROM VerificationCodes WHERE code=?",
    [code],

    async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error });
      }

      if (results.length !== 0) {
        return res.status(200).json({ status: 200, message: "Código válido" });
      } else {
        console.error("Código inválido");
        res.status(201).json({
          status: 201,
          message: "Código inválido",
        });
      }
    }
  );
};

export const delete_code = async (req, res) => {
  const { email, code } = req.body;

  connection.query(
    "DELETE FROM VerificationCodes WHERE email=? AND code=?",
    [email, code],

    async (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error });
      }

      console.log(`Código ${code} eliminado`);
      res.status(200).json({
        status: 200,
        message: `Código ${code} eliminado`,
      });
    }
  );
};

export const getSucess = async (req, res) => {
  const { preference_id } = req.query;


  // connection.query(
  //   "UPDATE Payment SET status='success' WHERE prefer_id=?",
  //   [preference_id],

  //   async (error, results) => {
  //     if (error) {
  //       console.error(error);
  //       return res.status(500).json({ status: 500, message: error });
  //     }

  //     console.log(`Success payment: ${preference_id}`);
  //   }
  // );

  // connection.query(
  //   "SELECT email FROM Payment WHERE prefer_id=?",
  //   [preference_id],

  //   async (error, results) => {
  //     if (error) {
  //       console.error(error);
  //       return res.status(500).json({ status: 500, message: error });
  //     }

      console.log(`Finish: ${preference_id}`);
      await sendPaySuccess(preference_id, 'carlossoncra@gmail.com');
  //   }
  // );

  res.render("success");
};

import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_API_KEY, HOST } from "../config/config.js";
import connection from "../config/db.js";
import { encryptPassword, matchPassword } from "../utils/bcrypt.js";

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
          }
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

export const create_preference = (req, res) => {
  const preference = new Preference(client);
  const relojes = req.body;

  preference
    .create({
      body: {
        items: relojes,
      },
    })
    .then((response) => {
      const preferenceId = response.id;
      console.log(response);

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

    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error });
      }
      res.status(200).json({
        status: 200,
        message: 'Usuario creado correctamente'
      });
    }
  );
}

export const getSucess = (req, res) => {
  res.render("success");
};

import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config/config.js";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_API_KEY });

export const getHome = (req, res) => {
  const preference = new Preference(client);
  const { relojes } = req.body;
  console.log(relojes);


  // preference
  //   .create({
  //     body: {
  //       items: relojes,
  //       back_urls: {
  //           success: 'http://localhost:3000/success',
  //           failure: 'http://localhost:3000/success',
  //           pending: 'http://localhost:3000/success',
  //       }
  //     },
  //   })
  //   .then((response) => {

  //     const preferenceId = response.id;
  //     console.log(response);
  //     res.render("home", { preferenceId });
  //   })
  //   .catch((error) => {
  //     console.error("Error al crear la preferencia:", error);
  //     res.status(500).send("Error al crear la preferencia:" + error);
  //   });
};

export const create_preference = (req, res) => {
  const preference = new Preference(client);
  const { relojes } = req.body;
  console.log(relojes);


  // preference
  //   .create({
  //     body: {
  //       items: relojes,
  //       back_urls: {
  //           success: 'http://localhost:3000/success',
  //           failure: 'http://localhost:3000/success',
  //           pending: 'http://localhost:3000/success',
  //       }
  //     },
  //   })
  //   .then((response) => {

  //     const preferenceId = response.id;
  //     console.log(response);
  //     res.render("home", { preferenceId });
  //   })
  //   .catch((error) => {
  //     console.error("Error al crear la preferencia:", error);
  //     res.status(500).send("Error al crear la preferencia:" + error);
  //   });
};

export const getSucess = (req, res) => {
    res.render("success");
}
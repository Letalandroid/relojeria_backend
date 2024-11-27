import { MercadoPagoConfig, Payment } from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config/config.js";
import connection from "../config/db.js";

export const getAllProducts = (req, res) => {
  connection.query("SELECT * FROM Productos", (error, results) => {
    if (error) return res.status(500).json({ status: 500, message: error });
    res.status(200).json(results);
  });
};

export const getAllProductsSimilary = (req, res) => {

  const { genero, marca } = req.body;

  connection.query(
    "SELECT * FROM Productos WHERE Genero=? OR Marca=?",
    [genero, marca],

    (error, results) => {
      if (error) return res.status(500).json({ status: 500, message: error });
      res.status(200).json(results);
    }
  );
};

export const getForId = (req, res) => {
  const { ProductoID } = req.body;

  connection.query(
    "SELECT * FROM Productos WHERE ProductoID = ?",
    [ProductoID],
    (error, results) => {
      if (error) return res.status(500).json({ status: 500, message: error });
      res.status(200).json(results);
    }
  );
};

export const searchProducts = (req, res) => {
  const { text_search } = req.body;

  const searchTerm = `%${text_search}%`;
  connection.query(
    "SELECT * FROM Productos WHERE Nombre LIKE ? OR Descripcion LIKE ? OR Genero LIKE ?",
    [searchTerm, searchTerm],
    (error, results) => {
      if (error) return res.status(500).json({ status: 500, message: error });
      res.status(200).json(results);
    }
  );
};

export const payProduct = async (req, res) => {
  const { token, installments } = req.body;

  const client = new MercadoPagoConfig({
    accessToken: MERCADOPAGO_API_KEY,
    options: { timeout: 5000, idempotencyKey: "abc" },
  });

  const payment = new Payment(client);

  const body = {
    transaction_amount: 12.34,
    description: "<DESCRIPTION>",
    payment_method_id: "visa",
    token: token,
    installments: installments,
    payer: {
      email: "carlossoncra@gmail.com",
    },
  };

  payment
    .create({ body })
    .then(console.log, res.status(200).token)
    .catch(console.log);
};

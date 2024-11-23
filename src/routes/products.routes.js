import { Router } from "express";
import { ROUTER_PATH } from "../config/routes.js";
import connection from "../config/db.js";

const products = Router();

products.get(`${ROUTER_PATH}/products`, (req, res) => {
  connection.query("SELECT * FROM Productos", (error, results) => {
    if (error) res.status(500).json({ status: 500, message: error });
    res.status(200).json(results);
  });
});

products.post(`${ROUTER_PATH}/products`, (req, res) => {
  const { ProductoID } = req.body;

  connection.query(`SELECT * FROM Productos WHERE ProductoID=${ProductoID}`, (error, results) => {
    if (error) res.status(500).json({ status: 500, message: error });
    res.status(200).json(results);
  });
});

export default products;

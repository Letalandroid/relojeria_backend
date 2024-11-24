import { Router } from "express";
import { ROUTER_PATH } from "../config/routes.js";
import connection from "../config/db.js";

const products = Router();

products.get(`${ROUTER_PATH}/products`, (req, res) => {
  connection.query("SELECT * FROM Productos", (error, results) => {
    if (error) return res.status(500).json({ status: 500, message: error });
    res.status(200).json(results);
  });
});

products.post(`${ROUTER_PATH}/products`, (req, res) => {
  const { ProductoID } = req.body;

  connection.query("SELECT * FROM Productos WHERE ProductoID = ?", [ProductoID], (error, results) => {
    if (error) return res.status(500).json({ status: 500, message: error });
    res.status(200).json(results);
  });
});

// Endpoint para buscar productos por texto (nombre o descripción)
products.post(`${ROUTER_PATH}/searchProducts`, (req, res) => {
  const { text_search } = req.body;

  const searchTerm = `%${text_search}%`;
  connection.query(
    "SELECT * FROM Productos WHERE Nombre LIKE ? OR Descripcion LIKE ?",
    [searchTerm, searchTerm],
    (error, results) => {
      if (error) return res.status(500).json({ status: 500, message: error });
      res.status(200).json(results);
    }
  );
});

export default products;
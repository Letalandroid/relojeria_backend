import { Router } from "express";
import { getForId, getAllProducts, payProduct, searchProducts, getAllProductsSimilary } from "../controllers/products.controller.js";
import { ROUTER_PATH } from "../config/config.js";

const products = Router();

products.get(`${ROUTER_PATH}/products`, getAllProducts);
products.post(`${ROUTER_PATH}/productsSimilary`, getAllProductsSimilary);

products.post(`${ROUTER_PATH}/products`, getForId);

products.post(`${ROUTER_PATH}/searchProducts`, searchProducts);

products.post(`${ROUTER_PATH}/payment`, payProduct);

export default products;
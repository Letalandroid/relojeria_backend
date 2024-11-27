import { config } from "dotenv";
config();

export const HOST = process.env.HOST;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;
export const ROUTER_PATH = '/api/v1';
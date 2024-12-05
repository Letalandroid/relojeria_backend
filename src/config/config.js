import { config } from "dotenv";
config();

export const HOST = process.env.HOST;
export const AUTH_USER = process.env.AUTH_USER;
export const AUTH_PASS = process.env.AUTH_PASS;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;
export const ROUTER_PATH = '/api/v1';
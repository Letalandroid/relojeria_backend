import { config } from "dotenv";
config();

export const HOST = process.env.HOST;
export const AUTH_USER = process.env.AUTH_USER;
export const AUTH_PASS = process.env.AUTH_PASS;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;
export const ROUTER_PATH = '/api/v1';
export const ACCESS_TOKEN_FACTUS = process.env.ACCESS_TOKEN_FACTUS;
export const URL_API_FACTUS = process.env.URL_API_FACTUS;
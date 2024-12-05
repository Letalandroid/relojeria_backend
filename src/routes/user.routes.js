import { Router } from "express";
import { getHome, create_preference, getSucess, create_user, login_user } from "../controllers/user.controller.js";
import { ROUTER_PATH } from "../config/config.js";

const user = Router();

user.post(`/create-preference`, create_preference);
user.post(`${ROUTER_PATH}/auth/create-user`, create_user);
user.post(`${ROUTER_PATH}/auth/login-user`, login_user);
user.get(`/`, getHome);
user.get(`/success`, getSucess);

export default user;
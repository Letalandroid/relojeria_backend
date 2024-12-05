import { Router } from "express";
import {
  getHome,
  create_preference,
  getSucess,
  create_user,
  login_user,
  validate_email,
  validate_code,
  delete_code,
} from "../controllers/user.controller.js";
import { ROUTER_PATH } from "../config/config.js";

const user = Router();

user.post(`/create-preference`, create_preference);
user.post(`${ROUTER_PATH}/auth/create-user`, create_user);
user.post(`${ROUTER_PATH}/auth/login-user`, login_user);
user.post(`${ROUTER_PATH}/auth/validate-email`, validate_email);
user.post(`${ROUTER_PATH}/auth/validate-code`, validate_code);
user.post(`${ROUTER_PATH}/auth/delete-code`, delete_code);
user.get(`/`, getHome);
user.get(`/success`, getSucess);

export default user;

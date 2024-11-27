import { Router } from "express";
import { getHome, create_preference, getSucess, create_user } from "../controllers/user.controller.js";

const user = Router();

user.post(`/create-preference`, create_preference);
user.post(`/create-user`, create_user);
user.get(`/`, getHome);
user.get(`/success`, getSucess);

export default user;
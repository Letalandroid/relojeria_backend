import { Router } from "express";
import { getHome, create_preference, getSucess } from "../controllers/user.controller.js";

const user = Router();

user.post(`/create-preference`, create_preference);
user.get(`/`, getHome);
user.get(`/success`, getSucess);

export default user;
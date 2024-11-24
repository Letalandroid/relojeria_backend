import { Router } from "express";
import { getHome } from "../controllers/user.controller.js";

const products = Router();

products.get(`/`, getHome);
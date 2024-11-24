import express from "express";
import cors from 'cors';
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import products from "./routes/products.routes.js";
import user from "./routes/user.routes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(products);
app.use(user);

export default app;

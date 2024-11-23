import express from "express";
import cors from 'cors';
import morgan from "morgan";

// Routes
import products from "./routes/products.routes.js";

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(products);

export default app;

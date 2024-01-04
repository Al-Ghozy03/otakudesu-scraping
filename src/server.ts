import express from "express";
import { router } from "./router";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(router);
app.listen(port);

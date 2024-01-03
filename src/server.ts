import express, { Express } from "express";
import { router } from "./router";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
app.listen(port);

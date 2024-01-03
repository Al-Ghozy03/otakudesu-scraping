import express, { Express } from "express";
import controller from "./controller";

export const router = express();

router.get("/", controller.root);

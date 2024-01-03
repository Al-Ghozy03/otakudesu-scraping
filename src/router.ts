import express, { Express } from "express";
import controller from "./controller";

export const router = express();

router.get("/", controller.root);
router.get("/on-going", controller.onGoing);
router.get("/:href", controller.detail);

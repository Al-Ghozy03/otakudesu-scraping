import express, { Express } from "express";
import controller from "./controller";

export const router: Express = express();

router.get("/", controller.root);
router.get("/complete", controller.complete);
router.get("/on-going", controller.onGoing);
router.get("/watch/:href", controller.watch);
router.get("/genre", controller.genre);
router.get("/:href", controller.detail);

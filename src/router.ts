import express, { Express } from "express";
import controller from "./controller";

export const router: Express = express();

router.get("/", controller.root);
router.get("/complete", controller.complete);
router.get("/on-going", controller.onGoing);
router.get("/:href", controller.detail);
router.get("/watch/:href", controller.watch);

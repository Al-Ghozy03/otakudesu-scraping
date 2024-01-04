import express, { Express } from "express";
import controller from "./controller";

export const router: Express = express();

router.get("/", controller.root);
router.get("/complete", controller.complete);
router.get("/on-going", controller.onGoing);
router.get("/watch/:href", controller.watch);
router.get("/genre", controller.genre);
router.get("/genre/:href", controller.genreDetail);
router.get("/release-schedule",controller.releaseSchedule)
router.get("/search",controller.search)
router.get("/:href", controller.detail);

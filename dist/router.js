"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controller_1 = __importDefault(require("./controller"));
exports.router = (0, express_1.default)();
exports.router.get("/", controller_1.default.root);
exports.router.get("/complete", controller_1.default.complete);
exports.router.get("/on-going", controller_1.default.onGoing);
exports.router.get("/watch/:href", controller_1.default.watch);
exports.router.get("/genre", controller_1.default.genre);
exports.router.get("/genre/:href", controller_1.default.genreDetail);
exports.router.get("/release-schedule", controller_1.default.releaseSchedule);
exports.router.get("/search", controller_1.default.search);
exports.router.get("/:href", controller_1.default.detail);

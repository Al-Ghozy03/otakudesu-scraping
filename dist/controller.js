"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var cheerio_1 = __importDefault(require("cheerio"));
var baseUrl = "https://otakudesu.cam";
var BaseController = /** @class */ (function () {
    function BaseController() {
    }
    BaseController.prototype.success = function (res, data, current_page, total_pages) {
        return res.status(200).json(__assign(__assign(__assign({ message: "success" }, (current_page && { current_page: current_page })), (total_pages && { total_pages: total_pages })), { data: data }));
    };
    BaseController.prototype.error = function (res, code, message) {
        return res.status(code).json({ message: message });
    };
    return BaseController;
}());
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Controller.prototype.root = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, res.json({
                        message: "welcome",
                    })];
            });
        });
    };
    Controller.prototype.onGoing = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var page, animeList_1, response, $_1, element, totalPages_1, pagination, er_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        page = req.query.page;
                        animeList_1 = [];
                        return [4 /*yield*/, (0, helper_1.AxiosService)("".concat(baseUrl, "/ongoing-anime/page/").concat(page !== null && page !== void 0 ? page : 1))];
                    case 1:
                        response = _a.sent();
                        $_1 = cheerio_1.default.load(response.data);
                        element = $_1("body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .rseries > .rapi > .venz > ul > li");
                        element.each(function (i, v) {
                            var data = $_1(v);
                            var href = data.find(".detpost > .thumb > a").attr("href");
                            var date = data.find(".detpost > .newnime").text().trim();
                            var episode = data.find(".detpost > .epz:nth-child(1)").text().trim();
                            var title = data
                                .find(".detpost > .thumb > a > .thumbz > h2")
                                .text()
                                .trim();
                            var thumbnail = data
                                .find(".detpost > .thumb > a > .thumbz > img")
                                .attr("src");
                            animeList_1.push({
                                href: href === null || href === void 0 ? void 0 : href.replace("".concat(baseUrl, "/anime"), ""),
                                title: title,
                                thumbnail: thumbnail,
                                date: date,
                                episode: episode,
                            });
                        });
                        totalPages_1 = [0];
                        pagination = $_1("body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .pagination > .pagenavix > a");
                        pagination.each(function (i, v) {
                            var data = $_1(v);
                            totalPages_1.push(Number(data.text().trim()));
                        });
                        return [2 /*return*/, _super.prototype.success.call(this, res, animeList_1, Number(page), totalPages_1.filter(function (v) { return !Number.isNaN(v); }).reverse()[0])];
                    case 2:
                        er_1 = _a.sent();
                        return [2 /*return*/, _super.prototype.error.call(this, res, 500, er_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.complete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var page, animeList_2, response, $_2, element, totalPages_2, pagination, er_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        page = req.query.page;
                        animeList_2 = [];
                        return [4 /*yield*/, (0, helper_1.AxiosService)("".concat(baseUrl, "/complete-anime/page/").concat(page !== null && page !== void 0 ? page : 1))];
                    case 1:
                        response = _a.sent();
                        $_2 = cheerio_1.default.load(response.data);
                        element = $_2("body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .rseries > .rapi > .venz > ul > li");
                        element.each(function (i, v) {
                            var data = $_2(v);
                            var href = data.find(".detpost > .thumb > a").attr("href");
                            var date = data.find(".detpost > .newnime").text().trim();
                            var episode = data.find(".detpost > .epz:nth-child(1)").text().trim();
                            var title = data
                                .find(".detpost > .thumb > a > .thumbz > h2")
                                .text()
                                .trim();
                            var thumbnail = data
                                .find(".detpost > .thumb > a > .thumbz > img")
                                .attr("src");
                            animeList_2.push({
                                href: href === null || href === void 0 ? void 0 : href.replace("".concat(baseUrl, "/anime"), ""),
                                title: title,
                                thumbnail: thumbnail,
                                date: date,
                                episode: episode,
                            });
                        });
                        totalPages_2 = [0];
                        pagination = $_2("body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .pagination > .pagenavix > a");
                        pagination.each(function (i, v) {
                            var data = $_2(v);
                            totalPages_2.push(Number(data.text().trim()));
                        });
                        return [2 /*return*/, _super.prototype.success.call(this, res, animeList_2, Number(page), totalPages_2.filter(function (v) { return !Number.isNaN(v); }).reverse()[0])];
                    case 2:
                        er_2 = _a.sent();
                        return [2 /*return*/, _super.prototype.error.call(this, res, 500, er_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.detail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var href, episodeList_1, response, $_3, element, er_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        href = req.params.href;
                        episodeList_1 = [];
                        return [4 /*yield*/, (0, helper_1.AxiosService)("".concat(baseUrl, "/anime/").concat(href))];
                    case 1:
                        response = _a.sent();
                        $_3 = cheerio_1.default.load(response.data);
                        element = $_3("body > .wowmaskot > #venkonten > .venser");
                        element.find(".episodelist > ul > li").each(function (i, v) {
                            var data = $_3(v);
                            var title = data.find("span > a").text().trim();
                            var href = data.find("span > a").attr("href");
                            var date = data.find("span:nth-child(2)").text().trim();
                            episodeList_1.push({
                                title: title,
                                href: href === null || href === void 0 ? void 0 : href.replace("".concat(baseUrl, "/episode"), ""),
                                date: date,
                            });
                        });
                        return [2 /*return*/, _super.prototype.success.call(this, res, {
                                title: element.find(".jdlrx > h1").text().trim(),
                                rating: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(3)")
                                    .text()
                                    .replace("Skor:", "")
                                    .trim(),
                                producer: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(4)")
                                    .text()
                                    .replace("Produser:", "")
                                    .trim(),
                                type: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(5)")
                                    .text()
                                    .replace("Tipe:", "")
                                    .trim(),
                                status: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(6)")
                                    .text()
                                    .replace("Status:", "")
                                    .trim(),
                                total_episodes: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(7)")
                                    .text()
                                    .replace("Total Episode:", "")
                                    .trim(),
                                duration: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(8)")
                                    .text()
                                    .replace("Durasi:", "")
                                    .trim(),
                                release_date: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(9)")
                                    .text()
                                    .replace("Tanggal Rilis:", "")
                                    .trim(),
                                studio: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(10)")
                                    .text()
                                    .replace("Studio:", "")
                                    .trim(),
                                genre: element
                                    .find(".fotoanime > .infozin > .infozingle > p:nth-child(11)")
                                    .text()
                                    .replace("Genre:", "")
                                    .trim(),
                                thumbnail: element.find(".fotoanime > img").attr("src"),
                                episode: episodeList_1,
                            })];
                    case 2:
                        er_3 = _a.sent();
                        console.log(er_3);
                        return [2 /*return*/, _super.prototype.error.call(this, res, 500, er_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.watch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var href, response, $_4, element, downloadLinkQuality_1, er_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        href = req.params.href;
                        return [4 /*yield*/, (0, helper_1.AxiosService)("".concat(baseUrl, "/episode/").concat(href))];
                    case 1:
                        response = _a.sent();
                        $_4 = cheerio_1.default.load(response.data);
                        element = $_4("body > .wowmaskot > #venkonten > .venser");
                        downloadLinkQuality_1 = [];
                        // TODO: get mirror quality
                        element.find(".download > ul > li").each(function (i, v) {
                            var data = $_4(v);
                            downloadLinkQuality_1.push({
                                mirror: data.find("a").text().trim(),
                                quality: data.find("strong").text().trim(),
                                link: data.find("a").attr("href"),
                            });
                        });
                        return [2 /*return*/, _super.prototype.success.call(this, res, {
                                title: element.find(".venutama > h1").text().trim(),
                                default_embeded_player: element
                                    .find(".responsive-embed-stream > iframe")
                                    .attr("src"),
                                download_link: downloadLinkQuality_1,
                            })];
                    case 2:
                        er_4 = _a.sent();
                        console.log(er_4);
                        return [2 /*return*/, _super.prototype.error.call(this, res, 500, er_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.genre = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, $_5, element, genre_1, er_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, helper_1.AxiosService)("".concat(baseUrl, "/genre-list"))];
                    case 1:
                        response = _a.sent();
                        $_5 = cheerio_1.default.load(response.data);
                        element = $_5("ul.genres > li > a");
                        genre_1 = [];
                        element.each(function (i, v) {
                            var _a;
                            var data = $_5(v);
                            genre_1.push({
                                title: data.text().trim(),
                                href: (_a = data.attr("href")) === null || _a === void 0 ? void 0 : _a.replace("/genres", ""),
                            });
                        });
                        return [2 /*return*/, _super.prototype.success.call(this, res, genre_1)];
                    case 2:
                        er_5 = _a.sent();
                        console.log(er_5);
                        return [2 /*return*/, _super.prototype.error.call(this, res, 500, er_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.genreDetail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var href, page, animeList_3, response, $_6, element, totalPages_3, pagination, er_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        href = req.params.href;
                        page = req.query.page;
                        animeList_3 = [];
                        return [4 /*yield*/, (0, helper_1.AxiosService)("".concat(baseUrl, "/genres/").concat(href, "/page/").concat(page !== null && page !== void 0 ? page : 1))];
                    case 1:
                        response = _a.sent();
                        $_6 = cheerio_1.default.load(response.data);
                        element = $_6("body > .wowmaskot > #venkonten > .vezone > .venser > .page");
                        element.find(".col-md-4").each(function (i, v) {
                            var _a;
                            var data = $_6(v).find(".col-anime");
                            var title = data.find(".col-anime-title > a").text().trim();
                            var studio = data.find(".col-anime-studio").text().trim();
                            var episode = data.find(".col-anime-eps").text().trim();
                            var rating = data.find(".col-anime-rating").text().trim();
                            var href = (_a = data
                                .find(".col-anime-title > a")
                                .attr("href")) === null || _a === void 0 ? void 0 : _a.replace("".concat(baseUrl, "/anime"), "");
                            var thumbnail = data.find(".col-anime-cover > img").attr("src");
                            animeList_3.push({ title: title, studio: studio, episode: episode, rating: rating, href: href, thumbnail: thumbnail });
                        });
                        totalPages_3 = [0];
                        pagination = $_6(".pagination > .pagipagi > .pagenavix > a");
                        pagination.each(function (i, v) {
                            var data = $_6(v);
                            totalPages_3.push(Number(data.text().trim()));
                        });
                        return [2 /*return*/, _super.prototype.success.call(this, res, animeList_3, Number(page), totalPages_3.filter(function (v) { return !Number.isNaN(v); }).reverse()[0])];
                    case 2:
                        er_6 = _a.sent();
                        console.log(er_6);
                        return [2 /*return*/, _super.prototype.error.call(this, res, 500, er_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.releaseSchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var releaseDay_1, anime_1, response, $_7, element, er_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        releaseDay_1 = [];
                        anime_1 = [];
                        return [4 /*yield*/, (0, helper_1.AxiosService)("".concat(baseUrl, "/jadwal-rilis"))];
                    case 1:
                        response = _a.sent();
                        $_7 = cheerio_1.default.load(response.data);
                        element = $_7("body > .wowmaskot > #venkonten > .vezone > .venutama > .page > .kgjdwl321 > .kglist321");
                        element.each(function (i, v) {
                            var data = $_7(v);
                            data.find("ul > li").each(function (j, val) {
                                var _a;
                                var value = $_7(val).find("a");
                                anime_1.push({
                                    day: data.find("h2").text().trim(),
                                    title: value.text().trim(),
                                    href: (_a = value.attr("href")) === null || _a === void 0 ? void 0 : _a.replace("".concat(baseUrl, "/anime"), ""),
                                });
                            });
                            releaseDay_1.push({
                                day: data.find("h2").text().trim(),
                                release_anime: anime_1
                                    .filter(function (v) { return v.day === data.find("h2").text().trim(); })
                                    .map(function (_a) {
                                    var title = _a.title, href = _a.href;
                                    return ({ title: title, href: href });
                                }),
                            });
                        });
                        return [2 /*return*/, _super.prototype.success.call(this, res, releaseDay_1)];
                    case 2:
                        er_7 = _a.sent();
                        console.log(er_7);
                        return [2 /*return*/, _super.prototype.error.call(this, res, 500, er_7)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.search = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var q, response, $_8, element, animeList_4, genreList, er_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        q = req.query.q;
                        if (!q)
                            return [2 /*return*/, _super.prototype.error.call(this, res, 500, "q is required")];
                        return [4 /*yield*/, (0, helper_1.AxiosService)("".concat(baseUrl, "?s=").concat(q, "&post_type=anime"))];
                    case 1:
                        response = _a.sent();
                        $_8 = cheerio_1.default.load(response.data);
                        element = $_8("body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .page > ul > li");
                        animeList_4 = [];
                        genreList = [];
                        element.each(function (i, v) {
                            var _a;
                            var data = $_8(v);
                            var thumbnail = data.find("img").attr("src");
                            var href = (_a = data
                                .find("h2 > a")
                                .attr("href")) === null || _a === void 0 ? void 0 : _a.replace("".concat(baseUrl, "/anime"), "");
                            var title = data.find("h2 > a").text().trim();
                            var status = data
                                .find(".set:nth-child(4)")
                                .text()
                                .replace("Status :", "")
                                .trim();
                            var rating = data
                                .find(".set:nth-child(5)")
                                .text()
                                .replace("Rating :", "")
                                .trim();
                            animeList_4.push({
                                title: title,
                                href: href,
                                thumbnail: thumbnail,
                                genre: data
                                    .find(".set:nth-child(3)")
                                    .text()
                                    .replace("Genres : ", "")
                                    .trim(),
                                status: status,
                                rating: rating,
                            });
                        });
                        return [2 /*return*/, _super.prototype.success.call(this, res, animeList_4)];
                    case 2:
                        er_8 = _a.sent();
                        console.log(er_8);
                        return [2 /*return*/, _super.prototype.error.call(this, res, 500, er_8)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Controller;
}(BaseController));
exports.default = new Controller();

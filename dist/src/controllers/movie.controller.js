"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_services_1 = require("../services/movie.services");
const logger_1 = __importDefault(require("../utils/logger"));
class MovieController {
    constructor() {
        this.getMovies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield (0, movie_services_1.findMovies)();
                const { status, code, data } = movies;
                return res.status(code).json({
                    status,
                    data,
                });
            }
            catch (err) {
                logger_1.default.info(err);
                res.status(500).json({
                    status: 'error',
                    err,
                });
            }
        });
        this.getMovieById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const movie = yield (0, movie_services_1.findMovieById)({ id: +id });
            const { status, code, data } = movie;
            return res.status(code).json({
                status,
                data,
            });
        });
    }
}
exports.default = new MovieController();
//# sourceMappingURL=movie.controller.js.map
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
exports.findMovieById = exports.findMovies = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const prisma = new client_1.PrismaClient();
const findMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield prisma.movie.findMany({
            orderBy: {
                release_date: 'asc',
            },
            include: {
                _count: {
                    select: { comments: true },
                },
            },
        });
        return { status: 'success', code: 200, data: movies };
    }
    catch (err) {
        logger_1.default.info(err);
    }
});
exports.findMovies = findMovies;
const findMovieById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield prisma.movie.findUnique({
            where: id,
            include: {
                _count: {
                    select: { comments: true },
                },
            },
        });
        return { status: 'success', code: 200, data: movie };
    }
    catch (err) {
        logger_1.default.info(err);
    }
});
exports.findMovieById = findMovieById;
//# sourceMappingURL=movie.services.js.map
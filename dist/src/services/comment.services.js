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
exports.fetchComments = exports.addComment = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const prisma = new client_1.PrismaClient();
const addComment = (movieId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentData = {
            movieId: movieId,
            comment: comment,
        };
        const validMovieId = yield prisma.movie.findFirst({
            where: {
                id: {
                    equals: movieId,
                },
            },
        });
        if (!validMovieId)
            return {
                status: 'success',
                code: 404,
                message: 'No movie with this id in database',
            };
        const newComment = yield prisma.comment.create({
            data: commentData,
        });
        return { status: 'success', code: 201, data: newComment };
    }
    catch (err) {
        logger_1.default.info(err);
    }
});
exports.addComment = addComment;
const fetchComments = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validMovieId = yield prisma.movie.findFirst({
            where: {
                id: {
                    equals: movieId,
                },
            },
        });
        if (!validMovieId)
            return {
                status: 'success',
                code: 404,
                message: 'No movie with this id in database',
            };
        const Comments = yield prisma.comment.findMany({
            where: {
                movieId: movieId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { status: 'success', code: 200, data: Comments };
    }
    catch (err) {
        logger_1.default.info(err);
    }
});
exports.fetchComments = fetchComments;
//# sourceMappingURL=comment.services.js.map
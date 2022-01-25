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
const comment_services_1 = require("../services/comment.services");
const logger_1 = __importDefault(require("../utils/logger"));
class CommentController {
    constructor() {
        this.addComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // fetch movie id from url params
            const movieId = parseInt(req.params.movieId);
            // add comments to the comment table with the movie id as the primary key.
            const comment = req.body.comment;
            if (comment.length < 501) {
                const newComment = yield (0, comment_services_1.addComment)(movieId, comment);
                const { status, code, message, data } = newComment;
                return res.status(code).json({
                    status,
                    data,
                    message,
                });
            }
            return res.status(409).json({
                message: 'Comment should be 500 characters or less',
            });
        });
        this.listComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // fetch movie id from url params.
                const MovieId = parseInt(req.params.movieId);
                // add comments to the comment table with the movie id as the primary key.
                const comments = yield (0, comment_services_1.fetchComments)(MovieId);
                const { code, status, data } = comments;
                return res.status(code).json({
                    status,
                    data,
                });
            }
            catch (err) {
                logger_1.default.info(err);
                return res.status(500).json({
                    status: 'error',
                    err,
                });
            }
        });
    }
}
exports.default = new CommentController();
//# sourceMappingURL=comment.controller.js.map
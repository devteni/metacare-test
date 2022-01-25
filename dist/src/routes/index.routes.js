"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = __importDefault(require("../controllers/movie.controller"));
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const character_controller_1 = __importDefault(require("../controllers/character.controller"));
const router = (0, express_1.Router)();
router.get('/movies', movie_controller_1.default.getMovies);
router.get('/movies/:id', movie_controller_1.default.getMovieById);
router.post('/:movieId/comment', comment_controller_1.default.addComments);
router.get('/:movieId/comments', comment_controller_1.default.listComments);
router.get('/characters', character_controller_1.default.getCharacters);
exports.default = router;
//# sourceMappingURL=index.routes.js.map
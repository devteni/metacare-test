"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controllers/index.controller"));
const router = (0, express_1.Router)();
router.get('/movies', index_controller_1.default.getMovies);
router.get('/movies/:id', index_controller_1.default.getMovieById);
router.post('/:movieId/comment', index_controller_1.default.addComments);
router.get('/:movieId/comments', index_controller_1.default.listComments);
router.get('/characters', index_controller_1.default.getCharacters);
exports.default = router;
//# sourceMappingURL=index.routes.js.map
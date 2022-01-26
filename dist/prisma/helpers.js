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
exports.seedChar = exports.fetchCharacter = exports.fetchMovies = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
const fetchMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get('https://swapi.py4e.com/api/films');
        const { data } = res;
        return data.results;
    }
    catch (err) {
        console.log(err);
    }
});
exports.fetchMovies = fetchMovies;
const fetchCharacter = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(url);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
});
exports.fetchCharacter = fetchCharacter;
const seedChar = (character, MovieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor = yield (0, exports.fetchCharacter)(character);
        const characterData = {
            movieId: MovieId,
            name: actor.name,
            height: actor.height,
            gender: actor.gender,
        };
        const existingActor = yield prisma.character.findFirst({
            where: {
                name: characterData.name,
            },
        });
        if (!existingActor) {
            yield prisma.character.create({
                data: characterData,
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.seedChar = seedChar;
//# sourceMappingURL=helpers.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDB = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("./helpers");
const prisma = new client_1.PrismaClient();
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield (0, helpers_1.fetchMovies)();
        movies.forEach((movie, i) => __awaiter(void 0, void 0, void 0, function* () {
            const movieData = {
                title: movie.title,
                release_date: movie.release_date,
                opening_crawl: movie.opening_crawl
            };
            // save movie data in db
            const savedMovie = yield prisma.movie.create({
                data: movieData
            });
            for (const character of movie.characters) {
                yield (0, helpers_1.seedChar)(character, savedMovie.id);
            }
        }));
    }
    catch (err) {
        console.log(err);
    }
});
exports.seedDB = seedDB;
(0, exports.seedDB)()
    .catch((err) => {
    console.log(err);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map
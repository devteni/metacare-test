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
exports.getChars = void 0;
const client_1 = require("@prisma/client");
const enums_1 = require("../utils/enums");
const logger_1 = __importDefault(require("../utils/logger"));
const prisma = new client_1.PrismaClient();
const generateSortParams = (sortby, order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sort;
        const dir = order === enums_1.ORDER.ASC ? 'asc' : 'desc';
        if (sortby === enums_1.SORT.NAME) {
            sort = {
                name: dir,
            };
        }
        else if (sortby === enums_1.SORT.GENDER) {
            sort = {
                gender: dir,
            };
        }
        else if (sortby === enums_1.SORT.HEIGHT) {
            sort = {
                height: dir,
            };
        }
        else {
            sort = undefined;
        }
        return sort;
    }
    catch (err) {
        logger_1.default.info(err);
    }
});
const getChars = (sort, order, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortOrder = yield generateSortParams(sort, order);
        const data = yield prisma.character.findMany({
            where: {
                gender: {
                    equals: filter,
                },
            },
            select: {
                id: true,
                name: true,
                gender: true,
                height: true,
            },
            orderBy: sortOrder,
        });
        let totalHeightInCm = 0;
        data.forEach((person) => {
            if (!isNaN(parseInt(person.height))) {
                totalHeightInCm += parseInt(person.height);
            }
        });
        return {
            status: 'success',
            code: 200,
            metadata: {
                totalCharacters: data.length,
                totalHeights: {
                    feet: (totalHeightInCm / 30.48).toFixed(2),
                    cm: totalHeightInCm,
                    inches: (totalHeightInCm / 2.54).toFixed(2),
                },
            },
            data,
        };
    }
    catch (err) {
        logger_1.default.info(err);
    }
});
exports.getChars = getChars;
//# sourceMappingURL=character.services.js.map
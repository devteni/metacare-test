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
const character_services_1 = require("../services/character.services");
const logger_1 = __importDefault(require("../utils/logger"));
class CharacterController {
    constructor() {
        this.getCharacters = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { sortby, dir, filter } = req.query;
                const chars = yield (0, character_services_1.getChars)(sortby, dir, filter);
                const { code, status, data, metadata } = chars;
                return res.status(code).json({
                    status,
                    metadata,
                    data,
                });
            }
            catch (err) {
                logger_1.default.info(err);
            }
        });
    }
}
exports.default = new CharacterController();
//# sourceMappingURL=character.controller.js.map
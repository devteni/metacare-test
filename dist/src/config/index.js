"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const SERVER = {
    port: PORT,
};
const config = {
    server: SERVER,
};
exports.default = config;
//# sourceMappingURL=index.js.map
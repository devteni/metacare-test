"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const { timestamp: timestampFn, combine, printf, colorize, prettyPrint, } = winston_1.format;
// Format function
const myFormat = printf(({ level, message, timestamp }) => `${timestamp}: ${level}----> ${message} `);
const logger = (0, winston_1.createLogger)({
    format: combine(colorize(), timestampFn(), prettyPrint(), myFormat),
});
logger.add(new winston_1.transports.Console());
winston_1.default.addColors({
    info: 'green',
    error: 'red',
});
logger.on('error', (err) => console.error(err.message));
exports.default = logger;
//# sourceMappingURL=logger.js.map
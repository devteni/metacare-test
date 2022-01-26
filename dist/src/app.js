"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.static('public'));
const swaggerJSDoc = yamljs_1.default.load(`${process.cwd()}/docs.yaml`);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJSDoc, { explorer: true }));
app.use('/api/v1', index_routes_1.default);
app.get('/', (req, res) => {
    res.send("<h1 align='center' style='color: saddlebrown; font-size: 5rem'>Welcome to Metacare </h1>");
});
app.use('*', (req, res) => {
    res.send('<h1>Page not found! 404 :(</h1>');
});
exports.default = app;
//# sourceMappingURL=app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
var duckduckgo_route_1 = __importDefault(require("./api/routes/duckduckgo-route"));
app.use('/api', duckduckgo_route_1.default);
var db_routes_1 = __importDefault(require("./api/routes/db-routes"));
app.use('/api', db_routes_1.default);
app.listen(5000, function () {
    console.log('server is listening on port 5000');
});
//# sourceMappingURL=index.js.map
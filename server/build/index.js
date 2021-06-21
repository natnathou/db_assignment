"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/api', function (req, res) {
    res.status(200).json({ message: 'ok' });
});
app.listen(5000, function () {
    console.log('server is listening on port 5000');
});

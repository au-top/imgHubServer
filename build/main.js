"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const port = 8085;
const app = express_1.default();
app.listen(port, () => {
    app.set("view engine", "ejs");
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
        res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
        next();
    });
    router_1.setupRouter(app);
    console.log("runServer");
});

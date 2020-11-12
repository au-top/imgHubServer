"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRouter = void 0;
const showImg_1 = require("./api/showImg");
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
function setupRouter(app) {
    const api = express_1.default();
    // root
    app.get("/", (req, res) => {
        (async () => {
            const fileNameList = (await showImg_1.apiReadFileContent()).filter(v => !/[\s\S]*\.json$/.test(v));
            res.render("index", {
                fileNameList
            });
        })();
    });
    //static
    app.use("/imgSource", express_1.default.static(`${config_1.imgSourcePath}`));
    app.use("/public", express_1.default.static(`${config_1.publicPath}`));
    //api 
    app.use('/api', api);
    api.get('/imgList/:indexPage/:count', showImg_1.httpGetAllImgName);
}
exports.setupRouter = setupRouter;
// http://dev.autopc.top:8085/api/imgList

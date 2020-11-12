"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetAllImgName = exports.apiReadFileContent = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = require("~/config");
let config = null;
async function apiReadFileContent(from = 0, count = 10) {
    const configContent = await new Promise((res) => {
        if (config) {
            res(config);
        }
        else {
            fs_1.default.readdir(config_1.imgSourcePath, (err, files) => {
                if (err)
                    throw err;
                config = files;
                res(files);
            });
        }
    });
    return configContent.slice(from, from + count);
}
exports.apiReadFileContent = apiReadFileContent;
async function httpGetAllImgName(req, res) {
    const params = req.params;
    res.json(await apiReadFileContent(parseInt(params.indexPage), parseInt(params.count)));
}
exports.httpGetAllImgName = httpGetAllImgName;

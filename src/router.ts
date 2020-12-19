import { httpGetAllImgName, apiReadFileContent } from "~/api/showImg";
import { imgSourcePath, publicPath } from "./config";
import { httpGetMinImgFile } from "~/api/previewImg";
import express from "express";
export function setupRouter(app: express.Express) {
    // root
    app.get("/", (req, res) => {
        (async () => {
            const fileNameList = ((await apiReadFileContent()) as Array<string>).filter(
                (v) => !/[\s\S]*\.json$/.test(v)
            );
            res.render("index", {
                fileNameList,
            });
        })();
    });
    //static
    app.use("/imgSource", express.static(`${imgSourcePath}`));
    app.use("/public", express.static(`${publicPath}`));
    const api = express();
    //api
    app.use("/api", api);
    api.get("/imgList/:indexPage/:count", httpGetAllImgName);
    api.get("/previewImg/:imgPath", httpGetMinImgFile);
    api.get("/getList");
}
import { httpGetAllImgName, apiReadFileContent } from "~/api/showImg";
import { uploadImage ,saveManage as uploadImgSaveManage } from "~/api/uploadImg";
import { imgSourcePath, publicPath, previewImgPath } from "./config";
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
    app.use("/api", api);
    //api
    api.use((req, res, next) => {
        console.log(req.originalUrl);
        next();
    });
    api.get("/imgList/:indexPage/:count", httpGetAllImgName);
    api.get("/previewImg/:imgPath", httpGetMinImgFile);
    //recvFileApiObj

    const recvApi = express();
    // /api/recv
    api.use("/recv", recvApi);
    //recv
    // /api/recv/upload/img
    recvApi.post(
        "/upload/img",
        uploadImgSaveManage,
        uploadImage
    );
}

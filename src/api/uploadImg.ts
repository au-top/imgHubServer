import multer from "multer";
import { imgSourcePath } from "~/config";
import { Response, Request } from "express";
export async function uploadImage(req: Request, res: Response<any>) {
    console.log("call uploadImage");
    res.send("success");
}
export let saveManage = multer({
    fileFilter: (req, files, cb) => {
        console.log(files);
        cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${imgSourcePath}`);
        },
        filename: (req, file, cb) => {
            try {
                let fileName: string = file.originalname;
                let fileType:null|undefined|string=null;
                //pop fileMiniType
                fileName = (() => {
                    let fList = fileName.split(".");
                    fileType=fList.pop();
                    return fList.join("");
                })();
                fileName = fileName.replace(/[\*\^\/\\]/gi, "");
                fileName = `${Math.random().toString().split('.').join('')}-${fileName}-${Date.now()}.${
                    fileType??'jpg'
                }`;
                cb(null, fileName);
            } catch (e) {
                console.log(e);
            }
        },
    }),
}).array("photos");

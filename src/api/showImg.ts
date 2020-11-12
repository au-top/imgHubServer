import fs from "fs";
import { Response , Request } from "express";
import { imgSourcePath } from "~/config";

let config: Array<string> | null = null;

export async function apiReadFileContent(from:number=0,count:number=10)  {
   const configContent = await new Promise<string[]>((res) => {
        if (config) {
            res(config);
        } else {
            fs.readdir(imgSourcePath, (err, files) => {
                if (err) throw err;
                config=files;
                res(files);
            });
        }
    });
    return configContent.slice(from,from+count);
}

export async function httpGetAllImgName(req:Request,res:Response<any>){
    const params=req.params;
    res.json(await apiReadFileContent(parseInt(params.indexPage),parseInt(params.count)));
}
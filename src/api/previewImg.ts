import imagemin from "imagemin";
import imagePngMin from "imagemin-optipng";
import mozjpeg from "imagemin-mozjpeg";
import fs from "fs";

import { Response , Request } from "express";
import { imgSourcePath , previewImgPath } from "~/config"


async function apiReadMinImgFileContent(fileName:string){   

    let imgFileList=fileName.split('.');
    const typeName=imgFileList.pop()??'';
    switch(true){
        case /png/.test(typeName):
            await imagemin([`${imgSourcePath}/${fileName}`],{
                destination:`${previewImgPath}`,
                plugins:[
                    imagePngMin(),
                ]
            }).catch(console.log);
        break;
        case /jpeg/.test(typeName):
        case /jpg/.test(typeName):
            await imagemin([`${imgSourcePath}/${fileName}`],{
                destination:`${previewImgPath}`,
                plugins:[
                    mozjpeg({
                        quality:25
                    })
                ]
            });
        break;
    }
}
async function httpGetMinImgFile(req:Request,res:Response<any>){
    const imgFile=req.params.imgPath;
    const previewImgSourcePath=`${previewImgPath}/${imgFile}`;
   if(!await new Promise((resP)=>fs.exists(`${previewImgSourcePath}`,resP))){
        await apiReadMinImgFileContent(imgFile);
   }
   return res.sendFile(`${previewImgSourcePath}`);
}
export {
    httpGetMinImgFile
}
//323891
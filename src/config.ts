import fs from "fs";
import {createDirSync} from "~/functions/fileIo" 
const publicPath=`${__dirname}/public`;
const imgSourcePath=`${publicPath}/img`;
// const listImgPath=`${publicPath}/listImg`;
const previewImgPath=`${publicPath}/previewImg`;

createDirSync(publicPath);
createDirSync(imgSourcePath);
createDirSync(previewImgPath);

export {
    imgSourcePath,
    publicPath,
    // listImgPath,
    previewImgPath
}
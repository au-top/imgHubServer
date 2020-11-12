import { httpGetAllImgName , apiReadFileContent } from "./api/showImg";
import {imgSourcePath,publicPath} from "./config"
import express from "express"
export function setupRouter(app:express.Express){
    const api=express();

    // root
    app.get("/", (req, res) => {
        (async()=>{
           const fileNameList=( (await apiReadFileContent()) as Array<string>).filter(v=>!/[\s\S]*\.json$/.test(v));
            res.render("index",{
                fileNameList
            });
        })()
    });

    //static
    app.use("/imgSource", express.static(`${imgSourcePath}`));
    app.use("/public",express.static(`${publicPath}`));

    //api 
    app.use('/api',api);
    api.get('/imgList/:indexPage/:count',httpGetAllImgName);

}
// http://dev.autopc.top:8085/api/imgList
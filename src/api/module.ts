import fs from "fs";
import * as multer from "multer"
import{Response,Request} from "express";
export async function setupApi(req:Request,res:Response<any>){
    res.send('Hello');
}
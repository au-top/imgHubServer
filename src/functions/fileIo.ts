import fs from "fs";
function createDirSync(createPath:string){
    try{
        fs.mkdirSync(createPath);
    }catch(e){
        if(e.code=='EEXIST'){
            console.log(`${createPath} is EEXIST`);
        }else{
            console.log(e);
        }
    }
}
export {
    createDirSync
}
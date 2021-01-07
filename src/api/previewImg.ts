import imagemin from "imagemin";
import imagePngMin from "imagemin-optipng";
import mozjpeg from "imagemin-mozjpeg";
import sharp from "sharp";
import fs from "fs";
import { Response, Request } from "express";
import { imgSourcePath, previewImgPath } from "~/config";
import { bufferToStream } from "../functions/typeTo";
async function apiReadMinImgFileContent(fileName: string) {
    let imgFileList = fileName.split(".");
    const typeName = imgFileList.pop() ?? "";
    let imageminConfig: imagemin.Options | null = null;
    const imageCoverBuffer = await (async () => {
        return await sharp(`${imgSourcePath}/${fileName}`)
            .resize({ width: 800, fit: sharp.fit.outside })
            .withMetadata()
            .toBuffer();
    })();
    if (/png/.test(typeName) || /jpeg/.test(typeName) || /jpg/.test(typeName)) {
        switch (true) {
            case /png/.test(typeName):
                {
                    imageminConfig = {
                        plugins: [imagePngMin()],
                    };
                }
                break;
            case /jpeg/.test(typeName):
            case /jpg/.test(typeName):
                {
                    imageminConfig = {
                        plugins: [
                            mozjpeg({
                                quality: 30,
                            }),
                        ],
                    };
                }
                break;
        }
        fs.createWriteStream(`${previewImgPath}/${fileName}`).write(
            await imagemin.buffer(
                imageCoverBuffer,
                imageminConfig ?? { plugins: [] }
            )
        );
    } else {
        await new Promise((res, rej) => {
            const s=bufferToStream(imageCoverBuffer)
            s.pipe(
                fs.createWriteStream(`${previewImgPath}/${fileName}`)
            ).on('close',res);
        });
    }
}
async function httpGetMinImgFile(req: Request, res: Response<any>) {
    const imgFile = req.params.imgPath;
    const previewImgSourcePath = `${previewImgPath}/${imgFile}`;
    if (
        !(await new Promise((resP) =>
            fs.exists(`${previewImgSourcePath}`, resP)
        ))
    ) {
        await apiReadMinImgFileContent(imgFile);
    }
    return res.sendFile(`${previewImgSourcePath}`);
}
export { httpGetMinImgFile };
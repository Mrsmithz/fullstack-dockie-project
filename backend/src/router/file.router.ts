import { Router, Request, Response, NextFunction} from "express"
import { DocumentProcessor } from "../controller/OCRController"
import { uploadFile } from "../middlewares/multerUpload"
import {isFileExist, getFileUploadBucket, getGridFSFile, getGridFSFileInfo} from '../utils/uploadsBucket'
import { uploadImages } from "../middlewares/multerUpload"
import { UploadFiles } from "../types/rest/UploadFiles.type"
import { imageUpload } from "../utils/fileUpload"
import { HttpStatus } from "../utils/HttpStatus.enum"
const router : Router = Router()


router.post('/ocr', uploadFile, DocumentProcessor)

router.post('/upload/images', uploadImages, async (req, res, next) => {
    try{
        const uploads = req.files as UploadFiles
        const result = await imageUpload(uploads.images)
        res.status(HttpStatus.CREATED).send(result)
    }
    catch(e){
        console.log(e)
        res.sendStatus(HttpStatus.BAD_REQUEST)
    }
})

router.get('/:id/info', isFileExist, getGridFSFileInfo)
router.get('/:id', isFileExist, getGridFSFile)


export default router
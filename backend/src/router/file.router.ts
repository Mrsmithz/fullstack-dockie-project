import { Router, Request, Response, NextFunction} from "express"
import { DocumentProcessor } from "../controller/OCRController"
import { uploadFile } from "../middlewares/multerUpload"
import {isFileExist, getFileUploadBucket, getGridFSFile, getGridFSFileInfo} from '../utils/uploadsBucket'
const router : Router = Router()


router.post('/ocr', uploadFile, DocumentProcessor)

router.get('/:id/info', isFileExist, getGridFSFileInfo)
router.get('/:id', isFileExist, getGridFSFile)


export default router
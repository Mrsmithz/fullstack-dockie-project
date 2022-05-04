import { Router } from "express"
import { DocumentProcessor } from "../controller/OCRController"
import { uploadFile } from "../middlewares/multerUpload"

const router : Router = Router()


router.post('/ocr', uploadFile, DocumentProcessor)


export default router
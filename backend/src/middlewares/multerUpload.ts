import multer from "multer"
import { MAX_FILE_COUNT, MAX_IMAGES_COUNT, IMAGES_FIELD_NAME, FILE_FIELD_NAME, FILE_UPLOAD_DEST, UPDATE_IMAGES_FIELD_NAME} from "../config/fileUpload.config"
const config = multer({ dest: FILE_UPLOAD_DEST })


export const uploadImages = config.fields([
    {
        name:IMAGES_FIELD_NAME,
        maxCount:MAX_IMAGES_COUNT
    }
])
export const uploadUpdateImages = config.fields([
    {
        name:UPDATE_IMAGES_FIELD_NAME,
        maxCount:MAX_IMAGES_COUNT
    }
])

export const uploadFile = config.fields([
    {
        name:FILE_FIELD_NAME,
        maxCount:MAX_FILE_COUNT
    }
])
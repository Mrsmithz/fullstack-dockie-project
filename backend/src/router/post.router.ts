import { Router } from "express"
import { createPost, updatePost } from '../controller/PostController'
import { uploadImages, uploadUpdateImages} from "../middlewares/multerUpload"
const router : Router = Router()

router.post('/create', uploadImages, createPost)
router.put('/update', uploadUpdateImages, updatePost)

export default router